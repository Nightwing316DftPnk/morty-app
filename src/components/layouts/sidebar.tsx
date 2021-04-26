import React from 'react';
import { Menu } from 'antd';
import {
    UserOutlined,
    VideoCameraOutlined,
    PlusOutlined,
    UploadOutlined,
  } from '@ant-design/icons';
import {useHistory}  from 'react-router';
const SideNav = () => {
    const history = useHistory();
const handleCharactersClick = () => {
        history.push('/characters');
    }
const handleEpisodesClick = () => {
        history.push('/episodes');
    }
const handlePlacesClick = () => {
        history.push('/places');
    }
const handleClickForm = () => {
    history.push('/create/characters')
    //window.location.href = '/characters/form'
  }
return (
      <div>
        <div style={{height: "32px", background: "rgba(255, 255, 255, 0.2)", margin: "16px"}}></div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" onClick={handleCharactersClick}>
                    <UserOutlined />
                    <span> Characters</span>
                </Menu.Item>
                <Menu.Item key="2" onClick={handleEpisodesClick}>
                    <VideoCameraOutlined />
                    <span> Episodes</span>
                </Menu.Item>
                <Menu.Item key="3" onClick={handlePlacesClick}>
                    <UploadOutlined />
                    <span> Places</span>
                </Menu.Item>
            </Menu>
        </div>
  );
}
export default SideNav;