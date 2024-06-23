using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using server.Dtos.Rating;
using server.Extensions;
using server.Interfaces;
using server.Mappers;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RatingController : ControllerBase
    {
        private readonly ICourseRepository _courseRepo;
        private readonly IRatingRepository _ratingRepo;
        private readonly UserManager<User> _userManager;

        public RatingController(ICourseRepository courseRepo, IRatingRepository ratingRepo, UserManager<User> userManager)
        {
            _ratingRepo = ratingRepo;
            _userManager = userManager;
            _courseRepo = courseRepo;
        }

        [HttpGet("get-all")]
        public async Task<IActionResult> GetAll()
        {
            var ratings = await _ratingRepo.GetAllAsync();
            var ratingDto = ratings.Select(r => r.ToRatingDto());
            return Ok(ratingDto);
        }

        [HttpGet("get-by-course/{courseId:int}")]
        public async Task<IActionResult> GetByCourse(int courseId)
        {
            var ratings = await _ratingRepo.GetByCourseIdAsync(courseId);
            var ratingDto = ratings.Select(r => r.ToRatingDto());
            return Ok(ratingDto);
        }

        [HttpPost("create")]
        [Authorize]
        public async Task<IActionResult> Create(CreateRatingDto ratingDto)
        {
            if (!await _courseRepo.CourseExists(ratingDto.CourseId))
            {
                return BadRequest("Khóa học không tồn tại");
            }

            var userName = User.GetUsername();
            var user = await _userManager.FindByNameAsync(userName);
            var ratingModel = ratingDto.ToRatingFromCreate(user.Id);
            var rating = await _ratingRepo.CreateAsync(user.Id, ratingModel);
            if (rating == null)
            {
                return NotFound();
            }
            return Ok(rating.ToRatingDto());
        }
    }
}