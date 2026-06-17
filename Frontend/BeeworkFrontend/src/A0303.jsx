import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LabeledInfo from './components/LabeledInfo';

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

    const [data, setData] = useState([null]);

    const getUserInfo = async () => {
        const response = await axios.post(
            "http://localhost:8080/adminList/getUserInfo",
            { userId }
        );

        console.log(response.data);

        setData(response.data);
    }

    useEffect(() => {
        getUserInfo();
    }, []);

    const userName = data.userFirstName + " " + data.userLastName;


    return (
        <div className="app-form-page">
            <label >{`BeeWork${authorityContent}`}</label>
            <hr />
            <LabeledInfo label="メールアドレス" value={data.userMail}></LabeledInfo>
            <LabeledInfo label="名" value={userName}></LabeledInfo>
            <LabeledInfo label="名（カナ）" value={data.FirstNameKana }></LabeledInfo>
            <LabeledInfo label="姓" value={data.LastName }></LabeledInfo>
            <LabeledInfo label="姓（カナ）" value={data.LastNameKana }></LabeledInfo>
            <LabeledInfo label="性別" value={data.sex }></LabeledInfo>
            <LabeledInfo label="電話番号" value={data.userTel }></LabeledInfo>
            <LabeledInfo label="写真" value={data.photoAddress}></LabeledInfo>
            <button onClick={() => navigate(`/A0303modify/${id}`, { state: data })}>修正</button>
            <button onClick={() => navigate("/A0301")}>戻る</button>
        </div>
    );
}
