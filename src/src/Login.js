
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Submit from "../components/formComponents/Submit";
import FieldInput from "../components/formComponents/FieldInput";

import authStore from "../components/mbox/AuthStore";
import {observer} from "mobx-react-lite";
import stateBasket from "../components/mbox/BasketState";
//img
import loginSvg from '../img/icons/login.svg'
import fromFormDataToDict from "../components/helpFunction/fromFormDataToDict";
import LinkTerms from "../components/formComponents/LinkTerms";
import ErrorFORM from "../components/helpFunction/ErrorFORM";

/**
 * @return React.FunctionComponentElement
 * @description страница с формой авторизации.
 * @depend authStore
 * @see authStore
 * @description если пользователь авторизовался перенаправлять на страницу с которой он пришёл.
 * @description авторизированный пользователь автоматически перенаправляется с этой станицы.
 *
 */
let Login = observer( ()=>{
    
    let navigate = useNavigate()
    let [errors,setErrors] = useState({})


    useEffect(()=>{
        if(authStore.isAuth && authStore.isRefreshLinkValid){
            navigate(-1)
        }
    },[authStore.isAuth])

    function haveLogin(e){
        let data = fromFormDataToDict(e.target)
        authStore.login(data.email,data.password).then((response)=>{
            let [ok,error] = response
            if(error){
                error.then(res=>setErrors(res))
            }
            if(ok){
                navigate(-1)
            }

        }).then(()=>{  stateBasket._getAmt()})
        e.preventDefault()
    }

    return<form onSubmit={haveLogin} className="sections form form_with-frame sections_head-left" >
        <div className="form__header form__header_while">
            <h2 className="sections__head">Войти в личный кабинет</h2>
            <img src={loginSvg} alt={'login'}/>
            {errors && <ErrorFORM errors_list={['error in data']}/>}
        </div>

        <div className="form__body form__body_text-aria-left">

            <FieldInput name={'email'} placeholder={"E-mail"} type={"email"} errors = {errors}/>
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
            <LinkTerms/>
        </div>
    </form>


})

export default Login;