using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Dtos.Advise;
using server.Extensions;
using server.Interfaces;
using server.Mappers;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdviseController : ControllerBase
    {
        private readonly IAdviseRepository _adviseRepo;
        private readonly ICourseRepository _courseRepo;
        private readonly UserManager<User> _userManager;

        public AdviseController(IAdviseRepository adviseRepo, ICourseRepository courseRepo, UserManager<User> userManager)
        {
            _adviseRepo = adviseRepo;
            _courseRepo = courseRepo;
            _userManager = userManager;
        }

        [HttpGet("get-all")]
        public async Task<IActionResult> GetAll()
        {
            var advises = await _adviseRepo.GetAllAsync();
            var adviseDto = advises.Select(a => a.ToAdviseDto());
            return Ok(adviseDto);
        }

        [HttpGet("get-by-id")]
        public async Task<IActionResult> GetById(int id)
        {
            var advise = await _adviseRepo.GetById(id);
            if (advise == null)
            {
                return NotFound();
            }
            return Ok(advise.ToAdviseDto());
        }

        [HttpGet("get-by-courseid")]
        [Authorize(Roles = "Teacher")]
        public async Task<IActionResult> GetByCourseId(int courseId)
        {
            var advises = await _adviseRepo.GetByCourseId(courseId);
            var adviseDto = advises.Select(a => a.ToAdviseDto());
            return Ok(adviseDto);
        }

        [HttpGet("by-teacher")]
        [Authorize(Roles = "Teacher")]
        public async Task<IActionResult> GetAdvisesByTeacher()
        {
            var userName = User.GetUsername();
            var user = await _userManager.FindByNameAsync(userName);
            var advises = await _adviseRepo.GetAdvisesByTeacherAsync(user.Id);
            var adviseDto = advises.Select(a => a.ToAdviseDto());
            return Ok(adviseDto);
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create(CreateAdviseDo adviseDto)
        {
            if (!await _courseRepo.CourseExists(adviseDto.courseId))
            {
                return NotFound("Khóa học không tồn tại");
            }

            var advise = adviseDto.ToAdviseFromCreate();
            await _adviseRepo.CreateAsync(advise);
            return CreatedAtAction(nameof(GetById), new { id = advise.Id }, advise.ToAdviseDto());
        }

        [HttpPut("update/{id:int}")]
        [Authorize(Roles = "Teacher,Admin")]
        public async Task<IActionResult> Update(int id, UpdateAdviseDto adviseDto)
        {
            var advise = await _adviseRepo.UpdateAsync(id, adviseDto.ToAnswerFromUpdate());
            if (advise == null)
            {
                return NotFound();
            }

            return Ok(advise.ToAdviseDto());
        }

        [HttpPut("delete/{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            var advise = await _adviseRepo.DeleteAsync(id);
            if (advise == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}