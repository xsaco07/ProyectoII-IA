class ServiceOrder{
	
	constructor(id, clientName, serviceCode){
		this.id = id;
		this.clientName = clientName;
		this.serviceCode = serviceCode;
	}

	setId(id){
		this.id = id;
	}

	setClientName(clientName){
		this.clientName = clientName;
	}

	setServiceCode(serviceCode){
		this.serviceCode = serviceCode;
	}


	getId(){
		return this.id;
	}

	getClientName(){
		return this.clientName;
	}


	getServiceCode(){
		return this.serviceCode;
	}
}

module.exports = ServiceOrder;