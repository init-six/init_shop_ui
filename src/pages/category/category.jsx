import React,{useState,useEffect,useRef,useCallback} from 'react'
import {Breadcrumb,Form,Modal,Card,Button,Table} from 'antd'
import {MoreOutlined,PlusOutlined,ArrowRightOutlined} from '@ant-design/icons';
import LinkButton from './../../components/link-button'
import {reqCategories,
        reqSecCategories,
        reqThirdCategories,
        reqUpdateCategory,
        reqUpdateSecCategory,
        reqUpdateThirdCategory,
        reqAddCategory,
        reqAddSecCategory,
        reqAddThirdCategory} from '../../api'
import AddForm from './add-form'
import UpdateForm from './update-form'
import {message} from 'antd'
import {useNavigate} from 'react-router-dom';

export default function Category(){
        const navigate=useNavigate();
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

        const showUpperCategories=(step)=>{
            console.log(step)
            var newNav=[]
            newNav=[...navCategory]
            if (step==1){
                newNav.pop()
            }else if (step==2){
                newNav.pop()
                newNav.pop()
            }
            setNavCategory(newNav)
            var newParentIdList=[]
            newParentIdList=[...parentIdList]
            if (step==1){
                newParentIdList.pop()
            }else if (step==2){
                newParentIdList.pop()
                newParentIdList.pop()
            }
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
        const addCategory=async ()=>{
            try{
                const values=await form.validateFields()
                const {categoryName}=values
                setShowModalStatus(0)
                if (parentIdList.length==0){
                    await reqAddCategory(categoryName)
                }else if (parentIdList.length==1){
                    await reqAddSecCategory(categoryName,parentIdList[0])
                }else{
                    await reqAddThirdCategory(categoryName,parentIdList[1])
                }
                form.resetFields()
                getCategories()
            }catch(error){
            }
        }
        const updateCategory=async ()=>{
            try{
                const values=await form.validateFields()
                const {categoryName}=values
                setActCategory("")
                setActIdList([])
                setShowModalStatus(0)
                if (actIdList.length==1){
                    await reqUpdateCategory(categoryName,actIdList[0])
                }else if (actIdList.length==2){
                    await reqUpdateSecCategory(categoryName,actIdList[0],actIdList[1])
                }else if (actIdList.length==3){
                    await reqUpdateThirdCategory(categoryName,actIdList[1],actIdList[2])
                }
                form.resetFields()
                getCategories()
            }catch(error){
            }
        }
        const handleModalCancel=()=>{
            setActCategory("")
            setActIdList([])
            setShowModalStatus(0)
        }

        const title=parentIdList.length==0?'Category':
                parentIdList.length==1?
                (<span>
                    <Breadcrumb>
                        <Breadcrumb.Item><LinkButton onClick={()=>showUpperCategories(1)}>Home</LinkButton></Breadcrumb.Item>
                    </Breadcrumb>
                </span>):
                (<span>
                    <Breadcrumb>
                        <Breadcrumb.Item><LinkButton onClick={()=>showUpperCategories(2)}>Home</LinkButton></Breadcrumb.Item>
                        <Breadcrumb.Item><LinkButton onClick={()=>showUpperCategories(1)}>{navCategory[1]}</LinkButton></Breadcrumb.Item>
                    </Breadcrumb>
                </span>)

        const extra=(
        <Button icon={<PlusOutlined />} type='primary' onClick={()=>showAddCategory()}>
            Add
        </Button>
        )
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
                    <AddForm navCategory={navCategory} form={form}/>
                </Modal>
                <Modal title="Update Category" visible={showModalStatus==2} onOk={updateCategory} onCancel={handleModalCancel}>
                    <UpdateForm categoryName={actCategory} form={form}/>
                </Modal>
            </Card>
        )
}
