import React, {useMemo} from "react";
import {useLocation} from "react-router-dom";

import newsState from "../../mbox/NewsState";
import {observer} from "mobx-react-lite";

import Spinner from "../../Spinner";
import CardInfo from "../../subComponents/CardInfo";
import useIntObs from "../../hooks/useIntObs";


let News = observer(({head})=>{

    /*
    props->{head-заголовок}
    зависит от newsState.
    отображает карточки новостей.

    *если location.pathname ==='/news'
    будит загружать новые данные при
    приближении к отображённого спица концу списка.
    */

    const  data = newsState.elements
    let location = useLocation()
    let [ref,isView] = useIntObs({},false,false)
    let _ = useMemo(()=>{
        if(isView && newsState.isNext){
            newsState.next()
        }
    },[isView,newsState._next])

    return <>
        <section className="sections">
            <div className="sections__header">
                <h3 className="sections__head">{head}</h3>
            </div>
            <div className="sections__body news">
                {data && data.map((v,i)=>{
                    if(location.pathname ==='/news'){
                        return <CardInfo key = {v.id} data={v}/>
                    }
                    if(i<3){
                        return <CardInfo key = {v.id} data={v}/>
                    }} )}
            </div>
        {newsState.isLoading && <Spinner addClass={'spinner'}/>}
        </section>
        {location.pathname ==='/news' && <br ref={ref}/>}
    </>
})
export default News;