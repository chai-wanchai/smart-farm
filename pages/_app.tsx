import App, { Container, AppContext } from "next/app";
import React from 'react'
import Layout from "../src/common/components/Layout";
import '../public/css/style.css'
export default class MyApp extends App {
  static async getInitialProps(context: AppContext) {
    const { Component, ctx } = context;
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    return { pageProps: pageProps }
  }
  render() {
    const { Component } = this.props
    return (
      <>
        <Layout>
          <Component {...this.props} />
        </Layout>

      </>
    );
  }
}
// function MyApp({ Component, pageProps }: AppProps) {
//   console.log(pageProps)
//   return <Component {...pageProps} />
// }

