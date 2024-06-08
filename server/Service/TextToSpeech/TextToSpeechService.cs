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

        public TextToSpeechService(TextToSpeechClient textToSpeechClient)
        {
            _textToSpeechClient = textToSpeechClient ?? throw new ArgumentNullException(nameof(textToSpeechClient));
        }

        public async Task<byte[]> ConvertTextToSpeechAsync(string text, string languageCode = "vi-VN")
        {
            var input = new SynthesisInput
            {
                Text = text
            };

            var voice = new VoiceSelectionParams
            {
                LanguageCode = languageCode,
                Name = "vi-VN-Wavenet-B",
                SsmlGender = SsmlVoiceGender.Female
            };

            var audioConfig = new AudioConfig
            {
                AudioEncoding = AudioEncoding.Mp3,
                SpeakingRate = 0.75
            };

            try
            {
                var response = await _textToSpeechClient.SynthesizeSpeechAsync(input, voice, audioConfig);
                return response.AudioContent.ToByteArray();
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}