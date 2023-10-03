import React, {useEffect, useState} from "react";

import {useParams, useLocation, useNavigate} from "react-router-dom";

import ProductCard from "../components/main/product-slider/ProductCard";

import FilterElements from "../components/main/catalog-products/FilterElements";
import ajaxFetch from "../components/helpFunction/ajaxFetch";
import {useMemo} from "react";


export default function CatalogProducts() {
    //загружает товары из каталога с возможностью фильтрации
    //компонент получает url параметр catalog


    let {name} = useParams()
    let navigaite = useNavigate()

    let {pathname,state,search} = useLocation()
    let [dataProducts, setData] = useState()
    let startFilter = useMemo(()=>{
        return search.slice(1).split('&').map(filter=>filter.split('='))
    },[search])
    let [filterParams,setFilterParams] = useState( [])
    const [choices, setChoices] = useState()

    useEffect(() => {
        let sumFilter =search ?  startFilter.concat(filterParams):filterParams
        let filter = sumFilter.length > 0 ? "?":""

        for (let filterItem of sumFilter) {
            filter = `${filter}&${filterItem[0]}=${filterItem[1]}`
        }

        ajaxFetch( {
            url: pathname+"/"+filter,
            method:'GET',
        }).then(response => {
            let [ok] = response
            if(ok){
                ok.then(res=> setData(res))
            }
        })
    }, [name, filterParams, pathname,search])

    useEffect(() => {
        ajaxFetch({
            url:`/filter/${name}/`,
            method:'GET',
        }).then(response => {
            let [ok,error] = response
            if (ok){
                ok.then(res=>setChoices(res))
            }
        })
    }, [name])

    function haveSubmit(e){
        setFilterParams([...new FormData(e.target).entries()])
        e.preventDefault()
    }

    function havePaginationNext(e){
        if(!dataProducts?.next){
            return
        }
        let filter = new URL(dataProducts.next).search

        ajaxFetch( {
            url: pathname+filter,
            method:'GET',
        }).then(response => {
            let [ok,error] = response
            if(ok){
                ok.then(res=> {
                    let results =  dataProducts.results.concat(res.results)
                    res.results = results
                    setData(res)
                })
            }
        })

    }

    function clearFilter(e){
        //очищает фильтр
        if(filterParams.length > 0){
            navigaite(0)
        }

    }

     return<>
    <section className="sections sections_head-left catalog">
        <div className="sections__header">
            <h2 className="sections__head">
                {name}
            </h2>
        </div>
        <div className="sections__body catalog__body">
            <div className="catalog__catalog-menu catalog-menu">
                <div className="catalog-menu__left">
                    <p className="catalog-menu__amt">
                        Найдено  {dataProducts?.count ? dataProducts.count: 0} моделей
                    </p>
                    <button onClick={clearFilter} className="catalog-menu__clear-filter blow-text">
                        Сбросить фильтр
                    </button>
                </div>

                <label className="catalog-menu__order-sort">
                    <select name="order" form="filter-catalog">
                        <option value="date">Новинки </option>
                        <option value="-feedback">Популярные</option>
                        <option value="price">По увеличению цены</option>
                        <option value="-price">По уменьшению цены</option>
                    </select>
                </label>
            </div>
            <FilterElements  filterField={choices} haveSubmit={haveSubmit}/>
            <div className="catalog__products">
                {dataProducts && dataProducts.results.map(v => {
                    v.catalog = {'id':v.catalog,
                        'name' : name};
                    return <ProductCard key={v.id} data={v}/>})}
            </div>
        </div>
        <div className="catalog__footer">
            {dataProducts?.next && <button onClick={havePaginationNext}  className="white-button">показать еще</button>}
        </div>
    </section>
     </>
}












