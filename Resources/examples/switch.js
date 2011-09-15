var win = Titanium.UI.currentWindow;

//
// BASIC SWITCH
//
var basicSwitchLabel = Titanium.UI.createLabel({
	text:'Basic Switch value = false' ,
	color:'#999',
	font:{
		fontFamily:'Helvetica Neue',
		fontSize:15
	},
	textAlign:'center',
	top:10,
	height:'auto'
});

var basicSwitch = Titanium.UI.createSwitch({
	value:false,
	top:30
});

basicSwitch.addEventListener('change',function(e)
{
	basicSwitchLabel.text = 'Basic Switch value = ' + e.value + ' act val ' + basicSwitch.value;
});

//
// CHANGE SWITCH
//
var changeButton = Titanium.UI.createButton({
	title:'Change Switch',
	height:40,
	width:200,
	top:90
});
changeButton.addEventListener('click', function()
{
	if (basicSwitch.value === false)
	{
		basicSwitch.value = true;
	}
	else
	{
		basicSwitch.value = false;
	}
});

//
// HIDE/SHOW SWITCH
//
var hideShowButton = Titanium.UI.createButton({
	title:'Hide/Show Switch',
	height:40,
	width:200,
	top:140
});
var hidden=false;
hideShowButton.addEventListener('click', function()
{
	if (hidden === true)
	{
		basicSwitch.show();
		hidden=false;
	}
	else
	{
		basicSwitch.hide();
		hidden=true;
	}
});

win.add(basicSwitchLabel);
win.add(basicSwitch);
win.add(changeButton);
win.add(hideShowButton);

if (Titanium.Platform.osname == 'android')
{
	//
	// CHECKBOX
	//
	var checkBox = Titanium.UI.createSwitch({
			style:Titanium.UI.Android.SWITCH_STYLE_CHECKBOX,
			title:"CheckBox: " + false,
			color: '#fff',
			value:false,
			top:190
	});
	checkBox.addEventListener('change', function(e) {
		checkBox.title = "CheckBox: " + e.value;
	});
	
	//
	// TOGGLEBUTTON W/ TITLE
	//
	var titleSwitch = Titanium.UI.createSwitch({
			style:Titanium.UI.Android.SWITCH_STYLE_TOGGLEBUTTON,
			titleOff:"LO",
			titleOn:"HI",
			value:false,
			top:240
	});

	win.add(checkBox);
	win.add(titleSwitch);
}
