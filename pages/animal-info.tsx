import React, { Component } from 'react';
import { AppContext } from 'next/app';
import AnimalDetails from '../src/modules/viewdetails/animalDetails';

class AnimalInfo extends Component<any> {
  static async getInitialProps(context: any) {
    return { ...context.query }
  }
  render() {
    console.log(this.props.pageProps);
    return (
      <div>
        <AnimalDetails barcode={this.props.pageProps.barcode} />
      </div>
    );
  }
}

export default AnimalInfo;