const LabeledInput = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  disabled = false,
  isRequired = false,
}) => {
  return (
    <div className="labeled-input">
      <label className="labeled-input-asterisk" htmlFor={name} style={{ display: isRequired ? "inline" : "none" , color: "red" }}>
        ※
      </label>

      <label className="labeled-input-label" htmlFor={name}>
        {label}
      </label>

      <input
        className="labeled-input-input"
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
};

export default LabeledInput;
