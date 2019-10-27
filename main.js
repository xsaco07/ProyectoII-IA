var agentXMLContent = "";
var serviceXMLContent = "";

const agentFileField = document.getElementById('agent-file-input');
const serviceFileField = document.getElementById('service-file-input');

var agentModalButton = document.querySelectorAll('.modal-btn')[0];
var serviceModalButton = document.querySelectorAll('.modal-btn')[1];

var agents = [];
var services = [];

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

    }
    else {

      services = XMLParser.parseServiceFile(reader.result);

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

    }
  }
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
