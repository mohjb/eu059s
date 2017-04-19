app={
init:function appInit(){
	var a=[app.login],i=0;
	app.login.aBld(a[i],document[a[i].n.toLowerCase()]);
}//function appInit

,login:{"n": "BODY",
	"s": {
		"background-image": "url(\"logo.xcf.png\")",
		"background-repeat": "repeat"
	},
	"c": [
		{
			"n": "IMG",
			"a": {
				"src": "kisr50.png"
			},
			"s": {
				"text-align": "center",
				"display": "block"
			}
		},
		{
			"n": "DIV",
			"a": {
				"class": "pen-title"
			},
			"c": [
				{
					"n": "H1",
					"t": "Visual Assessment"
				}
			]
		},
		{
			"n": "DIV",
			"a": {
				"class": "module form-module"
			},
			"c": [
				{
					"n": "DIV",
					"a": {
						"class": "toggle"
					},
					"c": [
						{
							"n": "I",
							"a": {
								"class": "fa fa-times fa-pencil"
							}
						},
						{
							"n": "DIV",
							"a": {
								"class": "tooltip"
							}
						}
					]
				},
				{
					"n": "DIV",
					"a": {
						"class": "form"
					},
					"c": [
						{
							"n": "H2",
							"t": "Login to your account"
						},
						{
							"n": "FORM",
							"a": {
								"method": "post",
								"action": "javascript:app.login.clkLogin(event)"
							},
							"c": [
								{
									"n": "INPUT",
									"a": {
										"type": "text",
										"name": "Usr.un",
										"placeholder": "Username"
									}
								},
								{
									"n": "INPUT",
									"a": {
										"type": "password",
										"name": "Usr.pw",
										"placeholder": "Password"
									}
								},
								{
									"n": "INPUT",
									"a": {
										"type": "hidden",
										"name": "op",
										"value": "login"
									}
								},
								{
									"n": "BUTTON",
									"a": {
										"onclick": "app.login.clkLogin(event)"
									},
									"t": "Login"
								}
							]
						}
					]
				},
				{
					"n": "DIV",
					"a": {
						"class": "form"
					},
					"c": [
						{
							"n": "H2",
							"t": "Create an account"
						},
						{
							"n": "FORM",
							"c": [
								{
									"n": "INPUT",
									"a": {
										"type": "text",
										"placeholder": "Username"
									}
								},
								{
									"n": "INPUT",
									"a": {
										"type": "password",
										"placeholder": "Password"
									}
								},
								{
									"n": "INPUT",
									"a": {
										"type": "email",
										"placeholder": "Email Address"
									}
								},
								{
									"n": "INPUT",
									"a": {
										"type": "tel",
										"placeholder": "Phone Number"
									}
								},
								{
									"n": "BUTTON",
									"t": "Register"
								}
							]
						}
					]
				},
				{
					"n": "DIV",
					"a": {
						"class": "cta"
					},
					"c": [
						{
							"n": "A",
							"a": {
								"href": "#"
							}
						}
					]
				}
			]
		},
		{
			"n": "SCRIPT",
			"a": {
				"src": "login.jquery.min.js"
			}
		},
		{
			"n": "SCRIPT",
			"a": {
				"src": "login.vLmRVp.js"
			}
		},
		{
			"n": "LINK",
			"a": {
				"href": "login.style.css",
				"rel": "stylesheet",
				"class": "--apng-checked"
			}
		},
		{
			"n": "A",
			"a": {
				"href": "index.html",
				"class": "at-button"
			},
			"c": [
				{
					"n": "I",
					"a": {
						"class": "material-icons"
					},
					"t": "link"
				}
			]
		},
		{
			"n": "SCRIPT",
			"a": {
				"src": "login.index.js"
			}
		}
	]
	,cryp0:function(p,d){var x=(p+d-32)%127;return x<32?x+32:x;}
	,cryp1:function(p,d){var x=p&&p.charCodeAt&&app.login.cryp0(p.charCodeAt(0),0);
		if(p&&p.length)for(var i=1;i<p.length;i++)
			x=app.login.cryp0(p.charCodeAt(i),x);
		return x;}
	,cryp2:function(p,d){var a=[d=p&&p.charCodeAt&&app.login.cryp0(p.charCodeAt(0),d)];
		if(p&&p.length)for(var i=1;i<p.length;i++)
			a.push(d=p&&p.charCodeAt&&app.login.cryp0(p.charCodeAt(i),d));
		return a;}
	,aBld:function aBld(params,parent){
		var t=sys;try{if(typeof(params)=='string')return t.dct(params,parent);
		var p=params,n=parent;
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
		}catch(ex){console.error('sys.bld:ex',ex);}return n;
	}//function bld
	,clkLogin:function app_login_clkLogin(e){console.log('app_login_clkLogin',this,arguments);
		if(!e){
		var fn=document.getElementsByTagName('form')[0]
		,f=[fn.firstElementChild.value,fn.firstElementChild.nextSibling.value]//	btoa('m')	"bQ=="	;	atob('bQ==')	"m"
		,u=app.login.usrs[f[0]]
		f[1]=btoa(app.login.cryp2(f[1],app.login.cryp1(f[0])))
		console.log('app_login_clkLogin',this,fn,f,u);
		if(u && f[1]==u.pw ){
			console.log('Offline-User Found');
			document.body.innerHTML='';
			app.main.init();
		}else
			console.log('No offline user found');
		}
	}
	,Level:{viewer:0,inspector:1,fullAccess:2}
	,Usr:{uid:0,un:0,pw:0,firstName:0,lastName:0
		,email:0,tel:0,tel2:0,notes:0,level:0,created:0,lastModified:0}
	,usrs:{moh:{uid:0,un:'moh',pw:"MTE1",firstName:0,lastName:0
		,email:0,tel:0,tel2:0,notes:0,level:0,created:0,lastModified:0}
	}//usrs
  }//login
,main:{
init:function appMainInit(){for(var i=0,a=app.main.a;i<a.length;i++)
	app.login.aBld(a[i],document[a[i].n.toLowerCase()]);
	app.main.projects.init();
	}
,a:[
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
					"href": "main.css",
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
								"a": {"class": "links"},
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
													"src": "logo.png",
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
							{n:'div',id:'mainSub'}
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
					"src": "jquery.min.js"
				}
			},
			{
				"n": "SCRIPT",
				"a": {
					"src": "skel.min.js"
				}
			},
			{
				"n": "SCRIPT",
				"a": {
					"src": "util.js"
				}
			},
			{
				"n": "SCRIPT",
				"a": {
					"src": "main.js"
				}
			},
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
}//main
,projects:{
	/*list projs
		list blding, proj is breadcrumb
		list floors, proj is breadcrumb
		list sheets, proj is breadcrumb
		sheet, proj is a link
	*/init:function(){
		var x=mainSub=sys.did('mainSub')
		mainSub.innerHTML=''
		var a=app.projects.getList(),b={n:'table'}
		for(var i=0;i<a.length;i++){
			
		}//for
		
	}
	,a:[
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
															"src": "pic01.jpg",
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
															"src": "pic02.jpg",
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
	,getList:function(){}
	,getSelected:function(){}
}//projects
,bldings:{a:[],init:function(){}}//bldings
,floors:{a:[],init:function(){}}//floors
,sheets:{a:[],init:function(){}}//sheets
,usrs:{}//usrs
,report:{}
,config:{}
,logs:{}
,search:{list:{},form:{},component:{}}
,server:{dummy:'dummy'
,Op:{//client facade reflection of server-Op,
 login:'Usr.login'//function(){}
 ,logout:'Usr.logout'//function(){}
 ,StorageList:'Storage.list'
 ,StorageGet:'Storage.get'
 ,StorageContent:'Storage.content'
 ,StorageDelete:'Storage.delete'
 ,StorageSet:'Storage.set'
 ,StorageNew:'Storage.New'

}//Op
,dbSchema:{tables:{
	storage:{def:{columns:[//columns
		 {name:'no',type:'integer',pk:1}
		,{name:'path',type:'text',indices:[{name:'path',at:0}]}
		,{name:'contentType',type:'enum','enum':['text/plain','text/html'
			,'text/json','text/javascript','image/png','text/css']}
		,{name:'lastModified',type:'date-time',readonly:1,indices:[{name:'lastModified',at:0}]}
		,{name:'data',type:'textarea'}
	],indices:{path:['path'],'lastModified':['lastModified']}}}//dbTbl storage
	,usr:{def:{columns:[{name:'uid',type:'integer',pk:1}
		,{name:'un',type:'text',unique:1,indices:[{name:'un',at:0}]}
		,{name:'pw',type:'text',password:1}
		,{name:'firstName',type:'text'},{name:'lastName',type:'text'}
		,{name:'email',type:'text'},{name:'tel',type:'text'},{name:'tel2',type:'text'}
		,{name:'level',type:'enum','enum':['viewer','inspector','fullAccess']}
		,{name:'notes',type:'text'}
		,{name:'created',type:'date-time',readonly:1}
		,{name:'lastModified'	,type:'date-time',readonly:1,indices:[{name:'lastModified',at:0}]}
		],indices:{'lastModified':['lastModified']}
		 ,unique:{'title':['un']}}}
	,projects:{def:{columns:[
		{name:'no',type:'Integer',pk:1}
		,{name:'title',type:'text',unique:1}
		,{name:'owner',type:'integer',readonly:1,fk:{entity:'usr',col:'uid'}}
		,{name:'created',type:'date-time',readonly:1}
		,{name:'lastModified',type:'date-time',readonly:1,indices:[{name:'lastModified',at:0}]}
		,{name:'notes',type:'text'}
	],indices:{'lastModified':['lastModified']}
	 ,unique:{'title':['title']}}}//dbTbl Project
	,buildings:{def:{columns:[
		{name:'no',type:'Integer',pk:1}//inbound floors,sheets
		,{name:'p',type:'Integer',readonly:1,fk:{entity:'projects',col:'no'}}
		,{name:'title',type:'text',unique:'p'}
		,{name:'owner',type:'integer',readonly:1,fk:{entity:'usr',col:'uid'}}
		,{name:'created',type:'date-time',readonly:1}
		,{name:'lastModified',type:'date-time',readonly:1,indices:[{name:'lastModified',at:0}]}
		,{name:'notes',type:'text'}
	],indices:{'lastModified':['lastModified']}
	 ,unique:{'title':['p','title']}}}//dbTbl Building
	,floors:{def:{columns:[
		{name:'no',type:'Integer',pk:1}
		,{name:'p',type:'Integer',readonly:1,fk:{entity:'projects',col:'no'}}
		,{name:'b',type:'Integer',readonly:1,fk:{entity:'buildings',col:'no'}}
		,{name:'title',type:'text',unique:'b'}
		,{name:'owner',type:'integer',readonly:1,fk:{entity:'usr',col:'uid'}}
		,{name:'created',type:'date-time',readonly:1}
		,{name:'lastModified',type:'date-time',readonly:1,indices:[{name:'lastModified',at:0}]}
		,{name:'notes',type:'text'}
	 ],indices:{'lastModified':['lastModified']}
	  ,unique :{'title':['b','title']}
	 }}//dbTbl Floor
	,sheet:{def:{columns:[
		{name:'no',type:'Integer',pk:1,readonly:1	,filter:	3}
		,{name:'p',type:'Integer',readonly:1,fk:{entity:'projects',col:'no'},filter:1}
		,{name:'b',type:'Integer',readonly:1,fk:{entity:'buildings',col:'no'}	,filter:2}
		,{name:'f',type:'Integer',readonly:1,fk:{entity:'floors',col:'no'}	,filter:	3}
		,{name:'owner',type:'integer',readonly:1,fk:{entity:'usr',col:'uid'}}
		,{name:'created',type:'date-time',readonly:1,filter:0,indices:[{key:'k2-created',at:1}]}
		,{name:'lastModified'	,type:'date-time',readonly:1,filter:0,indices:[{name:'lastModified',at:0}]}
		,{name:'notes',type:'text',indices:[{key:'k1-notes',at:1}]}
		,{name:'TypeofMember'	,type:'set','set':['Beam','Colunm','Slab','Stairs','Mansory','RC','Foundation','Other',''],filter:9,indices:[{key:'k4-typeMember',at:1}]}
		,{name:'TypeofMemberText',type:'text',enableCondition:'TypeofMember.Other',filter:9,indices:[{key:'k4-typeMember',at:2}]}
		,{name:'Location',type:'GIS.POINT',indices:[{key:'k5-location',at:1}]}
		,{name:'Exposure',type:'set','set':['wetDry','chemical','erosion','elec','heat'],filter:12,indices:[{key:'k6-exposure',at:1}]}
		,{name:'LoadingCondition',type:'set','set':['Dead','Live','Impact','Vibration','Traffic','Seismic','Other'],filter:12,indices:[{key:'k7-LoadingCondition',at:1}]}
		,{name:'LoadingConditionText',type:'text',enableCondition:'LoadingCondition.Other',filter:0,indices:[{key:'k7-LoadingCondition',at:2}]}
		,{name:'GeneralCondition',type:'enum','enum':['Good','Satisfactory','Poor'],filter:12,indices:[{key:'k8-GeneralCondition',at:1}]}
		,{name:'Distress',type:'set','set':['Cracking','Staining','Surface','Leaking'],filter:12,indices:[{key:'k9-Distress',at:1}]}
		,{name:'Cracking',type:'set','set':['Checking','Craze','D','Diagnol','Hairline','Longitudinal','Map','Pattern','Plastic','Random','Shrinkage','Temperature','Transverse'],filter:12,indices:[{key:'k10-Cracking',at:1}]}
		,{name:'width',type:{type:'number',min:0,step:0.05},enableCondition:'filter12',filter:12,indices:[{key:'k11-width',at:1}]}
		,{name:'WorkingOrDormant',type:'enum','enum':['Working ','Dormant'],filter:12,indices:[{key:'k12-WorkingOrDormant',at:1}]}
		,{name:'Textural',type:'set','set':['AirVoid','Blistering','Bugholes','ColdJoints','ColdLines','Discoloration','Honeycomb','Incrustation','Laitance','SandPocket','SandStreak','Segregation','Staining','Stalactite','Stalagmite','Stratification'],filter:12,indices:[{key:'k13-Textural',at:1}]}
		,{name:'Distresses',type:'set','set':['Chalking','Deflection','Delamination','Distortion','Dusting','Exfoliation','Leakage','Peeling','Warping','Curling','Deformation','Disintegration','DrummyArea','Efflorescence','Exudation','MortarFlaking','Pitting'],filter:12,indices:[{key:'k14-Distresses',at:1}]}
		,{name:'JointDeficiencies',type:'enum','enum':['f','on'],filter:12,indices:[{key:'k15-JointDeficiencies',at:1}]}
		,{name:'Joint',type:'set','set':['Spall','SealantFailure','Leakage','Fault'],enableCondition:'JointDeficiencies.on',filter:12,indices:[{key:'k15-JointDeficiencies',at:2}]}
		,{name:'Popout',type:'enum','enum':['f','on'],filter:12,indices:[{key:'k16-Popout',at:1}]}
		,{name:'PopoutSize',type:'enum','enum':['Small','Medium','Large'],enableCondition:'Popout.on',filter:12,indices:[{key:'k16-Popout',at:2}]}
		,{name:'isScaling',type:'enum','enum':['f','on'],filter:12,indices:[{key:'k17-isScaling',at:1}]}
		,{name:'Scaling',type:'enum','enum':['Light','Medium','Severe','VerySevere'],enableCondition:'isScaling.on',filter:12,indices:[{key:'k17-isScaling',at:2}]}
		,{name:'Reinforcement',type:'set','set':['Exposed','Corroded','Snapped'],filter:12,indices:[{key:'k18-Reinforcement',at:1}]}
		,{name:'isSpall',type:'enum','enum':['f','on'],filter:12,indices:[{key:'k19-Spall',at:1}]}
		,{name:'SpallSize',type:'enum','enum':['Small','Large'],enableCondition:'isSpall.on',filter:12,indices:[{key:'k19-Spall',at:2}]}
		,{name:'img1',type:'image/url'},{name:'img2',type:'image/url'},{name:'img3',type:'image/url'},{name:'img4',type:'image/url'}
	]//columns
	,indices:{
		'k1-notes':['p','notes']
		,'k2-created':['p','created']
		,'lastModified':['lastModified']
		,'k4-typeMember':['p','TypeofMember','TypeofMemberText']
		,'k5-Location':['p','Location']
		,'k6-exposure':['p','Exposure']
		,'k7-LoadingCondition':['p','LoadingCondition','LoadingConditionText']
		,'k8-GeneralCondition':['p','GeneralCondition']
		,'k9-Distress':['p','Distress']
		,'k10-Cracking':['p','Cracking']
		,'k11-width':['p','width']
		,'k12-WorkingOrDormant':['p','WorkingOrDormant']
		,'k13-Textural':['p','Textural']
		,'k14-Distresses':['p','Distresses']
		,'k15-JointDeficiencies':['p','JointDeficiencies','Joint']
		,'k16-Popout':['p','Popout','PopoutSize']
		,'k17-isScaling':['p','isScaling','Scaling']
		,'k18-Reinforcement':['p','Reinforcement']
		,'k19-Spall':['p','isSpall','SpallSize']
	}//sheets.indices
	}//sheets.def
	}//dbTbl Sheet
	,help:{def:{columns:[
		{name:'field',type:'text',indices:[{name:'field',at:0}]}
		,{name:'html',type:'text'}
		,{name:'usr',type:'integer',readonly:1,fk:{entity:'usr',col:'uid'}}
		,{name:'lastModified',type:'date-time',indices:[{name:'lastModified',at:0}]}
	]}}
}//tables
,util:{
	initTbl:function(tbl,data){}
	,addRow:function(tbl,row){}
	,delRow:function(tbl,row){}
	,updCol:function(tbl,row,colName,val){}
	,updInx:function(tbl,row,colName,val){}
	,delInx:function(tbl,row,colName,val){}
	,q:function(tbl,conds){}//the quering is in the Report-stage of development
}
}//dbSchema
}//server
}//app
sys.bootStrap.addOnload(app.init,app);