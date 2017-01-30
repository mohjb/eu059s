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
VM928:31 dom2json-d2jb:unknown nodeType: <!--[if lte IE 8]><script src="assets/js/ie/html5shiv.js"></script><![endif]-->
VM928:31 dom2json-d2jb:unknown nodeType: <!--[if lte IE 9]><link rel="stylesheet" href="assets/css/ie9.css" /><![endif]-->
VM928:31 dom2json-d2jb:unknown nodeType: <!--[if lte IE 8]><link rel="stylesheet" href="assets/css/ie8.css" /><![endif]-->
VM928:31 dom2json-d2jb:unknown nodeType: <!-- Wrapper -->
VM928:31 dom2json-d2jb:unknown nodeType: <!-- Header -->
VM928:31 dom2json-d2jb:unknown nodeType: <!-- Menu -->
VM928:31 dom2json-d2jb:unknown nodeType: <!--

<td([^\>]*)>[^<]*<p>]*>\s*<span[^>]*>\s*<input([^>]*)>\s*<span[^>]*>[^<]*</span>\s*</span>\s*<span[^>]*>\s*</span>\s*<span[^>]*>([^<]*)</span>\s*</p>\s*</td>


<td\1><input\2><label for="">\3</label></td>

	-->
VM928:31 dom2json-d2jb:unknown nodeType: <!-- Scripts -->
VM928:31 dom2json-d2jb:unknown nodeType: <!--[if lte IE 8]><script src="assets/js/ie/respond.min.js"></script><![endif]-->
VM928:31 dom2json-d2jb:unknown nodeType: <!-- Search -->
VM928:31 dom2json-d2jb:unknown nodeType: <!-- Links -->
VM928:31 dom2json-d2jb:unknown nodeType: <!-- Actions -->
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
						"a": {
							"class": "screen"
						},
						"c": [
							{
								"n": "STYLE",
								"a": {
									"class": "--apng-checked"
								},
								"t": "\n\n	/* Page Definitions */\n	@page WordSection1\n	{size:8.5in 11.0in;\n		margin:31.5pt 1.25in 27.0pt 1.25in;}\n	div.WordSection1\n	{page:WordSection1;}\n	/* List Definitions */\n	ol\n	{margin-bottom:0in;}\n	ul\n	{margin-bottom:0in;}\n\n	//label:before{d isplay:none;}\n	input[type=\"checkbox\"]{\n		opacity:1;\n	}\n	input.switch[type=\"checkbox\"] {\n		background-image: -webkit-linear-gradient(hsla(0,0%,0%,.1), hsla(0,0%,100%,.1)),\n		-webkit-linear-gradient(left, #f66 50%, #6cf 50%);\n		background-size: 100% 100%, 150% 100%;\n		background-position: 0 0, 15px 0;\n		border-radius: 25px;\n		box-shadow: inset 0 1px 4px hsla(0,0%,0%,.5),\n		inset 0 0 10px hsla(0,0%,0%,.5),\n		0 0 0 1px hsla(0,0%,0%,.1),\n		0 -1px 2px 2px hsla(0,0%,0%,.25),\n		0 2px 2px 2px hsla(0,0%,100%,.75);\n		cursor: pointer;\n		height: 12.5px;\n		left: 50%;\n		x-margin: -12px -37px;\n		padding-right: 25px;\n		x-position: absolute;\n		x-top: 50%;\n		width: 30px;\n		-webkit-appearance: none;\n		-webkit-transition: .25s;\n	}\n	input.switch[type=\"checkbox\"]:after {\n		background-color: #eee;\n		background-image: -webkit-linear-gradient(hsla(0,0%,100%,.1), hsla(0,0%,0%,.1));\n		border-radius: 25px;\n		box-shadow: inset 0 1px 1px 1px hsla(0,0%,100%,1),\n		inset 0 -1px 1px 1px hsla(0,0%,0%,.25),\n		0 1px 3px 1px hsla(0,0%,0%,.5),\n		0 0 2px hsla(0,0%,0%,.25);\n		content: '';\n		display: block;\n		height: 15px;\n		x-left: 0;\n		position: relative;\n		top: -1;\n		width: 19px;\n	}\n	input.switch[type=\"checkbox\"]:checked {\n		background-position: 0 0, 15px 0;\n		padding-left: 11px;\n		padding-right: 0;\n	}\n"
							},
							{
								"n": "DIV",
								"a": {
									"class": "WordSection1"
								},
								"c": [
									{
										"n": "TABLE",
										"a": {
											"class": "MsoTableGrid",
											"border": "1",
											"cellspacing": "0",
											"cellpadding": "0",
											"width": "601"
										},
										"s": {
											"width": "450.9pt",
											"border-collapse": "collapse",
											"border": "none"
										},
										"c": [
											{
												"n": "TBODY",
												"c": [
													{
														"n": "TR",
														"c": [
															{
																"n": "TD",
																"a": {
																	"width": "601",
																	"colspan": "28",
																	"valign": "top"
																},
																"s": {
																	"width": "450.9pt",
																	"border": "1pt solid black",
																	"padding": "0in 5.4pt"
																},
																"c": [
																	{
																		"n": "P",
																		"c": [
																			{
																				"n": "B",
																				"c": [
																					{
																						"n": "U",
																						"c": [
																							{
																								"n": "SPAN",
																								"s": {
																									"font-family": "\"Times New Roman\", serif"
																								},
																								"t": "General information"
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
													},
													{
														"n": "TR",
														"c": [
															{
																"n": "TD",
																"a": {
																	"width": "73",
																	"valign": "top"
																},
																"s": {
																	"width": "54.9pt",
																	"border-right": "1pt solid black",
																	"border-bottom": "1pt solid black",
																	"border-left": "1pt solid black",
																	"border-image": "initial",
																	"border-top": "none",
																	"padding": "0in 5.4pt"
																},
																"c": [
																	{
																		"n": "SPAN",
																		"s": {
																			"font-family": "\"Times New Roman\", serif"
																		},
																		"t": "Project"
																	}
																]
															},
															{
																"n": "TD",
																"a": {
																	"width": "138",
																	"colspan": "5",
																	"valign": "top"
																},
																"s": {
																	"width": "103.5pt",
																	"border-top": "none",
																	"border-left": "none",
																	"border-bottom": "1pt solid black",
																	"border-right": "1pt solid black",
																	"padding": "0in 5.4pt"
																},
																"c": [
																	{
																		"n": "A",
																		"a": {
																			"href": "http://i-1.io/EU059S/?screen=ProjectScreen&projNo=1",
																			"no": "00",
																			"name": "p",
																			"class": "data"
																		},
																		"t": "Project Thu Aug 18 04:44:05 PDT 2016"
																	}
																]
															},
															{
																"n": "TD",
																"a": {
																	"width": "66",
																	"colspan": "6",
																	"valign": "top"
																},
																"s": {
																	"width": "49.5pt",
																	"border-top": "none",
																	"border-left": "none",
																	"border-bottom": "1pt solid black",
																	"border-right": "1pt solid black",
																	"padding": "0in 5.4pt"
																},
																"c": [
																	{
																		"n": "SPAN",
																		"s": {
																			"font-family": "\"Times New Roman\", serif"
																		},
																		"t": "Building"
																	}
																]
															},
															{
																"n": "TD",
																"a": {
																	"width": "160",
																	"colspan": "11",
																	"valign": "top"
																},
																"s": {
																	"width": "119.7pt",
																	"border-top": "none",
																	"border-left": "none",
																	"border-bottom": "1pt solid black",
																	"border-right": "1pt solid black",
																	"padding": "0in 5.4pt"
																},
																"c": [
																	{
																		"n": "A",
																		"a": {
																			"href": "http://i-1.io/EU059S/?screen=BuildingScreen&buildingNo=2",
																			"no": "01",
																			"name": "b",
																			"class": "data"
																		},
																		"t": "Building Thu Aug 18 19:58:34 PDT 2016"
																	}
																]
															},
															{
																"n": "TD",
																"a": {
																	"width": "50",
																	"colspan": "4",
																	"valign": "top"
																},
																"s": {
																	"width": "37.8pt",
																	"border-top": "none",
																	"border-left": "none",
																	"border-bottom": "1pt solid black",
																	"border-right": "1pt solid black",
																	"padding": "0in 5.4pt"
																},
																"c": [
																	{
																		"n": "SPAN",
																		"s": {
																			"font-family": "\"Times New Roman\", serif"
																		},
																		"t": "Date"
																	}
																]
															},
															{
																"n": "TD",
																"a": {
																	"width": "114",
																	"valign": "top"
																},
																"s": {
																	"width": "85.5pt",
																	"border-top": "none",
																	"border-left": "none",
																	"border-bottom": "1pt solid black",
																	"border-right": "1pt solid black",
																	"padding": "0in 5.4pt"
																},
																"c": [
																	{
																		"n": "INPUT",
																		"a": {
																			"no": "02",
																			"readonly": "",
																			"name": "datetime",
																			"type": "datetime-local",
																			"class": "data"
																		}
																	},
																	{
																		"n": "INPUT",
																		"a": {
																			"no": "2.0",
																			"name": "dt",
																			"type": "hidden",
																			"class": "data",
																			"value": "[object Object]"
																		}
																	}
																]
															}
														]
													},
													{
														"n": "TR",
														"c": [
															{
																"n": "TD",
																"a": {
																	"width": "73",
																	"valign": "top"
																},
																"s": {
																	"width": "54.9pt",
																	"border-right": "1pt solid black",
																	"border-bottom": "1pt solid black",
																	"border-left": "1pt solid black",
																	"border-image": "initial",
																	"border-top": "none",
																	"padding": "0in 5.4pt"
																},
																"c": [
																	{
																		"n": "SPAN",
																		"s": {
																			"font-family": "\"Times New Roman\", serif"
																		},
																		"t": "Floor"
																	}
																]
															},
															{
																"n": "TD",
																"a": {
																	"width": "53",
																	"colspan": "2",
																	"valign": "top"
																},
																"s": {
																	"width": "39.85pt",
																	"border-top": "none",
																	"border-left": "none",
																	"border-bottom": "1pt solid black",
																	"border-right": "1pt solid black",
																	"padding": "0in 5.4pt"
																},
																"c": [
																	{
																		"n": "A",
																		"a": {
																			"href": "http://i-1.io/EU059S/?screen=FloorScreen&floorNo=2",
																			"no": "03",
																			"name": "f",
																			"class": "data"
																		},
																		"t": "Floor Thu Aug 18 19:58:52 PDT 2016"
																	}
																]
															},
															{
																"n": "TD",
																"a": {
																	"width": "102",
																	"colspan": "5",
																	"valign": "top"
																},
																"s": {
																	"width": "76.5pt",
																	"border-top": "none",
																	"border-left": "none",
																	"border-bottom": "1pt solid black",
																	"border-right": "1pt solid black",
																	"padding": "0in 5.4pt"
																},
																"c": [
																	{
																		"n": "SPAN",
																		"s": {
																			"font-family": "\"Times New Roman\", serif"
																		},
																		"t": "Serial number"
																	}
																]
															},
															{
																"n": "TD",
																"a": {
																	"width": "60",
																	"colspan": "5",
																	"valign": "top"
																},
																"s": {
																	"width": "45.25pt",
																	"border-top": "none",
																	"border-left": "none",
																	"border-bottom": "1pt solid black",
																	"border-right": "1pt solid black",
																	"padding": "0in 5.4pt"
																},
																"c": [
																	{
																		"n": "INPUT",
																		"a": {
																			"no": "04",
																			"readonly": "",
																			"name": "no",
																			"class": "data"
																		}
																	},
																	{
																		"n": "INPUT",
																		"a": {
																			"type": "hidden",
																			"no": "4.5",
																			"name": "jsonRef",
																			"class": "data",
																			"value": "4"
																		}
																	}
																]
															},
															{
																"n": "TD",
																"a": {
																	"width": "120",
																	"colspan": "7",
																	"valign": "top"
																},
																"s": {
																	"width": "89.75pt",
																	"border-top": "none",
																	"border-left": "none",
																	"border-bottom": "1pt solid black",
																	"border-right": "1pt solid black",
																	"padding": "0in 5.4pt"
																},
																"c": [
																	{
																		"n": "SPAN",
																		"s": {
																			"font-family": "\"Times New Roman\", serif"
																		},
																		"t": "Inspector`s name"
																	}
																]
															},
															{
																"n": "TD",
																"a": {
																	"width": "193",
																	"colspan": "8",
																	"valign": "top"
																},
																"s": {
																	"width": "144.65pt",
																	"border-top": "none",
																	"border-left": "none",
																	"border-bottom": "1pt solid black",
																	"border-right": "1pt solid black",
																	"padding": "0in 5.4pt"
																},
																"c": [
																	{
																		"n": "A",
																		"a": {
																			"href": "http://i-1.io/EU059S/?screen=UserScreen&uid=1",
																			"no": "05",
																			"name": "u",
																			"class": "data"
																		},
																		"t": "1"
																	}
																]
															}
														]
													},
													{
														"n": "TR",
														"s": {
															"height": "10.25pt"
														},
														"c": [
															{
																"n": "TD",
																"a": {
																	"width": "73",
																	"rowspan": "2",
																	"valign": "top"
																},
																"s": {
																	"width": "54.9pt",
																	"border-right": "1pt solid black",
																	"border-bottom": "1pt solid black",
																	"border-left": "1pt solid black",
																	"border-image": "initial",
																	"border-top": "none",
																	"padding": "0in 5.4pt",
																	"height": "10.25pt"
																},
																"c": [
																	{
																		"n": "SPAN",
																		"s": {
																			"font-family": "\"Times New Roman\", serif"
																		},
																		"t": "Type of member"
																	}
																]
															},
															{
																"n": "TD",
																"a": {
																	"width": "131",
																	"colspan": "4",
																	"valign": "top"
																},
																"s": {
																	"width": "98.35pt",
																	"border-top": "none",
																	"border-left": "none",
																	"border-bottom": "1pt solid black",
																	"border-right": "1pt solid black",
																	"padding": "0in 5.4pt",
																	"height": "10.25pt"
																},
																"c": [
																	{
																		"n": "INPUT",
																		"id": "TypeofMemberBeam",
																		"a": {
																			"no": "06",
																			"type": "checkbox",
																			"name": "TypeofMemberBeam",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "TypeofMemberBeam"
																		},
																		"t": "Beam"
																	}
																]
															},
															{
																"n": "TD",
																"a": {
																	"width": "91",
																	"colspan": "9",
																	"valign": "top"
																},
																"s": {
																	"width": "67.95pt",
																	"border-top": "none",
																	"border-left": "none",
																	"border-bottom": "1pt solid black",
																	"border-right": "1pt solid black",
																	"padding": "0in 5.4pt",
																	"height": "10.25pt"
																},
																"c": [
																	{
																		"n": "INPUT",
																		"id": "TypeofMemberColunm",
																		"a": {
																			"no": "07",
																			"type": "checkbox",
																			"name": "TypeofMemberColunm",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "TypeofMemberColunm",
																			"xid": "TypeofMember"
																		},
																		"t": "Column"
																	}
																]
															},
															{
																"n": "TD",
																"a": {
																	"width": "66",
																	"colspan": "5",
																	"valign": "top"
																},
																"s": {
																	"width": "49.5pt",
																	"border-top": "none",
																	"border-left": "none",
																	"border-bottom": "1pt solid black",
																	"border-right": "1pt solid black",
																	"padding": "0in 5.4pt",
																	"height": "10.25pt"
																},
																"c": [
																	{
																		"n": "INPUT",
																		"id": "TypeofMemberSlab",
																		"a": {
																			"no": "08",
																			"type": "checkbox",
																			"name": "TypeofMemberSlab",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "TypeofMemberSlab",
																			"xid": "TypeofMember"
																		},
																		"t": "Slab"
																	}
																]
															},
															{
																"n": "TD",
																"a": {
																	"width": "72",
																	"colspan": "3",
																	"valign": "top"
																},
																"s": {
																	"width": "0.75in",
																	"border-top": "none",
																	"border-left": "none",
																	"border-bottom": "1pt solid black",
																	"border-right": "1pt solid black",
																	"padding": "0in 5.4pt",
																	"height": "10.25pt"
																},
																"c": [
																	{
																		"n": "INPUT",
																		"id": "TypeofMemberStairs",
																		"a": {
																			"no": "09",
																			"type": "checkbox",
																			"name": "TypeofMemberStairs",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "TypeofMemberStairs",
																			"xid": "TypeofMember"
																		},
																		"t": "Stairs"
																	}
																]
															},
															{
																"n": "TD",
																"a": {
																	"width": "168",
																	"colspan": "6",
																	"valign": "top"
																},
																"s": {
																	"width": "126.2pt",
																	"border-top": "none",
																	"border-left": "none",
																	"border-bottom": "1pt solid black",
																	"border-right": "1pt solid black",
																	"padding": "0in 5.4pt",
																	"height": "10.25pt"
																},
																"c": [
																	{
																		"n": "INPUT",
																		"id": "TypeofMemberMansory",
																		"a": {
																			"no": "10",
																			"type": "checkbox",
																			"name": "TypeofMemberMansory",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "TypeofMemberMansory",
																			"xid": "TypeofMember"
																		},
																		"t": "Masonry\n					wall"
																	}
																]
															}
														]
													},
													{
														"n": "TR",
														"s": {
															"height": "10.25pt"
														},
														"c": [
															{
																"n": "TD",
																"a": {
																	"width": "131",
																	"colspan": "4",
																	"valign": "top"
																},
																"s": {
																	"width": "98.35pt",
																	"border-top": "none",
																	"border-left": "none",
																	"border-bottom": "1pt solid black",
																	"border-right": "1pt solid black",
																	"padding": "0in 5.4pt",
																	"height": "10.25pt"
																},
																"c": [
																	{
																		"n": "INPUT",
																		"id": "TypeofMemberRC",
																		"a": {
																			"no": "11",
																			"type": "checkbox",
																			"name": "TypeofMemberRC",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "TypeofMemberRC",
																			"xid": "TypeofMember"
																		},
																		"t": "RC\n					Wall"
																	}
																]
															},
															{
																"n": "TD",
																"a": {
																	"width": "108",
																	"colspan": "11",
																	"valign": "top"
																},
																"s": {
																	"width": "81pt",
																	"border-top": "none",
																	"border-bottom": "none",
																	"border-left": "none",
																	"border-image": "initial",
																	"border-right": "1pt solid black",
																	"padding": "0in 5.4pt",
																	"height": "10.25pt"
																},
																"c": [
																	{
																		"n": "INPUT",
																		"id": "TypeofMemberFoundation",
																		"a": {
																			"no": "12",
																			"type": "checkbox",
																			"name": "TypeofMemberFoundation",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "TypeofMemberFoundation",
																			"xid": "TypeofMember"
																		},
																		"t": "Foundation"
																	}
																]
															},
															{
																"n": "TD",
																"a": {
																	"width": "289",
																	"colspan": "12",
																	"valign": "top"
																},
																"s": {
																	"width": "216.65pt",
																	"border-top": "none",
																	"border-bottom": "none",
																	"border-left": "none",
																	"border-image": "initial",
																	"border-right": "1pt solid black",
																	"padding": "0in 5.4pt",
																	"height": "10.25pt"
																},
																"c": [
																	{
																		"n": "INPUT",
																		"id": "TypeofMemberOther",
																		"a": {
																			"no": "13",
																			"name": "TypeofMemberOther",
																			"type": "checkbox",
																			"class": "data switch",
																			"onchange": "var x=document.getElementsByName('TypeofMemberOtherText')[0],h=this.checked;x.readOnly=!h;x.style.backgroundColor=h?'':'lightgray';if(h){if(this.xVal!=undefined)x.value=this.xVal;}else{this.xVal=x.value;x.value='';}"
																		}
																	},
																	{
																		"n": "STYLE",
																		"a": {
																			"class": "--apng-checked"
																		},
																		"t": "label:after{display:none}"
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "TypeofMemberOther"
																		},
																		"s": {
																			"text-decoration": "none",
																			"color": "rgb(100, 100, 100)",
																			"cursor": "pointer",
																			"display": "inline-block",
																			"font-size": "1em",
																			"font-weight": "400",
																			"padding-left": "2.4em",
																			"padding-right": "0.75em",
																			"position": "relative"
																		},
																		"t": "Other:"
																	},
																	{
																		"n": "STYLE",
																		"a": {
																			"class": "--apng-checked"
																		},
																		"t": "label:after{position:inherit;display:inherit}"
																	},
																	{
																		"n": "INPUT",
																		"a": {
																			"no": "14",
																			"name": "TypeofMemberOtherText",
																			"class": "data"
																		}
																	}
																]
															}
														]
													},
													{
														"n": "TR",
														"s": {
															"height": "31.4pt"
														},
														"c": [
															{
																"n": "TD",
																"a": {
																	"width": "73"
																},
																"s": {
																	"width": "54.9pt",
																	"border-right": "1pt solid black",
																	"border-bottom": "1pt solid black",
																	"border-left": "1pt solid black",
																	"border-image": "initial",
																	"border-top": "none",
																	"padding": "0in 5.4pt",
																	"height": "31.4pt"
																},
																"c": [
																	{
																		"n": "SPAN",
																		"s": {
																			"font-family": "\"Times New Roman\", serif"
																		},
																		"t": "Location"
																	}
																]
															},
															{
																"n": "TD",
																"a": {
																	"width": "528",
																	"colspan": "27",
																	"valign": "top"
																},
																"s": {
																	"width": "5.5in",
																	"border-top": "none",
																	"border-left": "none",
																	"border-bottom": "1pt solid black",
																	"border-right": "1pt solid black",
																	"height": "31.4pt"
																},
																"c": [
																	{
																		"n": "INPUT",
																		"a": {
																			"no": "15",
																			"name": "location",
																			"class": "data"
																		},
																		"s": {
																			"width": "95%"
																		}
																	}
																]
															}
														]
													},
													{
														"n": "TR",
														"s": {
															"height": "10.5pt"
														},
														"c": [
															{
																"n": "TD",
																"a": {
																	"width": "73",
																	"rowspan": "2"
																},
																"s": {
																	"width": "54.9pt",
																	"border-right": "1pt solid black",
																	"border-bottom": "1pt solid black",
																	"border-left": "1pt solid black",
																	"border-image": "initial",
																	"border-top": "none",
																	"padding": "0in 5.4pt",
																	"height": "10.5pt"
																},
																"c": [
																	{
																		"n": "SPAN",
																		"s": {
																			"font-family": "\"Times New Roman\", serif"
																		},
																		"t": "Exposure"
																	}
																]
															},
															{
																"n": "TD",
																"a": {
																	"width": "176",
																	"colspan": "9",
																	"valign": "top"
																},
																"s": {
																	"width": "132pt",
																	"border-top": "none",
																	"border-left": "none",
																	"border-bottom": "1pt solid black",
																	"border-right": "1pt solid black",
																	"padding": "0in 5.4pt",
																	"height": "10.5pt"
																},
																"c": [
																	{
																		"n": "INPUT",
																		"id": "exposure.wetDry1",
																		"a": {
																			"no": "16",
																			"name": "exposure_wetDry",
																			"type": "checkbox",
																			"value": "1",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "exposure.wetDry1"
																		},
																		"t": "Wetting and drying"
																	}
																]
															},
															{
																"n": "TD",
																"a": {
																	"width": "176",
																	"colspan": "11",
																	"valign": "top"
																},
																"s": {
																	"width": "132pt",
																	"border-top": "none",
																	"border-left": "none",
																	"border-bottom": "1pt solid black",
																	"border-right": "1pt solid black",
																	"padding": "0in 5.4pt",
																	"height": "10.5pt"
																},
																"c": [
																	{
																		"n": "INPUT",
																		"id": "exposure.chemical",
																		"a": {
																			"no": "17",
																			"name": "exposure_chemical",
																			"type": "checkbox",
																			"value": "2",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "exposure.chemical"
																		},
																		"t": "Chemical attack"
																	}
																]
															},
															{
																"n": "TD",
																"a": {
																	"width": "176",
																	"colspan": "7",
																	"valign": "top"
																},
																"s": {
																	"width": "132pt",
																	"border-top": "none",
																	"border-left": "none",
																	"border-bottom": "1pt solid black",
																	"border-right": "1pt solid black",
																	"padding": "0in 5.4pt",
																	"height": "10.5pt"
																},
																"c": [
																	{
																		"n": "INPUT",
																		"id": "exposure.erosion",
																		"a": {
																			"no": "18",
																			"name": "exposure_erosion",
																			"type": "checkbox",
																			"value": "3",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "exposure.erosion"
																		},
																		"t": "Abrasion/ erosion"
																	}
																]
															}
														]
													},
													{
														"n": "TR",
														"s": {
															"height": "10.5pt"
														},
														"c": [
															{
																"n": "TD",
																"a": {
																	"width": "176",
																	"colspan": "9",
																	"valign": "top"
																},
																"s": {
																	"width": "132pt",
																	"border-top": "none",
																	"border-left": "none",
																	"border-bottom": "1pt solid black",
																	"border-right": "1pt solid black",
																	"padding": "0in 5.4pt",
																	"height": "10.5pt"
																},
																"c": [
																	{
																		"n": "INPUT",
																		"id": "exposure.elec",
																		"a": {
																			"no": "19",
																			"name": "exposure_elec",
																			"type": "checkbox",
																			"value": "4",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "exposure.elec"
																		},
																		"t": "Electric conductivity"
																	}
																]
															},
															{
																"n": "TD",
																"a": {
																	"width": "352",
																	"colspan": "18",
																	"valign": "top"
																},
																"s": {
																	"width": "264pt",
																	"border-top": "none",
																	"border-left": "none",
																	"border-bottom": "1pt solid black",
																	"border-right": "1pt solid black",
																	"padding": "0in 5.4pt",
																	"height": "10.5pt"
																},
																"c": [
																	{
																		"n": "INPUT",
																		"id": "exposure.heat",
																		"a": {
																			"no": "20",
																			"name": "exposure_heat",
																			"type": "checkbox",
																			"value": "5",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "exposure.heat"
																		},
																		"t": "Heat from adjacent sources"
																	}
																]
															}
														]
													},
													{
														"n": "TR",
														"s": {
															"height": "10.5pt"
														},
														"c": [
															{
																"n": "TD",
																"a": {
																	"width": "73",
																	"rowspan": "2"
																},
																"s": {
																	"width": "54.9pt",
																	"border-right": "1pt solid black",
																	"border-bottom": "1pt solid black",
																	"border-left": "1pt solid black",
																	"border-image": "initial",
																	"border-top": "none",
																	"padding": "0in 5.4pt",
																	"height": "10.5pt"
																},
																"c": [
																	{
																		"n": "SPAN",
																		"s": {
																			"font-family": "\"Times New Roman\", serif"
																		},
																		"t": "Loading\n\tcondition"
																	}
																]
															},
															{
																"n": "TD",
																"a": {
																	"width": "138",
																	"colspan": "5",
																	"valign": "top"
																},
																"s": {
																	"width": "103.5pt",
																	"border-top": "none",
																	"border-left": "none",
																	"border-bottom": "1pt solid black",
																	"border-right": "1pt solid black",
																	"padding": "0in 5.4pt",
																	"height": "10.5pt"
																},
																"c": [
																	{
																		"n": "INPUT",
																		"id": "LoadingCondition.Dead",
																		"a": {
																			"no": "21",
																			"name": "LoadingCondition_Dead",
																			"type": "checkbox",
																			"value": "1",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "LoadingCondition.Dead"
																		},
																		"t": "Dead"
																	}
																]
															},
															{
																"n": "TD",
																"a": {
																	"width": "138",
																	"colspan": "12",
																	"valign": "top"
																},
																"s": {
																	"width": "103.5pt",
																	"border-top": "none",
																	"border-left": "none",
																	"border-bottom": "1pt solid black",
																	"border-right": "1pt solid black",
																	"padding": "0in 5.4pt",
																	"height": "10.5pt"
																},
																"c": [
																	{
																		"n": "INPUT",
																		"id": "LoadingCondition.Live",
																		"a": {
																			"no": "22",
																			"name": "LoadingCondition_Live",
																			"type": "checkbox",
																			"value": "2",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "LoadingCondition.Live"
																		},
																		"t": "Live"
																	}
																]
															},
															{
																"n": "TD",
																"a": {
																	"width": "135",
																	"colspan": "8",
																	"valign": "top"
																},
																"s": {
																	"width": "101pt",
																	"border-top": "none",
																	"border-left": "none",
																	"border-bottom": "1pt solid black",
																	"border-right": "1pt solid black",
																	"padding": "0in 5.4pt",
																	"height": "10.5pt"
																},
																"c": [
																	{
																		"n": "INPUT",
																		"id": "LoadingCondition.Impact",
																		"a": {
																			"no": "23",
																			"name": "LoadingCondition_Impact",
																			"type": "checkbox",
																			"value": "3",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "LoadingCondition.Impact"
																		},
																		"t": "Impact"
																	}
																]
															},
															{
																"n": "TD",
																"a": {
																	"width": "117",
																	"colspan": "2",
																	"valign": "top"
																},
																"s": {
																	"width": "88pt",
																	"border-top": "none",
																	"border-left": "none",
																	"border-bottom": "1pt solid black",
																	"border-right": "1pt solid black",
																	"padding": "0in 5.4pt",
																	"height": "10.5pt"
																},
																"c": [
																	{
																		"n": "INPUT",
																		"id": "LoadingCondition.Vibration",
																		"a": {
																			"no": "24",
																			"name": "LoadingCondition_Vibration",
																			"type": "checkbox",
																			"value": "4",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "LoadingCondition.Vibration"
																		},
																		"t": "Vibration"
																	}
																]
															}
														]
													},
													{
														"n": "TR",
														"s": {
															"height": "10.5pt"
														},
														"c": [
															{
																"n": "TD",
																"a": {
																	"width": "138",
																	"colspan": "5",
																	"valign": "top"
																},
																"s": {
																	"width": "103.5pt",
																	"border-top": "none",
																	"border-left": "none",
																	"border-bottom": "1pt solid black",
																	"border-right": "1pt solid black",
																	"padding": "0in 5.4pt",
																	"height": "10.5pt"
																},
																"c": [
																	{
																		"n": "INPUT",
																		"id": "LoadingCondition.Traffic",
																		"a": {
																			"no": "25",
																			"name": "LoadingCondition_Traffic",
																			"type": "checkbox",
																			"value": "5",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "LoadingCondition.Traffic"
																		},
																		"t": "Traffic"
																	}
																]
															},
															{
																"n": "TD",
																"a": {
																	"width": "138",
																	"colspan": "12",
																	"valign": "top"
																},
																"s": {
																	"width": "103.5pt",
																	"border-top": "none",
																	"border-left": "none",
																	"border-bottom": "1pt solid black",
																	"border-right": "1pt solid black",
																	"padding": "0in 5.4pt",
																	"height": "10.5pt"
																},
																"c": [
																	{
																		"n": "INPUT",
																		"id": "LoadingCondition.Seismic",
																		"a": {
																			"no": "26",
																			"name": "LoadingCondition_Seismic",
																			"type": "checkbox",
																			"value": "6",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "LoadingCondition.Seismic"
																		},
																		"t": "Seismic"
																	}
																]
															},
															{
																"n": "TD",
																"a": {
																	"width": "252",
																	"colspan": "10",
																	"valign": "top"
																},
																"s": {
																	"width": "189pt",
																	"border-top": "none",
																	"border-left": "none",
																	"border-bottom": "1pt solid black",
																	"border-right": "1pt solid black",
																	"padding": "0in 5.4pt",
																	"height": "10.5pt"
																},
																"c": [
																	{
																		"n": "P",
																		"s": {
																			"margin": "0px"
																		},
																		"c": [
																			{
																				"n": "INPUT",
																				"id": "LoadingCondition.Other",
																				"a": {
																					"no": "27",
																					"name": "LoadingCondition_Other",
																					"type": "checkbox",
																					"value": "7",
																					"class": "data switch ",
																					"onchange": "var x=document.getElementsByName('LoadingConditionOther')[0],h=this.checked;x.readOnly=!h;x.style.backgroundColor=h?'':'lightgray';if(h){if(this.xVal!=undefined)x.value=this.xVal;}else{this.xVal=x.value;x.value='';}"
																				}
																			},
																			{
																				"n": "STYLE",
																				"a": {
																					"class": "--apng-checked"
																				},
																				"t": "label:after{display:none}"
																			},
																			{
																				"n": "LABEL",
																				"a": {
																					"for": "LoadingCondition.Other"
																				},
																				"s": {
																					"text-decoration": "none",
																					"color": "rgb(100, 100, 100)",
																					"cursor": "pointer",
																					"display": "inline-block",
																					"font-size": "1em",
																					"font-weight": "400",
																					"padding-left": "2.4em",
																					"padding-right": "0.75em",
																					"position": "relative"
																				},
																				"t": "Other:"
																			},
																			{
																				"n": "STYLE",
																				"a": {
																					"class": "--apng-checked"
																				},
																				"t": "label:after{position:inherit;display:inherit}"
																			},
																			{
																				"n": "INPUT",
																				"a": {
																					"no": "28",
																					"name": "LoadingConditionOther",
																					"class": "data"
																				}
																			},
																			{
																				"n": "SCRIPT",
																				"t": "\n							var a = document.getElementsByName('LoadingCondition.Other')\n									, LoadingConditionPrev = null\n									, LoadingConditionF=function() {\n								var v=this.value,p=LoadingConditionPrev\n										,w=v==7?this:p&&p.value==7?p:{};\n								//console.log('LoadingConditionF:',v)\n\n								var x=document.getElementsByName('LoadingConditionOther')[0]\n										,h=w.checked;x.readOnly=!h;\n								x.style.backgroundColor=h?'':'lightgray';\n								if(h){if(w.xVal!=undefined)x.value=w.xVal;}\n								else if(p==w){w.xVal=x.value;x.value='';}\n								if(this !== p)\n									LoadingConditionPrev = this;\n							};\n							for(var i = 0; i < a.length; i++) {\n								a[i].onclick = LoadingConditionF\n							}\n						"
																			}
																		]
																	}
																]
															}
														]
													},
													{
														"n": "TR",
														"s": {
															"height": "10.5pt"
														},
														"c": [
															{
																"n": "TD",
																"a": {
																	"width": "289",
																	"colspan": "13",
																	"valign": "top"
																},
																"s": {
																	"width": "216.5pt",
																	"border-top": "none",
																	"border-left": "1pt solid black",
																	"border-bottom": "none",
																	"border-right": "1pt solid black",
																	"padding": "0in 5.4pt",
																	"height": "10.5pt"
																},
																"c": [
																	{
																		"n": "B",
																		"c": [
																			{
																				"n": "U",
																				"c": [
																					{
																						"n": "SPAN",
																						"s": {
																							"font-family": "\"Times New Roman\", serif"
																						},
																						"t": "General\n\tcondition"
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
																	"width": "313",
																	"colspan": "15",
																	"valign": "top"
																},
																"s": {
																	"width": "234.4pt",
																	"border-top": "none",
																	"border-bottom": "none",
																	"border-left": "none",
																	"border-image": "initial",
																	"border-right": "1pt solid black",
																	"padding": "0in 5.4pt",
																	"height": "10.5pt"
																},
																"c": [
																	{
																		"n": "B",
																		"c": [
																			{
																				"n": "U",
																				"c": [
																					{
																						"n": "SPAN",
																						"s": {
																							"font-family": "\"Times New Roman\", serif"
																						},
																						"t": "Distress\n\tindicator"
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
														"n": "TR",
														"s": {
															"height": "10.5pt"
														},
														"c": [
															{
																"n": "TD",
																"a": {
																	"width": "102",
																	"colspan": "2",
																	"rowspan": "2"
																},
																"s": {
																	"width": "76.85pt",
																	"border-top": "none",
																	"border-left": "1pt solid black",
																	"border-bottom": "1pt solid black",
																	"border-right": "none",
																	"padding": "0in 5.4pt",
																	"height": "10.5pt"
																},
																"c": [
																	{
																		"n": "INPUT",
																		"id": "GeneralCondition1",
																		"a": {
																			"no": "29",
																			"name": "GeneralCondition",
																			"type": "radio",
																			"value": "1",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "GeneralCondition1"
																		},
																		"c": [
																			{
																				"n": "I",
																				"t": "Good"
																			}
																		]
																	}
																]
															},
															{
																"n": "TD",
																"a": {
																	"width": "112",
																	"colspan": "5",
																	"rowspan": "2"
																},
																"s": {
																	"width": "84.05pt",
																	"border-top": "none",
																	"border-right": "none",
																	"border-left": "none",
																	"border-image": "initial",
																	"border-bottom": "1pt solid black",
																	"padding": "0in 5.4pt",
																	"height": "10.5pt"
																},
																"c": [
																	{
																		"n": "INPUT",
																		"id": "GeneralCondition2",
																		"a": {
																			"no": "30",
																			"name": "GeneralCondition",
																			"type": "radio",
																			"value": "2",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "GeneralCondition2"
																		},
																		"c": [
																			{
																				"n": "I",
																				"t": "Satisfactory"
																			}
																		]
																	}
																]
															},
															{
																"n": "TD",
																"a": {
																	"width": "74",
																	"colspan": "6",
																	"rowspan": "2"
																},
																"s": {
																	"width": "55.6pt",
																	"border-top": "none",
																	"border-left": "none",
																	"border-bottom": "1pt solid black",
																	"border-right": "1pt solid black",
																	"padding": "0in 5.4pt",
																	"height": "10.5pt"
																},
																"c": [
																	{
																		"n": "INPUT",
																		"id": "GeneralCondition3",
																		"a": {
																			"no": "31",
																			"name": "GeneralCondition",
																			"type": "radio",
																			"value": "3",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "GeneralCondition3"
																		},
																		"c": [
																			{
																				"n": "I",
																				"t": "Poor"
																			}
																		]
																	}
																]
															},
															{
																"n": "TD",
																"a": {
																	"width": "180",
																	"colspan": "12",
																	"valign": "top"
																},
																"s": {
																	"width": "135.05pt",
																	"border": "none",
																	"padding": "0in 5.4pt",
																	"height": "10.5pt"
																},
																"c": [
																	{
																		"n": "INPUT",
																		"id": "Distress.Cracking",
																		"a": {
																			"no": "32",
																			"type": "checkbox",
																			"name": "Distress_Cracking",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Distress.Cracking",
																			"xid": "Distress"
																		},
																		"t": "Cracking"
																	}
																]
															},
															{
																"n": "TD",
																"a": {
																	"width": "132",
																	"colspan": "3",
																	"valign": "top"
																},
																"s": {
																	"width": "99.35pt",
																	"border-top": "none",
																	"border-bottom": "none",
																	"border-left": "none",
																	"border-image": "initial",
																	"border-right": "1pt solid black",
																	"padding": "0in 5.4pt",
																	"height": "10.5pt"
																},
																"c": [
																	{
																		"n": "INPUT",
																		"id": "Distress.Staining",
																		"a": {
																			"no": "33",
																			"type": "checkbox",
																			"name": "Distress_Staining",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Distress.Staining",
																			"xid": "Distress"
																		},
																		"t": "Staining"
																	}
																]
															}
														]
													},
													{
														"n": "TR",
														"s": {
															"height": "15.5pt"
														},
														"c": [
															{
																"n": "TD",
																"a": {
																	"width": "180",
																	"colspan": "12",
																	"valign": "top"
																},
																"s": {
																	"width": "135.05pt",
																	"border-top": "none",
																	"border-right": "none",
																	"border-left": "none",
																	"border-image": "initial",
																	"border-bottom": "1pt solid black",
																	"padding": "0in 5.4pt",
																	"height": "15.5pt"
																},
																"c": [
																	{
																		"n": "INPUT",
																		"id": "Distress.Surface",
																		"a": {
																			"no": "34",
																			"type": "checkbox",
																			"name": "Distress_Surface",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Distress.Surface"
																		},
																		"t": "Surface\n					deposits"
																	}
																]
															},
															{
																"n": "TD",
																"a": {
																	"width": "132",
																	"colspan": "3",
																	"valign": "top"
																},
																"s": {
																	"width": "99.35pt",
																	"border-top": "none",
																	"border-left": "none",
																	"border-bottom": "1pt solid black",
																	"border-right": "1pt solid black",
																	"padding": "0in 5.4pt",
																	"height": "15.5pt"
																},
																"c": [
																	{
																		"n": "INPUT",
																		"id": "Distress.Leaking",
																		"a": {
																			"no": "35",
																			"type": "checkbox",
																			"name": "Distress_Leaking",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Distress.Leaking"
																		},
																		"t": "Leaking"
																	}
																]
															}
														]
													},
													{
														"n": "TR",
														"s": {
															"height": "17.95pt"
														},
														"c": [
															{
																"n": "TD",
																"a": {
																	"width": "150",
																	"colspan": "4",
																	"rowspan": "13",
																	"valign": "top"
																},
																"s": {
																	"width": "112.75pt",
																	"border-right": "1pt solid black",
																	"border-bottom": "1pt solid black",
																	"border-left": "1pt solid black",
																	"border-image": "initial",
																	"border-top": "none",
																	"padding": "0in 5.4pt",
																	"height": "17.95pt"
																},
																"c": [
																	{
																		"n": "B",
																		"c": [
																			{
																				"n": "U",
																				"c": [
																					{
																						"n": "SPAN",
																						"s": {
																							"font-family": "\"Times New Roman\", serif"
																						},
																						"t": "Cracking"
																					}
																				]
																			}
																		]
																	},
																	{
																		"n": "B",
																		"c": [
																			{
																				"n": "SPAN",
																				"s": {
																					"font-family": "\"Times New Roman\", serif"
																				},
																				"t": "Pattern"
																			}
																		]
																	},
																	{
																		"n": "INPUT",
																		"id": "Cracking.Checking",
																		"a": {
																			"no": "36",
																			"type": "checkbox",
																			"name": "Cracking_Checking",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Cracking.Checking",
																			"xid": "Cracking"
																		},
																		"t": "Checking"
																	},
																	{
																		"n": "INPUT",
																		"id": "Cracking.Craze",
																		"a": {
																			"no": "37",
																			"type": "checkbox",
																			"name": "Cracking_Craze",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Cracking.Craze",
																			"xid": "Cracking"
																		},
																		"t": "Craze\n				"
																	},
																	{
																		"n": "INPUT",
																		"id": "Cracking.D-cracks",
																		"a": {
																			"no": "38",
																			"type": "checkbox",
																			"name": "Cracking_D-cracks",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Cracking.D-cracks",
																			"xid": "Cracking"
																		},
																		"t": "D-cracks"
																	},
																	{
																		"n": "INPUT",
																		"id": "Cracking.Diagnol",
																		"a": {
																			"no": "39",
																			"type": "checkbox",
																			"name": "Cracking_Diagnol",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Cracking.Diagnol",
																			"xid": "Cracking"
																		},
																		"t": "Diagonal\n				"
																	},
																	{
																		"n": "INPUT",
																		"id": "Cracking.Hairline",
																		"a": {
																			"no": "40",
																			"type": "checkbox",
																			"name": "Cracking_Hairline",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Cracking.Hairline",
																			"xid": "Cracking"
																		},
																		"t": "Hairline\n				"
																	},
																	{
																		"n": "INPUT",
																		"id": "Cracking.Longitudinal",
																		"a": {
																			"no": "41",
																			"type": "checkbox",
																			"name": "Cracking_Longitudinal",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Cracking.Longitudinal",
																			"xid": "TypeofMember"
																		},
																		"t": "Longitudinal\n				"
																	},
																	{
																		"n": "INPUT",
																		"id": "Cracking.Map",
																		"a": {
																			"no": "42",
																			"type": "checkbox",
																			"name": "Cracking_Map",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Cracking.Map",
																			"xid": "Cracking"
																		},
																		"t": "Map\n				"
																	},
																	{
																		"n": "INPUT",
																		"id": "Cracking.Pattern",
																		"a": {
																			"no": "43",
																			"type": "checkbox",
																			"name": "Cracking_Pattern",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Cracking.Pattern",
																			"xid": "Cracking"
																		},
																		"t": "Pattern\n				"
																	},
																	{
																		"n": "INPUT",
																		"id": "Cracking.Plastic",
																		"a": {
																			"no": "44",
																			"type": "checkbox",
																			"name": "Cracking_Plastic",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Cracking.Plastic",
																			"xid": "Cracking"
																		},
																		"t": "Plastic\n					shrinkage "
																	},
																	{
																		"n": "INPUT",
																		"id": "Cracking.Random",
																		"a": {
																			"no": "45",
																			"type": "checkbox",
																			"name": "Cracking_Random",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Cracking.Random",
																			"xid": "Cracking"
																		},
																		"t": "Random\n				"
																	},
																	{
																		"n": "INPUT",
																		"id": "Cracking.Shrinkage",
																		"a": {
																			"no": "46",
																			"type": "checkbox",
																			"name": "Cracking_Shrinkage",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Cracking.Shrinkage",
																			"xid": "Cracking"
																		},
																		"t": "Shrinkage\n				"
																	},
																	{
																		"n": "INPUT",
																		"id": "Cracking.Temperature",
																		"a": {
																			"no": "47",
																			"type": "checkbox",
																			"name": "Cracking_Temperature",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Cracking.Temperature",
																			"xid": "Cracking"
																		},
																		"t": "Temperature\n				"
																	},
																	{
																		"n": "INPUT",
																		"id": "Cracking.Transverse",
																		"a": {
																			"no": "48",
																			"type": "checkbox",
																			"name": "Cracking_Transverse",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Cracking.Transverse",
																			"xid": "Cracking"
																		},
																		"t": "Transverse"
																	},
																	{
																		"n": "B",
																		"c": [
																			{
																				"n": "SPAN",
																				"s": {
																					"font-family": "\"Times New Roman\", serif"
																				}
																			}
																		]
																	},
																	{
																		"n": "B",
																		"c": [
																			{
																				"n": "SPAN",
																				"s": {
																					"font-family": "\"Times New Roman\", serif"
																				},
																				"t": "Other Attributes"
																			}
																		]
																	},
																	{
																		"n": "SPAN",
																		"s": {
																			"font-family": "Symbol"
																		},
																		"c": [
																			{
																				"n": "SPAN",
																				"s": {
																					"font-style": "normal",
																					"font-variant": "normal",
																					"font-weight": "normal",
																					"font-stretch": "normal",
																					"font-size": "7pt",
																					"line-height": "normal",
																					"font-family": "\"Times New Roman\""
																				}
																			}
																		]
																	},
																	{
																		"n": "SPAN",
																		"a": {
																			"dir": "LTR"
																		}
																	},
																	{
																		"n": "SPAN",
																		"s": {
																			"font-family": "\"Times New Roman\", serif"
																		},
																		"c": [
																			"Width",
																			{
																				"n": "INPUT",
																				"id": "widthNumber",
																				"a": {
																					"no": "49",
																					"name": "width",
																					"type": "number",
																					"min": "0",
																					"step": "0.05",
																					"class": "data"
																				},
																				"s": {
																					"width": "50px"
																				}
																			},
																			"mm"
																		]
																	},
																	{
																		"n": "INPUT",
																		"id": "Leaching",
																		"a": {
																			"no": "50",
																			"type": "checkbox",
																			"name": "Leaching",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Leaching"
																		},
																		"t": "Leaching"
																	},
																	{
																		"n": "INPUT",
																		"id": "WorkingOrDormant1",
																		"a": {
																			"no": "51",
																			"type": "radio",
																			"value": "1",
																			"name": "WorkingOrDormant",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "WorkingOrDormant1"
																		},
																		"t": "Working"
																	},
																	{
																		"n": "INPUT",
																		"id": "WorkingOrDormant2",
																		"a": {
																			"no": "52",
																			"type": "radio",
																			"value": "2",
																			"name": "WorkingOrDormant",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "WorkingOrDormant2"
																		},
																		"t": "Dormant"
																	}
																]
															},
															{
																"n": "TD",
																"a": {
																	"width": "294",
																	"colspan": "20",
																	"valign": "top"
																},
																"s": {
																	"width": "220.85pt",
																	"border-top": "none",
																	"border-left": "none",
																	"border-bottom": "0pt solid black",
																	"border-right": "1pt solid black",
																	"padding": "0in 5.4pt",
																	"height": "17.95pt"
																},
																"c": [
																	{
																		"n": "B",
																		"c": [
																			{
																				"n": "U",
																				"c": [
																					{
																						"n": "SPAN",
																						"s": {
																							"font-family": "\"Times New Roman\", serif"
																						},
																						"t": "Distresses"
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
																	"width": "156",
																	"colspan": "4",
																	"rowspan": "9",
																	"valign": "top"
																},
																"s": {
																	"width": "117.3pt",
																	"border-top": "none",
																	"border-left": "none",
																	"border-bottom": "1pt solid black",
																	"border-right": "1pt solid black",
																	"padding": "0in 5.4pt",
																	"height": "17.95pt"
																},
																"c": [
																	{
																		"n": "B",
																		"c": [
																			{
																				"n": "U",
																				"c": [
																					{
																						"n": "SPAN",
																						"s": {
																							"font-family": "\"Times New Roman\", serif"
																						},
																						"t": "Textural features"
																					}
																				]
																			}
																		]
																	},
																	{
																		"n": "BR"
																	},
																	{
																		"n": "INPUT",
																		"id": "Textural.AirVoid",
																		"a": {
																			"no": "53",
																			"type": "checkbox",
																			"name": "Textural_AirVoid",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Textural.AirVoid",
																			"xid": "Textural"
																		},
																		"t": "Air void"
																	},
																	{
																		"n": "BR"
																	},
																	{
																		"n": "INPUT",
																		"id": "Textural.Blistering",
																		"a": {
																			"no": "54",
																			"type": "checkbox",
																			"name": "Textural_Blistering",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Textural.Blistering",
																			"xid": "Textural"
																		},
																		"t": "Blistering"
																	},
																	{
																		"n": "BR"
																	},
																	{
																		"n": "INPUT",
																		"id": "Textural.Bugholes",
																		"a": {
																			"no": "55",
																			"type": "checkbox",
																			"name": "Textural_Bugholes",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Textural.Bugholes",
																			"xid": "Textural"
																		},
																		"t": "Bugholes"
																	},
																	{
																		"n": "BR"
																	},
																	{
																		"n": "INPUT",
																		"id": "Textural.ColdJoints",
																		"a": {
																			"no": "56",
																			"type": "checkbox",
																			"name": "Textural_ColdJoints",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Textural.ColdJoints",
																			"xid": "Textural"
																		},
																		"t": "Cold joint"
																	},
																	{
																		"n": "BR"
																	},
																	{
																		"n": "INPUT",
																		"id": "Textural.ColdLines",
																		"a": {
																			"no": "57",
																			"type": "checkbox",
																			"name": "Textural_ColdLines",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Textural.ColdLines",
																			"xid": "Textural"
																		},
																		"t": "Cold-joint lines"
																	},
																	{
																		"n": "BR"
																	},
																	{
																		"n": "INPUT",
																		"id": "Textural.Discoloration",
																		"a": {
																			"no": "58",
																			"type": "checkbox",
																			"name": "Textural_Discoloration",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Textural.Discoloration",
																			"xid": "Textural"
																		},
																		"t": "Discoloration"
																	},
																	{
																		"n": "BR"
																	},
																	{
																		"n": "INPUT",
																		"id": "Textural.Honeycomb",
																		"a": {
																			"no": "59",
																			"type": "checkbox",
																			"name": "Textural_Honeycomb",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Textural.Honeycomb",
																			"xid": "Textural"
																		},
																		"t": "Honeycomb"
																	},
																	{
																		"n": "BR"
																	},
																	{
																		"n": "INPUT",
																		"id": "Textural.Incrustation",
																		"a": {
																			"no": "60",
																			"type": "checkbox",
																			"name": "Textural_Incrustation",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Textural.Incrustation",
																			"xid": "Textural"
																		},
																		"t": "Incrustation"
																	},
																	{
																		"n": "BR"
																	},
																	{
																		"n": "INPUT",
																		"id": "Textural.Laitance",
																		"a": {
																			"no": "61",
																			"type": "checkbox",
																			"name": "Textural_Laitance",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Textural.Laitance",
																			"xid": "Textural"
																		},
																		"t": "Laitance"
																	},
																	{
																		"n": "BR"
																	},
																	{
																		"n": "INPUT",
																		"id": "Textural.SandPocket",
																		"a": {
																			"no": "62",
																			"type": "checkbox",
																			"name": "Textural_SandPocket",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Textural.SandPocket",
																			"xid": "Textural"
																		},
																		"t": "Sand pocket"
																	},
																	{
																		"n": "BR"
																	},
																	{
																		"n": "INPUT",
																		"id": "Textural.SandStreak",
																		"a": {
																			"no": "63",
																			"type": "checkbox",
																			"name": "Textural_SandStreak",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Textural.SandStreak",
																			"xid": "Textural"
																		},
																		"t": "Sand streak"
																	},
																	{
																		"n": "BR"
																	},
																	{
																		"n": "INPUT",
																		"id": "Textural.Segregation",
																		"a": {
																			"no": "64",
																			"type": "checkbox",
																			"name": "Textural_Segregation",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Textural.Segregation",
																			"xid": "Textural"
																		},
																		"t": "Segregation"
																	},
																	{
																		"n": "BR"
																	},
																	{
																		"n": "INPUT",
																		"id": "Textural.Staining",
																		"a": {
																			"no": "65",
																			"type": "checkbox",
																			"name": "Textural_Staining",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Textural.Staining",
																			"xid": "Textural"
																		},
																		"t": "Staining"
																	},
																	{
																		"n": "BR"
																	},
																	{
																		"n": "INPUT",
																		"id": "Textural.Stalactite",
																		"a": {
																			"no": "66",
																			"type": "checkbox",
																			"name": "Textural_Stalactite",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Textural.Stalactite",
																			"xid": "Textural"
																		},
																		"t": "Stalactite"
																	},
																	{
																		"n": "BR"
																	},
																	{
																		"n": "INPUT",
																		"id": "Textural.Stalagmite",
																		"a": {
																			"no": "67",
																			"type": "checkbox",
																			"name": "Textural_Stalagmite",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Textural.Stalagmite",
																			"xid": "Textural"
																		},
																		"t": "Stalagmite"
																	},
																	{
																		"n": "BR"
																	},
																	{
																		"n": "INPUT",
																		"id": "Textural.Stratification",
																		"a": {
																			"no": "68",
																			"type": "checkbox",
																			"name": "Textural_Stratification",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Textural.Stratification",
																			"xid": "Textural"
																		},
																		"t": "Stratification"
																	}
																]
															}
														]
													},
													{
														"n": "TR",
														"s": {
															"height": "64pt"
														},
														"c": [
															{
																"n": "TD",
																"a": {
																	"width": "147",
																	"colspan": "11",
																	"valign": "top"
																},
																"s": {
																	"width": "110.35pt",
																	"border-top": "none",
																	"border-right": "none",
																	"border-left": "none",
																	"border-image": "initial",
																	"border-bottom": "1pt solid black",
																	"padding": "0in 5.4pt",
																	"height": "64pt"
																},
																"c": [
																	{
																		"n": "INPUT",
																		"id": "Distresses.Chalking",
																		"a": {
																			"no": "69",
																			"type": "checkbox",
																			"name": "Distresses_Chalking",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Distresses.Chalking",
																			"xid": "Distresses"
																		},
																		"t": "Chalking"
																	},
																	{
																		"n": "BR"
																	},
																	{
																		"n": "INPUT",
																		"id": "Distresses.Deflection",
																		"a": {
																			"no": "70",
																			"type": "checkbox",
																			"name": "Distresses_Deflection",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Distresses.Deflection",
																			"xid": "Distresses"
																		},
																		"t": "Deflection"
																	},
																	{
																		"n": "BR"
																	},
																	{
																		"n": "INPUT",
																		"id": "Distresses.Delamination",
																		"a": {
																			"no": "71",
																			"type": "checkbox",
																			"name": "Distresses_Delamination",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Distresses.Delamination",
																			"xid": "Distresses"
																		},
																		"t": "Delamination"
																	},
																	{
																		"n": "BR"
																	},
																	{
																		"n": "INPUT",
																		"id": "Distresses.Distortion",
																		"a": {
																			"no": "72",
																			"type": "checkbox",
																			"name": "Distresses_Distortion",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Distresses.Distortion",
																			"xid": "Distresses"
																		},
																		"t": "Distortion"
																	},
																	{
																		"n": "BR"
																	},
																	{
																		"n": "INPUT",
																		"id": "Distresses.Dusting",
																		"a": {
																			"no": "73",
																			"type": "checkbox",
																			"name": "Distresses_Dusting",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Distresses.Dusting",
																			"xid": "Distresses"
																		},
																		"t": "Dusting"
																	},
																	{
																		"n": "BR"
																	},
																	{
																		"n": "INPUT",
																		"id": "Distresses.Exfoliation",
																		"a": {
																			"no": "74",
																			"type": "checkbox",
																			"name": "Distresses_Exfoliation",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Distresses.Exfoliation",
																			"xid": "Distresses"
																		},
																		"t": "Exfoliation"
																	},
																	{
																		"n": "BR"
																	},
																	{
																		"n": "INPUT",
																		"id": "Distresses.Leakage",
																		"a": {
																			"no": "75",
																			"type": "checkbox",
																			"name": "Distresses_Leakage",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Distresses.Leakage",
																			"xid": "Distresses"
																		},
																		"t": "Leakage"
																	},
																	{
																		"n": "BR"
																	},
																	{
																		"n": "INPUT",
																		"id": "Distresses.Peeling",
																		"a": {
																			"no": "76",
																			"type": "checkbox",
																			"name": "Distresses_Peeling",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Distresses.Peeling",
																			"xid": "Distresses"
																		},
																		"t": "Peeling"
																	},
																	{
																		"n": "BR"
																	},
																	{
																		"n": "INPUT",
																		"id": "Distresses.Warping",
																		"a": {
																			"no": "77",
																			"type": "checkbox",
																			"name": "Distresses_Warping",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Distresses.Warping",
																			"xid": "Distresses"
																		},
																		"t": "Warping"
																	}
																]
															},
															{
																"n": "TD",
																"a": {
																	"width": "147",
																	"colspan": "9",
																	"valign": "top"
																},
																"s": {
																	"width": "110.5pt",
																	"border-top": "none",
																	"border-left": "none",
																	"border-bottom": "1pt solid black",
																	"border-right": "1pt solid black",
																	"padding": "0in 5.4pt",
																	"height": "64pt"
																},
																"c": [
																	{
																		"n": "INPUT",
																		"id": "Distresses.Curling",
																		"a": {
																			"no": "78",
																			"type": "checkbox",
																			"name": "Distresses_Curling",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Distresses.Curling",
																			"xid": "Distresses"
																		},
																		"t": "Curling"
																	},
																	{
																		"n": "INPUT",
																		"id": "Distresses.Deformation",
																		"a": {
																			"no": "79",
																			"type": "checkbox",
																			"name": "Distresses_Deformation",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Distresses.Deformation",
																			"xid": "Distresses"
																		},
																		"t": "Deformation"
																	},
																	{
																		"n": "INPUT",
																		"id": "Distresses.Disintegration",
																		"a": {
																			"no": "80",
																			"type": "checkbox",
																			"name": "Distresses_Disintegration",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Distresses.Disintegration",
																			"xid": "Distresses"
																		},
																		"t": "Disintegration"
																	},
																	{
																		"n": "INPUT",
																		"id": "Distresses.DrummyArea",
																		"a": {
																			"no": "81",
																			"type": "checkbox",
																			"name": "Distresses_DrummyArea",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Distresses.DrummyArea",
																			"xid": "Distresses"
																		},
																		"t": "Drummy\n					area"
																	},
																	{
																		"n": "INPUT",
																		"id": "Distresses.Efflorescence",
																		"a": {
																			"no": "82",
																			"type": "checkbox",
																			"name": "Distresses_Efflorescence",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Distresses.Efflorescence",
																			"xid": "Distresses"
																		},
																		"t": "Efflorescence"
																	},
																	{
																		"n": "INPUT",
																		"id": "Distresses.Exudation",
																		"a": {
																			"no": "83",
																			"type": "checkbox",
																			"name": "Distresses_Exudation",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Distresses.Exudation",
																			"xid": "Distresses"
																		},
																		"t": "Exudation"
																	},
																	{
																		"n": "INPUT",
																		"id": "Distresses.MortarFlaking",
																		"a": {
																			"no": "84",
																			"type": "checkbox",
																			"name": "Distresses_MortarFlaking",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Distresses.MortarFlaking",
																			"xid": "Distresses"
																		},
																		"t": "Mortar\n					flaking"
																	},
																	{
																		"n": "INPUT",
																		"id": "Distresses.Pitting",
																		"a": {
																			"no": "85",
																			"type": "checkbox",
																			"name": "Distresses_Pitting",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Distresses.Pitting",
																			"xid": "Distresses"
																		},
																		"t": "Pitting"
																	},
																	{
																		"n": "SPAN",
																		"s": {
																			"font-family": "\"Times New Roman\", serif"
																		}
																	}
																]
															}
														]
													},
													{
														"n": "TR",
														"s": {
															"height": "0.25in"
														},
														"c": [
															{
																"n": "TD",
																"a": {
																	"width": "294",
																	"colspan": "20",
																	"valign": "top"
																},
																"s": {
																	"width": "220.85pt",
																	"border-top": "none",
																	"border-bottom": "none",
																	"border-left": "none",
																	"border-image": "initial",
																	"border-right": "1pt solid black"
																},
																"c": [
																	{
																		"n": "SCRIPT",
																		"t": "\n						function onChangeJointDefi(evt){\n							var x,t=evt.target||event.srcElement\n									,a=document.getElementsByClassName('JointDeficiencies')\n									,h=t.checked,n,old=t.old;\n							if(!old)old=t.old={}\n							//x.style.backgroundColor=h?'':'lightgray';x.readOnly=!h;\n							for(var i=0;i< a.length;i++)\n							{x=a[i];n=x.name;x.disabled=!h;\n								x.style.backgroundColor=h?'':'lightgray';\n								if(h)x.checked=old[n];\n								else{old[n]=x.checked;x.checked=false;}\n							}}\n					"
																	},
																	{
																		"n": "INPUT",
																		"id": "Joint Deficiencies",
																		"a": {
																			"no": "86",
																			"type": "checkbox",
																			"name": "JointDeficiencies",
																			"onchange": "onChangeJointDefi(event)",
																			"class": "switch data"
																		},
																		"s": {
																			"opacity": "1"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Joint Deficiencies"
																		},
																		"s": {
																			"margin-left": "5px",
																			"position": "static",
																			"height": "0px",
																			"padding-top": "1px",
																			"padding-bottom": "1px",
																			"margin-bottom": "1px"
																		},
																		"t": "Joint deficiencies"
																	}
																]
															}
														]
													},
													{
														"n": "TR",
														"s": {
															"height": "0.25in"
														},
														"c": [
															{
																"n": "TD",
																"a": {
																	"width": "123",
																	"colspan": "7",
																	"valign": "top"
																},
																"s": {
																	"width": "92.2pt",
																	"border": "none",
																	"padding": "0in 5.4pt",
																	"height": "0.25in"
																},
																"c": [
																	{
																		"n": "INPUT",
																		"id": "Spall",
																		"a": {
																			"no": "87",
																			"type": "checkbox",
																			"class": "JointDeficiencies data",
																			"name": "Spall"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Spall"
																		},
																		"t": "Spall"
																	}
																]
															},
															{
																"n": "TD",
																"a": {
																	"width": "172",
																	"colspan": "13",
																	"valign": "top"
																},
																"s": {
																	"width": "128.65pt",
																	"border-top": "none",
																	"border-bottom": "none",
																	"border-left": "none",
																	"border-image": "initial",
																	"border-right": "1pt solid black",
																	"padding": "0in 5.4pt",
																	"height": "0.25in"
																},
																"c": [
																	{
																		"n": "INPUT",
																		"id": "SealantFailure",
																		"a": {
																			"no": "88",
																			"type": "checkbox",
																			"class": "JointDeficiencies data",
																			"name": "SealantFailure"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "SealantFailure"
																		},
																		"t": "Sealant failure"
																	}
																]
															}
														]
													},
													{
														"n": "TR",
														"s": {
															"height": "0.25in"
														},
														"c": [
															{
																"n": "TD",
																"a": {
																	"width": "123",
																	"colspan": "7",
																	"valign": "top"
																},
																"s": {
																	"width": "92.2pt",
																	"border-top": "none",
																	"border-right": "none",
																	"border-left": "none",
																	"border-image": "initial",
																	"border-bottom": "1pt solid black",
																	"padding": "0in 5.4pt",
																	"height": "0.25in"
																},
																"c": [
																	{
																		"n": "INPUT",
																		"id": "Leakage",
																		"a": {
																			"no": "89",
																			"type": "checkbox",
																			"class": "JointDeficiencies data",
																			"name": "Leakage"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Leakage"
																		},
																		"t": "Leakage"
																	}
																]
															},
															{
																"n": "TD",
																"a": {
																	"width": "172",
																	"colspan": "13",
																	"valign": "top"
																},
																"s": {
																	"width": "128.65pt",
																	"border-top": "none",
																	"border-left": "none",
																	"border-bottom": "1pt solid black",
																	"border-right": "1pt solid black",
																	"padding": "0in 5.4pt",
																	"height": "0.25in"
																},
																"c": [
																	{
																		"n": "INPUT",
																		"id": "Fault",
																		"a": {
																			"no": "90",
																			"type": "checkbox",
																			"class": "JointDeficiencies data",
																			"name": "Fault"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Fault"
																		},
																		"t": "Fault"
																	}
																]
															}
														]
													},
													{
														"n": "TR",
														"s": {
															"height": "16.6pt"
														},
														"c": [
															{
																"n": "TD",
																"a": {
																	"width": "294",
																	"colspan": "20",
																	"valign": "top"
																},
																"s": {
																	"width": "220.85pt",
																	"border-top": "none",
																	"border-bottom": "none",
																	"border-left": "none",
																	"border-image": "initial",
																	"border-right": "1pt solid black",
																	"padding": "30px 5.4pt 0in"
																},
																"c": [
																	{
																		"n": "SCRIPT",
																		"t": "\n						function onChangePopout(evt){\n							var x,t=evt.target||event.srcElement\n									,a=document.getElementsByName('PopoutSize')\n									,h=t.checked,n;\n							//x.style.backgroundColor=h?'':'lightgray';x.readOnly=!h;\n							for(var i=0;i< a.length;i++)\n							{x=a[i];n=x.name;x.disabled=x.readOnly=!h;\n								x.style.backgroundColor=h?'':'lightgray';\n								if(h)x.checked=x.value==t.sz;\n								else{t.sz=x.checked?x.value:t.sz;x.checked=false;}\n							}}\n					"
																	},
																	{
																		"n": "INPUT",
																		"id": "Popout",
																		"a": {
																			"no": "91",
																			"type": "checkbox",
																			"name": "Popout",
																			"onchange": "onChangePopout(event)",
																			"class": "data switch"
																		}
																	},
																	{
																		"n": "STYLE",
																		"a": {
																			"class": "--apng-checked"
																		},
																		"t": "label:after{display:none}"
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Popout"
																		},
																		"s": {
																			"text-decoration": "none",
																			"color": "rgb(100, 100, 100)",
																			"cursor": "pointer",
																			"display": "inline-block",
																			"font-size": "1em",
																			"font-weight": "400",
																			"padding-left": "2.4em",
																			"padding-right": "0.75em",
																			"position": "relative"
																		},
																		"t": "Popout"
																	},
																	{
																		"n": "STYLE",
																		"a": {
																			"class": "--apng-checked"
																		},
																		"t": "label:after{position:inherit;display:inherit}"
																	}
																]
															}
														]
													},
													{
														"n": "TR",
														"s": {
															"height": "12pt"
														},
														"c": [
															{
																"n": "TD",
																"a": {
																	"width": "98",
																	"colspan": "5",
																	"valign": "top"
																},
																"s": {
																	"width": "73.5pt",
																	"border-top": "none",
																	"border-right": "none",
																	"border-left": "none",
																	"border-image": "initial",
																	"border-bottom": "1pt solid black",
																	"padding": "0in 5.4pt",
																	"height": "12pt"
																},
																"c": [
																	{
																		"n": "INPUT",
																		"id": "PopoutSize1",
																		"a": {
																			"no": "92",
																			"name": "PopoutSize",
																			"type": "radio",
																			"value": "1",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "PopoutSize1"
																		},
																		"t": "Small"
																	}
																]
															},
															{
																"n": "TD",
																"a": {
																	"width": "98",
																	"colspan": "8",
																	"valign": "top"
																},
																"s": {
																	"width": "73.5pt",
																	"border-top": "none",
																	"border-right": "none",
																	"border-left": "none",
																	"border-image": "initial",
																	"border-bottom": "1pt solid black",
																	"padding": "0in 5.4pt",
																	"height": "12pt"
																},
																"c": [
																	{
																		"n": "INPUT",
																		"id": "PopoutSize2",
																		"a": {
																			"no": "93",
																			"name": "PopoutSize",
																			"type": "radio",
																			"value": "2",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "PopoutSize2"
																		},
																		"t": "Medium"
																	}
																]
															},
															{
																"n": "TD",
																"a": {
																	"width": "98",
																	"colspan": "7",
																	"valign": "top"
																},
																"s": {
																	"width": "73.85pt",
																	"border-top": "none",
																	"border-left": "none",
																	"border-bottom": "1pt solid black",
																	"border-right": "1pt solid black",
																	"padding": "0in 5.4pt",
																	"height": "12pt"
																},
																"c": [
																	{
																		"n": "INPUT",
																		"id": "PopoutSize",
																		"a": {
																			"no": "94",
																			"name": "PopoutSize",
																			"type": "radio",
																			"value": "3",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "PopoutSize"
																		},
																		"t": "large"
																	}
																]
															}
														]
													},
													{
														"n": "TR",
														"s": {
															"height": "12pt"
														},
														"c": [
															{
																"n": "TD",
																"a": {
																	"width": "294",
																	"colspan": "20",
																	"valign": "top"
																},
																"s": {
																	"width": "220.85pt",
																	"border-top": "none",
																	"border-bottom": "none",
																	"border-left": "none",
																	"border-image": "initial",
																	"border-right": "1pt solid black",
																	"padding": "0in 5.4pt",
																	"height": "12pt"
																},
																"c": [
																	{
																		"n": "SCRIPT",
																		"t": "\n						function onChangeScaling(evt){\n							var x,t=evt.target||event.srcElement\n									,a=document.getElementsByName('Scaling')\n									,h=t.checked,n;\n							//x.style.backgroundColor=h?'':'lightgray';x.readOnly=!h;\n							for(var i=0;i< a.length;i++)\n							{x=a[i];n=x.name;x.disabled=x.readOnly=!h;\n								x.style.backgroundColor=h?'':'lightgray';\n								if(h)x.checked=x.value==t.sz;\n								else{t.sz=x.checked?x.value:t.sz;x.checked=false;}\n							}}\n\n					"
																	},
																	{
																		"n": "INPUT",
																		"id": "isScaling",
																		"a": {
																			"no": "95",
																			"type": "checkbox",
																			"name": "isScaling",
																			"onchange": "onChangeScaling(event)",
																			"class": "data switch"
																		}
																	},
																	{
																		"n": "STYLE",
																		"a": {
																			"class": "--apng-checked"
																		},
																		"t": "label:after{display:none}"
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "isScaling"
																		},
																		"s": {
																			"text-decoration": "none",
																			"color": "rgb(100, 100, 100)",
																			"cursor": "pointer",
																			"display": "inline-block",
																			"font-size": "1em",
																			"font-weight": "400",
																			"padding-left": "2.4em",
																			"padding-right": "0.75em",
																			"position": "relative"
																		},
																		"t": "Scaling"
																	},
																	{
																		"n": "STYLE",
																		"a": {
																			"class": "--apng-checked"
																		},
																		"t": "label:after{position:inherit;display:inherit}"
																	}
																]
															}
														]
													},
													{
														"n": "TR",
														"s": {
															"height": "12pt"
														},
														"c": [
															{
																"n": "TD",
																"a": {
																	"width": "147",
																	"colspan": "11",
																	"valign": "top"
																},
																"s": {
																	"width": "110.35pt",
																	"border": "none",
																	"padding": "0in 5.4pt",
																	"height": "12pt"
																},
																"c": [
																	{
																		"n": "INPUT",
																		"id": "Scaling1",
																		"a": {
																			"no": "96",
																			"name": "Scaling",
																			"type": "radio",
																			"value": "1",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Scaling1"
																		},
																		"t": "Light"
																	}
																]
															},
															{
																"n": "TD",
																"a": {
																	"width": "147",
																	"colspan": "9",
																	"valign": "top"
																},
																"s": {
																	"width": "110.5pt",
																	"border-top": "none",
																	"border-bottom": "none",
																	"border-left": "none",
																	"border-image": "initial",
																	"border-right": "1pt solid black",
																	"padding": "0in 5.4pt",
																	"height": "12pt"
																},
																"c": [
																	{
																		"n": "INPUT",
																		"id": "Scaling2",
																		"a": {
																			"no": "97",
																			"name": "Scaling",
																			"type": "radio",
																			"value": "2",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Scaling2"
																		},
																		"t": "Medium"
																	}
																]
															}
														]
													},
													{
														"n": "TR",
														"s": {
															"height": "8.75pt"
														},
														"c": [
															{
																"n": "TD",
																"a": {
																	"width": "147",
																	"colspan": "11",
																	"valign": "top"
																},
																"s": {
																	"width": "110.35pt",
																	"border": "none",
																	"padding": "0in 5.4pt",
																	"height": "8.75pt"
																},
																"c": [
																	{
																		"n": "INPUT",
																		"id": "Scaling3",
																		"a": {
																			"no": "98",
																			"name": "Scaling",
																			"type": "radio",
																			"value": "3",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Scaling3"
																		},
																		"t": "Severe"
																	}
																]
															},
															{
																"n": "TD",
																"a": {
																	"width": "147",
																	"colspan": "9",
																	"valign": "top"
																},
																"s": {
																	"width": "110.5pt",
																	"border-top": "none",
																	"border-bottom": "none",
																	"border-left": "none",
																	"border-image": "initial",
																	"border-right": "1pt solid black",
																	"padding": "0in 5.4pt",
																	"height": "8.75pt"
																},
																"c": [
																	{
																		"n": "INPUT",
																		"id": "Scaling4",
																		"a": {
																			"no": "99",
																			"name": "Scaling",
																			"type": "radio",
																			"value": "4",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Scaling4"
																		},
																		"t": "Very severe"
																	}
																]
															},
															{
																"n": "TD",
																"a": {
																	"width": "156",
																	"colspan": "4",
																	"rowspan": "4",
																	"valign": "top"
																},
																"s": {
																	"width": "117.3pt",
																	"border-top": "none",
																	"border-left": "none",
																	"border-bottom": "1pt solid black",
																	"border-right": "1pt solid black",
																	"padding": "0in 5.4pt",
																	"height": "8.75pt"
																},
																"c": [
																	{
																		"n": "B",
																		"c": [
																			{
																				"n": "U",
																				"c": [
																					{
																						"n": "SPAN",
																						"s": {
																							"font-family": "\"Times New Roman\", serif"
																						},
																						"t": "Reinforcement"
																					}
																				]
																			}
																		]
																	},
																	{
																		"n": "BR"
																	},
																	{
																		"n": "INPUT",
																		"id": "Exposed",
																		"a": {
																			"no": "100",
																			"type": "checkbox",
																			"name": "Exposed",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Exposed",
																			"xid": "TypeofMember"
																		},
																		"t": "Exposed"
																	},
																	{
																		"n": "BR"
																	},
																	{
																		"n": "INPUT",
																		"id": "Corroded",
																		"a": {
																			"no": "101",
																			"type": "checkbox",
																			"name": "Corroded",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Corroded",
																			"xid": "TypeofMember"
																		},
																		"t": "Corroded"
																	},
																	{
																		"n": "BR"
																	},
																	{
																		"n": "INPUT",
																		"id": "Snapped",
																		"a": {
																			"no": "102",
																			"type": "checkbox",
																			"name": "Snapped",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "Snapped",
																			"xid": "TypeofMember"
																		},
																		"t": "Snapped"
																	}
																]
															}
														]
													},
													{
														"n": "TR",
														"s": {
															"height": "8.75pt"
														},
														"c": [
															{
																"n": "TD",
																"a": {
																	"width": "147",
																	"colspan": "11",
																	"valign": "top"
																},
																"s": {
																	"width": "110.35pt",
																	"border-top": "none",
																	"border-right": "none",
																	"border-left": "none",
																	"border-image": "initial",
																	"border-bottom": "1pt solid black",
																	"padding": "0in 5.4pt",
																	"height": "8.75pt"
																},
																"c": [
																	{
																		"n": "SPAN",
																		"s": {
																			"font-family": "\"Times New Roman\", serif"
																		}
																	}
																]
															},
															{
																"n": "TD",
																"a": {
																	"width": "147",
																	"colspan": "9",
																	"valign": "top"
																},
																"s": {
																	"width": "110.5pt",
																	"border-top": "none",
																	"border-left": "none",
																	"border-bottom": "1pt solid black",
																	"border-right": "1pt solid black",
																	"padding": "0in 5.4pt",
																	"height": "8.75pt"
																},
																"c": [
																	{
																		"n": "SPAN",
																		"s": {
																			"font-family": "\"Times New Roman\", serif"
																		}
																	}
																]
															}
														]
													},
													{
														"n": "TR",
														"s": {
															"height": "7pt"
														},
														"c": [
															{
																"n": "TD",
																"a": {
																	"width": "294",
																	"colspan": "20",
																	"valign": "top"
																},
																"s": {
																	"width": "220.85pt",
																	"border-top": "none",
																	"border-bottom": "none",
																	"border-left": "none",
																	"border-image": "initial",
																	"border-right": "1pt solid black",
																	"padding": "0in 5.4pt",
																	"height": "7pt"
																},
																"c": [
																	{
																		"n": "SCRIPT",
																		"t": "\n					function onChangeSpall(evt){\n						var x,t=evt.target||event.srcElement\n								,a=document.getElementsByName('SpallSize')\n								,h=t.checked,n;\n						//x.style.backgroundColor=h?'':'lightgray';x.readOnly=!h;\n						for(var i=0;i< a.length;i++)\n						{x=a[i];n=x.name;x.disabled=x.readOnly=!h;\n							x.style.backgroundColor=h?'':'lightgray';\n							if(h)x.checked=x.value==t.sz;\n							else{t.sz=x.checked?x.value:t.sz;x.checked=false;}\n						}}\n\n				"
																	},
																	{
																		"n": "INPUT",
																		"id": "isSpall",
																		"a": {
																			"no": "103",
																			"type": "checkbox",
																			"name": "isSpall",
																			"onchange": "onChangeSpall(event)",
																			"class": "data switch"
																		}
																	},
																	{
																		"n": "STYLE",
																		"a": {
																			"class": "--apng-checked"
																		},
																		"t": "label:after{display:none}"
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "isSpall"
																		},
																		"s": {
																			"text-decoration": "none",
																			"color": "rgb(100, 100, 100)",
																			"cursor": "pointer",
																			"display": "inline-block",
																			"font-size": "1em",
																			"font-weight": "400",
																			"padding-left": "2.4em",
																			"padding-right": "0.75em",
																			"position": "relative"
																		},
																		"t": "Spall"
																	},
																	{
																		"n": "STYLE",
																		"a": {
																			"class": "--apng-checked"
																		},
																		"t": "label:after{position:inherit;display:inherit}"
																	}
																]
															}
														]
													},
													{
														"n": "TR",
														"s": {
															"height": "17.5pt"
														},
														"c": [
															{
																"n": "TD",
																"a": {
																	"width": "145",
																	"colspan": "10",
																	"valign": "top"
																},
																"s": {
																	"width": "108.45pt",
																	"border": "none",
																	"padding": "0in 5.4pt",
																	"height": "17.5pt"
																},
																"c": [
																	{
																		"n": "INPUT",
																		"id": "SpallSize1",
																		"a": {
																			"no": "104",
																			"name": "SpallSize",
																			"type": "radio",
																			"value": "1",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "SpallSize1"
																		},
																		"t": "Small"
																	}
																]
															},
															{
																"n": "TD",
																"a": {
																	"width": "150",
																	"colspan": "10",
																	"valign": "top"
																},
																"s": {
																	"width": "112.4pt",
																	"border-top": "none",
																	"border-bottom": "none",
																	"border-left": "none",
																	"border-image": "initial",
																	"border-right": "1pt solid black",
																	"padding": "0in 5.4pt",
																	"height": "17.5pt"
																},
																"c": [
																	{
																		"n": "INPUT",
																		"id": "SpallSize2",
																		"a": {
																			"no": "105",
																			"name": "SpallSize",
																			"type": "radio",
																			"value": "2",
																			"class": "data"
																		}
																	},
																	{
																		"n": "LABEL",
																		"a": {
																			"for": "SpallSize2"
																		},
																		"t": "Large"
																	}
																]
															}
														]
													},
													{
														"n": "TR",
														"s": {
															"height": "53.5pt"
														},
														"c": [
															{
																"n": "TD",
																"a": {
																	"width": "601",
																	"colspan": "28",
																	"valign": "top"
																},
																"s": {
																	"width": "450.9pt",
																	"border-right": "1pt solid black",
																	"border-bottom": "1pt solid black",
																	"border-left": "1pt solid black",
																	"border-image": "initial",
																	"border-top": "none",
																	"padding": "0in 5.4pt",
																	"height": "53.5pt"
																},
																"c": [
																	{
																		"n": "B",
																		"c": [
																			{
																				"n": "U",
																				"c": [
																					{
																						"n": "SPAN",
																						"s": {
																							"font-family": "\"Times New Roman\", serif"
																						},
																						"t": "Notes:"
																					}
																				]
																			}
																		]
																	},
																	{
																		"n": "TEXTAREA",
																		"a": {
																			"no": "107",
																			"name": "notes",
																			"class": "data"
																		},
																		"s": {
																			"width": "95%"
																		}
																	}
																]
															}
														]
													},
													{
														"n": "TR",
														"a": {
															"height": "0"
														},
														"c": [
															{
																"n": "TD",
																"a": {
																	"width": "73"
																},
																"s": {
																	"border": "none"
																}
															},
															{
																"n": "TD",
																"a": {
																	"width": "18"
																},
																"s": {
																	"border": "none"
																}
															},
															{
																"n": "TD",
																"a": {
																	"width": "24"
																},
																"s": {
																	"border": "none"
																}
															},
															{
																"n": "TD",
																"a": {
																	"width": "24"
																},
																"s": {
																	"border": "none"
																}
															},
															{
																"n": "TD",
																"a": {
																	"width": "66"
																},
																"s": {
																	"border": "none"
																}
															},
															{
																"n": "TD",
																"a": {
																	"width": "8"
																},
																"s": {
																	"border": "none"
																}
															},
															{
																"n": "TD",
																"a": {
																	"width": "4"
																},
																"s": {
																	"border": "none"
																}
															},
															{
																"n": "TD",
																"a": {
																	"width": "17"
																},
																"s": {
																	"border": "none"
																}
															},
															{
																"n": "TD",
																"a": {
																	"width": "25"
																},
																"s": {
																	"border": "none"
																}
															},
															{
																"n": "TD",
																"a": {
																	"width": "1"
																},
																"s": {
																	"border": "none"
																}
															},
															{
																"n": "TD",
																"a": {
																	"width": "27"
																},
																"s": {
																	"border": "none"
																}
															},
															{
																"n": "TD",
																"a": {
																	"width": "4"
																},
																"s": {
																	"border": "none"
																}
															},
															{
																"n": "TD",
																"a": {
																	"width": "11"
																},
																"s": {
																	"border": "none"
																}
															},
															{
																"n": "TD",
																"a": {
																	"width": "6"
																},
																"s": {
																	"border": "none"
																}
															},
															{
																"n": "TD",
																"a": {
																	"width": "3"
																},
																"s": {
																	"border": "none"
																}
															},
															{
																"n": "TD",
																"a": {
																	"width": "15"
																},
																"s": {
																	"border": "none"
																}
															},
															{
																"n": "TD",
																"a": {
																	"width": "34"
																},
																"s": {
																	"border": "none"
																}
															},
															{
																"n": "TD",
																"a": {
																	"width": "3"
																},
																"s": {
																	"border": "none"
																}
															},
															{
																"n": "TD",
																"a": {
																	"width": "11"
																},
																"s": {
																	"border": "none"
																}
															},
															{
																"n": "TD",
																"a": {
																	"width": "52"
																},
																"s": {
																	"border": "none"
																}
															},
															{
																"n": "TD",
																"a": {
																	"width": "14"
																},
																"s": {
																	"border": "none"
																}
															},
															{
																"n": "TD",
																"a": {
																	"width": "7"
																},
																"s": {
																	"border": "none"
																}
															},
															{
																"n": "TD",
																"a": {
																	"width": "4"
																},
																"s": {
																	"border": "none"
																}
															},
															{
																"n": "TD",
																"a": {
																	"width": "8"
																},
																"s": {
																	"border": "none"
																}
															},
															{
																"n": "TD",
																"a": {
																	"width": "24"
																},
																"s": {
																	"border": "none"
																}
															},
															{
																"n": "TD",
																"a": {
																	"width": "15"
																},
																"s": {
																	"border": "none"
																}
															},
															{
																"n": "TD",
																"a": {
																	"width": "3"
																},
																"s": {
																	"border": "none"
																}
															},
															{
																"n": "TD",
																"a": {
																	"width": "98"
																},
																"s": {
																	"border": "none"
																}
															}
														]
													}
												]
											}
										]
									},
									{
										"n": "INPUT",
										"a": {
											"type": "button",
											"onclick": "location='?screen=Sheet&sheetNo=&flrNo=&bldNo=&projNo='",
											"value": "Previous"
										}
									},
									{
										"n": "INPUT",
										"a": {
											"type": "button",
											"onclick": "location='?screen=FloorScreen&op=deleteSheet&sheetNo='",
											"value": "Delete"
										}
									},
									{
										"n": "INPUT",
										"a": {
											"type": "button",
											"onclick": "location='?screen=Sheet&op=newSheet&flrNo=&bldNo=&projNo='",
											"value": "New"
										}
									},
									{
										"n": "INPUT",
										"a": {
											"type": "button",
											"onclick": "location='?screen=Sheet&sheetNo=&flrNo=&bldNo=&projNo='",
											"value": "Next"
										}
									},
									{
										"n": "FORM",
										"a": {
											"action": "index.jsp?version=2016/05/31",
											"method": "post",
											"onsubmit": "onSbmt",
											"enctype": "multipart/form-data"
										},
										"c": [
											{
												"n": "INPUT",
												"a": {
													"type": "file",
													"name": "img1",
													"accept": "image/*;capture=camera",
													"class": "data"
												}
											},
											{
												"n": "IMG",
												"id": "img1",
												"a": {
													"src": "/eu059sUploads/1/2/2/4/image.jpg"
												},
												"s": {
													"width": "95%"
												}
											},
											{
												"n": "HR"
											},
											{
												"n": "INPUT",
												"a": {
													"type": "file",
													"name": "img2",
													"accept": "image/*;capture=camera",
													"class": "data"
												}
											},
											{
												"n": "IMG",
												"id": "img2",
												"s": {
													"width": "95%"
												}
											},
											{
												"n": "HR"
											},
											{
												"n": "INPUT",
												"a": {
													"type": "file",
													"name": "img3",
													"accept": "image/*;capture=camera",
													"class": "data"
												}
											},
											{
												"n": "IMG",
												"id": "img3",
												"s": {
													"width": "95%"
												}
											},
											{
												"n": "HR"
											},
											{
												"n": "INPUT",
												"a": {
													"type": "file",
													"name": "img4",
													"accept": "image/*;capture=camera",
													"class": "data"
												}
											},
											{
												"n": "IMG",
												"id": "img4",
												"s": {
													"width": "95%"
												}
											},
											{
												"n": "HR"
											},
											{
												"n": "INPUT",
												"a": {
													"type": "hidden",
													"name": "op",
													"value": "saveSheet"
												}
											},
											{
												"n": "INPUT",
												"id": "hiddenSheetData",
												"a": {
													"type": "hidden",
													"name": "json",
													"value": ""
												}
											},
											{
												"n": "INPUT",
												"a": {
													"type": "submit",
													"value": "Save",
													"onclick": "onSbmt(event)"
												}
											}
										]
									},
									{
										"n": "SCRIPT",
										"t": "\n\n			window.onSbmt=\n					function onSbmt(){\n						var t=document.getElementById('hiddenSheetData')\n								,sd=sheetData()\n								,s=JSON.stringify(sd);\n						t.value=s;\n						return true;\n					}\n\n			window.sdata=\n					function sdata(t,r){\n						var n=t.name,c=t.checked,v=t.value,y=t.type // ,m=t.nodeName\n								,h=y=='checkbox'?1:y=='radio'?2:0 , z=h==1?c:(h==2)?(c?v:false):v //, no=t.no||t.getAttribute('no')\n						//,x={name:n , value:z , no:no }; //, checked:c , value:v , type:y , z:z\n						if(r){r.columns.push(z);\n							//if(!r[n] || !r[n].value )\n							r[n]=h==2?(c?z:r[n]||false):z //x\n						}return z // x;\n					}\n\n			window.sheetData=\n					function sheetData(){//generateData\n						var r={columns:[]},a=document.getElementsByClassName('data');\n						for(var i=0;i<a.length;i++){\n							var t=a[i];\n							sdata(t,r)\n						}//for\n						return r;\n					}\n\n			window.chng=\n					function chng(evt){\n						var src=evt.target||event.src , sd=sdata(src);\n						console.log( sd , evt, src )\n					}\n\n			window.initData=\n					function initData(){\n						var a=document.getElementsByClassName('data');\n						for(var i=0;i<a.length;i++){\n							var t=a[i],x=t.onchange;\n							if(x){\n								if(!t.chng)\n									t.chng=[x,chng];\n								else\n									t.chng.push(chng);\n								t.onchange=function(evt){\n									var t=evt.target||event.src,a=t.chng;\n									for(var i=0;i<a.length;i++)\n										a[i](evt);\n								}\n							}\n							else\n								t.onchange=chng;\n						}\n					}\n\n			window.setFormData=/**\n\n			 sheet= java.app.sheet.toJson()\n\n			 sheet.json=java.tl.jo().clrSW().o(app.sheet.get()).toString()\n\n			 sheet.project={no: java.app.proj.no\n\t,title:java.tl.jo().clrSW().o(app.proj.json.get(\"title\")).toString()\n}\n\n			 sheet.building={no: java.app.bld.no\n\t,title: java.tl.jo().clrSW().o(app.bld.json.get(\"title\")).toString()\n}\n\n			 sheet.floor={no: java.app.flr.no\n\t,title: java.tl.jo().clrSW().o(ft).toString()\n}\n\n			 setFormData(sheet)\n\n			 */\n					function setFormData(sheet){if(!sheet || !sheet.json)return;\n				var a=document.getElementsByClassName('data'),t,n,d;try{\n					//if(!sheet.json.datetime)sheet.json.datetime=sheet.dt;\n					//if(!sheet.json.u.title)sheet.json.u.title=sheet.u;\n					//if(!sheet.json.no)sheet.json.no=sheet.no;\n				}catch(ex){}\n				for(var i=0;i<a.length;i++)try{\n					if((t=a[i]) && (n=t.name) && (d=sheet.json[n]||sheet[n])){\n						if(t.type=='checkbox' || t.type=='radio')\n						{\tif(t.type=='radio')\n						{\t//console.log('setFormData:debug radio-btn',t,n,d);\n							t.checked=(t.value==d)\n						}\n						else t.checked=d//.value\n							if(d && t.onchange)\n								t.onchange({target:t});\n						}\n						else if(t.type=='datetime-local'){\n							d=d?(d.value||d.str||d):d;//if(d.length>11) d=d.substring(0,11);\n							try{d=new Date(d);d=d.toISOString()}catch(ex){d=new Date();d=d.toISOString()}\n							if(d.length>23)d=d.substring(0,23)\n							t.value= d;\n						}else if(d.no!=undefined ){//|| sheet[n]\n							t[t.nodeName=='INPUT'?'value':'innerText']=d.title||d.no;\n							t.href+=d.no}\n						else\n							t.value=d?(d.value||d):d;\n\n						/*\n						 TODO: radio buttons , disabled by default\n						 TODO: class-switch and gray\n						 TODO: intp-text / text-area value instead of no\n						 TODO: <BR/> for right column radio-buttons\n\n						 TODO: table for project-lists\n						 TODO: table for buildings\n						 TODO: table for floors\n						 TODO: table for sheets\n						 TODO: cancel right menu, and reposition buttons\n						 TODO: user-management ,\n						 create user\n						 list users table, columns:\n						 user-name,\n						 email,\n						 tel,\n						 reset-password\n						 upload pic\n						 user-level ,drop-down-menu for setting (super, edit/supervisor, read-only, disabled)\n						 check user-level for features\n						 super\n						 the users-screen, list-users-table, create-user, edit user\n						 delete project/building/floor/sheet\n						 query/report\n						 view log\n						 config - definitions\n						 edit\n						 create/edit project/building/floor/sheet\n						 read-only\n						 list projects/buildings/floors/sheets\n						 view sheet\n						 search\n						 change password\n						 pipe-dream: user-groups\n						 */\n\n					}}catch(ex){\n					console.error('setFormData:i=',i,n,d,t,ex);}\n				for(var i=1;i<=4;i++)try\n				{var n='img'+i,j=0\n						,t=document.getElementById(n)\n						,x=sheet[n]||sheet.json[n]\n						,path=x?(x.fileName||x):x//,path=[x?(x.fileName||x):x,0];\n					if(x){\n\t\t\t\t\t\tt.src=path/*\n						path[1]=window.location.pathname\n						if(path[1])path[1]=path[1].split('/')\n						if(path[1]&& path[1].length>0){\n							//if(path[0].length>1){\n							//path=path[1];\n							path[0]=path[0].split('/');\n							while(j<path[1].length\n							&& j<path[0].length\n							&& path[1][j]!=path[0][j]\n									) j++;\n							function f1(a,i,j,c){\n								var r='',n=a.length;\n								while(i<=j && i<n)\n									r+=c+a[i++];\n								return r;}\n							//if(path[1][j]=='WebApplicationEU059S')\n							x=f1(path[j],0,j,'/')+'/'+f1(path[0],j,path[0].length-1,'/');\n							//}\n						}\n						t.src=x.fileName||x*/}\n\t\t\t\t\t\n				}catch(ex){\n					console.error('setFormData:img',i,':',ex);}\n				return;\n			}//setFormData\n			//initData();\n		"
									}
								]
							}
						]
					},
					{
						"n": "SCRIPT",
						"t": "\nsheet={\"name\":\"sheets\",\"no\":4,\"p\":1,\"b\":2,\"f\":2,\"u\":1,\"jsonRef\":4,\"dt\":{\"class\":\"Date\",\"time\":1471799069000,\"str\":\"2016-08-21 10:04:29.0\"}}\nsheet.json={\"TypeofMemberStairs\":false,\"Textural_Discoloration\":false,\"Cracking_D-cracks\":false,\"no\":4,\"Popout\":true,\"columns\":{\"35\":false,\"36\":false,\"33\":false,\"34\":true,\"39\":false,\"37\":false,\"38\":true,\"43\":false,\"42\":false,\"41\":false,\"40\":false,\"22\":false,\"23\":true,\"24\":false,\"25\":false,\"26\":false,\"27\":false,\"28\":false,\"29\":true,\"3\":\"[object Object]\",\"2\":\"2016-08-21T07:04:29.000\",\"1\":\"null\",\"0\":\"null\",\"30\":\"\",\"7\":\"null\",\"6\":\"4\",\"32\":false,\"5\":\"4\",\"4\":\"null\",\"31\":\"1\",\"9\":false,\"8\":true,\"19\":false,\"17\":\"\",\"18\":true,\"15\":true,\"16\":\"\",\"13\":false,\"14\":false,\"11\":false,\"12\":false,\"21\":false,\"20\":false,\"109\":\"C:\\\\fakepath\\\\image.jpg\",\"108\":\"\",\"107\":false,\"106\":\"1\",\"105\":true,\"104\":false,\"103\":false,\"99\":false,\"102\":true,\"101\":false,\"100\":false,\"98\":\"1\",\"97\":true,\"96\":false,\"95\":false,\"94\":\"1\",\"93\":true,\"92\":false,\"91\":false,\"90\":false,\"10\":false,\"88\":true,\"89\":true,\"79\":false,\"78\":false,\"77\":false,\"112\":\"\",\"110\":\"\",\"111\":\"\",\"82\":false,\"83\":false,\"80\":false,\"81\":false,\"86\":false,\"87\":false,\"84\":false,\"85\":false,\"67\":false,\"66\":false,\"69\":false,\"68\":false,\"70\":false,\"71\":true,\"72\":false,\"73\":false,\"74\":false,\"75\":false,\"76\":false,\"59\":false,\"58\":false,\"57\":false,\"56\":false,\"55\":true,\"64\":false,\"65\":false,\"62\":false,\"63\":false,\"60\":false,\"61\":false,\"49\":false,\"48\":false,\"45\":false,\"44\":false,\"47\":false,\"46\":false,\"51\":\"\",\"52\":false,\"53\":\"1\",\"54\":false,\"50\":false},\"exposure_heat\":false,\"Distress_Cracking\":true,\"Distresses_Deformation\":false,\"exposure_chemical\":false,\"TypeofMemberFoundation\":false,\"isSpall\":true,\"Distresses_MortarFlaking\":false,\"Cracking_Temperature\":false,\"Textural_Honeycomb\":false,\"Distress_Leaking\":false,\"img2\":\"\",\"img1\":{\"fileName\":\"/eu059sUploads/1/2/2/4/image.jpg\",\"contentType\":\"image/jpeg\",\"size\":1504241},\"TypeofMemberOtherText\":\"\",\"isScaling\":true,\"Distresses_Exfoliation\":false,\"Cracking_Plastic\":false,\"Corroded\":false,\"LoadingCondition_Vibration\":false,\"Textural_Segregation\":false,\"img3\":\"\",\"img4\":\"\",\"LoadingCondition_Traffic\":false,\"dt\":\"[object Object]\",\"Textural_Blistering\":false,\"TypeofMemberColunm\":false,\"Cracking_Craze\":false,\"Cracking_Shrinkage\":false,\"Cracking_Map\":false,\"Cracking_Pattern\":false,\"Distresses_Efflorescence\":false,\"LoadingCondition_Live\":false,\"Distresses_Warping\":false,\"LoadingConditionOther\":\"\",\"TypeofMemberRC\":false,\"Distresses_Delamination\":false,\"TypeofMemberMansory\":false,\"Spall\":true,\"datetime\":\"2016/08/21 10:04:29\",\"f\":2,\"b\":2,\"LoadingCondition_Dead\":true,\"Distresses_DrummyArea\":false,\"Cracking_Random\":false,\"u\":1,\"Snapped\":false,\"Distresses_Dusting\":false,\"p\":1,\"SpallSize\":\"1\",\"notes\":\"\",\"Textural_ColdJoints\":false,\"Fault\":false,\"TypeofMemberOther\":true,\"location\":\"\",\"Textural_Stalagmite\":false,\"Textural_Stratification\":false,\"TypeofMemberBeam\":true,\"JointDeficiencies\":true,\"Textural_Bugholes\":false,\"Cracking_Hairline\":false,\"Textural_SandStreak\":false,\"Distress_Staining\":false,\"Distresses_Pitting\":false,\"Textural_Incrustation\":false,\"TypeofMemberSlab\":false,\"exposure_wetDry\":true,\"Leakage\":false,\"Textural_Laitance\":false,\"Cracking_Transverse\":false,\"width\":\"\",\"Textural_ColdLines\":false,\"Distresses_Disintegration\":false,\"Distress_Surface\":false,\"Textural_Stalactite\":false,\"Cracking_Longitudinal\":false,\"Distresses_Exudation\":false,\"Distresses_Distortion\":false,\"Distresses_Peeling\":false,\"PopoutSize\":\"1\",\"exposure_elec\":false,\"Scaling\":\"1\",\"Cracking_Diagnol\":false,\"jsonRef\":4,\"GeneralCondition\":\"1\",\"LoadingCondition_Seismic\":false,\"SealantFailure\":false,\"Textural_SandPocket\":false,\"LoadingCondition_Other\":true,\"Distresses_Leakage\":false,\"Distresses_Deflection\":false,\"Textural_AirVoid\":true,\"LoadingCondition_Impact\":false,\"Textural_Staining\":false,\"Leaching\":false,\"Exposed\":true,\"Distresses_Curling\":false,\"Cracking_Checking\":true,\"WorkingOrDormant\":\"1\",\"exposure_erosion\":false,\"Distresses_Chalking\":true}\n\nsheet.json.p={no:1,title:\"Project Thu Aug 18 04:44:05 PDT 2016\"}\nsheet.json.b={no:2,title:\"Building Thu Aug 18 19:58:34 PDT 2016\"}\nsheet.json.f={no:2,title:\"Floor Thu Aug 18 19:58:52 PDT 2016\"}\nsheet.json.u={no:1,title:null}\nsetFormData(sheet)\n"
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
														"t": "Delete Sheet"
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
																	"value": "deleteSheet"
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