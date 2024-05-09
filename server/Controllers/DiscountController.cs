using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using server.Interfaces;
using server.Mappers;

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

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var discounts = await _discountRepo.GetAllAsync();
            var discountDto = discounts.Select(d => d.ToDiscountDto());
            return Ok(discountDto);
        }
    }
}