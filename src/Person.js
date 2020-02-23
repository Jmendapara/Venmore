export default class Person {

    name;
    phoneNumber;
    cost;
  
    constructor(name, phoneNumber) {
      this.name = name;
      this.phoneNumber = phoneNumber;
      this.cost = 0;
    }
  
    setCost(cost){
      this.cost = cost;
    }

    }