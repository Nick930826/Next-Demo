import { useState } from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { Layout, Icon, Input, Avatar, Tooltip, Menu, Dropdown } from 'antd'
import axios from 'axios'
import Container from '../Container'
import config from '../../config'
import { logout } from '../../store';
import './style.less'
const { Header, Footer, Content } = Layout;


function MyLayout ({ children, user, logout, router }) {
  function handleLogout() {
    console.log('logout')
    logout()
  }
  function handleLogin(e) {
    e.preventDefault()
    axios.get(`/pre-login?url=${router.asPath}`).then(res => {
      window.location.href = config.github.authorize
    })
  }
  const menu = (
    <Menu>
      <Menu.Item>
        <a onClick={() => handleLogout()}>
          退出
        </a>
      </Menu.Item>
    </Menu>
  )
  const [search, setSearch] = useState('')
  return (
    <Layout>
      <Header>
        <Container renderer={<div className="header-inner" />}>
          <div className="header-left">
            <Icon type="github" />
            <Input.Search
              placeholder="搜索仓库"
              style={{ width: '140px' }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onSearch={(e) => console.log(e)}
            />
          </div>
          <div className="header-right">
            <div className="user">
              {
                user && user.login
                  ? <Dropdown overlay={menu}>
                    <Avatar style={{ cursor: 'pointer' }} src={user.avatar_url} size={40} />
                  </Dropdown>
                  : <Tooltip title='点击登录'>
                      <a onClick={(e) => handleLogin(e)}>
                        <Avatar size={40} icon="user" />
                      </a>
                  </Tooltip>
              }
            </div>
          </div>
        </Container>
      </Header>
      <Content>
        <Container renderer={<div/>}>{children}</Container>
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  )
}


const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MyLayout))