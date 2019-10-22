var agentXMLContent = "";
var serviceXMLContent = "";

const agentFileField = document.getElementById('agent-file-input');
const serviceFileField = document.getElementById('service-file-input');

var agentModalButton = document.querySelectorAll('.modal-btn')[0];
var serviceModalButton = document.querySelectorAll('.modal-btn')[1];

//------------------------------------------------------------------------------

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

// parseFlag = false -> parseAgent
// parseFlag = true -> parseService
function fileLoaded(parseFlag) {

  const reader = new FileReader();
  var inputFile = null;

  if (!parseFlag) {
    $(agentModalButton).show(); // Show modal button using JQuery
    inputFile = agentFileField.files[0] // Get the agent file loaded by the user
  }
  else {
    $(serviceModalButton).show(); // Show modal button using JQuery
    inputFile = serviceFileField.files[0] // Get the service file loaded by the user
  }

  reader.readAsText(inputFile);

  reader.onload = function() { // When the file reading is done do something

    // Create new nodes to update the drop zone with text and change icon
    var hNode = document.createElement("h5");
    var fileNameNode = document.createTextNode("Archivo subido: " + inputFile.name);
    hNode.appendChild(fileNameNode);
    hNode.style.color = "white";

    if (!parseFlag) {

      var agents = XMLParser.parseAgentFile(reader.result);

      // Update agentXMLContent global
      agentXMLContent = reader.result;

      document.getElementById('agent-file-name').innerHTML = inputFile.name;

      document.getElementById('agent-icon').setAttribute("class", "fas fa-check");

      hNode.id = "success-agent-load";

      // To avoid append undefined number of nodes
      // Remove it if already exists
      if (document.getElementById('success-agent-load') != null) {
        document.getElementById('success-agent-load').remove();
      }

      document.getElementById('agent-drop').appendChild(hNode);

      console.log(agents);
    }
    else {

      var services = XMLParser.parseServiceFile(reader.result);

      // Update serviceXMLContent global
      serviceXMLContent = reader.result;

      document.getElementById('service-file-name').innerHTML = inputFile.name;

      document.getElementById('service-icon').setAttribute("class", "fas fa-check");

      hNode.id = "success-service-load";

      // To avoid append undefined number of nodes
      // Remove it if already exists
      if (document.getElementById('success-service-load') != null) {
        document.getElementById('success-service-load').remove();
      }

      document.getElementById('service-drop').appendChild(hNode);

      console.log(services);
    }
  }
}

//------------------------------------------------------------------------------

function hideModalButtons() {
  document.querySelectorAll('.modal-btn').forEach(function(currentValue, currentIndex, listObj) {
    currentValue.style.display = "none";
  });
}

function showModalButtons() {
  document.querySelectorAll('.modal-btn').forEach(function(currentValue, currentIndex, listObj) {
    currentValue.style.display = "block";
  });
}

function showAgentXMLContent(xmlContent) {
  // Get corresponding modal div to write the content
  var modalBody = document.querySelector('#agentModal .modal-body');

  // Create a <p> to hold the XML text
  var modalBodyText = document.createElement("p");
  modalBodyText.innerText = xmlContent;
  modalBodyText.id = "modal-body-text";

  // To avoid append undefined number of nodes
  if (document.getElementById("modal-body-text") != null) {
    document.getElementById("modal-body-text").remove();
  }

  modalBody.appendChild(modalBodyText);
}

function showServiceXMLContent (xmlContent) {
  // Get corresponding modal div to write the content
  var modalBody = document.querySelector('#serviceModal .modal-body');

  // Create a <p> to hold the XML text
  var modalBodyText = document.createElement("p");
  modalBodyText.innerText = xmlContent;
  modalBodyText.id = "modal-body-text";

  // To avoid append undefined number of nodes
  if (document.getElementById("modal-body-text") != null) {
    document.getElementById("modal-body-text").remove();
  }

  modalBody.appendChild(modalBodyText);
}

//------------------------------------------------------------------------------

agentFileField.addEventListener('change', function(){
  fileLoaded(false); // When an input agent file is loaded
});

serviceFileField.addEventListener('change', function() {
  fileLoaded(true);
}); // When an input service file is loaded

agentModalButton.addEventListener('click', function() {
  showAgentXMLContent(agentXMLContent);
});

serviceModalButton.addEventListener('click', function() {
  showServiceXMLContent(serviceXMLContent);
});

hideModalButtons();
