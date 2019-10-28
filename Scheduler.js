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
	constructor(agents, serviceOrders, domain){
		this.domain = domain;
		this.agents = agents;
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

}
