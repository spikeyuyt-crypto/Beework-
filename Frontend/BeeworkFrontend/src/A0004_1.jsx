import LabeledInput from "./components/LabeledInput.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import Bee from "./assets/Bee.png";
import axios from "axios";

export default function A0004_1() {
    const navigate = useNavigate();
    const location = useLocation();
    const form = location.state;

    const sendInsertData = async () => {
        await axios.post("http://localhost:8080/adminList/auserSystemInsert", {
            authority: "21",
            companyId: "0",
            countryZip: "81",
            firstName: form.firstName,
            firstNameKana: form.firstNameKana,
            lastName: form.lastName,
            lastNameKana: form.lastNameKana,
            photoAddress: "",
            pwd: form.pwd0,
            repwd: form.pwd1,
            sex: form.sex === "male" ? "1" : "2",
            userMail: form.mail,
            userStatus: "0",
            userTel: form.tel,
        });
        navigate("/A0301");
    };

    return (
        <div>
            <div className="A0004_1" id="A0004_1Grid">
                <img src={Bee} alt="Bee" />
                <label>システム管理者新規</label>
                <label>※は入力必須項目です</label>

                <LabeledInput label="メールアドレス" type="text" name="mail" value={form.mail} disabled={true} />
                <LabeledInput label="パスワード" type="password" name="pwd0" value={form.pwd0} disabled={true} />
                <LabeledInput label="パスワード確認" type="password" name="pwd1" value={form.pwd1} disabled={true} />
                <LabeledInput label="名" type="text" name="firstName" value={form.firstName} disabled={true} />
                <LabeledInput label="名（カナ）" type="text" name="firstNameKana" value={form.firstNameKana} disabled={true} />
                <LabeledInput label="姓" type="text" name="lastName" value={form.lastName} disabled={true} />
                <LabeledInput label="姓（カナ）" type="text" name="lastNameKana" value={form.lastNameKana} disabled={true} />

                <div className="form-radio-row">
                    <span></span>
                    <label className="form-row-label">性別</label>
                    <label className="radio-option">
                        <input type="radio" name="sex" value="male" checked={form.sex === "male"} disabled={true} readOnly />
                        男性
                    </label>
                    <label className="radio-option">
                        <input type="radio" name="sex" value="female" checked={form.sex === "female"} disabled={true} readOnly />
                        女性
                    </label>
                </div>

                <LabeledInput label="電話番号" type="text" name="tel" value={form.tel} disabled={true} />

                <div className="form-upload-row">
                    <span></span>
                    <label className="form-row-label">写真</label>
                </div>

                <div className="form-actions">
                    <input type="button" value="登録" onClick={sendInsertData} />
                    <input type="button" value="戻る" onClick={() => navigate("/A0004", { state: form })} />
                </div>
            </div>
        </div>
    );
}
