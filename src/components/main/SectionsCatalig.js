import React, {useEffect, useState} from "react";
import sendPequest, {MAIN_REQUEST_SERFER} from "../../index";
import {Catalog_item} from "../subComponents/Catalog_item";




export default function SectionsCatalig(props) {
    const [statusShowFull, setstatusShowFull] = useState(false)
    const [catalogs, setCatalogs] = useState([
    ])
    const [statusData, setStatusData] = useState(false)
    useEffect(() => {
        if (!statusData) {
            sendPequest(MAIN_REQUEST_SERFER + '/catalogs/', "POST").then((result) => {
                result.sort((a, b) => a.order || 0 - b.order || 0)
                setCatalogs(result)
                setStatusData(!statusData)
            })
        }
    })

    let footer = <div className={'sections_footer blou-text'}><p onClick={() => {
        setstatusShowFull(!statusShowFull)
    }}> {!statusShowFull ? 'показать всe ' + props.head.toLowerCase() : 'скрыть'}</p></div>

    return <>
        <div className={'sections_body'}>
            {catalogs.map((v, i) => {
                if (i === 5 && !statusShowFull) {
                    return
                }
                return <Catalog_item key={v.order} class={'small'} data={v}/>
            })}
        </div>
        {catalogs.length > 5 && footer}
    </>
}
