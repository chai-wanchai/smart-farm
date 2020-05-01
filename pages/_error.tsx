import React, { Component } from 'react';
import { NextPageContext } from 'next';
import { AppContext } from 'next/app';

interface ErrorPageProps extends AppContext {
  statusCode: number,
  pageProps: any
}

interface ErrorMessage {
  codeTitle: string
  title: string
  message: string
}

// End typescript defined -------------------------------

const getErrorMessage = (statusCode): ErrorMessage => {
  switch (statusCode) {
    case 401:
      return {
        codeTitle: "Unauthorized",
        title: `Sorry, we can't authorized that page!`,
        message: "Authentication was provided, but the authenticated user is not permitted to perform the requested operation."
      }
    case 403:
      return {
        codeTitle: "Forbidden",
        title: "Sorry, you not have permission",
        message: "Authentication was provided, but the authenticated user is not permitted to perform the requested operation."
      }
    case 404:
      return {
        codeTitle: "Page not found",
        title: "Sorry, we can't find that page!",
        message: "Either something went wrong or the page doesn't exist anymore."
      }
    case 500:
      return {
        codeTitle: "Internal Server Error",
        title: "Sorry, something went wrong",
        message: "It looks as though we've broken something on our system"
      }
    default:
      return {
        codeTitle: 'Unknown',
        title: "An error occurred on the server",
        message: "Please try agin."
      }
  }
}

class ErrorPage extends Component<ErrorPageProps> {
  static getInitialProps(ctx: NextPageContext) {
    const { res, err, asPath } = ctx
    const statusCode = res ? res.statusCode : err ? err.statusCode : null
    const path = asPath ? asPath : null
    return {
      statusCode: statusCode,
      routerPath: path
    }
  }

  render() {
    const { statusCode } = this.props.pageProps
    const errorMsg = getErrorMessage(statusCode)

    return (
      <div style={{ minHeight: '85vh' }}>
        <h1>{errorMsg.codeTitle}</h1>
        <h2>{errorMsg.title}</h2>
        <h3>{errorMsg.message}</h3>
      </div>
    )
  }
}

export default ErrorPage
