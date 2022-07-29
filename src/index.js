import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link, BrowserRouter, Routes,
} from 'react-router-dom';

import ReactDOM from 'react-dom/client';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import Sections from "./components/main/sections";
import Manufactore from "./components/main/manufactore";
import News from "./components/main/news";
import Home from "./src/home";
import News_article from "./components/main/News_article";
import {Layout} from "./components/layout/layout";
import Catalog_ptoducts from "./src/catalog_ptoducts";
import SectionsCatalig from "./components/main/SectionsCatalig";


const IMAGE_INLINE_SIZE_LIMIT = 0
export const CLASS_IMG = 'rubber-img'

const MAIN_REQUEST_SERFER = 'http://127.0.0.1:8000'
function sendPequest(url,method, body= null){
    const headers = {
        'Content-Type':"application/json"
    }
    return fetch(url,
        {
            method:method,
            body:JSON.stringify(body),
            headers:headers
        }).then(response=>{
        //обработка ошибок
        if(response.ok){
            return response.json()
        }else {
            //можно реализовать свою логику
            return response.json().then(errors=>{console.error(errors)})
        }
    })
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path ={'/'} element={<Layout/>}>
                  <Route index element={<Home/>}/>
                  <Route path ={'manufactores'} element={ <Sections head={'Производители'} >
                      <Manufactore/>
                  </Sections>}/>
                  <Route path ={'news'} element={ <Sections >
                                                      <News/>
                                                  </Sections>}>
                  </Route>
                  <Route path={'news/:id'} element={<News_article/>}/>
                  <Route path = {'catalog/'} element={<Sections head = {'Медицинское оборудование'} >
                                               <SectionsCatalig  head = {'Медицинское оборудование'}/>
                                                     </Sections>}/>
                  <Route path ={'catalog/:catalogId'} element={ <><Catalog_ptoducts/> </>} />
                  <Route path ={'catalog/:catalogId/:start-filter'} element={ <><Catalog_ptoducts/> </>} />
                  <Route path ={'*'} element={<Sections > </Sections>}/>
              </Route>

          </Routes>

    </BrowserRouter>
  </React.StrictMode>

);

reportWebVitals();

export default sendPequest
export {MAIN_REQUEST_SERFER}