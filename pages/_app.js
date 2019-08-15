import App, { Container } from 'next/app'
import Link from 'next/link'

import WithRedux from '../with-redux'
import { Provider } from 'react-redux'

class MyApp extends App {
  static async getInitialProps (ctx) {
    const { Component } = ctx
    console.log('getInitialProps: app')
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
        <Container>
          <Link href='/index'><a>index</a></Link>
          <Link href='/about'><a>about</a></Link>
          <Component {...pageProps} />
        </Container>
      </Provider>
    }

  
}

export default WithRedux(MyApp)