using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using server.Dtos.LessonCompleted;
using server.Extensions;
using server.Interfaces;
using server.Mappers;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LessonCompletedController : ControllerBase
    {
        private readonly ILessonCompletedRepository _lessonCompletedRepo;

        public LessonCompletedController(ILessonCompletedRepository lessonCompletedRepo)
        {
            _lessonCompletedRepo = lessonCompletedRepo;
        }

        [HttpGet("get-all")]
        public async Task<IActionResult> GetAll()
        {
            var lessonCompletes = await _lessonCompletedRepo.GetAllAsync();
            var lessonCompletedDto = lessonCompletes.Select(lc => lc.ToLessonCompletedDto());
            return Ok(lessonCompletedDto);
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create(CreateLessonCompletedDto lessonCompletedDto)
        {
            var lessonComplete = lessonCompletedDto.ToLessonCompletedFromCreate();
            await _lessonCompletedRepo.CreateAsync(lessonComplete);
            return Ok(lessonComplete.ToLessonCompletedDto());
        }

        [HttpGet("get-by-userid")]
        public async Task<IActionResult> GetByUserId(Guid userId)
        {
            var lessonCompletes = await _lessonCompletedRepo.GetByUserIdAsync(userId);
            var lessonCompletedDto = lessonCompletes.Select(lc => lc.ToLessonCompletedDto());
            return Ok(lessonCompletedDto);
        }
    }
}