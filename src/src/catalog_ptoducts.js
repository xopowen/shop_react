import React, {useContext, useEffect, useReducer, useState} from "react";
import Sections from "../components/main/sections";
import {Outlet, useParams, Navigate, useLocation} from "react-router-dom";
import sendPequest, {MAIN_REQUEST_SERFER} from "../index";
import Product_item from "../components/subComponents/Product_item";
import {HeaderHead} from "../components/layout/layout";



function FilterElements(props){
   /* props=>{
        urlParams:{catalog:id,startFilter:id},
        handleChange:function ,
    }*/
    let location = useLocation()
    const handleChange = props.handleChange
    const [statusClear,setClear] = props.clearStatis
    const [data,setData] = useState([])
    const {catalogId,startFilter} = props.urlParams


    useEffect(()=>{
            sendPequest(MAIN_REQUEST_SERFER+'/filter/'+`${catalogId}`,"POST",).then(result=>{
                setData(result)
            })
        setClear(true)
    },[location,statusClear])

    return <>
        {data.length >0 && data.map((v,)=>{
            return <div key={v.id} className="filter_element-filtre">
            <ul><p>{v.name}</p>
                {v.choices.length>0 && v.choices.map((Cv,Ci)=>{
                    if(Cv.id === +startFilter){
                        return <>
                            <li key={Cv.id}> <label >
                                <input onChange={handleChange}
                                       type="checkbox"
                                       keyboard={'keyboard'}
                                       data-filter={Cv.filter}
                                       name={Cv.id}/>Промышленные предприятия</label>
                            </li>
                        </>
                    }
                return <>
                    <li key={Cv.id}> <label >
                        <input onChange={handleChange}
                               type="checkbox"
                               data-filter={Cv.filter}
                               name={Cv.id}/>{Cv.name}</label>
                    </li>
                    </>
                    })
                }
            </ul>
            </div> })}
    </>
}


export default function Catalog_ptoducts(){
    //загружает товары из катоалога с возмоностью фильтрации
    //копонент получает url параметры catalog_id и startFilter
    let {head,setHead} = useContext(HeaderHead)
    const STATR_FILTER = {'order':'date','min-praise':0,'max-praise':-1}

    let location = useLocation()
    let  {catalogId,startFilter} = useParams()//параметры url
    let [filterCatalog,setFilter] = useState( STATR_FILTER)
    let [statusChangefilter,setStatusChangefilter] = useState(false)
    let [clear,setClear] = useState(true)
    let rowfilterCatalog = new Object(filterCatalog)//нужна для мержа состаяний (костыль)
    let [data,setData] = useState([])
    const [showFiltr,setShowfilter] = useState(true)

    useEffect(()=>{
            sendPequest(MAIN_REQUEST_SERFER+location.pathname,"POST",{filterCatalog}).then(result=>{
                setData(result)
            })
    },[location,statusChangefilter,clear])

    useEffect(()=>{
        setShowfilter(true)
    })

    let clearFilter=()=>{
        //очищает фильтр и вызывет его перерисовку
        document.querySelector('select[name=order]').options.selectedIndex=0
        setData({})
        setFilter(STATR_FILTER)
        hendClear(false)
        setShowfilter(false)
    }
    let changePraice=(element)=>{
        //изменяет фильтр при изменене полей c type == nemper
        rowfilterCatalog[element.name] = parseInt(element.value)||-1;
    }
    let changeSorter = (element)=>{
        rowfilterCatalog[element.name] = element.value;
    }
    let changeCheckbox = (element)=>{
        let filterName = 'filter-'+element.dataset.filter;
        if(rowfilterCatalog[filterName]){
            let index = rowfilterCatalog[filterName].indexOf(element.name)
            if(index !== -1) {
                rowfilterCatalog[filterName].splice(index,1)
            }else{
                rowfilterCatalog[filterName] = rowfilterCatalog[filterName].concat(element.name)
            }
        }else {
            rowfilterCatalog[filterName] =  Array(element.name)
        }

    }

    let handleChange = (event) =>{
        //вызыввает функии изменяющие фильтр в зависимости от типа поля
        let element = event.target
        switch (element.type){
            case 'number':
                changePraice(element);
                break;
            case 'checkbox':
                changeCheckbox(element);
                break;
            case 'select-one':
                changeSorter(element);
                break;
        }
        setFilter(rowfilterCatalog);
        setStatusChangefilter(!statusChangefilter)
    }

    let handleSubmit = (event) =>{
        alert(JSON.stringify(filterCatalog)+JSON.stringify(rowfilterCatalog));
        event.preventDefault()
    }

    let hendClear = (staty)=>{
        //staty->booling
        setClear(staty)
    }

    return <main className="catalog ">
        <div className="catalog_header container">
        <Sections head={head}>
        </Sections>
            <div className="catalog_catalog-menu catalog-menu sub-text">
                <div className="catalog-menu_left">
                    <div className="catalog-menu_amt cursor__pointer">Найдено {data.length} моделей</div>
                    <div onClick={clearFilter} className="div catalog-menu_clear-filter blou-text cursor__pointer">clear-fiter</div>
                </div>
                <div className="catalog-menu_order-sort cursor__pointer">
                        <select name="order"  onChange={handleChange}>
                            <option value="data" selected="selected">Новинки</option>
                            <option value="avgScore">Популярные</option>
                            <option value="reprice"> По увеличению цены</option>
                            <option value="price"> По уменьшению цены</option>
                        </select>
                </div>
            </div>
        </div>
        <div className="catalog_body">
            <div className="catalog_filter sub-text">
                <form   className="filter" name = 'filter'>
                    <div className="filter_praise">
                        <label className="filter_max-min__min filter_max-min"><p>Цена от</p>
                            <input onChange={handleChange} type="number" name="min-praise" placeholder={0}/>
                        </label>
                        <label className="filter_max-min filter_max-min__max" placeholder={'25 00'}><p>Цена до</p>
                            <input onChange={handleChange} type="number" name="max-praise"/>
                        </label>
                    </div>
                    { showFiltr &&  <FilterElements clearStatis={[clear,hendClear]}  handleChange ={handleChange} urlParams={{catalogId,startFilter}}/>}
                    <input type="submit" onClick={handleSubmit}/>
                </form>
            </div>
            <div className="catalog_products">
                {data.length>0 && data.map(v=><Product_item data={v}/>)}
            </div>
        </div>

    </main>
}












