using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Google.Cloud.TextToSpeech.V1;
using Microsoft.EntityFrameworkCore;
using HtmlAgilityPack;
using server.Data;
using server.Interfaces;
using server.Models;

namespace server.Service.TextToSpeech
{
    public class TextToSpeechService : ITextToSpeechService
    {
        private readonly ApplicationDbContext _context;
        private readonly TextToSpeechClient _textToSpeechClient;

        public TextToSpeechService(ApplicationDbContext context, TextToSpeechClient textToSpeechClient)
        {
            _context = context;
            _textToSpeechClient = textToSpeechClient ?? throw new ArgumentNullException(nameof(textToSpeechClient));
        }

        public async Task<byte[]> ConvertTextToSpeechAsync(string text, string language)
        {
            // Chuyển đổi q.Content từ HTML sang văn bản thuần túy
            var normalizedText = ConvertHtmlToPlainText(text);

            // Ghi giá trị của normalizedText ra console
            Console.WriteLine("normalizedText: " + normalizedText);

            // Chuyển truy vấn sang LINQ to Objects để thực hiện trên bộ nhớ
            var questions = await _context.Questions
                .Where(q => q.Language == language)
                .ToListAsync();

            var question = questions
                .AsEnumerable()
                .FirstOrDefault(q => ConvertHtmlToPlainText(q.Content).ToUpper() == normalizedText.ToUpper());

            if (question != null && question.Audio != null)
            {
                return question.Audio;
            }

            var audioContent = await CallGoogleTextToSpeechApiAsync(text, language);

            if (audioContent != null && audioContent.Length > 0)
            {
                question.Audio = audioContent;

                await _context.SaveChangesAsync();
            }

            return audioContent;
        }


        private async Task<byte[]> CallGoogleTextToSpeechApiAsync(string text, string language)
        {
            string languageCode;
            string voiceName;

            if (language == "en")
            {
                languageCode = "en-US";
                voiceName = "en-US-Wavenet-D";
            }
            else
            {
                languageCode = "vi-VN";
                voiceName = "vi-VN-Wavenet-B";
            }

            var input = new SynthesisInput
            {
                Text = text
            };

            var voice = new VoiceSelectionParams
            {
                LanguageCode = languageCode,
                Name = voiceName,
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

        private string ConvertHtmlToPlainText(string html)
        {
            var doc = new HtmlDocument();
            doc.LoadHtml(html);
            return doc.DocumentNode.InnerText;
        }
    }
}
