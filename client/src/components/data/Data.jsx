import React, { Component } from 'react';
import data from './data.css'

class Data extends Component {

  state={
    data:[]
  }

//Runs automatically when the component is mounted
componentDidMount(){
  fetch('/data')  //the proxy attribute in package.json allow us to fetch without http...
  .then(res=>res.json())
  .then(data=>this.setState({
    data:data
  },()=>console.log('fetched data: ',data)))
}

  render() {
    return (
      <div>
        <h1>
          Fetched data
        </h1>
        <ul>
          {this.state.data.map((item)=>{
            return (
              <li key={item.id}>{item.name} {item.lastname}</li>
            )
          })}
        </ul>
      </div>
    );
  }
}

export default Data;