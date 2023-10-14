import React from "react";

/**
 *
 * @param {string} value - set as input value and input title
 * @description кнопка отправки формы
 * @return {JSX.Element}
 * @constructor
 */
export default function  Submit({value}){

    return  <input type="submit" className="blow-button" title={value} value={value}/>
}