import React,{Component,useEffect,useState} from 'react'
import {Tag,Form,Space,Drawer,PageHeader,Card,List,Button,Table,Image} from 'antd'
import {Link,useLocation,useParams,useNavigate} from 'react-router-dom';
import {ArrowLeftOutlined,PlusOutlined,EditOutlined} from '@ant-design/icons';
import {reqReadSpu} from '../../api'
import moment from 'moment';
import LinkButton from '../../components/link-button'
import SkuEditForm from '../../components/edit-sku/sku-edit-form.jsx'
import {reqAddSku,reqUpdateSku} from '../../api'
import {multiplyMoney,divideMoney} from '../../utils/parse-money'
import {FullTimeFormat1} from '../../utils/date-format'

const Item=List.Item

export default function ProductDetail(props){
    const [form]=Form.useForm()
    const navigate=useNavigate();
    const [columns,setColumns]=useState([])
    const [skus,setSkus]=useState([])
    const [editSkuUUID,setEditSkuUUID]=useState("");
    const [skuEditVisible,setSkuEditVisible]=useState(false);
    const [spuName,setSpuName]=useState("")
    const {spuUUID}=useParams()
    const [spuSpecTemplate,setSpuSpecTemplate]=useState({})
    const readSku=async()=>{
        const result =await reqReadSpu(spuUUID)
        var spec={}
        let temp=JSON.parse(result.data.spuDetail.specTemplate)
        temp.forEach(item=>{
            spec[item['key']]=item['values']
        })
        setSpuSpecTemplate(spec)
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
                      {divideMoney(price)}
                  </span>
                )
            }
          },
          {
            title: 'Stock',
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
                      {moment(date).format(FullTimeFormat1)}
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
                      {moment(date).format(FullTimeFormat1)}
                  </span>
                )
        }
      },
          {
            title: 'Enable',
            dataIndex: 'enable',
            width:60,
            render:(status)=>{
                return(
                  <>
                      {
                        <Tag color={status==1?"green":"volcano"} >{status==1?"ON":"OFF"}</Tag>
                      }
                  </>
                )
            }
          },
          {
            title: 'Action',
            dataIndex: 'uuid',
            key: 'action',
            width:80,
            render:(uuid)=>(
                <Button type='primary' onClick={()=>handleSkuEdit(uuid)} icon={<EditOutlined/>}>
                    Edit
                </Button>
            )
          },
        ];
        setColumns(columns)
    }

    const handleSkuEdit=(uuid)=>{
        setEditSkuUUID(uuid)
        setSkuEditVisible(true)
    }

    const title=(
            <PageHeader
                className="site-page-header"
                onBack={() => navigate(-1)}
                title={spuName}
                subTitle="SPU NAME"
                extra={[
                    <Button key="1" type='primary' icon={<PlusOutlined/>} onClick={()=>setSkuEditVisible(true)}>
                        Create SKU
                    </Button>
                ]}
              />
    )

    const handleResetDrawer=()=>{
        setEditSkuUUID("")
        setSkuEditVisible(false)
    }

    const requestSku=async()=>{
        try{
            const values=await form.validateFields()
            let indexes=[]
            let own_spec={}
            for (var key in values['spec']){
                indexes.push(values['spec'][key])
                own_spec[key]=spuSpecTemplate[key][values['spec'][key]]
            }
            values["indexes"]=indexes.join("_")
            values["ownspec"]=JSON.stringify(own_spec)
            values["stock"]={"stockNum":values["stocknum"]}
            values["enable"]=values["enable"]==true?1:0
            //price multiply 100
            values["price"]=multiplyMoney(values["price"])
            values["stock"]={"stockNum":values["stocknum"]}
            //delete upload images for now
            delete values["stocknum"]
            if (editSkuUUID==""){
                reqAddSku(spuUUID,values)
            }else{
                reqUpdateSku(spuUUID,editSkuUUID,values)
            }
            setEditSkuUUID("")
            setSkuEditVisible(false)
            readSku()
        }catch(e){
            console.log(e)
        }
    }

    return(
        <Card title={title} className='product-detail'>
            <Table 
                rowKey='uuid'
                bordered
                dataSource={skus}
                columns={columns}
            />
            <Drawer
              title={editSkuUUID==""?"Create SKU":"Edit SKU"}
              width={720}
              onClose={handleResetDrawer}
              visible={skuEditVisible}
              bodyStyle={{ paddingBottom: 80 }}
              extra={
                <Space>
                  <Button onClick={handleResetDrawer}>Cancel</Button>
                  <Button onClick={requestSku} type="primary">
                    Submit
                  </Button>
                </Space>
              }
            >
                <SkuEditForm uuid={editSkuUUID} spuUUID={spuUUID} form={form}/>
           </Drawer>
        </Card>
    )
}
