using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Interfaces
{
    public interface IFileService
    {
        bool IsVideoFile(IFormFile file);
        bool IsImageFile(IFormFile file);
    }
}