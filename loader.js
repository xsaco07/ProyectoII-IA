<<<<<<< HEAD
const scripts = ["Domain","Scheduler.js","Agent.js","ServiceOrder.js","ServiceCodes.js","XMLParser.js"]
    scripts.forEach(function(name){
      var script = document.createElement('script');
      script.src = name;
      document.head.appendChild(script);
      console.log(name + " imported");
});
=======

const scripts = ["Agent.js","ServiceOrder.js","ServiceCodes.js","XMLParser.js","Individual.js","https://d3js.org/d3.v4.min.js","Scheduler.js"];
scripts.forEach(function(name){
    var script = document.createElement('script');
    script.src = name;
    document.head.appendChild(script);
    console.log(name + " imported");
});
>>>>>>> 4fa988351459f2e1188aa88679c225076e373453
