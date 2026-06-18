import { useRef } from "react";

export default function Upload({ value = "", onChange, disabled = false }) {
    const fileInputRef = useRef(null);

    const handleDivClick = () => {
        if (disabled) return;
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const previewUrl = URL.createObjectURL(file);
        onChange?.(previewUrl, file);
    };

    return (
        <>
            <div
                className="upload-div"
                onClick={handleDivClick}
            >
                {value ? <img className="upload-preview" src={value} alt="写真" /> : "+"}
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
                disabled={disabled}
            />
        </>
    );
}
