import React from 'react';
import {
    Route,
    BrowserRouter, Routes,
} from 'react-router-dom';

import ReactDOM from 'react-dom/client';
import './index.scss';
import reportWebVitals from './reportWebVitals';

import News from "./components/main/news/News";
import Home from "./src/home";

import {Layout} from "./components/layout/layout";


import Manufacture from "./components/main/manufacture/Manufacture";
import Catalogs from "./components/main/catalogs/Catalogs";
import NewsArticle from "./components/main/news/NewsArticle";
import Requisites from "./src/Requisites";
import Events from "./components/main/events/Events";
import Contacts from "./src/Contacts";
import Payments from "./src/Payments";
import Delivery from "./src/Delivery";
import FormOrderCallback from "./components/formComponents/forms/FormOrderCallback";
import CatalogProducts from "./src/CatalogPtoducts";
import ProductItemPage from "./src/ProductItemPage";
import Basket from "./src/Basket";
import SendOrder from "./src/SendOrder";
import Login from "./src/Login";
import PrivateRoute from "./my-route/PrivateRoute";
import Logout from "./src/Logout";
import Profile from "./src/Profile";
import Registration from "./src/Registration";
import Compare from "./src/Compare";
import CompareCatalog from "./src/CompareCatalog";
import UserOrders from "./components/main/profile/UserOrders";
import UserFeedBacks from "./components/main/profile/UserFeedBacks";
import Page404 from "./src/Page404";
import OrderSuccessfullyCompleted from "./src/OrderSuccessfullyCompleted";




const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path ={'/'} element={<Layout/>}>
                  <Route index element={<Home/>}/>
                  <Route path ={'news'} element={ <News head = {'Новости'} /> }/>
                  <Route path={'news/:id'} element={<NewsArticle/>}/>
                  <Route path ={'manufactures'} element={ <Manufacture head = {"Производители"}/> }/>
                  <Route path ={'manufactures/:name'} element={ <CatalogProducts/> }/>
                  <Route path = {'catalogs'} element={  < Catalogs  head = {'Медицинское оборудование'}/>}/>
                  <Route path ={'catalogs/:name'} element={ <CatalogProducts/> }/>
                  <Route path ={'catalogs/:catalogName/:productID'} element={<ProductItemPage/>}/>
                  <Route path = {'requisites'} element={  <Requisites head={'Реквизиты'}/>}/>
                  <Route path = {'about-company'} element={<Events head={'О компании'}/>}/>
                  <Route path = {'request-call-back-page'} element={<FormOrderCallback/>}/>
                  <Route path = {'contacts'} element={<Contacts head = {'Контакты'}/>}/>
                  <Route path = {'payment'} element={<Payments head = {'Оплата заказа'}/>}/>
                  <Route path = {'delivery'} element={<Delivery head = {'Доставка заказа'}/>}/>
                  <Route path = {'logout'} element={<Logout/>}/>
                  <Route path = {'login'} element={<Login/>}/>
                  <Route path = {'registration'} element={<Registration/>}/>

                  <Route path ={'set-order'} element={<PrivateRoute>
                         <SendOrder head={'Оформление заказа'}/>
                      </PrivateRoute>}/>

                  <Route path ={'basket'} element={<PrivateRoute>
                      <Basket head={'Бренды и заводы производители'}/>
                      </PrivateRoute>}/>
                  <Route path = {'personal-area'} element={<PrivateRoute>
                          <Profile head = {'Мой профиль'}/>
                      </PrivateRoute>}/>
                  <Route path = {'personal-area/orders'} element={<PrivateRoute>
                      <UserOrders head={'Заказы'}/>
                  </PrivateRoute>}/>
                  <Route path = {'personal-area/feedbacks'} element={<PrivateRoute>
                      <UserFeedBacks head={'Отзывы'}/>
                  </PrivateRoute>}/>

                  <Route path = {'comparisons'} element={<PrivateRoute>
                          <Compare head = {'Сравнение товаров'} />
                      </PrivateRoute>}/>
                  <Route path = {'comparisons/:catalogName'} element={<PrivateRoute>
                          <CompareCatalog/>
                      </PrivateRoute>}/>

                  <Route path = {'order-successfully-completed'} element={<OrderSuccessfullyCompleted/>}/>
                  <Route path ={'404'} element={<Page404/>}/>
                  <Route path ={'*'}    element={<Page404/>}/>
              </Route>

          </Routes>

    </BrowserRouter>
  </React.StrictMode>
    </React.StrictMode>
);

reportWebVitals();
