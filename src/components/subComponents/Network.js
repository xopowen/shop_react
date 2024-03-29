import React from "react";

//img
import github  from "../../img/icons/github-mark.svg";
import telegram from "../../img/icons/telegram.svg";
import   IconVk   from '../../img/icons/vk-com.svg';

/**
 *
 * @param props
 * @return {JSX.Element}
 * @constructor
 * @description  статическая информация о ссылках на аккаунты социальные сети.
 * @description props распаковываются на родительском элементе ссылок
 * @example
 * <article {...props}>...</article>
 */
export default function Network (props){

     return   <article {...props}>
         <a href="https://github.com/xopowen" title={'github'}><img src = {github} id={'github'}   /></a>
         <a href="https://www.t.me/xopowen" title={'telegram'}><img src = {telegram} id={'telegram'} /></a>
         <a href="#" title={'vk'}><img src = {IconVk} id={'vk'} /></a>
    </article>;
}


