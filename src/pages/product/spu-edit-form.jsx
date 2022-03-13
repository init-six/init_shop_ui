import React, { useState,useEffect } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Space,
} from 'antd';
import {PlusOutlined,MinusCircleOutlined} from '@ant-design/icons';
import {
        reqCategories,
        reqSecCategories,
        reqThirdCategories,
        reqReadSpu
        } from '../../api'

const Item=Form.Item;

const Option=Select.Option;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
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

export default function SpuEditForm(props){
    const {uuid,form}=props
    const children = [];
    const [ct1,setCt1]=useState("")
    const [ct2,setCt2]=useState("")
    const [ct3,setCt3]=useState("")
    const [categories,setCategories]=useState([])
    const [secCategories,setSecCategories]=useState([])
    const [thirdCategories,setThirdCategories]=useState([])
    const getCategories=async()=>{
        let result=await reqCategories()
        var list=[]
        result.data.forEach(item=>{
            list.push(<Option key={item['uuid']}>{item['name']}</Option>);
        })
        setCategories(list)
    }
    const getSpu=async()=>{
        if (uuid!=""){
            console.log("edit/intialvalues")
            let result = await reqReadSpu(uuid)
            console.log(result.data)
        }
    }

    useEffect(()=>{
        getCategories()
        getSpu()
    },[uuid])
    const handleCategoryChange=async(key)=>{
        if (ct1!=key){
            form.resetFields(['ct2','ct3'])
            setSecCategories([])
            setThirdCategories([])
        }
        setCt1(key)
        let result=await reqSecCategories(key)
        var list=[]
        result.data.children.forEach(item=>{
            list.push(<Option key={item['uuid']}>{item['name']}</Option>);
        })
        setSecCategories(list)
    }
    const handleSecCategoryChange=async(key)=>{
        if (ct2!=key){
            form.resetFields(['ct3'])
            setThirdCategories([])
        }
        setCt2(key)
        let result=await reqThirdCategories(ct1,key)
        var list=[]
        result.data.children.forEach(item=>{
            list.push(<Option key={item['uuid']}>{item['name']}</Option>);
        })
        setThirdCategories(list)
    }
    return (
      <Form 
        {...formItemLayout}
        form={form} 
        name="editspu" 
        scrollToFirstError
        initialValues={{valid:true,saleable:true}}
      >
        <Item name="name" 
          label="SPU Name" 
          tooltip="SPU Name"
          rules={[{required:true,message:"Please input spu name",whitespace:true,}]}
        >
            <Input/>
        </Item>
        <Item
            name="ct1"
            label="First Category"
        >
            <Select onChange={handleCategoryChange} placeholder="select your first category">
                {categories}
            </Select>
        </Item>
        <Item
            name="ct2"
            label="Second Category"
        >
            <Select onChange={handleSecCategoryChange} placeholder="select your second category">
                {secCategories}
            </Select>
        </Item>
        <Item
            name="ct3"
            label="Third Category"
        >
            <Select placeholder="select your third category">
                {thirdCategories}
            </Select>
        </Item>
        <Item name="valid" tooltip="true:valid  false:deleted" label="Is Valid" valuePropName="checked">
            <Checkbox />
        </Item>
        <Item name="saleable" tooltip="true: onshore  false:offshore" label="Is Saleable" valuePropName="checked">
            <Checkbox />
        </Item>
        <Item
            name="description"
            label="Description"
            rules={[
              {
                message: 'please enter spu description',
              },
            ]}
        >
            <Input.TextArea rows={3} maxLength={300} showCount placeholder="please enter url description" />
        </Item>
        <Item
            name="productdetails"
            label="Product Details"
            rules={[
              {
                message: 'please enter spu product details',
              },
            ]}
        >
            <Input.TextArea rows={5} maxLength={1000} showCount placeholder="please enter url description" />
        </Item>
        <Item
            name="featureandbenefits"
            label="Feature & Benefits"
            rules={[
              {
                message: 'please enter feature & benefits',
              },
            ]}
        >
            <Input.TextArea rows={5} maxLength={3000} showCount placeholder="please enter url description" />
        </Item>
          <Form.List name="spectemplate">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} className="spu-select"align="baseline">
                  <Item
                    {...restField}
                    name={[name, 'key']}
                    rules={[{ required: true, message: 'Missing Spec Key Words' }]}
                    className="select-key"
                  >
                      <Input placeholder="Spec Key" />
                  </Item>
                  <Item
                    {...restField}
                    name={[name, 'values']}
                    rules={[{ required: true, message: 'Missing Spec Values' }]}
                    className="select-value"
                  >
                      <Select mode="tags" placeholder="Spec Values">
                          {children}
                      </Select>
                  </Item>
                  <MinusCircleOutlined onClick={() => remove(name)} className="select-minus"/>
                </Space>
              ))}
              <Item>
                <Button type="dashed" style={{marginLeft:140}} onClick={() => add()} block icon={<PlusOutlined />}>
                  Add Spec Values
                </Button>
              </Item>
            </>
          )}
        </Form.List>
      </Form>
    );
};
