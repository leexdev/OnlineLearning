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
        private readonly IDiscountRepository _discountRepo;
        public CourseController(ICourseRepository courseRepo, ISubjectRepository subjectRepo, IDiscountRepository discountRepo)
        {
            _courseRepo = courseRepo;
            _subjectRepo = subjectRepo;
            _discountRepo = discountRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var courses = await _courseRepo.GetAllAsync();
            var courseDto = courses.Select(x => x.ToCourseDto());
            return Ok(courseDto);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var course = await _courseRepo.GetByIdAsync(id);
            if (course == null)
            {
                return NotFound();
            }

            return Ok(course.ToCourseDto());
        }


        [HttpPost]
        public async Task<IActionResult> Create(CreateCourseDto courseDto)
        {
            if (!await _subjectRepo.SubjectExists(courseDto.SubjectId))
            {
                return BadRequest("Môn học không tồn tại");
            }

            var course = courseDto.ToCourseFromCreate(courseDto.SubjectId);
            await _courseRepo.CreateAsync(course);
            return CreatedAtAction(nameof(GetById), new { id = course.Id }, course.ToCourseDto());
        }

        [HttpPut("{id:int}/discounts/{discountId:int}")]
        public async Task<IActionResult> ApplyDiscount(int id, int discountId)
        {
            if (!await _discountRepo.DiscountExists(discountId))
            {
                return BadRequest("Mã giảm giá không tồn tại");
            }

            var course = await _courseRepo.ApplyDiscountAsync(id, discountId);
            if(course == null)
            {
                return NotFound();
            }

            return Ok(course.ToCourseDto());
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, UpdateCourseDto courseDto)
        {
            if (!await _subjectRepo.SubjectExists(courseDto.SubjectId))
            {
                return BadRequest("Môn học không tồn tại");
            }
            
            var course = await _courseRepo.UpdateAsync(id, courseDto.ToCourseFromUpdate());
            if (course == null)
            {
                return NotFound();
            }

            return Ok(course.ToCourseDto());
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var course = await _courseRepo.DeleteAsync(id);

            if (course == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}