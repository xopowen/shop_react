import React from "react";

export default function  Submit({value}){
    // кнопка отправки формы
    return  <input type="submit" className="blow-button" title={value} value={value}/>
}