class Domain {

  constructor(agents, services) {
    this.agents = agents;
    this.services = services;
  }

  generate_random_individual() {

  }

  is_solution(individual) {

    //return is_valid(individual) && individual.getFitness() == 0;

  }

  is_valid(individual) {
    // Revisar que no se sobrepasen las 40 horas
    // Revisar que la lista de codigos de servicios de todos los agentes coincidan con
    // las tareas que si puede resolver (las que venian en el XML)

    // return getTotalHours(individual) <= 40 && has_valid_services(individual)
  }

  has_valid_services(individual) {
    // Revisar que la lista de codigos de servicios de todos los agentes coincidan con
    // las tareas que si puede resolver (las que venian en el XML)
  }

  /**
   * @param {parentA} 1st parent
   * @param {parentB} 2nd parent
   * @returns the new individual after crossment
   */
  crossover(parentA, parentB) {

  }

  mutate(individual) {

  }




}
