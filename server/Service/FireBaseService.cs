using Firebase.Auth;
using Firebase.Storage;
using Microsoft.Extensions.Options;
using server.Helpers;
using server.Interfaces;
using System;
using System.IO;
using System.Threading.Tasks;

public class FireBaseService : IFireBaseService
{
    private readonly FirebaseAuthProvider _authProvider;
    private readonly FireBaseSettings _firebaseSettings;

    public FireBaseService(IOptions<FireBaseSettings> options)
    {
        _firebaseSettings = options.Value;

        _authProvider = new FirebaseAuthProvider(new FirebaseConfig(_firebaseSettings.ApiKey));
    }

    public async Task<string> UploadFile(IFormFile file)
    {
        using (var stream = file.OpenReadStream())
        {
            // Đăng nhập và nhận token từ Firebase Authentication
            var auth = await _authProvider.SignInWithEmailAndPasswordAsync(_firebaseSettings.AuthEmail, _firebaseSettings.AuthPassword);
            var token = auth.FirebaseToken;

            var task = new FirebaseStorage(
                _firebaseSettings.Bucket,
                new FirebaseStorageOptions
                {
                    AuthTokenAsyncFactory = () => Task.FromResult(auth.FirebaseToken),
                    ThrowOnCancel = true,
                })
                .Child("receipts")
                .Child(file.FileName)
                .PutAsync(stream);

            return await task;
        }
    }
}