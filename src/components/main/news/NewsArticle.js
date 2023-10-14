import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";

import News from "./News";
import ajaxFetch from "../../helpFunction/ajaxFetch";
import Paragraph from "./Paragraph";
import useIntObs from "../../hooks/useIntObs";
import {observer} from "mobx-react-lite";


/**
 * 
 * @type {React.FunctionComponent<object>}
 * @description отображает страницу новости.
 * @description загружает дополнительную информацию c сервера
 * @url `/news/${params.id}/`.
 */
let NewsArticle = observer(()=>{
 
    let [ref,] = useIntObs({},true)
    const location = useLocation();
    let params = useParams();
    let navigate =   useNavigate()
    /**
     *@example
     *  data->{"id":8,
     *         "title":"УЧЕНЫЕ ВЫРАСТИЛИ КЛЕТКИ  СО ВЖИВЛЕННОЙ В НИХ ЭЛЕКТРОНИКОЙ",
     *         "img":'' or null,
     *         "author":"Константин К.Р",
     *         "date":"2023-09-13T07:01:01.854723Z",
     *         "paragraphs":[]
     *             }
     */
    const [data, setData] = useState()

    useEffect(() => {
        ajaxFetch( {
            url:`/news/${params.id}/`,
            method:'GET',
        }).then((response) => {
            let [ok,error,status]=response
            if (ok){
                ok.then(res=>setData(res))
            }
            if(status===404){
                navigate('/404/')
            }

        })}, [params.id, location, navigate])

    return <>
        <section ref={ref} className="sections sections_head-left sections_full-page opacity">
            <h1 className="sections__head">{data?.title}</h1>
            <div className="sections__body news-article">
                {data?.paragraphs && data.paragraphs.map((v) => {
                    return <Paragraph key = {v.id} data = {v}/>
                })}
            </div>
            <div className="news-article__footer appear">
                <time >{new Date(data?.date).toLocaleDateString()}</time>
                <address >{data?.author}</address>
            </div>
        </section>
        <News head = {"ещё новости"} />
    </>
})

export default NewsArticle;