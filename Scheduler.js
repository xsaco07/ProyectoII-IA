class Scheduler{

	/**
	 * @param {agents} list of Agents
	 * @param {services} list of Service Orders
	 * @param {services} Domain
	 */

    constructor(agents, serviceOrders, agentsMapping, serviceOrdersMapping){
				this.domain = new Domain(agents, serviceOrders, agentsMapping, serviceOrdersMapping);
        this.agents = agents;
        this.serviceOrders = serviceOrders;
				this.solveGenetics(500, 0.25, 0.05, 1000);
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

			var poblacion = []; // aca van los individuos ordenados por fitness

			// Generar poblacion inicial
			for(var i = 0; i < pop_size; i++) {

				var individuo = this.domain.getRandomIndividual();

				// Verificamos si es solucion
				if(this.domain.isSolution(individuo)){
					console.log("Individuo solucion encontrado en pob inicial: ", individuo);
					console.log("Fitness final", individuo.getFitness());

					return individuo;
				}

				// Se inserta ordenadamente el nuevo individuo
				poblacion.splice(0, this.getOrderedIndex(poblacion, individuo.getFitness()), individuo);

			}

			while(max_iter > 0) {

				// Cantidad de individuos que se van a cruzar
				var cant_padres = Math.floor(poblacion.length * elite_prop);
				// Tome los mejores (cant_padres) individuos de la poblacion
				var siguiente_generacion = poblacion.slice(cant_padres+1);
				// Cantidad de hijos a generar
				var cant_hijos = poblacion.length - cant_padres;

				while(cant_hijos > 0) {

					// Seleccionamos 2 padres para cruzar
					var padreA = siguiente_generacion[this.getRandomInt(0, siguiente_generacion.length-1)];
					var padreB = siguiente_generacion[this.getRandomInt(0, siguiente_generacion.length-1)];

					// Obtiene un hijo mediante el cruce
					var hijo = this.domain.crossover(padreA, padreB);

					// Generar una probabilidad random entre 0 y 1
					// Esto para ver si mutamos o no el hijo recien creado
					var prob = Math.random();

					// Si la probabilidad esta dentro del rango se muta el individuo
					if(prob <= mutate_prob) {
						do {
							this.domain.mutate(hijo);
							console.log("Mutated")
						} while (!this.domain.isValid(hijo)) {
							console.log("Mutating");
							this.domain.mutate(hijo);
						}
					}

					// Verificamos si es solucion
					if(this.domain.isSolution(hijo)) {
						console.log("Fitness final", poblacion[0].getFitness());
						console.log("Individuo solucion encontrado: ", hijo);
						return hijo;
					}

					// Se inserta ordenadamente el nuevo individuo
					siguiente_generacion.splice(0, this.getOrderedIndex(siguiente_generacion, hijo.getFitness()), hijo);

					cant_hijos --;
				}
				max_iter --;
				poblacion = siguiente_generacion;
			}

			console.log("Iteraciones concluidas");
			console.log("El mejor individuo encontrado fue: ", poblacion[0]);
			console.log("Fitness final", poblacion[0].getFitness());
			return poblacion[0];
		}

		getOrderedIndex(poblacion, aptitud) {
			for (var i = 0; i < poblacion.length; i++) {
				if(poblacion[i].getFitness() > aptitud) return i;
			}
			return 0;
		}

		//Returns an entire number between the min (included) and max (excluded)
		getRandomInt(min, max){
			return Math.floor(Math.random() * (max - min)) + min;
		}

	}
