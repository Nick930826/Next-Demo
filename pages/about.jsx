import React from 'react'
import Router from 'next/router'
import { connect } from 'react-redux'

class About extends React.Component {
  static async getInitialProps({ req }) {
    console.log('about: getInitialProps')
    const about = '我是about'
    return { about }
  }

  constructor (props) {
    super(props)
    console.log('about: constructor')
  }

  handleAddParams = () => {
    Router.push('/')
  }

  render() {
    const { test, about } = this.props
    return (
      <div onClick={this.handleAddParams}>
        About{test}{about}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    
  }
}

export default connect(mapStateToProps)(About)