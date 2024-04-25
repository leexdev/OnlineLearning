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

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            if(!ModelState.IsValid)
                return BadRequest();
                
            var subjects = await _subjectRepo.GetAllAsync();
            var subjectDto = subjects.Select(x => x.ToSubjectDto());
            return Ok(subjectDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if(!ModelState.IsValid)
                return BadRequest();
                
            var subject = await _subjectRepo.GetByIdAsync(id);
            if (subject == null)
            {
                return NotFound();
            }

            return Ok(subject.ToSubjectDto());
        }

        [HttpPost("{gradeId}")]
        public async Task<IActionResult> Create([FromRoute] int gradeId, [FromBody] CreateSubjectDto subjectDto)
        {
            if(!ModelState.IsValid)
                return BadRequest();
                
            if (!await _gradeRepo.GradeExists(gradeId))
            {
                return BadRequest("Grade does not exist");
            }
            var subject = subjectDto.ToSubjectFromCreate(gradeId);
            await _subjectRepo.CreateAsync(subject);
            return CreatedAtAction(nameof(GetById), new { id = subject.Id }, subject.ToSubjectDto());
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateSubjectDto subjectDto)
        {
            if(!ModelState.IsValid)
                return BadRequest();
                
            var subjectModel = await _subjectRepo.UpdateAsync(id, subjectDto.ToSubjectFromUpdate());
            if (subjectModel == null)
            {
                return NotFound();
            }

            return Ok(subjectModel.ToSubjectDto());
        }

        [HttpPut("delete/{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if(!ModelState.IsValid)
                return BadRequest();
                
            var subjectModel = await _subjectRepo.DeleteAsync(id);

            if (subjectModel == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}