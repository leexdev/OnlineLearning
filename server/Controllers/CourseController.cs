using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net.WebSockets;
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
        private readonly IFireBaseService _firebaseService;
        private readonly IFileService _fileService;
        public CourseController(ICourseRepository courseRepo, ISubjectRepository subjectRepo, IDiscountRepository discountRepo, IFireBaseService firebaseService, IFileService fileService)
        {
            _courseRepo = courseRepo;
            _subjectRepo = subjectRepo;
            _discountRepo = discountRepo;
            _fileService = fileService;
            _firebaseService = firebaseService;
        }

        [HttpGet("get-all")]
        public async Task<IActionResult> GetAll()
        {
            var courses = await _courseRepo.GetAllAsync();
            var courseDto = courses.Select(x => x.ToCourseDto());
            return Ok(courseDto);
        }

        [HttpGet("get-by-id/{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var course = await _courseRepo.GetByIdAsync(id);
            if (course == null)
            {
                return NotFound();
            }

            return Ok(course.ToCourseDto());
        }

        [HttpGet("simple/{id:int}")]
        public async Task<IActionResult> GetCourseSimple([FromRoute] int id)
        {
            var course = await _courseRepo.GetCourseWithoutChildrenAsync(id);
            if (course == null)
            {
                return NotFound();
            }

            return Ok(course.ToCourseDto());
        }

        [HttpGet("get-by-subjectid/{subjectId}")]
        public async Task<IActionResult> GetBySubjectId([FromRoute] int subjectId)
        {
            var courses = await _courseRepo.GetBySubjectId(subjectId);
            var courseDto = courses.Select(c => c.ToCourseDto()).ToList();
            return Ok(courseDto);
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create(CreateCourseDto courseDto, IFormFile imageFile)
        {
            if (!await _subjectRepo.SubjectExists(courseDto.SubjectId))
                return BadRequest("Môn học không tồn tại");

            if (!_fileService.IsImageFile(imageFile))
                return BadRequest("Định dạng ảnh không phù hợp");

            try
            {
                var folderPath = $"image_course";
                var urlImage = await _firebaseService.HandleFile(null, folderPath, imageFile);
                var course = courseDto.ToCourseFromCreate(urlImage);
                await _courseRepo.CreateAsync(course);

                return CreatedAtAction(nameof(GetById), new { id = course.Id }, course.ToCourseDto());
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Có lỗi xảy ra khi tải lên video và tạo khóa học: {ex.Message}");
            }
        }

        [HttpPut("update/{id:int}")]
        public async Task<IActionResult> Update(int id, IFormFile imageFile, UpdateCourseDto courseDto)
        {
            if (!await _subjectRepo.SubjectExists(courseDto.SubjectId))
            {
                return BadRequest("Môn học không tồn tại");
            }

            var existingCourse = await _courseRepo.GetByIdAsync(id);
            if (existingCourse == null)
                return NotFound();

            var folderPath = $"image_course";
            var urlImage = await _firebaseService.HandleFile(existingCourse.ImageUrl, folderPath, imageFile);
            var updatedCourseModel = await _courseRepo.UpdateAsync(id, courseDto.ToCourseFromUpdate(urlImage));

            if (updatedCourseModel == null)
                return NotFound();

            return Ok(updatedCourseModel.ToCourseDto());
        }

        [HttpPut("apply-discount/{id:int}/{discountId:int}")]
        public async Task<IActionResult> ApplyDiscount(int id, int discountId)
        {
            if (!await _discountRepo.DiscountExists(discountId))
            {
                return BadRequest("Mã giảm giá không tồn tại");
            }

            var course = await _courseRepo.ApplyDiscountAsync(id, discountId);
            if (course == null)
            {
                return NotFound();
            }

            return Ok(course.ToCourseDto());
        }

        [HttpDelete("delete/{id:int}")]
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