import React,{useEffect,useState} from 'react'
import {Form,Card,Select,Input,Button,Icon,Table,Drawer,Space} from 'antd'
import {PlusOutlined} from '@ant-design/icons';
import {reqSpus} from '../../api'
import LinkButton from '../../components/link-button'
import moment from 'moment';
import {Link} from 'react-router-dom';
import SpuEditForm from './spu-edit-form'
import {reqAddSpu} from './../../api'

const Option=Select.Option
const dateFormat='YYYY-MM-DD h:mm:ss a';

export default function ProductHome(){
    const [columns,setColumns]=useState([])
    const [spus,setSpus]=useState([])
    const [searchName,setSearchName]=useState("")
    const [searchType,setSearchType]=useState("searchbyname")
    const [spuEditVisible,setSpuEditVisible]=useState(false);
    const [form]=Form.useForm()

    const getSpus=async()=>{
        var searchTypeValue="",searchNameValue=""
        if (searchName){
            searchTypeValue=searchType
            searchNameValue=searchName
        }
        const result=await reqSpus(searchTypeValue,searchNameValue)
        result.data.forEach(item=>{
            item['description']=item.spuDetail.description
            item['sku_nums']=item.skus.length
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
            title: 'SPU ID',
            dataIndex: 'uuid',
            width:330,
            render:(uuid)=>{
                return(
                    <LinkButton>{uuid}</LinkButton>
                )
            }
          },
          {
            title: 'Category',
            dataIndex: 'name',
            width:250,
          },
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
            title: 'SKU Qty',
            dataIndex: 'sku_nums',
            width:90,
          },
          {
            title: 'Brand',
            dataIndex: 'description',
            width:200,
          },
          {
            title: 'Update Date',
            dataIndex: 'lastUpdateTime',
            width:200,
            render:(date)=>{
                return(
                  <span>
                      {moment(date).format(dateFormat)}
                  </span>
                )
            }
          },
          {
            title: 'Create Date',
            dataIndex: 'createTime',
            width:200,
            render:(date)=>{
                return(
                  <span>
                      {moment(date).format(dateFormat)}
                  </span>
                )
            }
          },
          {
            title: 'Status',
            dataIndex: 'saleable',
            width:100,
            render:(status)=>{
                return(
                  <span>
                      <span>{status==1?"on shore":"off shore"}</span>
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
        <Button type='primary' icon={<PlusOutlined/>} onClick={()=>setSpuEditVisible(true)}>
            Create Spu
        </Button>
    )

    const createSpu=async()=>{
        try{
            const values=await form.validateFields()
            values["saleable"]=values["saleable"]==true?1:0
            values["valid"]=values["valid"]==true?1:0
            values["spudetail"]={
                "productdetails":values["productdetails"],
                "featureandbenefits":values["featureandbenefits"],
                "description":values["description"],
                "spectemplate":JSON.stringify(values["spectemplate"])
            }
            delete values["productdetails"]
            delete values["featureandbenefits"]
            delete values["description"]
            delete values["spectemplate"]
            reqAddSpu(values)
            setSpuEditVisible(false)
            getSpus()
        }catch(e){}
    }

    return(
        <Card title={title} extra={extra}>
            <Table 
                rowKey='uuid'
                bordered
                dataSource={spus}
                columns={columns}
            />
            <Drawer
              title="Create Spu"
              width={720}
              onClose={()=>setSpuEditVisible(false)}
              visible={spuEditVisible}
              bodyStyle={{ paddingBottom: 80 }}
              extra={
                <Space>
                  <Button onClick={()=>setSpuEditVisible(false)}>Cancel</Button>
                  <Button onClick={createSpu} type="primary">
                    Submit
                  </Button>
                </Space>
              }
            >
                <SpuEditForm form={form}/>
           </Drawer>
        </Card>
    )
}
