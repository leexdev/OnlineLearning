using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Helpers;
using server.Interfaces;
using server.Models;

namespace server.Repository
{
    public class PaymentRepository : IPaymentRepository
    {
        private readonly ApplicationDbContext _context;
        public PaymentRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Payment> CreateAsync(Payment paymentModel)
        {
            await _context.AddAsync(paymentModel);
            await _context.SaveChangesAsync();
            return paymentModel;
        }

        public async Task<List<Payment>> GetAllAsync(DateTime? startDate, DateTime? endDate)
        {
            var query = _context.Payments.Include(p => p.User).Include(p => p.Course).AsQueryable();

            if (startDate.HasValue)
            {
                query = query.Where(p => p.CreatedAt >= startDate.Value);
            }

            if (endDate.HasValue)
            {
                query = query.Where(p => p.CreatedAt <= endDate.Value);
            }

            return await query.ToListAsync();
        }

        public async Task<(List<Payment> Payments, int TotalRecords)> GetPageAsync(QueryObject queryObject)
        {
            var query = _context.Payments.AsQueryable();

            if (!string.IsNullOrEmpty(queryObject.SearchTerm))
            {
                query = query.Where(p => p.User.UserName.Contains(queryObject.SearchTerm) || p.Course.Name.ToString().Contains(queryObject.SearchTerm));
            }

            var totalRecords = await query.CountAsync();
            var payments = await query
                .Include(p => p.Course).Include(p => p.User)
                .OrderByDescending(p => p.CreatedAt)
                .Skip((queryObject.Page - 1) * queryObject.PageSize)
                .Take(queryObject.PageSize)
                .ToListAsync();

            return (payments, totalRecords);
        }


        public async Task<UserCourse?> GetByCourseIdAndUserIdAsync(int courseId, string userId)
        {
            return await _context.UserCourses.FirstOrDefaultAsync(p => p.CourseId == courseId && p.UserId == userId && p.IsTeacher == false);
        }

        public async Task<Payment?> GetByIdAsync(Guid id)
        {
            var payment = await _context.Payments.FirstOrDefaultAsync(p => p.Id == id);
            if (payment == null)
            {
                return null;
            }

            return payment;
        }

        public async Task<Payment?> UpdateAsync(Guid id, string status)
        {
            var payment = await _context.Payments.FirstOrDefaultAsync(p => p.Id == id);
            if (payment == null)
            {
                return null;
            }

            payment.Status = status;
            await _context.SaveChangesAsync();
            return payment;
        }
    }
}