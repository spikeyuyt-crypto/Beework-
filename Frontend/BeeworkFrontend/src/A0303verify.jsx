import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import LabeledInfo from "./components/LabeledInfo.jsx";
import { toAdminUserForm } from "./utils/adminUserForm";
import axios from "axios";

export default function A0303verify() {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();

    const locationState = location.state ?? {};
    const form = toAdminUserForm(locationState.data);
    const authority = locationState.authority ?? form.authority ?? "";

    const authorityContent =
        authority === "admin"
            ? "システム管理者(認証済み)情報"
            : "会社会員(認証済み)情報";

    const handleConfirm = async () => {
        await axios.post("http://localhost:8080/adminList/userInfoUpdate", {
            userId: id,
            phoneCountryCode: form.countryZip,
            firstName: form.firstName,
            firstNameKana: form.firstNameKana,
            lastName: form.lastName,
            lastNameKana: form.lastNameKana,
            userPhoto: form.photoAddress,
            pwd: form.pwd,
            repwd: form.repwd,
            sex: form.sex,
            userMail: form.mail,
            userStatus: form.userStatus,
            userTel: form.tel
        })

        navigate("/A0301")
    }

    return (
        <div className="app-form-page">
            <label>{`BeeWork${authorityContent}`}</label>
            <hr />

            <LabeledInfo label="メールアドレス" value={form.mail} />
            <LabeledInfo label="名" value={form.firstName} />
            <LabeledInfo label="名（カナ）" value={form.firstNameKana} />
            <LabeledInfo label="姓" value={form.lastName} />
            <LabeledInfo label="姓（カナ）" value={form.lastNameKana} />
            <LabeledInfo label="性別" value={form.sex} />
            <LabeledInfo label="電話番号(国番号)" value={form.countryZip} />
            <LabeledInfo label="電話番号" value={form.tel} />
            <div className="photo-info-row">
                <span></span>
                <span className="photo-info-label">写真</span>
                {form.photoAddress ? (
                    <div className="photo-info-frame">
                        <img className="info-photo" src={form.photoAddress} alt="写真" />
                    </div>
                ) : (
                    <span className="photo-info-empty"></span>
                )}
            </div>

            <button onClick={handleConfirm}>確認</button>
            <button onClick={() => navigate(`/A0303modify/${id}`, { state: { authority, data: form } })}>キャンセル</button>
        </div>
    );
}
