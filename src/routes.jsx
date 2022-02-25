import {useRoutes} from 'react-router-dom';
import React from 'react'
import Login from './pages/login/login'
import Admin from './pages/admin/admin'
import Home from './pages/home/home'
import Category from './pages/category/category'
import Bar from './pages/chart/bar'
import Line from './pages/chart/line'
import Pie from './pages/chart/pie'
import Order from './pages/order/order'
import Product from './pages/product/product'
import User from './pages/user/user'

export default function Router(){
    let element=useRoutes([
      {path:'login',element:<Login/>},
      {
        path:'admin',
        element:<Admin/>,
        children:[
          {path:'home',element:<Home/>},
          {path:'category',element:<Category />},
          {path:'bar',element:<Bar/>},
          {path:'line',element:<Line/>},
          {path:'pie',element:<Pie/>},
          {path:'order',element:<Order/>},
          {path:'product',element:<Product/>},
          {path:'user',element:<User/>},
        ]
      },
      //redirect {path:"home",redirectTo:'/'} 
      //if not found go to home page for now
      {path:'*',element:<Admin />}
    ]);
    return element
}
