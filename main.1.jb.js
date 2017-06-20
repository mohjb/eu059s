d2jb=function d2jb(n){
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
	else if(x )//&& x.nodeName!='SCRIPT')
	{r.c=[];while(x)
	 {	if(x.nodeType==Node.ELEMENT_NODE)
		{	r.c.push(d2jb(x));}//if(x.nodeName!='SCRIPT')
		else if(x.nodeType==Node.TEXT_NODE)
		{var v=x.value||x.data;if(v.trim())	r.c.push(v);}
		else console.log('dom2json-d2jb:unknown nodeType:',x);
		x=x.nextSibling;}}
	return r;}//d2jb


b=[d2jb(document.head),d2jb(document.body)]
VM499:31 dom2json-d2jb:unknown nodeType: <!--[if lte IE 8]><script src="assets/js/ie/html5shiv.js"></script><![endif]-->
VM499:31 dom2json-d2jb:unknown nodeType: <!--[if lte IE 9]><link rel="stylesheet" href="assets/css/ie9.css" /><![endif]-->
VM499:31 dom2json-d2jb:unknown nodeType: <!--[if lte IE 8]><link rel="stylesheet" href="assets/css/ie8.css" /><![endif]-->
VM499:31 dom2json-d2jb:unknown nodeType: <!-- Wrapper -->
VM499:31 dom2json-d2jb:unknown nodeType: <!-- Header -->
VM499:31 dom2json-d2jb:unknown nodeType: <!-- Menu -->
VM499:31 dom2json-d2jb:unknown nodeType: <!-- Main -->
VM499:31 dom2json-d2jb:unknown nodeType: <!-- Sidebar -->
VM499:31 dom2json-d2jb:unknown nodeType: <!-- Intro -->
VM499:31 dom2json-d2jb:unknown nodeType: <!-- Posts List -->
VM499:31 dom2json-d2jb:unknown nodeType: <!-- About -->
VM499:31 dom2json-d2jb:unknown nodeType: <!-- Footer -->
VM499:31 dom2json-d2jb:unknown nodeType: <!-- Scripts -->
VM499:31 dom2json-d2jb:unknown nodeType: <!--[if lte IE 8]><script src="assets/js/ie/respond.min.js"></script><![endif]-->
VM499:31 dom2json-d2jb:unknown nodeType: <!-- Search -->
VM499:31 dom2json-d2jb:unknown nodeType: <!-- Links -->
VM499:31 dom2json-d2jb:unknown nodeType: <!-- Actions -->
[Object, Object]
JSON.stringify(b,null,4)
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
								"n": "H1",
								"t": "Projects"
							},
							{
								"n": "X-TD",
								"c": [
									{
										"n": "A",
										"a": {
											"href": "#",
											"x-class": "image featured"
										},
										"c": [
											{
												"n": "X-IMG",
												"a": {
													"src": "images/pic01.jpg",
													"alt": ""
												}
											}
										]
									}
								]
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
														"t": "sn"
													},
													{
														"n": "TH",
														"t": "Title"
													},
													{
														"n": "TH",
														"t": "Desc"
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
														"t": "Description"
													},
													{
														"n": "TH",
														"t": "#Buildings"
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
													"entity": "projects",
													"pk": "1"
												},
												"c": [
													{
														"n": "TD",
														"t": "1"
													},
													{
														"n": "TD",
														"c": [
															{
																"n": "H2",
																"a": {
																	"class": "title"
																},
																"c": [
																	{
																		"n": "A",
																		"a": {
																			"href": "?screen=ProjectScreen&projNo=1",
																			"name": "title"
																		},
																		"t": "Project Thu Aug 18 04:44:05 PDT 2016"
																	}
																]
															}
														]
													},
													{
														"n": "TD",
														"a": {
															"name": "shortDesc"
														},
														"t": "short Desc"
													},
													{
														"n": "TD",
														"a": {
															"class": "meta"
														},
														"c": [
															{
																"n": "TIME",
																"a": {
																	"class": "published",
																	"datetime": "2016/08/18 04:44:05",
																	"name": "date"
																},
																"t": "2016/08/18 04:44:05"
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
																		"n": "SPAN",
																		"a": {
																			"class": "name",
																			"name": "author",
																			"title": "author name"
																		},
																		"c": [
																			"admin",
																			{
																				"n": "IMG",
																				"a": {
																					"src": "images/avatar.jpg",
																					"alt": "author image"
																				}
																			}
																		]
																	}
																]
															}
														]
													},
													{
														"n": "TD",
														"a": {
															"name": "desc"
														},
														"t": "description"
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
																	"title": "number of buildings in this project",
																	"class": "icon fa-heart",
																	"name": "heart"
																},
																"t": "2"
															}
														]
													},
													{
														"n": "TD",
														"c": [
															{
																"n": "A",
																"a": {
																	"title": "number of sheets in this project",
																	"href": "#",
																	"class": "icon fa-comment",
																	"name": "comment"
																},
																"t": "5"
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
								"n": "A",
								"a": {
									"href": "?screen=ProjectScreen&op=newProject"
								},
								"t": "New Project"
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
														"t": "New Project"
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
																	"value": "newProject"
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