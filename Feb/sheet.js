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
	,n=o&&o.constructor&&o.constructor.name;
		if(n)a.constructorName=n;
		for(var i in o)
		{x=o[i];
			if(x!=undefined&&x!=null){//&&x!=''
			n=x&&x.constructor&&x.constructor.name
			f=cssLib[n];if(f)a[i]=f(x)
			else{f=classNames[n]
			a[i]=f?cssLib.props(x):x}}}
		stk.pop();
		return a;}}
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
		/*for-loop meta.imgs, get base64
		var canvas = document.createElement('CANVAS');
			var ctx = canvas.getContext('2d');
		//n is the img-tag
			canvas.height = n.height;
			canvas.width = n.width;
			ctx.drawImage(n, 0, 0);
			base64 = canvas.toDataURL('png');outputFormat='png'



		function toDataUrl(url, callback) {
		  var xhr = new XMLHttpRequest();
		  xhr.responseType = 'blob';
		  xhr.onload = function() {
			var reader = new FileReader();
			reader.onloadend = function() {
			  callback(reader.result);
			}
			reader.readAsDataURL(xhr.response);
		  };
		  xhr.open('GET', url);
		  xhr.send();
		}
		toDataUrl('http://example/url', function(base64Img) {
		  console.log(base64Img);
		});


		function toDataUrl(src, callback, outputFormat) {
		  var img = new Image();
		  img.crossOrigin = 'Anonymous';
		  img.onload = function() {
			var canvas = document.createElement('CANVAS');
			var ctx = canvas.getContext('2d');
			var dataURL;
			canvas.height = this.height;
			canvas.width = this.width;
			ctx.drawImage(this, 0, 0);
			dataURL = canvas.toDataURL(outputFormat);
			callback(dataURL);
		  };
		  img.src = src;
		  if (img.complete || img.complete === undefined) {
			img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
			img.src = src;
		  }
		}
		toDataUrl('http://example/url', function(base64Img) {
		  console.log(base64Img);
		});
		///////////////////////////////////////////////////////////////////////////////////////
		var found=false;
		for(var i=0;!found&&i<meta.imgs.length;i++)
			found= n.src==meta.imgs[i][1].src?meta.imgs[i][0]:false;
		if(found)
			console.log('dom2json:img:repeated-src:previous result:',found,', current-img:',n);
		else{
			var canvas = document.createElement('CANVAS');
			var ctx = canvas.getContext('2d');
			canvas.height = n.height;
			canvas.width = n.width;
			ctx.drawImage(n, 0, 0);
			r.base64 = canvas.toDataURL('png');
		}
		*/
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
	return a;//JSON.stringify(a,null,4)
 }//init:function
}//cssLib


JSON.stringify(a,null,4)

VM972:31 dom2json-d2jb:unknown nodeType: <!--[if lte IE 8]><script src="assets/js/ie/html5shiv.js"></script><![endif]-->
VM972:31 dom2json-d2jb:unknown nodeType: <!--[if lte IE 9]><link rel="stylesheet" href="assets/css/ie9.css" /><![endif]-->
VM972:31 dom2json-d2jb:unknown nodeType: <!--[if lte IE 8]><link rel="stylesheet" href="assets/css/ie8.css" /><![endif]-->
VM972:31 dom2json-d2jb:unknown nodeType: <!-- Wrapper -->
VM972:31 dom2json-d2jb:unknown nodeType: <!-- Header -->
VM972:31 dom2json-d2jb:unknown nodeType: <!-- Menu -->
VM972:31 dom2json-d2jb:unknown nodeType: <!-- Main -->
VM972:31 dom2json-d2jb:unknown nodeType: <!-- Sidebar -->
VM972:31 dom2json-d2jb:unknown nodeType: <!-- Intro -->
VM972:31 dom2json-d2jb:unknown nodeType: <!-- Posts List -->
VM972:31 dom2json-d2jb:unknown nodeType: <!-- About -->
VM972:31 dom2json-d2jb:unknown nodeType: <!-- Footer -->
VM972:31 dom2json-d2jb:unknown nodeType: <!-- Scripts -->
VM972:31 dom2json-d2jb:unknown nodeType: <!--[if lte IE 8]><script src="assets/js/ie/respond.min.js"></script><![endif]-->
VM972:31 dom2json-d2jb:unknown nodeType: <!-- Search -->
VM972:31 dom2json-d2jb:unknown nodeType: <!-- Links -->
VM972:31 dom2json-d2jb:unknown nodeType: <!-- Actions -->
[
	{
		"n": "HEAD",
		"c": [
			{
				"n": "TITLE",
				"t": "EU059S Structural Assessment of Underground Water Reservoirs"
			},
			{
				"n": "META",
				"a": {
					"charset": "utf-8",
					"serverversion": "2016/05/16/17:56:00"
				}
			},
			{
				"n": "META",
				"a": {
					"name": "viewport",
					"content": "width=device-width, initial-scale=1"
				}
			},
			{
				"n": "LINK",
				"a": {
					"rel": "stylesheet",
					"href": "assets/css/main.css",
					"class": "--apng-checked"
				}
			},
			{
				"n": "SCRIPT",
				"a": {
					"src": "app.js"
				}
			},
			{
				"n": "SCRIPT",
				"t": "App.clkEdit=clkEdit=\nfunction clkEdit(evt){\n\tvar src=evt.target||event.srcElement\n\t//,p=src;//console.log(\"clkEdit\",evt,src)\n\t//while(p&&p.nodeName!='ARTICLE'){p=p.parentNode;}\n\n\tvar p=document.getElementsByClassName('editForm')[0]\n\t, a=p.getElementsByClassName('editable')\n\t,b=src.innerText=='EDIT'\n\t,v={},data\n\tp.aEdit=a;src.innerText=b?'Save':'EDIT'\n\tfor(var i =0;i<a.length;i++)\n\t{\ta[i].contentEditable=b;\n\t\ta[i].style.backgroundColor=b?'lightgray':''\n\t\tv[a[i].getAttribute('name')]=a[i].innerText;\n\t}data={op:'xhrEdit',entity:p.entity \n\t\t|| p.getAttribute('entity') ,pk:p.pk \n\t\t|| p.getAttribute('pk') ,v:v}\n\tconsole.log('clkEdit:src=',src,' ,p=',p,' ,a='\n\t\t,a,' ,b=',b,' ,v=',v ,' ,data=',data);\n\tif(!b)\n\t\tApp.xhr({data:data})\n}//function clkEdit(evt)\n"
			}
		]
	},
	{
		"n": "BODY",
		"a": {
			"class": ""
		},
		"c": [
			{
				"n": "DIV",
				"id": "wrapper",
				"c": [
					{
						"n": "HEADER",
						"id": "header",
						"c": [
							{
								"n": "NAV",
								"a": {
									"class": "links"
								},
								"c": [
									{
										"n": "UL",
										"c": [
											{
												"n": "LI",
												"c": [
													{
														"n": "A",
														"a": {
															"href": "?screen=ProjectsList"
														},
														"t": "Projects"
													}
												]
											},
											{
												"n": "LI",
												"c": [
													{
														"n": "A",
														"a": {
															"href": "?screen=UsersList"
														},
														"t": "Users"
													}
												]
											},
											{
												"n": "LI",
												"c": [
													{
														"n": "A",
														"a": {
															"href": "?screen=ReportsMenu"
														},
														"t": "Reports"
													}
												]
											},
											{
												"n": "LI",
												"c": [
													{
														"n": "A",
														"a": {
															"href": "?screen=LogMenu"
														},
														"t": "Logs"
													}
												]
											},
											{
												"n": "LI",
												"c": [
													{
														"n": "A",
														"a": {
															"href": "?screen=ConfigMenu"
														},
														"t": "Configurations"
													}
												]
											}
										]
									}
								]
							},
							{
								"n": "NAV",
								"a": {
									"class": "main"
								},
								"c": [
									{
										"n": "UL",
										"c": [
											{
												"n": "LI",
												"a": {
													"class": "search"
												},
												"c": [
													{
														"n": "A",
														"a": {
															"class": "fa-search",
															"href": "#search"
														},
														"t": "Search"
													},
													{
														"n": "FORM",
														"id": "search",
														"a": {
															"method": "get",
															"action": "?screen=Search&op=query"
														},
														"c": [
															{
																"n": "INPUT",
																"a": {
																	"type": "text",
																	"name": "query",
																	"placeholder": "Search"
																}
															}
														]
													}
												]
											},
											{
												"n": "LI",
												"a": {
													"class": "menu"
												},
												"c": [
													{
														"n": "A",
														"a": {
															"class": "fa-bars",
															"href": "#menu"
														},
														"t": "Menu"
													}
												]
											}
										]
									}
								]
							},
							{
								"n": "H1",
								"c": [
									{
										"n": "A",
										"a": {
											"href": "#"
										},
										"c": [
											"Structural Assessment of Underground ",
											{
												"n": "BR"
											},
											"Water Reservoirs, EU059S"
										]
									}
								]
							}
						]
					},
					{
						"n": "DIV",
						"id": "main",
						"c": [
							{
								"n": "SECTION",
								"id": "intro",
								"c": [
									{
										"n": "A",
										"a": {
											"href": "#",
											"class": "logo"
										},
										"c": [
											{
												"n": "IMG",
												"a": {
													"src": "images/logo.png",
													"alt": ""
												}
											}
										]
									},
									{
										"n": "HEADER",
										"c": [
											{
												"n": "H2",
												"t": "Visual Assessment"
											},
											{
												"n": "P",
												"t": "Web-application"
											}
										]
									}
								]
							},
							{
								"n": "A",
								"a": {
									"href": "?screen=ProjectScreen&projNo=1"
								},
								"t": "Project Thu Aug 18 04:44:05 PDT 2016"
							},
							" / ",
							{
								"n": "A",
								"a": {
									"href": "?screen=BuildingScreen&buildingNo=2"
								},
								"t": "Building Thu Aug 18 19:58:34 PDT 2016"
							},
							" / ",
							{
								"n": "H1",
								"t": "Floor"
							},
							{
								"n": "TABLE",
								"c": [
									{
										"n": "TBODY",
										"c": [
											{
												"n": "TR",
												"c": [
													{
														"n": "TH",
														"t": "Title"
													},
													{
														"n": "TH",
														"t": "Notes"
													},
													{
														"n": "TH",
														"t": "Created"
													},
													{
														"n": "TH",
														"t": "by"
													},
													{
														"n": "TH",
														"t": "Action"
													},
													{
														"n": "TH",
														"t": "#Sheets"
													}
												]
											},
											{
												"n": "TR",
												"a": {
													"class": "editForm",
													"entity": "floor",
													"pk": "2"
												},
												"c": [
													{
														"n": "TD",
														"c": [
															{
																"n": "H3",
																"c": [
																	{
																		"n": "A",
																		"a": {
																			"href": "?screen=FloorScreen&floorNo=2",
																			"name": "title",
																			"class": "editable"
																		},
																		"t": "Floor Thu Aug 18 19:58:52 PDT 2016"
																	}
																]
															}
														]
													},
													{
														"n": "TD",
														"a": {
															"class": "editable"
														},
														"t": "null"
													},
													{
														"n": "TD",
														"c": [
															{
																"n": "TIME",
																"a": {
																	"class": "published",
																	"datetime": "Tue Jan 24 22:58:42 PST 2017"
																},
																"t": "2016/08/18 07:58:52"
															}
														]
													},
													{
														"n": "TD",
														"c": [
															{
																"n": "A",
																"a": {
																	"href": "#",
																	"class": "author"
																},
																"c": [
																	{
																		"n": "IMG",
																		"a": {
																			"src": "images/null",
																			"alt": ""
																		}
																	}
																]
															}
														]
													},
													{
														"n": "TD",
														"c": [
															{
																"n": "BUTTON",
																"a": {
																	"onclick": "clkEdit(event)"
																},
																"t": "EDIT"
															},
															{
																"n": "FORM",
																"a": {
																	"method": "post"
																},
																"c": [
																	{
																		"n": "INPUT",
																		"a": {
																			"type": "hidden",
																			"name": "op",
																			"value": "deleteFloor"
																		}
																	},
																	{
																		"n": "INPUT",
																		"a": {
																			"type": "submit",
																			"value": "Delete Floor"
																		}
																	}
																]
															},
															{
																"n": "FORM",
																"a": {
																	"method": "post"
																},
																"c": [
																	{
																		"n": "INPUT",
																		"a": {
																			"type": "hidden",
																			"name": "op",
																			"value": "newSheet"
																		}
																	},
																	{
																		"n": "INPUT",
																		"a": {
																			"type": "submit",
																			"value": "New Sheet"
																		}
																	}
																]
															}
														]
													},
													{
														"n": "TD",
														"a": {
															"class": "stats"
														},
														"c": [
															{
																"n": "A",
																"a": {
																	"title": "number of sheets in this floor",
																	"href": "#",
																	"class": "icon fa-comment",
																	"name": "comment"
																},
																"t": "2"
															}
														]
													}
												]
											}
										]
									}
								]
							},
							{
								"n": "H1",
								"t": "Sheets"
							},
							{
								"n": "LI",
								"c": [
									{
										"n": "ARTICLE",
										"c": [
											{
												"n": "HEADER",
												"c": [
													{
														"n": "H3",
														"c": [
															{
																"n": "A",
																"a": {
																	"href": "?screen=Sheet&projNo=1&buildingNo=2&floorNo=2&sheetNo=4"
																},
																"t": "1"
															}
														]
													},
													{
														"n": "TIME",
														"a": {
															"class": "published",
															"datetime": "2015-10-15"
														},
														"t": "2016-08-21 10:04:29.0"
													}
												]
											},
											{
												"n": "A",
												"a": {
													"href": "#",
													"class": "image"
												},
												"c": [
													{
														"n": "IMG",
														"a": {
															"src": "images/pic01.jpg",
															"alt": ""
														}
													}
												]
											}
										]
									}
								]
							},
							{
								"n": "LI",
								"c": [
									{
										"n": "ARTICLE",
										"c": [
											{
												"n": "HEADER",
												"c": [
													{
														"n": "H3",
														"c": [
															{
																"n": "A",
																"a": {
																	"href": "?screen=Sheet&projNo=1&buildingNo=2&floorNo=2&sheetNo=5"
																},
																"t": "2"
															}
														]
													},
													{
														"n": "TIME",
														"a": {
															"class": "published",
															"datetime": "2015-10-15"
														},
														"t": "2016-08-21 10:05:07.0"
													}
												]
											},
											{
												"n": "A",
												"a": {
													"href": "#",
													"class": "image"
												},
												"c": [
													{
														"n": "IMG",
														"a": {
															"src": "images/pic02.jpg",
															"alt": ""
														}
													}
												]
											}
										]
									}
								]
							}
						]
					},
					{
						"n": "SECTION",
						"a": {
							"x-id": "sidebar"
						},
						"c": []
					}
				]
			},
			{
				"n": "SECTION",
				"c": [
					{
						"n": "UL",
						"a": {
							"class": "posts"
						}
					}
				]
			},
			{
				"n": "SECTION",
				"a": {
					"class": "blurb"
				},
				"c": [
					{
						"n": "H2",
						"t": "About"
					},
					{
						"n": "P",
						"t": "The Project is headed by Dr Zafer Sakka zsakka@kisr.edu.kw , The Web-application is implemented by Mohamad Buhamad mbohamad@kisr.edu.kw"
					},
					{
						"n": "UL",
						"a": {
							"class": "actions"
						},
						"c": [
							{
								"n": "LI",
								"c": [
									{
										"n": "A",
										"a": {
											"href": "#",
											"class": "button"
										},
										"t": "Learn More"
									}
								]
							}
						]
					}
				]
			},
			{
				"n": "SECTION",
				"id": "footer",
				"c": [
					{
						"n": "UL",
						"a": {
							"class": "icons"
						},
						"c": [
							{
								"n": "LI",
								"c": [
									{
										"n": "A",
										"a": {
											"href": "#",
											"class": "fa-twitter"
										},
										"c": [
											{
												"n": "SPAN",
												"a": {
													"class": "label"
												},
												"t": "Twitter"
											}
										]
									}
								]
							},
							{
								"n": "LI",
								"c": [
									{
										"n": "A",
										"a": {
											"href": "#",
											"class": "fa-facebook"
										},
										"c": [
											{
												"n": "SPAN",
												"a": {
													"class": "label"
												},
												"t": "Facebook"
											}
										]
									}
								]
							},
							{
								"n": "LI",
								"c": [
									{
										"n": "A",
										"a": {
											"href": "#",
											"class": "fa-instagram"
										},
										"c": [
											{
												"n": "SPAN",
												"a": {
													"class": "label"
												},
												"t": "Instagram"
											}
										]
									}
								]
							},
							{
								"n": "LI",
								"c": [
									{
										"n": "A",
										"a": {
											"href": "#",
											"class": "fa-rss"
										},
										"c": [
											{
												"n": "SPAN",
												"a": {
													"class": "label"
												},
												"t": "RSS"
											}
										]
									}
								]
							},
							{
								"n": "LI",
								"c": [
									{
										"n": "A",
										"a": {
											"href": "#",
											"class": "fa-envelope"
										},
										"c": [
											{
												"n": "SPAN",
												"a": {
													"class": "label"
												},
												"t": "Email"
											}
										]
									}
								]
							}
						]
					},
					{
						"n": "P",
						"a": {
							"class": "copyright"
						},
						"t": "©K.I.S.R."
					}
				]
			},
			{
				"n": "SCRIPT",
				"a": {
					"src": "assets/js/jquery.min.js"
				}
			},
			{
				"n": "SCRIPT",
				"a": {
					"src": "assets/js/skel.min.js"
				}
			},
			{
				"n": "SCRIPT",
				"a": {
					"src": "assets/js/util.js"
				}
			},
			{
				"n": "SCRIPT",
				"a": {
					"src": "assets/js/main.js"
				}
			},
			{
				"n": "SECTION",
				"id": "menu",
				"c": [
					{
						"n": "SECTION",
						"c": [
							{
								"n": "FORM",
								"id": "search",
								"a": {
									"method": "get",
									"action": "?screen=Search&op=query"
								},
								"c": [
									{
										"n": "INPUT",
										"a": {
											"type": "text",
											"name": "query",
											"placeholder": "Search"
										}
									}
								]
							}
						]
					},
					{
						"n": "SECTION",
						"c": [
							{
								"n": "UL",
								"a": {
									"class": "links"
								},
								"c": [
									{
										"n": "LI",
										"c": [
											{
												"n": "A",
												"a": {
													"href": "http://www.kisr.edu.kw"
												},
												"s": {
													"-webkit-tap-highlight-color": "rgba(0, 0, 0, 0)"
												},
												"c": [
													{
														"n": "H3",
														"t": "KISR"
													},
													{
														"n": "P",
														"t": "Kuwait Institute for Scientific Research"
													}
												]
											}
										]
									},
									{
										"n": "LI",
										"c": [
											{
												"n": "A",
												"a": {
													"href": "#"
												},
												"s": {
													"-webkit-tap-highlight-color": "rgba(0, 0, 0, 0)"
												},
												"c": [
													{
														"n": "H3",
														"t": "EU"
													},
													{
														"n": "P",
														"t": "Energy & Building Research Center"
													}
												]
											}
										]
									},
									{
										"n": "LI",
										"c": [
											{
												"n": "A",
												"a": {
													"href": "#"
												},
												"s": {
													"-webkit-tap-highlight-color": "rgba(0, 0, 0, 0)"
												},
												"c": [
													{
														"n": "H3",
														"t": "TED"
													},
													{
														"n": "P",
														"t": "Techno Economics Division"
													}
												]
											}
										]
									},
									{
										"n": "LI",
										"c": [
											{
												"n": "A",
												"a": {
													"href": "#"
												},
												"s": {
													"-webkit-tap-highlight-color": "rgba(0, 0, 0, 0)"
												},
												"c": [
													{
														"n": "H3",
														"t": "EU059S"
													},
													{
														"n": "P",
														"t": "Project:Structural Assessment of Underground Water Reservoirs"
													}
												]
											}
										]
									},
									{
										"n": "LI",
										"c": [
											{
												"n": "A",
												"a": {
													"href": "#"
												},
												"s": {
													"-webkit-tap-highlight-color": "rgba(0, 0, 0, 0)"
												},
												"c": [
													{
														"n": "H3",
														"t": "Delete Floor"
													},
													{
														"n": "P"
													},
													{
														"n": "FORM",
														"a": {
															"method": "post"
														},
														"c": [
															{
																"n": "INPUT",
																"a": {
																	"type": "hidden",
																	"name": "op",
																	"value": "deleteFloor"
																}
															},
															{
																"n": "INPUT",
																"a": {
																	"type": "submit",
																	"value": "Delete"
																}
															}
														]
													},
													{
														"n": "P"
													}
												]
											}
										]
									},
									{
										"n": "LI",
										"c": [
											{
												"n": "A",
												"a": {
													"href": "#"
												},
												"s": {
													"-webkit-tap-highlight-color": "rgba(0, 0, 0, 0)"
												},
												"c": [
													{
														"n": "H3",
														"t": "New Sheet"
													},
													{
														"n": "P"
													},
													{
														"n": "FORM",
														"a": {
															"method": "post"
														},
														"c": [
															{
																"n": "INPUT",
																"a": {
																	"type": "hidden",
																	"name": "op",
																	"value": "newSheet"
																}
															},
															{
																"n": "INPUT",
																"a": {
																	"type": "submit",
																	"value": "Create"
																}
															}
														]
													},
													{
														"n": "P"
													}
												]
											}
										]
									}
								]
							}
						]
					},
					{
						"n": "SECTION",
						"c": [
							{
								"n": "UL",
								"a": {
									"class": "actions vertical"
								},
								"c": [
									{
										"n": "LI",
										"c": [
											{
												"n": "A",
												"a": {
													"href": "?op=logout",
													"class": "button big fit"
												},
												"s": {
													"-webkit-tap-highlight-color": "rgba(0, 0, 0, 0)"
												},
												"t": "Logout"
											}
										]
									}
								]
							}
						]
					}
				]
			}
		]
	}
]