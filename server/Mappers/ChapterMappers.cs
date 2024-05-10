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
                Lessons = chapterModel.Lessons.Select(l => l.ToLessonDto()).ToList()
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