using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using server.Interfaces;
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

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetUserCourse()
        {
            var userName = HttpContext.User?.FindFirst(ClaimTypes.GivenName)?.Value;
            var user = await _userManager.FindByNameAsync(userName);
            var userCourse = await _ucRepo.GetUserCourses(user);
            return Ok(userCourse);
        }

        // [HttpPost]
        // [Authorize]
        // public async Task<IActionResult> AddUserCourse()
        // {

        // }
    }
}