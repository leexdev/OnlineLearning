using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Dtos.New;
using server.Models;

namespace server.Mappers
{
    public static class NewMappers
    {
        public static NewsDto ToNewsDto(this News newsModel)
        {
            return new NewsDto
            {
                Id = newsModel.Id,
                Title = newsModel.Title,
                Content = newsModel.Content,
                ImageUrl = newsModel.ImageUrl,
                GradeId = newsModel.GradeId
            };
        }

        public static News ToNewsFromCreate(this CreateNewsDto newsDto)
        {
            return new News
            {
                Title = newsDto.Title,
                Content = newsDto.Content,
                ImageUrl = newsDto.ImageUrl,
                GradeId = newsDto.GradeId
            };
        }

        public static News ToNewsFromUpdate(this UpdateNewsDto newsDto)
        {
            return new News
            {
                Title = newsDto.Title,
                Content = newsDto.Content,
                ImageUrl = newsDto.ImageUrl,
                GradeId = newsDto.GradeId
            };
        }
    }
}