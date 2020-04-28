import React, { Component } from 'react';

class NotFound extends Component<any, any> {
  static async getInitialProps(ctx) {
    const res = await fetch('https://api.github.com/repos/zeit/next.js')
    const json = await res.json()
    return { stars: json.stargazers_count }
  }
  render() {
    console.log(this.props)
    return (
      <React.Fragment>
        <h1>Not Found 404 {this.props.stars}</h1>
      </React.Fragment>
    );
  }
}

export default NotFound;