import PictureMixin from "../../helpFunction/PictureMixin";
import React  from "react";

export default function  Paragraph({data}){

    // data=>{
    //     title:String,
    //     position_img:'L' or 'R',
    //     img:String,
    //     text:String
    // }
    return <article className="news-article__item appear">
        <div className="news-article__right appear">
           <PictureMixin img={data?.img} title = {data?.title} alt={' '}/>
        </div>
        <h2 className="news-article__head appear">{data?.title}</h2>
        <p className="appear">
            {data?.text && data.text.split('\r').map((v,i)=>{
                return <React.Fragment key = {i}>
                {v}
                    <br/>
                </React.Fragment>
            })}

        </p>
    </article>
}