using Firebase.Auth;
using Firebase.Storage;
using Microsoft.Extensions.Options;
using server.Helpers;
using server.Interfaces;
using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using System.Web;

public class FireBaseService : IFireBaseService
{
    private readonly FirebaseAuthProvider _authProvider;
    private readonly FireBaseSettings _firebaseSettings;

    public FireBaseService(IOptions<FireBaseSettings> options)
    {
        _firebaseSettings = options.Value;

        _authProvider = new FirebaseAuthProvider(new FirebaseConfig(_firebaseSettings.ApiKey));
    }

    public async Task<string> HandleFile(string existingFileUrl, string folderPath, IFormFile newFile)
    {
        var auth = await _authProvider.SignInWithEmailAndPasswordAsync(_firebaseSettings.AuthEmail, _firebaseSettings.AuthPassword);
        var firebaseStorage = new FirebaseStorage(
            _firebaseSettings.Bucket,
            new FirebaseStorageOptions
            {
                AuthTokenAsyncFactory = () => Task.FromResult(auth.FirebaseToken),
                ThrowOnCancel = true,
            });

        if (!string.IsNullOrEmpty(existingFileUrl))
        {
            var relativePath = ConvertUrlToRelativePath(existingFileUrl);
            _ = DeleteFileAsync(firebaseStorage, relativePath);
        }

        var newFileName = $"{Guid.NewGuid()}_{newFile.FileName}";
        var newFilePath = $"{folderPath}/{newFileName}";

        using (var stream = newFile.OpenReadStream())
        {
            var task = firebaseStorage
                .Child(newFilePath)
                .PutAsync(stream);

            var downloadUrl = await task;
            return downloadUrl;
        }
    }

    private async Task DeleteFileAsync(FirebaseStorage firebaseStorage, string relativePath)
    {
        try
        {
            await firebaseStorage.Child(relativePath).DeleteAsync();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Lỗi khi xóa tệp cũ: {ex.Message}");
        }
    }

    public string ConvertUrlToRelativePath(string fileUrl)
    {
        var uri = new Uri(fileUrl);
        var pathSegments = uri.AbsolutePath.Split(new[] { "/o/" }, StringSplitOptions.None);
        if (pathSegments.Length < 2)
        {
            throw new ArgumentException("URL không hợp lệ.");
        }

        var relativePath = Uri.UnescapeDataString(pathSegments[1]);
        Console.WriteLine($"Đường dẫn tương đối: {relativePath}");
        return relativePath;
    }

    public async Task DeleteFile(string fileUrl)
    {
        var auth = await _authProvider.SignInWithEmailAndPasswordAsync(_firebaseSettings.AuthEmail, _firebaseSettings.AuthPassword);
        var firebaseStorage = new FirebaseStorage(
            _firebaseSettings.Bucket,
            new FirebaseStorageOptions
            {
                AuthTokenAsyncFactory = () => Task.FromResult(auth.FirebaseToken),
                ThrowOnCancel = true,
            });

        var relativePath = ConvertUrlToRelativePath(fileUrl);
        await DeleteFileAsync(firebaseStorage, relativePath);
    }
}
