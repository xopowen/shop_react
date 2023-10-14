import React, {useEffect, useMemo, useState} from "react";

import {useLocation, useNavigate, useParams} from "react-router-dom";

import ProductCard from "../components/main/product-slider/ProductCard";

import FilterElements from "../components/main/catalog-products/FilterElements";
import ajaxFetch from "../components/helpFunction/ajaxFetch";


/**
 *
 * @return {JSX.Element}
 * @constructor
 * @description загружает товары из каталога с возможностью фильтрации.
 * @description эелмент охватывает urls ->[{'manufactures/:name'},{'catalogs/:name'}]
 * @description компонент получает url параметр catalog
 * @url - useLocation().pathname + filter - для получения товаров
 * @url - `/filter/${name}/` - для получение данный для фильтра
 */
export default function CatalogProducts() {

    let {name} = useParams()
    let navigaite = useNavigate()

    let {pathname, search} = useLocation()
    let [dataProducts, setData] = useState()
    let startFilter = useMemo(() => {
        /**
         * начальный фильтр берётся из useLocation().search
         */
        return search.slice(1).split('&').map(filter => filter.split('='))
    }, [search])
    let [filterParams, setFilterParams] = useState([])
    const [choices, setChoices] = useState()

    useEffect(() => {
        let sumFilter = search ? startFilter.concat(filterParams) : filterParams
        let filter = sumFilter.length > 0 ? "?" : ""

        for (let filterItem of sumFilter) {
            filter = `${filter}&${filterItem[0]}=${filterItem[1]}`
        }

        ajaxFetch({
            url: pathname + "/" + filter,
            method: 'GET',
        }).then(response => {
            let [ok] = response
            if (ok) {
                ok.then(res => setData(res))
            }
        })
    }, [name, filterParams, pathname, search, startFilter])

    useEffect(() => {
        ajaxFetch({
            url: `/filter/${name}/`,
            method: 'GET',
        }).then(response => {
            let [ok] = response
            if (ok) {
                ok.then(res => setChoices(res))
            }
        })
    }, [name])

    function haveSubmit(e) {
        setFilterParams([...new FormData(e.target).entries()])
        e.preventDefault()
    }

    function havePaginationNext(e) {
        if (!dataProducts?.next) {
            return
        }
        let filter = new URL(dataProducts.next).search

        ajaxFetch({
            url: pathname + filter,
            method: 'GET',
        }).then(response => {
            let [ok] = response
            if (ok) {
                ok.then(res => {
                    res.results = dataProducts.results.concat(res.results)
                    setData(res)
                })
            }
        })
    e.preventDefault()
    }

    function clearFilter(e) {
        //очищает фильтр
        if (filterParams.length > 0) {
            navigaite(0)
        }
        e.preventDefault()
    }

    return <>
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
                            Найдено {dataProducts?.count ? dataProducts.count : 0} моделей
                        </p>
                        <button onClick={clearFilter} className="catalog-menu__clear-filter blow-text">
                            Сбросить фильтр
                        </button>
                    </div>

                    <label className="catalog-menu__order-sort">
                        <select name="order" form="filter-catalog">
                            <option value="date">Новинки</option>
                            <option value="-feedback">Популярные</option>
                            <option value="price">По увеличению цены</option>
                            <option value="-price">По уменьшению цены</option>
                        </select>
                    </label>
                </div>
                <FilterElements filterField={choices} haveSubmit={haveSubmit}/>
                <div className="catalog__products">
                    {dataProducts && dataProducts.results.map(v => {
                        v.catalog = {
                            'id': v.catalog,
                            'name': name
                        };
                        return <ProductCard key={v.id} data={v}/>
                    })}
                </div>
            </div>
            <div className="catalog__footer">
                {dataProducts?.next &&
                    <button onClick={havePaginationNext} className="white-button">показать еще</button>}
            </div>
        </section>
    </>
}












