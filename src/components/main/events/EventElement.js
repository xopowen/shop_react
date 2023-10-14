import {useState} from "react";

import ajaxFetch from "../../helpFunction/ajaxFetch";
import OverPageContainer from "../OverPageContainer";
import PictureMixin from "../../helpFunction/PictureMixin";
//img
import next from "../../../img/icons/next 21.svg"

/**
 *
 * @param data
 * @example
 * data->{
 *     "id":1,
 *     "img":[{"link":"http://localhost:8000/media/img/2023/09/14/event-img.png"},],
 *     "name":"Встреча",
 *     "description":"Встреча",
 *     "img_face":"http://localhost:8000/media/events/2023/09/14/event-img.png",
 *     "address":"иркутск",
 *     "time_start":"2023-09-14T11:56:32Z"
 *     }
 * @description Получает данные о мероприятии и может отобразить 3 элемента
 * @description картонку как элемент списка,
 * @description карточку с описанием,
 * @description карточку с заявкой на участие.
 * @return {JSX.Element}
 * @constructor
 */
export default function EventElement({data}){
    let [isBookShow,setIsBook] = useState(false)
    let [isArticle,setIsArticle] = useState(false)
    
    let [statusIsBookRequesr,setStatus] = useState(false)
    let [errorRequest,setError] = useState()

    function haveTobook(e){
       setStatus(false)
       setError(undefined)
       ajaxFetch({
           url:'/to-book/',
           method:'POST',
           data:JSON.stringify({'event_id':data.id})
       }).then(response =>{
           let [ok,error] = response
           if(ok){
               setStatus(true)
           }
           if(error){
              error.then(res=>setError(res))
           }
       })
        e.preventDefault()
    }


    return <article className="events__card event-card">
        <PictureMixin img={data?.img_face}  loading={'lazy'}/>
        <div className="event-card__body">
            <h5 onClick={()=>setIsArticle(true)}>
                {data?.name}
            </h5>
            <button onClick={()=>setIsBook(true)} className="event-card__button">
                <img src={next} alt="last"/>
            </button>
        </div>
        <OverPageContainer isShow = {isBookShow | isArticle}>
            <article className={` event-card  event-card_book ${isBookShow && 'event-card_active' }`}>
                <PictureMixin img={data?.img_face}  loading={'lazy'}/>
                <div className="event-card__body">
                    <button  onClick={()=>setIsBook(false)}  className="event-card__back button-not-background">
                        назад
                    </button>
                    <h5>{data?.name}</h5>
                    <p>{data?.description}</p>
                    <address>{data?.address}</address>
                    <time>{data?.time_start && new Date(data.time_start).toLocaleTimeString()}</time>
                    <div className="event-card__footer">
                        <button onClick={haveTobook} className="blow-button">
                            забронировать место
                        </button>
                        {statusIsBookRequesr && <p className={'blow-text'}>Отправлено</p>}
                        {errorRequest && <p className={'error'}>{errorRequest.error}</p>}
                    </div>
                </div>
            </article>
            <div className={`event-card__container ${isArticle && 'event-card__container_active' }`}>
                <article className={ `event-card event-card_article ${isArticle && 'event-card_active' }`}>
                <div className="event-card__body">
                    <button onClick={()=>setIsArticle(false)} className="event-card__back button-not-background">
                        назад
                    </button>
                    <h2>{data?.name}</h2>
                    <p>{data?.description}</p>
                    <div className="event-card__img-list">
                        {data?.img && data.img.map((v,i)=>{

                            return<div key={i} className="event-card__img">
                                <PictureMixin img={v.link}  loading={'lazy'}/>
                            </div>
                        })}
                    </div>
                </div>
            </article>
            </div>
        </OverPageContainer>

    </article>
}