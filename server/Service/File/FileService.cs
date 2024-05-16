using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Interfaces;

namespace server.Service
{
    public class FileService : IFileService
    {
        public bool IsVideoFile(IFormFile file)
        {
            var allowedExtensions = new[] { ".mp4", ".avi", ".mov", ".wmv", ".flv", ".mkv" };
            var fileExtension = Path.GetExtension(file.FileName).ToLowerInvariant();
            return allowedExtensions.Contains(fileExtension);
        }
        public bool IsImageFile(IFormFile file)
        {
            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif", ".bmp" };
            var fileExtension = Path.GetExtension(file.FileName).ToLowerInvariant();
            return allowedExtensions.Contains(fileExtension);
        }

    }
}