import { useCallback, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom'
import LabeledInput from "./components/LabeledInput.jsx";
import Bee from "./assets/Bee.png";

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
        tel: "",
        img: null,
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

    return (
        <div>
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
            <label className="labeled-input-asterisk" style={{ display: "inline" }, { color: "red" }}>※</label>
            <label>性別</label>
            <input type="radio" name="sex" value="male" onChange={handleInputChange} checked={form.sex === "male"} /> 男性
            <input type="radio" name="sex" value="female" onChange={handleInputChange} checked={form.sex === "female"} /> 女性
            <LabeledInput label="電話番号" type="text" name="tel" value={form.tel} isRequired={true} onChange={handleInputChange} />
            <LabeledInput label="写真" type="file" name="img" value={form.img} isRequired={true} onChange={handleInputChange} />
            <input type="button" value="確認画面へ" onClick={() => navigate("/A0004_1", { state: form })} />
            <input type="button" value="戻る" onClick={() => navigate("/A0301")} />
        </div>);
}
