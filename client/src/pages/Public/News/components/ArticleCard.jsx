const ArticleCard = ({ image, title, author, date, views, description }) => (
    <div className="bg-white p-4 rounded-lg shadow-lg">
        <img src={image} alt={title} className="w-full rounded-lg mb-4" />
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <div className="flex items-center text-gray-500 text-sm mb-2">
            <span>{date}</span>
        </div>
        <p className="line-clamp-3">{description}</p>
    </div>
);

export default ArticleCard;
