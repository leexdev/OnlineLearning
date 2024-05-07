using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using server.Interfaces;
using server.Repository;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChapterController : ControllerBase
    {
        private readonly IChapterRepository _chappterRepo;
        public ChapterController(IChapterRepository chappterRepo)
        {
            _chappterRepo = chappterRepo;
        }
    }
}