import React, {useEffect, useState} from "react";

//img
import sendPequest, {MAIN_REQUEST_SERFER} from "../../index";
import Card_info from "../subComponents/card-info";
import {Link} from "react-router-dom";


 /*let testData= {
     name:'string',
     author:'string',
     img:{linkImg:news1,linkImgWebp:news1Webp},
     data:'12.12.12',
     avgScore:3
 }*/

export default function News (){
    /*data =>{
        id,
        header:string,
        author:string,
        img:{},
        date:date,
        avgScore:int
        }
        * */
    const [statusData,setStatusData] = useState(false)
    const [data,setData] = useState([])

    useEffect(()=>{
        if(!statusData){
            sendPequest(MAIN_REQUEST_SERFER+'/new-news/',"POST").then(result=>{
                setData(result)
                setStatusData(!statusData)
            })
        }
    })
    return <div className="news">
        <Link to={'news/1'}>1   </Link>
            {data.map((v,i)=>{return <Card_info key = {i} data={v}/>} )}
            </div>
}