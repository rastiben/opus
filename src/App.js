import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      value: []
    }
  }

  componentDidMount(){
    const self = this;

    axios.get('/test').then(function(data){
      self.setState({ value: data.data });
    });
  }
  
  render() {

    const tests = this.state.value.map((test) => 
      <p>{test.value}</p>
    );

    return (
      <div className="App">
        {tests}
        <button onClick={this._handleClick .bind(this)}>Ajouter dans la base</button>
      </div>
    );
  }

  _handleClick(){
    axios.post('/test',{value: "test"}).then(function(data){
    });
  }
}

export default App;
