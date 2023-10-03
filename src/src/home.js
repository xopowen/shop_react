import React from "react";

import MainSlider from "../components/main/main-slider/MainSlider";
import Catalogs from "../components/main/catalogs/Catalogs";
import SliderProducts from "../components/main/product-slider/SliderProducts";
import Manufacture from "../components/main/manufacture/Manufacture";
import News from "../components/main/news/News";



export default function Home(props){

    return<>
        <MainSlider/>
        <Catalogs  head = {'Медицинское оборудование'}/>
        <SliderProducts  head = {'Новинки'}/>
        <Manufacture head = {'Бренды и заводы производители'} />
        <News head = {"Последние новости"}/>
    </>
}