using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Interfaces
{
    public interface ITextToSpeechService
    {
        Task<byte[]> ConvertTextToSpeechAsync(string text, string languageCode = "vi-VN");
    }
}