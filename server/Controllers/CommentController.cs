using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using server.Dtos.Comment;
using server.Interfaces;
using server.Mappers;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepo;
        private readonly ILessonRepository _lessonRepo;
        private readonly UserManager<User> _userManager;
        public CommentController(ICommentRepository commentRepo, ILessonRepository lessonRepo, UserManager<User> userManager)
        {
            _commentRepo = commentRepo;
            _lessonRepo = lessonRepo;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var comments = await _commentRepo.GetAllAsync();
            var commentDto = comments.Select(c => c.ToCommentDto());
            return Ok(commentDto);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create(CreateCommentDto commentDto)
        {
            if (!await _lessonRepo.LessonExists(commentDto.LessonId))
            {
                return BadRequest("Bài giảng không tồn tại");
            }
            var userName = HttpContext.User?.FindFirst(ClaimTypes.GivenName)?.Value;
            var user = await _userManager.FindByNameAsync(userName);
            var commentModel = commentDto.ToCommentFromCreate(user.Id);

            await _commentRepo.CreateAsync(commentModel);
            if (commentModel == null)
            {
                return StatusCode(500, "Could not create");
            }
            else
            {
                return Created();
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(int id, UpdateCommentDto commentDto)
        {
            var comment = await _commentRepo.UpdateAsync(id, commentDto.ToCommentFromUpdate());
            if(comment == null)
            {
                return NotFound();
            }

            return Ok(comment.ToCommentDto());
        }
    }
}