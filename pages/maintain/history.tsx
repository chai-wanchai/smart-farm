import React, { Component } from 'react';
import AnimalHistory from '../../src/modules/history/animalHistory';

class History extends Component {

  render() {
    return (
      <div>
        <AnimalHistory mode="view" />
      </div>
    );
  }
}

export default History;