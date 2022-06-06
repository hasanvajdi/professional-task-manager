import { useState } from 'react'
import groupStyle from '../styles/components/group.module.scss'
import { useCookies } from "react-cookie"
import { EyeOutlined, LinkOutlined } from "@ant-design/icons"
import { Modal, Badge, Button, Popconfirm  } from 'antd'
import Cookies from 'universal-cookie';


import { routeApi } from "../pages/api/index"



const Group = ({ data, setGroups, groupsState })=>{
    const cookies = new Cookies();
    const [modalVisiblity, setModalVisiblity] = useState(false)
    const [groupData, setGroupData] = useState(data)

    const handleCancel=() => {
        setModalVisiblity(false)
    };

    const deleteGroupHandler= ()=>{
        const reqCookies = {access_token:cookies.get("access_token"), refresh_token:cookies.get("refresh_token")}
        routeApi.delete(`/account/dashboard/groups?id=${groupData.group_id}`)
        
        // update groups state and remove deleted group
        //setGroups(
        //    groupsState.filter((group)=>{group.group_id !== groupData.group_id})
        //)
    }

    const editGroupHandler=() =>{
        console.log("edit group")
    }


    const copyGroupLinkHandler = ()=>{
        navigator.clipboard.writeText(groupData.link)
    }
    

    return (
        <>
            <Modal
                visible={modalVisiblity}
                title = {
                    <div>
                        <span className={groupStyle.modalMainTitle}>جزییات گروه </span>
                        <span className={groupStyle.modalTitleGroupName}>( { data.name } ) </span>
                    </div>
                }
                onCancel={handleCancel}
                footer={
                   <div className={groupStyle.modalFooterContainer}>

                        <Popconfirm title="آیا مطمين هستید؟" onConfirm={deleteGroupHandler} okText="حذف" cancelText="لفو">
                            <Button type="primary" className={groupStyle.modalFooterGroupDeleteBtn} danger>
                                حذف
                            </Button>
                        </Popconfirm>

                        <Button type="dashed" onClick={editGroupHandler} className={groupStyle.modalFooterGroupEditBtn} >
                            ویرایش
                        </Button>
                   </div>
                }
                >
                    <div className={groupStyle.groupModalContainer}>   
                        <div className={groupStyle.groupLinkContainer}>
                            <div className={groupStyle.copyContainer}  onClick={copyGroupLinkHandler}>
                                <span>کپی</span>
                                <LinkOutlined className={groupStyle.copyIcon}/>
                            </div>
                            <span className={groupStyle.groupLinkText}>{ groupData.link } </span>
                        </div>
                        
                        <div className={groupStyle.groupIdContainer}>
                            <span>آیدی عددی : </span>
                            <span>{ groupData.group_id }</span>
                        </div>

                        <div className={groupStyle.groupOwnerMembersDateContainer}>
                            <div className={groupStyle.groupOwner}>
                                <span className={groupStyle.groupOwnerText}>سازنده : </span>
                                <span className={groupStyle.groupOwnerUsername}>{ groupData.owner.username }</span>
                            </div>
                            <div className={groupStyle.groupMembers}>
                                <span className={groupStyle.groupMembersText}>تعداد اعضا : </span>
                                <Badge className={groupStyle.groupMembersCount} count={ groupData.members.length } />
                            </div>

                            <div className={groupStyle.groupCreatedDate}>
                                <span className={groupStyle.groupCreatedDateText}>تاریخ ایجاد : </span>
                                <span className={groupStyle.groupCreatedDateDate}>{ groupData.created_date.date } ({ data.created_date.time })</span>
                            </div>
                        </div>
                    </div>
            </Modal>

            <div className={groupStyle.eachGroup}>
                <div className={groupStyle.groupName}>
                    { groupData.name }
                </div>
                <div className={groupStyle.groupSee}>
                    <EyeOutlined className={groupStyle.groupSeeIcon} onClick={()=>{setModalVisiblity(true)}} />
                </div>
            </div>
        </>
    )
}


export default Group;