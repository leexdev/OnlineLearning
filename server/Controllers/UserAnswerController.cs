using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using server.Dtos.UserAnswerHistory;
using server.Extensions;
using server.Interfaces;
using server.Mappers;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserAnswerController : ControllerBase
    {
        private readonly IUserAnswerHistoryRepository _userAnswerRepo;
        private readonly UserManager<User> _userManager;

        public UserAnswerController(IUserAnswerHistoryRepository userAnswerRepo, UserManager<User> userManager)
        {
            _userAnswerRepo = userAnswerRepo;
            _userManager = userManager;
        }

        [HttpPost("get-all")]
        public async Task<IActionResult> GetAll()
        {
            var userAnswers = await _userAnswerRepo.GetAllAsync();
            var userAnswerHistoryDto = userAnswers.Select(uah => uah.ToUserAnswerDto());
            return Ok(userAnswerHistoryDto);
        }

        [HttpPost("save-history")]
        [Authorize]
        public async Task<IActionResult> SaveUserAnswerHistory([FromBody] CreateUserAnswerHistoryDto dto)
        {
            var userName = User.GetUsername();
            var user = await _userManager.FindByNameAsync(userName);
            var userAnswerHistory = dto.ToUserAnswerHistoryFromCreate(user.Id);
            await _userAnswerRepo.AddAsync(userAnswerHistory);
            return Ok(userAnswerHistory);
        }

        [HttpGet("check-last-answer/{questionId}")]
        [Authorize]
        public async Task<IActionResult> CheckLastAnswer(int questionId)
        {
            var userName = User.GetUsername();
            var user = await _userManager.FindByNameAsync(userName);
            var lastAnswerResult = await _userAnswerRepo.GetUserLastAnswerAsync(user.Id, questionId);
            if (lastAnswerResult == null)
            {
                return NotFound();
            }
            return Ok(lastAnswerResult);
        }

        [HttpGet("correct-answers")]
        [Authorize]
        public async Task<IActionResult> GetCorrectAnswers()
        {
            var userName = User.GetUsername();
            var user = await _userManager.FindByNameAsync(userName);
            var correctAnswers = await _userAnswerRepo.GetLastCorrectAnswersAsync(user.Id);
            return Ok(correctAnswers);
        }
    }
}
