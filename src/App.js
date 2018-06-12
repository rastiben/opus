import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class App extends Component { 
  render() {

    const tests = this.props.data.loading ? 
    [] : 
    this.props.data.tests.map((item) => 
      <p>{item.value}</p>
    );

    return (
      <div className="App">
        {tests}
      </div>
    );
  }
}

export default graphql(gql`
  query allTests {
    tests {
      id
      value
    }
  }
`)(App);
