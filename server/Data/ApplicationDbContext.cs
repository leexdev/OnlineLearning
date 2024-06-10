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
        public DbSet<News> News { get; set; }
        public DbSet<LessonCompleted> LessonCompletes { get; set; }
        public DbSet<UserAnswerHistory> UserAnswerHistories { get; set; }
        public DbSet<ChatMessage> ChatMessages { get; set; }
        public DbSet<Conversation> Conversations { get; set; }
        public DbSet<UserConversation> UserConversations { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            //     List<IdentityRole> roles = new List<IdentityRole>{
            //     new IdentityRole
            //     {
            //         Name = "Admin",
            //         NormalizedName = "ADMIN"
            //     },
            //     new IdentityRole
            //     {
            //         Name = "Teacher",
            //         NormalizedName = "TEACHER"
            //     },
            //     new IdentityRole
            //     {
            //         Name = "User",
            //         NormalizedName = "USER"
            //     }
            // };

            //     builder.Entity<IdentityRole>().HasData(roles);

            //     builder.Entity<Grade>()
            //         .HasIndex(x => x.Name)
            //         .IsUnique();

            //     SeedData(builder);
            // }

            // private void SeedData(ModelBuilder builder)
            // {
            //     builder.Entity<User>().HasData(
            //         new User { Id = (Guid.NewGuid()).ToString(), Name = "Nguyễn Ngọc Lễ", UserName = "lepro2883@gmail.com", NormalizedUserName = "LEPRO2883@GMAIL.COM", SecurityStamp = "OBRX4Y5MSYCTD66FFMSWJHQDVWVWYMIF", ConcurrencyStamp = "1399e129-66c5-4d77-bd55-afef3eb6edf4", LockoutEnabled = true, Email = "lepro2883@gmail.com", NormalizedEmail = "LEPRO2883@GMAIL.COM", PasswordHash = "AQAAAAIAAYagAAAAEEHh3uTdVYFgLZ3+nWXxYERi430UvwZ9tTXiVNzF5KherzygSzTgVIOQ6Ee9uXEEaQ==" }
            //     );

            //     // Khởi tạo dữ liệu cho Grade
            //     builder.Entity<Grade>().HasData(
            //         new Grade { Id = 1, Name = "Tiền lớp 1" },
            //         new Grade { Id = 2, Name = "Lớp 1" },
            //         new Grade { Id = 3, Name = "Lớp 2" }
            //     );

            //     // Khởi tạo dữ liệu cho Subject
            //     builder.Entity<Subject>().HasData(
            //         new Subject { Id = 1, Name = "Toán học", GradeId = 1 },
            //         new Subject { Id = 2, Name = "Tiếng Việt", GradeId = 1 },
            //         new Subject { Id = 3, Name = "Tiếng Anh", GradeId = 2 }
            //     );

            //     // Khởi tạo dữ liệu cho Course
            //     builder.Entity<Course>().HasData(
            //         new Course
            //         {
            //             Id = 1,
            //             Name = "Toán học tiền lớp 1",
            //             Title = "Toán học tiền lớp 1",
            //             Description = "Toán học tiền lớp 1",
            //             Price = 100000,
            //             NewPrice = 80000,
            //             ImageUrl = "https://firebasestorage.googleapis.com/v0/b/learningonline-91538.appspot.com/o/b91e_t12.png?alt=media&token=fb7719db-438e-4731-9a33-b85c8236e906",
            //             SubjectId = 1
            //         },
            //         new Course
            //         {
            //             Id = 2,
            //             Name = "Tiếng Việt tiền lớp 1",
            //             Title = "Tiếng Việt tiền lớp 1",
            //             Description = "Tiếng Việt tiền lớp 1",
            //             Price = 100,
            //             NewPrice = 50,
            //             ImageUrl = "https://example.com/course-image1.jpg",
            //             SubjectId = 2
            //         },
            //         new Course
            //         {
            //             Id = 3,
            //             Name = "Tiếng Anh lớp 1",
            //             Title = "Tiếng Anh lớp 1",
            //             Description = "Tiếng Anh lớp 1",
            //             Price = 200,
            //             NewPrice = 80,
            //             ImageUrl = "https://example.com/course-image2.jpg",
            //             SubjectId = 3
            //         }
            //     );

            //     builder.Entity<Chapter>().HasData(
            //         new Chapter { Id = 1, Name = "Đếm số 10", CourseId = 1 }
            //     );

            //     builder.Entity<Lesson>().HasData(
            //         new Lesson { Id = 1, Title = "Số 2", VideoURL = "https://firebasestorage.googleapis.com/v0/b/learningonline-91538.appspot.com/o/video_lesson%2FY2meta.app-%C4%90%E1%BB%93ng%20h%E1%BB%93%20%C4%91%E1%BA%BFm%20ng%C6%B0%E1%BB%A3c%205s-(1080p).mp4?alt=media&token=e2a067d7-e061-479a-ae5b-71cba70441d0", isFree = true, ChapterId = 1, Order = 1 }
            //     );

            //     builder.Entity<Question>().HasData(
            //         new Question { Id = 1, Content = "Lập các phép cộng khác nhau của hai số ghi từ hai miếng bìa ghi số 6 và 9. Có tất cả bao nhiêu phép cộng?", LessonId = 1 }
            //     );

            //     builder.Entity<Answer>().HasData(
            //         new Answer { Id = 1, Content = "2", IsCorrect = true, QuestionId = 1 },
            //         new Answer { Id = 2, Content = "3", IsCorrect = false, QuestionId = 1 },
            //         new Answer { Id = 3, Content = "4", IsCorrect = false, QuestionId = 1 },
            //         new Answer { Id = 4, Content = "5", IsCorrect = false, QuestionId = 1 }
            //     );
        }
    }

}