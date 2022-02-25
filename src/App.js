import React,{Component} from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Router from './routes'

export default class App extends Component{
  render(){
    return(
      <BrowserRouter>
        <Router/>
      </BrowserRouter>
    ) 
  }
}
