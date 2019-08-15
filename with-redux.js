import React from 'react'
import createStore from './store'


const isServer = typeof window === 'undefined'
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__'

const getOrCreateStore = (initialState) => {
  if (isServer) {
    return createStore(initialState)
  }

  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = createStore(initialState)
  }

  return window[__NEXT_REDUX_STORE__]
}
export default MyApp => {

  class WithReduxApp extends React.Component {
    static async getInitialProps (ctx) {
      console.log('WithReduxApp getInitialProps::::')
      const reduxStore = getOrCreateStore()
      ctx.reduxStore = reduxStore // 这里把reduxStore传过去给Index的getInitialProps使用，上下文还在，这是同一个reduxStore
      let appProps = {}
      if (typeof MyApp.getInitialProps === 'function') {
        appProps = await MyApp.getInitialProps(ctx)
        console.log('appProps', appProps)
      }
  
      return {
        ...appProps,
        initialReduxState: reduxStore.getState() // 脱水,在此是不能返回reduxStore，因为这里return的内容最终会被拍平，放在html的script标签内，客户端代码可以通过props获取到
      }
    }
    
    constructor (props) {
      console.log('WithReduxApp constructor::::initialReduxState', props.initialReduxState)
      super(props)
      this.reduxStore = getOrCreateStore(props.initialReduxState)
    }

    render () {
      const { Component, pageProps, ...rest } = this.props
  
      return <MyApp
        Component={Component}
        pageProps={pageProps}
        {...rest}
        reduxStore={this.reduxStore} // 注入
      />
    }
  }

  return WithReduxApp
}