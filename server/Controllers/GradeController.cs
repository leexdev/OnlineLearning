using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Dtos.Grade;
using server.Interfaces;
using server.Mappers;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GradeController : ControllerBase
    {
        private readonly IGradeRepository _gradeRepo;
        public GradeController(IGradeRepository gradeRepo)
        {
            _gradeRepo = gradeRepo;
        }

        [HttpGet("get-all")]
        public async Task<IActionResult> GetAll()
        {
            var grades = await _gradeRepo.GetAllAsync();
            var gradeDto = grades.Select(x => x.ToGradeDto());
            return Ok(gradeDto);
        }

        [HttpGet("get-by-id/{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var grade = await _gradeRepo.GetByIdAsync(id);
            if (grade == null)
            {
                return NotFound();
            }

            return Ok(grade.ToGradeDto());
        }

        [HttpPost("create")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create(CreateGradeDto gradeDto)
        {
            var existingGrade = await _gradeRepo.FindByNameAsync(gradeDto.Name);
            if (existingGrade != null)
            {
                return Conflict(new { message = "Khối lớp đã tồn tại" });
            }

            var grade = gradeDto.ToGradeFromCreate();
            await _gradeRepo.CreateAsync(grade);
            return CreatedAtAction(nameof(GetById), new { id = grade.Id }, grade.ToGradeDto());
        }

        [HttpPut("update/{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(int id, UpdateGradeDto updateDto)
        {
            var existingGrade = await _gradeRepo.FindByNameAsync(updateDto.Name);
            if (existingGrade != null && existingGrade.Id != id)
            {
                return Conflict(new { message = "Khối lớp đã tồn tại" });
            }

            var gradeModel = await _gradeRepo.UpdateAsync(id, updateDto.ToGradeFromUpdate());
            if (gradeModel == null)
            {
                return NotFound();
            }
            return Ok(gradeModel.ToGradeDto());
        }
        
        [HttpDelete("delete/{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
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