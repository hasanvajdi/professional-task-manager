import { useState } from 'react'

import groupStyle from '../styles/components/group.module.scss'
import { EyeOutlined, LinkOutlined } from "@ant-design/icons"
import { Modal, Badge } from 'antd'


const Group = ({ data })=>{
    const [modalVisiblity, setModalVisiblity] = useState(false)
    console.log("data :", data)
    const handleCancel=() => {
        setModalVisiblity(false)
    };
    

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
                footer={null}
                >
                    <div className={groupStyle.groupModalContainer}>   
                        <div className={groupStyle.groupLinkContainer}>
                            <div className={groupStyle.copyContainer}>
                                <span >کپی</span>
                                <LinkOutlined className={groupStyle.copyIcon}/>
                            </div>
                            <span className={groupStyle.groupLinkText}>{ data.link } </span>
                        </div>
                        
                        <div className={groupStyle.groupIdContainer}>
                            <span>آیدی عددی : </span>
                            <span>{ data.group_id }</span>
                        </div>

                        <div className={groupStyle.groupOwnerMembersDateContainer}>
                            <div className={groupStyle.groupOwner}>
                                <span className={groupStyle.groupOwnerText}>سازنده : </span>
                                <span className={groupStyle.groupOwnerUsername}>{ data.owner.username }</span>
                            </div>
                            <div className={groupStyle.groupMembers}>
                                <span className={groupStyle.groupMembersText}>تعداد اعضا : </span>
                                <Badge className={groupStyle.groupMembersCount} count={ data.members.length } />
                            </div>

                            <div className={groupStyle.groupCreatedDate}>
                                <span >تاریخ ایجاد : </span>
                                <span>{ data.created_date }</span>
                            </div>
                        </div>
                    </div>
            </Modal>

            <div className={groupStyle.eachGroup}>
                <div className={groupStyle.groupName}>
                    { data.name }
                </div>
                <div className={groupStyle.groupSee}>
                    <EyeOutlined className={groupStyle.groupSeeIcon} onClick={()=>{setModalVisiblity(true)}} />
                </div>
            </div>
        </>
    )
}


export default Group;