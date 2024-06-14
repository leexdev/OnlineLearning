using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using server.Helpers.GoogleCloud;
using server.Interfaces;
using FuzzySharp;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LanguageController : ControllerBase
    {
        private readonly ITextAnalysisService _textAnalysisService;
        private readonly ISpeechToTextService _speechToTextService;

        public LanguageController(ITextAnalysisService textAnalysisService, ISpeechToTextService speechToTextService)
        {
            _textAnalysisService = textAnalysisService;
            _speechToTextService = speechToTextService;
        }

        [HttpPost("analyze")]
        public async Task<IActionResult> AnalyzeText([FromBody] AnalyzeTextRequest request)
        {
            var response = await _textAnalysisService.AnalyzeTextAsync(request.Text);
            return Ok(response);
        }
        
        [HttpPost("analyze-audio")]
        public async Task<IActionResult> AnalyzeAudio([FromForm] AnalyzeSpeechRequest request, [FromForm] string originalText)
        {
            try
            {
                if (request?.AudioFile == null || string.IsNullOrEmpty(originalText))
                {
                    return BadRequest("Audio file and original text are required.");
                }

                var transcription = await _speechToTextService.TranscribeAudioAsync(request.AudioFile);

                var analysisResponse = await _textAnalysisService.AnalyzeTextAsync(transcription);

                var (accuracy, differences) = CalculateAccuracy(originalText, transcription);

                return Ok(new { accuracy, differences });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        private (double score, List<string> differences) CalculateAccuracy(string originalText, string transcribedText)
        {
            originalText = originalText.ToLower();
            transcribedText = transcribedText.ToLower();

            var score = Fuzz.Ratio(originalText, transcribedText);

            var differences = new List<string>();
            var originalWords = originalText.Split(' ');
            var transcribedWords = transcribedText.Split(' ');

            for (int i = 0; i < Math.Max(originalWords.Length, transcribedWords.Length); i++)
            {
                if (i < originalWords.Length && i < transcribedWords.Length)
                {
                    if (!originalWords[i].Equals(transcribedWords[i]))
                    {
                        differences.Add($"Original: {originalWords[i]}, Transcribed: {transcribedWords[i]}");
                    }
                }
                else if (i < originalWords.Length)
                {
                    differences.Add($"Original: {originalWords[i]}, Transcribed: (missing)");
                }
                else
                {
                    differences.Add($"Original: (missing), Transcribed: {transcribedWords[i]}");
                }
            }
            return (score, differences);
        }

    }
}