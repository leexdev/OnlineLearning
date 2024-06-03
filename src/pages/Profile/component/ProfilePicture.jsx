import { useContext, Fragment, useState, useEffect } from 'react';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import images from '~/assets/images';
import userApi from '~/api/userApi';
import MessageModal from '~/components/MessageModal';
import Spinner from '~/components/Spinner';
import AuthContext from '~/context/AuthContext'; // Đảm bảo đường dẫn chính xác

const ProfilePicture = () => {
    const { user, setUser } = useContext(AuthContext);
    const [previewSrc, setPreviewSrc] = useState(user ? user.avatar : '');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (user && user.avatar) {
            setPreviewSrc(user.avatar);
        }
    }, [user]);

    const loadFile = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const previewURL = URL.createObjectURL(file);
            setPreviewSrc(previewURL);

            setIsLoading(true);
            setError(null); // Clear any previous errors
            try {
                const data = await userApi.uploadImage(file);

                if (data.avatar) {
                    setSuccess('Cập nhật ảnh đại diện thành công');
                    setUser(prevState => ({
                        ...prevState,
                        avatar: data.avatar,
                    }));
                    // Update previewSrc with the new image URL
                    setPreviewSrc(`${data.avatar}?timestamp=${new Date().getTime()}`);
                } else {
                    setError('Không thể cập nhật ảnh đại diện');
                }
            } catch (error) {
                console.error('Error uploading image:', error);
                setError(error.response?.data?.message || 'Đã có lỗi xảy ra khi tải lên hình ảnh');
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <Fragment>
            {error && <MessageModal title="Lỗi" image={images.sadcat} message={error} onClose={() => setError(null)} />}
            {success && <MessageModal title="Thành công" image={images.cat} message={success} onClose={() => setSuccess(null)} />}
            {isLoading && <Spinner opacity="bg-black" />}
            <div className="avatar relative">
                <label className="cursor-pointer relative group">
                    <img
                        id="preview_img"
                        className={`h-28 w-28 object-cover rounded-full transition duration-300 group-hover:brightness-75 ${isLoading ? 'opacity-50' : ''}`}
                        src={previewSrc ? previewSrc : images.user}
                        alt="Profile Avatar"
                    />
                    <input
                        type="file"
                        onChange={loadFile}
                        className="hidden"
                        accept="image/*"
                    />
                    <div className="absolute bottom-0 right-0 bg-white p-1 rounded-full">
                        <FontAwesomeIcon
                            icon={faCamera}
                            className="h-6 w-6 text-gray-700"
                        />
                    </div>
                </label>
            </div>
        </Fragment>
    );
};

export default ProfilePicture;
