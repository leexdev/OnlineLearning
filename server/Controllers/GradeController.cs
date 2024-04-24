using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Dtos.Grade;
using server.Interfaces;
using server.Mappers;

namespace server.Controllers
{
    [Route("api/grade")]
    [ApiController]
    public class GradeController : ControllerBase
    {
        private readonly IGradeRepository _gradeRepo;
        public GradeController(IGradeRepository gradeRepo)
        {
            _gradeRepo = gradeRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var grades = await _gradeRepo.GetAllAsync();
            var gradeDto = grades.Select(x => x.ToGradeDto());
            return Ok(gradeDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var grade = await _gradeRepo.GetByIdAsync(id);
            if (grade == null)
            {
                return NotFound();
            }

            return Ok(grade.ToGradeDto());
        }

        [HttpPost]
        public async Task<IActionResult> CreateGrade([FromBody] CreateGradeDto gradeDto)
        {
            var grade = gradeDto.ToGradeFromCreate();
            await _gradeRepo.CreateAsync(grade);
            return CreatedAtAction(nameof(GetById), new { id = grade.Id }, grade.ToGradeDto());
        }

        [HttpPut]
        [Route("update/{id}")]
        public async Task<IActionResult> UpdateGrade([FromRoute] int id, [FromBody] UpdateGradeDto updateDto)
        {
            var gradeModel = await _gradeRepo.UpdateAsync(id, updateDto.ToGradeFromUpdate());
            if (gradeModel == null)
            {
                return NotFound();
            }
            return Ok(gradeModel.ToGradeDto());
        }

        // [HttpDelete]
        // [Route("{id}")]
        // public async Task<IActionResult> DeleteGrade([FromRoute] int id)
        // {
        //     var gradeModel = await _context.Grades.FirstOrDefaultAsync(x => x.Id == id);
        //     if (gradeModel == null)
        //     {
        //         return NotFound();
        //     }
        //     _context.Grades.Remove(gradeModel);
        //     await _context.SaveChangesAsync();
        //     return NoContent();
        // }

        [HttpPut]
        [Route("delete/{id}")]
        public async Task<IActionResult> DeleteGrade([FromRoute] int id)
        {
            var gradeModel = await _gradeRepo.DeleteAsync(id);
            if (gradeModel == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}