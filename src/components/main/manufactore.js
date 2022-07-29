import React, {useEffect, useState} from "react";

import sendPequest, {MAIN_REQUEST_SERFER} from "../../index";
import PictureMecsin from "../subComponents/PictureMecsin";
import {useLocation} from "react-router-dom";
import {Catalog_item} from "./main_slaider";
import Card_info from "../subComponents/card-info";


function ManufactoreCard(props){
    return <div className="manufactore_card">
                <div className="manuafactore_card-body">
                        <div className="manufactore_img">
                        <PictureMecsin id={''} class_img={'rubber-img'} linkImgWebp={props.data.img.linkImgWebp} linkImg={props.data.img.linkImg}/>
                        </div>
                </div>
            </div>
}

export default function Manufactore(props){
    const locations = useLocation()

    /*data=>[img:{}]
    *
    * */
    const [statusData,setStatusData] = useState(false)
    const [data,setData] = useState([])

    useEffect(()=>{
        if(!statusData){
            sendPequest(MAIN_REQUEST_SERFER+'/manufactores/','POST').then(result=>{
                setData(result)
                setStatusData(!statusData)
            })
        }
    console.log(locations.pathname)
    },[data,statusData])

    if(locations.pathname === '/manufactores'){
        return <>
            <div className="news">
                {data.map((v,i)=>{
                    return <Card_info key = {i} data = {v} />
                })}
            </div>
        </> ;
    }

    return <div className="manufactore">
                <div className="manufactore_cards">
                    {data.map((v,i)=>{
                        return <ManufactoreCard key = {i} data = {v}/>
                    })}
                </div>

            </div>
}
