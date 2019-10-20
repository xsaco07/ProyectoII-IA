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

class XMLParser {

  static parseAgentFile(xmlContent) {

    var agentsParsed = [];
    var agentId = "", agentName = "";

    // Initialize parser to parse XML files
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xmlContent,"text/xml");

    // Get a list with all agents in the file
    var XMLagents = xmlDoc.getElementsByTagName("agent");

    for (var i = 0; i < XMLagents.length; i++) {

      // Clean services list on each iteration
      var services = []

      agentId = XMLagents[i].getAttribute('id');
      agentName = XMLagents[i].getAttribute('name');

      // Get a list of services for each agent
      var XMLservices = XMLagents[i].children;
      for (var j = 0; j < XMLservices.length; j++) {
        // Save it's serviceCode
        services.push(XMLservices[j].textContent);
      }

      // Save each new Agent object
      agentsParsed.push(new Agent(agentId, agentName, services));
    }

    return agentsParsed;

  }

  static parseServiceFile(xmlContent) {
    var servicesParsed = [];
    var serviceId = "", serviceCode = "", clientName = "";

    // Initialize parser to parse XML files
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xmlContent,"text/xml");

    // Get a list with all agents in the file
    var XMLservices = xmlDoc.getElementsByTagName("service");

    for (var i = 0; i < XMLservices.length; i++) {

      serviceId = XMLservices[i].getAttribute('id');
      serviceCode = XMLservices[i].getAttribute('code');
      clientName = XMLservices[i].children[0].textContent;

      // Save each new Service object
      servicesParsed.push(new ServiceOrder(serviceId, clientName, serviceCode));
    }

    return servicesParsed;
  }
}

function fileLoaded() {

  const reader = new FileReader();
  const inputFile = inputFileField.files[0] // Get the file loaded by the user

  reader.readAsText(inputFile);

  reader.onload = function() { // When the file reading is done do something
    // var agents = XMLParser.parseAgentFile(reader.result);
    // console.log(agents);
    var services = XMLParser.parseServiceFile(reader.result);
    console.log(services);
    
    document.getElementById('file-name').innerHTML = inputFile.name;
  }
}

const inputFileField = document.querySelector('input[type=file]');
inputFileField.addEventListener('change', fileLoaded); // When an input file is loaded
