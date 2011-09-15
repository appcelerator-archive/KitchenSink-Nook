NookKS = {};

NookKS.formatTableView = function(data) {
	for (var i = 0; i < data.length; i++) {
		data[i].hasChild = true;
		data[i].height = 70;
		data[i].font = {fontSize:24, fontWeight:'bold'};
		data[i].left = 20	
	}	
};