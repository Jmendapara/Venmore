export default class Group{
    
    people=[];
    name;

    constructor(name, people) {

        this.name = name;
        this.people = people;

    }

    add(person){

        this.people.add(person);

    }


  
   }
  