using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Dtos.Comment;
using server.Models;

namespace server.Mappers
{
    public static class CommentMappers
    {
        public static CommentDto ToCommentDto(this Comment commentModel)
        {
            return new CommentDto
            {
                Id = commentModel.Id,
                LessonId = commentModel.LessonId,
                UserId = commentModel.UserId,
                Content = commentModel.Content
            };
        }

        public static Comment ToCommentFromCreate(this CreateCommentDto commentDto, string userId)
        {
            return new Comment
            {
                LessonId = commentDto.LessonId,
                Content = commentDto.Content,
                UserId = userId
            };
        }

        public static Comment ToCommentFromUpdate(this UpdateCommentDto commentDto)
        {
            return new Comment
            {
                Content = commentDto.Content
            };
        }
    }
}