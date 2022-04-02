import { Row, Col, Menu, Dropdown, Divider } from 'antd';
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

                <Row className={profileStyle.profileBody}>
                    <Col className={profileStyle.allStatisticsCol}>

                        <Row className={profileStyle.allStatisticsColRow} justify="space-between" >

                            <Col className={profileStyle.allStatisticsGroups} span={7}>
                                <span>25</span>
                                <span>کل گروه ها</span>
                            </Col>

                            <Col className={profileStyle.allStatisticsUsers} span={7}>
                                <span>100</span>
                                <span>کل کاربر ها</span>
                            </Col>

                            <Col className={profileStyle.allStatisticsTasks} span={7}>
                                <span>8057</span>
                                <span>کل وظیفه ها</span>
                            </Col>
                        </Row>

                        <Row className={profileStyle.groupRow} justify="space-between">
                            <Col span={17} className={profileStyle.groupList} >
                                <span>لیست گروه ها</span>
                            </Col>

                            <Col span={6} className={profileStyle.groupMostWork} >
                                <span>پر کار ترین گروه ها</span>
                            </Col>
                        </Row>

                    </Col>
                </Row>
                
            </div>
        </>
    )
}

export default profile;