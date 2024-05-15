using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using server.Data;
using server.Dtos.Subject;
using server.Interfaces;
using server.Mappers;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SubjectController : ControllerBase
    {
        private readonly ISubjectRepository _subjectRepo;
        private readonly IGradeRepository _gradeRepo;
        public SubjectController(ISubjectRepository subjectRepo, IGradeRepository gradeRepo)
        {
            _subjectRepo = subjectRepo;
            _gradeRepo = gradeRepo;
        }

        [HttpGet("get-all")]
        public async Task<IActionResult> GetAll()
        {
            var subjects = await _subjectRepo.GetAllAsync();
            var subjectDto = subjects.Select(x => x.ToSubjectDto());
            return Ok(subjectDto);
        }

        [HttpGet("get-by-id/{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var subject = await _subjectRepo.GetByIdAsync(id);
            if (subject == null)
            {
                return NotFound();
            }

            return Ok(subject.ToSubjectDto());
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create(CreateSubjectDto subjectDto)
        {
            if (!await _gradeRepo.GradeExists(subjectDto.GradeId))
            {
                return BadRequest("Lớp học không tồn tại");
            }
            var subject = subjectDto.ToSubjectFromCreate();
            await _subjectRepo.CreateAsync(subject);
            return CreatedAtAction(nameof(GetById), new { id = subject.Id }, subject.ToSubjectDto());
        }

        [HttpPut("update/{id:int}")]
        public async Task<IActionResult> Update(int id, UpdateSubjectDto subjectDto)
        {
            if (!await _gradeRepo.GradeExists(subjectDto.GradeId))
            {
                return BadRequest("Lớp học không tồn tại");
            }
            var subjectModel = await _subjectRepo.UpdateAsync(id, subjectDto.ToSubjectFromUpdate());
            if (subjectModel == null)
            {
                return NotFound();
            }

            return Ok(subjectModel.ToSubjectDto());
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> Delete(int id)
        {
            var subjectModel = await _subjectRepo.DeleteAsync(id);

            if (subjectModel == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}