App=window.App=
{$:function App$(p){if(App.$.isLoaded)
		return App.did(p);
	else{	if(!App.$.onloadQ)App.$.onloadQ=[p];
		else App.$.onloadQ.push(p);}}

,onload:window.onload=function AppOnload(e){
	App.$.isLoaded=true;//App.parseDomOnLoad();
	if(App.$.onloadQ)
		for(var i in App.$.onloadQ)try{
			App.$.onloadQ[i](e)}
		catch(ex){console.log('App.$.onloadQ,i=',i,',ex=',ex);}}


,parseDomOnLoad:function App_parseDomOnLoad(){
	var arg,dbg=window.arg=arg=null,dyn='script-'//onload-,dyns=['showIf', 'repeat','xhr', 'component','disableIf','element','text'];
	//window.argStack=argStack=[dbg]
	if(!String.prototype.startsWith)String.prototype.startsWith=function StringStartsWith(p){return this.indexOf(p)==0;}
	function evl(p,v)
	{	var e,s1='with(window.t){',s2='\n}}';if(v)try
		{	if((window.t=p)&&p.arg)
				s1+='with(window.t.arg){\n';
			else if(window.withArg)
				s1+='with(window.withArg){\n';
			else s2='\n}';
			e=eval(s1+v+s2,p);//eval.apply(obj||p,[v]);
			if((dbg=window.arg)!=null)
			{	p.arg=window.arg;window.arg=null;
			}
		}catch(ex)
		{	console.log('nod:',
				dyn,':eval:nm=',nm,'v=',v,
				'attrib=',a[i],',p=',p,ex);
		}
		if(!p.evalOnLoad)
			p.evalOnLoad=e;
		else if(p.evalOnLoad instanceof Array)
			p.evalOnLoad.push(e)
		else
			p.evalOnLoad=[p.evalOnLoad,e];
		return e;
	}function remAtt(p,n){if(!p)return;p[n]=null;if(p.removeAttribute)
		p.removeAttribute(n);}

	function nod(p,prnt)
	{	try
		{	var a=p.attributes,e,x,xarg=null,v,showif=1;
			function nodComponent(){
				x=0;e=App.templates[v]
				if(e instanceof Element)
					x=e.cloneNode(true);
				if(x)
				{	x.component={template:e,replaces:p,name:v }
					arg=x.arg=p.arg;
					//var prnt=p.parentNode,prv=p.previousSibling;
					remAtt(x,dyn+'component');//TODO: p.argPath
					x.prnt=p.parentNode||prnt;
					var w=nod(x,prnt||(prnt=p.parentNode));
					prnt.replaceChild(x,p);
					return w
				}
			}//function nodComponent
			function nodRepeat(){
				var nx=p.nextSibling,t=p;
				if(!prnt)
					prnt=p.parentNode;
				prnt.removeChild(t);
				t.repeatExpression=v;//t[dyn+'repeat'];
				remAtt(t,dyn+'repeat');//t[dyn+'repeat']=null;
				if(arg=t.arg=e)for(var i in e)try
				{	p=t.cloneNode(true);
					p.repeatTemplate=t;
					arg=p.arg=e[i];p.prnt=t.parentNode||prnt;
					p.argI=i;//TODO: p.argInfo
					p.argPath=(
						((x=prnt)&&x.argPath)?x.argPath+'.'
						:(x&&(x=x.parentNode)&& x.argPath)
						?x.argPath+'.'
						:'')+i;
					var w=nod(p,prnt)
					if(nx)
						prnt.insertBefore(p,nx)
					else prnt.appendChild(p);
					p=w;
				}catch(ex)
				{	console.log('nod:repeat,j=',j,ex)
				}//for i
				return p;//nx;formInit(p);
			}//function nodRepeat
			if(a)for(var i=0;showif&&i<a.length;i++)
			{	var nm=a[i].name;
				if(nm.startsWith(dyn))
				{	nm=nm.substring(dyn.length);
					v=a[i].value;window.arg=e=null;
					if(nm=='template')
						e=v;else
					{	if(xarg)
							window.withArg=arg=xarg;
						else{x=(p&& !p.arg && ! p.
								parentNode && prnt )//window.prnt=prnt;
								?prnt:p;
							while(x && !x.arg)x=x.parentNode||x.prnt;
							if(x && x.arg)
								window.withArg=xarg=arg=x.arg;
						}
						if(nm=='component')
						{	if((x=v.indexOf(';'))>-1)
							{	e=v.substring(x+1);
								v=v.substring(0,x);
								e=evl(p,e)//=window.arg dbg=
								if(p.arg==undefined)arg=p.arg=e;
							}else e=v;//v=null;
						}else e=evl(p,v);
						if(window.withArg)window.withArg=null;
					}
					if('text'==nm)
						p.innerText=e;
					else if('html'==nm)
						p.innerHTML=e;
					else if('showif'==nm||'showIf'==nm)
						p.style.display=(showif=e)?'':'none';
					else if(nm.startsWith('attrib-'))
					{	nm=nm.substring(7);p[nm]=e;
					}
					else if(nm.startsWith('style-' ))
					{	nm=nm.substring(6);p.style[nm]=e;
					}
					//else if('attrib'==nm){}//else if(nm.startsWith('assign-')){}
					//else if('style'==nm){}
					//else if('xhr'==nm){}
					//else if('script'==nm){}
					//else if(nm.startsWith('onEvent-')){}
					//else if('build'==nm){}
					else if('template'==nm)
					{	if(!App.templates)App.templates={};
						if(!App.templates[v]){
							p.templateName=v;
							remAtt(p,dyn+'template');
							App.templates[v?v:
							App.templates.length]=p//.template=p.cloneNode(true);
							var prv=p.previousSibling;
							if(!prnt)prnt=p.parentNode;
							prnt.removeChild(p);
							p=prv;showif=0;
					}}
					else if('component'==nm)
						return nodComponent();
					else if('repeat'==nm)
						return nodRepeat()
				}//if(nm.startsWith(dyn))
			}//for i
			if(showif)
			{	//formInit(p)::=if else if
				if(p.nodeName=='FORM')
					p.onSubmit=App.onFormSubmit_doXHR;
				else if(p.nodeName=='INPUT')
				{	 if(p.type=='SUBMIT')
					{	if( !p.onclick)
							p.onclick="this.time=(new Date()).getTime()";
						else console.log(
							'parseDomOnLoad:Input.submit onclick pre-set:',p);
					}
				}
				x=p.firstChild;
				while(x)
				{	if(x.nodeType==Node.ELEMENT_NODE)
						x=nod(x,p);
					x=x.nextSibling;
				}
			}
		}catch(ex){console.log('nod:exception:',ex);}
		return p;
	}//nod
	nod(document.body);
}//function parseDomOnLoad

,onFormSubmit_doXHR:function App_onFormSubmit_doXHR(e){
	e.preventDefault();
	var f=e.target?e.target:this,json={},a,b,
		t=['INPUT','SELECT','TEXTAREA'],i,j,y;
	if(f.name)json.formName=f.name;
	for(j=0;j<t.length;j++){
		a=f.getElementsByName(t[j]);
		for(i=0;i<a.length;i++){
			y=a[i].type;
			b=y=='SUBMIT';
			if(b)
			{	if(!f.submitButtons)
					f.submitButtons={};
				b=f.submitButtons[a[i].name] ;
				if(!b)f.submitButtons[a[i].name]=a[i];
				else if( a[i].time<=b.time){b=false;
					f.submitButtons[a[i].name]=a[i];}
			}//if
			if(!b||((y=='RADIO'||y=='CHECKBOX'
				)&&a[i].checked)){
				b=(j==1?a[i].options[a[
						i].selectedIndex]
					:a[i]).value;y=
				json[a[i].name];
				json[a[i].name]=
					y==undefined?b
					:y instanceof Array
					?y.push(b)
					:[y,b]
			}//if
		}//for i
	}//for j
	console.log('onFormSubmit_doXHR:form=',f,',json=',json);
	var result=xhr({data:json,asJson:1,asyncFunc:function asyncFunc(x,p){
		var r=x . responseText;
		console.log('onFormSubmit_doXHR.asynFunc:r=',r,' ,x=',x,' ,p=',p);}});
	console.log('onFormSubmit_doXHR:result=',result);
	return false;}//function onFormSubmit_doXHR

,dom2json:function AppDom2json(n){
	function indexOf(a,e){var i=a.length-1;for(;i>=0&&a[i]!=e;i--);return i;}
	var r={n:n.nodeName},a=n.attributes,x=a&&a.length;
	if(n.id)r.id=n.id;
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
	x=n.firstChild;
	if(x&&!x.nextSibling&&x.nodeType==Node.TEXT_NODE)
	{var v=x.value||x.data;if(v.trim())	
		r.t=v;}
	else if(x && x.nodeName!='SCRIPT'){r.c=[];
		while(x)
	{	if(x.nodeType==Node.ELEMENT_NODE)
		{if(x.nodeName!='SCRIPT')	r.c.push(App.dom2json(x));}
		else if(x.nodeType==Node.TEXT_NODE)
		{var v=x.value||x.data;if(v.trim())	r.c.push(v);}
		else console.log('dom2json:unknown nodeType:',n);
		x=x.nextSibling;}}
	return r;}//dom2json

//2015-06-09-13-30
//console.log('app.js loaded.');

,did:function App_did(id,n){if(!n)return document.getElementById(id);
	var r=n;n=n.firstChild;while(n)if(n.id==id)return n;else n=n.nextSibling;
	n=r.firstChild;while(n)if(r=did(id,n))return r;else n=n.nextSibling;}


,dce:function App_dce(n,p,t,i){var r=document.createElement(n);if(i)r.id=i;if(t)App.dct(t,r);if(p)p.appendChild(r);return r;}

,dcb:function App_dcb(p,t,i,c){var r=App.dce('button',p,t,i);r.onclick=c;return r;}

,dct:function App_dct(t,p){var r=document.createTextNode(t);if(p)p.appendChild(r);return r;}

,dci:function App_dci(p,val,id,c,typ){var r=document.createElement('input');r.type=typ||'text';
	if(id)r.id=id;if(val)r.value=val;if(p)p.appendChild(r);if(c)r.onchange=c;return r;}

,bld:function App_bld(params,parent){//BuildDomTree params::= id ,n:nodeName ,t:text ,clk:onclick-function ,chng:onchange-function ,a:jsobj-attributes ,c:jsarray-children-recursive-params ,s:jsobj-style ,clpsbl:string-title:collapsable; or params canbe string, or array:call bldTbl ; parent: domElement
 var t=App;try{if(typeof(params)=='string')return t.dct(params,parent);
 var p=params,n=p.n?document.createElement(p.n):p.t!=undefined?document.createTextNode(p.t):p;
	if(p.n&&(p.t!=undefined))n.appendChild(document.createTextNode(p.t));
	if(p.n&&p.n.toLowerCase()=='input')n.type=(p.a?p.a.type:0)||'text';
	if(p.id)n.id=p.id;
	if(p.name||(p.a&&p.a.name))n.name=p.name||p.a.name;
	if(p.clk)n.onclick=p.clk;
	if(p.chng)n.onchange=p.chng;
	if(p.s)for(var i in p.s)n.style[i]=p.s[i];
	if(p.a)for(var i in p.a)n[i]=p.a[i];
	if(p.c){if(p.n&&p.n.toLowerCase()=='select')t.bldSlct(p.c,n,p);
		else if(p.n&&p.n.toLowerCase()=='table')t.bldTbl (p,n);
		else for(var i=0;i<p.c.length;i++)
		 if(typeof(p.c[i])=='string')//t.dct(p.c[i],n);
			n.appendChild(document.createTextNode(p.c[i]));
		else 
			t.bld(p.c[i],n);
	}
	//if(p.clpsbl)n=t.createCollapsable(p.clpsbl,parent,p.id,n);else 
	if(parent)parent.appendChild(n);
	}catch(ex){console.error('App.bld:ex',ex);}return n;
}//function bld

,/** params: same as bld.params
		.columnsHidden integer count of the first columns that should not generate html
		, .c  2 dimensional array of elements ,this method will nest each elem in a TD 
			, and the elem is same as bld.params,recursive
		, .headings 1dim array , this method nests each elem in a TH, and the elem is same as bld.params 
		, .footer
	, pr:parent dom-element , based-on/uses dce
	*/
 bldTbl:function App_BuildHtmlTable(params,pr){
	var tbl=pr&&pr.nodeName=='TABLE'?pr:dce('table',pr,null,params?params.id:0),tb=tbl?tbl.tBodies[0]:0;
	if(params.headings){var ht=tbl.tHead,a=params.headings,tr,th;if(!ht)ht=tbl.createTHead();tr=th.children?th.children[0]:0;if(!tr)tr=ht.insertRow();for(var i in a)if(!(params.columnsHidden>=i)){th=dce('th',tr);bld(a[i],th);}}
	if(params.c){var r,a=params.c,tr,td;for(var i in a){tr=tb.insertRow();tr.pk=a[i][j];if(a[i])for(var j in a[i])if(!(params.columnsHidden>=i)){td=tr.insertCell();bld(a[i][j],td);}}}
	if(params.footer){var ht=tbl.tFoot,a=params.footer,tr,td;if(!ht)ht=tbl.createTFoot();tr=ht.children?ht.children[0]:0;if(!tr)tr=ht.insertRow();for(var i in a)if(!(params.columnsHidden>=i)){td=tr.insertCell();bld(a[i],td);}}
	return tbl;}

,bldSlct:function App_BuildSelect(a,pr,params){
	var c=params.c,i,n,t,v,s=params.selected||params.a.selected;
	for(i=0;c&&i<c.length;i++){pr.options[pr.options.length]=n=typeof(c[i])=='string'
		||!((c[i] instanceof Array&&c[i].length>1)||c[i].value)?new Option(t=v=c[i])
		:new Option(t=(c[i].text||c[i][0]),v=(c[i].value||c[i][1]));if(s==t||s==v)n.selected=true;}}

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
 bldDataGrid:function App_BuildDataGrid(url,pr){
 var x=xhr(url)
 bldTbl({},pr);
}

,/**facade function to wrap title-text into a structure for bld*/
fset:function App_fset(ttl,a,args){
 var x={n:'legend',t:ttl};
	if(!(a instanceof Array))a=[x,a];
	else a.unshift(x);
	if(args&&args.length>2)for(var i=2;i<args.length;i++)a.push(args[i]);
	return {n:'fieldset',s:{padding:'1px',margin:'1px'},c:a }; }

,ttlTxt:function App_ttlTxt(ttl,p){
 if(!p.s)p.s={};
	p.n='input';
	p.s.border='0px solid while';
	if(!p.s.width)p.s.width='100%';
	return fset(ttl,p,arguments);}

,/**
 * parameter p attributes
 *	data: body data of the xhr request sent tot the server ,default null
 *	headers: json-object of name/value , set as request headers, defaults to null
 *	asyncFunc: reference to a function that is called in asynchronous mode , when the server successfully responds the func is given as a param the xhr obj and second param p, defaults to null which is synchronise mode
 *	method: string , POST, GET, defaults to POST
 *	url: the url of xhr , defaults to empty string
 *	asJson:boolean, if true returns JSON.parse(xhr.responseText) else returns xhr.responseText
 * //as: string 'text' , 'json' , defaults to text //'html', 'xml' 
 * */
xhr:function App_xhr(p){//data,callBack,asText)
 if(!p)return p;
 var ct='Content-Type',cs='charset',x=App.isIE?new 
		ActiveXObject("microsoft.XMLHTTP")
		:new XMLHttpRequest();
	x.open(p.method||'POST',p.url||'', p.asyncFunc);
	if(p.headers)for(var i in p.headers)
		x.setRequestHeader(i,p.headers[i]);//console.log('scriptedReq:header['+i+']:'+headers[i]);
	if(!p.headers || !p.headers[ct])x.setRequestHeader(ct, 'text/json');//'application/x-www-form-urlencoded');
	if(!p.headers || !p.headers[cs])x.setRequestHeader(cs, 'utf-8');
	if(p.asyncFunc)x.onreadystatechange=
		function App_xhrAsync()
		{if (x.readyState === 4 && x.code==200)
			p.asyncFunc(x,p);
		};
	//if(p.headers)for(var i in p.headers)x.setRequestHeader( i , p.headers [ i ] ) ; //setRequestHeader( Name, Value )

	x.send((typeof p.data)=='string'?p.data:JSON.stringify(p.data));//console.log('scriptedReq:response:'+ajax.responseText);
	//return asText?x.responseText:async?0:eval('('+x.responseText+')');
	console.log('xhr:',p,x);
	return p.asJson?JSON.parse ( x . responseText ) : x . responseText ;
	}//function xhr

,isIE:(typeof XMLHttpRequest === "undefined")

}//App

console.log('app.js loaded.');


