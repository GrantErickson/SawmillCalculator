// Handles the cutlist logic.
// Must call this so that we don't get more than one pageinit called.
$("#pageCutList").on("pageinit", function() {
	// Model for calculations and storing data.
	var CutListModel = function() {
		var self = this;
		
		self.kerf = ko.observable(Number(window.localStorage.getItem("Kerf")) || 2);
		self.thickness = ko.observable(Number(window.localStorage.getItem("Thickness")) || 13);
		self.total = ko.observable(Number(window.localStorage.getItem("Total")) || 6);
		self.flitch = ko.observable(Number(window.localStorage.getItem("Flitch")) || 0);
		
		self.cutList = ko.observableArray();
		
		self.calculate = function() {
			self.cutList.removeAll();

			var index = 1;
			
			// Calculate everything in 32nds of an inch.
			// Add the starting spot.
			var currentCut = Number(self.flitch())*16;
			// Add the flitch cut if necessary
			if (currentCut > 0){ 
			    if (settingsModel.sideOfBlade() == 'top') {
			        currentCut += Number(self.kerf());
			    }
				self.cutList.push(textFrom32nd(currentCut, index));
			    if (settingsModel.sideOfBlade() == 'bottom') {
			        currentCut += Number(self.kerf());
			    }
				index ++;
			}

			// Loop and figure out all the cuts.			
			while (currentCut <= Number(self.total()*32)){
				currentCut += Number(self.thickness()*4);
				if (settingsModel.sideOfBlade() == 'top') {
					currentCut += Number(self.kerf());
				}
				if (currentCut > 0){ 
					self.cutList.push(textFrom32nd(currentCut, index));
					index++;
				}
				if (settingsModel.sideOfBlade() == 'bottom') {
					currentCut += Number(self.kerf());
				}
			}
			
			self.cutList.reverse();
			
		};


		// Save the values when changed.	
		self.kerf.subscribe(function(value) {
			window.localStorage.setItem("Kerf",value);
			self.calculate();
		});
		self.thickness.subscribe(function(value) {
			window.localStorage.setItem("Thickness",value);
			self.calculate();
		});
		self.total.subscribe(function(value) {
			window.localStorage.setItem("Total",value);
			self.calculate();
		});
		self.flitch.subscribe(function(value) {
			window.localStorage.setItem("Flitch",value);
			self.calculate();
		});
		
		function textFrom32nd(x, index){
			var inches = Math.floor(x/32);
			var fraction = x - (inches * 32);
			var ftext = "";
			switch(fraction){
			    case 0: ftext=""; break;
			    case 1: ftext="1/32"; break;
			    case 2: ftext="1/16"; break;
			    case 3: ftext="3/32"; break;
			    case 4: ftext="1/8"; break;
			    case 5: ftext="5/32"; break;
			    case 6: ftext="3/16"; break;
			    case 7: ftext="7/32"; break;
			    case 8: ftext="1/4"; break;
			    case 9: ftext="9/32"; break;
			    case 10: ftext="5/16"; break;
			    case 11: ftext="11/32"; break;
			    case 12: ftext="3/8"; break;
			    case 13: ftext="13/32"; break;
			    case 14: ftext="7/16"; break;
			    case 15: ftext="15/32"; break;
			    case 16: ftext="1/2"; break;
			    case 17: ftext="17/32"; break;
			    case 18: ftext="9/16"; break;
			    case 19: ftext="19/32"; break;
			    case 20: ftext="5/8"; break;
			    case 21: ftext="21/32"; break;
			    case 22: ftext="11/16"; break;
			    case 23: ftext="23/32"; break;
			    case 24: ftext="3/4"; break;
			    case 25: ftext="25/32"; break;
			    case 26: ftext="13/16"; break;
			    case 27: ftext="27/32"; break;
			    case 28: ftext="7/8"; break;
			    case 29: ftext="29/32"; break;
			    case 30: ftext="15/16"; break;
			    case 31: ftext="31/32"; break;
			}
			
			var result;
			if (inches > 0 && ftext != ""){
				result = inches + "-" + ftext + '"';
			}else if (inches > 0 && ftext==""){
				result = inches + '"';
			}else{
				result = ftext + '"';				
			}
			
			return {measurement: result, id: "Index" + index, checked:false};
		}

	};
			
   	var cutListModel = new CutListModel();
	
	ko.applyBindings(cutListModel, document.getElementById("pageCutList"));


});

ko.bindingHandlers.checkbox = {
	init: function(element){
        $(element).checkboxradio();
        //$(element).attr("checked", false).checkboxradio("refresh");
	},
    update: function(element, valueAccessor) {
        $(element).checkboxradio("refresh");
    }
};
