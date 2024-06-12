using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dtos.TextToSpeech
{
    public class TextToSpeechRequest
    {
        [Required]
        public string? Text { get; set; }
        public string? Language { get; set; } = "vi";
    }
}