import LabeledInput from "./components/LabeledInput.jsx";
import { useNavigate, useLocation } from 'react-router-dom'
import Bee from "./assets/Bee.png";

export default function A0004_1() {

    const navigate = useNavigate();
    const location = useLocation();
    const form = location.state;

    return (
        <div>
            <img src={Bee} alt="Bee" />
            <label>システム管理者新規</label>
            <label>※は入力必須項目です</label>
            <LabeledInput label="メールアドレス" type="text" name="mail" value={form.mail}  disabled={true} />
            <LabeledInput label="パスワード" type="password" name="pwd0" value={form.pwd0}  disabled={true} />
            <LabeledInput label="パスワード確認" type="password" name="pwd1" value={form.pwd1}  disabled={true} />
            <LabeledInput label="名" type="text" name="firstName" value={form.firstName}  disabled={true} />
            <LabeledInput label="名（カナ）" type="text" name="firstNameKana" value={form.firstNameKana}  disabled={true} />
            <LabeledInput label="姓" type="text" name="lastName" value={form.lastName}  disabled={true} />
            <LabeledInput label="姓（カナ）" type="text" name="lastNameKana" value={form.lastNameKana}  disabled={true} />
            <label >性別</label>
            <input type="radio" name="sex" value="male"  checked={form.sex === "male"} disabled={true} /> 男性
            <input type="radio" name="sex" value="female"  checked={form.sex === "female"} disabled={true} /> 女性
            <LabeledInput label="電話番号" type="text" name="tel" value={form.tel} disabled={true} />
            <LabeledInput label="写真" type="file" name="img" value={form.img} disabled={true} />
            <input type="button" value="登録"  />
            <input type="button" value="戻る" onClick={() => navigate("/A0004", { state: form })} />
        </div>);
}
