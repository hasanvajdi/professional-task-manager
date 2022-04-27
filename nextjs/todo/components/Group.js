import { useState } from 'react'

import groupStyle from '../styles/components/group.module.scss'
import { EyeOutlined } from "@ant-design/icons"
import { Modal } from 'antd'


const Group = ({ data })=>{
    const [modalVisiblity, setModalVisiblity] = useState(false)

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
                    <span>{ data.name }</span>
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