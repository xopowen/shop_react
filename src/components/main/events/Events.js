import {useEffect, useState} from "react";
import ajaxFetch from "../../helpFunction/ajaxFetch";
import EventElement from "./EventElement";

export default function Events ({head}){
    /*
    props ->{head - заголовок}
    отображает писко карточек мероприятий.
    получает список по  url:'/about-company/',

    * */

    let [data,setData] = useState([])

    useEffect(()=>{
        ajaxFetch({
            url:'/about-company/',
            method:'GET'
        }).then(response=>{
            let [ok,error] = response
            if(ok){
                ok.then(res=>setData(res))
            }
        })
    },[])


    return <section className="sections">
        <h1 className="sections__head">{head}</h1>
        <div className="sections__body events">
            {data.length > 0 && data.map(value => <EventElement key={value.id} data={value}/>)}
        </div>
    </section>

}