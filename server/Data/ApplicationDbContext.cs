using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Data
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {

        }
        public DbSet<Grade> Grades { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Chapter> Chapters { get; set; }
        public DbSet<Lesson> Lessons { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<Rating> Ratings { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Discount> Discounts { get; set; }
        public DbSet<UserCourse> UserCourses { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Banner> Banners { get; set; }
        public DbSet<New> News { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            List<IdentityRole> roles = new List<IdentityRole>{
                new IdentityRole
                {
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                },
                new IdentityRole
                {
                    Name = "Teacher",
                    NormalizedName = "TEACHER"
                },
                new IdentityRole
                {
                    Name = "User",
                    NormalizedName = "USER"
                }
            };

            builder.Entity<IdentityRole>().HasData(roles);

            builder.Entity<Grade>()
                .HasIndex(x => x.Name)
                .IsUnique();


            SeedData(builder);
        }

        private void SeedData(ModelBuilder builder)
        {
            // Khởi tạo dữ liệu cho Grade
            builder.Entity<Grade>().HasData(
                new Grade { Id = 1, Name = "Tiền lớp 1" },
                new Grade { Id = 2, Name = "Lớp 1" },
                new Grade { Id = 3, Name = "Lớp 2" }
            );

            // Khởi tạo dữ liệu cho Subject
            builder.Entity<Subject>().HasData(
                new Subject { Id = 1, Name = "Toán học", GradeId = 1 },
                new Subject { Id = 2, Name = "Tiếng Việt", GradeId = 1 },
                new Subject { Id = 3, Name = "Tiếng Anh", GradeId = 2 }
            );

            // Khởi tạo dữ liệu cho Course
            builder.Entity<Course>().HasData(
                new Course
                {
                    Id = 1,
                    Name = "Toán học tiền lớp 1",
                    Title = "Toán học tiền lớp 1",
                    Description = "Toán học tiền lớp 1",
                    Price = 100,
                    NewPrice = 80,
                    ImageUrl = "https://example.com/course-image.jpg",
                    SubjectId = 1
                },
                new Course
                {
                    Id = 2,
                    Name = "Tiếng Việt tiền lớp 1",
                    Title = "Tiếng Việt tiền lớp 1",
                    Description = "Tiếng Việt tiền lớp 1",
                    Price = 100,
                    NewPrice = 50,
                    ImageUrl = "https://example.com/course-image1.jpg",
                    SubjectId = 2
                },
                new Course
                {
                    Id = 3,
                    Name = "Tiếng Anh lớp 1",
                    Title = "Tiếng Anh lớp 1",
                    Description = "Tiếng Anh lớp 1",
                    Price = 200,
                    NewPrice = 80,
                    ImageUrl = "https://example.com/course-image2.jpg",
                    SubjectId = 3
                }
            );

            builder.Entity<Chapter>().HasData(
                new Chapter { Id = 1, Name = "Đếm số 10", CourseId = 1 }
            );

            builder.Entity<Lesson>().HasData(
                new Lesson { Id = 1, Title = "Số 2", VideoURL = "String", isFree = true, ChapterId = 1 }
            );
        }
    }
}