import { faAngleRight, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const Info = ({ title, course }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const maxLength = 150;
    const fullDescription = course?.description || '';
    const truncatedDescription =
        fullDescription.length > maxLength ? `${fullDescription.slice(0, maxLength)}...` : fullDescription;

    return (
        <div id="course-info" className="mb-10">
            <div className="title text-2xl font-semibold mb-2">{title}</div>
            <div className="info border py-5 px-10 rounded-lg bg-white">
                <div className="content">
                    <div dangerouslySetInnerHTML={{ __html: isExpanded ? fullDescription : truncatedDescription }} />
                </div>
                {fullDescription.length > maxLength && (
                    <div className="mt-2">
                        <button
                            onClick={toggleExpand}
                            className="text-orange-500 font-semibold flex items-center justify-end"
                        >
                            {isExpanded ? (
                                <>
                                    Thu gọn <FontAwesomeIcon icon={faAngleUp} className="ml-2" />
                                </>
                            ) : (
                                <>
                                    Xem thêm <FontAwesomeIcon icon={faAngleRight} className="ml-2" />
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Info;
