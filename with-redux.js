import React from 'react'
import createStore from './store'


const isServer = typeof window === 'undefined'
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__'

const getOrCreateStore = (initialState) => {
  /* 浏览器每次切换的时候都会执行, 所以在客户端通过 window[__NEXT_REDUX_STORE__] 变量保存住store，
  执行的时候，若是没有，则进行初始化创建，若是有，则返回 window[__NEXT_REDUX_STORE__]。这样能保证数据都是通用的 */
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
      console.log('WithReduxApp: getInitialProps')
      /* 浏览器每次切换的时候，都会执行这个getInitialProps，也就是_app.js的getInitialProps；
      所以在这这边要保证的是，每次创建store的时候，是同一个store，否则每次创建store数据都变为初始化数据*/
      const reduxStore = getOrCreateStore()
      ctx.reduxStore = reduxStore // 这里把reduxStore传过去给Index的getInitialProps使用，上下文还在，这是同一个reduxStore
      let appProps = {}
      if (typeof MyApp.getInitialProps === 'function') {
        appProps = await MyApp.getInitialProps(ctx) // 执行的是_app.js的getInitialProps静态方法，返回的是组件的
        console.log('appProps:::', appProps)
      }
  
      return {
        ...appProps,
        initialReduxState: reduxStore.getState() // 脱水,在此是不能返回reduxStore，因为这里return的内容最终会被拍平，放在html的script标签内，客户端代码可以通过props获取到
      }
    }
    
    constructor (props) {
      console.log('WithReduxApp: constructor: initialReduxState', props.initialReduxState)
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