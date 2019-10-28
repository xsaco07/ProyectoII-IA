var numberOfIndividuals = 10;

//Returns an entire number between the min (included) and max (excluded)
function getRandomInt(min, max){
	return Math.floor(Math.random() * (max - min)) + min;
}

class Scheduler{

	/**
	 * @param {agents} list of Agents
	 * @param {services} list of Service Orders
	 * @param {services} Domain
	 */

    constructor(agents, serviceOrders){
				this.domain = domain;
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

	/**
	 * @param {pop_size} int tamano de la poblacion que se generara al inicio para
	 comenzar el algoritmo
	 * @param {elite_prop} float proporcion de individuos que pasaran sus genes a
	 la siguiente generacion
	 * @param {mutate_prob} float probabilidad de mutacion de los individuos
	 comenzar el algoritmo
	 * @param {max_iter} int cantidad maxima de iteraciones a ejectuar
	 * @returns the best individual (solution)
	 */
	solveGenetics(pop_size, elite_prop, mutate_prob, max_iter){

		// Aquí va la lógica del flujo general del algoritmo genético @IsaacMena

		/*

		// Pseudocodigo //

		poblacion = [] // aca van los individuos ordenados por fitness

		// Generar pobalcion inicial
		for i = 0 to pop_size:

			individuo = dominio.generate_random_individuo()

			// Verificamos si es solucion
			if dominio.es_solucion(individuo)
				mostrar_individuo(individuo)
				return

			poblacion.insert_ordenado(individuo)

		while max_iter > 0:

				// Cantidad de individuos que se van a cruzar
				cant_padres = floor(poblacion.length() * elite_prop)

				// Tome los mejores (cant_padres) individuos de la poblacion
				siguiente_generacion = [0:cant_padres]

				// Cantidad de hijos a generar
				cant_hijos = poblacion.length() - cant_padres

				while hijos > 0:

					// Seleccione 2 padres para cruzar
					padreA = siguiente_generacion[random]
					padreB = siguiente_generacion[random]

					// Obtiene un hijo mediante el cruce
					hijo = dominio.cruzar(padreA, padreB)

					// Generar una probabilidad random entre 0 y 1
					// Esto para ver si mutamos o no el hijo recien creado
					prob_random = generador_de_probabilidad_random(0, 1)

					if prob_random <= mutate_prob:
						hijo = dominio.mutar(hijo)

					// Verificamos si es solucion
					if dominio.es_solucion(individuo)
						mostrar_individuo(individuo)
						return

					siguiente_generacion.insert_ordenado(hijo)

					children -= 1

				poblacion = siguiente_generacion

				max_iter -= 1

		// Mostrar mejor mejor individuo encontrado en caso de que no encontrar solucion
		mostrar_individuo(poblacion[0])
		*/
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
