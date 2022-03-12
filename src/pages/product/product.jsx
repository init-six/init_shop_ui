import React,{Component} from 'react'
import {Outlet} from 'react-router-dom'
import './product.less'

export default class Product extends Component{
    render(){
        return(
            <Outlet />
        )
    }

}
