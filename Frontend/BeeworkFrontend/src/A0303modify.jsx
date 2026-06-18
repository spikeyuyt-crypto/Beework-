import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import LabeledInput from "./components/LabeledInput.jsx";
import Upload from "./components/Upload.jsx";
import { toAdminUserForm } from "./utils/adminUserForm";


export default function A0303() {

    const location = useLocation();
    const locationState = location.state ?? {};
    const authority = locationState.authority ?? "";
    const data = toAdminUserForm(locationState.data ?? locationState);
    const navigate = useNavigate();

    const { id } = useParams();

    let authorityContent = "";
    if (authority === "admin") {

        authorityContent = "システム管理者(認証済み)情報";
    } else {
        authorityContent = "会社会員(認証済み)情報";
    };

    const [form, setForm] = useState({...data});

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handlePhotoChange = (photoAddress) => {
        setForm((prevForm) => ({
            ...prevForm,
            photoAddress,
        }));
    };

    const handleNextPage = () => {
    const requiredFields = [
        "mail",
        "firstName",
        "firstNameKana",
        "sex",
        "lastName",
        "lastNameKana",
        "tel",
    ];

    const hasEmptyField = requiredFields.some(
        field => !form[field]
    );

    if (hasEmptyField) {
        alert("必須項目を入力してください");
        return;
    }

    if (form.pwd0 !== form.pwd1) {
        alert("パスワードが一致しません");
        return;
    }

    navigate(`/A0303verify/${id}`, { state: { authority, data: form } })
};

    return (
        <div className="app-form-page">
            <label >{`BeeWork${authorityContent}`}</label>
            <label style={{ color: "red" }}>※は入力必須項目です</label>
            <hr />
            <LabeledInput label="メールアドレス" name="mail" value={form.mail ?? ""} onChange={handleOnChange} isRequired={true}></LabeledInput>
            <LabeledInput label="名" name="firstName" value={form.firstName?? ""} onChange={handleOnChange} isRequired={true}></LabeledInput>
            <LabeledInput label="名（カナ）" name="firstNameKana" value={form.firstNameKana?? ""} onChange={handleOnChange} isRequired={true}></LabeledInput>
            <LabeledInput label="姓" name="lastName" value={form.lastName?? ""} onChange= {handleOnChange} isRequired={true}></LabeledInput>
            <LabeledInput label="姓（カナ）"name="lastNameKana" value={form.lastNameKana?? ""} onChange={ handleOnChange} isRequired={true}></LabeledInput>
            <LabeledInput label="性別" name="sex" value={form.sex?? ""} onChange={handleOnChange} isRequired={true}></LabeledInput>
            <LabeledInput label="電話番号(国番号)" name="countryZip" value={form.countryZip?? ""} onChange={ handleOnChange}></LabeledInput>
            <LabeledInput label="電話番号" name="tel" value={form.tel?? ""} onChange={ handleOnChange} isRequired={true}></LabeledInput>
            <Upload value={form.photoAddress} onChange={handlePhotoChange}>写真</Upload>
            <button onClick={() => handleNextPage()}>保存</button>
            <button onClick={() => navigate("/A0301")}>キャンセル</button>
        </div>
    )
}
