import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Group from './Group.js'; 
import Person from './Person.js'; 

class App extends Component {

  constructor(){

  super();

    this.state = {

      currentGroup: '',
      allGroups: '',
      totalCost: ''

    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);


  }

  handleSubmit(event) {
    
    let p1 = new Person('jay', '908-552-8747');
    let p2 = new Person('shrikar', '908-337-8747');
    let p3 = new Person('nikitha', '224-552-8747');

    let array = [];
    array.push(p1);
    array.push(p2);
    array.push(p3);


    let g = new Group('Group1', array );

    fetch('http://localhost:3001/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(g)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
         console.log("it worked");
        } else {
         console.log("didnt work fk");
        }
      });


    console.log(this.state.totalCost);
    console.log(g);

    event.preventDefault();
    

  }

  handleChange(event) {
    this.setState({totalCost: event.target.value});
  }

  render() {
    
    return (
      <div className="App">

        <div className="TotalAmount">

          <form onSubmit={this.handleSubmit}>
            <label>
             Total Amount: 
             <input type="number" name="name" onChange={this.handleChange}/>
             </label>
            <input type="submit" value="Submit" />
          </form>

        </div>

        <div className="Dashboard">
          
          <div className="Groups">
            <p>Groups</p>
          </div>

          <div className="People">
            <p>People</p>
          </div>

        </div>

      </div>
    );
  }
}

export default App;
