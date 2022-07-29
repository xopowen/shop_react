import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import sendPequest, {MAIN_REQUEST_SERFER} from "../../index";
import {HeaderHead} from "../layout/layout";

function PopupMenu_item(props){

    return <div data-id={props.data.id} onMouseOver={props.onMouseOver}   onClick={()=>props.headActive(props.data.name)} className="Popup-menu_item" >
        <Link onMouseOver={e=>e.stopPropagation()} to={props.path}>{props.data.name}</Link>
    </div>
}

export default function PopupMenus(props){

    /* {
        "id": 6,
        "name": "ИМПЛАНТЫ",
        "order": 5,
        "choices": [
            {
                "id": 1,
                "name": "Автоматический",
                "showPopup": true,
                "selected": false,
                "filter": 1,
                "catalog": 6
            },
        ]
                }
    * */
    const [statusData,setStatusData] = useState(false)
    const [data,setData] = useState([])

    const [active_item,setActive_item]=useState([])

    let {head,setHead} = useContext(HeaderHead)
    let headActive=(name)=>{
        setHead(name)
    }

    useEffect(()=>{
        if(!statusData)
        sendPequest(MAIN_REQUEST_SERFER+'/popup-menu/','POST').then(result=>{
            setData(result)
            setStatusData(!statusData)
        })
    },[data,statusData])


    let haveShowChoice=(e)=>{
        let item = data.find(v => v.id === +e.target.dataset.id).choices||[]
        if(item.length>0){
            setActive_item(item)
        }else{
            setActive_item([])
        }
        e.stopPropagation();
    }

    return <div className={'Popup-menu blue-vision'}>
        <div className="Popup-menu_catalog Popup-menu_list ">
            { data.length>0 && data.map((v,i)=>{return <PopupMenu_item onMouseOver={haveShowChoice} headActive ={headActive} onClick={setHead(v.name)} key={i}  path={'catalog/'+v.id} data ={v} />})}
        </div>
        <div className={'Popup-menu_start-filter  Popup-menu_list'}>
            {active_item.length>0 && active_item.map((v,i)=>{return <PopupMenu_item  key={i} path={'catalog/'+v.catalog+'/'+v.id} data ={v} /> }) }
        </div>
    </div>
}
//