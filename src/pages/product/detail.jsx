import React,{Component,useEffect,useState} from 'react'
import {PageHeader,Card,List,Button,Table,Image} from 'antd'
import {Link,useLocation,useParams,useNavigate} from 'react-router-dom';
import {ArrowLeftOutlined,PlusOutlined,EditOutlined} from '@ant-design/icons';
import {reqReadSpu} from '../../api'
import moment from 'moment';
import LinkButton from '../../components/link-button'

const Item=List.Item
const dateFormat='YYYY-MM-DD h:mm:ss a';

export default function ProductDetail(props){
    const navigate=useNavigate();
    const [columns,setColumns]=useState([])
    const [skus,setSkus]=useState([])
    const [spuName,setSpuName]=useState("")
    const {uuid}=useParams()
    const readSku=async()=>{
        const result =await reqReadSpu(uuid)
        result.data.skus.forEach(item=>{
            item['stockqty']=item['stock']['stockNum']
        })
        setSkus(result.data.skus)
        setSpuName(result.data.name)
    }
    useEffect(()=>{
        initColumns()
        readSku()
    },[])

    const initColumns=()=>{
        const columns = [
          {
            title: 'SKU ID',
            dataIndex: 'uuid',
            width:330,
            render:(uuid)=>{
                return(
                    <span>{uuid}</span>
                )
            }
          },
          {
            title: 'Name',
            dataIndex: 'name',
            width:200,
          },
          {
            title: 'Price $',
            dataIndex: 'price',
            width:100,
            render:(price)=>{
                return(
                  <span>
                      {price}
                  </span>
                )
            }
          },
          {
            title: 'Stock Qty',
            dataIndex: 'stockqty',
            width:100,
          },
          {
            title: 'Image',
            dataIndex: 'image',
            render:(images)=>{
                return(
                    <Image.PreviewGroup>
                      <Image width={40} src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
                      <Image
                        width={40}
                        src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
                      />
                    </Image.PreviewGroup>
                )
            }
          },
          {
            title: 'Spec',
            dataIndex: 'ownSpec',
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
            title: 'IsValid',
            dataIndex: 'enable',
            width:100,
            render:(status)=>{
                return(
                  <span>
                      <span>{status==1?"true":"false"}</span>
                  </span>
                )
            }
          },
          {
            title: 'Action',
            dataIndex: 'uuid',
            key: 'action',
              width:80,
            render:(value)=>(
                <Button type='primary' icon={<EditOutlined/>}>
                    Edit
                </Button>
            )
          },
        ];
        setColumns(columns)
    }

    const title=(
            <PageHeader
                className="site-page-header"
                onBack={() => navigate(-1)}
                title={spuName}
                subTitle="SPU NAME"
                extra={[
                    <Button key="1" type='primary' icon={<PlusOutlined/>} onClick={()=>setSpuEditVisible(true)}>
                        Create SKU
                    </Button>

                ]}
              />
    )

    return(
        <Card title={title} className='product-detail'>
            <Table 
                rowKey='uuid'
                bordered
                dataSource={skus}
                columns={columns}
            />
        </Card>
    )
}
