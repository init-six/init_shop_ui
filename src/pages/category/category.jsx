import React,{useState,useEffect,useRef,useCallback} from 'react'
import {Card,Button,Table} from 'antd'
import { PlusOutlined} from '@ant-design/icons';
import LinkButton from './../../components/link-button'
import {reqCategories,reqSecCategories} from '../../api'

export default function Category(){
        const [categories,setCategories]=useState([])
        const [secCategories,setSecCategories]=useState([])
        const [isloading,setloading]=useState(false)
        const [navCategory,setNavCategory]=useState([])
        const [parentId,setParentId]=useState(0)


        const getCategories = async()=>{
            console.log('na:',navCategory)
            console.log(parentId)
            //setloading(true)
            if (navCategory.length==0){
                const result=await reqCategories()
                result.data.forEach(item=>{
                    item['key']=item['uuid']
                    delete item['children']
                })
                setCategories(result.data)
            }else if (navCategory.length==1){
                const result=await reqSecCategories(parentId)
                result.data.children.forEach(item=>{
                    item['key']=item['uuid']
                    delete item['children']
                })
                setSecCategories(result.data.children)
            }else{
                console.log("third")
            }
            //setloading(false)
        };
        
        useEffect(()=>{
            getCategories()
        },[])
        
        const title='categories'
        const extra=(
        <Button icon={<PlusOutlined />} type='primary'>
            Add
        </Button>
        )

        const showQueryCategories=(category)=>{
            setParentId(category.uuid)
            var newNav=[]
            newNav=[...navCategory]
            newNav.push(category.name)
            setNavCategory(newNav)
        }

        useEffect(()=>{
            getCategories()
        },[parentId,navCategory])

        const columns = [
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'Action',
            dataIndex: '',
            width:'30%',
            key: 'action',
            render:(category)=>(
                <span>
                    <LinkButton>Update</LinkButton>
                    <LinkButton onClick={()=>showQueryCategories(category)}>View</LinkButton>
                </span>
            )
          },
        ];
        return(
            <Card title={title} extra={extra}>
                <Table 
                bordered
                loading={isloading}
                dataSource={parentId=='0'?categories:secCategories} 
                columns={columns} 
                pagination={{defaultCurrent:1,showQuickJumper:true,defaultPageSize:10}}
                />
            </Card>
        )
}
