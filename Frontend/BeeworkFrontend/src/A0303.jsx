import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LabeledInfo from './components/LabeledInfo';
import { toAdminUserForm } from './utils/adminUserForm';

export default function A0303() {

    const location = useLocation();
    const authority = location.state?.authority ?? "";

    const navigate = useNavigate();

    const { id } = useParams();


    let authorityContent = "";
    if (authority === "admin") {

        authorityContent = "システム管理者(認証済み)情報";
    } else {
        authorityContent = "会社会員(認証済み)情報";
    };

    const [data, setData] = useState({});

    const getUserInfo = async () => {
        const userId = id;
        const response = await axios.post(
            "http://localhost:8080/adminList/getUserInfo",
            {
                userId: userId,
            }
        );

        console.log(response.data);

        setData(toAdminUserForm(response.data.data?.a0303Vo));
    }

    useEffect(() => {
        getUserInfo();
    }, []);



    return (
        <div className="app-form-page">
            <label >{`BeeWork${authorityContent}`}</label>
            <hr />
            <LabeledInfo label="メールアドレス" value={data.mail}></LabeledInfo>
            <LabeledInfo label="名" value={data.firstName}></LabeledInfo>
            <LabeledInfo label="名（カナ）" value={data.firstNameKana }></LabeledInfo>
            <LabeledInfo label="姓" value={data.lastName }></LabeledInfo>
            <LabeledInfo label="姓（カナ）" value={data.lastNameKana }></LabeledInfo>
            <LabeledInfo label="性別" value={data.sex }></LabeledInfo>
            <LabeledInfo label="電話番号(国番号)" value={data.countryZip }></LabeledInfo>
            <LabeledInfo label="電話番号" value={data.tel }></LabeledInfo>
            <LabeledInfo label="写真" value={data.photoAddress ? <img className="info-photo" src={data.photoAddress} alt="写真" /> : ""}></LabeledInfo>
            <button onClick={() => navigate(`/A0303modify/${id}`, { state: { authority, data } })}>修正</button>
            <button onClick={() => navigate("/A0301")}>戻る</button>
        </div>
    );
}
