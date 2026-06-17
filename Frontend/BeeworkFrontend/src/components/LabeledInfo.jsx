import React from "react";

const LabeledInfo = ({ label, value }) => {
    return (
        <div className="labeled-info">
            <span className="label">{label}</span>
            <span className="value">{value}</span>
        </div>
    );
};

export default LabeledInfo;