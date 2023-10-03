
import React, { useRef} from "react";


export default function FilterElements({haveSubmit,filterField} ) {
    /* props=>{
         haveSubmit:function ,
         filterField:[]
     }
     отображает фильтр завидущий от каталога
     */

    let ref = useRef()


    return<section className="catalog__filter">
        <form onSubmit={haveSubmit} ref={ref}  id="filter-catalog" className="filter"  >
            <div className="filter__price">
                <label className="filter__min-price">
                    <input type="number" name="price__gte" min={0}  />
                        <p className="filter__currency">₽</p>
                </label>
                <label className="filter__max-price">
                    <input type="number"  name="price__lte" min={0}/>
                        <p className="filter__currency" >₽</p>
                </label>
            </div>
            {filterField?.length > 0 && filterField.map(value => {
                return  <div key={value.id} className="filter__field">
                    <h5>{value.name}</h5>
                    {value?.choices  && value.choices.map(choice=>{
                        return <React.Fragment key = {choice.id}>
                            <input type="checkbox" name={value.name} value={choice.value} id={`input${value.id}${choice.id}`}/>
                            <label htmlFor={`input${value.id}${choice.id}`}>{choice.value}</label>
                        </React.Fragment>
                    })  }

                </div>
            })}
            <button className={'blow-button'} type="submit"  >
                запрос данных
            </button>
        </form>

    </section>
}

