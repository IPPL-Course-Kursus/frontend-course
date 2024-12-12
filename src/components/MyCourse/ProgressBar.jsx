import { BadgeCheck } from "lucide-react";
import PropTypes from "prop-types";
// import { useState } from "react";

const ProgressBar = ({ contentFinish}) => {
    const percentage = contentFinish ;
    const contentStatus = percentage === 100 ? "Completed" : "In Progress";

    return (
        <div className="flex items-center">
            <div className="mr-2">
                <span className="text-green-500">
                    <BadgeCheck size={20} />
                </span>
            </div>
            <div className="w-9/12 relative overflow-hidden h-5 rounded-full bg-slate-500">
                <div
                    style={{
                        height: "100%",
                        width: `${percentage}% `,
                        backgroundColor: "purple",
                        transition: "width 0.5s",
                    }}
                    className="animate-fade"
                ></div>
                <span className="font-semibold absolute top-[50%] left-3 -translate-y-[50%] text-white text-xs drop-shadow-lg progressPercent">
                    {percentage}% - {contentStatus}
                </span>
            </div>
        </div>
    );
};

ProgressBar.propTypes = {
    contentFinish: PropTypes.number.isRequired,
};
export default ProgressBar;
