using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models;

namespace server.Interfaces
{
    public interface IPaymentRepository
    {
        Task<List<Payment>> GetAllAsync();
        Task<Payment?> GetByIdAsync(Guid id);
        Task<Payment> CreateAsync(Payment paymentModel);
        Task<Payment?> UpdateAsync(Guid id, string status);
        Task<UserCourse?> GetByCourseIdAndUserIdAsync(int courseId, string userId);
    }
}