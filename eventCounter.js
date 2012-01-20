/*
 * Event Counter
 * Dependancies:  jquery
 
  Sets up an eventCounter [named {counterId}] that counts the number 
  of times {eventType} is fired on $(element) and every {every} times the
  eventType occurs, will fire {onTrigger}
  
  onTrigger gets passed
  	1.  The event
  	2.  The full set of elements that the counter is listening to
 
 	
 	Additional methods:
 	$(elements).eventCounter('destroy' [,counterId])
		removes all tracking from $(elements), or just the tracking from counterId
	$(elements).eventCounter('add', counterId)
		adds $(elements) to the counterId tracking set
 *
*/
 
(function($){
  //default settings - all selectors can also be nodeLists
  var settings = {
    every: 1,
    eventType: 'click',
    onTrigger: function() {
    },
    counterId: ''
  };
  
  /*
		Private Vars
	*/
  var triggerElementSets = {};
	var eventCounters = {};
	var optionSets = {};
  var i; //tracks internally generated ids for elementSets
  
	/*
    Private Methods
  */
	//return the namespace appended with an id, if passed in
	var generateNamespace = function(id) {
		return '.eventCounter.'+(id?id:'');
	};

	//handles an event click, incrementing the counter and trigger callback
	var handleEvent = function(event, options) {
		eventCounters[options.counterId]++; //count the event
		if (eventCounters[options.counterId]%options.every === 0) {
			options.onTrigger(event, triggerElementSets[options.counterId]);
		}
	};
	
	var incrementCounter = function(event,counterId) {
		handleEvent(event,optionSets[counterId]);
	}
	
	//binds a set of elements to the specified event and adds to elementSets
	var addToElementSet = function(elements, options) {		
		var id = options.counterId;
		//bind
		var namespace = generateNamespace(options.counterId);
		elements.bind(options.eventType+namespace,
									function(event){handleEvent(event, options);});
		//add to element sets
		triggerElementSets[id] = $(triggerElementSets[id]).add(elements);
	};
	
	//unbinds events and removes all $(elements) from the element set with [id]
	var removeFromElementSet = function(elements, id) {
		//unbind
		var options = optionSets[id];
    var namespace = generateNamespace(id);
		elements.unbind(options.eventType+namespace);
		//remove from element set
		triggerElementSets[id] = jQuery.grep(triggerElementSets[id], function(el) {
			return (!($.inArray(el, elements) !== -1)); 
		});
	};

	//verifys that a counter has been instantiated with a set id
	//if fails, $.error will throw and cancel execution of calling function
	var checkId = function(id) {
		if (!triggerElementSets.hasOwnProperty(id)) {
			$.error('No eventCounter exists with id '+id);
		}
	};
	
  /*
		Public Methods
	*/
  var methods = {
    init: function(options) { 
      //override default settings by anything passed in with options
      if (options) { 
        $.extend( settings, options );
      }			
			//generate an id if the user didn't pass one in
      if (!options.counterId) { i++; options.counterId = 'counter'+i; }
      triggerElementSets[options.counterId] = $();
			eventCounters[options.counterId] = 0;
			optionSets[options.counterId] = options;
      addToElementSet(this, options);
			//maintain chainability
			return this;
    },
    
    //removes all eventCounter-bound events from elements
		//id - the options.counterId passed in by the user, or generated internally
    destroy: function(id) {
			//if we have the id, dump the elements from just the specified set
			if (id) {
				checkId(id);
				removeFromElementSet(this, id);
			}
			//otherwise, we need to dump the elements out of all of possible sets
			else {
				for(var prop in triggerElementSets) {
					if (triggerElementSets.hasOwnProperty(prop)) {
						removeFromElementSet(this, prop);
					}
				}
			}
			//maintain chainability
    	return this;
    },
		
		add: function(id) {
			checkId(id);
			addToElementSet($(this), optionSets[id]);
			//maintain chainability
			return this;
		},
		
		increment: function(event,id) {
			checkId(id);
			incrementCounter(event,id);
			return this;
		}
  };		

  //Initialize the Plugin
  $.fn.eventCounter = function(method) {  
    // Method calling logic
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      //stored to count clicks from the elements
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method '+method+' does not exist on jQuery.eventCounter');
    }    
  };  
}(jQuery));