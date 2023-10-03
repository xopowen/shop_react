import star from "../../img/icons/Star.svg";
import starEmpty from "../../img/icons/Star-empty.svg";
import PictureMixin from "../helpFunction/PictureMixin";
import React   from "react";

export default function StarsScore({score}){
    // Выводит звёзды заполненные и пустые. Согласно score
    let starsFull = score > 0? score :0;
    let startEmpty = 5-starsFull;



    return <>
        {starsFull > 0 && Array(starsFull).fill(undefined).map( (v,i) =>{
            return <PictureMixin key={i}  img={star}/>
        })}
        {startEmpty > 0 && Array(startEmpty).fill(undefined).map((v,i)=>{
            return <PictureMixin  key={i} img={starEmpty}/>
        })}
    </>



}