using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using server.Dtos.Discount;
using server.Interfaces;
using server.Mappers;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DiscountController : ControllerBase
    {
        private readonly IDiscountRepository _discountRepo;
        public DiscountController(IDiscountRepository discountRepo)
        {
            _discountRepo = discountRepo;
        }

        [HttpGet("get-all")]
        public async Task<IActionResult> GetAll()
        {
            var discounts = await _discountRepo.GetAllAsync();
            var discountDto = discounts.Select(d => d.ToDiscountDto());
            return Ok(discountDto);
        }

        [HttpGet("get-by-id/{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var discount = await _discountRepo.GetByIdAsync(id);
            if (discount == null)
            {
                return NotFound();
            }

            return Ok(discount.ToDiscountDto());
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create(CreateDiscountDto discountDto)
        {
            var discount = discountDto.ToDiscountFromCreate();
            await _discountRepo.CreateAsync(discount);
            return CreatedAtAction(nameof(GetById), new { id = discount.Id }, discount.ToDiscountDto());
        }

        [HttpDelete("delete/{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var discount = await _discountRepo.DeleteAsync(id);
            if(discount == null)
            {
                return NotFound();
            }
            
            return NoContent();
        }
    }
}