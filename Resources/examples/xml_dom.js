// TODO: Prime target for migration to drillbit

var win = Titanium.UI.currentWindow;
win.backgroundColor = '#13386c';

var xmlstr = "<?xml version=\"1.0\" encoding=\"utf-8\"?>"+
"<soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">"+
"<soap:Body>"+
"<FooBarResponse xmlns=\"http://foo.com/2010\">"+
"<FooBarResult>"+
"<ResponseStatus>"+
"<Status>"+
"<PassFail>Pass</PassFail>"+
"<ErrorCode />"+
"<MessageDetail />"+
"</Status>"+
"</ResponseStatus>"+
"<FooBar>true</FooBar>"+
"</FooBarResult>"+
"</FooBarResponse>"+
"</soap:Body></soap:Envelope>";

var xml = Ti.XML.parseString(xmlstr);
var fooBarList = xml.documentElement.getElementsByTagName("FooBar");

var result = fooBarList!=null && fooBarList.length == 1 && fooBarList.item(0).text=="true";
result = result && fooBarList.item(0).nodeName=="FooBar";

var label1 = Ti.UI.createLabel({
	top:20,
	text:'SOAP Test.\nShould be true.\nResult was: ' + result,
	color:'white',
	textAlign:'center',
	width:'auto',
	height:'auto',
	font:{fontFamily:'Helvetica Neue',fontSize:24}
});

win.add(label1);

var testResult = true;
var xmlstr2 = "<?xml version=\"1.0\" encoding=\"utf-8\"?>"+
"<FooBarResponse>"+
"<FooBarResult>"+
"<ResponseStatus>"+
"<Status>"+
"<PassFail>Pass</PassFail>"+
"<ErrorCode />"+
"<MessageDetail />"+
"</Status>"+
"</ResponseStatus>"+
"<FooBar>true</FooBar>"+
"</FooBarResult>"+
"</FooBarResponse>";

var xml2 = Ti.XML.parseString(xmlstr2);

fooBarList = xml2.documentElement.getElementsByTagName("FooBar");
testResult = fooBarList!=null && fooBarList.length == 1 && fooBarList.item(0).text=="true";
testResult = testResult && fooBarList.item(0).nodeName=="FooBar";

//TODO: remove when XPath is supported in android
if (xml2.evaluate) {
	// test XPath against Document
	result2 = xml2.evaluate("//FooBar/text()");
	testResult = testResult && result2.item(0).nodeValue == "true";
	
	// test XPath against Element
	result2 = xml2.documentElement.evaluate("//FooBar/text()");
	testResult = testResult && result2.item(0).text == "true";
	
	// test XPath against Element
	result2 = fooBarList.item(0).evaluate("text()");
	testResult = testResult && result2.item(0).text == "true";
} 

Ti.API.info('>>>>>>> XML Test 2 Result: '+testResult);
result = result && testResult;

testResult = true;
var xmlstr3 = '<?xml version="1.0" encoding="UTF-8"?>\n'+
'<response>'+
'        <nodes id="nodes">'+
'            <node id="node 1">'+
'                <node id="node 2">'+
'                    <node id="node 3"/>'+
'                </node>'+
'                <node id="node 4">'+
'                    <node id="node 5"/>'+
'                </node>'+
'                <node id="node 6">'+
'                    <node id="node 7"/>'+
'                </node>'+
'            </node>'+
'            <node id="node 8">'+
'                <node id="node 9">'+
'                    <node id="node 10"/>'+
'                </node>'+
'            </node>'+
'            <node id="node 11">'+
'                <node id="node 12">'+
'                    <node id="node 13"/>'+
'                </node>'+
'            </node>'+
'        </nodes>'+
'</response>';

var doc = Ti.XML.parseString(xmlstr3);
var nodes = doc.getElementsByTagName("nodes");

var elements = nodes.item(0).getElementsByTagName("node");
testResult = testResult && (elements!=null && elements.length==13);

elements = nodes.item(0).childNodes;
testResult = testResult && (elements!=null && elements.length==3);

testResult = testResult && (typeof elements == 'object');
testResult = testResult && (typeof elements.item == 'function');
testResult = testResult && (elements.item(0).nodeName=='node');


elements = doc.firstChild.childNodes;
testResult = testResult && (elements!=null && elements.length==3);

testResult = testResult && (doc.firstChild.nodeName=="nodes");
testResult = testResult && (doc.nodeName=="response");

testResult = testResult && doc.firstChild.getAttribute("id")=="nodes";
testResult = testResult && doc.firstChild.firstChild.getAttribute("id")=="node 1";
testResult = testResult && doc.firstChild.firstChild.firstChild.getAttribute("id")=="node 2";

Ti.API.info('>>>>>>> XML Test 3 Result: '+testResult);
result = result && testResult;

testResult = true;
var xmlstr4 = "<?xml version=\"1.0\" encoding=\"utf-8\"?>"+
"<root id='here'>"+
" <one>**"+
"  <two>*"+
"    <three/>"+
"    <three/>*"+
"  </two>**"+
"  <two>"+
"    <three/>"+
"    <three/>"+
"  </two>"+
" </one>"+
" <foo id='bar'>yo</foo>"+
"</root>";

xml = Ti.XML.parseString(xmlstr4);
var oneList = xml.documentElement.getElementsByTagName("one");
var twoList = oneList.item(0).getElementsByTagName("two");
var threeList = oneList.item(0).getElementsByTagName("three");
nodes = xml.getElementsByTagName("root");

testResult = testResult && oneList.length==1;
testResult = testResult && twoList.length==2;
testResult = testResult && threeList.length==4;

testResult = testResult && xml.documentElement.firstChild.nodeName == "one";

testResult = testResult && xml.documentElement.attributes.getNamedItem("id").nodeValue=="here";

testResult = testResult && xml.documentElement.firstChild.nextSibling.getAttribute("id")=="bar";

testResult = testResult && xml.documentElement.firstChild.ownerDocument.documentElement.nodeName == xml.documentElement.ownerDocument.documentElement.nodeName;

Ti.API.info('>>>> Test 4 Passed before NodeCount: '+testResult);

var nodeCount = 0;
function nodewalker(node) 
{
	nodeCount++;
	for (var i=0;i<node.childNodes.length;i++) 
	{
		if (i==0) 
		{
			nodewalker(node.firstChild);
		} 
		else 
		{
			var n = node.firstChild;
			for (var x=0;x<i;x++) 
			{
				n = n.nextSibling;
			}
			nodewalker(n);
		}
	}
};
nodewalker(nodes.item(0));
testResult = testResult && nodeCount==8;
Ti.API.info('>>>>>>> Test 4 NodeCount: '+nodeCount);

Ti.API.info('>>>>>>> XML Test 4 Result: '+testResult);
result = result && testResult;

testResult = true;
var xmlstr5 = "<?xml version=\"1.0\" encoding=\"utf-8\"?>"+
"<root>"+
"<script>"+
"<![CDATA["+
"function matchwo(a,b)"+
"{"+
"if (a < b && a < 0) then"+
"  {"+
"  return 1;"+
"  }"+
"else"+
"  {"+
"  return 0;"+
"  }"+
"}"+
"]]>"+
"</script>" +
"</root>";

xml = Ti.XML.parseString(xmlstr5);
var rootList = xml.documentElement.getElementsByTagName("root");
var scriptList = xml.documentElement.getElementsByTagName("script");

Ti.API.info("Script is: "+JSON.stringify(scriptList));

testResult = testResult && scriptList.length==1;
testResult = testResult && xml.documentElement.firstChild.nodeName == "root";

Ti.API.info('>>>> Test 5 Passed before NodeCount: '+testResult);

var nodeCount = 0;
function nodewalker(node) 
{
	nodeCount++;
	for (var i=0;i<node.childNodes.length;i++) 
	{
		if (i==0) 
		{
			nodewalker(node.firstChild);
		} 
		else 
		{
			var n = node.firstChild;
			for (var x=0;x<i;x++) 
			{
				n = n.nextSibling;
			}
			nodewalker(n);
		}
	}
};
nodewalker(rootList.item(0));
testResult = testResult && nodeCount==1;
Ti.API.info('>>>>>>> Test 5 NodeCount: '+nodeCount);

Ti.API.info('>>>>>>> XML Test 5 Result: '+testResult);
result = result && testResult;

testResult = true;
var xmlstr6 = "<?xml version=\"1.0\" encoding=\"utf-8\"?>"+
"<data>"+
"<subdata>1 2 3 4 <element>5 <subelement>6</subelement></element> <![CDATA[7 8]]> 9 10 &amp; &lt; &gt;</subdata>"+
"</data>";

xml = Ti.XML.parseString(xmlstr6);
var dataList = xml.documentElement.getElementsByTagName("data");
var subdataList = xml.documentElement.getElementsByTagName("subdata");

Ti.API.info("Script is: "+JSON.stringify(subdataList));

testResult = testResult && dataList.length==3;
testResult = testResult && xml.documentElement.firstChild.nodeName == "data";

Ti.API.info('>>>> Test 6 Passed before NodeCount: '+testResult);

var nodeCount = 0;
function nodewalker(node) 
{
	nodeCount++;
	for (var i=0;i<node.childNodes.length;i++) 
	{
		if (i==0) 
		{
			nodewalker(node.firstChild);
		} 
		else 
		{
			var n = node.firstChild;
			for (var x=0;x<i;x++) 
			{
				n = n.nextSibling;
			}
			nodewalker(n);
		}
	}
};
nodewalker(subdataList.item(0));
testResult = testResult && nodeCount==4;
Ti.API.info('>>>>>>> Test 6 NodeCount: '+nodeCount);

Ti.API.info('>>>>>>> XML Test 6 Result: '+testResult);
result = result && testResult;

var label2 = Ti.UI.createLabel({
	top:130,
	text:'XML Test.\nShould be true.\nResult was: ' + result,
	color:'white',
	textAlign:'center',
	width:'auto',
	height:'auto',
	font:{fontFamily:'Helvetica Neue',fontSize:24}
});

win.add(label2);

// Return an array of attribute nodes, sorted by name.
// An attribute NamedNodeMap has no canonical ordering,
// so to do a comparison we need to ensure we've got the
// same order between both.
function sortAttributeList(attribs)
{
	var names = [];
	var map = {};
	for (var i = 0; i < attribs; i++)
	{
		var a = attribs.item(i);
		map[a.nodeName] = a;
		names.push(a.nodeName);
	}
	names = names.sort();

	var list = [];
	for (var i = 0; i < names.length; i++)
	{
		list.push(map[names[i]]);
	}
	return list;
}

function matchXmlTrees(a, b)
{
	var ok = true;
	ok = ok && (a.nodeType == b.nodeType);
	ok = ok && (a.nodeName == b.nodeName);
	ok = ok && (a.nodeValue == b.nodeValue);
	
	if (!ok) {
		Titanium.API.debug('a: ' + a.nodeType + ' ' + a.nodeName + ' ' + a.nodeValue);
		Titanium.API.debug('b: ' + a.nodeType + ' ' + b.nodeName + ' ' + b.nodeValue);
	}

	if (ok && a.nodeType == 1)
	{
		var aAttribs = sortAttributeList(a.attributes);
		var bAttribs = sortAttributeList(b.attributes);
		if (aAttribs.length == bAttribs.length)
		{
			for (var i = 0; i < aAttribs.length; i++)
			{
				ok == ok && matchXmlTrees(aAttribs[i], bAttribs[i]);
			}
		}
		else
		{
			Titanium.API.debug('mismatched attribute count');
			ok = false;
		}
	}

	if (ok && a.nodeType == 1)
	{
		var aChildren = a.childNodes;
		var bChildren = b.childNodes;
		if (aChildren.length == bChildren.length)
		{
			for (var i = 0; i < aChildren.length; i++)
			{
				ok == ok && matchXmlTrees(aChildren.item(i), bChildren.item(i));
			}
		}
		else
		{
			Titanium.API.debug('mismatched child count');
			ok = false;
		}
	}

	return ok;
}

var xmlSources = [xmlstr, xmlstr2, xmlstr3, xmlstr4, xmlstr5, xmlstr6];
var result = true;
for (var i = 0; i < xmlSources.length; i++)
{
	var a = Ti.XML.parseString(xmlSources[i]);

	var bstr = Ti.XML.serializeToString(a);
	var b = Ti.XML.parseString(bstr);

	// Make sure we can round-trip from source to DOM to source and back to DOM...
	var testResult = matchXmlTrees(a, b);
	Ti.API.info('>>>>>>> XML Serialize Test ' + (i + 1) + ' Result: ' + testResult);
	
	result = result && testResult;
}

var label3 = Ti.UI.createLabel({
	top:240,
	text:'XML Serialize Test.\nShould be true.\nResult was: ' + result,
	color:'white',
	textAlign:'center',
	width:'auto',
	height:'auto',
	font:{fontFamily:'Helvetica Neue',fontSize:24}
});

win.add(label3);