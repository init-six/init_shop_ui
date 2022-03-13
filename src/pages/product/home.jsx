import React,{useEffect,useState} from 'react'
import {Form,Card,Select,Input,Button,Icon,Table,Drawer,Space,PageHeader,Descriptions} from 'antd'
import {PlusOutlined,SearchOutlined,EditOutlined} from '@ant-design/icons';
import {reqSpus} from '../../api'
import LinkButton from '../../components/link-button'
import moment from 'moment';
import {Link} from 'react-router-dom';
import SpuEditForm from './spu-edit-form'
import {reqAddSpu,reqUpdateSpu} from './../../api'

const Option=Select.Option
const dateFormat='YYYY-MM-DD h:mm:ss a';

export default function ProductHome(){
    const [columns,setColumns]=useState([]);
    const [spus,setSpus]=useState([]);
    const [searchName,setSearchName]=useState("");
    const [searchType,setSearchType]=useState("searchbyname");
    const [spuEditVisible,setSpuEditVisible]=useState(false);
    const [editSpuUUID,setEditSpuUUID]=useState("");
    const [form]=Form.useForm()

    const getSpus=async()=>{
        var searchTypeValue="",searchNameValue=""
        if (searchName){
            searchTypeValue=searchType
            searchNameValue=searchName
        }
        const result=await reqSpus(searchTypeValue,searchNameValue)
        result.data.forEach(item=>{
            let navlist=[]
            let first=item['firstCategory']
            let sec=item['secCategory']
            let trd=item['thirdCategory']
            if (first!=null){
                navlist.push(first)
            }
            if (sec!=null){
                navlist.push(sec)
            }
            if (trd!=null){
                navlist.push(trd)
            }
            item['description']=item.spuDetail.description
            item['sku_nums']=item.skus.length
            item['category']=navlist.join(' / ')
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
                    <Link to={`detail/${uuid}`}><LinkButton>{uuid}</LinkButton></Link>
                )
            }
          },
          {
            title: 'Category',
            dataIndex: 'category',
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
          {
            title: 'Action',
            dataIndex: 'uuid',
            key: 'action',
            width:80,
            render:(uuid)=>(
                <Button type='primary' icon={<EditOutlined/>} onClick={()=>handleSpuEdit(uuid)}>
                    Edit
                </Button>
            )
          },
        ];
        setColumns(columns)
    }

    const handleSpuEdit=(uuid)=>{
        setEditSpuUUID(uuid)
        setSpuEditVisible(true)
    }

    const title=(
        <PageHeader
          ghost={false}
          title="SPU"
          subTitle="Product Management"
          extra={[
            <Button key='1' type='primary' icon={<PlusOutlined/>} onClick={()=>setSpuEditVisible(true)}>
                Create SPU
            </Button>
          ]}
        >
          <Descriptions size="small" column={3}>
            <Descriptions.Item>
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
                    icon={<SearchOutlined />}
                >Search</Button>
            </Descriptions.Item>
          </Descriptions>
        </PageHeader>

    )

    const requestSpu=async()=>{
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
            if (editSpuUUID==""){
                reqAddSpu(values)
            }else{
                //update spu here
                console.log("update:",values)
            }
            setSpuEditVisible(false)
            setEditSpuUUID("")
            getSpus()
        }catch(e){
            console.log(e)
        }
    }

    const handleResetDrawer=()=>{
        setEditSpuUUID("")
        setSpuEditVisible(false)
    }

    return(
        <Card title={title}>
            <Table 
                rowKey='uuid'
                bordered
                dataSource={spus}
                columns={columns}
            />
            <Drawer
              title={editSpuUUID==""?"Create Spu":"Edit Spu"}
              width={720}
              onClose={handleResetDrawer}
              visible={spuEditVisible}
              bodyStyle={{ paddingBottom: 80 }}
              extra={
                <Space>
                  <Button onClick={handleResetDrawer}>Cancel</Button>
                  <Button onClick={requestSpu} type="primary">
                    Submit
                  </Button>
                </Space>
              }
            >
                <SpuEditForm uuid={editSpuUUID} form={form}/>
           </Drawer>
        </Card>
    )
}
