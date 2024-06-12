using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Google.Cloud.Language.V1;

namespace server.Interfaces
{
    public interface ITextAnalysisService
    {
        Task<AnalyzeSyntaxResponse> AnalyzeTextAsync(string text);
    }
}