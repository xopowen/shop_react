import React, {useMemo} from "react";
import {useLocation} from "react-router-dom";

import newsState from "../../mbox/NewsState";
import {observer} from "mobx-react-lite";

import Spinner from "../../Spinner";
import CardInfo from "../../subComponents/CardInfo";
import useIntObs from "../../hooks/useIntObs";


/**
 *
 * @type {React.FunctionComponent<{readonly head?: String}>}
 * @depend newsState.
 * @see newsState
 * @description отображает карточки новостей.
 * @description *если location.pathname ==='/news'
 *     будит загружать новые данные при
 *     приближении к отображённого спица концу списка.
 * @description если нет отобразить только 3 карточки
 */
let News = observer(({head}) => {


    const data = newsState.elements
    let location = useLocation()
    let [ref, isView] = useIntObs({}, false, false)
    
    let _ = useMemo(() => {
        if (isView && newsState.isNext) {
            newsState.next()
        }
    }, [isView, newsState.isNext])

    return <>
        <section className="sections">
            <div className="sections__header">
                <h3 className="sections__head">{head}</h3>
            </div>
            <div className="sections__body news">
                {data && data.map((v, i) => {
                    if (location.pathname === '/news') {
                        return <CardInfo key={v.id} data={v}/>
                    }
                    if (i < 3) {
                        return <CardInfo key={v.id} data={v}/>
                    }
                })}
            </div>
            {newsState.isLoading && <Spinner addClass={'spinner'}/>}
        </section>
        {location.pathname === '/news' && <br ref={ref}/>}
    </>
})
export default News;