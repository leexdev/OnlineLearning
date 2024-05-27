using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Dtos.Rating;
using server.Models;

namespace server.Mappers
{
    public static class RatingMappers
    {
        public static RatingDto ToRatingDto(this Rating ratingModel)
        {
            return new RatingDto
            {
                Id = ratingModel.Id,
                CourseId = ratingModel.CourseId,
                UserId = ratingModel.UserId,
                Score = ratingModel.Score
            };
        }

        public static Rating ToRatingFromCreate(this CreateRatingDto ratingDto, string userId)
        {
            return new Rating
            {
                UserId = userId,
                CourseId = ratingDto.CourseId,
                Score = ratingDto.Score
            };
        }

        public static Rating ToRatingFromUpdate(this UpdateRatingDto ratingDto)
        {
            return new Rating
            {
                Score = ratingDto.Score
            };
        }
    }
}