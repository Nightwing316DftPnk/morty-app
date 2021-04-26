import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import ListCharacter from "../components/pages/characters/list";
import ListEpisode from "../components/pages/episodes/list";
import ListPlace from "../components/pages/places/list";

import FormCharacter from "../components/pages/characters/form";
import FormEpisode from "../components/pages/episodes/form";
import FormPlace from "../components/pages/places/form";

import EditFormCharacter from "../components/pages/characters/edit";
import EditFormEpisode from "../components/pages/episodes/edit";
import EditFormPlace from "../components/pages/places/edit";

import SideNav from "../components/layouts/sidebar";
import { Layout } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined
  } from '@ant-design/icons';
const { Header, Sider, Content} = Layout;
const ApplicationRoutes = () => {
  const [collapse, setCollapse] = useState(false);
useEffect(() => {
    window.innerWidth <= 760 ? setCollapse(true) : setCollapse(false);
  }, []);
const handleToggle = (event: any) => {
        event.preventDefault();
        collapse ? setCollapse(false) : setCollapse(true);
    }
  return (
      <Router>
        <Layout>
          <Sider trigger={null} collapsible collapsed={collapse}>
            <SideNav />
          </Sider>
          <Layout>
            <Header className="siteLayoutBackground" style={{padding: 0, background: "#001529"}}>
                      {React.createElement(collapse ? MenuUnfoldOutlined : MenuFoldOutlined, {
                          className: 'trigger',
                          onClick: handleToggle,
                          style: {color: "#fff"}
                      })}
            </Header>
              <Content style={{margin: '24px 16px', padding: 24, minHeight: "calc(100vh - 114px)", background: "#fff"}}>
                <Switch>
                    <Route path="/characters" component={ListCharacter} />
                    <Route path="/episodes" component={ListEpisode} />
                    <Route path="/places" component={ListPlace} />
                    <Route path="/create/characters" component={FormCharacter} />
                    <Route path="/create/episodes" component={FormEpisode} />
                    <Route path="/create/places" component={FormPlace} />

                    <Route path="/edit/:id?/characters" component={EditFormCharacter} />
                    <Route path="/edit/:id?/episodes" component={EditFormEpisode} />
                    <Route path="/edit/:id?/places" component={EditFormPlace} />

                    <Redirect to="/characters" from="/" />
                </Switch>
              </Content>
          </Layout>
        </Layout>
    </Router>
  );
}
export default ApplicationRoutes;