using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using server.Dtos.TextToSpeech;
using server.Interfaces;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TextToSpeechController : ControllerBase
    {
        private readonly ITextToSpeechService _textToSpeechService;

        public TextToSpeechController(ITextToSpeechService textToSpeechService)
        {
            _textToSpeechService = textToSpeechService;
        }

        [HttpPost("convert")]
        public async Task<IActionResult> ConvertTextToSpeech([FromBody] TextToSpeechRequest request)
        {
            var audioContent = await _textToSpeechService.ConvertTextToSpeechAsync(request.Text, request.Language);
            if (audioContent == null || audioContent.Length == 0)
            {
                return StatusCode(500, "Failed to generate audio content");
            }

            return File(audioContent, "audio/mpeg");
        }
    }
}