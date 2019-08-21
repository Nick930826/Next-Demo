import App, { Container } from 'next/app'
import Link from 'next/link'
import Router from 'next/router'
import NProgress from 'nprogress'
import WithRedux from '../with-redux'
import { Provider } from 'react-redux'

import { Layout } from 'components'
import './global.less'


Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = (url) => {
  NProgress.done()
  if (process.env.NODE_ENV !== 'production') {
    const els = document.querySelectorAll('link[href*="/_next/static/css/styles.chunk.css"]')
    const timestamp = new Date().valueOf()
    els[0].href = '/_next/static/css/styles.chunk.css?v=' + timestamp
  }
}

class MyApp extends App {
  static async getInitialProps (ctx) {
    const { Component } = ctx
    console.log('_app: getInitialProps')
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return {
      pageProps
    }
  }

    render () {
      const { Component, pageProps, reduxStore } = this.props
      return <Provider store={reduxStore}>
        <Layout>
          <Container>
            <Component {...pageProps} />
          </Container>
        </Layout>
      </Provider>
    }

  
}

export default WithRedux(MyApp)