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