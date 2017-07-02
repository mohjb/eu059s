
	enum Prm{screen(Screen.class),op(Op.class)
		,projNo(Integer.class)
		,buildingNo(Integer.class)
		,floorNo(Integer.class)
		,sheetNo(Integer.class)
		,query(String.class)
		,entity(String.class)
		,pk(Integer.class),v(Map.class)
		,userLevel(String.class)
		;Class<?>c;Prm(Class<?>p){c=p;}

		enum Screen {ProjectsList,ProjectScreen,BuildingScreen
			,FloorScreen,UsersList,User,Sheet
			,ReportsMenu
			,LogMenu
			,ConfigMenu
			,Search
		}//Screen

		enum Op{none,login,logout
			,newProject,newBuilding,newFloor,newSheet,newUser
			,deleteProject,deleteBuilding,deleteFloor
			,deleteSheet,deleteUser,userChngPw,query
			,xhrEdit,saveSheet//,getImg
		}//enum Op

		enum UserLevel{Manage,Edit,View ,Suspended}

	}//enum Prm

	static TL .DB.Tbl.Usr usr(Object uid){
		TL .DB.Tbl.Usr u=new TL .DB.Tbl.Usr();
		u.load(uid);return u;}

	static Map getJ(TL.DB.Tbl p){
		Map r=null;
		if(p instanceof Project){Project x=(Project)p;
			r=x.json;
		}else if(p instanceof Building){Building x=(Building)p;
			r=x.json;
		}else if(p instanceof Floor){Floor x=(Floor)p;
			r=x.json;
		}else if(p instanceof Sheet)
		{Sheet x=(Sheet)p;
			r=x.get();}
		return r;}

	static Map merge(Map dst,Map src){
		if(dst!=null&& src!=null)for(Object k:src.keySet())
			dst.put(k, src.get(k));
		return dst;
	}

	static final String SsnNm="EU059S.App"
	,UploadPth="/eu059sUploads/";
	Project proj=new Project();
	Building bld=new Building();
	Floor flr=new Floor();
	Sheet sheet=new Sheet();
	Prm.Screen screen;
	TL tl;

	public static App app(){return app(TL.tl());}
	public static App app(TL tl){
		Object o=tl.s(SsnNm);
		if(o==null)
			tl.s(SsnNm,o=new App());
		App e=(App)o;e.tl=tl;
		if(tl.usr==null && tl.a(SsnNm+".checkDBTCreation")==null
		   ){
			e.proj.checkDBTCreation(tl);
			e.bld .checkDBTCreation(tl);
			e.flr .checkDBTCreation(tl);
			e.sheet.checkDBTCreation(tl);
			new TL.DB.Tbl.Json().checkDBTCreation(tl);
			new TL.DB.Tbl.Usr().checkDBTCreation(tl);
			new TL.DB.Tbl.Ssn().checkDBTCreation(tl);
			new TL.DB.Tbl.Log().checkDBTCreation(tl);
			tl.a(SsnNm+".checkDBTCreation",tl.now);
		}return e;}

	/**path to the uploaded files for Sheet (the sheet stored in the session)*/
	public String getUploadPath(){
		readVars();//if(proj.no!=sheet.p)proj.no=sheet.p;
		if(bld.no==-1)//sheet.b
			bld.no=sheet.b;
		if(flr.no==-1)//!=sheet.f
			flr.no=sheet.f;
		return UploadPth//+proj.no+'/'+bld.no+'/'+flr.no+'/'+sheet.no+'/'
		+sheet.p+'/'+sheet.b+'/'+sheet.f+'/'+sheet.no+'/';}

	App readVars(){return init();/*
								  proj.no	=tl.var(Prm.projNo.toString(),-1).intValue();
								  bld.no	=tl.var(Prm.buildingNo.toString(),-1).intValue();
								  flr.no	=tl.var(Prm.floorNo.toString(),-1).intValue();
								  sheet.no=tl.var(Prm.sheetNo.toString(),-1).intValue();
								  return this;*/}

	App init(){try{
		screen=tl.var(Prm.screen.toString(),Prm.Screen.ProjectsList);
		if( tl.s(SsnNm)!=this )
			tl.s( SsnNm , this );
		//proj=(Project)tl.s("proj");
		Integer n=tl.var(Prm.projNo.toString(),-1).intValue();//proj.no);
		if(n!=proj.no && n!=-1)
			proj.load(n);

		//bld=(Building)tl.s("bld");
		n=tl.var(Prm.buildingNo.toString(),-1).intValue();//bld.no);
		if(n!=bld.no && n!=-1)
			bld.load(n);

		n=tl.var(Prm.floorNo.toString(),-1).intValue();//flr.no);
		if(n!=flr.no && n!=-1)
			flr.load(n);

		n=tl.var(Prm.sheetNo.toString(),-1).intValue();//sheet.no);
		if(n!=sheet.no){if( n!=-1)
		{	sheet.load(n);
			TL.DB.Tbl.Json j=sheet.json();
			j.json=sheet.m=j.LoadRef(j.jsonRef);
			//if(sheet.f!=flr.no)flr.load(sheet.f);
		}//else sheet.m=null;
		}
		if(sheet!=null && sheet.no!=null && sheet.jsonRef==null)
			sheet.jsonRef=TL.DB.q1int(
									  "select `"+Sheet.C.jsonRef
									  +"` from `"+sheet.getName()
									  +"` where `"+Sheet.C.no
									  +"`=?", -1, sheet.no);


	}catch(Exception ex){
		tl.error(ex,SsnNm,".init");}
		return this;
	}//init

	String title(TL.DB.Tbl t){Map j=getJ(t);
		Object ttl=j==null?null:j.get("title");
		String r=ttl==null?"title"+t:ttl.toString();
        return r;}

	String author(TL.DB.Tbl t){
		Map j=getJ(t);
		TL.DB.Tbl.Usr author=null;
		Object a=j==null?null:j.get("author");
		if(a!=null)try{author=usr(a);}
		catch(Exception ex){tl.error(ex,"eu059s.App.author");}
		Object authorName=author!=null && author.json!=null?author.json.get("name"):author!=null?author.un:null;
		String r= authorName==null?"author:"+t:authorName.toString();
        return r;}

	void saveSheet() throws Exception{
		tl.log("op-saveSheet");
		TL.DB.Tbl.Json json=sheet.json();
		Map old=sheet.m,j=sheet.m=(Map)
		(json.json=tl.json.get("json"));
		//sheet.fromMap(j);
		for(int i=0;i<4;i++)try{
			String n="img"+(i+1);
			Object o=tl.json.get(n);//Map m=(Map)tl.json.get(n);
			if(o==null && old!=null)
				o=old.get(n);
			if(o!=null &&(!(o instanceof String) || o.toString().trim().length()>0))
				j.put(n, o);
		}catch(Exception ex){
			tl.error(ex,"EU049C.App.saveSheet");}
		j.put("no", sheet.no);
		json.save();
		sheet.save();
	}//saveSheet

	void deleteImages(){try{
		//delete folder//Integer jsonRef=sheet.jsonRef;	 //App app=app(t);app.
		String path=getUploadPath()
		,real=TL.context.getRealPath(tl,path);//t.getServletContext().getRealPath(path);
		File f=new File(real);
		if(f.exists())
			f.delete();
	}catch(Exception ex){tl.error(ex,"deleteImages");}
	}//deleteImages

	void doOp(Prm.Op op){
		try{
			if(op!=null)
				switch(op){
					case newProject:
						proj.no=null;//TL.DB.q1int("select max(`no`)+1 from projects;", 1);
						proj.json=TL.Util.mapCreate("title","Project "+tl.now
													, "date",TL.Util.formatDate( tl.now )
													, "shortDesc","short Desc"//"avatar","avatar.jpg"
													, "author",tl.usr.uid, "desc","description" );
						proj.save();
						tl.s(Prm.projNo.toString(),proj.no);
						tl.s(Prm.screen.toString(),screen=Prm.Screen.ProjectScreen);
						break;

					case deleteProject:
						proj.delete();tl.s(Prm.projNo.toString(),proj.no=-1);
						screen=Prm.Screen.ProjectsList;break;
						//case getJsonProject:break;

					case newBuilding:
						bld.no=null;bld.p=proj.no;
						bld.json=TL.Util.mapCreate("date",TL.Util.formatDate( tl.now )
												   , "author",tl.usr.uid , "title","Building "+tl.now );//"avatar","avatar.jpg"
						bld.save();
						tl.s(Prm.buildingNo.toString(),bld.no);
						tl.s(Prm.screen.toString(), Prm.Screen.BuildingScreen);
						break;

					case deleteBuilding:
						bld.delete();tl.s(Prm.buildingNo.toString(),bld.no=-1);
						screen=Prm.Screen.ProjectScreen;break;

					case newFloor:
						flr.no=null;flr.b=bld.no;flr.p=proj.no;
						flr.json=TL.Util.mapCreate("date", TL.Util.formatDate( tl.now )
												   , "author",tl.usr.uid , "title","Floor "+tl.now);//"avatar","avatar.jpg"
						flr.save();
						tl.s(Prm.floorNo.toString(),flr.no);
						tl.s(Prm.screen.toString(), Prm.Screen.FloorScreen);
						break;

					case deleteFloor:
						flr.delete();tl.s(Prm.floorNo.toString(),flr.no=-1);
						screen=Prm.Screen.BuildingScreen;break;
						//case listSheets:break;
					case newSheet:{
						sheet.no=null;
						sheet.dt=tl.now;sheet.u=tl.usr.uid;sheet.p=proj.no;sheet.b=bld.no;sheet.f=flr.no;
						sheet.jsonRef=TL.DB.Tbl.Json.jrmp1();
						sheet.m=sheet.asMap();
						sheet.m.put("datetime", TL.Util.formatDate(sheet.dt ));
						TL.DB.Tbl.Json j=sheet.json();sheet.m.put(j.Jr,j.jsonRef);
						//sheet.jsonRef=j.jsonRef=j.jrmp1();//((Number)sheet.m.get(TL.DB.Tbl.Json.Jr)).intValue();
						sheet.save();
						sheet.m.put("no", sheet.no);
						j.save(sheet.m);
						tl.s(Prm.sheetNo.toString(), sheet.no);
						tl.s(Prm.screen.toString(), screen=Prm.Screen.Sheet);
					}break;
					case saveSheet:saveSheet();break;
					case deleteSheet:
						deleteImages();
						sheet.delete();
						tl.s(Prm.sheetNo.toString(), sheet.no=-1);
						screen=Prm.Screen.FloorScreen;
						break;

						//case sheetImg:break;
						//case uploadSheetImg:break;
						//case listUsers:break;
					case newUser:
						TL.DB.Tbl.Usr u=new TL.DB.Tbl.Usr();
						u.readReq("");//u .j=TL.Util.mapCreate name tel gender address email tel-ext id cid	"avatar","avatar.jpg"
						u.uid=null;
						u.save();
						tl.s(Prm.screen.toString(), Prm.Screen.User);
						break;
						//case editUser	:u=new TL.DB.Tbl.Usr();u.readReq_save();break;
					case deleteUser:
						u=new TL.DB.Tbl.Usr();u.readReq("");
						u.delete();
						tl.s(Prm.screen.toString(),screen=Prm.Screen.UsersList);break;
					case xhrEdit:{
						tl.log("eu059s/index.jsp : op==xhrEdit");
						if(tl.response==null)tl.response=TL.Util.mapCreate();
						TL.Util.mapSet(tl.response,"msg","um...");
						String entity=tl.req("entity");
						Map v=(Map)tl.json.get("v");
						Integer pk=tl.req("pk",-1);
						TL.DB.Tbl t="project".equals(entity)?proj
						:"building".equals(entity)?bld
						:"floor".equals(entity)?flr:null;
						tl.log("eu059s/index.jsp : op==xhrEdit: entity=",entity," ,pk=",pk," ,v=",v ," ,t=",t);
						if(t!=null && pk!=-1)
						{t.load(pk);tl.log("eu059s/index.jsp : op==xhrEdit: t!=null && pk!=-1");
							Map j=getJ(t);
							merge(j,v);
							tl.log("eu059s/index.jsp : op==xhrEdit: merge:",t);
							t.save();
							tl.log("eu059s/index.jsp : op==xhrEdit: save");
						}else tl.log("eu059s/index.jsp : op==xhrEdit: else: t!=null && pk!=-1");
						tl.getOut().o(tl.response);
						tl.log("eu059s/index.jsp : op==xhrEdit: return");
					}return;

					case query:
						/*
						 * search
						 * proj
						 * title
						 * short desc
						 * desc
						 * building title
						 * floor title
						 * sheet
						 * notes
						 * other txt,txt,txt
						 * usr full-name ,user-id , desc
						 * */
						break;
					case none:default:
				}
		}catch(Exception ex){tl.error(ex,"/adoqs/eu059s/index.jsp:do op:ex:");}
	}//doOp

	void init2(Prm.Op op) throws Exception{

		if(tl.usr==null&&op==Prm.Op.login){tl.logo("index:4:login");
			TL.DB.Tbl.Usr u=TL.DB.Tbl.Usr.login();tl.logo("index:5:login");
			if(u!=null){u.onLogin();
				TL.DB.Tbl.Log.log(TL.DB.Tbl.Log.Entity.usr
								  , tl.usr.uid
								  , TL.DB.Tbl.Log.Act.Login
								  ,TL.Util.mapCreate("usr",tl.usr,"request",tl.req));
			}else// msg="incorrect login";
				TL.DB.Tbl.Log.log(TL.DB.Tbl.Log.Entity.usr
								  , tl.usr.uid, TL.DB.Tbl.Log.Act.Log
								  ,TL.Util.mapCreate("msg","incorrect login","request",tl.req));
			//tl.logo("index:6:login:msg=",msg);
		}

		if(tl.usr==null && tl.getSession().isNew())
			TL.DB.Tbl.Log.log(TL.DB.Tbl.Log.Entity.ssn, -1, TL.DB.Tbl.Log.Act.Log,
							  TL.Util.mapCreate("msg","new Connection","request",tl.req));

		if(tl.usr!=null&&op==Prm.Op.logout)
		{ TL.DB.Tbl.Log.log(TL.DB.Tbl.Log.Entity.usr, tl.usr.uid
							, TL.DB.Tbl.Log.Act.Logout
							,TL.Util.mapCreate("usr",tl.usr));
			tl.ssn.onLogout();}

		if(tl.usr==null){try{//tl.o("version 2016.05.04 08:36");
			//pageContext.include("flat-login-form/index.html");
			tl.o("<script>location=\"flat-login-form/index.html\"</script>");
		}catch(Exception x){tl.error(x,"eu059s.App.init2");}
			tl.logo("index:8:end");
			return;
		}tl.logo("index:9");
	}//init2

	void jsp01() throws IOException {
		tl.o("<!DOCTYPE HTML>\r\n"
			 ,"<html>\r\n"
			 ,"\t<head>\r\n"
			 ,"\t\t<title>EU059S Structural Assessment of Underground Water Reservoirs</title>\r\n"
			 ,"\t\t<meta charset=\"utf-8\" serverVersion=\"2016/05/16/17:56:00\"/>\r\n"
			 ,"\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\r\n"
			 ,"\t\t<!--[if lte IE 8]><script src=\"assets/js/ie/html5shiv.js\"></script><![endif]-->\r\n"
			 ,"\t\t<link rel=\"stylesheet\" href=\"assets/css/main.css\" />\r\n"
			 ,"\t\t<!--[if lte IE 9]><link rel=\"stylesheet\" href=\"assets/css/ie9.css\" /><![endif]-->\r\n"
			 ,"\t\t<!--[if lte IE 8]><link rel=\"stylesheet\" href=\"assets/css/ie8.css\" /><![endif]-->\r\n"
			 ,"<script src=\"app.js\"></script><script>App.clkEdit=clkEdit=\r\n"
			 ,"function clkEdit(evt){\r\n"
			 ,"\tvar src=evt.target||event.srcElement\r\n"
			 ,"\t//,p=src;//console.log(\"clkEdit\",evt,src)\r\n"
			 ,"\t//while(p&&p.nodeName!='ARTICLE'){p=p.parentNode;}\r\n"
			 ,"\r\n"
			 ,"\tvar p=document.getElementsByClassName('editForm')[0]\r\n"
			 ,"\t, a=p.getElementsByClassName('editable')\r\n"
			 ,"\t,b=src.innerText=='EDIT'\r\n"
			 ,"\t,v={},data\r\n"
			 ,"\tp.aEdit=a;src.innerText=b?'Save':'EDIT'\r\n"
			 ,"\tfor(var i =0;i<a.length;i++)\r\n"
			 ,"\t{\ta[i].contentEditable=b;\r\n"
			 ,"\t\ta[i].style.backgroundColor=b?'lightgray':''\r\n"
			 ,"\t\tv[a[i].getAttribute('name')]=a[i].innerText;\r\n"
			 ,"\t}data={op:'xhrEdit',entity:p.entity \r\n"
			 ,"\t\t|| p.getAttribute('entity') ,pk:p.pk \r\n"
			 ,"\t\t|| p.getAttribute('pk') ,v:v}\r\n"
			 ,"\tconsole.log('clkEdit:src=',src,' ,p=',p,' ,a='\r\n"
			 ,"\t\t,a,' ,b=',b,' ,v=',v ,' ,data=',data);\r\n"
			 ,"\tif(!b)\r\n"
			 ,"\t\tApp.xhr({data:data})\r\n"
			 ,"}//function clkEdit(evt)\r\n"
			 ,"</script>\r\n"
			 ,"\t</head>\r\n"
			 ,"\t<body>\r\n"
			 ,"\r\n"
			 ,"\t\t<!-- Wrapper -->\r\n"
			 ,"\t\t\t<div id=\"wrapper\">\r\n"
			 ,"\r\n"
			 ,"\t\t\t\t<!-- Header -->\r\n"
			 ,"\t\t\t\t\t<header id=\"header\">\r\n"
			 //tl.o("\t\t\t\t\t\t<h1><a href=\"#\">Structural Assessment of Underground Water Reservoirs, EU059S</a></h1>\r\n");
			 ,"\t\t\t\t\t\t<nav class=\"links\">\r\n"
			 ,"\t\t\t\t\t\t\t<ul>\r\n"
			 ,"\t\t\t\t\t\t\t\t<li><a href=\"?",Prm.screen,'=',Prm.Screen.ProjectsList
			 ,"\">Projects</a></li>\r\n"
			 ,"\t\t\t\t\t\t\t\t<li><a href=\"?",Prm.screen,'=',Prm.Screen.UsersList
			 ,"\">Users</a></li>\r\n"
			 ,"\t\t\t\t\t\t\t\t<li><a href=\"?",Prm.screen,'=',Prm.Screen.ReportsMenu
			 ,"\">Reports</a></li>\r\n"
			 ,"\t\t\t\t\t\t\t\t<li><a href=\"?",Prm.screen,'=',Prm.Screen.LogMenu
			 ,"\">Logs</a></li>\r\n"
			 ,"\t\t\t\t\t\t\t\t<li><a href=\"?",Prm.screen,'=',Prm.Screen.ConfigMenu
			 ,"\">Configurations</a></li>\r\n"
			 ,"\t\t\t\t\t\t\t</ul>\r\n"
			 ,"\t\t\t\t\t\t</nav>\r\n"
			 ,"\t\t\t\t\t\t<nav class=\"main\">\r\n"
			 ,"\t\t\t\t\t\t\t<ul>\r\n"
			 ,"\t\t\t\t\t\t\t\t<li class=\"search\">\r\n"
			 ,"\t\t\t\t\t\t\t\t\t<a class=\"fa-search\" href=\"#search\">Search</a>\r\n"
			 ,"\t\t\t\t\t\t\t\t\t<form id=\"search\" method=\"get\" action=\"?",Prm.screen,'=',Prm.Screen.Search,'&',Prm.op,'=',Prm.Op.query
			 ,"\">\r\n"
			 ,"\t\t\t\t\t\t\t\t\t\t<input type=\"text\" name=\"",Prm.query
			 ,"\" placeholder=\"Search\" />\r\n"
			 ,"\t\t\t\t\t\t\t\t\t</form>\r\n"
			 ,"\t\t\t\t\t\t\t\t</li>\r\n"
			 ,"\t\t\t\t\t\t\t\t<li class=\"menu\">\r\n"
			 ,"\t\t\t\t\t\t\t\t\t<a class=\"fa-bars\" href=\"#menu\">Menu</a>\r\n"
			 ,"\t\t\t\t\t\t\t\t</li>\r\n"
			 ,"\t\t\t\t\t\t\t</ul>\r\n"
			 ,"\t\t\t\t\t\t</nav>\r\n"
			 ,"\t\t\t\t\t\t<h1><a href=\"#\">Structural Assessment of Underground <br/>Water Reservoirs, EU059S</a></h1>\r\n"
			 ,"\t\t\t\t\t</header>\r\n"
			 ,"\r\n"
			 ,"\t\t\t\t<!-- Menu -->\r\n"
			 ,"\t\t\t\t\t<section id=\"menu\">\r\n"
			 ,"\r\n"
			 ,"\t\t\t\t\t\t<!-- Search -->\r\n"
			 ,"\t\t\t\t\t\t\t<section>\r\n"
			 ,"\t\t\t\t\t\t\t\t<form id=\"search\" method=\"get\" action=\"?",Prm.screen,'=',Prm.Screen.Search,'&',Prm.op,'=',Prm.Op.query
			 ,"\">\r\n"
			 ,"\t\t\t\t\t\t\t\t\t\t<input type=\"text\" name=\"",Prm.query
			 ,"\" placeholder=\"Search\" />\r\n"
			 ,"\t\t\t\t\t\t\t\t\t</form>\r\n"
			 ,"\t\t\t\t\t\t\t</section>\r\n"
			 ,"\r\n"
			 ,"\t\t\t\t\t\t<!-- Links -->\r\n"
			 ,"\t\t\t\t\t\t\t<section>\r\n"
			 ,"\t\t\t\t\t\t\t\t<ul class=\"links\">\r\n"
			 ,"\t\t\t\t\t\t\t\t\t<li>\r\n"
			 ,"\t\t\t\t\t\t\t\t\t\t<a href=\"http://www.kisr.edu.kw\">\r\n"
			 ,"\t\t\t\t\t\t\t\t\t\t\t<h3>KISR</h3>\r\n"
			 ,"\t\t\t\t\t\t\t\t\t\t\t<p>Kuwait Institute for Scientific Research</p>\r\n"
			 ,"\t\t\t\t\t\t\t\t\t\t</a>\r\n"
			 ,"\t\t\t\t\t\t\t\t\t</li>\r\n"
			 ,"\t\t\t\t\t\t\t\t\t<li>\r\n"
			 ,"\t\t\t\t\t\t\t\t\t\t<a href=\"#\">\r\n"
			 ,"\t\t\t\t\t\t\t\t\t\t\t<h3>EU</h3>\r\n"
			 ,"\t\t\t\t\t\t\t\t\t\t\t<p>Energy & Building Research Center</p>\r\n"
			 ,"\t\t\t\t\t\t\t\t\t\t</a>\r\n"
			 ,"\t\t\t\t\t\t\t\t\t</li>\r\n"
			 ,"\t\t\t\t\t\t\t\t\t<li>\r\n"
			 ,"\t\t\t\t\t\t\t\t\t\t<a href=\"#\">\r\n"
			 ,"\t\t\t\t\t\t\t\t\t\t\t<h3>TED</h3>\r\n"
			 ,"\t\t\t\t\t\t\t\t\t\t\t<p>Techno Economics Division</p>\r\n"
			 ,"\t\t\t\t\t\t\t\t\t\t</a>\r\n"
			 ,"\t\t\t\t\t\t\t\t\t</li>\r\n"
			 ,"\t\t\t\t\t\t\t\t\t<li>\r\n"
			 ,"\t\t\t\t\t\t\t\t\t\t<a href=\"#\">\r\n"
			 ,"\t\t\t\t\t\t\t\t\t\t\t<h3>EU059S</h3>\r\n"
			 ,"\t\t\t\t\t\t\t\t\t\t\t<p>Project:Structural Assessment of Underground Water Reservoirs</p>\r\n"
			 ,"\t\t\t\t\t\t\t\t\t\t</a>\r\n"
			 ,"\t\t\t\t\t\t\t\t\t</li>");
	}//jsp01

	void jspMenu() throws IOException{
		App e=this;
		if(e.screen==Prm.Screen.UsersList){
			tl.o("\r\n"
				 ,"\t\t\t\t\t\t\t\t\t<li>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t<a href=\"#\">\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t\t<h3>New User</h3>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t\t<p><form method=\"post\"><input type=\"hidden\" name=\"",Prm.op
				 ,"\" value=\"",Prm.Op.newUser
				 ,"\"/><input type=\"submit\" value=\"Create\"/></form></p>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t</a>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t</li>");
		}else if(e.screen==Prm.Screen.User){
			tl.o("\r\n"
				 ,"\t\t\t\t\t\t\t\t\t<li>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t<a href=\"#\">\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t\t<h3>Delete User</h3>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t\t<p><form method=\"post\"><input type=\"hidden\" name=\"",Prm.op
				 ,"\" value=\"",Prm.Op.deleteUser
				 ,"\"/><input type=\"submit\" value=\"Delete\"/></form></p>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t</a>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t</li>");
		}else if(e.screen==Prm.Screen.ProjectsList){
			tl.o("\r\n"
				 ,"\t\t\t\t\t\t\t\t\t<li>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t<a href=\"#\">\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t\t<h3>New Project</h3>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t\t<p><form method=\"post\"><input type=\"hidden\" name=\"",Prm.op
				 ,"\" value=\"",Prm.Op.newProject
				 ,"\"/><input type=\"submit\" value=\"Create\"/></form></p>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t</a>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t</li>");
		}else if(e.screen==Prm.Screen.ProjectScreen){
			tl.o("\r\n"
				 ,"\t\t\t\t\t\t\t\t\t<li>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t<a href=\"#\">\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t\t<h3>Delete Project</h3>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t\t<p><form method=\"post\"><input type=\"hidden\" name=\"",Prm.op
				 ,"\" value=\"",Prm.Op.deleteProject
				 ,"\"/><input type=\"submit\" value=\"Delete\"/></form></p>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t</a>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t</li>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t<li>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t<a href=\"#\">\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t\t<h3>New Building</h3>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t\t<p><form method=\"post\"><input type=\"hidden\" name=\"",Prm.op
				 ,"\" value=\"",Prm.Op.newBuilding
				 ,"\"/><input type=\"submit\" value=\"Create\"/></form></p>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t</a>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t</li>");
		}else if(e.screen==Prm.Screen.BuildingScreen){
			tl.o("\r\n"
				 ,"\t\t\t\t\t\t\t\t\t<li>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t<a href=\"#\">\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t<h3>Delete Building</h3>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t<p><form method=\"post\"><input type=\"hidden\" name=\"",Prm.op
				 ,"\" value=\"",Prm.Op.deleteBuilding
				 ,"\"/><input type=\"submit\" value=\"Delete\"/></form></p>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t</a>\r\n"
				 ,"\t\t\t\t\t\t\t\t</li>\r\n"
				 ,"\t\t\t\t\t\t\t\t<li>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t<a href=\"#\">\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t<h3>New Floor</h3>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t<p><form method=\"post\"><input type=\"hidden\" name=\"",Prm.op
				 ,"\" value=\"",Prm.Op.newFloor
				 ,"\"/><input type=\"submit\" value=\"Create\"/></form></p>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t</a>\r\n"
				 ,"\t\t\t\t\t\t\t\t</li>");
		}else if(e.screen==Prm.Screen.FloorScreen){
			tl.o("\r\n"
				 ,"\t\t\t\t\t\t\t\t\t<li>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t<a href=\"#\">\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t\t<h3>Delete Floor</h3>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t\t<p><form method=\"post\"><input type=\"hidden\" name=\"",Prm.op
				 ,"\" value=\"",Prm.Op.deleteFloor
				 ,"\"/><input type=\"submit\" value=\"Delete\"/></form></p>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t</a>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t</li>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t<li>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t<a href=\"#\">\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t\t<h3>New Sheet</h3>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t\t<p><form method=\"post\"><input type=\"hidden\" name=\"",Prm.op
				 ,"\" value=\"",Prm.Op.newSheet
				 ,"\"/><input type=\"submit\" value=\"Create\"/></form></p>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t</a>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t</li>");
		}else if(e.screen==Prm.Screen.Sheet){
			tl.o("<li><a href=\"#\"><h3>Delete Sheet</h3>\r\n"
				 ,"<p><form method=\"post\"><input type=\"hidden\" name=\"",Prm.op
				 ,"\" value=\"",Prm.Op.deleteSheet
				 ,"\"/><input type=\"submit\" value=\"Delete\"/></form></p>\r\n"
				 ,"</a></li>\r\n");
		}
		tl.o("\r\n"
			 ,"\t\t\t\t\t\t\t\t</ul>\r\n"
			 ,"\t\t\t\t\t\t\t</section>\r\n"
			 ,"\r\n"
			 ,"\t\t\t\t\t\t<!-- Actions -->\r\n"
			 ,"\t\t\t\t\t\t\t<section>\r\n"
			 ,"\t\t\t\t\t\t\t\t<ul class=\"actions vertical\">\r\n"
			 ,"\t\t\t\t\t\t\t\t\t<li><a href=\"?",Prm.op,'=',Prm.Op.logout
			 ,"\" class=\"button big fit\">Logout</a></li>\r\n"
			 ,"\t\t\t\t\t\t\t\t</ul>\r\n"
			 ,"\t\t\t\t\t\t\t</section>\r\n"
			 ,"\r\n"
			 ,"\t\t\t\t\t</section>\r\n");
	}//jspMenu

	void jspMain() throws IOException{
		tl.o("\r\n\t\t\t\t<!-- Main -->\r\n\t\t\t\t\t<div id=\"main\">\r\n");
	}//jspMain

	void jspScreenUsersList() throws IOException{
		tl.o("\r\n"
			 ,"<h1>Users</h1><table><tr><th>User-Name</th><th>User-Level</th><th>Display Name</th><th>Avatar</th><th>Email</th><th>Tel</th><th>Notes</th></tr><\r\n"
			 );
		TL.DB.Tbl.Usr usr=new TL.DB.Tbl.Usr();
		String edit=tl.req("edit");
		for(TL.DB.Tbl u:usr.query(TL.DB.Tbl.where())){
			Object ul=usr.json.get("usrLevel")
				,dn=usr.json.get("displayName")
				,avatar=usr.json.get("avatar")
				,email=usr.json.get("email")
				,tel=usr.json.get("tel")
				,notes=usr.json.get("notes");
			if(usr.un.equals(edit))
				tl.o("<tr><form method=post><td><input name=un readonly value=\"",usr.un
					,"\"></td><td><input name=usrLevel value=\"",ul
					,"\"></td><td><input name=un readonly value=",dn,"\">",dn,"</td><td>",avatar,"</td><td>",email,"</td><td>",tel,"</td><td>",notes,"</td></tr>");
				else tl.o("<tr><td><a href=\"?edit=",usr.un,"\">",usr.un,"</a></td><td>",ul,"</td><td>",dn,"</td><td>",avatar,"</td><td>",email,"</td><td>",tel,"</td><td>",notes,"</td></tr>");
		}

		tl.o("</table><a href=\"?",Prm.op,'=',Prm.Op.newUser,"\">New User</a>","\r\n");
	}//jspScreenUsersList

	void jspScreenConfig() throws IOException{
		tl.o("<h1>Config</h1>","Change Password");
	}//jspScreenConfig

	void jspScreenProjectsList() throws IOException{
		App e=this;int serialNo=0;//Project p=new Project();
		tl.o("<h1>Projects</h1><table><tr><th>sn</th><th>Title</th><th>Desc</th><th>Created</th><th>by</th><th>Description</th><th>#Buildings</th><th>#Sheets</th></tr>");
		for(TL.DB.Tbl row:e.proj.query(TL.DB.Tbl.where( )))try
		{TL.DB.Tbl.Usr author=null; if(e.proj.json==null)e.proj.json=TL.Util.mapCreate();
			try{author=usr(e.proj.json.get("author"));}
			catch(Exception ex){tl.error(ex,"eu059s : project list for-loop:author ,proj=",e.proj);}
			Object avatar=e.proj.json.get("avatar")
			, uAvatar = author != null && author . json != null	? author . json . get ( "avatar" ):null
			,authorName=author!=null && author.json!=null?author.json.get("name"):author!=null?author.un:"-";
			++serialNo;// Object o=TL.Json.Parser.parse(json);Map l=(Map)((Map)o).get("labels");

			tl.o("<tr entity=\"projects\" pk=",e.proj.no
				 ,"><td>",serialNo,"</td>"
				 ,"<td><h2 class=\"title\"><a href=\"?",Prm.screen,'=',Prm.Screen.ProjectScreen,'&',Prm.projNo,'=',e.proj.no
				 ,"\" name=\"title\">",e.proj.json.get("title")
				 ,"</a></h2></td>"
				 ,"<td name=\"shortDesc\">",e.proj.json.get("shortDesc")
				 ,"</td>\r\n"
				 ,"<td class=\"meta\"><time class=\"published\" datetime=\"",e.proj.json.get("date")
				 ,"\" name=\"date\">",e.proj.json.get("date")
				 ,"</time></td>"
				 ,"<td><a href=\"#\" class=\"author\"><span class=\"name\" name=\"author\" title=\"author name\">",authorName!=null?authorName:author!=null&&author.un!=null?author.un : "n/a"
				 ,"<img src=\"images/",uAvatar==null?"avatar.jpg":uAvatar
				 ,"\" alt=\"author image\" /></a></td>\r\n"
				 //tl.o("\t\t\t< tr>\r\n");
				 ,"<x-td><a href=\"#\" x-class=\"image featured\"><x-img src=\"images/",avatar!=null?avatar:(serialNo<10?"pic0"+serialNo+".jpg":"pic"+serialNo+".jpg")
				 ,"\" alt=\"\" /></a></x-td>\r\n"
				 ,"<td name=\"desc\">",e.proj.json.get("desc")
				 ,"</td>"
				 ,"<td class=\"stats\"><a title=\"number of buildings in this project\" class=\"icon fa-heart\" name=\"heart\">",TL.DB.q1int("select count(*) from buildings where p=?",-1,e.proj.no)
				 ,"</a></td>"
				 ,"<td><a title=\"number of sheets in this project\" href=\"#\" class=\"icon fa-comment\" name=\"comment\">",TL.DB.q1int("select count(*) from sheets where p=?",-1,e.proj.no)
				 ,"</a></td footer></tr>\r\n");
		}catch(Exception ex){tl.error(ex,"eu059s : Projects list for-loop ,proj=",e.proj);}
		tl.o("</table><a href=\"?"
			 ,Prm.screen,'=',Prm.Screen.ProjectScreen
			 ,'&',Prm.op,'=',Prm.Op.newProject,"\">New Project</a>");
	}//jspScreenProjectsList

	void jspScreenProject() throws IOException, SQLException {
		App e=this;int serialNo=1;
		serialNo=1;//if(e.proj.json==null)e.proj.json=TL.Util.mapCreate();TL.DB.Tbl.Usr author=null;try{author=usr(e.proj.json.get("author"));}catch(Exception ex){tl.error(ex,"eu059s : project-selected:author");}Object avatar=e.proj.json.get("avatar"),pTtl=e.proj.json.get("title"),uAvatar=author!=null && author.json!=null?author.json.get("avatar"):null,authorName=author!=null && author.json!=null?author.json.get("name"):author!=null?author.un:"-";

		tl.o("<h1>Project</h1><table><tr><th>Title</th><th>Desc</th><th>Created</th><th>by</th><th>Description</th><th>Actions</th><th>#Buildings</th><th>#Sheets</th></tr>");
		try
		{ //if(e.proj.json==null)e.proj.json=TL.Util.mapCreate();try{author=usr(e.proj.json.get("author"));} catch(Exception ex){tl.error(ex,"eu059s : project :author ,proj=",e.proj);}
			String pTtl=title(e.proj);
			tl.o("<tr entity=\"projects\" pk=",e.proj.no
				 ,screen==Prm.Screen.ProjectScreen?" class=\"editForm\"":""
				 ,"><td><h2 class=\"title\"><a href=\"?"
				 ,Prm.screen,'=',Prm.Screen.ProjectScreen,'&',Prm.projNo,'=',e.proj.no
				 ,"\" name=\"title\""
				 ,screen==Prm.Screen.ProjectScreen?" class=\"editable\">":">"
				 ,pTtl,"</a></h2></td>"
				 ,"<td name=\"shortDesc\""
				 ,screen==Prm.Screen.ProjectScreen?" class=\"editable\">":">"
				 ,e.proj.json.get("shortDesc"),"</td>\r\n"
				 ,"<td class=\"meta\"><time class=\"published\" datetime=\"",e.proj.json.get("date")
				 ,"\" name=\"date\">",e.proj.json.get("date"),"</time></td>"
				 ,"<td><a href=\"#\" class=\"author\"><span class=\"name\" name=\"author\" title=\"author name\">"
				 ,author(e.proj)//authorName!=null?authorName:author!=null&&author.un!=null?author.un : "n/a"
				 ,"<img src=\"images/"
				 ,"avatar.jpg"//uAvatar==null?"avatar.jpg":uAvatar
				 ,"\" alt=\"author image\" /></a></td>\r\n"
				 //,"<x-td><a href=\"#\" x-class=\"image featured\"><x-img src=\"images/",avatar!=null?avatar:serialNo<10?"pic0"+serialNo+".jpg":"pic"+serialNo+".jpg","\" alt=\"\" /></a></x-td>\r\n"
				 ,"<td name=\"desc\"",screen==Prm.Screen.ProjectScreen?" class=\"editable\">":">"
				 ,e.proj.json.get("desc"),"</td>"
				 ,"<td footer class=\"actions\"><a href=\"?"
				 ,Prm.screen,'=',Prm.Screen.ProjectScreen
				 ,'&',Prm.projNo,'=',e.proj.no,"\" class=\"button big\">View</a>");
			//  if(e.screen==Prm.Screen.ProjectScreen)
			tl.o("<a onclick=\"clkEdit(event)\" class=\"button big\">Edit</a>\r\n"
				 ,"<a onclick=\"confirm('delete project ",pTtl," ?')\" href=\"?"
				 ,Prm.screen,'=',Prm.Screen.ProjectsList,'&'
				 ,Prm.op,'=',Prm.Op.deleteProject,'&',Prm.projNo,'=',e.proj.no
				 ,"\" class=\"button big\">Delete Project</a>"
				 ,"<a href=\"?",Prm.screen,'=',Prm.Screen.BuildingScreen
				 ,'&',Prm.op,'=',Prm.Op.newBuilding,'&',Prm.projNo,'=',e.proj.no
				 ,"\" class=\"button big\">New Building</a>");

			tl.o("</td>"
				 ,"<td class=\"stats\"><a title=\"number of buildings in this project\" class=\"icon fa-heart\" name=\"heart\">"
				 ,TL.DB.q1int("select count(*) from buildings where p=?",-1,e.proj.no)
				 ,"</a></td><td><a title=\"number of sheets in this project\" href=\"#\" class=\"icon fa-comment\" name=\"comment\">"
				 ,TL.DB.q1int("select count(*) from sheets where p=?",-1,e.proj.no)
				 ,"</a></td footer></tr>\r\n");
		}catch(Exception ex){tl.error(ex,"eu059s : Projects list for-loop ,proj=",e.proj);}
		tl.o("</table>");
		jspScreenBuildingList();
	}//jspScreenProj

	void jspIntro() throws IOException{
		tl.o("\t\t\t\t\t</div>\r\n"
			 ,"\r\n"
			 ,"\t\t\t\t<!-- Sidebar -->\r\n"
			 ,"\t\t\t\t\t<section x-id=\"sidebar\">\r\n"
			 ,"\r\n"
			 ,"\t\t\t\t\t\t<!-- Intro -->\r\n"
			 ,"\t\t\t\t\t\t\t<section id=\"intro\">\r\n"
			 ,"\t\t\t\t\t\t\t\t<a href=\"#\" class=\"logo\"><img src=\"images/logo.png\" alt=\"\" /></a>\r\n"
			 ,"\t\t\t\t\t\t\t\t<header>\r\n"
			 ,"\t\t\t\t\t\t\t\t\t<h2>Visual Assessment</h2>\r\n"
			 ,"\t\t\t\t\t\t\t\t\t<p>Web-application</p>\r\n"
			 ,"\t\t\t\t\t\t\t\t</header>\r\n"
			 ,"\t\t\t\t\t\t\t</section>\r\n");
	}//jspIntro

	void jspScreenBuildingList() throws IOException, SQLException{
		App e=this;int serialNo=0;

		tl.o("<h1>Buildings</h1><table><tr><th>sn</th><th>Title</th><th>Notes</th><th>Created</th><th>by</th><th>#Floors</th><th>#Sheets</th></tr>");

		for(TL.DB.Tbl row:e.bld.query(TL.DB.Tbl.where(Building.C.p,e.proj.no )))
		{TL.DB.Tbl.Usr author=usr(e.bld.json.get("author"));
			Object avatar=e.bld.json.get("avatar")
			, uAvatar = author != null && author . json != null
			? author . json . get ( "avatar" ):null
			,authorName=author!=null && author.json!=null
			?author.json.get("name"):author!=null?author.un:"-";
			++serialNo;


			tl.o("<tr xclass=\"mini-post building\" entity=\"building\" pk=",e.bld.no
				 ,">\r\n"
				 ,"<td>",serialNo
				 ,"</td>\r\n"
				 ,"<td><h3><a href=\"?",Prm.screen,'=',Prm.Screen.BuildingScreen,'&',Prm.projNo,'=',e.proj.no,'&',Prm.buildingNo,'=',e.bld.no
				 ,"\" name=\"title\">",e.bld.json.get("title")
				 ,"</a></h3></td>\r\n"
				 ,"<td>",e.bld.json.get("notes")
				 ,"</td>\r\n"
				 ,"<td><time class=\"published\" datetime=\"",tl.now ,'"','>',e.bld.json.get("date")
				 ,"</time></td>\r\n"
				 ,"<td><a href=\"#\" class=\"author\"><span class=\"name\" name=\"author\" title=\"author name\">",authorName!=null?authorName:author!=null&&author.un!=null?author.un : "n/a"
				 ,"</span><img src=\"images/",uAvatar==null?"avatar.jpg":uAvatar
				 ,"\" alt=\"author image\" /></a></td>\r\n"
				 ,"<td class=\"stats\"><a title=\"number of floors in this building\" class=\"icon fa-heart\" name=\"heart\">",TL.DB.q1int("select count(*) from floors where b=?",-1,e.bld.no)
				 ,"</a></td>\r\n"
				 ,"<td><a title=\"number of sheets in this building\" href=\"#\" class=\"icon fa-comment\" name=\"comment\">",TL.DB.q1int("select count(*) from sheets where b=?",-1,e.bld.no)
				 ,"</a></td></tr>\r\n");
		}tl.o("</table>");
	}//jspScreenBuildingList    //jspScreenProject

	void jspScreenBuilding()throws IOException, SQLException{
		App e=this;int serialNo=1;
		TL.DB.Tbl.Usr author=usr(e.bld.json.get("author"));
		Object avatar=e.bld.json.get("avatar")
		, uAvatar = author != null && author . json != null
		? author . json . get ( "avatar" )
		:null
		,authorName=author!=null && author.json!=null
		?author.json.get("name")
		:author!=null?author.un
		:"User";

		tl.o("<h1>Building</h1><table><tr><th>Title</th><th>Notes</th><th>Created</th><th>by</th><th>Action</th><th>#Floors</th><th>#Sheets</th></tr>\n"
			 ,"<tr xclass=\"mini-post building"
			 ," editForm"//e.screen==Prm.Screen.BuildingScreen?" editForm":""
			 ,"\" entity=\"building\" pk=\"",e.bld.no
			 ,"\">\r\n"
			 ,"<td><h3><a href=\"?",Prm.screen,'=',Prm.Screen.BuildingScreen,'&',Prm.buildingNo,'=',e.bld.no
			 ,"\" name=\"title\" class=\"editable\">",e.bld.json.get("title")
			 ,"</a></h3></td>\r\n"
			 ,"<td class=\"editable\">",e.bld.json.get("notes")
			 ,"</td>\r\n"
			 ,"<td><time class=\"published\" datetime=\"",tl.now ,'"','>',e.bld.json.get("date")
			 ,"</time></td>\r\n"
			 ,"<td><a href=\"#\" class=\"author\"><span class=\"name\" name=\"author\" title=\"author name\">",authorName!=null?authorName:author!=null&&author.un!=null?author.un : "n/a"
			 ,"</span><img src=\"images/",uAvatar==null?"avatar.jpg":uAvatar
			 ,"\" alt=\"author image\" /></a></td>\r\n"
			 ,"<td class=\"stats\" >\r\n");
		//if(e.screen==Prm.Screen.BuildingScreen)
		{
			tl.o("<button onclick=\"clkEdit(event)\">EDIT</button>\r\n"
				 ,"\t\t\t\t<button ><a href=\"?",Prm.op,'=',Prm.Op.newFloor
				 ,"\">New Floor</a></button>\r\n"
				 ,"\t\t\t\t<button ><a href=\"?",Prm.op,'=',Prm.Op.deleteBuilding
				 ,"\">Delete Building</a></button>");
		}
		tl.o("</td>"
			 ,"<td style=\"display:inline;	list-style: none;\" ><a title=\"number of floors in this building\" class=\"icon fa-heart\" name=\"heart\">",TL.DB.q1int("select count(*) from floors where b=?",-1,e.bld.no)
			 ,"</a></td>\r\n"
			 ,"<td style=\"display:inline;	list-style: none;\" ><a title=\"number of sheets in this project\" href=\"#\" class=\"icon fa-comment\" name=\"comment\">",TL.DB.q1int("select count(*) from sheets where b=?",-1,e.bld.no)
			 ,"</a></td></tr></table>\r\n");
		//if(e.screen==Prm.Screen.BuildingScreen)
		{serialNo=0;
			tl.o("<h1>Floors</h1><table><tr><th>sn</th><th>Title</th><th>Notes</th><th>Created</th><th>by</th><th>#Sheets</th></tr>");
			for(TL.DB.Tbl row:e.flr.query(TL.DB.Tbl.where(Floor.C.b,e.bld.no )))
			{ author=usr(e.bld.json.get("author"));
				avatar=e.bld.json.get("avatar");
				uAvatar = author != null && author . json != null
				? author . json . get ( "avatar" ):null;
				authorName=author!=null && author.json!=null
				?author.json.get("name"):author!=null?author.un:"-";
				++serialNo;


				tl.o("<tr xclass=\"mini-post floor\" floorNo=",e.flr.no
					 ,"><td>",serialNo
					 ,"</td>\r\n"
					 ,"<td><h3><a href=\"?",Prm.screen,'=',Prm.Screen.FloorScreen,'&',Prm.floorNo,'=',e.flr.no
					 ,"\" name=\"title\">",e.flr.json.get("title")
					 ,"</a></h3></td>\r\n"
					 ,"<td>",e.flr.json.get("notes")
					 ,"</td>\r\n"
					 ,"<td><time class=\"published\" datetime=\"",tl.now ,'"','>',e.flr.json.get("date")
					 ,"</time></td>\r\n"
					 ,"<td><a href=\"#\" class=\"author\"><span class=\"name\" name=\"author\" title=\"author name\">",authorName!=null?authorName:author!=null&&author.un!=null?author.un : "n/a"
					 ,"<img src=\"images/",uAvatar==null?"avatar.jpg":uAvatar
					 ,"\" alt=\"author image\" /></a></td>\r\n"
					 ,"<td class=\"stats\"><a title=\"number of sheets in this floor\" href=\"#\" class=\"icon fa-comment\" name=\"comment\">",TL.DB.q1int("select count(*) from sheets where f=?",-1,e.flr.no)
					 ,"</a></td></tr>\r\n");
			}tl.o("</table>\r\n");
		}
	}//jspNonBld

	void jspScreenFloor() throws IOException,SQLException{
		App e=this;
		tl.o("<h1>Floor</h1><table><tr><th>Title</th><th>Notes</th><th>Created</th><th>by</th><th>Action</th><th>#Sheets</th></tr>"

			 ,"<tr"// xclass=\"mini-post floor");
			 ,//e.screen==Prm.Screen.FloorScreen?:""
			 " class=\"editForm\""
			 ," entity=\"floor\" pk=\"",e.flr.no,"\">\r\n"
			 ,"<td><h3><a href=\"?",Prm.screen,'=',Prm.Screen.FloorScreen
			 ,'&',Prm.floorNo,'=',e.flr.no
			 ,"\" name=\"title\" class=\"editable\">"
			 ,e.flr.json.get("title")
			 ,"</a></h3></td>\r\n"
			 ,"<td class=\"editable\">"
			 ,e.flr.json.get("notes")
			 ,"</td>\r\n"
			 ,"<td><time class=\"published\" datetime=\""
			 ,tl.now ,'"','>',e.flr.json.get("date")
			 ,"</time></td>\r\n"
			 ,"<td><a href=\"#\" class=\"author\"><img src=\"images/"
			 ,e.flr.json.get("avatar")
			 ,"\" alt=\"\" /></a></td>"

			 ,"<td><button onclick=\"clkEdit(event)\">EDIT</button>\r\n"
			 ,"<form method=\"post\"><input type=\"hidden\" name=\""
			 ,Prm.op,"\" value=\"",Prm.Op.deleteFloor
			 ,"\"/><input type=\"submit\" value=\"Delete Floor\"/></form>\r\n"

			 ,"<form method=\"post\"><input type=\"hidden\" name=\""
			 ,Prm.op,"\" value=\"",Prm.Op.newSheet
			 ,"\"/><input type=\"submit\" value=\"New Sheet\"/></form></td>\r\n"

			 ,"<td class=\"stats\"><a title=\"number of sheets in this floor\" href=\"#\" class=\"icon fa-comment\" name=\"comment\">"
			 ,TL.DB.q1int("select count(*) from sheets where f=?",-1,e.flr.no)
			 ,"</a></td></tr></table>");
		jspSheets();
		//}//else , not floors
	}

	void jspPosts() throws IOException{
		tl.o("\t\t\t\t\t\t\t\t</div>\r\n"
			 ,"\t\t\t\t\t\t\t</section>\r\n"
			 ,"\r\n"
			 ,"\t\t\t\t\t\t<!-- Posts List -->\r\n"
			 ,"\t\t\t\t\t\t\t<section>\r\n"
			 ,"\t\t\t\t\t\t\t\t<ul class=\"posts\">\r\n");
	}//jspPosts

	void jspSheets()throws IOException, SQLException{//,int sIx
		App e=this;int serialNo=0,sIx=screen.ordinal();
		//final int i0=Prm.Screen.ProjectScreen.ordinal(),i1=Prm.Screen.BuildingScreen.ordinal();
		for(TL.DB.Tbl row:e.sheet.query(TL.DB.Tbl.where(
														sIx==0?Sheet.C.p
														:sIx==1?Sheet.C.b
														:Sheet.C.f
														,
														sIx==0?e.proj.no
														:sIx==1?e.bld.no
														:e.flr.no )))
		{	int sn=((serialNo++)%12)+1;
			if(serialNo==1)
				tl.o("<h1>Sheets</h1>");

			tl.o("\r\n"
				 ,"\t\t<li>\r\n"
				 ,"\t\t\t<article>\r\n"
				 ,"\t\t\t\t<header>\r\n"
				 ,"\t\t\t\t\t<h3><a href=\"?",Prm.screen,'=',Prm.Screen.Sheet,'&',Prm.projNo,'=',e.sheet.p//e.proj.no);
				 ,'&',Prm.buildingNo,'=',e.sheet.b//e.bld.no);
				 ,'&',Prm.floorNo,'=',e.sheet.f//e.flr.no);
				 ,'&',Prm.sheetNo,'=',e.sheet.no,'"','>',serialNo
				 ,"</a></h3>\r\n"
				 ,"\t\t\t\t\t<time class=\"published\" datetime=\"2015-10-15\">",e.sheet.dt//get("datetime") );
				 ,"</time>\r\n"
				 ,"\t\t\t\t</header>\r\n"
				 ,"\t\t\t\t\t<a href=\"#\" class=\"image\"><img src=\"images/pic",sn<10?"0":"",sn
				 ,".jpg\" alt=\"\" /></a>\r\n"
				 ,"\t\t\t</article>\r\n"
				 ,"\t\t</li>\r\n"
				 ,"\t\t");
		}//for row
	}//jspSheets

	void jspAbout_Footer() throws IOException{
		tl.o("\r\n"
			 ,"\t\t\t\t\t\t\t\t</ul>\r\n"
			 ,"\t\t\t\t\t\t\t</section>\r\n"
			 ,"\r\n"
			 ,"\t\t\t\t\t\t<!-- About -->\r\n"
			 ,"\t\t\t\t\t\t\t<section class=\"blurb\">\r\n"
			 ,"\t\t\t\t\t\t\t\t<h2>About</h2>\r\n"
			 ,"\t\t\t\t\t\t\t\t<p>The Project is headed by Dr Zafer Sakka zsakka@kisr.edu.kw , The Web-application is implemented by Mohamad Buhamad mbohamad@kisr.edu.kw</p>\r\n"
			 ,"\t\t\t\t\t\t\t\t<ul class=\"actions\">\r\n"
			 ,"\t\t\t\t\t\t\t\t\t<li><a href=\"#\" class=\"button\">Learn More</a></li>\r\n"
			 ,"\t\t\t\t\t\t\t\t</ul>\r\n"
			 ,"\t\t\t\t\t\t\t</section>\r\n"
			 ,"\r\n"
			 ,"\t\t\t\t\t\t<!-- Footer -->\r\n"
			 ,"\t\t\t\t\t\t\t<section id=\"footer\">\r\n"
			 ,"\t\t\t\t\t\t\t\t<ul class=\"icons\">\r\n"
			 ,"\t\t\t\t\t\t\t\t\t<li><a href=\"#\" class=\"fa-twitter\"><span class=\"label\">Twitter</span></a></li>\r\n"
			 ,"\t\t\t\t\t\t\t\t\t<li><a href=\"#\" class=\"fa-facebook\"><span class=\"label\">Facebook</span></a></li>\r\n"
			 ,"\t\t\t\t\t\t\t\t\t<li><a href=\"#\" class=\"fa-instagram\"><span class=\"label\">Instagram</span></a></li>\r\n"
			 ,"\t\t\t\t\t\t\t\t\t<li><a href=\"#\" class=\"fa-rss\"><span class=\"label\">RSS</span></a></li>\r\n"
			 ,"\t\t\t\t\t\t\t\t\t<li><a href=\"#\" class=\"fa-envelope\"><span class=\"label\">Email</span></a></li>\r\n"
			 ,"\t\t\t\t\t\t\t\t</ul>\r\n"
			 ,"\t\t\t\t\t\t\t\t<p class=\"copyright\">&copy;K.I.S.R.</p>\r\n"
			 ,"\t\t\t\t\t\t\t</section>\r\n"
			 ,"\t\t\t\t\t</section>\r\n");
	}//jspAbout_Footer

	void jspSheet()throws IOException, SQLException{
		App e=this;
		if(e.sheet!=null && e.sheet.no!=null && (e.sheet.jsonRef==null || e.sheet.m==null || e.sheet.m.get(TL.DB.Tbl.Json.Jr)==null))
			try{	if(e.sheet.jsonRef==null)
				e.sheet.jsonRef=TL.DB.q1int(
											"select `"+Sheet.C.jsonRef
											+"` from `"+e.sheet.getName()
											+"` where `"+Sheet.C.no
											+"`=?", -1, e.sheet.no);
				if(e.sheet.m==null)
					e.sheet.m=TL.Util.mapCreate(TL.DB.Tbl.Json.Jr, e.sheet.jsonRef);
				else
					e.sheet.m.put(TL.DB.Tbl.Json.Jr, e.sheet.jsonRef);
				//e.sheet.m=TL.DB.Tbl.Json.LoadRef(e.sheet.m);
			}catch(Exception ex){
				tl.error(ex,"eu059s.App:SheetScreen:load Sheet and Json map");}
		Object ft="-";
		try{
			e.sheet.m=TL.DB.Tbl.Json.LoadRef(e.sheet.m);
			ft=e.flr.json.get("title");}
		catch(Exception ex){tl.error(ex,"eu059s:ex:");}

		tl.o("\r\n"
			 ,"<script>\r\n"
			 ,"sheet=",e.sheet.toJson()
			 ,"\r\n"
			 ,"sheet.json=",tl.jo().clrSW().o(e.sheet.get()).toString()
			 ,"\r\n"
			 ,"\r\n"
			 ,"sheet.json.p={no:",e.proj.no
			 ,",title:",tl.jo().clrSW().o(e.proj.json.get("title")).toString()
			 ,"}\r\n"
			 ,"sheet.json.b={no:",e.bld.no
			 ,",title:",tl.jo().clrSW().o(e.bld.json.get("title")).toString()
			 ,"}\r\n"
			 ,"sheet.json.f={no:",e.flr.no
			 ,",title:",tl.jo().clrSW().o(ft).toString(),'}'
			 ,"\r\n"
			 ,"sheet.json.u={no:",e.sheet.u
			 ,",title:");

		TL.DB.Tbl.Usr author=null;
		try{author=usr(e.sheet.u);}
		catch(Exception ex){tl.error(ex,"eu059s : sheet: usr: ",e.sheet);}
		Object authorName=author!=null && author.json!=null
		?author.json.get("name"):author!=null?author.un:"-";

		tl.o( tl.jo().clrSW().o( authorName ).toString(),'}'
			 ,"\r\n"
			 ,"setFormData(sheet)\r\n"
			 ,"</script>\r\n");
	}//jspSheet

	void jsp03() throws IOException{
		tl.o("\r\n"
			 ,"\t\t\t</div>\r\n"
			 ,"\r\n"
			 ,"\t\t<!-- Scripts -->\r\n"
			 ,"\t\t\t<script src=\"assets/js/jquery.min.js\"></script>\r\n"
			 ,"\t\t\t<script src=\"assets/js/skel.min.js\"></script>\r\n"
			 ,"\t\t\t<script src=\"assets/js/util.js\"></script>\r\n"
			 ,"\t\t\t<!--[if lte IE 8]><script src=\"assets/js/ie/respond.min.js\"></script><![endif]-->\r\n"
			 ,"\t\t\t<script src=\"assets/js/main.js\"></script>\r\n");
	}

	public static void jsp
	(HttpServletRequest request
	 ,HttpServletResponse response
	 ,javax.servlet.http.HttpSession session
	 ,JspWriter out
	 ,javax.servlet.jsp.PageContext pageContext)
    throws IOException, javax.servlet.ServletException
    {TL tl=null;try{tl=TL.Enter(request,out);
		Prm.Op op=tl.req(Prm.op.toString(),Prm.Op.none);tl.logo("index:1:",op);
		response.setContentType("text/html; charset=UTF-8");
		tl.logOut=tl.var("logOut",false);
		App e=App.app(tl).init();
		e.init2(op);
		e.doOp(op);
		int sIx=e.screen==Prm.Screen.ProjectScreen?0
        :e.screen==Prm.Screen.BuildingScreen?1
		:e.screen==Prm.Screen.FloorScreen?2
		:e.screen==Prm.Screen.Sheet?3
		:-1;
		TL.DB.Tbl tbl=sIx==0?e.proj:sIx==1?
		e.bld:sIx==2?e.flr:sIx==3?e.sheet:null;
		e.jsp01();
		e.jspMenu();

		if(e.screen==Prm.Screen.Sheet)
		{pageContext.include("fragment.html");
			e.jspSheet();
		}
		else
		{	e.jspMain();
			if(e.screen==Prm.Screen.UsersList)
				e.jspScreenUsersList();
			else if(e.screen==Prm.Screen.ConfigMenu)
				e.jspScreenConfig();
			else if(e.screen==Prm.Screen.ProjectsList)
				e.jspScreenProjectsList();
			else if(e.screen==Prm.Screen.ProjectScreen)
				e.jspScreenProject();
			else if(sIx>0) {
				//jsp breadcrumb proj
				tl.o("<a href=\"?",Prm.screen,'=',Prm.Screen.ProjectScreen,'&',Prm.projNo,'=',e.proj.no,"\">",e.title(e.proj),"</a> / ");

				if(e.screen==Prm.Screen.BuildingScreen)
					e.jspScreenBuilding();//jsp bld
				else {// jsp breadcrumb bld
					tl.o("<a href=\"?",Prm.screen,'=',Prm.Screen.BuildingScreen,'&',Prm.buildingNo,'=',e.bld.no,"\">",e.title(e.bld),"</a> / ");

					//if(e.screen==Prm.Screen.FloorScreen);
					// jsp floor
					e.jspScreenFloor();
				}
			}
			e.jspIntro();
			e.jspPosts();
			//if(sIx>=0) e.jspSheets();
			e.jspAbout_Footer();
		}//! e.sheet
		e.jsp03();
	}
        catch(Exception x){
            if(tl!=null)
                tl.error(x,"/adoqs/index.jsp:");
            else
                x.printStackTrace();}
        finally{try{
            List l=tl!=null && tl.response!=null?(
												  List)tl.response.get(TL.DB.ItTbl.ErrorsList):null;
            if(l!=null)//errors from TL.DB.ItTbl iterator
                tl.o("<!--",l,"-->");
        }catch(Exception ex){}
            TL.Exit();
        }
		out.write("</body></html>");
	}//jsp

