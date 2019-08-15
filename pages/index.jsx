import React from 'react'
import Link from 'next/link'
import { connect } from 'react-redux'
import { add } from '../store'

class Index extends React.Component {
  static async getInitialProps({ reduxStore }) {
    console.log('getInitialProps:::index', reduxStore.getState())
    reduxStore.dispatch(add(4))
    const index = '我是index'
    return { index }
  }

  render() {
    const { test, index, add } = this.props
    return (
      <div>
        <Link href='/about'>
          <a>Hello World {test} {index} {this.props.count}</a>
        </Link>
        <button onClick={() => add(1)}>+1</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.counter.count,
    username: state.user.username
  }
}

const mapDispatchToProps = dispatch => {
  return {
    add: (num) => dispatch({ type: 'ADD', num }),
    rename: (name) => dispatch({ type: 'UPDATE_USERNAME', name })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)