using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Storage;
using server.Dtos.Chapter;
using server.Models;

namespace server.Mappers
{
    public static class ChapterMappers
    {
        public static ChapterDto ToChapterDto(this Chapter chapterModel)
        {
            return new ChapterDto
            {
                Id = chapterModel.Id,
                Name = chapterModel.Name,
                CourseId = chapterModel.CourseId,
                Order = chapterModel.Order,
                Lessons = chapterModel.Lessons.Select(l => l.ToLessonDto()).ToList()
            };
        }

        public static ChapterDto ToChapterWithVideoLessonDto(this Chapter chapterModel)
        {
            return new ChapterDto
            {
                Id = chapterModel.Id,
                Name = chapterModel.Name,
                CourseId = chapterModel.CourseId,
                Lessons = chapterModel.Lessons.Select(l => l.ToLessonVideoDto()).ToList()
            };
        }

        public static Chapter ToChapterFromCreate(this CreateChapterDto chapterDto)
        {
            return new Chapter
            {
                Name = chapterDto.Name,
                CourseId = chapterDto.CourseId
            };
        }

        public static List<Chapter> ToChapterOrder(this List<ChapterOrder> chapterDtos)
        {
            return chapterDtos.Select(chapterDto => new Chapter
            {
                Id = chapterDto.Id,
                CourseId = chapterDto.CourseId,
                Order = chapterDto.Order
            }).ToList();
        }

        public static Chapter ToChapterFromUpdate(this UpdateChapterDto chapterDto)
        {
            return new Chapter
            {
                Name = chapterDto.Name,
                CourseId = chapterDto.CourseId
            };
        }
    }
}