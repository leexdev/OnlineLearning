import React from 'react';

const AdviseItem = ({ advise, handleStatusChange }) => {
    return (
        <tr key={advise.id} className="text-center even:bg-gray-50">
            <td className="py-2 border-b px-4">{advise.name}</td>
            <td className="py-2 border-b px-4">{advise.birthDay}</td>{' '}
            <td className="py-2 border-b px-4">{advise.phoneNumber}</td>
            <td className="py-2 border-b px-4">{advise.academic}</td>
            <td className="py-2 border-b px-4">
                <select
                    value={advise.status}
                    onChange={(e) => handleStatusChange(advise.id, e.target.value)}
                    className="border rounded-md px-2 py-1 focus:ring-peach focus:border-peach"
                >
                    <option value="Chưa tư vấn">Chưa tư vấn</option>
                    <option value="Đang tư vấn">Đang tư vấn</option>
                    <option value="Đã tư vấn">Đã tư vấn</option>
                </select>
            </td>
        </tr>
    );
};

export default AdviseItem;
