import { useState } from 'react'
import { Modal } from 'antd'


import userStyle from '../styles/components/user.module.scss'
import {EyeOutlined} from "@ant-design/icons"

const User = ({ data })=>{
    const [modalVisiblity, setModalVisiblity] = useState(false)

    const handleCancel=() => {
        setModalVisiblity(false)
    };
    

    return (
        <>
            <Modal
                visible={modalVisiblity}
                title="جزيیات کاربر"
                onCancel={handleCancel}
                footer={null}
                >
                    <span>{ data.user.username }</span>
            </Modal>
            <div className={userStyle.eachUser}>
                <div className={userStyle.userName}>
                    <span>{ data.user.username }</span>
                </div>

                <div className={userStyle.userSee}>
                    <EyeOutlined className={userStyle.userSeeIcon} onClick={()=>{setModalVisiblity(true)}} />
                </div>

            </div>
        </>
    )
}

export default User