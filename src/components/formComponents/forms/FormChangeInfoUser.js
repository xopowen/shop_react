import {useLayoutEffect, useRef} from "react";
import FormBody from "./formsUserInfo/FormBody";

export default function FormChangeInfoUser({onSubmit}){
    // Форма изменений данный пользователя.
    // Данный отправляются по нажатию Enter.
    let ref = useRef()

    useLayoutEffect(()=>{
        // Устанавливает обработчик событий нажатия клавиш.
        // Удаляет после размонтирования.
        let haveEnter = function(event) {
            // отправка форм по нажатию Enter
            if (event.code === 'Enter')
            {
                onSubmit(ref.current) ;
            }
        }
        window.document.addEventListener('keyup',haveEnter)

        return window.removeEventListener('keyup',haveEnter)
    },[ref])

    function proxyOnsubmit (e) {
        onSubmit(ref.current)
        e.preventDefault()}

    return <>
    <form onSubmit={proxyOnsubmit}
          ref={ref} className="form form_with-frame profile__info">
          <FormBody />
    </form>
    </>
}