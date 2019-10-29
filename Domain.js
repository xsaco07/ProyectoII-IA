class Domain {

  constructor(agents, services, agentsMapping, serviceOrdersMapping) {
    this.agents = agents;
    this.services = services;
    this.agentsMapping = agentsMapping;
    this.serviceOrdersMapping = serviceOrdersMapping;
  }

  isSolution(individual) {

    return this.isValid(individual) && individual.getFitness() == 0;

  }

  isValid(individual) {
    // Revisar que no se sobrepasen las 40 horas
    var to_much_work = false;
    for(var i = 0; i < agents.length; i++) {
      if(this.getTotalWorkingHours(agents[i].id, individual.assignments) > 40) to_much_work = false; break;
    }
    return to_much_work;
  }

  /**
   * @param {parentA} 1st parent
   * @param {parentB} 2nd parent
   * @returns the new individual after crossment
   */
  crossover(parentA, parentB) {
      // Duplicate parentA
      var newIndividual = Object.assign({}, parentA);
      
      // Remove the last orderId from the new object
      var dictAsList = Object.entries(newIndividual.assignments);

      var lastTuple = dictAsList[dictAsList.length-1];

      var lastList = lastTuple[1];

      var lastOrderId = lastList[lastList.length-1];

      var oldAgentId = lastTuple[0];

      var newAgentId = -1;

      for(var agId in parentB.assignments){
          for(let i=0 ; i<parentB.assignments[agId].length ; i++){
            if(parentB.assignments[agId][i] == lastOrderId){
              newAgentId = agId;
              break;
            }
          }
          if(newAgentId != -1){
              break;
          }
      }

      newIndividual.assignments[oldAgentId].pop();
      newIndividual.assignments[newAgentId].push(lastOrderId);

      if(! this.isValid(newIndividual)){
          return parentA;
      }
      return newIndividual;

  }

  /**
  * Mutate and individual (modifies the recevied Individual)
  * Doesn't return anything
  * Strategy: Find 2 agents that can accomplish the same task and swap an order
  *           between them
  * If couldn't find those 2 agents return the individual unmodified
  */
  mutate(individual){

    var codes = this.services.map(function(order){
     return order.serviceCode;
    });

    //console.log("codes",codes);

    // Try to find a code that 2 agent have in common
    for (var serviceCodeIndex in codes){
     var serviceCode = codes[serviceCodeIndex];
     // console.log("trying to find common in ",serviceCode);
     var commons = this.agents.filter(agent => agent.services.indexOf(serviceCode) != -1);
     console.log("commons", commons);
     if( 2 <= commons.length){

      // All orders that have the matched code in agents
      var servOrders = this.services.filter(order => order.serviceCode == serviceCode);
      var agentIdToChange = -1;
      var otherIdToChange = -1;
      // OrderId of an order with the matched code
      var serviceOrderId = servOrders[0].id;

      for(var agId in individual.assignments){
       for(let i=0 ; i<individual.assignments[agId].length ; i++){
        if(individual.assignments[agId][i] == serviceOrderId){
         agentIdToChange = agId;
         break;
        }

       }
       if(agentIdToChange != -1){
        break;
       }
      }

      for (let i = 0; i < commons.length; i++) {
       if(commons[i].id != agentIdToChange){
        otherIdToChange = commons[i].id;
        break;
       }
      }

      var from = individual.assignments[agentIdToChange];
      var to = individual.assignments[otherIdToChange];

      to.push(from.pop());
      return;

     }
     else{
      console.log("Not able to mutate");
     }
    }
    console.log("Not able to mutate");
  }

  // Returns an Integer number between the min and max (both included)
  getRandomInt(min, max){
    return Math.round(Math.random() * (max - min)) + min;
  }


  getRandomAgentId(){
    var index = this.getRandomInt(0, this.agents.length-1);
    //console.log("index random", index, this.agents);
    return this.agents[index].id;
  }

  getTotalWorkingHours(agentId, dict){
    // console.log("agId", agentId, "dict", dict);
    //console.log(dict);
    var hours = 0;
    var ordersIds = dict[agentId];
    // console.log("getIds",ordersIds);
    ordersIds.forEach(function(orderId){
      var serviceCode = this.serviceOrdersMapping[orderId].serviceCode;
      hours += ServiceCodes[serviceCode].duration;
    }.bind(this));
    //console.log("agent ",agentId, " has ",hours, " hours");
    return hours;
  }

  getRandomIndividual(){
    var individual = {};
    // Initialize every agent without orders assigned
    for(var agentId in this.agentsMapping){
      individual[agentId] = [];
    }

    var currentAgentId, currentOrderId;

    for(let i=0; i < this.services.length; i++){

      currentOrderId = this.services[i].id;
      var maxTries = 4;
      var done = false;

      while(0<maxTries && ! done){

        // Look for a random agent
        currentAgentId =  this.getRandomAgentId();

        // Check if it can handle this job and is not overworking TODO: check can handle
        if(this.getTotalWorkingHours(currentAgentId, individual) < 40){
          individual[currentAgentId].push(currentOrderId);
          done = true;
        }
        maxTries -= 1;
      }
    }
    return new Individual(individual, agentsMapping, serviceOrdersMapping);
  }


}
