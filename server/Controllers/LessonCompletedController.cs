using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
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
        private readonly UserManager<User> _userManager;

        public LessonCompletedController(ILessonCompletedRepository lessonCompletedRepo, UserManager<User> userManager)
        {
            _lessonCompletedRepo = lessonCompletedRepo;
            _userManager = userManager;
        }

        [HttpGet("get-all")]
        public async Task<IActionResult> GetAll()
        {
            var lessonCompletes = await _lessonCompletedRepo.GetAllAsync();
            var lessonCompletedDto = lessonCompletes.Select(lc => lc.ToLessonCompletedDto());
            return Ok(lessonCompletedDto);
        }

        [HttpPost("create")]
        [Authorize]
        public async Task<IActionResult> Create(CreateLessonCompletedDto lessonCompletedDto)
        {
            var userName = User.GetUsername();
            var user = await _userManager.FindByNameAsync(userName);
            var lessonComplete = lessonCompletedDto.ToLessonCompletedFromCreate(user.Id);
            await _lessonCompletedRepo.CreateAsync(lessonComplete);
            return Ok(lessonComplete.ToLessonCompletedDto());
        }

        [HttpGet("get-by-userid")]
        [Authorize]
        public async Task<IActionResult> GetByUserId(int courseId)
        {
            var userName = User.GetUsername();
            var user = await _userManager.FindByNameAsync(userName);
            var lessonCompletes = await _lessonCompletedRepo.GetByUserIdAsync(user.Id, courseId);
            var lessonCompletedDto = lessonCompletes.Select(lc => lc.ToLessonCompletedDto());
            return Ok(lessonCompletedDto);
        }
    }
}