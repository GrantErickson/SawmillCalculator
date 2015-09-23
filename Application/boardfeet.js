// Handles the board feet logic.
// Must call this so that we don't get more than one pageinit called.
$("#pageBoardFeet").on("pageinit", function() {
	// Model for calculations and storing data.
	var BoardFeetModel = function() {
		var self = this;
		
		// Values for the calculation.
		self.width = ko.observable(Number(window.localStorage.getItem("BfWidth")) || 6);  // Inches
		self.thickness = ko.observable(Number(window.localStorage.getItem("BfThickness")) || 2);  // Inches
		self.length = ko.observable(Number(window.localStorage.getItem("BfLength")) || 16);  // Feet
		self.quantity = ko.observable(Number(window.localStorage.getItem("BfQuantity")) || 1);  // Count

		// Calculate the total
		self.total = ko.computed(function() {
			var value = Number(self.width()) 
					* Number(self.thickness()) 
					* Number(self.length()) 
					* Number(self.quantity()) 
					/ 12;
			return Math.round(value * 10) / 10;
		});
	
		// Save the values. 
		self.width.subscribe(function(value) {
			window.localStorage.setItem("BfWidth",value);
		});
		self.thickness.subscribe(function(value) {
			window.localStorage.setItem("BfThickness",value);
		});
		self.length.subscribe(function(value) {
			window.localStorage.setItem("BfLength",value);
		});
		self.quantity.subscribe(function(value) {
			window.localStorage.setItem("BfQuantity",value);
		});

	};
			
	// Create the model and apply it.
   	var boardFeetModel = new BoardFeetModel();
	
	ko.applyBindings(boardFeetModel, document.getElementById("pageBoardFeet"));

	$("#bfWidth").slider("refresh");
	$("#bfThickness").slider("refresh");
	$("#bfLength").slider("refresh");
	$("#bfQuantity").slider("refresh");


	// Work with the slider.
	ko.bindingHandlers.slider = {
	    init: function (element, valueAccessor) {
	        var val = valueAccessor()();
	        $(element).slider(
	                            {
	                                value: val,
	                                step: 1,
	                                slide: function (event, ui) {
	                                    valueAccessor()(ui.value);
	                                }
	                            });
	    },
	    update: function (element, valueAccessor) {
	        $(element).slider("option", "value", valueAccessor()());
	    }
	};

});


 
