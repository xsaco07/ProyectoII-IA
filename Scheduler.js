class Scheduler{

	/**
	 * @param {agents} list of Agents
	 * @param {services} list of Service Orders
	 */

    constructor(agents, serviceOrders){
        this.agents = agents;
        this.serviceOrders = serviceOrders;
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

	//Creates the initial population, crosses and mutates individuals and returns the best individual possible
	solveGenetics(){

		

	}

	
}

