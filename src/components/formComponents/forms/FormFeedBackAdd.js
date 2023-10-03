import fromFormDataToDict from "../../helpFunction/fromFormDataToDict";
import ajaxFetch from "../../helpFunction/ajaxFetch";
import React from "react";

export default function FormFeedBackAdd({url,sendedFeedBack}){
    //форма создания комментарий
    /*
    * url - адрес на котором должен быть обработчик
    * sandedFeedBack - функция, которая получает данный ответа
    *
    * post json {
    * score:Number(min-0,max-10),
    * comment: Textarea
    * }
    *
    * */

    function addFeedBack(e){
        // Отправка комментария по ajax.
        // Получает event формы -> void
        let dataForm = fromFormDataToDict(e.target)
        ajaxFetch({
            url:url,
            method:'POST',
            data:JSON.stringify(dataForm)
        }).then(response=>{
            let[ok,error,status] = response
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