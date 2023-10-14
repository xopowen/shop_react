import {useEffect, useState} from "react";

import ajaxFetch from "../../helpFunction/ajaxFetch";
import UserFeedBacksCard from "./UserFeedBacksCard";
//img
import check_printer from "../../../img/icons/check-printer.svg";

/**
 *
 * @param {string} head
 * @constructor
 * @url '/client-info/feed-backs/'
 * @description   Отображает комментарии пользователя оставленные на продукты.
 * @return {JSX.Element}
 */
export default function UserFeedBacks({head}){

    let [cardList,setCardList] = useState()

    useEffect(()=>{
        ajaxFetch({
            url:'/client-info/feed-backs/',
            method:'GET',
        }).then(response=>{
            let [ok,] = response
            if(ok){
                ok.then(res=>setCardList(res))
            }
        })

    },[])
    return <section className="sections sections_head-left">
        <div className="sections__header">
            <h2 className="sections__head">{head}</h2>
        </div>
        <div className="sections__body grid-box">
            <button className={'button_print'}>
                <img src={check_printer} alt={''}/>
                Распечатать
            </button>
            <div className="basket__cards">
                <div className="basket__heard-list">
                    <p>фото</p>
                    <p>Товар</p>
                    <p>оценка</p>
                    <p>Комментарий (отзыв)</p>
                </div>
                <div className="basket__list">
                    {cardList &&  cardList.map(productItem=>{

                        return productItem.feedback.map(feedBackItem=>{
                            return <UserFeedBacksCard key={feedBackItem.id}
                                                      product={productItem}
                                                      feedback = {feedBackItem}/>
                        })
                    }) }
                </div>
            </div>

        </div>
    </section>
}