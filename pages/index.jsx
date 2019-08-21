import React from 'react'
import Link from 'next/link'
import { connect } from 'react-redux'
import { Button } from 'antd'
import axios from 'axios'
import { add } from '../store'
import config from '../config'

class Index extends React.Component {
  static async getInitialProps({ reduxStore }) {
    console.log('getInitialProps:::index', reduxStore.getState())
    const index = '我是index'
    return { index }
  }

  componentDidMount () {
    axios.get('/github/search/repositories?q=react').then(resp => {
      console.log(resp)
    })
  }

  render() {
    const { test, index, add } = this.props
    return (
      <div>
        <Link href='/about'>
          <a>Hello World {test} {index} </a>
        </Link>
        <Button type='primary'>+1</Button>
        <a href={config.github.authorize}>登录</a>
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