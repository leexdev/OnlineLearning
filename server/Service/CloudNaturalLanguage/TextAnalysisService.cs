using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Google.Cloud.Language.V1;
using server.Interfaces;

namespace server.Service.CloudNaturalLanguage
{
    public class TextAnalysisService : ITextAnalysisService
    {
        private readonly LanguageServiceClient _languageServiceClient;

        public TextAnalysisService(LanguageServiceClient languageServiceClient)
        {
            _languageServiceClient = languageServiceClient;
        }

        public async Task<AnalyzeSyntaxResponse> AnalyzeTextAsync(string text)
        {
            var document = new Document
            {
                Content = text,
                Type = Document.Types.Type.PlainText
            };
            return await _languageServiceClient.AnalyzeSyntaxAsync(document);
        }
    }
}