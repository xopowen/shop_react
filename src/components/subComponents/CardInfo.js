import PictureMixin from "../helpFunction/PictureMixin";
import React from "react";
import {Link, useLocation} from "react-router-dom";
import StarsScore from "./StarsScore";
import useIntObs from "../hooks/useIntObs";

export default function CardInfo({data}){
    /*
    ката новостей или производителя.
    props->{data->{
      {"id":2,"name":"ТЕст","img":'' or null,"description":""}
            or
     {"id":1,
     "title":"УЧЕНЫЕ ВЫРАСТИЛИ КЛЕТКИ  СО ВЖИВЛЕННОЙ В НИХ ЭЛЕКТРОНИКОЙ",
     "author":"Константин К.Р",
     "date":"2023-09-10T12:09:57.978776Z",
     "feedback":[{"score":6}],
     "img":"http://localhost:8000/media/news/2023/09/10/news1.png",
     "avg_score":3},
     }}
    * */
    const location = useLocation()
    let [ref,isView] =  useIntObs({},true)

    let link;
    if(location.pathname ==='/manufactures/'){
        link = <Link to={`/manufactures/${data.name}/`} className="blow-text card-news__link-full">перейти в каталог </Link>
    }else{
        link = <Link to={`/news/${data.id}/`} className="blow-text card-news__link-full">читать дальше </Link>
    }
    return    <article ref={ref} className={`${location.pathname !== '/manufactures/' ? 'news__card': ""} card-news `}>

        <PictureMixin img={data.img} className = {'appear'} alt={data?.name||' '}/>
        <div className="card-news__under-img appear">
            { data?.date && <time className="blow-text card-news__data">{ new Date(data.date).toLocaleDateString() }</time>}
            <div className="score card-news__score">
                {data?.avg_score > 0 && <StarsScore score={data.avg_score}/>}
            </div>
        </div>
        <h3 className="card-news__head appear">
                {data.name || data.title || " "}
        </h3>
        { data?.description && <p className="appear">{ data?.description}</p>}

        <div className="card-news__footer appear">
            {link}

            {data?.author &&  <address className="card-news__author">
                Автор: {data.author}
            </address>
            }
        </div>

    </article>

}