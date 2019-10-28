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

		// Aquí va la lógica del flujo general del algoritmo genético @IsaacMena

		/*
		Se deben recibir los siguientes parametros:
		* pop_size (tamano de la poblacion que se generara al inicio para comenzar el algoritmo)
		* elite_prop (proporcion de individuos que pasaran sus genes a la siguiente generacion)
		* mutate_prob (probabilidad de mutacion de los individuos)
		* max_iter (cantidad maxima de iteraciones a ejectuar)
		*/
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
