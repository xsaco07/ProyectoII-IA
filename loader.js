const scripts = ["Domain","Scheduler.js","Agent.js","ServiceOrder.js","ServiceCodes.js","XMLParser.js"]
    scripts.forEach(function(name){
      var script = document.createElement('script');
      script.src = name;
      document.head.appendChild(script);
      console.log(name + " imported");
});
