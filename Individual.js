class Individual{

    /**
     * @param agents A list of Agent objects
     * @param serviceOrders A list of ServiceOrder objects
     */
    constructor(assignments){
        /**
         * Dictionary with ints as keys and lists as values 
         * The key is the agent id
         * The value is the list of the orders ids assigned to that agent
         */
        this.assignments = assignments;
        
    }


    /**
     * @param individual An instance of this class
     * @returns Another Individual instance, product of crossing 
     *          the parameter and this object itself
     */
    cross(individual){

    }


    /**
     * Mutates itself, doesn't return anything
     */
    mutate(){

    }
    
    
    
    
    /** 
     * Returns a float that means how good it is
     * The higher the value the better the individual
     * Criteria Used: 
     *    - Look for low variance in the agents commissions 
     *    - Look for that no agent will work more than 40 hours a week in total 
     */
     
     /* 
    getFitness(){
        // Fill this list with the sum of the commissions of each agent to calculate its variance
        var agentsCommissions = [];

        // Fill this list with the sum of the total hours of each agent
        var agentsWorkingHours = [];

        for(var agentId in this.assignments){
            var agentTotalComission = 0;
            var agentTotalWorkingHours = 0;

            // Get it's assigned orders
            var ordersIds = this.assignments[agentId];
            console.log("ordersIds");
            console.log(ordersIds);

            // Loop to all its serviceOrders
            for (let i = 0; i < ordersIds.length; i++) {
                var orderId = ordersIds[i];
                // Sum its commission               
                agentTotalComission += this.serviceOrdersMap[orderId].serviceCode.commission;
                // Sum its duration
                agentTotalWorkingHours += this.serviceOrdersMap[orderId].serviceCode.duration;
            }

            // Append the values to the lists
            agentsCommissions.push(agentTotalComission);
            agentsWorkingHours.push(agentTotalWorkingHours);
            
        }

        console.log("Commisions list ", agentsCommissions);
        console.log("Hours list ", agentsWorkingHours);    
        
        // Calculate commissions variance 
        var commissions_variance = d3.variance(agentsCommissions);
        console.log("commissions variance",commissions_variance);

        // Check no agent will work > 40 hours 
        const tooMuchHours = function(n){ return n>40; };
        var tooMuchWork = agentsWorkingHours.some(tooMuchHours);
            
        // If too much work then make fitness negative to lower the value  
        var multiplier = (tooMuchWork) ? -1 : 1;

        // Take 1/variance for getting high values when low variance
        var value = 1/commissions_variance;
        
        console.log("Fitness ", multiplier*value);

        // Return the final fitness number
        return multiplier * value;
    }
   
    * */
}
