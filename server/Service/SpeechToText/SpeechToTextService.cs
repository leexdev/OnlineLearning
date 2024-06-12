using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Google.Apis.Auth.OAuth2;
using Google.Cloud.Speech.V1;
using Grpc.Auth;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using server.Interfaces;
using NAudio.Lame;
using NAudio.Wave;

namespace server.Service.SpeechToText
{
    public class SpeechToTextService : ISpeechToTextService
    {
        private readonly SpeechClient _speechClient;

        public SpeechToTextService(IConfiguration configuration)
        {
            var credentialPath = configuration["GoogleCloud:CredentialsPath"];
            var credential = GoogleCredential.FromFile(credentialPath).CreateScoped(SpeechClient.DefaultScopes);
            _speechClient = new SpeechClientBuilder { ChannelCredentials = credential.ToChannelCredentials() }.Build();
        }

        public async Task<string> TranscribeAudioAsync(IFormFile audioFile)
        {
            using var memoryStream = new MemoryStream();
            await audioFile.CopyToAsync(memoryStream);

            var mimeType = audioFile.ContentType;

            byte[] audioBytes;
            RecognitionConfig.Types.AudioEncoding audioEncoding;

            if (mimeType == "audio/webm")
            {
                audioBytes = ConvertWebAToMp3(memoryStream);
                audioEncoding = RecognitionConfig.Types.AudioEncoding.Mp3;
            }
            else
            {
                audioBytes = memoryStream.ToArray();
                switch (mimeType)
                {
                    case "audio/mpeg":
                        audioEncoding = RecognitionConfig.Types.AudioEncoding.Mp3;
                        break;
                    case "audio/wav":
                        audioEncoding = RecognitionConfig.Types.AudioEncoding.Linear16;
                        break;
                    case "audio/x-flac":
                        audioEncoding = RecognitionConfig.Types.AudioEncoding.Flac;
                        break;
                    default:
                        throw new InvalidOperationException($"Unsupported audio format: {mimeType}");
                }
            }
            var response = await _speechClient.RecognizeAsync(new RecognitionConfig
            {
                Encoding = audioEncoding,
                SampleRateHertz = 48000,
                LanguageCode = "en-US"
            }, RecognitionAudio.FromBytes(audioBytes));

            return string.Join("\n", response.Results.Select(result => result.Alternatives.First().Transcript));
        }

        private byte[] ConvertWebAToMp3(Stream webaStream)
        {
            var tempWebAFilePath = Path.GetTempFileName();
            File.WriteAllBytes(tempWebAFilePath, ((MemoryStream)webaStream).ToArray());

            var tempMp3FilePath = Path.GetTempFileName();

            try
            {
                using (var webaReader = new MediaFoundationReader(tempWebAFilePath))
                using (var mp3Writer = new LameMP3FileWriter(tempMp3FilePath, webaReader.WaveFormat, LAMEPreset.STANDARD))
                {
                    webaReader.CopyTo(mp3Writer);
                    mp3Writer.Flush();
                }

                return File.ReadAllBytes(tempMp3FilePath);
            }
            finally
            {
                File.Delete(tempWebAFilePath);
                File.Delete(tempMp3FilePath);
            }
        }
    }
}
