import { useState } from 'react'
import { Modal } from 'antd'


import taskStyle from '../styles/components/task.module.scss'
import { EyeOutlined } from "@ant-design/icons"


const Task = ({ data })=>{
    const [modalVisiblity, setModalVisiblity] = useState(false)

    const handleCancel=() => {
        setModalVisiblity(false)
    };
    

    return (
        <>
            <Modal
                visible={modalVisiblity}
                title="جزيیات وظیفه"
                onCancel={handleCancel}
                footer={null}
                >
                    <span>{ data.title }</span>
            </Modal>

            <div className={taskStyle.eachTask}>
                <div className={taskStyle.taskName}>
                    { data.title }
                </div>
                <div className={taskStyle.taskSee}>
                    <EyeOutlined className={taskStyle.taskSeeIcon} onClick={()=>{setModalVisiblity(true)}} />
                </div>
            </div>
        </>
    )
}


export default Task;