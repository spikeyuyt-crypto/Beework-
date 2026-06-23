const LabeledPhoneInput = ({
    label,
    countryName,
    countryValue,
    phoneName,
    phoneValue,
    options,
    onChange,
    disabled = false,
    isRequired = false,
}) => {
    return (
        <div className="labeled-input labeled-phone-input">
            <label className="labeled-input-asterisk" htmlFor={phoneName} style={{ display: isRequired ? "inline" : "none", color: "red" }}>
                ※
            </label>

            <label className="labeled-input-label" htmlFor={phoneName}>
                {label}
            </label>

            <div className="phone-input-group">
                <select
                    className="phone-country-select"
                    name={countryName}
                    value={countryValue}
                    onChange={onChange}
                    disabled={disabled}
                    aria-label="国番号"
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                <input
                    className="labeled-input-input"
                    id={phoneName}
                    name={phoneName}
                    type="text"
                    value={phoneValue}
                    onChange={onChange}
                    disabled={disabled}
                />
            </div>
        </div>
    );
};

export default LabeledPhoneInput;
