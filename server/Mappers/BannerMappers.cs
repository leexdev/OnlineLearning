using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Dtos.Banner;
using server.Models;

namespace server.Mappers
{
    public static class BannerMappers
    {
        public static BannerDto ToBannerDto(this Banner bannerModel)
        {
            return new BannerDto
            {
                Id = bannerModel.Id,
                ImageUrl = bannerModel.ImageUrl,
                Link = bannerModel.Link
            };
        }

        public static Banner ToBannerFromCreate(this CreateBannerDto bannerDto)
        {
            return new Banner
            {
                ImageUrl = bannerDto.ImageUrl,
                Link = bannerDto.Link
            };
        }

        public static Banner ToBannerFromUpdate(this UpdateBannerDto bannerDto)
        {
            return new Banner
            {
                ImageUrl = bannerDto.ImageUrl,
                Link = bannerDto.Link
            };
        }
    }
}