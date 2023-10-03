import React, {useState} from "react";

import Textarea from "../Textarea";
import FieldInput from "../FieldInput";
import PhoneInput from "../PhoneInput";
import Submit from "../Submit";
import LinkTerms from "../LinkTerms";

import ajaxFetch from "../../helpFunction/ajaxFetch";
import fromFormDataToDict from "../../helpFunction/fromFormDataToDict";

export default function FormOrderCallback(){
    // форма заказа обратного звонка.
    /*fields ->{
        text: Textarea,
        first_name: Input type =text (FieldInput)
        email: Input type = email    (FieldInput)
        phone: Input type = text     (PhoneInput)
    }

    * */
    let [isSuccess,setSuccess] = useState()
    let [errors,serErros] = useState([])
    function haveAskQuestion(e){
        // Отправка заявки на звонок по ajax.
        // Получает event формы -> void
        setSuccess(undefined)
        serErros([])
        let data = fromFormDataToDict(e.target)
        ajaxFetch({
            url:'/ask-question/',
            method:'POST',
            data:JSON.stringify(data)
        }).then(response=>{
            let [ok,error] = response
            if(ok){
                setSuccess(true)
            }
            if(error){
                error.then(res=>serErros(res))
            }
        })
        e.preventDefault()
    }

    return <form className="sections form form_with-frame sections_head-left"
                 onSubmit={haveAskQuestion}>
        <div className="form__header form__header_while">
            <h2 className="sections__head">Заказать обратный звонок{isSuccess && '. Успех'}</h2>
        </div>
        <div className="form__body form__body_text-aria-left">
            <Textarea name={'text'}
                      placeholder={'Сообщение'}
                      labelClass={'form__field form__field_textarea form__field_textarea-right'}
                      ariaInvalid={errors?.['text'] && true}
            />
            <FieldInput name="first_name"
                        ariaInvalid={errors?.['first_name'] && true}
                        placeholder="Как вас зовут?"
                        type="text"/>

            <FieldInput type="email"
                        name="email"
                        placeholder="E-mail"
                        ariaInvalid={errors?.['email'] && true}
            />

            <PhoneInput name={'phone'}
                        ariaInvalid={errors?.['phone'] && true}
            />

        </div>
        <div className="form__footer">
            <Submit value={'Отправить'}/>
            <LinkTerms/>
        </div>
    </form>


}