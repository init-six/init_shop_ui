import React,{Component} from 'react'
import {Switch,Router,BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from './pages/login/login'
import Admin from './pages/admin/admin'

export default class App extends Component{
  render(){
    return(
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/admin' element={<Admin/>}/>
        </Routes>
      </BrowserRouter>
    ) 
  }
}
