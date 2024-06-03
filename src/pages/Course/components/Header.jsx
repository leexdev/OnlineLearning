const Header = ({ title }) => {
    return (
        <div className="header bg-cyan-500 w-full">
            <div className="container">
                <h1 className="text-white text-center text-4xl font-bold py-10">
                    {title}
                </h1>
            </div>
        </div>
    );
};

export default Header;
