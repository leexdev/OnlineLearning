using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using server.Dtos.Payment;
using server.Dtos.UserCourse;
using server.Extensions;
using server.Helpers;
using server.Interfaces;
using server.Mappers;
using server.Models;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly ICourseRepository _courseRepo;
        private readonly IPaymentRepository _paymentRepo;
        private readonly IUserCourseRepository _userCourseRepo;
        private readonly IVnPayService _vnPayService;
        private readonly UserManager<User> _userManager;
        public PaymentController(
            ICourseRepository courseRepo,
            IPaymentRepository paymentRepo,
            IUserCourseRepository userCourseRepo,
            IVnPayService vnPayService,
            UserManager<User> userManager)
        {
            _courseRepo = courseRepo;
            _paymentRepo = paymentRepo;
            _userCourseRepo = userCourseRepo;
            _vnPayService = vnPayService;
            _userManager = userManager;
        }

        [HttpGet("get-all")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAll([FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate)
        {
            var payments = await _paymentRepo.GetAllAsync(startDate, endDate);
            var paymentDtos = payments.Select(p => p.ToPaymentDto());
            return Ok(paymentDtos);
        }

        [HttpGet("get-page")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetPage([FromQuery] QueryObject queryObject)
        {
            var (payments, totalRecords) = await _paymentRepo.GetPageAsync(queryObject);
            var paymentDto = payments.Select(x => x.ToPaymentDto());

            var response = new
            {
                Data = paymentDto,
                TotalRecords = totalRecords,
                TotalPages = (int)Math.Ceiling(totalRecords / (double)queryObject.PageSize)
            };

            return Ok(response);
        }


        [HttpPost("generate-payment-url")]
        [Authorize]
        public async Task<IActionResult> GeneratePaymentUrl(CreatePaymentDto paymentDto)
        {
            var course = await _courseRepo.GetByIdAsync(paymentDto.CourseId);

            if (course == null)
            {
                return NotFound("Không tìm thấy khóa học này");
            }

            var amount = course.NewPrice ?? course.Price;
            var userName = User.GetUsername();
            var user = await _userManager.FindByNameAsync(userName);

            if (user == null)
            {
                return Unauthorized();
            }

            var payment = paymentDto.ToPaymentFromCreate(user.Id, amount);
            await _paymentRepo.CreateAsync(payment);

            var paymentUrl = await _vnPayService.GeneratePaymentUrlAsync(payment.ToPaymentFromRequestDto(amount));

            return Ok(new { PaymentUrl = paymentUrl });
        }

        [HttpGet("process-payment-response")]
        [HttpPost("process-payment-response")]
        public async Task<IActionResult> ProcessPaymentResponse()
        {
            var paymentResponse = await _vnPayService.ProcessPaymentResponseAsync(HttpContext);

            if (paymentResponse == null)
            {
                return Redirect("http://localhost:5173/payment-failure");
            }

            if (paymentResponse.Vnp_ResponseCode == "00")
            {
                var status = "Thành công";
                var paymentId = paymentResponse.PaymentId;
                var payment = await _paymentRepo.GetByIdAsync(paymentId);

                if (payment == null)
                {
                    return Redirect("http://localhost:5173/payment-failure");
                }

                var userCourse = new CreateUserCourseDto
                {
                    CourseId = payment.CourseId,
                    UserId = payment.UserId
                };

                await _paymentRepo.UpdateAsync(paymentId, status);
                await _userCourseRepo.CreateAsync(userCourse.ToUserCourseFromCreate());

                return Redirect("http://localhost:5173/payment-success");
            }
            else
            {
                return Redirect("http://localhost:5173/payment-failure");
            }
        }

        [HttpGet("check-payment-status/{courseId}")]
        public async Task<IActionResult> CheckPaymentStatus(int courseId)
        {
            var userName = User.GetUsername();
            var user = await _userManager.FindByNameAsync(userName);

            if (user == null)
            {
                return Unauthorized();
            }

            var userCourse = await _paymentRepo.GetByCourseIdAndUserIdAsync(courseId, user.Id);

            if (userCourse == null)
            {
                return Ok(new { IsPaid = false });
            }

            var isPaid = true;
            return Ok(new { IsPaid = isPaid });
        }
    }
}
