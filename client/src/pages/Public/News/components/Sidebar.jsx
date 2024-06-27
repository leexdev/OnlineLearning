const Sidebar = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-orange-500">Danh mục học tập</h2>
        <ul>
            {[...Array(12).keys()].map((grade) => (
                <li key={grade} className="mb-2">
                    <a href="#" className="text-blue-500 hover:underline">
                        Lớp {grade + 1}
                    </a>
                </li>
            ))}
        </ul>
    </div>
);
export default Sidebar;
