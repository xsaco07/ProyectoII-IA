class Scheduler{

	/**
	 * @param {agents} list of Agents
	 * @param {services} list of Service Orders
	 */

    constructor(agents, serviceOrders){
        this.agents = agents;
        this.serviceOrders = serviceOrders;
        
        // Given the id return the object associated 
        this.agentsMapping = this.createMapping(this.agents);
        this.ordersMapping = this.createMapping(this.serviceOrders);
    }
    
    // Create a dictionary from id's to the actual objects
    createMapping( myarray ){
		var mapping = {};
		myarray.forEach(function(elem){
			mapping[elem.id] = elem;
		});
		return mapping;
	}

    setServiceOrders(serviceOrders){
		this.serviceOrders = serviceOrders;
	}

	getServiceOrders(){
		return this.serviceOrders;
	}

	setAgents(agents){
		this.agents = agents;
	}

	getAgents(){
		return this.agents;
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
		//console.log("agId", agentId, "dict", dict);
		var hours = 0;
		var ordersIds = dict[agentId];
		//console.log("getIds",ordersIds);
		ordersIds.forEach(function(orderId){
			var serviceCode = this.ordersMapping[orderId].serviceCode;
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
		//console.log("after init", individual);
		var currentAgentId, currentOrderId;
		//console.log("before split", this.serviceOrders);
		
		for(let i=0 ; i<this.serviceOrders.length ; i++){
			currentOrderId = this.serviceOrders[i].id;
			//console.log("assigning order", currentOrderId);
			var maxTries = 4;
			var done = false;
			
			while(0<maxTries && ! done){
				// Look for a random agent
				currentAgentId =  this.getRandomAgentId();
				//console.log("trying to assing to agent ", currentAgentId);
				
				// Check if it can handle this job and is not overworking TODO: check can handle
				if( this.getTotalWorkingHours(currentAgentId, individual) < 4 ){
					individual[currentAgentId].push(currentOrderId);
					done = true;
					//console.log("done");
					//console.log("agent ",currentAgentId," now has ",individual[currentAgentId]);
				}
				maxTries -= 1;
				
				
			}
		}
		
		return individual;
	}
	
	
	// Returns a list of -size- individuals generated randomly
	createInitialPopulation(size){
		var individuals = [];
		while(0 < size){
			individuals.push(this.getRandomIndividual());
			size--;
		}
		return individuals;
	}

	
	// Creates the initial population, crosses and mutates individuals and returns the best individual possible
	solveGenetics(){
		var pop = this.createInitialPopulation(4);
		console.log("Population ",pop);

	}

	
}

