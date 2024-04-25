using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using server.Dtos.Course;
using server.Interfaces;
using server.Mappers;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CourseController : ControllerBase
    {
        private readonly ICourseRepository _courseRepo;
        private readonly ISubjectRepository _subjectRepo;
        public CourseController(ICourseRepository courseRepo, ISubjectRepository subjectRepo)
        {
            _courseRepo = courseRepo;
            _subjectRepo = subjectRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var courses = await _courseRepo.GetAllAsync();
            var courseDto = courses.Select(x => x.ToCourceDto());
            return Ok(courseDto);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var course = await _courseRepo.GetByIdAsync(id);
            if (course == null)
            {
                return NotFound();
            }

            return Ok(course.ToCourceDto());
        }


        [HttpPost("{subjectId}")]
        public async Task<IActionResult> Create([FromRoute] int subjectId, [FromBody] CreateCourseDto courseDto)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            if (!await _subjectRepo.SubjectExists(subjectId))
            {
                return BadRequest("gradId does not exist");
            }

            var course = courseDto.ToCourseFromCreate(subjectId);
            await _courseRepo.CreateAsync(course);
            return CreatedAtAction(nameof(GetById), new { id = course.Id }, course.ToCourceDto());
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateCourseDto courseDto)
        {
            if(!ModelState.IsValid)
                return BadRequest();
                
            var courseModel = await _courseRepo.UpdateAsync(id, courseDto.ToCourseFromUpdate());
            if (courseModel == null)
            {
                return NotFound();
            }

            return Ok(courseModel.ToCourceDto());
        }

        [HttpPut("delete/{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if(!ModelState.IsValid)
                return BadRequest();
                
            var courseModel = await _courseRepo.DeleteAsync(id);

            if (courseModel == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}