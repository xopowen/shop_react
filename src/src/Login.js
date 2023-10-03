import loginSvg from '../img/icons/login.svg'
import {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import Submit from "../components/formComponents/Submit";
import FieldInput from "../components/formComponents/FieldInput";

import authStore from "../components/mbox/AuthStore";
import {observer} from "mobx-react-lite";
import stateBasket from "../components/mbox/BasketState";

let Login = observer( (props)=>{
    /*
    *страница с формой авторизации
    * зависит от authStore.
    * */

    let navigate = useNavigate()


    useEffect(()=>{
        if(authStore.isAuth && authStore.isRefreshLinkValid){
            navigate(-1)
        }
    },[authStore.isAuth])

    function haveLogin(e){

        let data = {}
        for (let pair of new FormData(e.target)) {
            data[pair[0]]= pair[1];
        }

        authStore.login(data.email,data.password).then(()=>{
            navigate(-1)
        }).then(()=>{  stateBasket._getAmt()})
        e.preventDefault()
    }

    return<form onSubmit={haveLogin} className="sections form form_with-frame sections_head-left" >
        <div className="form__header form__header_while">
            <h2 className="sections__head">Войти в личный кабинет</h2>
            <img src={loginSvg} alt={'login'}/>
        </div>
        <div className="form__body form__body_text-aria-left">
            <FieldInput name={'email'} placeholder={"E-mail"} type={"email"} />
            <label className="form__field">
                <input type="password" name="password" placeholder="Пароль" title="Пароль"/>
                    <p className="form__forgotten-password">
                        <a href="#">Забыли пароль?</a>
                    </p>
            </label>
        </div>
        <div className="form__footer">
            <Submit value={'войти'}/>
            <Link to={'/registration/'}  className="form__text-smail">Регистрация</Link>
            <a href="#" className="form__text-smail">Нажимая на кнопку «отправить», я соглашаюсь с условиями.</a>
        </div>
    </form>


})

export default Login;