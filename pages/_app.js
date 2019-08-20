import App, { Container } from 'next/app'
import Link from 'next/link'

import WithRedux from '../with-redux'
import { Provider } from 'react-redux'

import { Layout } from 'components'
import './global.less'

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