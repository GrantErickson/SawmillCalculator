// Standard settings code so everyone can get to the settings.
// Handles the settings logic.
var SettingsModel = function() {
	var self = this;
	
	// Settings to save.
	self.sideOfBlade = ko.observable(window.localStorage.getItem("sideOfBlade") || "bottom");  // Inches

	// Save the values. 
	self.sideOfBlade.subscribe(function(value) {
		window.localStorage.setItem("sideOfBlade",value);
	});
};
			
// Create the model and apply it.
var settingsModel = new SettingsModel();





 
