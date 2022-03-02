import React,{useEffect,useState,useRef} from 'react'
import { Modal,Space } from 'antd';
import './index.less'
import memoryUtils from '../../utils/memoryUtils'
import {formateDate} from '../../utils/dateUtils'
import {useLocation,useNavigate} from 'react-router-dom';
import menuList from '../../config/menuConfig'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {removeAccessUser,removeAccessToken} from '../../utils/storage';
import LinkButton from '../../components/link-button'

export default function Header(){
    const [currentTime,setCurrentTime]=useState(formateDate(Date.now()))
    const getTitle=()=>{
        const path=useLocation().pathname
        let title
        menuList.forEach(item=>{
            if (item.path==path){
                title=item.title
            }else if (item.children){
                const cItem=item.children.find(cItem=>cItem.path==path)
                if (cItem){
                    title=cItem.title
                }
            }
        })
        return title
    }

    const history = useNavigate();
    const confirm=()=>{
        Modal.confirm({
          title: 'Confirm',
          icon: <ExclamationCircleOutlined />,
          content: 'Do you want to sign out?',
          okText: 'confirm',
          cancelText: 'cancel',
          onOk:()=>{
            removeAccessUser()
            removeAccessToken()
            history('/admin')
          }
        });
    }

    return(
        <div className="header">
            <div className="header-top">
                <span>Welcome, {memoryUtils.user.username}</span>
                <LinkButton onClick={confirm}>Logout</LinkButton>
            </div>
            <div className="header-bottom">
                <div className="header-bottom-left">{getTitle()}</div>
                <div className="header-bottom-right">
                    <span>{currentTime}</span>
                </div>
            </div>
        </div>
    )
}
