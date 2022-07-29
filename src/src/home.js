import React from "react";
import Header from "../components/header/header";
import Main_slaider from "../components/main/main_slaider";
import Sections from "../components/main/sections";
import SlaiderPoducts from "../components/main/slaider-poducts";
import Manufactore from "../components/main/manufactore";
import News from "../components/main/news";
import SectionsCatalig from "../components/main/SectionsCatalig";


export default function Home(props){

    return<>

        <Main_slaider/>
        <Sections head = {'Медицинское оборудование'} >
            <SectionsCatalig  head = {'Медицинское оборудование'}/>
        </Sections>
        <Sections head ={'Новинки'}>
            <SlaiderPoducts  head ={'Новинки'}/>
        </Sections>
        <Sections head ={'Бренды и заводы производители'} addlClass = 'sections__full'>
            <Manufactore/>
        </Sections>
        <Sections head = {'Последние новости '}>
            <News/>
        </Sections>


    </>
}