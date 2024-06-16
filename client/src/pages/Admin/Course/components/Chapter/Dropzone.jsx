import { faCloudUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDropzone } from 'react-dropzone';
import FormFieldError from '~/components/Common/FormFieldError';

const Dropzone = ({ lessonIndex, handleDrop, previewVideos, error }) => {
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles, rejectedFiles) => handleDrop(acceptedFiles, rejectedFiles, lessonIndex),
        accept: 'video/mp4',
        onDropRejected: (rejectedFiles) => handleDrop([], rejectedFiles, lessonIndex),
    });

    const previewVideoURL = previewVideos[lessonIndex]?.previewURL;

    return (
        <div>
            {!previewVideoURL && (
                <div {...getRootProps()} className="text-center cursor-default dropzone-container">
                    <input {...getInputProps()} />
                    <div className="dropzone flex items-center justify-center rounded-md cursor-pointer min-h-[200px]">
                        <div className="text-gray-500 text-center">
                            <FontAwesomeIcon className="text-2xl" icon={faCloudUpload} />
                            <p>Kéo và thả video vào đây hoặc nhấp để chọn tập tin</p>
                            <p className="text-sm">Chỉ hỗ trợ video .mp4</p>
                        </div>
                    </div>
                </div>
            )}
            {previewVideoURL && (
                <div className="p-4 cursor-default">
                    <video src={previewVideoURL} controls className="w-full" />
                </div>
            )}
            {error && <FormFieldError message={error?.message} />}
        </div>
    );
};

export default Dropzone;
