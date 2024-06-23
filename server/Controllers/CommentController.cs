using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Azure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using server.Dtos.Comment;
using server.Extensions;
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

        [HttpGet("get-all")]
        public async Task<IActionResult> GetAll()
        {
            var comments = await _commentRepo.GetAllAsync();
            var commentDto = comments.Select(c => c.ToCommentDto());
            return Ok(commentDto);
        }

        [HttpGet("get-by-lessonid")]
        public async Task<IActionResult> GetByLessonId(int lessonId, int page = 1, int pageSize = 10)
        {
            var comments = await _commentRepo.GetByLessonId(lessonId, page, pageSize);
            var commentDto = comments.Select(c => c.ToCommentDto());
            return Ok(commentDto);
        }

        [HttpPost("create")]
        [Authorize]
        public async Task<IActionResult> Create(CreateCommentDto commentDto)
        {
            if (!await _lessonRepo.LessonExists(commentDto.LessonId))
            {
                return BadRequest("Bài giảng không tồn tại");
            }
            var userName = User.GetUsername();
            var user = await _userManager.FindByNameAsync(userName);
            var commentModel = commentDto.ToCommentFromCreate(user.Id);

            await _commentRepo.CreateAsync(commentModel);
            if (commentModel == null)
            {
                return StatusCode(500, "Could not create");
            }
            else
            {
                return CreatedAtAction(nameof(GetByLessonId), new { lessonId = commentModel.LessonId, page = 1, pageSize = 10 }, commentModel.ToCommentDto());
            }
        }

        [HttpPut("update/{id:int}")]
        [Authorize]
        public async Task<IActionResult> Update(int id, UpdateCommentDto commentDto)
        {
            var comment = await _commentRepo.UpdateAsync(id, commentDto.ToCommentFromUpdate());
            if (comment == null)
            {
                return NotFound();
            }

            return Ok(comment.ToCommentDto());
        }

        [HttpDelete("delete/{id:int}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            var comment = await _commentRepo.DeleteAsync(id);
            if (comment == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}