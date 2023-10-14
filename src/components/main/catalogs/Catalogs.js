import React, {useEffect, useState} from "react";

import ajaxFetch from "../../helpFunction/ajaxFetch";
import CatalogItem from "./CatalogItem";
import useIntObs from "../../hooks/useIntObs";


/**
 *
 * @param {string} head
 * @description отображает список каталогов полученные с сервера
 * @return {JSX.Element}
 * @constructor
 * @url '/catalogs/'
 */
export default function Catalogs({head}) {
    const [statusShowFull, setstatusShowFull] = useState(false)
    const [catalogs, setCatalogs] = useState([])
    let  [ref,] = useIntObs()

    useEffect(() => {
            ajaxFetch({
                url:'/catalogs/',
                method:"GET"
            }).then(respose=>{
                let [ok,]= respose
                if(ok){
                    ok.then(res=>setCatalogs(res))
                }
            })

    },[])

    return <section ref={ref} className="sections  opacity products-catalog">
        <h2 className='sections__head '>
            {head}
        </h2>
        <div className={`products-catalog__body ${statusShowFull ? 'products-catalog__body_active':''}`}>
            {catalogs.length>0 && catalogs.map(value => <CatalogItem key={value.id} data = {value}/>) }
        </div>
        {catalogs.length > 5 &&
            <button className={`products-catalog__button-show ${statusShowFull ? 'products-catalog__button-show_active':''} blow-text`}
                    onClick={() => {setstatusShowFull(!statusShowFull)}}>
                {!statusShowFull ? 'показать всe ' + head.toLowerCase() : 'скрыть'}
            </button>
        }
    </section>


}
