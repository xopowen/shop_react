import React, {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import sendPequest, {MAIN_REQUEST_SERFER} from "../../index";
import PictureMecsin from "../subComponents/PictureMecsin";
import Sections from "./sections";
import News from "./news";


export default function News_article(props) {
    /*_data=>{header:string,
            author:sthing,
            data:Data,
            paragraphs:[
                {   id:int
                    img:class,//optional
                    head:sthing,//optional
                    text:sthing,
                }
            ]
    * */
    const location = useLocation();
    let Params = useParams();

    const [status_data, setStatus_data] = useState(false)
    const [_data, set_data] = useState({})

    useEffect(() => {
            if (!status_data) {
                sendPequest(MAIN_REQUEST_SERFER + '/news', "POST", {id: Params.id}).then(result => {
                    set_data(result)
                    setStatus_data(!status_data)
                })
            }
        }, [location]
    )

    return <div className={'container'}>
    <div className="Article blue-vision">
        <h1 className="Article_head blou-text head_big-news">{_data.header}</h1>
        <div className="Article_body ">
            {_data.paragraphs && _data.paragraphs.map((v,i) => {
                let left =   <div className="sample_left">
                    {v.head && <h2 className="sample_head news-h2">{v.head}</h2>},
                    <p className="sample_text">
                        {v.text}
                    </p>
                </div>;
                let right = <>{v.img && <div className="sample_right">
                        <PictureMecsin _data={v.img}/>
                    </div>}</>;

                if(i % 2 === 1){
                [left,right] = [right,left]}
                return <div key={v.id} className="Article_item sample">
                    <div className="sample_conteiner">
                        {left}{right}
                    </div>
                </div>
            })}
        </div>
        <div className="Article_footer">
            <p className="red-text">{_data.data}</p>
            <p className="Article_auther red-text">{_data.author}</p>
        </div>
    </div>
        <Sections head={'Еще новости'}>
            <News/>
        </Sections>
    </div>
}