dom2jb=function dom2jb(o,onDone){
	var t={callCount:0//,response:null
		,onDone:onDone
		,stack:
		[{o:o,i:0,n:1,nm:o&&o.
			constructor&&o.constructor.name
			,fn:dom2jb.prototype.toJb
			,r:null
		}]};
	t.prototype=dom2jb.prototype
	while(t.stack.length>0)
		t.run(t);//TODO: worker:t.run();
	return t;
}//dom2jb

dom2jb.prototype=
{run:function(t){if(!t)t=this;
	var s=t.stack,sn=s.length,f=[sn-1],fn=f.fn;
	if(f.i++<f.n)
		fn(t);
	else if(sn<2)
		t.onDone(f.r,t);
	else{
		s.pop();run(t);}}

/*,toJb:function toJb(t)
{var s=t&&t.stack,sn=s&&s.length,f=s&&s[sn-1],o=f&&f.o
	,nm=o&&o.constructor&&o.constructor.name
	,fn=dom2jb[nm]||dom2jb.props
	f.fn=f;
}//function toJb*/

,keys function(o){var a=[];for(var k in o)a.push(k);return a;}

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
 }}//isInStack

 ,props:function(o,t){
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
	if(o){var stk=t.stack||[]
		,x=dom2jb.isInStack(o,stk);
		if(x)return x;
		var f={r:{},fn:props,o:o,i:0,keys:keys(o)
		,nm:o&&o.constructor&&o.constructor.name}
		f.n=f.keys.length
		stk.push(f)
		f.fn=function prps(t,f)
		{var x=z.o[z.i++];
			if(x!=undefined&&x!=null){//&&x!=''
				n=x&&x.constructor&&x.constructor.name
				f=dom2jb[n];if(f)
					a[i]=f(x)
				else{
					f=classNames[n]
					a[i]=f?cssLib.props(x):x
				}
			}
		}
		stk.pop();
		return a;
	}
	}
 ,list:function(o,stack){
	var a=[]
	,stk=stack||[],sf=[a,o]
	,n=cssLib.isInStack(o,stk);
	if(n)return n;stk.push(sf)
	n=(o&&o.length)||0;
	for(var i =0;i<n;i++)
		a.push(cssLib.toJb(o[i]))
	stk.pop();
	return a;}
 ,'StyleSheetList':function(o,stack){return cssLib.list(o,stack);}
 ,'CSSRuleList':function(o,stack){return cssLib.list(o,stack);}
 ,'CSSStyleSheet':function(o,stack){
	var a={},b=['href','type','title','disabled','media']
	,stk=stack||[],sf=[a,o]
	,n=cssLib.isInStack(o,stk);
	if(n)return n;stk.push(sf)
	for(var i=0;i<b.length;i++)
	{n=b[i],x=o[n];if(x&&x!='')
		a[n]=x;}
	b=o.rules||o.cssRules//CSSRuleList
	if(b)a.s=cssLib.list(b,stk);
	//for(var i=0;b&&b.length&&i<b.length;i++)c.push(cssLib.toJb(b[i]))
	stk.pop();
	return a;}
 ,'CSSStyleDeclaration':function(o,stack){
	var n=o&&o.length||0,a={x:{}}
	,stk=stack||[],sf=[a,o]
	,n=cssLib.isInStack(o,stk);
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
	,x=cssLib.isInStack(n,stk);if(x)return x;stk.push(sf)
	x=a&&a.length
	if(n.id)r.id=n.id;if(!meta){stk[0][0].meta=meta={}}
	if(x)for(var i=0;i<x;i++)
	{	var nm=a[i].name,v=a[i].value;
		if( v!=undefined && nm!='id' && nm!='style' )
		{if(!r.a)r.a={};
			r.a[nm]=v;
			if(v&&v.indexOf&&v.indexOf('url(')!=-1)//(v.startsWith&&v.startsWith('url(')||(v.substring&&v.substring(0,4)=='url(')){
			{	console.log('dom2json:attrib:val has url:',n,nm,v)
				if(!meta.urls)meta.urls=[];meta.urls.push([r,n,nm,v])
			}
		}
	}
	if(n.style && n.style.cssText){
		var m,v,z;a= n.style.cssText.split(';')
		if(a  ){r.s={}; //&&(! z.trim || z.trim())
		  for(var i in a){
			z=a[i].split(':');m=z[0];v=z[1];
			if( m && m.trim) m=m.trim();
			if( v && v.trim) v=v.trim();			
			if(v!=undefined && (v.length==undefined || v.length>0))//&& (!v.trim || v.trim()))
			{r.s[m]=v;
				if(v&&v.indexOf&&v.indexOf('url(')!=-1)//(v.startsWith&&v.startsWith('url(')||(v.substring&&v.substring(0,4)=='url(')){
				{	console.log('dom2json:styl:val has url:',n,m,v)
				if(!meta.urls)meta.urls=[];meta.urls.push([r,n,m,v])
				}
			}
	}}}
	if(n.nodeName=='LINK'){
		//z.css=cssLib.toJb(document.styleSheets)
		//var tsf=stk[0],top=tsf[0].meta;
		//if(!top)top=tsf[0].meta={links:[]};
		//if(!top.links)top.links=[];
		//top.links.push(sf)
		if(!meta.links)meta.links=[];meta.links.push(sf)
		console.log('dom2json:links:stackFrame=',sf,',meta=',meta,',stack=',stk,',currentObj=',r,n);
	}else if(n.nodeName=='SCRIPT'){
		if(!meta.scripts)meta.scripts=[];meta.scripts.push(sf)
		console.log('dom2json:scripts:stackFrame=',sf,',meta=',meta,',stack=',stk,',currentObj=',r,n);
	}else if(n.nodeName=='IMG'){
		if(!meta.imgs)meta.imgs=[];meta.imgs.push(sf)
		if(!meta.imgsBase64)meta.imgsBase64={}
		var src=n.src,z=meta.imgsBase64[src];
		if(z)
			console.log('dom2json:img:repeated-src:previous result:',z,', current-img:',n);
		else{z=meta.imgsBase64[src]={src:src}
			var canvas = document.createElement('CANVAS');
			var ctx = canvas.getContext('2d');
			canvas.height = n.height;
			canvas.width = n.width;
			ctx.drawImage(n, 0, 0);
			z.base64 = canvas.toDataURL('png');}

		console.log('dom2json:imgs:stackFrame=',sf,',meta=',meta
			,',stack=',stk,',currentObj=',r,n,',meta.imgsBase64[',src,']=',z);
	}if(n.src){
		if(!meta.src)meta.src=[];meta.src.push(sf)
		console.log('dom2json:src:stackFrame=',sf,',meta=',meta,',stack=',stk,',currentObj=',r,n);
	}if(n.href){
		if(!meta.href)meta.href=[];meta.href.push(sf)
		console.log('dom2json:href:stackFrame=',sf,',meta=',meta,',stack=',stk,',currentObj=',r,n);
	}
	x=n.firstChild;
	if(x&&!x.nextSibling&&x.nodeType==Node.TEXT_NODE)
	{var v=x.value||x.data;if(v.trim())	
		r.t=v;}
	else if(x )//&& x.nodeName!='SCRIPT')
	{r.c=[];while(x)
	 {	if(x.nodeType==Node.ELEMENT_NODE)
		{var z=cssLib.dom2json(x,meta,stk)
			r.c.push(z);
		}//if(x.nodeName!='SCRIPT')
		else if(x.nodeType==Node.TEXT_NODE)
		{var v=x.value||x.data;if(v.trim())	r.c.push(v);}
		else console.log('cssLib.dom2json:unknown nodeType:',x);
		x=x.nextSibling;}}
	if(!stack)
		meta.css=r.css=cssLib.toJb(document.styleSheets,[])
	else stk.pop()
	return r;}//dom2json
 ,init:function(){
	var a=[{},{}]
	a[2]=cssLib.dom2json(document.head,a[0],[])
	a[3]=cssLib.dom2json(document.body,a[1])//,cssSheetList2jb(document.styleSheets)
	return {n:'html',c:a};//JSON.stringify(a,null,4)
 }//init:function
 
}//dom2jb.prototype


cssLib={toJb:function(o,stack){
	var n=o&&o.constructor&&o.constructor.name
	,f=cssLib[n]
	return f?f(o):cssLib.props(o);}
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
		,x=cssLib.isInStack(o,stk);if(x)return x;stk.push(sf)
		var n=o&&o.constructor&&o.constructor.name;
		if(n)a.constructorName=n;
		for(var i in o)
		{x=o[i];
			if(x!=undefined&&x!=null){//&&x!=''
				n=x&&x.constructor&&x.constructor.name
				f=cssLib[n];if(f)
					a[i]=f(x)
				else{
					f=classNames[n]
					a[i]=f?cssLib.props(x):x
				}
			}
		}
		stk.pop();
		return a;
	}
	}
 ,list:function(o,stack){
	var a=[]
	,stk=stack||[],sf=[a,o]
	,n=cssLib.isInStack(o,stk);
	if(n)return n;stk.push(sf)
	n=(o&&o.length)||0;
	for(var i =0;i<n;i++)
		a.push(cssLib.toJb(o[i]))
	stk.pop();
	return a;}
 ,'StyleSheetList':function(o,stack){return cssLib.list(o,stack);}
 ,'CSSRuleList':function(o,stack){return cssLib.list(o,stack);}
 ,'CSSStyleSheet':function(o,stack){
	var a={},b=['href','type','title','disabled','media']
	,stk=stack||[],sf=[a,o]
	,n=cssLib.isInStack(o,stk);
	if(n)return n;stk.push(sf)
	for(var i=0;i<b.length;i++)
	{n=b[i],x=o[n];if(x&&x!='')
		a[n]=x;}
	b=o.rules||o.cssRules//CSSRuleList
	if(b)a.s=cssLib.list(b,stk);
	//for(var i=0;b&&b.length&&i<b.length;i++)c.push(cssLib.toJb(b[i]))
	stk.pop();
	return a;}
 ,'CSSStyleDeclaration':function(o,stack){
	var n=o&&o.length||0,a={x:{}}
	,stk=stack||[],sf=[a,o]
	,n=cssLib.isInStack(o,stk);
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
	,x=cssLib.isInStack(n,stk);if(x)return x;stk.push(sf)
	x=a&&a.length
	if(n.id)r.id=n.id;if(!meta){stk[0][0].meta=meta={}}
	if(x)for(var i=0;i<x;i++)
	{	var nm=a[i].name,v=a[i].value;
		if( v!=undefined && nm!='id' && nm!='style' )
		{if(!r.a)r.a={};
			r.a[nm]=v;
			if(v&&v.indexOf&&v.indexOf('url(')!=-1)//(v.startsWith&&v.startsWith('url(')||(v.substring&&v.substring(0,4)=='url(')){
			{	console.log('dom2json:attrib:val has url:',n,nm,v)
				if(!meta.urls)meta.urls=[];meta.urls.push([r,n,nm,v])
			}
		}
	}
	if(n.style && n.style.cssText){
		var m,v,z;a= n.style.cssText.split(';')
		if(a  ){r.s={}; //&&(! z.trim || z.trim())
		  for(var i in a){
			z=a[i].split(':');m=z[0];v=z[1];
			if( m && m.trim) m=m.trim();
			if( v && v.trim) v=v.trim();			
			if(v!=undefined && (v.length==undefined || v.length>0))//&& (!v.trim || v.trim()))
			{r.s[m]=v;
				if(v&&v.indexOf&&v.indexOf('url(')!=-1)//(v.startsWith&&v.startsWith('url(')||(v.substring&&v.substring(0,4)=='url(')){
				{	console.log('dom2json:styl:val has url:',n,m,v)
				if(!meta.urls)meta.urls=[];meta.urls.push([r,n,m,v])
				}
			}
	}}}
	if(n.nodeName=='LINK'){
		//z.css=cssLib.toJb(document.styleSheets)
		//var tsf=stk[0],top=tsf[0].meta;
		//if(!top)top=tsf[0].meta={links:[]};
		//if(!top.links)top.links=[];
		//top.links.push(sf)
		if(!meta.links)meta.links=[];meta.links.push(sf)
		console.log('dom2json:links:stackFrame=',sf,',meta=',meta,',stack=',stk,',currentObj=',r,n);
	}else if(n.nodeName=='SCRIPT'){
		if(!meta.scripts)meta.scripts=[];meta.scripts.push(sf)
		console.log('dom2json:scripts:stackFrame=',sf,',meta=',meta,',stack=',stk,',currentObj=',r,n);
	}else if(n.nodeName=='IMG'){
		if(!meta.imgs)meta.imgs=[];meta.imgs.push(sf)
		if(!meta.imgsBase64)meta.imgsBase64={}
		var src=n.src,z=meta.imgsBase64[src];
		if(z)
			console.log('dom2json:img:repeated-src:previous result:',z,', current-img:',n);
		else{z=meta.imgsBase64[src]={src:src}
			var canvas = document.createElement('CANVAS');
			var ctx = canvas.getContext('2d');
			canvas.height = n.height;
			canvas.width = n.width;
			ctx.drawImage(n, 0, 0);
			z.base64 = canvas.toDataURL('png');}

		console.log('dom2json:imgs:stackFrame=',sf,',meta=',meta
			,',stack=',stk,',currentObj=',r,n,',meta.imgsBase64[',src,']=',z);
	}if(n.src){
		if(!meta.src)meta.src=[];meta.src.push(sf)
		console.log('dom2json:src:stackFrame=',sf,',meta=',meta,',stack=',stk,',currentObj=',r,n);
	}if(n.href){
		if(!meta.href)meta.href=[];meta.href.push(sf)
		console.log('dom2json:href:stackFrame=',sf,',meta=',meta,',stack=',stk,',currentObj=',r,n);
	}
	x=n.firstChild;
	if(x&&!x.nextSibling&&x.nodeType==Node.TEXT_NODE)
	{var v=x.value||x.data;if(v.trim())	
		r.t=v;}
	else if(x )//&& x.nodeName!='SCRIPT')
	{r.c=[];while(x)
	 {	if(x.nodeType==Node.ELEMENT_NODE)
		{var z=cssLib.dom2json(x,meta,stk)
			r.c.push(z);
		}//if(x.nodeName!='SCRIPT')
		else if(x.nodeType==Node.TEXT_NODE)
		{var v=x.value||x.data;if(v.trim())	r.c.push(v);}
		else console.log('cssLib.dom2json:unknown nodeType:',x);
		x=x.nextSibling;}}
	if(!stack)
		meta.css=r.css=cssLib.toJb(document.styleSheets,[])
	else stk.pop()
	return r;}//dom2json
 ,init:function(){
	var a=[{},{}]
	a[2]=cssLib.dom2json(document.head,a[0],[])
	a[3]=cssLib.dom2json(document.body,a[1])//,cssSheetList2jb(document.styleSheets)
	return {n:'html',c:a};//JSON.stringify(a,null,4)
 }//init:function
}//cssLib


JSON.stringify(a,null,4)
