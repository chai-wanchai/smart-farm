import NextDocument, { Head, Main, NextScript } from 'next/document'
import React from 'react'

export default class Document extends NextDocument {

  render() {
    return (
      <html>
        <Head>
          <base href='/' />
          <meta charSet='UTF-8' />
          <meta httpEquiv='X-UA-Compatible' content='IE=Edge' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
          {/** favicon app */}
          <link rel='icon' type='image/x-icon' href='/static/favicon.ico' />
          {/** fonts */}
          <link rel='stylesheet' href={`https://fonts.googleapis.com/css2?family=K2D:ital,wght@0,100;0,300;0,700;1,100;1,300;1,700&display=swap`} />
          {/** cdn css */}
          <link rel='stylesheet' href={`https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css`} />
          <link rel='stylesheet' href={`https://cdn.jsdelivr.net/npm/react-datepicker@2.12.1/dist/react-datepicker.min.css`} />
          <script src="https://cdn.jsdelivr.net/npm/semantic-ui-calendar-react@latest/dist/umd/semantic-ui-calendar-react.js"></script>
        </Head>
        <body style={{display:'contents'}}>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}