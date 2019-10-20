class Agent{

	/**
	 * @param {string} id 
	 * @param {string} name 
	 * @param {array} services - list of ServiceCodes
	 */
	constructor(id, name, services){
		this.id = id;
		this.name = name;
		this.services = services; 
	}

	setId(id){
		this.id = id;
	}

	setName(name){
		this.name = name;
	}

	setServices(services){
		this.services = services;
	}


	getId(){
		return this.id;
	}

	getName(){
		return this.name;
	}


	getServices(){
		return this.services;
	}


}


module.exports = Agent;