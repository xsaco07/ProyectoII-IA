var agentXMLContent = "";
var serviceXMLContent = "";

const agentFileField = document.getElementById('agent-file-input');
const serviceFileField = document.getElementById('service-file-input');

var agentModalButton = document.querySelectorAll('.modal-btn')[0];
var serviceModalButton = document.querySelectorAll('.modal-btn')[1];
var resultModalButton = document.querySelectorAll('.modal-btn') [2];

var agents = [];
var services = [];

// Given the id return the object associated
var agentsMapping = {};
var serviceOrdersMapping = {};

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

      agents = XMLParser.parseAgentFile(reader.result);
      agentsMapping = createMapping(agents);

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

      if (services.length > 0){
        resultModalButton.disabled = false;
      }
    }
    else {

      services = XMLParser.parseServiceFile(reader.result);
      serviceOrdersMapping = createMapping(services);

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

      if (agents.length > 0){
        resultModalButton.disabled = false;
      }
    }
  }
}

// Create a dictionary from id's to the actual objects
function createMapping(myarray){
  var mapping = {};
  myarray.forEach(function(elem){
    mapping[elem.id] = elem;
  });
  return mapping;
}

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

  var i = 0;
  var modalBody = document.querySelector('#agentModal .modal-body');

  // To avoid append undefined number of nodes
  var tds = $(".new-agent-td")
  if(tds.length > 0) {
    console.log(tds.length);
    $(".new-agent-td").remove();
  }

  // Write content inside table
  while (i < agents.length){

    var modalID = document.createElement("td");
    var modalName = document.createElement("td");
    var modalServices = document.createElement("td");

    modalID.innerText = agents[i].id;
    modalID.className = "new-agent-td";
    modalName.innerText = agents[i].name;
    modalName.className = "new-agent-td";
    modalServices.innerText = agents[i].services;
    modalServices.className = "new-agent-td";

    modalBody.appendChild(modalID);
    modalBody.appendChild(modalName);
    modalBody.appendChild(modalServices);
    // Add a new row for each agent
    modalBody.appendChild(document.createElement(("tr")));

    i++;
  }

}

function showServiceXMLContent (xmlContent) {

  var i = 0;
  var modalBody = document.querySelector('#serviceModal .modal-body');

  // To avoid append undefined number of nodes
  var tds = $(".new-service-td")
  if(tds.length > 0) {
    console.log(tds.length);
    $(".new-service-td").remove();
  }

  // Write content inside table
  while (i < services.length){

    var modalID = document.createElement("td");
    modalID.className = "new-service-td";
    var modalName = document.createElement("td");
    modalName.className = "new-service-td";
    var modalServices = document.createElement("td");
    modalServices.className = "new-service-td";

    modalID.innerText = services[i].id;
    modalName.innerText = services[i].clientName;
    modalServices.innerText = services[i].serviceCode;

    modalBody.appendChild(modalID);
    modalBody.appendChild(modalName);
    modalBody.appendChild(modalServices);
    // Add a new row for each service
    modalBody.appendChild(document.createElement(("tr")));

    i++;
  }

}

//Create scheduler object and call functions to return best combination
function showResults () {

  if(!validateAgents()) alert("Los agentes en el XML no son capaces de solventar todas las ordenes de servicio");

  var solution = new Scheduler(agents, services, agentsMapping, serviceOrdersMapping);
  //Once we have the best individual, set the table to show the content correctly calling showResultFormated(individualContent)
  showResultFormated(solution);
}

function showResultFormated(individualContent){

  //Aquí va la logica para mostrar el individuo retornado en el método de arriba en el index.html @KennethVargas

}

// Validates that all services have at least one available agent
function validateAgents(){
  var dictionary = {};
  var validCounter = 0;
  //Creates dictionary of services by agents
  for (var i = 0; i < agents.length; i++) {
    var tmpService = agents[i].services;
    for (var j = 0; j < tmpService.length; j++) {
      var current = agents[i].services[0];
      dictionary[tmpService[j]] = 1;
    }
  }
  //Compares dictionary with required services
  for (var k = 0; k < services.length; k++) {
    for (var key in dictionary) {
      if (key == services[k].serviceCode) {
        console.log("Key is "+ key + " service is "+ services[k].serviceCode);
        validCounter += 1;
        dictionary[key] = 0;
      }
    }
  }
  if (validCounter == services.length) {
    console.log("Available agents!");
    return true
  }
  else
    console.log("No available agents!");
    return false
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

resultModalButton.addEventListener('click', function() {
  showResults();
});

hideModalButtons();

$(resultModalButton).show();

resultModalButton.disabled = true;
