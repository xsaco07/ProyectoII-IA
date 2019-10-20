const inputFileField = document.querySelector('input[type=file]');
inputFileField.addEventListener('change', readFile); // When an input file is loaded

function readFile() {

  const reader = new FileReader();
  const inputFile = inputFileField.files[0] // Get the file loaded by the user

  reader.readAsText(inputFile);

  reader.onload = function() { // When the file load is done do something
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(reader.result,"text/xml");
    var content = xmlDoc.getElementsByTagName("name");
    for (var i = 0; i < content.length; i++) {
      console.log(content[i].childNodes[0].nodeValue);
    }
    console.log(content);
    document.getElementById('file-name').innerHTML = inputFile.name;
  }
}

class XMLParser {

  static parseAgentFile(xmlContent) {
    var agentParsed = null;
    var services = []
    var agentId = "", name = "";

    parser = new DOMParser();
    xmlDoc = parser.parseFromString(xmlContent,"text/xml");
    var XMLagents = xmlDoc.getElementsByTagName("agent");
    for (var i = 0; i < XMLagents.length; i++) {
      agentId = XMLagents[i].getAttribbute('id');
      name = XMLagents[i].getAttribbute('name');
      var XMLservices = XMLagents[i].childNodes;
      for (var i = 0; i < array.length; i++) {
        array[i]
      }
    }


  }

  static parseServiceFile(xmlContent) {

  }
}
