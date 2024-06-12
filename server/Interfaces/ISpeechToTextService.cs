using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Interfaces
{
    public interface ISpeechToTextService
    {
        Task<string> TranscribeAudioAsync(IFormFile audioFile);
    }
}