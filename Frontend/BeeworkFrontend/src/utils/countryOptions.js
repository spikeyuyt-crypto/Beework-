export const countryOptions = [
    { value: "81", label: "+81 日本" },
    { value: "86", label: "+86 中国" },
    { value: "82", label: "+82 韓国" },
    { value: "1", label: "+1 アメリカ" },
    { value: "44", label: "+44 イギリス" },
];

export const getCountryLabel = (value) => (
    countryOptions.find((option) => option.value === String(value))?.label ?? value ?? ""
);
