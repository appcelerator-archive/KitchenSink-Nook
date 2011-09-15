// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();
var formatTableView = function(data) {
	for (var i = 0; i < data.length; i++) {
		data[i].hasChild = true;
		data[i].height = 70;
		data[i].font = {fontSize:24, fontWeight:'bold'};
		data[i].left = 20	
	}
};

var win1 = Titanium.UI.createWindow({  
    title:'Base UI',
    url:'main_windows/base_ui.js',
    formatTableView: formatTableView
});
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Base UI',
    window:win1
});

var win2 = Titanium.UI.createWindow({  
    title:'Controls',
    url:'main_windows/controls.js',
    formatTableView: formatTableView
});
var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Controls',
    window:win2
});

var win3 = Titanium.UI.createWindow({  
    title:'Miscellaneous',
    url:'main_windows/phone.js',
    formatTableView: formatTableView
});
var tab3 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Miscellaneous',
    window:win3
});

var win4 = Titanium.UI.createWindow({  
    title:'Platform',
	url:'main_windows/platform.js',
    formatTableView: formatTableView
});
var tab4 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Platform',
    window:win4
});

var win5 = Titanium.UI.createWindow({  
    title:'Mashups',
    url:'main_windows/mashups.js',
    formatTableView: formatTableView
});
var tab5 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Mashups',
    window:win5
});

tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  
tabGroup.addTab(tab3);  
tabGroup.addTab(tab4);  
tabGroup.addTab(tab5);  

// open tab group
tabGroup.open();
