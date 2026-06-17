import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import LabeledInfo from "./components/LabeledInfo.jsx";

export default function A0303verify() {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();

    const form = location.state.data;
    const authority = location.state.authority ?? form.authority ?? "";

    const authorityContent =
        authority === "admin"
            ? "システム管理者(認証済み)情報"
            : "会社会員(認証済み)情報";

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
            <LabeledInfo label="電話番号" value={form.tel} />

            <label>写真</label>

            <button onClick={() => navigate("/A0301")}>確認</button>
            <button onClick={() => navigate(`/A0303modify/${id}`, { state: { authority, data: form } })}>キャンセル</button>
        </div>
    );
}
