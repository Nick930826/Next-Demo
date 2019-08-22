import React from 'react'
import Link from 'next/link'
import { connect } from 'react-redux'
import { Button, Icon, Tabs } from 'antd'
import Router from 'next/router'
import axios from 'axios'
import LRU from 'lru-cache'
import config from '../../config'
import { Repo } from 'components'
import { request } from 'lib/api'
import './style.less'

// 每次获取数据都会刷新缓存时间，如果maxAge时间到了之前都没有获取数据，那么缓存失效，重新获取数据
const cache = new LRU({
  maxAge: 1000 * 10
})


let cachedUserRepos, cachedStarred
const isServer = typeof window == 'undefined'

class Index extends React.Component {
  static async getInitialProps({ ctx, reduxStore }) {
    
    const { user } = reduxStore.getState()
    console.log('user', reduxStore.getState())
    if (!user.id) {
      return {
        isLogin: false
      }
    }
    if (!isServer) {
      console.log('cache::userRepos', cache.get('userRepos'))
      console.log('cache::starred', cache.get('starred'))
      if (cache.get('userRepos') && cache.get('starred')) {
        return {
          userRepos: cache.get('userRepos'),
          starred: cache.get('starred'),
          tabKey: ctx.query && ctx.query.key ? ctx.query.key : '1'
        }
      }
    }
    
    const userRepos = await request({
      method: 'GET',
      url: '/user/repos',
    }, ctx.req, ctx.res)
    const userStarredRepos = await request({
      url: '/user/starred',
    }, ctx.req, ctx.res)
    

    return {
      isLogin: true,
      userRepos: userRepos.data,
      starred: userStarredRepos.data,
      tabKey: ctx.query && ctx.query.key ? ctx.query.key : '1'
    }
  }

  componentWillReceiveProps (nextProps) {
    if (!isServer) {
      console.log('componentWillReceiveProps')
      console.log('this.props.userRepos', nextProps.userRepos)
      console.log('this.props.starred', nextProps.starred)
      
      cache.set('userRepos', nextProps.userRepos)
      cache.set('starred', nextProps.starred)
    }
  }



  handleTabChange = activeKey => {
    Router.push(`/?key=${activeKey}`)
  }

  render() {
    const { userRepos, starred, user, tabKey } = this.props
    
    console.log('tabKey', tabKey)
    if (!user || !user.id) {
      return <div className='nologin'>
        <p style={{ marginTop: 200, color: '#1890ff' }}>傻屌，你还没登录呢</p>
        <Button type='primary' href={config.github.authorize}>请先登录</Button>
      </div>
    }
    return (
      <div className='root'>
        <div className="user-info">
          <img src={user.avatar_url} alt='user avatar' className='avatar' />
          <span className='login'>{user.login}</span>
          <span className='name'>{user.name}</span>
          <span className='bio'>{user.bio}</span>
          <p className="email">
            <Icon type='mail' style={{ marginRight: 10, color: '#000' }} />
            <a href={`mailto:${user.email}`}>{user.email}</a>
          </p>
        </div>
        <div className="user-repos">
          {/* {userRepos.map(repo => (
            <Repo repo={repo} />
          ))} */}
          <Tabs activeKey={tabKey} onChange={this.handleTabChange} animated={false}>
            <Tabs.TabPane tab="你的仓库" key="1">
              {userRepos.map(repo => (
                <Repo key={repo.id} repo={repo} />
              ))}
            </Tabs.TabPane>
            <Tabs.TabPane tab="你关注的仓库" key="2">
              {starred.map(repo => (
                <Repo key={repo.id} repo={repo} />
              ))}
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)