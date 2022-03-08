import React,{useEffect,useState} from 'react'
import {Card,Select,Input,Button,Icon,Table} from 'antd'
import {PlusOutlined} from '@ant-design/icons';
import {reqSpus} from '../../api'
import LinkButton from '../../components/link-button'

const Option=Select.Option

export default function ProductHome(){
    const [columns,setColumns]=useState([])
    const [spus,setSpus]=useState([])
    const [searchName,setSearchName]=useState("")
    const [searchType,setSearchType]=useState("searchbyname")

    const getSpus=async()=>{
        var searchTypeValue="",searchNameValue=""
        if (searchName){
            searchTypeValue=searchType
            searchNameValue=searchName
        }
        const result=await reqSpus(searchTypeValue,searchNameValue)
        result.data.forEach(item=>{
            item['description']=item.spuDetail.description
        })
        setSpus(result.data)
    }

    useEffect(()=>{
        initColumns()
        getSpus()
    },[])

    const initColumns=()=>{
        const columns = [
          {
            title: 'Product Name',
            dataIndex: 'name',
            width:250,
          },
          {
            title: 'Description',
            dataIndex: 'description',
          },
          {
            title: 'Status',
            dataIndex: 'saleable',
            width:200,
            render:(status)=>{
                return(
                  <span>
                      <Button type='primary'>Off Shore</Button>
                      <span>On Shore</span>
                  </span>
                )
            }
          },
          {
            title: 'Action',
            dataIndex: '',
            width:200,
            render:(status)=>{
                return(
                  <span>
                      <LinkButton>Details</LinkButton>
                      <LinkButton>Edit</LinkButton>
                  </span>
                )
            }
          },
        ];
        setColumns(columns)
    }

    const title=(
        <span>
            <Select value={searchType} onChange={value=>setSearchType(value)}>
                <Option value='searchbyname'>Search By Name</Option>
                <Option value='searchbydes'>Search By Details</Option>
            </Select>
            <Input placeholder="keywords" 
                style={{width:150,margin:'0 10px'}} 
                value={searchName}
                onChange={event=>setSearchName(event.target.value)}
            />
            <Button 
                type='primary'
                onClick={()=>getSpus()}
            >Search</Button>
        </span>
    )

    const extra=(
        <Button type='primary' icon={<PlusOutlined/>}>
            Add Product
        </Button>
    )

    return(
        <Card title={title} extra={extra}>
            <Table 
                rowKey='uuid'
                bordered
                dataSource={spus}
                columns={columns}
            />
        </Card>
    )
}
