import React,{useEffect,useState} from 'react';
import {Radio,Upload,Modal,Divider,Space,InputNumber,Form,Input,Checkbox} from 'antd';
import {PlusOutlined,MinusCircleOutlined} from '@ant-design/icons';
import {reqReadSku,reqReadSpu} from '../../api'
import GetBase64 from '../../utils/get-base-64'
import {divideMoney} from '../../utils/parse-money'

const Item=Form.Item;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 19,
    },
    sm: {
      span: 5,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 18,
    },
  },
};

export default function SkuEditForm(props){
    const {spuUUID,uuid,form}=props
    const [previewVisible,setPreviewVisible]=useState(false)
    const [previewImage,setPreviewImage]=useState('')
    const [previewTitle,setPreviewTitle]=useState('')
    const [specTemplate,setSpecTemplate]=useState([])
    const [fileList, setFileList]=useState([])
    const InitFileList =()=>{
        let initList= [
              {
                uid: '-1',
                title: 'image.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
              },
              {
                uid: '-2',
                title: 'image.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
              },
              {
                uid: '-3',
                title: 'image.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
              },
              {
                uid: '-4',
                title: 'image.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
              },
              {
                uid: '-xxx',
                percent: 50,
                title: 'image.png',
                status: 'uploading',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
              },
              {
                uid: '-10',
                title: 'image.png',
                status: 'error',
              },
        ]
        setFileList(initList)
    }

    const getSku=async()=>{
        let spuRes=await reqReadSpu(spuUUID)
        let spec=JSON.parse(spuRes.data['spuDetail']['specTemplate'])
        let elements=[]
        spec.forEach((item,index)=>{
            let list=[]
            item['values'].forEach((v,index)=>{
                list.push(<Radio.Button key={v} value={index}>{v}</Radio.Button>)
            })
            elements.push(
                <Item 
                    name={['spec',item['key']]} key={index} label={item['key']}
                    rules={[{required:true,message:"Please select one"}]}
                >
                    <Radio.Group buttonStyle="solid">
                        {list}
                    </Radio.Group>
                </Item>
            )
        })
        setSpecTemplate(elements)
        if (uuid!=""&&spuUUID!=""){
            let result = await reqReadSku(spuUUID,uuid)
            let ownspec=JSON.parse(result.data['ownSpec'])
            let indexes=result.data['indexes'].split("_")
            let spec={}
            let start=0
            for (var key in ownspec){
                spec[key]=parseInt(indexes[start])
                start++
            }
            form.setFieldsValue(
            {
                name:result.data['name'],
                enable:result.data['enable']==1?true:false,
                price:divideMoney(result.data['price']),
                stocknum:result.data['stock']['stockNum'],
                spec:spec,
            })
        }
    }
    useEffect(()=>{
        InitFileList()
        getSku()
    },[uuid])

    const priceFilterNoNum = value => {
        let reg = /^(-)*(\d+)\.(\d\d).*$/
        return value.replace(/[^\.\d]/g, '').replace(reg, '$1$2.$3')
    }

    const limitDecimalPoint = value => {
        let reg = /^(-)*(\d+)\.(\d\d).*$/
        return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '').replace(reg, '$1$2.$3')
    }

    const limitDecimals=value=>{
        return value.replace(/^(0+)|[^\d]+/g,'')
    }

    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

    const handlePreview = async(file)=> {
        if (!file.url && !file.preview) {
          file.preview = await GetBase64(file.originFileObj);
        }
        setPreviewImage(file.url||file.preview)
        setPreviewVisible(true)
        setPreviewTitle(file.title|| file.url.substring(file.url.lastIndexOf('/') + 1))
    }

    const handleCancel = () => {
        setPreviewVisible(false)
    }

    const handleChange = (data) => {
        console.log(data)
        setFileList(data.fileList)
    }

    return (
    <>
      <Form 
        {...formItemLayout}
        form={form} 
        name="editsku" 
        scrollToFirstError
        initialValues={{enable:true,price:0.00,stocknum:0}}
      >
        <Item name="name" 
          label="SKU Name" 
          tooltip="SKU Name"
          rules={[{required:true,message:"Please input sku name",whitespace:true,}]}
        >
            <Input/>
        </Item>
        <Item name="enable" tooltip="Offline Or Online" label="Enable" valuePropName="checked">
            <Checkbox />
        </Item>
        <Item label="Specification">
        {specTemplate}
        </Item>
        <Item name="price" 
                tooltip="only allow two decimal" label="Price">
                <InputNumber
                    style={{ width: 150 }}
                    formatter={limitDecimalPoint}
                    parser={priceFilterNoNum}
                    precision={2}
                    prefix="$"
                />
            </Item>
        <Item name="stocknum" 
            tooltip="only allow integer" label="Stock">
            <InputNumber
                style={{ width: 150 }}
                formatter={limitDecimals}
                parser={limitDecimals}
            />
        </Item>
        <Item name="images" label="Images">
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onChange={handleChange}
              onPreview={handlePreview}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
        </Item>
      </Form>
      <Modal
          visible={previewVisible}
          title={previewTitle}
          onCancel={handleCancel}
          footer={null}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
    );
}
