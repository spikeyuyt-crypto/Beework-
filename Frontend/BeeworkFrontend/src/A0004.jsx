import { useCallback, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LabeledInput from "./components/LabeledInput.jsx";
import LabeledPhoneInput from "./components/LabeledPhoneInput.jsx";
import Bee from "./assets/Bee.png";
import Upload from "./components/Upload.jsx";
import { countryOptions } from "./utils/countryOptions";

export default function A0004() {
    const navigate = useNavigate();
    const location = useLocation();

    const defaultForm = {
        mail: "",
        pwd0: "",
        pwd1: "",
        firstName: "",
        firstNameKana: "",
        lastName: "",
        lastNameKana: "",
        sex: "male",
        countryZip: "81",
        tel: "",
        photoAddress: "",
    };

    const formData = location.state || defaultForm;
    const [form, setForm] = useState(formData);

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    }, []);

    const handleNextPage = () => {
        const requiredFields = [
            "mail",
            "pwd0",
            "pwd1",
            "firstName",
            "firstNameKana",
            "lastName",
            "lastNameKana",
            "countryZip",
            "tel",
        ];

        const hasEmptyField = requiredFields.some((field) => !form[field]);

        if (hasEmptyField) {
            alert("必須項目を入力してください");
            return;
        }

        if (form.pwd0 !== form.pwd1) {
            alert("パスワードが一致しません");
            return;
        }

        navigate("/A0004_1", { state: form });
    };

    const handlePhotoChange = (photoAddress) => {
        setForm((prevForm) => ({
            ...prevForm,
            photoAddress,
        }));
    };

    return (
        <div>
            <div className="A0004" id="A0004Grid">
                <img src={Bee} alt="Bee" />
                <label>システム管理者新規</label>
                <label>※は入力必須項目です</label>

                <LabeledInput label="メールアドレス" type="text" name="mail" value={form.mail} isRequired={true} onChange={handleInputChange} />
                <LabeledInput label="パスワード" type="password" name="pwd0" value={form.pwd0} isRequired={true} onChange={handleInputChange} />
                <LabeledInput label="パスワード確認" type="password" name="pwd1" value={form.pwd1} isRequired={true} onChange={handleInputChange} />
                <LabeledInput label="名" type="text" name="firstName" value={form.firstName} isRequired={true} onChange={handleInputChange} />
                <LabeledInput label="名（カナ）" type="text" name="firstNameKana" value={form.firstNameKana} isRequired={true} onChange={handleInputChange} />
                <LabeledInput label="姓" type="text" name="lastName" value={form.lastName} isRequired={true} onChange={handleInputChange} />
                <LabeledInput label="姓（カナ）" type="text" name="lastNameKana" value={form.lastNameKana} isRequired={true} onChange={handleInputChange} />

                <div className="form-radio-row">
                    <label className="labeled-input-asterisk">※</label>
                    <label className="form-row-label">性別</label>
                    <label className="radio-option">
                        <input type="radio" name="sex" value="male" onChange={handleInputChange} checked={form.sex === "male"} />
                        男性
                    </label>
                    <label className="radio-option">
                        <input type="radio" name="sex" value="female" onChange={handleInputChange} checked={form.sex === "female"} />
                        女性
                    </label>
                </div>

                <LabeledPhoneInput
                    label="電話番号"
                    countryName="countryZip"
                    countryValue={form.countryZip}
                    phoneName="tel"
                    phoneValue={form.tel}
                    options={countryOptions}
                    isRequired={true}
                    onChange={handleInputChange}
                />

                <div className="form-upload-row">
                    <label className="labeled-input-asterisk">※</label>
                    <label className="form-row-label">写真</label>
                    <Upload value={form.photoAddress} onChange={handlePhotoChange} />
                </div>

                <div className="form-actions">
                    <input type="button" value="確認画面へ" onClick={handleNextPage} />
                    <input type="button" value="戻る" onClick={() => navigate("/A0301")} />
                </div>
            </div>
        </div>
    );
}
