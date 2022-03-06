import React,{useState,useEffect,useRef,useCallback} from 'react'
import {Form,Modal,Card,Button,Table} from 'antd'
import {MoreOutlined,PlusOutlined,ArrowRightOutlined} from '@ant-design/icons';
import LinkButton from './../../components/link-button'
import {reqCategories,
        reqSecCategories,
        reqThirdCategories,
        reqUpdateCategory,
        reqUpdateSecCategory,
        reqUpdateThirdCategory} from '../../api'
import AddForm from './add-form'
import UpdateForm from './update-form'
import {message} from 'antd'

export default function Category(){
        const [categories,setCategories]=useState([])
        const [secCategories,setSecCategories]=useState([])
        const [thirdCategories,setThirdCategories]=useState([])
        const [isloading,setloading]=useState(false)
        const [navCategory,setNavCategory]=useState([])
        const [parentIdList,setParentIdList]=useState([])
        const [showModalStatus,setShowModalStatus]=useState(0)

        const [actCategory,setActCategory]=useState("")
        const [actIdList,setActIdList]=useState([])

        const [form]=Form.useForm()

        const getCategories = async()=>{
            setloading(true)
            if (parentIdList.length==0){
                const result=await reqCategories()
                result.data.forEach(item=>{
                    item['key']=item['uuid']
                    delete item['children']
                })
                setCategories(result.data)
            }else if (parentIdList.length==1){
                const result=await reqSecCategories(parentIdList[0])
                result.data.children.forEach(item=>{
                    item['key']=item['uuid']
                    delete item['children']
                })
                setSecCategories(result.data.children)
            }else if (parentIdList.length==2){
                const result=await reqThirdCategories(parentIdList[0],parentIdList[1])
                result.data.children.forEach(item=>{
                    item['key']=item['uuid']
                    delete item['children']
                })
                setThirdCategories(result.data.children)
            }
            setloading(false)
        };
        
        const title=parentIdList.length==0?'Category':
                parentIdList.length==1?
                (<span>
                    <LinkButton onClick={()=>showUpperCategories()}>First Category</LinkButton>
                    <MoreOutlined />
                    <span>{navCategory.join(" / ")}</span>
                </span>):
                (<span>
                    <LinkButton onClick={()=>showUpperCategories()}>Second Category</LinkButton>
                    <MoreOutlined style={{marginRight:5}} />
                    <span>{navCategory.join(" / ")}</span>
                </span>)

        const extra=(
        <Button icon={<PlusOutlined />} type='primary' onClick={()=>showAddCategory()}>
            Add
        </Button>
        )

        const showQueryCategories=(category)=>{
            var newNav=[]
            newNav=[...navCategory]
            newNav.push(category.name)
            setNavCategory(newNav)
            var newParentIdList=[]
            newParentIdList=[...parentIdList]
            newParentIdList.push(category.uuid)
            setParentIdList(newParentIdList)
        }

        const showUpperCategories=()=>{
            var newNav=[]
            newNav=[...navCategory]
            newNav.pop()
            setNavCategory(newNav)
            var newParentIdList=[]
            newParentIdList=[...parentIdList]
            newParentIdList.pop()
            setParentIdList(newParentIdList)
        }

        useEffect(()=>{
            getCategories()
        },[navCategory,parentIdList])

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
                    <LinkButton onClick={()=>showUpdateCategory(category)}>Update</LinkButton>
                    {parentIdList.length<=1?
                        <LinkButton onClick={()=>showQueryCategories(category)}>View</LinkButton>:null}
                </span>
            )
          },
        ];
    
        const showAddCategory=()=>{
            setShowModalStatus(1)
        }
        const showUpdateCategory=(category)=>{
            setActCategory(category.name)
            var newParentIdList=[]
            newParentIdList=[...parentIdList]
            newParentIdList.push(category.uuid)
            setActIdList(newParentIdList)
            setShowModalStatus(2)
        }
        const addCategory=()=>{
            console.log("add")
        }
        const updateCategory=async ()=>{
            setActCategory("")
            setActIdList([])
            setShowModalStatus(0)
            if (actIdList.length==1){
                const result=await reqUpdateCategory(form.getFieldValue('categoryName'),actIdList[0])
                if (result.status!=204){
                    message.error(result.status)
                }
            }else if (actIdList.length==2){
                const result=await reqUpdateSecCategory(form.getFieldValue('categoryName'),actIdList[0],actIdList[1])
                if (result.status!=204){
                    message.error(result.status)
                }
            }else if (actIdList.length==3){
                const result=await reqUpdateThirdCategory(form.getFieldValue('categoryName'),actIdList[1],actIdList[2])
                if (result.status!=204){
                    message.error(result.status)
                }
            }
            form.resetFields()
            getCategories()
        }
        const handleModalCancel=()=>{
            setActCategory("")
            setActIdList([])
            setShowModalStatus(0)
        }
        return(
            <Card title={title} extra={extra}>
                <Table 
                bordered
                loading={isloading}
                dataSource={parentIdList.length==0?categories:parentIdList.length==1?secCategories:thirdCategories} 
                columns={columns} 
                pagination={{defaultCurrent:1,showQuickJumper:true,defaultPageSize:10}}
                />
                <Modal title="Add Category" visible={showModalStatus==1} onOk={addCategory} onCancel={handleModalCancel}>
                    <AddForm/>
                </Modal>
                <Modal title="Update Category" visible={showModalStatus==2} onOk={updateCategory} onCancel={handleModalCancel}>
                    <UpdateForm categoryName={actCategory} form={form}/>
                </Modal>
            </Card>
        )
}
