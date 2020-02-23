export default class Person {

    name;
    phoneNumber;
    cost;
  
    constructor(name, phoneNumber) {
      this.name = name;
      this.phoneNumber = phoneNumber;
    }
  
    setCost(cost){
      this.cost = cost;
    }

    }