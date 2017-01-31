sys=window.sys=
{$:function sys$(p){if(sys.$.isLoaded)
		return sys.did(p);
	else{	if(!sys.$.onloadQ)sys.$.onloadQ=[p];
		else sys.$.onloadQ.push(p);}}

,onload:window.onload=function sysOnload(e){
	sys.$.isLoaded=true;//sys.parseDomOnLoad();
	if(sys.$.onloadQ)
		for(var i in sys.$.onloadQ)try{
			sys.$.onloadQ[i](e)}
		catch(ex){console.log('sys.$.onloadQ,i=',i,',ex=',ex);}}

//2015-06-09-13-30
//console.log('sys.js loaded.');

,did:function sys_did(id,n){if(!n)return document.getElementById(id);
	var r=n;n=n.firstChild;while(n)if(n.id==id)return n;else n=n.nextSibling;
	n=r.firstChild;while(n)if(r=did(id,n))return r;else n=n.nextSibling;}


,dce:function sys_dce(n,p,t,i){var r=document.createElement(n);if(i)r.id=i;if(t)sys.dct(t,r);if(p)p.appendChild(r);return r;}

,dcb:function sys_dcb(p,t,i,c){var r=sys.dce('button',p,t,i);r.onclick=c;return r;}

,dcbx:function sys_dcb(p,txt,req,id){var r=sys.dce('button',p,txt,id);
	r.onclick=function(){sys.xhr(req);}
	return r;}

,dct:function sys_dct(t,p){var r=document.createTextNode(t);if(p)p.appendChild(r);return r;}

,dci:function sys_dci(p,val,id,c,typ){var r=document.createElement('input');r.type=typ||'text';
	if(id)r.id=id;if(val)r.value=val;if(p)p.appendChild(r);if(c)r.onchange=c;return r;}

,bld:function sys_bld(params,parent){//BuildDomTree params::= id ,n:nodeName ,t:text ,clk:onclick-function ,chng:onchange-function ,a:jsobj-attributes ,c:jsarray-children-recursive-params ,s:jsobj-style ,clpsbl:string-title:collapsable; or params canbe string, or array:call bldTbl ; parent: domElement
 var t=sys;try{if(typeof(params)=='string')return t.dct(params,parent);
 var p=params,n=p.n?document.createElement(p.n):p.t!=undefined?document.createTextNode(p.t):p;
	if(p.n&&(p.t!=undefined))n.appendChild(document.createTextNode(p.t));
	if(p.n&&p.n.toLowerCase()=='input')n.type=(p.a?p.a.type:0)||'text';
	if(p.id)n.id=p.id;
	if(p.name||(p.a&&p.a.name))n.name=p.name||p.a.name;
	if(p.clk)n.onclick=p.clk;
	if(p.chng)n.onchange=p.chng;
	if(p.s)for(var i in p.s)n.style[i]=p.s[i];
	if(p.a)for(var i in p.a)n[i]=p.a[i];
	if(p.c){if(p.n&&p.n.toLowerCase()=='select')t.bldSlct(p,n);
		else if(p.n&&p.n.toLowerCase()=='table')t.bldTbl (p,n);
		else for(var i=0;i<p.c.length;i++)
		 if(typeof(p.c[i])=='string')//t.dct(p.c[i],n);
			n.appendChild(document.createTextNode(p.c[i]));
		else 
			t.bld(p.c[i],n);
	}
	//if(p.clpsbl)n=t.createCollapsable(p.clpsbl,parent,p.id,n);else 
	if(parent)parent.appendChild(n);
	}catch(ex){console.error('sys.bld:ex',ex);}return n;
}//function bld

,/** params: same as bld.params
		.columnsHidden integer count of the first columns that should not generate html
		, .c  2 dimensional array of elements ,this method will nest each elem in a TD 
			, and the elem is same as bld.params,recursive
		, .headings 1dim array , this method nests each elem in a TH, and the elem is same as bld.params 
		, .footer ,same as headings ,but for footer of table
		, onDoneCell : func called when td/th done ,args to func:td/th , paramObj-for-cell , rowIndex , cellIndex , paramObj-for-row , paramObj-for-body
		, onDoneRow  : func called when tr done  ,args to func:tr , paramObj-for-row , rowIndex , paramObj-for-body
		, onDoneBody : func called when tbody done
	, pr:parent dom-element , based-on/uses dce
	*/
 bldTbl:function sys_BuildHtmlTable(params,pr){
	var tbl=pr&&pr.nodeName=='TABLE'?pr
		:sys.dce('table',pr,null,params?params.id:0)
		,tb=tbl?tbl.tBodies[0]:0;
	if(params.headings){
		var ht=tbl.tHead,a=params.headings,tr,th;
		if(!ht)ht=tbl.createTHead();
		tr=ht.children?ht.children[0]:0;
		if(!tr)tr=ht.insertRow();
		for(var i in a)
			if(!(params.columnsHidden>=i))
			{th=sys.dce('th',tr);
				sys.bld(a[i],th);
			}
		if(params.onDoneRow)
			params.onDoneRow(tr,params.headings,0,params)
	}
	if(params.c){
		var r,a=params.c,tr,td;
		for(var i in a){
			tr=tb.insertRow();
			tr.pk=a[i][j];
			if(a[i])
			{	for(var j in a[i])
					if(!(params.columnsHidden>=i)){
						td=tr.insertCell();
						sys.bld(a[i][j],td);
						if(params.onDoneCell)
							params.onDoneCell(td,a[i][j],i,j,a[i],params)
					}
				if(params.onDoneRow)
					params.onDoneRow(tr,a[i],i,params)
			}
		}
	}
	if(params.footer){
		var ht=tbl.tFoot,a=params.footer,tr,td;
		if(!ht)ht=tbl.createTFoot();
		tr=ht.children?ht.children[0]:0;
		if(!tr)tr=ht.insertRow();
		for(var i in a)
			if(!(params.columnsHidden>=i)){
				td=tr.insertCell();
				sys.bld(a[i],td);}}
	return tbl;}

,bldSlct:function sys_BuildSelect(params,pr){
	var i,n,t,v,found=0
		,c=params.c
		,s=params.selected||params.a.selected;
	if(!pr||!pr.nodeName||pr.nodeName!='SELECT')
		pr=sys.dce('SELECT',pr)
	for(i=0;c&&i<c.length;i++){
		pr.options[pr.options.length]=n=
			typeof(c[i])=='string'
			||!((c[i] instanceof Array&&c[i].length>1)||c[i].value)
			?new Option(t=v=c[i])
			:new Option(
				t=(c[i].text||c[i][0])
			 ,	v=(c[i].value||c[i][1])
			 );
		if(s==t||s==v)
			found=n.selected=true;
	}if(s && !found)
	{pr.options[pr.options.length]=n=new Option(s)
		n.selected=true;}
	return pr;}

		
,/**
params:(obj)
	c:array ,like bld
	,form:optional:to call bldForm contained in this modal
	,title:str(optional)
	,btns:{close:<str:(default:'Close') or if null then wont show 'close'-btn>
		,<key:str:button-title> : <return value when clicked, 
			or func that is called when btn is clicked(args:btn,key,modalDialog,paramObj) >
		,,,
	}//btns	
*/bldModal:function(params,pr)
{var div=sys.dce('div',pr),r;
	div.style.cssText="position:absolute;top:0px;left:0px;width:100%;height:100%;background-color:#00001010;";
	return r;
}

,/**params:
	modal:(boolean:optional:default false)
	h:fields:array
		,if item string,label of field and text-data-type
		,if item array then ix0 is label and remaining are enums of a drop-down-select
		,if object: t:label , type:('text','textarea','number','regex','datetime',,,ect)
			other props are to be written as attributes in the generated element
	a:1d-array of field values
	clss:(defaults to 'data')className used for input or select or textarea
	depricated:orientation:(h or v ,default v, v:vertical , h:horizontal )
	modules:int for number of fields per column,not implemented, two approaches, 
		1:(default) going down a column then next column 
		2: going horizontally then next row
	btns:array for buttons, not implemented yet

 returns params with added props:
	dataNodes:obj : prop-key field-name, prop-value is data-element(input or select or textarea)
	getJson:func returns as json-obj values in the dataNodes
*/bldForm:function(params,pr)
{	if(!params||!params.h||!params.a)
		return;
	var p=params
	,tbl=p.tbl= ((pr&&pr.nodeName=='TABLE')?
		pr:sys.dce('table',pr,null,p.id))
	,tb=tbl?tbl.tBodies[0]:0
	,h=p.h,a=p.a
	,hi,ht,ai,tr,td,th;
	p.dataNodes=[];
	for(var i in h){
		tr=tb.insertRow();
		hi=h[i];ht=typeof(hi)
		ai=a[i]
		th=sys.dce('th',tr);
		td=tr.insertCell();
		if(ht=='string')
		{	sys.bld(hi,th);
			p.dataNodes.push(
				ai!=undefined && ai!=null
				?sys.dci(td,ai,hi)
				:a[i]);
		}
		else if(hi instanceof Array){
			sys.bld(hi[0],th);
			var c=sys.util.copy(hi);c.splice(0,1)
			sys.bldSlct({clss:p.clss||'data',c:c,selected:ai},td)
		}else{
			//textarea
			//select
			//hidden
			//password
			//radio
			//checkbox
			//date,datetime
			//number
			//regex
			//file
			//slider
		}
	}
	return p;
}//bldForm

,/**primary key is the first column, url of json crud,
	url params:datagrid=<tbl-name> 
		& <optional:limit> 
		& <optional:cursor=<refInt>> 
		& op=query , update , insert , delete
			query :cols(seq of col-names),where(seq of key-value pairs)
			update:cols(seq of key-value pairs), where(seq of key-value pairs)
			insert:cols(seq of key-value pairs)
			delete:where(seq of key-value pairs)
			
 build a table that has event handlers along with xhr
 */
 bldDataGrid:function sys_BuildDataGrid(url,pr){
 var x=xhr(url)
 sys.bldTbl({},pr);
}

,/**facade function to wrap title-text into a structure for bld*/
fset:function sys_fset(ttl,a,args){
 var x={n:'legend',t:ttl};
	if(!(a instanceof Array))a=[x,a];
	else a.unshift(x);
	if(args&&args.length>2)for(var i=2;i<args.length;i++)a.push(args[i]);
	return {n:'fieldset',s:{padding:'1px',margin:'1px'},c:a }; }

,ttlTxt:function sys_ttlTxt(ttl,p){
 if(!p.s)p.s={};
	p.n='input';
	p.s.border='0px solid while';
	if(!p.s.width)p.s.width='100%';
	return fset(ttl,p,arguments);}

,util:{
	copy:function(o,deep){//deep:optional, array ,which is list of copied items
		var t=typeof(o),p=sys.util.isPrimitive(v,t)
		,r=p?o:o instanceof Array?[]:{};
		if(p)return r;
		if(!deep)
			for(var i in o)
				r[i]=o[i]
		else{
			deep.push([o,r])
			for(var i in o)
			{var v=o[i],t=typeof(v)
				if(sys.util.isPrimitive(v,t))
					r[i]=v;
				else if(v&&v.cloneNode)
					r[i]=v.cloneNode(deep)
				else{
					r[i]=sys.util.copy(v,deep)
				}
			}
		}
		return r;
	}//copy
	,isPrimitive:function primitive(v,t){if(!t)t=typeof(v);return 
		v==null||v==undefined||t=='string'||t=='number'||t=='boolean';}
	,extend:function(dst,src){
		for(var i in src)
		{var v=dst[i];if(v==undefined)
			dst[i]=src[i];
		}
		return dst;}
}//sys.util

,/**
 * parameter p attributes
 *	data: body data of the xhr request sent tot the server ,default null
 *	headers: json-object of name/value , set as request headers, defaults to null
 *	onload: reference to a function that is called in asynchronous mode 
		(defaults to null which is synchronise mode), when the server successfully responds, the func is given as a param the xhr obj and second param p
 *	onprogress: reference to a function that is called in asynchronous mode (defaults to null )
		, when the server successfully responds
		 // progress on transfers from the server to the client (downloads)
		function onProgress (oEvent) {
		  if (oEvent.lengthComputable) {
			var percentComplete = oEvent.loaded / oEvent.total;
			// ...
		  } else {
			// Unable to compute progress information since the total size is unknown
		  }
		}
 
 *	onerror: reference to a function that is called in asynchronous mode 
		(defaults to null which is synchronise mode), when the server or xhr fails
 *	method: string , POST, GET, defaults to POST
 *	url: the url of xhr , defaults to empty string
 *	asJson:boolean, if true returns JSON.parse(xhr.responseText) else returns xhr.responseText
 * //as: string 'text' , 'json' , defaults to text //'html', 'xml' 
 * */
xhr:function sys_xhr(p){//data,callBack,asText)
 if(!p)return p;
 var ct='Content-Type',cs='charset',x=sys.isIE?new 
		ActiveXObject("microsoft.XMLHTTP")
		:new XMLHttpRequest();x.p=p;p.xhr=x;
	x.open(p.method||'POST',p.url||'', p.onload );
	if(p.headers)for(var i in p.headers)
		x.setRequestHeader(i,p.headers[i]);//console.log('scriptedReq:header['+i+']:'+headers[i]);
	if(!p.headers || !p.headers[ct])x.setRequestHeader(ct, 'text/json');//'application/x-www-form-urlencoded');
	if(!p.headers || !p.headers[cs])x.setRequestHeader(cs, 'utf-8');
	if(p.onload)x.onload=p.onload
	if(p.onprogress)x.onprogress=p.onprogress
	if(p.onerror)x.onerror=p.onerror
	
	x.send((typeof p.data)=='string'?p.data:JSON.stringify(p.data));//console.log('scriptedReq:response:'+ajax.responseText);
	//return asText?x.responseText:async?0:eval('('+x.responseText+')');
	console.log('xhr:',p,x);
	return p.asJson?JSON.parse ( x . responseText ) : x . responseText ;
	}//function xhr

,isIE:(typeof XMLHttpRequest === "undefined")


,toJsonBld:{
 toJb:function(o,stack){
	var n=o&&o.constructor&&o.constructor.name
	,f=sys.toJsonBld[n]
	return f?f(o):sys.toJsonBld.props(o);}
 ,isInStack:function(o,stack){
	for(var i=0;i<stack.length;i++)
		if(o==stack[i][1]){
			var x=stack[0][0].meta
			if(!x)stack[0][0].meta=x={};
			if(!x.loop)
				x.loop=[];
			x.loop.push(stack[i][1]);
			return stack[i][0];}
	if(stack[0]&&stack[0][0]&&stack[0][0].meta&&stack[0][0].meta.loop){
		var x=stack[0][0].meta.loop
		for(var i=0;i<x.length;i++)
			if(x[i]==o)
				console.log('inLoop',o);
 }}
 ,props:function(o,stack){ 
	var classNames=[
	'CSSStyleRule'
	,'CSSImportRule'
	,'CSSMediaRule'
	,'StyleSheet'
	,'CSSFontFaceRule'
	,'CSSGroupingRule'
	,'CSSKeyframeRule'
	,'CSSKeyframesRule'
	,'CSSNamespaceRule'
	,'CSSPageRule'
	,'CSSRule'
	,'CSSSupportsRule'
	,'CSSViewportRule'];
	if(o){var a={},stk=stack||[],sf=[a,o],f
	,x=sys.toJsonBld.isInStack(o,stack);if(x)return x;stk.push(sf)
	,n=o&&o.constructor&&o.constructor.name;
		if(n)a.constructorName=n;
		for(var i in o)
		{x=o[i];
			if(x!=undefined&&x!=null){//&&x!=''
			n=x&&x.constructor&&x.constructor.name
			f=sys.toJsonBld[n];if(f)a[i]=f(x)
			else{f=classNames[n]
			a[i]=f?sys.toJsonBld.props(x):x}}}
		stk.pop();
		return a;}}
 ,list:function(o,stack){
	var a=[]
	,stk=stack||[],sf=[a,o]
	,n=sys.toJsonBld.isInStack(o,stack);
	if(n)return n;stk.push(sf)
	n=(o&&o.length)||0;
	for(var i =0;i<n;i++)
		a.push(sys.toJsonBld.toJb(o[i]))
	stk.pop();
	return a;}
 ,'StyleSheetList':function(o,stack){return sys.toJsonBld.list(o,stack);}
 ,'CSSRuleList':function(o,stack){return sys.toJsonBld.list(o,stack);}
 ,'CSSStyleSheet':function(o,stack){
	var a={},b=['href','type','title','disabled','media']
	,stk=stack||[],sf=[a,o]
	,n=sys.toJsonBld.isInStack(o,stack);
	if(n)return n;stk.push(sf)
	for(var i=0;i<b.length;i++)
	{n=b[i],x=o[n];if(x&&x!='')
		a[n]=x;}
	b=o.rules||o.cssRules//CSSRuleList
	if(b)a.s=sys.toJsonBld.list(b,stack);
	//for(var i=0;b&&b.length&&i<b.length;i++)c.push(sys.toJsonBld.toJb(b[i]))
	stk.pop();
	return a;}
 ,'CSSStyleDeclaration':function(o,stack){
	var n=o&&o.length||0,a={x:{}}
	,stk=stack||[],sf=[a,o]
	,n=sys.toJsonBld.isInStack(o,stack);
	if(n)return n;stk.push(sf)
	x=o.cssText;if(x!=undefined&&x!='')
		a.t=x// this is a string that has packed 
	//selectorText and braces encompassing o.style.cssText
	for(var i=0,k;i<n;i++)
	{k=o[i]
		a[k]=o[k]
	}
	for(var i in o){
		x=o[i];
		if(x&&x!=''&&i!='parentRule')//&&a[i]==undefined)
			a.x[i]=x;}
	stk.pop();
	return a;}
,
dom2json:function dom2json(n,meta,stack){
	function indexOf(a,e){var i=a.length-1;for(;i>=0&&a[i]!=e;i--);return i;}
	var r={n:n.nodeName},a=n.attributes,stk=stack||[],sf=[r,n]
	,x=sys.toJsonBld.isInStack(n,stack);if(x)return x;stk.push(sf)
	x=a&&a.length
	if(n.id)r.id=n.id;if(!meta){stk[0][0].meta=meta={}}
	if(x)for(var i=0;i<x;i++)
	{	var nm=a[i].name,v=a[i].value;
		if( v!=undefined && nm!='id' && nm!='style' )
		{if(!r.a)r.a={};
			r.a[nm]=v;}
	}
	if(n.style && n.style.cssText){
		var m,v,z;a= n.style.cssText.split(';')
		if(a  ){r.s={}; //&&(! z.trim || z.trim())
		  for(var i in a){
			z=a[i].split(':');m=z[0];v=z[1];
			if( m && m.trim) m=m.trim();
			if( v && v.trim) v=v.trim();			
			if(v!=undefined && (v.length==undefined || v.length>0))//&& (!v.trim || v.trim()))
				r.s[m]=v;
	}}}
	if(n.nodeName=='LINK'){
		//z.css=sys.toJsonBld.toJb(document.styleSheets)
		//var tsf=stk[0],top=tsf[0].meta;
		//if(!top)top=tsf[0].meta={links:[]};
		//if(!top.links)top.links=[];
		//top.links.push(sf)
		if(!meta.links)meta.links=[];meta.links.push(sf)
		console.log('stackFrame:links:stackFrame=',sf,',meta=',meta,',stack=',stk,',currentObj=',r,n);
	}else if(n.nodeName=='SCRIPT'){
		if(!meta.scripts)meta.scripts=[];meta.scripts.push(sf)
		console.log('stackFrame:scripts:stackFrame=',sf,',meta=',meta,',stack=',stk,',currentObj=',r,n);
	}if(n.src){
		if(!meta.src)meta.src=[];meta.src.push(sf)
		console.log('stackFrame:src:stackFrame=',sf,',meta=',meta,',stack=',stk,',currentObj=',r,n);
	}if(n.href){
		if(!meta.href)meta.href=[];meta.href.push(sf)
		console.log('stackFrame:href:stackFrame=',sf,',meta=',meta,',stack=',stk,',currentObj=',r,n);
	}
		
	x=n.firstChild;
	if(x&&!x.nextSibling&&x.nodeType==Node.TEXT_NODE)
	{var v=x.value||x.data;if(v.trim())	
		r.t=v;}
	else if(x )//&& x.nodeName!='SCRIPT')
	{r.c=[];while(x)
	 {	if(x.nodeType==Node.ELEMENT_NODE)
		{var z=sys.toJsonBld.dom2json(x,meta,stk)
			r.c.push(z);
		}//if(x.nodeName!='SCRIPT')
		else if(x.nodeType==Node.TEXT_NODE)
		{var v=x.value||x.data;if(v.trim())	r.c.push(v);}
		else console.log('sys.toJsonBld.dom2json:unknown nodeType:',x);
		x=x.nextSibling;}}
	if(!stack)
		meta.css=r.css=sys.toJsonBld.toJb(document.styleSheets,[])
	else sf.pop()
	return r;}//dom2json

 ,init:function(){
	var a=[{},{}]
	a[2]=sys.toJsonBld.dom2json(document.head,a[0],[])
	a[3]=sys.toJsonBld.dom2json(document.body,a[1])//,cssSheetList2jb(document.styleSheets)
	return a;
 }//init:function
}//sys.toJsonBld



/*dbCache-sections
	Files
		images
		css
		Html
			login
				
			enum Screen
				ProjectsList
				,ProjectScreen
				,BuildingScreen
				,FloorScreen
				,UsersList
				,User
				,Sheet
				,ReportsMenu
				,LogMenu
				,ConfigMenu
				,Search
			
		js

	dbTables
		Projects
			Buildings
				Floors
					Sheets

	uploads
	Log
	Offline


Screens
	ProjectsList
		Buildings
	Buildings
	Floor	
	UsersList
	Config
	Report
	Log

Server op (xhr)
	getDbProjBdlngFlr  ,each project is loaded seperatly (packaged with proj are all buildings and Floors), sheets are loaded seperatly based on each dbTblFloor
	getDbSheets	//must pageanate 1MBytes
	--getSheetUploads, just use http-get
	getAppBootStrap, includes screens( jsonBld of html +css) and js app-lib
	login,logout
	,newProject,newBuilding,newFloor,newSheet,newUser
	,deleteProject,deleteBuilding,deleteFloor
	,deleteSheet,deleteUser,userChngPw,query
	,xhrEdit,saveSheet
	,syncLastModified //check LM of proj,bld,flr,sheet,files,uploads,Logs,User,UserActivity
	,syncOffline

lastModified based synchronisation between client-LocalStorage and server-DB

*/

,bootStrap:{
	init:function(){/*
	call StorageList ,asking for all Storage-entries past client-side-value lastModifies //depricated::check if firstTime-run, if so, then load application 
		( files( html(,,,) , css(,,,) 
			, js(sys.js 
				, app.js(db)
				, each screen 
				, each component
				) 
			)
		 ,db(projectsList , proj/bld/flr , not sheets)
		 ,uploads,users
		)
	check storage howMuch up-to-date lastModified
		prepare the list of lastModified entities
			files
			db
	*/

	/*files:
	eu059s.file.login.html	// todo:include all login dependencies
	eu059s.file.main.html
	eu059s.file.main.css
	eu059s.file.sheet.html
	eu059s.file.

	*/
	sys.bootStrap.introspection.init()
	}//init

	,introspection:{
	/*Introspection:build gui for application-heirarchy, and operations
		files-list + files
		images-list + images
		db:projList + proj/bld/flr
		//lclStrg
		//lastModified
		//offline
		//SrvrOp
	*/
	init:function(a,p){
		/*
		a:2d-array from server:AppEU059s.Op.StorageList, first line is header names
		[[	Storage.C.no	,	Storage.C.path	,	Storage.C.contentType	,	Storage.C.lastModified] // data is not included
			,
			,
			,
			[,,,]
			,
			,
			,
		]
		*/if(!a)a=[['Storage.C.no' , 'Storage.C.path' , 'Storage.C.contentType' , 'Storage.C.lastModified','Storage.C.data']]
		if(!p)p=document.body
		sys.dce('h1',p,'sys.bootStrap.introspection.storageEntriesTable')
		var h=a.splice(0,1)[0],b=
			[	{	t:'Reload all Storage entries'
					,req:{	'op':sys.Op.StorageList
						,onload:sys.bootStrap.introspection.init
					}
				}
				,{	t:'New Storage entry'
					,c:function(){var req=
						{'op':sys.Op.StorageNew
							,onload:function(){
								console.log('Op.StorageNew:xhr.onload-ok',arguments
									,'TODO:need to implement js-onxhr-ok for gui/dom '
								);
								
							}
						}
						var path=sys.bldModal({})
						sys.xhr(req)
					}
				}
			]
		b.map(function(o,i){if(o.req)sys.dcbx(p,o.t,o.req);sys.dcb(p,o.t,o.req);})
		sys.bootStrap.introspection.storageEntriesTable=sys.bldTbl(
			{	c:a
				,headings:h[0]
				//,onDoneRow:function(tr,rObj,rIx,bObj)
				,onDoneCell:function(td,cellObj,rowIx,cellIx,rObj,bObj)
				{var obj={td:td,cellObj:cellObj,cellIx:cellIx,rowObj:rObj,rowIx:rowIx,tbodyParam:bObj}
				,str='sys.bootStrap.introspection.init.bldTbl.cell:Storage.C.'
				// console.log('sys.bootStrap.introspection.init.bldTbl.onDoneCell:td,cellObj,rowIx,cellIx,rObj,bObj:',obj)
					if(cellIx==0){//Storage.C.no //primary-key
						sys.dcb(td,'delete',null,function(){
							console.log(str,'no:td.onclick:',obj)
							if(confirm('Please confirm deletion of:',obj)){
								console.log(str,'no:td.onclick:confirmed delete',obj)
								alert('not implemented yet')
							}
						})
					}else if(cellIx==1){//Storage.C.path
						sys.dcb(td,'rename-path',null,function(){
							var x=prompt('Please enter new path:',obj.cellObj[1]);//console.log(str,'path:td.onclick:',obj)
							if(x){
								console.log(str,'path:td.onclick:confirmed rename:',x,obj)
								alert('not implemented yet')
							}
						})
					}else if(cellIx==2){//Storage.C.contentType
						sys.dcb(td,'change-contentType(drop-down-select)',null,function(){
							console.log(str,'contentType:td.onclick:',obj)
						})
					}else if(cellIx==3){//Storage.C.lastModified
						sys.dcb(td,'load-data/reload',null,function(){
							console.log(str,'lastModified:td.onclick:',obj)
						})
					}
					/*add buttons: reload,delete //depricated::save(check is there are changes)
						,rename-path
						,change-contentType drop-down-select
						,edit-data-as(
							plain-text (js ,or other) //maybe in the future color-code js-src-code
							, wysiwyg-html // onButtonSave dom2json
							, img upload/drag-n-drop
							, css introspection
							, json tree)
					* /
					var b=
					[0,	{	t:'reload',param:obj
							,req:{	'op':sys.Op.StorageGet,param:rObj
								//,onload:sys.bootStrap.introspection.init
							}
						}
						,{	t:'delete',param:obj,clk:function(){t:''
								,req:{'op':sys.Op.StorageGet,param:rObj
									,onload:function(){
										console.log('Op.StorageNew:xhr.onload-ok',arguments
											,'TODO:need to implement js-onxhr-ok for gui/dom '
										);
									}
								}
							}
						}
						,{	t:'rename-path',param:obj,clk:function(){t:''
								,req:{'op':sys.Op.StorageGet,param:rObj
								,onload:function(){
									console.log('Op.StorageNew:xhr.onload-ok',arguments
										,'TODO:need to implement js-onxhr-ok for gui/dom '
									);
								}}
							}
						}
						,{	t:'change-contentType'/*drop-down-select:
								plain-text 
								, wysiwyg-html 
								, img upload/drag-n-drop
								, css introspection
								, json tree* /,param:obj,clk:function(){t:''
									,req:{'op':sys.Op.StorageGet,param:rObj
									,onload:function(){
										console.log('Op.StorageNew:xhr.onload-ok',arguments
											,'TODO:need to implement js-onxhr-ok for gui/dom '
										);
									}
								}
							}
						}
						,{	t:'edit-data',param:obj,clk:function(){t:''
								,req:{'op':sys.Op.StorageGet,param:rObj
									,onload:function(){
										console.log('Op.StorageNew:xhr.onload-ok',arguments
											,'TODO:need to implement js-onxhr-ok for gui/dom '
										);
									}
								}
							}
						}
					]*/
				}
			},p)
	}//introspection.init


	,bldFilesList:function(filesList,p){
		//get-list from srvr, add entry , delete-entry, edit-entry
	 }//bldFilesList:function
	,bldFiles:function(files,p){}
	/*,bldImgsList:function(imgsList,p){}
	,bldImgs:function(imgs,p){}
	,bldDbProjsList:function(projsList,p){}
	,bldDbProjBldFlr:function(pbf,p){}*/
	,props:{//json-props introspection (build gui/dom) , basically used with jsonRef=0
		init:function(o,p){
			/*
			
			*/
		}//props.init
	}//props 
	}//introspection
}//bootStrap

,storageLib:{//methods for LocalStorage , and sync-ing with server

	files:{//css + html + js
	}//files
	,imgs:{}
	,projects:{}
	//,lib:{}//js with lastModified
	,offline:{}
	,lastModified:[]
}//storageLib

,Op:{//client facade reflection of server-Op,
 getAppBootStrap:function(){//, includes screens( jsonBld of html +css) and js app-lib
	
	}//getAppBootStrap:function
 ,login:function(){}
 ,logout:function(){}
 ,StorageList:'StorageList'
 ,StorageGet:'StorageGet'
 ,StorageScript:'StorageScript'
 ,StorageCss:'StorageCss'
 ,StorageImg:'StorageImg'
 ,StorageSet:'StorageSet'
 ,StorageNew:'StorageNew'
 
 /*,StorageDelete:'StorageDelete',StorageSyncOffline:'StorageSyncOffline'
 
 ,getDbProjBdlngFlr:function(){}  //,each project is loaded seperatly (packaged with proj are all buildings and Floors)
 ,getDbSheets:function(){}	//sheets are loaded seperatly based on each dbTblFloor //must pageanate 1MBytes
 ,getSheetUploadsInfo:function(){}//info like lastModified , as for the content, just use http-get to get the content
 ,newProject:function(){}
 ,newBuilding:function(){}
 ,newFloor:function(){}
 ,newSheet:function(){}
 ,newUser:function(){}
 ,deleteProject:function(){}
 ,deleteBuilding:function(){}
 ,deleteFloor:function(){}
 ,deleteSheet:function(){}
 ,deleteUser:function(){}
 ,userChngPw:function(){}
 ,query:function(){}
 ,xhrEdit:function(){}
 ,saveSheet:function(){}
 ,syncLastModified:function(){} //check LM of proj,bld,flr,sheet,files,uploads,Logs,User,UserActivity
 ,syncOffline:function(){}
		,introspectProps:function(){}
		,introspectPropSet:function(){}
		,introspectPropRem:function(){}
		,introspectLog:function(){}*/
}//Op

}//sys

console.log('sys.js loaded.');

sys.bootStrap.init()