using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Google.Cloud.TextToSpeech.V1;
using server.Interfaces;

namespace server.Service.TextToSpeech
{
    public class TextToSpeechService : ITextToSpeechService
    {
        private readonly TextToSpeechClient _textToSpeechClient;
        private readonly ILogger<TextToSpeechService> _logger;

        public TextToSpeechService(TextToSpeechClient textToSpeechClient, ILogger<TextToSpeechService> logger)
        {
            _textToSpeechClient = textToSpeechClient ?? throw new ArgumentNullException(nameof(textToSpeechClient));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public async Task<byte[]> ConvertTextToSpeechAsync(string text, string languageCode = "vi-VN")
        {
            _logger.LogInformation("Converting text to speech: {Text}", text);

            var input = new SynthesisInput
            {
                Text = text
            };

            var voice = new VoiceSelectionParams
            {
                LanguageCode = languageCode,
                SsmlGender = SsmlVoiceGender.Female
            };

            var audioConfig = new AudioConfig
            {
                AudioEncoding = AudioEncoding.Mp3
            };

            try
            {
                var response = await _textToSpeechClient.SynthesizeSpeechAsync(input, voice, audioConfig);
                _logger.LogInformation("Received audio content with length: {Length}", response.AudioContent.Length);
                return response.AudioContent.ToByteArray();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while converting text to speech");
                return null;
            }
        }
    }
}