import { Row, Col, Menu, Dropdown, } from 'antd';
import { LogoutOutlined, UserSwitchOutlined, EditOutlined, CaretDownOutlined, UserOutlined, CheckCircleOutlined, LoadingOutlined, FolderOpenOutlined } from '@ant-design/icons';
import profileStyle from '../../styles/profile.module.scss'
import Image from 'next/image'
import classnames from 'classnames';


const userMenu = (
    <Menu>
      <Menu.Item key="0" icon={<EditOutlined className={profileStyle.userMenuIcon}/>} className={profileStyle.userMenuItem}>
        <span>ویرایش پروفایل</span>
      </Menu.Item>

      <Menu.Item key="1" icon={<UserSwitchOutlined className={profileStyle.userMenuIcon}/>} className={profileStyle.userMenuItem}>
        <span>وظایف شخصی</span>
      </Menu.Item>

      <Menu.Divider />

      <Menu.Item key="3" icon={<LogoutOutlined className={[profileStyle.userMenuIcon]} style={{color:"red"}}/>} className={[profileStyle.userMenuItem, profileStyle.userMenuLogout]}>
        <sapn>خروج از حساب</sapn>
      </Menu.Item>
    </Menu>
);

const profile = ()=>{

    return(
        <>
            <div className={profileStyle.profileContainer}>
                <Row className={profileStyle.profileHeader}>
                    <Col className={profileStyle.headerUserContainer} >
                        <UserOutlined className={profileStyle.headerUserIcon} />
                        <Dropdown overlay={userMenu} trigger={['click']}>
                            <CaretDownOutlined className={profileStyle.headerNavIcon} />
                        </Dropdown>
                    </Col>
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