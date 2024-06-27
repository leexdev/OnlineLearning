using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net.WebSockets;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using server.Dtos.Course;
using server.Dtos.UserCourse;
using server.Extensions;
using server.Helpers;
using server.Interfaces;
using server.Mappers;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CourseController : ControllerBase
    {
        private readonly ICourseRepository _courseRepo;
        private readonly ISubjectRepository _subjectRepo;
        private readonly IUserCourseRepository _ucRepo;
        private readonly UserManager<User> _userManager;
        private readonly IFireBaseService _firebaseService;
        private readonly IFileService _fileService;
        public CourseController(ICourseRepository courseRepo, ISubjectRepository subjectRepo, IUserCourseRepository ucRepo, UserManager<User> userManager, IFireBaseService firebaseService, IFileService fileService)
        {
            _courseRepo = courseRepo;
            _subjectRepo = subjectRepo;
            _ucRepo = ucRepo;
            _userManager = userManager;
            _fileService = fileService;
            _firebaseService = firebaseService;
        }

        [HttpGet("get-all")]
        public async Task<IActionResult> GetAll()
        {
            var courses = await _courseRepo.GetAllAsync();
            var courseDtos = courses.Select(p => p.ToCourseDto());
            return Ok(courseDtos);
        }

        [HttpGet("get-page")]
        public async Task<IActionResult> GetPage([FromQuery] QueryObject queryObject)
        {
            var (courses, totalRecords) = await _courseRepo.GetPageAsync(queryObject);
            var courseDto = courses.Select(x => x.ToCourseDto());

            var response = new
            {
                Data = courseDto,
                TotalRecords = totalRecords,
                TotalPages = (int)Math.Ceiling(totalRecords / (double)queryObject.PageSize)
            };

            return Ok(response);
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

        [HttpGet("get-by-allchidren/{id:int}")]
        public async Task<IActionResult> GetByIdAllChildren([FromRoute] int id)
        {
            var course = await _courseRepo.GetAllChildren(id);
            if (course == null)
            {
                return NotFound();
            }

            return Ok(course.ToCourseWithVideoLessonDto());
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

        [HttpGet("courses-by-teacher")]
        [Authorize(Roles = "Teacher")]
        public async Task<IActionResult> GetCoursesByTeacher()
        {
            var userName = User.GetUsername();
            var user = await _userManager.FindByNameAsync(userName);
            var courses = await _courseRepo.GetCoursesByTeacherAsync(user.Id);
            var courseDto = courses.Select(c => c.ToCourseDto());
            return Ok(courseDto);
        }


        [HttpGet("get-by-subjectid/{subjectId}")]
        public async Task<IActionResult> GetBySubjectId([FromRoute] int subjectId)
        {
            var courses = await _courseRepo.GetBySubjectId(subjectId);
            var courseDto = courses.Select(c => c.ToCourseDto()).ToList();
            return Ok(courseDto);
        }

        [HttpGet("get-by-subjectname/{subjectName}")]
        public async Task<IActionResult> GetBySubjectName([FromRoute] string subjectName)
        {
            var courses = await _courseRepo.GetBySubjectName(subjectName);
            var courseDto = courses.Select(c => c.ToCourseDto()).Take(4).ToList();
            return Ok(courseDto);
        }

        [HttpPost("create")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create([FromForm] CreateCourseDto courseDto, [FromForm] IFormFile imageFile, [FromForm] CreateTeacherCourseDto teacherCourseDto)
        {
            if (!await _subjectRepo.SubjectExists(courseDto.SubjectId))
                return BadRequest("Môn học không tồn tại");

            if (imageFile == null || !_fileService.IsImageFile(imageFile))
                return BadRequest("Ảnh bắt buộc và phải có định dạng phù hợp");

            var folderPath = $"image_course";
            string urlImage;
            try
            {
                urlImage = await _firebaseService.HandleFile(null, folderPath, imageFile);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi khi xử lý tệp hình ảnh: {ex.Message}");
            }

            var course = await _courseRepo.CreateAsync(courseDto.ToCourseFromCreate(urlImage));
            var userCourse = teacherCourseDto.ToTeacherCoursesFromCreate(course.Id);
            await _ucRepo.CreateTeacher(userCourse);

            return CreatedAtAction(nameof(GetById), new { id = course.Id }, course.ToCourseDto());
        }


        [HttpPut("update/{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(int id, [FromForm] UpdateCourseDto courseDto, [FromForm] IFormFile? imageFile, [FromForm] CreateTeacherCourseDto teacherCourseDto)
        {
            // Kiểm tra sự tồn tại của môn học
            if (!await _subjectRepo.SubjectExists(courseDto.SubjectId))
            {
                return BadRequest("Môn học không tồn tại");
            }

            var existingCourse = await _courseRepo.GetByIdAsync(id);
            if (existingCourse == null)
            {
                return NotFound();
            }

            string urlImage = existingCourse.ImageUrl;

            if (imageFile != null)
            {
                var folderPath = "image_course";
                try
                {
                    urlImage = await _firebaseService.HandleFile(existingCourse.ImageUrl, folderPath, imageFile);
                }
                catch (Exception ex)
                {
                    return StatusCode(500, $"Lỗi khi xử lý tệp hình ảnh: {ex.Message}");
                }
            }

            var updatedCourseModel = await _courseRepo.UpdateAsync(id, courseDto.ToCourseFromUpdate(urlImage));
            if (updatedCourseModel == null)
            {
                return NotFound("Không tìm thấy khóa học để cập nhật.");
            }

            try
            {
                var userCourse = teacherCourseDto.ToTeacherCoursesFromCreate(updatedCourseModel.Id);
                await _ucRepo.CreateTeacher(userCourse);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi khi tạo thông tin giảng viên: {ex.Message}");
            }

            return Ok(updatedCourseModel.ToCourseWithVideoLessonDto());
        }


        [HttpPut("update-new-price/{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdatePrice(int id, int price)
        {
            var course = await _courseRepo.UpdatePrice(id, price);
            if (course == null)
            {
                return NotFound();
            }

            return Ok(course.ToCourseDto());
        }

        [HttpPut("delete-new-price/{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteNewPrice(int id)
        {
            var course = await _courseRepo.DeleteNewPrice(id);
            if (course == null)
            {
                return NotFound();
            }

            return Ok(course.ToCourseDto());
        }


        [HttpDelete("delete/{id:int}")]
        [Authorize(Roles = "Admin")]
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