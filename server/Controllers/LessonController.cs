using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.VisualBasic;
using server.Dtos.Lesson;
using server.Extensions;
using server.Interfaces;
using server.Mappers;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LessonController : ControllerBase
    {
        private readonly ILessonRepository _lessonRepo;
        private readonly IUserCourseRepository _ucRepo;
        private readonly IChapterRepository _chapterRepo;
        private readonly IFireBaseService _firebaseService;
        private readonly IFileService _fileService;
        private readonly UserManager<User> _userManager;

        public LessonController(ILessonRepository lessonRepo, IChapterRepository chapterRepo, IUserCourseRepository ucRepo, IFireBaseService firebaseService, IFileService fileService, UserManager<User> userManager)
        {
            _lessonRepo = lessonRepo;
            _chapterRepo = chapterRepo;
            _ucRepo = ucRepo;
            _firebaseService = firebaseService;
            _fileService = fileService;
            _userManager = userManager;
        }

        [HttpGet("get-all")]
        public async Task<IActionResult> GetAll()
        {
            var lessons = await _lessonRepo.GetAllAsync();
            var lessonDto = lessons.Select(l => l.ToLessonDto());
            return Ok(lessonDto);
        }

        [HttpGet("get-by-id/{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var lesson = await _lessonRepo.GetByIdAsync(id);
            if (lesson == null)
            {
                return NotFound();
            }

            return Ok(lesson.ToLessonDto());
        }

        [HttpGet("get-by-course-id/{courseId:int}")]
        public async Task<IActionResult> GetByCourseId(int courseId)
        {
            var lessons = await _lessonRepo.GetByCourseIdAsync(courseId);
            var lessonDtos = lessons.Select(l => l.ToLessonDto());
            return Ok(lessonDtos);
        }

        [HttpGet("{lessonId}/video")]
        public async Task<IActionResult> GetLessonVideo(int lessonId)
        {
            var lesson = await _lessonRepo.GetByIdAsync(lessonId);
            if (lesson == null)
            {
                return NotFound("Bài học không tồn tại");
            }

            if (lesson.isFree)
            {
                return Ok(lesson.ToLessonVideoDto());
            }

            if (!User.Identity.IsAuthenticated)
            {
                return Unauthorized("Bạn cần đăng nhập để truy cập video này");
            }

            var userName = User.GetUsername();
            var user = await _userManager.FindByNameAsync(userName);

            var userRoles = await _userManager.GetRolesAsync(user);

            if (userRoles.Contains("Admin"))
            {
                return Ok(lesson.ToLessonVideoDto());
            }

            var userCourses = await _ucRepo.GetUserCourses(user.Id);

            var hasAccess = userCourses.Any(uc => uc.Id == lesson.Chapter.CourseId);
            if (!hasAccess)
            {
                return Forbid();
            }

            return Ok(lesson.ToLessonVideoDto());
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create(CreateLessonDto lessonDto)
        {
            try
            {
                if (!await _chapterRepo.ChapterExist(lessonDto.ChapterId))
                    return NotFound("Chương không tồn tại");

                var lesson = lessonDto.ToLessonFromCreate();
                await _lessonRepo.CreateAsync(lesson);

                return CreatedAtAction(nameof(GetById), new { id = lesson.Id }, lesson.ToLessonDto());
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Có lỗi xảy ra khi tạo bài học: {ex.Message}");
            }
        }

        [HttpPut("update-order/{chapterId:int}")]
        public async Task<IActionResult> UpdateOrder(int chapterId, [FromBody] List<LessonOrder> lessons)
        {
            if (!await _chapterRepo.ChapterExist(chapterId))
                return NotFound("Chương không tồn tại");

            await _lessonRepo.UpdateLessonOrderAsync(chapterId, lessons.ToLessonOrder());
            return Ok(lessons);
        }

        [HttpPost("upload-video/{id:int}")]
        public async Task<IActionResult> UploadVideoLesson(int id, IFormFile videoFile)
        {
            try
            {
                // if (!await _lessonRepo.LessonExists(id))
                //     return NotFound("Bài giảng không tồn tại");

                // if (videoFile == null || videoFile.Length == 0)
                //     return BadRequest("Không có file video nào được chọn");

                // if (!_fileService.IsVideoFile(videoFile))
                //     return BadRequest("Định dạng video không phù hợp");

                var existingLesson = await _lessonRepo.GetByIdAsync(id);
                if (existingLesson == null)
                    return NotFound();

                // var folderPath = $"video_lesson";
                // var urlVideo = await _firebaseService.HandleFile(null, folderPath, videoFile);
                var urlVideo = "https://firebasestorage.googleapis.com/v0/b/learningonline-91538.appspot.com/o/video_lesson%2FTi%E1%BA%BFng%20Vi%E1%BB%87t%201%20%20%20Ch%E1%BB%AF%20A.mp4?alt=media&token=ac0d4527-66ae-47fd-9139-9c7cc75b5282";

                var lesson = await _lessonRepo.UpdateVideo(id, urlVideo);
                if (lesson == null)
                    return NotFound();

                return CreatedAtAction(nameof(GetById), new { id = lesson.Id }, lesson.ToLessonDto());
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Có lỗi xảy ra khi tạo bài học và tải lên video: {ex.Message}");
            }
        }


        [HttpPut("update/{id:int}")]
        public async Task<IActionResult> Update(int id, UpdateLessonDto lessonDto)
        {
            try
            {
                var existingLesson = await _lessonRepo.GetByIdAsync(id);
                if (existingLesson == null)
                    return NotFound();

                var updatedLessonModel = await _lessonRepo.UpdateAsync(id, lessonDto.ToLessonFromUpdate());

                if (updatedLessonModel == null)
                    return NotFound();

                return Ok(updatedLessonModel.ToLessonDto());
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Có lỗi xảy ra khi cập nhật bài học: {ex.Message}");
            }
        }

        [HttpDelete("delete/{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var lessonModel = await _lessonRepo.DeleteAsync(id);
            if (lessonModel == null)
            {
                return NotFound();
            }
            if (!lessonModel.VideoURL.IsNullOrEmpty())
            {
                await _firebaseService.DeleteFile(lessonModel.VideoURL);
            }

            return NoContent();
        }
    }
}