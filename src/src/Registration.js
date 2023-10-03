import ajaxFetch from "../components/helpFunction/ajaxFetch";
import {useState} from "react";
import Submit from "../components/formComponents/Submit";
import FieldInput from "../components/formComponents/FieldInput";
import fromFormDataToDict from "../components/helpFunction/fromFormDataToDict";
import {useNavigate} from "react-router-dom";
//img 
import profile_regist from '../img/icons/profile-regist.svg'
import LinkTerms from "../components/formComponents/LinkTerms";


export default function Registration(){
    /*
     отображает форму для регистрации пользователя
     * */
    let navigate = useNavigate()
    const [error, setError] = useState( );

    function registerUser(e){

        let data = fromFormDataToDict(e.target)
        ajaxFetch({
            url: '/dj-rest-auth/registration/',
            method: "POST",
            data: JSON.stringify(data)
        }).then(response => {
            let [ok,error] = response
            if(ok){
                navigate('/login/')
            }
            if(error){
                error.then(res=>setError(res))
            }
        });

        e.preventDefault()
    } 

    return <form onSubmit={registerUser} className="sections form form_with-frame sections_head-left" action="">
        <div className="form__header form__header_while">
            <h2 className="sections__head">Создать учетную запись</h2>
            <img src={profile_regist} alt={''}/>
        </div>
        <div className="form__body form__body_text-aria-left">
            <FieldInput type="email" name="email" placeholder="E-mail" title="E-mail" errors = {error}/>
            <FieldInput type="password" name="password1" placeholder="Пароль" title="Пароль" errors = {error}/>
            <FieldInput type="password" name="password2" placeholder="повторите пароль" title="Пароль" errors = {error}/>
        </div>
        <div className="form__footer">
            <Submit/>
            <LinkTerms/>
        </div>
    </form>;
}