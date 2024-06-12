using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Helpers.GoogleCloud
{
    public class AnalyzeSpeechRequest
    {
        public IFormFile? AudioFile { get; set; }
    }
}