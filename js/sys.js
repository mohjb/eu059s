sys=window.sys=
{
//2015-06-09-13-30
did:function sys_did(id,n){if(!n)return document.getElementById(id);
	var r=n;n=n.firstChild;while(n)if(n.id==id)return n;else n=n.nextSibling;
	n=r.firstChild;while(n)if(r=did(id,n))return r;else n=n.nextSibling;}

,dce:function sys_dce(n,p,t,i){var r=document.createElement(n);if(i)r.id=i;if(t)sys.dct(t,r);if(p)p.appendChild(r);return r;}

,dcb:function sys_dcb(p,t,c,i){var r=sys.dce('button',p,t,i);r.onclick=c;return r;}//,dcb:function sys_dcb(p,t,i,c){var r=sys.dce('button',p,t,i);r.onclick=c;return r;}

,dcbx:function sys_dcbx(p,txt,req,id){var r=sys.dce('button',p,txt,id);
	r.onclick=function(){sys.xhr(req);}
	return r;}

,dct:function sys_dct(t,p){var r=document.createTextNode(t);if(p)p.appendChild(r);return r;}

,dci:function sys_dci(p,val,id,c,typ){var r=document.createElement('input');r.type=typ||'text';
	if(id)r.id=id;if(val)r.value=val;if(p)p.appendChild(r);if(c)r.onchange=c;return r;}

,/**The Legendary "bld" function
 recursively build DomElements from json:params
 parent is optional
 if params is a string , then createTextNode under parent DomElement parent
 if params is an array , then bldTbl is called
 otherwise if params isnt a string(it is assumed that params is an object)
 where params should have properties:
 	n:string : (n)ame of element
 	t:(optional) string , create child text node and set the text to t
 	id:(optional)
 	name(optional)
 	clk:(optional) a ref to a function which will be a onclick handler
 	chng:(optional) a ref to a function which will be a onchange handler
 	s:(optional) object , where properties are set into the created-node's style
 	a:(optional) object , where properties are set into the created-node's properties and attributes
	onBld:function(params,n,parent)
 	c:(optional) array
 		, recursive function call to this bld function
 		, but with items of c as the param and this node as a parent
 		, Hence The POWER of this bld-function
 when params.n is "select" or "table", the internal implementation uses the functions bldSlct or bldTbl
 when params.n is "bldForm" or "bldModal" or "bldDataGrid", the named-function is called on params
 BuildDomTree params::= id
	,n:nodeName
	,t:text
	,clk:onclick-function
	,chng:onchange-function
	,a:jsobj-attributes
	,c:jsarray-children-recursive-params
	,s:jsobj-style
	,(depricated)clpsbl:string-title:collapsable
	; or params canbe string, or array:call bldTbl
	; parent: domElement 
	
	code:
		{n:'for',var:<str:varName>,arg:<str-eval or obj, to iterate-over>,obj:<str or obj>, range:[<int:from>,<int:to>,<int:step>]}
			{n:'if',arg}
				{n:'attrib',attrib:<str>}
		tag
		prop
		setProp
		
	arg:
		argument for 
	*/
bld:function sys_bld(params,parent,stack){
 try{if(!params)return params;else 
	if(params instanceof Array)return sys.bldTbl(params,parent,stack);
	if(typeof(params)=='string')return sys.dct(params,parent);
 var p=params,n=p.n?document.createElement(p.n)
	:p.sys!=undefined?document.createTextNode(p.t):p
	,nl=p&&p.n&&p.n.toLowerCase();
	if(p.n&&(p.t!=undefined))n.innerHTML=p.t;//n.appendChild(document.createTextNode(p.t));//changed:2017.03.18.06.04
	if(p.n&&nl=='input')n.type=(p.a?p.a.type:0)||'text';
	if(p.id)n.id=p.id;
	if(p.name||(p.a&&p.a.name))n.name=p.name||p.a.name;
	if(p.clk)n.onclick=p.clk;
	if(p.chng)n.onchange=p.chng;
	if(p.s)for(var i in p.s)n.style[i]=p.s[i];
	if(p.a)for(var i in p.a)if(i=='class')n.className=p.a[i];else n.setAttribute(i,n[i]=p.a[i]);
	if(p.onBld)try{
		p.onBld(p,n,parent, stack)//should we take return value to determine if we should use p.c?
	}catch(ex){console.error(ex,'sys.bld:p.onBld');}
	
	else If( p.code)
{var code=p.code
  ,a=p.arg||p.obj||p.arg={} 
  ,vr=p['var']||'i' 
  ,o=p.obj||p.p.arg
  p.code=0
  if(typeof a =='string')try{
	a=eval(a)
	}catch(ex){console.error('bld:code:prop:eval arg',ex)}
	
if( code.n == 'for' )
 for (var i in a){
  o[vr]=i
  var x= a[i ],b=[x,i,a,code]
    if( !stack ) stack=[ b ]
  else stack.push( b )
  sys. bld( params , parent , stack)
  stack.pop(  )
}//for i in p.arg
else if ( code.n =='if' )
{}
else if ( code.n =='attrib' )
{}
else if ( code.n =='tag' )
{}
else if ( code.n =='setProp' )
{}
else //if ( code.n =='prop' )
{sys.dct(a,n)
}

}//If( p.code )
	else if(p.c){if(nl=='select')sys.bldSlct(p,n);
		else if(nl=='table')sys.bldTbl (p,n);
		else for(var i=0;i<p.c.length;i++)
		 if(typeof(p.c[i])=='string')//sys.dct(p.c[i],n);
			n.appendChild(document.createTextNode(p.c[i]));
		else
			sys.bld(p.c[i],n);
	}
	//if(p.clpsbl)n=sys.createCollapsable(p.clpsbl,parent,p.id,n);else
	if(parent)parent.appendChild(n);
	}catch(ex){
		console.error('sys.bld:ex',ex);
		}
 return n;
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
		,tb=tbl?(tbl.tBodies[0]||tbl.createTBody()):0;
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

,/**create a select tag,
	pr is the parent DomElement
		, if Select, then uses this element
		, if pr is not select, then a child select is created
	params.select:the selected optional
	params.c:array of options in select
		each item in array-c can be a string
		or an object with (two properties:text and value )*/
bldSlct:function sys_BuildSelect(params,pr){
	var i,n,t,v,found=0
		,c=params.c
		,s=params.selected//||params.a.selected;
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

	example:
	div=sys.bldModal({n:'p',c:[{n:'h1',t:'Modal Dialog'},'inp:',{n:'select',selected:3,c:[8,5,3,'yea','joe']}]},document.body)
	*/
bldModal:function(params,pr){
	var div=sys.dce('div',pr),r;
	div.style.cssText="position: absolute; top: 25%; left: 25%; width: 50%; height: 50%;background-color:#f0f0ff; border: 3px solid blue; border-radius: 10px; padding: 15px; box-shadow: 10px 10px 5px #888888,10px 10px 15px #8888f8 inset,-10px -10px 15px #8888f8 inset;";
	sys.dcb(div,'x',function(){div.parentNode.removeChild(div);})
	sys.bld(params,div)
	return div;}

,/**params:
	modal:(boolean:optional:default false)
	h:fields:array
		,if item string,label and name-of-field and text-data-type
		,if item array then ix0 is label and name-of-field, and 2nd-item is array of enums of a drop-down-select
		,if object: name:name-of-field, t:label , type:('text','textarea','number','regex','datetime',,,ect)
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

 example:
 x=sys.bldForm(
	{	h:[
			{t:'no'
				,name:'no',readonly:true}
			,'path'
			,['contentType',['text/plain'
				,'text/html','text/json'
				,'text/javascript'
				,'image/png','text/css']]
			,{t:'lastModified'
				,name:'lastModified'
				,type:'date-time'}
			,{t:'data',name:'data',type:'textarea'}
		]
	 ,a:[5
		,'testPath'
		,'text/plain'
		,1000
		,'x'
		]
	}
  ,
  div=sys.bldModal({n:'h1',t:'Modal Dialog &amp; bldForm'},document.body)
  )

*/
bldForm:function(params,pr){
	if(!params||!params.h||!params.a)
		return;
	var p=params
	,tbl=p.tbl= ((pr&&pr.nodeName=='TABLE')?
		pr:sys.dce('table',pr,null,p.id))
	,tb=tbl?(tbl.tBodies[0]||tbl.createTBody()):0
	,h=p.h,a=p.a
	,hi,ht,ai,tr,td,th,x;
	p.dataNodes=[];
	for(var i in h){
		tr=tb.insertRow();
		hi=h[i];ht=typeof(hi)
		ai=a[i]
		th=sys.dce('th',tr);
		td=tr.insertCell();
		if(ht=='string')
		{	sys.bld(hi,th);x=0
			p.dataNodes.push(
				ai!=undefined && ai!=null
				?x=sys.dci(td,ai,hi)
				:a[i]);
			if(x){x.name=hi;x.className=p.clss||'data';}
		}
		else if(hi instanceof Array){
			sys.bld(hi[0],th);
			var c=hi[1];
			p.dataNodes.push(
				x=sys.bldSlct({clss:p.clss||'data'
					,c:c,selected:ai},td))
			x.name=hi[0]
		}else{var nm=hi.name||hi.t,ttl=hi.t||nm;sys.bld(ttl,th);switch(hi.type){
			case 'textarea':
				p.dataNodes.push(x=sys.dce('TEXTAREA',td));
				x.className=p.clss||'data';//hi.clss||
				x.name=nm;
				x.value=ai
				break;
			case 'select':
				p.dataNodes.push(x=sys.bldSlct({selected:ai,c:p.c||p.a},td));
				x.className=hi.clss||'data';
				x.name=nm;
				break;
			case 'hidden':tr.style.display='none';
			default: //case 'password':case 'radio':case 'checkbox':case 'date':case 'datetime':case 'number':case 'regex':case 'file':case 'slider':
				p.dataNodes.push(x=sys.dci(td));
				x.type=hi.type;
				x.name=nm;
				var cr=hi.type=='checkbox'||hi.type=='radio'
				if((cr&&hi.value)||ai!=undefined)//
					x.value=cr?hi.value:ai
				x.className=p.clss||'data';//hi.clss||
				if(cr&& ai==hi.value)
					x.checked=x.selected=(hi.value||true);
			}for(var j in hi)if(j!='clss')
				x.setAttribute(j,x[j]=hi[j])
		}
	}
	p.getJson=function(){var p=this.p||p||this,d=this.dataNodes||(p&&p.dataNodes)||[],r={};
		for(var i in d){
			var x=d[i];
			if(x.nodeName=='SELECT')
			{var j=x.selectedIndex;if(j!=-1){
				var o=x.options[j],v=o.value;
				r[x.name]=v!=undefined&&v!=null?v:o.text;}}
			else if(x.type=='checkbox'||x.type=='radio')
			{if(x.checked||x.selected)
				r[x.name]=x.value;}
			else
				r[x.name]=x.value;
		}return r;}
	p.getJson.p=p
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
 *	data: body data of the xhr request sent to the server ,default null, if not string then will be JSON.stringify(data)
 *	headers: json-object of name/value , set as request headers, defaults to null
 *	responseType:(optional)  "arraybuffer", "blob", "document", "json", or "text" , xhr defaults to "text"
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
 * */
xhr:function sys_xhr(p){
 if(!p)return p;
 var ct='Content-Type',cs='charset'
		,x=typeof XMLHttpRequest === "undefined"
		?new ActiveXObject("microsoft.XMLHTTP")
		:new XMLHttpRequest();x.p=p;p.xhr=x;
	x.open(p.method||'POST',p.url||'xhr.jsp', p.onload );
	if(p.headers)for(var i in p.headers)
		x.setRequestHeader(i,p.headers[i]);//console.log('scriptedReq:header['+i+']:'+headers[i]);
	if(!p.headers || !p.headers[ct])x.setRequestHeader(ct, 'text/json');//'application/x-www-form-urlencoded');
	if(!p.headers || !p.headers[cs])x.setRequestHeader(cs, 'utf-8');
	if(p.onload)x.onload=p.onload
	if(p.onprogress)x.onprogress=p.onprogress
	if(p.onerror)x.onerror=p.onerror
	if(p.responseType)x.responseType=p.responseType
	try{
	x.send((typeof p.data)=='string'?p.data:JSON.stringify(p.data));
	}catch(ex){console.error('sys.xhr:',ex,arguments);}
	console.log('xhr:response:',x.response,p,x);
	return x.response;//p.asJson?JSON.parse ( x . responseText ) : x . responseText ;
	}//function xhr

,bootStrap:{
	init:function(){try{
		sys.gui.introspection.storage.resetList()
		}catch(ex){console.error('sys.bootStrap.init:sys.gui.introspection.storage.resetList():',ex);}
		if(sys.bootStrap.onloadA)
		 for(var i=0,a=sys.bootStrap.onloadA;i<a.length;i++)try{
			 a[i][0](a[i][1],i)
	 }catch(ex){console.error('sys.bootStrap.init.onloadA:',ex);}
	}//init
	,addOnload:function addOnload(f,o){
		if(document.body)f(o);else{
		if(!sys.bootStrap.onloadA)
		sys.bootStrap.onloadA=[];
		sys.bootStrap.onloadA.push([f,o]);
	}}
}//bootStrap
 ,gui:{
  introspection:{
   storage:{
	init:function(parent){
	 sys.gui.introspection.storage.resetList(parent);
	}//init
	,resetList:function(parent){var args={data:{op:sys.Op.StorageList} ,parent:parent
		,onload:function(xhr,args){
			if(!args){
				args=xhr.response||(xhr.target&&xhr.target.response )
				args=JSON.parse(args);}
			sys.gui.introspection.storage.bldScreen(args['return'],args.parent,args);}}
		sys.xhr(args);
	}
	,bldScreen:function(a,p){
		if(!a)a=[['Storage.C.no' , 'Storage.C.path' , 'Storage.C.contentType' , 'Storage.C.lastModified','Storage.C.data']]
		if(!p)p=document.body
		else p.innerHTML='';
		var b,ttl='sys.gui.introspection.storageEntriesTable';sys.dce('h1',p,ttl)
		b=[	{	t:'Reload all Storage entries'
				,c:function(){console.log(ttl,'Reload all Storage entries','sys.gui.introspection.storage.bldScreen.btn.onclick',arguments);
					sys.gui.introspection.storage.resetList();}
			}
			,{	t:'New Storage entry'
				,c:function(){
					var sc=sys.dbSchema.storage.def.columns
					,formH=[{t:sc[0].name,readonly:true}
						,sc[1]
						,[sc[2].name,sc[2].type]
						,sc[3],sc[4]]
					form=sys.bldForm(
						{	h:formH
						 ,a:[5
							,'testPath'
							,'text/plain'
							,1000
							,'x'
							]
						}
						,
						div=sys.bldModal({n:'h1',t:'New Storage Entry Form'},document.body)
					)// form=sys.bldForm
					sys.dcb(div,'Create new entry',function(){
						var reqData=form.getJson();reqData.op=sys.Op.StorageNew
						var req=
						{data:reqData,responseType:'json',
							onload:function(rsp,x){
								console.log('Op.StorageNew:xhr.onload',arguments
									,'TODO:need to implement js-onxhr-ok for gui/dom '
								);//console.log
								var tb,tbl=sys.gui.introspection.storage.entriesTable
								if(!tbl)
									return;
								tb=(tbl.tBodies[0]||tbl.createTBody())//if(!tb)return;
								var tr=tb.insertRow(),x=rsp['return'];
								//five columns:no,path, contentType, lastModified, data
								for(var i in formH)
								{var td=tr.insertCell(),x=reqData[formH[i].name];
								 if(x)
									sys.bld(x,td);
								}
							},
							onprogress:function(e){
								console.log('Op.StorageNew:xhr.onprogress',arguments
									,'TODO:need to implement js-onxhr for gui/dom '
									,e.loaded,e.total,Math.round(100*e.loaded/e.total),'%'
								);//console.log
							},
							onerror:function(){
								console.log('Op.StorageNew:xhr.onerror',arguments
									,'TODO:need to implement js-onxhr for gui/dom '
								);//console.log
							}
						}//req
						sys.xhr(req)
					 }//function onclick:button:'Create new entry'
					)//dcb
					//sys.xhr(req)
				}//function onclick
			}//button:new Entry
		]//array b
		b.map(function(o,i){if(o.req)sys.dcbx(p,o.t,o.req);else sys.dcb(p,o.t,o.c);})
		var funcOnDoneCell=function funcOnDoneCell(td,cellObj,rowIx,cellIx,rObj,bObj)
				{var obj={td:td,cellObj:cellObj,cellIx:cellIx,rowObj:rObj,rowIx:rowIx,tbodyParam:bObj}
				,str='sys.gui.introspection.storage.resetList:bldTbl.cell:Storage.C.'
				// console.log('sys.gui.introspection.init.bldTbl.onDoneCell:td,cellObj,rowIx,cellIx,rObj,bObj:',obj)
					if(cellIx==0){//Storage.C.no //primary-key
						sys.dcb(td,'delete',function(){
							console.log(str,'no:td.onclick:',obj)
							if(confirm('Please confirm deletion of:',obj)){
								console.log(str,'no:td.onclick:confirmed delete',obj)
								alert('not implemented yet')
							}
						})
					}else if(cellIx==1){//Storage.C.path
						sys.dcb(td,'rename-path',function(){
							var x=prompt('Please enter new path:',obj.cellObj[1]);//console.log(str,'path:td.onclick:',obj)
							if(x){
								console.log(str,'path:td.onclick:confirmed rename:',x,obj)
								alert('not implemented yet')
							}
						})
					}else if(cellIx==2){//Storage.C.contentType
						sys.dcb(td,'change-contentType(drop-down-select)',function(){
							console.log(str,'contentType:td.onclick:',obj)
						})
					}else if(cellIx==3){//Storage.C.lastModified
						sys.dcb(td,'load-data/reload',function(){
							console.log(str,'lastModified:td.onclick:',obj)
						})
					}
				}
		function reformatSqlQueryHeadingsForBldTbl(h){
			/*sqlQueryHeading:[{name:<str:colName>,,,} ,,,] , output:[<str:colName>,,,]*/
			var a=[];for(var i=0;i<h.length;i++)a[i]=h[i].name
			return a;}
		sys.gui.introspection.storage.entriesTable=sys.bldTbl(
			{	c:a.a
				,headings:reformatSqlQueryHeadingsForBldTbl(a.h)
				,onDoneCell:funcOnDoneCell
			},p)
	}//introspection.storage.bldScreen
//   storage
	}//introspection.storage
  }//introspection

}//gui

}//sys

console.log('sys.js loaded.');
 if(document.body)
    sys.bootStrap.init()
 else
    window.onload=sys.bootStrap.init
