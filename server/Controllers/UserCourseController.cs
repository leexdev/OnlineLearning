using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using server.Extensions;
using server.Interfaces;
using server.Mappers;
using server.Models;
using server.Repository;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserCourseController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IUserCourseRepository _ucRepo;

        public UserCourseController(UserManager<User> userManager, IUserCourseRepository ucRepo)
        {
            _userManager = userManager;
            _ucRepo = ucRepo;
        }

        [HttpGet("get-all")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAll()
        {
            var userCourses = await _ucRepo.GetAllAsync();
            var userCourseDtos = userCourses.Select(uc => uc.ToUserCourseDto());
            return Ok(userCourseDtos);
        }

        [HttpGet("get-by-userid")]
        [Authorize]
        public async Task<IActionResult> GetUserCourse()
        {
            var userName = User.GetUsername();
            var user = await _userManager.FindByNameAsync(userName);
            var userCourse = await _ucRepo.GetUserCourses(user.Id);
            return Ok(userCourse);
        }

        [HttpGet("has-access/{courseId}")]
        [Authorize]
        public async Task<IActionResult> HasAccess(int courseId)
        {
            var userName = User.GetUsername();
            var user = await _userManager.FindByNameAsync(userName);
            var userCourses = await _ucRepo.GetUserCourses(user.Id);
            var hasAccess = userCourses.Any(uc => uc.Id == courseId);
            return Ok(new { HasAccess = hasAccess });
        }
    }
}
