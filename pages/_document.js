import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {

  render () {
    return <html>
      <Head>
        <link rel='stylesheet' href='//s.weituibao.com//static/1562583661049/nprogress.css' />
      </Head>
      <body >
        <Main />
        <NextScript />
      </body>
    </html>
  }
}
