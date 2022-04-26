import taskStyle from '../styles/components/task.module.scss'
import { EyeOutlined } from "@ant-design/icons"


const Task = ({ data })=>{
    return (
        <div className={taskStyle.eachTask}>
            <div className={taskStyle.taskName}>
                { data.title }
            </div>
            <div className={taskStyle.taskSee}>
                <EyeOutlined className={taskStyle.taskSeeIcon}/>
            </div>
        </div>
    )
}


export default Task;