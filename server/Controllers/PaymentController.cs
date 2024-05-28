using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using server.Dtos.Payment;
using server.Dtos.UserCourse;
using server.Extensions;
using server.Interfaces;
using server.Mappers;
using server.Models;

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
            _vnPayService = vnPayService;
            _courseRepo = courseRepo;
            _paymentRepo = paymentRepo;
            _userManager = userManager;
            _userCourseRepo = userCourseRepo;
        }

        [HttpGet("get-all")]
        public async Task<IActionResult> GetAll()
        {
            var payments = await _paymentRepo.GetAllAsync();
            var paymentDto = payments.Select(p => p.ToPaymentDto());
            return Ok(paymentDto);
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

        [HttpPost("process-payment-response")]
        public async Task<IActionResult> ProcessPaymentResponse()
        {
            var paymentResponse = await _vnPayService.ProcessPaymentResponseAsync(HttpContext);

            if (paymentResponse == null)
            {
                return BadRequest(new { Error = "Invalid signature" });
            }

            if (paymentResponse.Vnp_ResponseCode == "00")
            {
                var status = "Thành công";
                var paymentId = paymentResponse.PaymentId;
                var payment = await _paymentRepo.GetByIdAsync(paymentId);

                if (payment == null)
                {
                    return NotFound();
                }

                var userCourse = new CreateUserCourseDto
                {
                    CourseId = payment.CourseId,
                    UserId = payment.UserId
                };

                await _paymentRepo.UpdateAsync(paymentId, status);
                await _userCourseRepo.CreateAsync(userCourse.ToUserCourseFromCreate());

                return Ok(new { Message = "Thanh toán thành công" });
            }
            else
            {
                return BadRequest(new { Error = "Thanh toán thất bại" });
            }
        }
    }
}
