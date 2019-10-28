var numberOfIndividuals = 10;

//Returns an entire number between the min (included) and max (excluded) 
function getRandomInt(min, max){
	return Math.floor(Math.random() * (max - min)) + min;
}	

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

	/**
	 * @param {individual1} 1st individual
	 * @param {individual2} 2nd individual
	 * @returns the new individual after crossment 
	 */
	cross(individual1, individual2){

		//Aquí va la lógica del cruce

	}


	/**
	 * @param {population} list of Individuals
	 * @returns the best individual (solution)
	 */
	solveGenetics(population){

		//Aquí va la lógica del flujo general del algoritmo genético @IsaacMena

	}

	//Creates the initial population, crosses and mutates individuals and returns the best individual possible
	startProcess(){

		//Collect all agents
		 var agentsIds = [];
        this.agents.forEach(function(agent){
            agentsIds.push(agent.getId());
        });

        //Collect all orders
        var serviceOrdersIds = [];
        this.serviceOrders.forEach(function(serviceOrder){
        	serviceOrdersIds.push(serviceOrder.getId());
        });

        var population = [];



        for (let i = 0; i < numberOfIndividuals; i++) {

        	//var individual = "";

        	while(serviceOrdersIds.length > 0){

        		var randomServiceId = getRandomInt(0, serviceOrdersIds.length);
        		var randomAgentId = getRandomInt(0, agentsIds.length);
        		console.log(serviceOrdersIds[randomServiceId]+" " +agentsIds[randomAgentId]);

        		//Here we need to validate that the agent can perform the service and that it doesn't exceeds the 40 hours per agent
        		//if it accomplishes those two conditions, add to the dictionary the combination @EmmanuelAlfaro


        		//Remove the Service Order Id from the Service Order Id's list
        		serviceOrdersIds.splice(randomServiceId, 1);
        	}

        	//population.push(individual);

		}

		//solveGenetics(population);

	}
}

