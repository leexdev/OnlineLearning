import React, { Fragment, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUpload } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import FormFieldError from '~/components/Common/FormFieldError';
import '~/assets/styles/customStyles.css';
import { convertErrorsToCamelCase } from '~/utils/errorUtils';
import Select from 'react-select';
import userApi from '~/api/userApi';

const CourseForm = ({ onSubmit, initialData = {}, grades = [], isEditing }) => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        setError,
    } = useForm({ defaultValues: initialData });

    const [description, setDescription] = useState(initialData.description || '');
    const [filteredSubjects, setFilteredSubjects] = useState([]);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [teachers, setTeachers] = useState([]);
    const [selectedTeachers, setSelectedTeachers] = useState([]);

    useEffect(() => {
        register('description', { required: 'Mô tả khóa học không được để trống' });
        if (!initialData.imageUrl) {
            register('imageFile', { required: 'Ảnh khóa học không được để trống' });
        }

        const fetchTeachers = async () => {
            try {
                const response = await userApi.getTeachers();
                setTeachers(response);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách giáo viên:', error);
            }
        };

        fetchTeachers();

        if (initialData.imageUrl) {
            setPreview(initialData.imageUrl);
        } else {
            setPreview(null);
        }
    }, [register, initialData.imageUrl]);

    useEffect(() => {
        if (isEditing) {
            setDescription(initialData.description || '');
            setPreview(initialData.imageUrl || null);
            setValue('subject', initialData.subjectId);

            const grade = grades.find((g) => g.subjects.some((subject) => subject.id === initialData.subjectId));
            if (grade) {
                setValue('grade', grade.id);
                setFilteredSubjects(grade.subjects);
            }

            const selectedTeacherOptions = initialData.userCourses.map((uc) => ({
                value: uc.userId,
                label: teachers.find((teacher) => teacher.id === uc.userId)?.name || '',
            }));
            setSelectedTeachers(selectedTeacherOptions);
            setValue('teachers', selectedTeacherOptions);

            const formattedPrice = initialData.price
                ? initialData.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                : '';
            setValue('price', formattedPrice);
        }
    }, [isEditing, initialData, grades, teachers, setValue]);

    const handleDescriptionChange = (value) => {
        setDescription(value);
        setValue('description', value);
    };

    const selectedGrade = watch('grade');

    useEffect(() => {
        if (selectedGrade) {
            const grade = grades.find((g) => g.id === parseInt(selectedGrade));
            setFilteredSubjects(grade ? grade.subjects : []);
        } else {
            setFilteredSubjects([]);
        }
    }, [selectedGrade, grades]);

    const onDrop = (acceptedFiles, fileRejections) => {
        if (fileRejections.length > 0) {
            setError('imageFile', {
                type: 'manual',
                message: 'Định dạng ảnh không phù hợp. Chỉ hỗ trợ .jpg, .jpeg, .png, .gif, .bmp',
            });
            return;
        }

        const file = acceptedFiles[0];
        if (file) {
            setImage(file);
            setValue('imageFile', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': ['.jpeg', '.jpg'],
            'image/png': ['.png'],
            'image/gif': ['.gif'],
            'image/bmp': ['.bmp'],
        },
        maxFiles: 1,
    });

    const inputClassNames = 'border border-gray-300 p-2 w-full rounded mt-2 focus:border-peach focus:ring-peach';

    const handleFormSubmit = async (data) => {
        const teacherIds = (data.teachers || []).map((teacher) => teacher.value); // Đảm bảo data.teachers luôn là một mảng
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('title', data.title);
        formData.append('description', description);
        formData.append('price', data.price.replace(/,/g, ''));
        formData.append('subjectId', data.subject);
        if (image) {
            formData.append('imageFile', image);
        }
        formData.append('teacherIds', JSON.stringify(teacherIds));

        try {
            if (onSubmit) {
                await onSubmit(formData);
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                const errorData = convertErrorsToCamelCase(error.response.data.errors);
                Object.keys(errorData).forEach((key) => {
                    setError(key, { type: 'manual', message: errorData[key] });
                });
            } else {
                toast.error('Đã xảy ra lỗi khi tạo khóa học.');
            }
        }
    };

    return (
        <Fragment>
            <h1 className="text-xl font-bold capitalize mb-5">Giới thiệu khóa học</h1>
            <div className="bg-white p-5 rounded-lg">
                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 bg-white">
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <span className="font-bold">Chọn Khối Lớp*</span>
                            <select
                                {...register('grade', { required: 'Khối lớp không được để trống' })}
                                className={inputClassNames}
                            >
                                <option value="">Chọn khối lớp</option>
                                {grades.map((grade) => (
                                    <option key={grade.id} value={grade.id}>
                                        {grade.name}
                                    </option>
                                ))}
                            </select>
                            {errors.grade && <FormFieldError message={errors.grade.message} />}
                        </div>
                        <div className="flex-1">
                            <span className="font-bold">Chọn Môn Học*</span>
                            <select
                                {...register('subject', { required: 'Môn học không được để trống' })}
                                className={inputClassNames}
                                value={watch('subject')}
                                onChange={(e) => setValue('subject', e.target.value)}
                            >
                                <option value="">Chọn môn học</option>
                                {filteredSubjects.map((subject) => (
                                    <option key={subject.id} value={subject.id}>
                                        {subject.name}
                                    </option>
                                ))}
                            </select>
                            {errors.subject && <FormFieldError message={errors.subject.message} />}
                        </div>
                        <div className="flex-1">
                            <span className="font-bold">Chọn Giáo Viên*</span>
                            <Select
                                isMulti
                                options={teachers.map((teacher) => ({ value: teacher.id, label: teacher.name }))}
                                onChange={(selected) => {
                                    setSelectedTeachers(selected);
                                    setValue('teachers', selected);
                                }}
                                className="mt-2"
                                value={selectedTeachers}
                            />
                            {errors.teachers && <FormFieldError message={errors.teachers.message} />}
                        </div>
                    </div>
                    <div>
                        <span className="font-bold">Tên Khóa Học*</span>
                        <input
                            type="text"
                            placeholder="Nhập tên khóa học ở đây..."
                            {...register('name', {
                                required: 'Tên khóa học không được để trống',
                                maxLength: {
                                    value: 100,
                                    message: 'Tên khóa học không được vượt quá 100 ký tự',
                                },
                            })}
                            className={inputClassNames}
                        />
                        {errors.name && <FormFieldError message={errors.name.message} />}
                    </div>
                    <div>
                        <span className="font-bold">Giới Thiệu Ngắn*</span>
                        <input
                            type="text"
                            placeholder="Giới thiệu ngắn..."
                            {...register('title', {
                                required: 'Tiêu đề không được để trống',
                                maxLength: {
                                    value: 200,
                                    message: 'Tiêu đề không được vượt quá 200 ký tự',
                                },
                            })}
                            className={inputClassNames}
                        />
                        {errors.title && <FormFieldError message={errors.title.message} />}
                    </div>
                    <div>
                        <span className="font-bold">Mô Tả Khóa Học*</span>
                        <ReactQuill
                            value={description}
                            onChange={handleDescriptionChange}
                            placeholder="Mô tả khóa học..."
                        />
                        {errors.description && <FormFieldError message={errors.description.message} />}
                    </div>

                    <div className="w-56 flex-1">
                        <label htmlFor="price" className="font-bold">
                            Giá khóa học (VNĐ)*
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Nhập giá khóa học..."
                                {...register('price', {
                                    required: 'Giá không được để trống',
                                    pattern: {
                                        value: /^\d+(,\d{3})*$/,
                                        message: 'Giá phải là một số dương',
                                    },
                                    validate: (value) =>
                                        parseInt(value.replace(/,/g, ''), 10) > 0 || 'Giá phải là một số dương',
                                })}
                                onChange={(e) => {
                                    const formattedValue = e.target.value.replace(/\D/g, '');
                                    const numberWithCommas = formattedValue
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                                    e.target.value = numberWithCommas;
                                    setValue('price', numberWithCommas, { shouldValidate: true });
                                }}
                                className={inputClassNames}
                            />
                            <span className="absolute inset-y-0 bg-peach right-0 top-2 m-1 px-2 font-bold flex items-center text-white">
                                VNĐ
                            </span>
                        </div>
                        {errors.price && <FormFieldError message={errors.price.message} />}
                    </div>
                    <div>
                        <span className="font-bold">Ảnh Khóa Học</span>
                        <div
                            {...getRootProps()}
                            className="border-dashed border-2 flex items-center justify-center border-gray-300 p-6 rounded-lg text-center cursor-pointer min-h-[300px] mt-2"
                        >
                            <input {...getInputProps()} />
                            {preview ? (
                                <img src={preview} alt="Xem trước ảnh" className="w-full h-auto max-w-3xl mx-auto" />
                            ) : (
                                <div className="text-gray-500">
                                    <FontAwesomeIcon className="text-2xl" icon={faCloudUpload} />
                                    <p>Kéo và thả ảnh hoặc bấm để chọn ảnh</p>
                                    <p className="text-sm">Chỉ hỗ trợ ảnh .jpg, .jpeg, .png, .gif, .bmp</p>
                                </div>
                            )}
                        </div>
                        {errors.imageFile && <FormFieldError message={errors.imageFile.message} />}
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="bg-peach text-white px-4 py-2 rounded">
                            Tiếp tục
                        </button>
                    </div>
                </form>
            </div>
        </Fragment>
    );
};

export default CourseForm;
