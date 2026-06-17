import { useRef } from "react";

export default function Upload() {
    const fileInputRef = useRef(null);

    const handleDivClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log(file);
    };

    return (
        <>
            <div
                className="upload-div"
                onClick={handleDivClick}
            >
                +
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
            />
        </>
    );
}
