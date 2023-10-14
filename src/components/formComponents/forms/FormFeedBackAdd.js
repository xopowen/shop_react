import fromFormDataToDict from "../../helpFunction/fromFormDataToDict";
import ajaxFetch from "../../helpFunction/ajaxFetch";
import React from "react";

/**
 *
 * @param {string} url - адрес на котором должен быть обработчик
 * @param {function} sendedFeedBack- функция, которая получает данный ответа.
 * @description форма создания комментарий
 * @return {JSX.Element}
 * @constructor
 */
export default function FormFeedBackAdd({url,sendedFeedBack}){

    function addFeedBack(e){
        // Отправка комментария по ajax.
        // Получает event формы -> void
        /* json {
        * score:Number(min-0,max-10),
        * comment: Textarea
         * }
         */
        let dataForm = fromFormDataToDict(e.target)
        ajaxFetch({
            url:url,
            method:'POST',
            data:JSON.stringify(dataForm)
        }).then(response=>{
            let[ok,] = response
            if(ok){
               ok.then(res=>  sendedFeedBack(res))
            }
        })
        e.preventDefault()
    }

    return <form onSubmit={addFeedBack} className="feedback__card feed-back-card">
        <div className="feed-back-card__header">
            <div className="feed-back-card__score">
                <input type={'number'} min={0} max={10} name={'score'} defaultValue={0}/>
            </div>
        </div>
        <textarea cols={10}
                  placeholder={'сообщение'}
                  className={'feed-back-card__text'}
                  name={'comment'}/>
        <input type="submit" value={'оставить комментарий'} className={'blow-button'}/>
    </form>
}