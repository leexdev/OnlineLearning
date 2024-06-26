using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Dtos.Banner;
using server.Dtos.Course;
using server.Interfaces;
using server.Mappers;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BannerController : ControllerBase
    {
        private readonly IBannerRepository _bannerRepo;
        public BannerController(IBannerRepository bannerRepo)
        {
            _bannerRepo = bannerRepo;
        }

        [HttpGet("get-all")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAll()
        {
            var banners = await _bannerRepo.GetAllAsync();
            var bannerDto = banners.Select(b => b.ToBannerDto());
            return Ok(bannerDto);
        }

        [HttpGet("get-by-id/{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetById(int id)
        {
            var banner = await _bannerRepo.GetByIdAsync(id);
            if (banner == null)
            {
                return NotFound();
            }

            return Ok(banner.ToBannerDto());
        }

        [HttpPost("create")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create(CreateBannerDto bannerDto)
        {
            var banner = bannerDto.ToBannerFromCreate();
            await _bannerRepo.CreateAsync(banner);
            return CreatedAtAction(nameof(GetById), new { id = banner.Id }, banner.ToBannerDto());
        }

        [HttpPut("update/{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(int id, UpdateBannerDto updateDto)
        {
            var banner = await _bannerRepo.UpdateAsync(id, updateDto.ToBannerFromUpdate());

            if (banner == null)
            {
                return NotFound();
            }

            return Ok(banner.ToBannerDto());
        }

        [HttpDelete("delete/{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            var banner = await _bannerRepo.DeleteAsync(id);
            if (banner == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}