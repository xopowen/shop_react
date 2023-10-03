import React from "react";

export default function VideoPlair({videos}){
    /*
    секция отображения videos.

    * */
    return   <section id="video-review" className="sections sections_head-left sections_full-page">
        <h2 className="sections__head">
            Видеобзор
        </h2>
        <div className="sections__body">
            { videos && videos.map(v=>{
                return   <video key={v.id} src={v.link} controls={true} className="video-review"/>
            })}
        </div>
    </section>
}