
import {useEffect, useState} from "react";
import ajaxFetch from "../../helpFunction/ajaxFetch";
import BasketCard from "../basket/BasketCard";
//img
import check_printer from '../../../img/icons/check-printer.svg';
import UserOrderCard from "./UserOrderCard";
export default function UserOrders({head}){
    /*
    отображает карточки заказов которые уже оформлены.
    url:'/client-info/orders/',
    * */

    let [cardList,setCardList] = useState()

    useEffect(()=>{
        ajaxFetch({
            url:'/client-info/orders/',
            method:'GET',
        }).then(response=>{
            let [ok,error] = response
            if(ok){
                ok.then(res=>setCardList(res))
            }
        })

    },[])



    return  <section className="sections sections_head-left">
        <div className="sections__header">
            <h2 className="sections__head">{head}</h2>
        </div>
        <div className="sections__body grid-box">
            <button className={'button_print'}>
                <img src={check_printer}/>
                Распечатать
            </button>
            <div className="basket__cards">
                <div className="basket__heard-list">
                    <p>фото</p>
                    <p>Товар</p>
                    <p>Цена</p>
                    <p>Количество</p>
                    <p>Сумма</p>
                    <p>дата доставки</p>
                </div>
                <div className="basket__list">
                    {cardList &&  cardList.map(v=>{
                        return <UserOrderCard key={v.id}  data={v}/>
                    }) }

                </div>
            </div>

        </div>
    </section>
}