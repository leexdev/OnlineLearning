const Comment = () => {
    return (
        <section className="bg-white py-8 lg:py-16 antialiased">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg lg:text-2xl font-bold text-gray-900">Bình luận (20)</h2>
                </div>
                <form className="mb-6">
                    <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
                        <label htmlFor="comment" className="sr-only">
                            Bình luận của tôi
                        </label>
                        <textarea
                            id="comment"
                            rows={6}
                            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
                            placeholder="Viết bình luận..."
                            required=""
                            defaultValue={''}
                        />
                    </div>
                    <button
                        type="submit"
                        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-peach rounded-lg"
                    >
                        Bình luận
                    </button>
                </form>
                <article className="p-6 text-base bg-white rounded-lg border-b">
                    <footer className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                            <p className="inline-flex items-center mr-3 text-sm text-gray-900 font-semibold">
                                <img
                                    className="mr-2 w-6 h-6 rounded-full"
                                    src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                    alt="Michael Gough"
                                />
                                Michael Gough
                            </p>
                            <p className="text-sm text-gray-600">
                                <time dateTime="2022-02-08" title="February 8th, 2022">
                                    Feb. 8, 2022
                                </time>
                            </p>
                        </div>
                    </footer>
                    <p className="text-gray-500 dark:text-gray-400">
                        Very straight-to-point article. Really worth time reading. Thank you! But tools are just the
                        instruments for the UX designers. The knowledge of the design tools are as important as the
                        creation of the design strategy.
                    </p>
                </article>
                <article className="p-6 text-base bg-white rounded-lg border-b">
                    <footer className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                            <p className="inline-flex items-center mr-3 text-sm text-gray-900 font-semibold">
                                <img
                                    className="mr-2 w-6 h-6 rounded-full"
                                    src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                    alt="Michael Gough"
                                />
                                Michael Gough
                            </p>
                            <p className="text-sm text-gray-600">
                                <time dateTime="2022-02-08" title="February 8th, 2022">
                                    Feb. 8, 2022
                                </time>
                            </p>
                        </div>
                    </footer>
                    <p className="text-gray-500 dark:text-gray-400">
                        Very straight-to-point article. Really worth time reading. Thank you! But tools are just the
                        instruments for the UX designers. The knowledge of the design tools are as important as the
                        creation of the design strategy.
                    </p>
                </article>
                <article className="p-6 text-base bg-white rounded-lg border-b">
                    <footer className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                            <p className="inline-flex items-center mr-3 text-sm text-gray-900 font-semibold">
                                <img
                                    className="mr-2 w-6 h-6 rounded-full"
                                    src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                    alt="Michael Gough"
                                />
                                Michael Gough
                            </p>
                            <p className="text-sm text-gray-600">
                                <time dateTime="2022-02-08" title="February 8th, 2022">
                                    Feb. 8, 2022
                                </time>
                            </p>
                        </div>
                    </footer>
                    <p className="text-gray-500 dark:text-gray-400">
                        Very straight-to-point article. Really worth time reading. Thank you! But tools are just the
                        instruments for the UX designers. The knowledge of the design tools are as important as the
                        creation of the design strategy.
                    </p>
                </article>
            </div>
        </section>
    );
};

export default Comment;
