import React from 'react';
import AdviseItem from './AdviseItem';

const AdviseTable = ({ advises, handleStatusChange }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg">
                <thead>
                    <tr className="bg-peach text-white">
                        <th className="py-3 px-4">Tên học sinh</th>
                        <th className="py-3 px-4">Năm sinh</th>
                        <th className="py-3 px-4">Số điện thoại</th>
                        <th className="py-3 px-4">Học lực</th>
                        <th className="py-3 px-4">Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {advises.map((advise) => (
                        <AdviseItem key={advise.id} advise={advise} handleStatusChange={handleStatusChange} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdviseTable;
