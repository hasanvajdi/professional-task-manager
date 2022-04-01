import { Row, Col } from 'antd';
import { CheckCircleOutlined, LoadingOutlined, FolderOpenOutlined } from '@ant-design/icons';
import profileStyle from '../../styles/profile.module.scss'


const profile = ()=>{
    return(
        <>
            <div className={profileStyle.profileContainer}>
                <Row className={profileStyle.profileHeader}>
                </Row>

                <Row className={profileStyle.profileBody}  align="middle" justify="center">
                    <Col className={profileStyle.allTasks} span={7} >
                        <div className={profileStyle.allTasksHeader}>
                            <span>همه</span>
                            <FolderOpenOutlined className={profileStyle.allTasksIcon} />
                        </div>
                    </Col>

                    <Col className={profileStyle.doingTasks} span={7} >
                        <div className={profileStyle.doingTasksHeader}>
                            <span>در حال انجام</span>
                            <LoadingOutlined className={profileStyle.doingTasksIcon} />
                        </div>
                    </Col>

                    <Col className={profileStyle.finishedTasks} span={7} >
                        <div className={profileStyle.finishedHeader}>
                            <span>تمام شده</span>
                            <CheckCircleOutlined className={profileStyle.finishedTasksIcon} />
                        </div>                    
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default profile;