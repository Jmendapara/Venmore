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
      allGroups: [],
      totalCost: '',
      calculatedCost:'',
      groupName:'',
      name:'',
      phoneNumber:''

    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCharge = this.handleCharge.bind(this);


  }

  componentDidMount() {

    this.start();


  }

  start(){

    let p1 = new Person('jay', '9085528747');
    let p2 = new Person('shrikar', '908-337-8747');
    let p3 = new Person('nikita', '2245001586');
    let p4 = new Person('raina', '224-552-8747');
    let p5 = new Person('rebecca', '444-544-8747');
    let p6 = new Person('atmika', '243-743-8747');
    let p7 = new Person('deepika', '663-009-3452');
    let p8 = new Person('nupoor', '224-552-2638');
    let p9 = new Person('kush', '224-333-0045');
    let p10 = new Person('urvi', '224-543-3276');

    let array1 = [];
    array1.push(p1);
    array1.push(p2);
    array1.push(p3);
    array1.push(p4);

    let array2 = [];
    array2.push(p1);
    array2.push(p3);

    let array3 = [];
    array3.push(p3);
    array3.push(p4);
    array3.push(p6);
    array3.push(p8);
    array3.push(p10);

  
    let g1 = new Group('Best Friends', array1 );
    let g2 = new Group('Not really best friends', array2 );
    let g3 = new Group('Definitely not my friends', array3 );

    let groupArray = [];

    groupArray.push(g1);
    groupArray.push(g2);
    groupArray.push(g3);

    this.setState({
      allGroups:groupArray
    });

    this.setState({
      currentGroup : g1
    })

   fetch('http://api.reimaginebanking.com/accounts/5e518aab322fa016762f39e3/purchases?key=72db40bd065c29df9cdd263762a8639b&fbclid=IwAR10WLFYFUWcQtpFy2XDJp4AaB0bL95RgiGU-d1ubObErmfImqm-i45T8cE')
   .then(results => {
      return results.json();
   }).then(data => {

    console.log(data);

    this.setState({

      totalCost: data[data.length-1].amount

    })

   })
   
   
   ;




    this.setState({
      totalCost:1000
    })

  }

  handleSubmit(event) {


    console.log(this.state.allGroups);

    fetch('http://localhost:3001/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(this.state.allGroups)
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

    event.preventDefault();
    

  }

  handleChange(event) {
    this.setState({totalCost: event.target.value});
  }

  handleSelect(name){

    for(var i = 0 ; i < this.state.allGroups.length; i++){

      if(this.state.allGroups[i].name === name ){

        let tempGroup = this.state.allGroups[i];

        for(var i = 0 ; i < tempGroup.people.length; i++){

          tempGroup.people[i].cost = 0;

        }

        this.setState({currentGroup:tempGroup});
        return;

      }

    }


    

  }


  handleCharge(){

    console.log(this.state.currentGroup);
    
    for(let i = 0 ; i < this.state.currentGroup.people.length; i ++){

      fetch('http://localhost:3001/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(this.state.currentGroup.people[i])
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
           console.log("it worked");
          } else {
           console.log("didnt work fk");
          }
        });




    }
   

  }

  splitEvenly(){

    var size = this.state.currentGroup.people.length;

    var totalCost = this.state.totalCost / size;

    let tempGroup = this.state.currentGroup;

    let finalCost = 0;

    for(var i = 0 ; i < this.state.currentGroup.people.length; i++ )
    {
      tempGroup.people[i].cost=totalCost;
      finalCost = +finalCost + +tempGroup.people[i].cost;
    }

    this.setState({
      currentGroup:tempGroup
    });

    this.setState({
      calculatedCost: finalCost
    })
    
    console.log( this.state.currentGroup);

  }

  showPeopleList() {

    return(

      <div className="list">
         
      {this.state.currentGroup.people.map((n, i) => (
      
      <ol key = {i}>

      <h3>{n.name}'s request value = {n.cost}</h3>
      <input class ="input" key={i} type="number" placeholder='Enter Value' onChange={e => {this.state.currentGroup.people[i].cost = e.target.value;}} />

      </ol>

     ))}

    <p id="totalRequestAmount">Total Request Amount:{this.state.calculatedCost}</p>

    <button class="button" onClick = { () => this.splitEvenly() } >Split Evenly</button>

    <button  class="button" onClick = { () => this.update() } >Update Totals</button>

    <button  class="button" onClick = { () => this.handleCharge() } >Request Charges</button>

    </div>

    )

  }


  update(){

    let tempGroup = this.state.currentGroup;
    let finalCost = 0;

    for( var i = 0 ; i < this.state.currentGroup.people.length; i++ )
    {

      var totalCost = this.state.currentGroup.people[i].cost;
      tempGroup.people[i].cost=totalCost;
      finalCost = +finalCost + +this.state.currentGroup.people[i].cost;

    }

    this.setState({
      currentGroup:tempGroup
    });

    this.setState({
      calculatedCost: finalCost
    })
    
    console.log( this.state.currentGroup);

  }

  clear(){

    let tempGroup = this.state.currentGroup;

    for( var i = 0 ; i < this.state.currentGroup.people.length; i++ )
    {
      tempGroup.people[i].cost=0;
    }

    this.setState({
      currentGroup:tempGroup
    });

  }

  createGroup(){

    let array = [];
    let tempGroup = new Group(this.state.groupName,array);
    let x = this.state.allGroups;
    x.push(tempGroup);
    this.setState({
      allGroups:x
    })

  }

  addPerson(){

    let tempGroup = this.state.currentGroup;
    
    let tempPerson = new Person(this.state.name, this.state.phoneNumber);

    tempGroup.people.push(tempPerson);

    this.setState({
      currentGroup:tempGroup
    })

  }

  render() {
    
    return (
      <div className="App">

        <div className="TotalAmount">

          <form onSubmit={this.handleSubmit}>
            <label>
             Total Amount: 
             <input class="input" type="number" name="name" onChange={this.handleChange}/>
             </label>
            <input class="input" type="submit" value="Submit" />
          </form>

        </div>

        <div className="Dashboard">
          
          <div className="Groups">

          <div className = "title2">
              
          Total Bill: {this.state.totalCost}

              </div>

            <div className = "title">
              
              <h>Groups</h>

              </div>
            <div className = "createGroup">
            
            <h id="groupAdd" >Add Group</h>
            <br></br>
            <br></br>

              <input class="input" type="text" placeholder='Group Name' onChange={e => {this.state.groupName = e.target.value;}} />
              <br></br>
              <br></br>

              <button class="button" onClick={()=> this.createGroup()}>Create Group</button>
            </div>

            <div className="trackList">
             <ol>
              {this.state.allGroups.map(eachGroup => (
              <li key={eachGroup.name} onClick={() => this.handleSelect(eachGroup.name)}>
                <h3>{eachGroup.name}</h3>
              </li>
              ))}
           </ol>
        </div>

      


          </div>

          <div className="People">
            
            <div className = "title">People
            </div>

            <div className = "addPerson">

            <h id="addPerson" >Add Person</h>
            <br></br>
            <br></br>

            <input class="input" type="text" placeholder='Name' onChange={e => {this.state.name = e.target.value;}} />
            <br></br>
            <br></br>

            <input class="input" type="text" placeholder='Phone Number' onChange={e => {this.state.phoneNumber = e.target.value;}} />
            <br></br>
            <br></br>

            <button class="button" onClick={()=> this.addPerson()}>Add Person</button>

            </div>


            {this.state.currentGroup ?

            this.showPeopleList()
            

            : null}

        </div>

        </div>

      </div>
    );
  }
}

export default App;
