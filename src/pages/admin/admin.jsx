import React,{Component} from 'react'
import {Outlet} from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
import {Navigate} from 'react-router-dom'
import {getAccessToken} from '../../utils/storage'
import {Layout} from 'antd'
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'

const { Footer, Sider, Content } = Layout;

export default class Admin extends Component{
    render(){
        const user=memoryUtils.user
        if (!getAccessToken()){
            return <Navigate to='/login'/>;
        }
        return(
            <Layout style={{height:'100%',minHeight: '100vh'}}>
              <LeftNav/>
              <Layout>
                <Header/>
                <Content style={{backgroundColor:'#fff'}}>
                    <Outlet />
                </Content>
                <Footer style={{textAlign:'center',color:'#aaa'}}>©2022 init shop. All Rights Reserved.</Footer>
              </Layout>
            </Layout>
        );
    }
}
