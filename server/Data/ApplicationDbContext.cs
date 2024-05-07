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

            builder.Entity<UserCourse>()
                .HasKey(uc => new { uc.UserId, uc.CourseId });

            builder.Entity<UserCourse>()
                .HasOne(uc => uc.User)
                .WithMany(u => u.UserCourses)
                .HasForeignKey(uc => uc.UserId);

            builder.Entity<UserCourse>()
                .HasOne(uc => uc.Course)
                .WithMany(c => c.UserCourses)
                .HasForeignKey(uc => uc.CourseId);


            builder.Entity<Payment>()
                .HasKey(p => new { p.UserId, p.CourseId });

            builder.Entity<Payment>()
                .HasOne(p => p.User)
                .WithMany(u => u.Payments)
                .HasForeignKey(p => p.UserId);

            builder.Entity<Payment>()
                .HasOne(p => p.Course)
                .WithMany(c => c.Payments)
                .HasForeignKey(p => p.CourseId);


            builder.Entity<Rating>()
                .HasKey(r => new { r.UserId, r.LessonId });

            builder.Entity<Rating>()
                .HasOne(r => r.User)
                .WithMany(u => u.Ratings)
                .HasForeignKey(r => r.UserId);

            builder.Entity<Rating>()
               .HasOne(r => r.Lesson)
                .WithMany(l => l.Ratings)
               .HasForeignKey(r => r.LessonId);


            builder.Entity<Comment>()
                .HasKey(c => new { c.UserId, c.LessonId });

            builder.Entity<Comment>()
                .HasOne(c => c.User)
                .WithMany(u => u.Comments)
                .HasForeignKey(c => c.UserId);

            builder.Entity<Comment>()
               .HasOne(c => c.Lesson)
               .WithMany(l => l.Comments)
               .HasForeignKey(c => c.LessonId);

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
                    OldPrice = 100,
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
                    OldPrice = 100,
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
                    OldPrice = 200,
                    NewPrice = 80,
                    ImageUrl = "https://example.com/course-image2.jpg",
                    SubjectId = 3
                }
            );
        }
    }
}