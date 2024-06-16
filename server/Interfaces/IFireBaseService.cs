using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Interfaces
{
    public interface IFireBaseService
    {
        Task<string> HandleFile(string existingFileUrl, string folderPath, IFormFile newFile);
        Task DeleteFile(string fileUrl);
        string ConvertUrlToRelativePath(string fileUrl);
    }
}