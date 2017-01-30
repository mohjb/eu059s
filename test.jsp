<%@ page import=" java.io.IOException,
 java.io.ObjectInputStream,
 java.io.OutputStream,
 java.io.OutputStreamWriter,
 java.io.PipedInputStream,
 java.io.PipedOutputStream,
 java.io.PrintWriter,
 java.io.StringWriter,
 java.io.Writer,
 java.io.File,
 java.lang.reflect.Array,
 java.lang.reflect.Field,
 java.net.URL,
 java.sql.Connection,
 java.sql.PreparedStatement,
 java.sql.ResultSet,
 java.sql.ResultSetMetaData,
 java.sql.SQLException,
 java.sql.Statement,
 java.util.Collection,
 java.util.Date,
 java.util.Enumeration,
 java.util.HashMap,
 java.util.Iterator,
 java.util.LinkedList,
 java.util.List,
 java.util.Map,
 javax.servlet.ServletConfig,
 javax.servlet.ServletContext,
 javax.servlet.http.Cookie,
 javax.servlet.http.HttpServletRequest,
 javax.servlet.http.HttpSession,
 com.mysql.jdbc.jdbc2.optional.MysqlConnectionPoolDataSource,
 org.apache.commons.fileupload.FileItem,
 org.apache.commons.fileupload.disk.DiskFileItemFactory,
 org.apache.commons.fileupload.servlet.ServletFileUpload,
 fm.tl.TL,
 fm.tl.Util,
 fm.tl.Form,
 fm.tl.db.DB,
 fm.tl.db.ItTbl,
 fm.tl.db.tbl.Tbl,
 fm.tl.db.tbl.Cols,
 fm.tl.db.tbl.Usr,
 fm.tl.db.tbl.Ssn,
 fm.tl.db.tbl.Log"
%><%App.jsp(request, response, session, out, pageContext);%><%!

	enum context{ROOT(
					  "/public_html/theblueone/eu059s/v1/"
					  ,"/Users/moh/apache-tomcat-8.0.30/webapps/ROOT/"
					  ,"C:\\Users\\mbohamad\\WebApplicationEU059S\\web/"
					  ,"D:\\apache-tomcat-8.0.15\\webapps\\ROOT/"
					  );
		String str,a[];context(String...p){str=p[0];a=p;}
		enum DB{
			pool("dbpool-eu059s")
			,reqCon("javax.sql.PooledConnection")
			,server("216.227.216.46","216.227.220.84","localhost")
			,dbName("js4d00_eu059s","eu059s")
			,un("js4d00_theblue","root")
			,pw("theblue","qwerty","root","");
			String str,a[];DB(String...p){str=p[0];a=p;}
		}

	}//context

public static class App {

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

	static Usr usr(Object uid){
		Usr u=new Usr();
		u.load(uid);return u;}

	static Map getJ(Tbl p){
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
		if(o==null || !(o instanceof App))
			tl.s(SsnNm,o=new App());
		App e=(App)o;e.tl=tl;
		if(tl.usr==null && tl.a(SsnNm+".checkDBTCreation")==null
		   ){
			e.proj.checkDBTCreation(tl);
			e.bld .checkDBTCreation(tl);
			e.flr .checkDBTCreation(tl);
			e.sheet.checkDBTCreation(tl);
			new Json().checkDBTCreation(tl);
			new Usr().checkDBTCreation(tl);
			new Ssn().checkDBTCreation(tl);
			new Log().checkDBTCreation(tl);
			tl.a(SsnNm+".checkDBTCreation",tl.now);
		}return e;}

	/**path to the uploaded files for Sheet (the sheet stored in the session)*/
	public String getUploadPath(){
		init();//if(proj.no!=sheet.p)proj.no=sheet.p;
		if(bld.no==-1)//sheet.b
			bld.no=sheet.b;
		if(flr.no==-1)//!=sheet.f
			flr.no=sheet.f;
		return UploadPth//+proj.no+'/'+bld.no+'/'+flr.no+'/'+sheet.no+'/'
		+sheet.p+'/'+sheet.b+'/'+sheet.f+'/'+sheet.no+'/';}


	App init(){try{
		screen=tl.var(Prm.screen.toString(),Prm.Screen.ProjectsList);
		if( tl.s(SsnNm)!=this )
			tl.s( SsnNm , this );

		Integer n=tl.var(Prm.projNo.toString(),-1).intValue();//proj.no);
		if(n!=proj.no && n!=-1)
			proj.load(n);

		n=tl.var(Prm.buildingNo.toString(),-1).intValue();//bld.no);
		if(n!=bld.no && n!=-1)
			bld.load(n);

		n=tl.var(Prm.floorNo.toString(),-1).intValue();//flr.no);
		if(n!=flr.no && n!=-1)
			flr.load(n);

		n=tl.var(Prm.sheetNo.toString(),-1).intValue();//sheet.no);
		if(n!=sheet.no){if( n!=-1)
		{	sheet.load(n);
			Json j=sheet.json();
			j.json=sheet.m=j.LoadRef(j.jsonRef);
			//if(sheet.f!=flr.no)flr.load(sheet.f);
		}//else sheet.m=null;
		}
		if(sheet!=null && sheet.no!=null && sheet.jsonRef==null)
			sheet.jsonRef=DB.q1int(
				"select `"+Sheet.C.jsonRef
				+"` from `"+sheet.getName()
				+"` where `"+Sheet.C.no
				+"`=?", -1, sheet.no);
	}catch(Exception ex){
		tl.error(ex,SsnNm,".init");}
		return this;
	}//init

	String title(Tbl t){Map j=getJ(t);
		Object ttl=j==null?null:j.get("title");
		String r=ttl==null?"title"+t:ttl.toString();
        return r;}

	String author(Tbl t){
		Map j=getJ(t);
		Usr author=null;
		Object a=j==null?null:j.get("author");
		if(a!=null)try{author=usr(a);}
		catch(Exception ex){tl.error(ex,"eu059s.App.author");}
		Object authorName=author!=null && author.json!=null?author.json.get("name"):author!=null?author.un:null;
		String r= authorName==null?"author:"+t:authorName.toString();
        return r;}

	void saveSheet() throws Exception{
		tl.log("op-saveSheet");
		Json json=sheet.json();
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

	void doOp(Prm.Op op){
		try{
			if(op!=null)
				switch(op){
					case newProject:
						proj.no=null;//DB.q1int("select max(`no`)+1 from projects;", 1);
						proj.json=Util.mapCreate("title","Project "+tl.now
													, "date",Util.formatDate( tl.now )
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
						bld.json=Util.mapCreate("date",Util.formatDate( tl.now )
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
						flr.json=Util.mapCreate("date", Util.formatDate( tl.now )
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
						sheet.jsonRef=Json.jrmp1();
						sheet.m=sheet.asMap();
						sheet.m.put("datetime", Util.formatDate(sheet.dt ));
						Json j=sheet.json();sheet.m.put(j.Jr,j.jsonRef);
						sheet.save();
						sheet.m.put("no", sheet.no);
						j.save(sheet.m);
						tl.s(Prm.sheetNo.toString(), sheet.no);
						tl.s(Prm.screen.toString(), screen=Prm.Screen.Sheet);
					}break;
					case saveSheet:saveSheet();break;
					case deleteSheet://deleteImages();
						sheet.delete();
						tl.s(Prm.sheetNo.toString(), sheet.no=-1);
						screen=Prm.Screen.FloorScreen;
						break;

						//case sheetImg:break;
						//case uploadSheetImg:break;
						//case listUsers:break;
					case newUser:
						Usr u=new Usr();
						u.readReq("");//u .j=Util.mapCreate name tel gender address email tel-ext id cid	"avatar","avatar.jpg"
						u.uid=null;
						u.save();
						tl.s(Prm.screen.toString(), Prm.Screen.User);
						break;
						//case editUser	:u=new Usr();u.readReq_save();break;
					case deleteUser:
						u=new Usr();u.readReq("");
						u.delete();
						tl.s(Prm.screen.toString(),screen=Prm.Screen.UsersList);break;
					case xhrEdit:{
						tl.log("eu059s/index.jsp : op==xhrEdit");
						if(tl.response==null)tl.response=Util.mapCreate();
						Util.mapSet(tl.response,"msg","um...");
						String entity=tl.req("entity");
						Map v=(Map)tl.json.get("v");
						Integer pk=tl.req("pk",-1);
						Tbl t="project".equals(entity)?proj
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
			Usr u=Usr.login();tl.logo("index:5:login");
			if(u!=null){u.onLogin();
				Log.log(Log.Entity.usr
								  , tl.usr.uid
								  , Log.Act.Login
								  , Util.mapCreate("usr",tl.usr,"request",tl.req));
			}else// msg="incorrect login";
				Log.log(Log.Entity.usr
								  , tl.usr.uid, Log.Act.Log
								  ,Util.mapCreate("msg","incorrect login","request",tl.req));
			//tl.logo("index:6:login:msg=",msg);
		}

		if(tl.usr==null && tl.getSession().isNew())
			Log.log(Log.Entity.ssn, -1, Log.Act.Log,
				Util.mapCreate("msg","new Connection","request",tl.req));

		if(tl.usr!=null&&op==Prm.Op.logout)
		{ Log.log(Log.Entity.usr, tl.usr.uid
							, Log.Act.Logout
							,Util.mapCreate("usr",tl.usr));
			tl.ssn.onLogout();}

		if(tl.usr==null){try{//tl.o("version 2016.05.04 08:36");
			//pageContext.include("flat-login-form/index.html");
			tl.o("<script>location=\"m.txt.html\"</script>");
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
			 ,"\t\t<meta charset=\"utf-8\" serverVersion=\"2017/01/18/15:23\"/>\r\n"
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
			 ,"<h1>Users</h1><table><tr>User-Name</tr><tr>User-Level</tr><\r\n"
			 );
		tl.o("</table><a href=\"?",Prm.op,'=',Prm.Op.newUser,"\">New User</a>","\r\n");
	}//jspScreenUsersList

	void jspScreenConfig() throws IOException{
		tl.o("<h1>Config</h1>","Change Password");
	}//jspScreenConfig

	void jspScreenProjectsList() throws IOException{
		App e=this;int serialNo=0;//Project p=new Project();
		tl.o("<h1>Projects</h1><table><tr><th>sn</th><th>Title</th><th>Desc</th><th>Created</th><th>by</th><th>Description</th><th>#Buildings</th><th>#Sheets</th></tr>");
		for(Tbl row:e.proj.query(Tbl.where( )))try
		{Usr author=null; if(e.proj.json==null)e.proj.json=Util.mapCreate();
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
				 ,"<td class=\"stats\"><a title=\"number of buildings in this project\" class=\"icon fa-heart\" name=\"heart\">",DB.q1int("select count(*) from buildings where p=?",-1,e.proj.no)
				 ,"</a></td>"
				 ,"<td><a title=\"number of sheets in this project\" href=\"#\" class=\"icon fa-comment\" name=\"comment\">",DB.q1int("select count(*) from sheets where p=?",-1,e.proj.no)
				 ,"</a></td footer></tr>\r\n");
		}catch(Exception ex){tl.error(ex,"eu059s : Projects list for-loop ,proj=",e.proj);}
		tl.o("</table><a href=\"?"
			 ,Prm.screen,'=',Prm.Screen.ProjectScreen
			 ,'&',Prm.op,'=',Prm.Op.newProject,"\">New Project</a>");
	}//jspScreenProjectsList

	void jspScreenProject() throws IOException, SQLException {
		App e=this;int serialNo=1;
		serialNo=1;
		tl.o("<h1>Project</h1><table><tr><th>Title</th><th>Desc</th><th>Created</th><th>by</th><th>Description</th><th>Actions</th><th>#Buildings</th><th>#Sheets</th></tr>");
		try
		{ //if(e.proj.json==null)e.proj.json=Util.mapCreate();try{author=usr(e.proj.json.get("author"));} catch(Exception ex){tl.error(ex,"eu059s : project :author ,proj=",e.proj);}
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
				 ,DB.q1int("select count(*) from buildings where p=?",-1,e.proj.no)
				 ,"</a></td><td><a title=\"number of sheets in this project\" href=\"#\" class=\"icon fa-comment\" name=\"comment\">"
				 ,DB.q1int("select count(*) from sheets where p=?",-1,e.proj.no)
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

		for(Tbl row:e.bld.query(Tbl.where(Building.C.p,e.proj.no )))
		{Usr author=usr(e.bld.json.get("author"));
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
				 ,"<td class=\"stats\"><a title=\"number of floors in this building\" class=\"icon fa-heart\" name=\"heart\">",DB.q1int("select count(*) from floors where b=?",-1,e.bld.no)
				 ,"</a></td>\r\n"
				 ,"<td><a title=\"number of sheets in this building\" href=\"#\" class=\"icon fa-comment\" name=\"comment\">",DB.q1int("select count(*) from sheets where b=?",-1,e.bld.no)
				 ,"</a></td></tr>\r\n");
		}tl.o("</table>");
	}//jspScreenBuildingList    //jspScreenProject

	void jspScreenBuilding()throws IOException, SQLException{
		App e=this;int serialNo=1;
		Usr author=usr(e.bld.json.get("author"));
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
			 ,"<td style=\"display:inline;	list-style: none;\" ><a title=\"number of floors in this building\" class=\"icon fa-heart\" name=\"heart\">",DB.q1int("select count(*) from floors where b=?",-1,e.bld.no)
			 ,"</a></td>\r\n"
			 ,"<td style=\"display:inline;	list-style: none;\" ><a title=\"number of sheets in this project\" href=\"#\" class=\"icon fa-comment\" name=\"comment\">",DB.q1int("select count(*) from sheets where b=?",-1,e.bld.no)
			 ,"</a></td></tr></table>\r\n");
		//if(e.screen==Prm.Screen.BuildingScreen)
		{serialNo=0;
			tl.o("<h1>Floors</h1><table><tr><th>sn</th><th>Title</th><th>Notes</th><th>Created</th><th>by</th><th>#Sheets</th></tr>");
			for(Tbl row:e.flr.query(Tbl.where(Floor.C.b,e.bld.no )))
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
					 ,"<td class=\"stats\"><a title=\"number of sheets in this floor\" href=\"#\" class=\"icon fa-comment\" name=\"comment\">",DB.q1int("select count(*) from sheets where f=?",-1,e.flr.no)
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
			 ,DB.q1int("select count(*) from sheets where f=?",-1,e.flr.no)
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
		for(Tbl row:e.sheet.query(Tbl.where(
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
		if(e.sheet!=null && e.sheet.no!=null && (e.sheet.jsonRef==null || e.sheet.m==null || e.sheet.m.get(Json.Jr)==null))
			try{	if(e.sheet.jsonRef==null)
				e.sheet.jsonRef=DB.q1int(
											"select `"+Sheet.C.jsonRef
											+"` from `"+e.sheet.getName()
											+"` where `"+Sheet.C.no
											+"`=?", -1, e.sheet.no);
				if(e.sheet.m==null)
					e.sheet.m=Util.mapCreate(Json.Jr, e.sheet.jsonRef);
				else
					e.sheet.m.put(Json.Jr, e.sheet.jsonRef);
				//e.sheet.m=Json.LoadRef(e.sheet.m);
			}catch(Exception ex){
				tl.error(ex,"eu059s.App:SheetScreen:load Sheet and Json map");}
		Object ft="-";
		try{
			e.sheet.m=Json.LoadRef(e.sheet.m);
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

		Usr author=null;
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
		Tbl tbl=sIx==0?e.proj:sIx==1?
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
												  List)tl.response.get(ItTbl.ErrorsList):null;
            if(l!=null)//errors from DB.ItTbl iterator
                tl.o("<!--",l,"-->");
        }catch(Exception ex){}
            TL.Exit();
        }
		out.write("</body></html>");
	}//jsp



	public static class Sheet extends Tbl {//implements Serializable
		public static final String dbtName="sheets";

		@Override public String getName(){return dbtName;}//public	Ssn(){super(Name);}
		@Form.F public Integer no,p,b,f,u,jsonRef;@Form.F public Date dt;

		public Map m;

		public Map get() {
			if(m==null)m=Util.mapCreate("title","-");
			return m;}

		public Json json() {
			Json j=new Json();
			j.jsonRef=jsonRef;
			j.json=get();
			if(jsonRef==null)
				j.jsonRef=jsonRef=Json.jrn(j.json);//(Integer)j.mv().get(j.Jr);
			return j;}

		public Object get(String p) {
			return get().get(p);}

		public Map set(Json p) throws Exception{
			if(p!=null){ if(jsonRef!=p.jsonRef)
			{jsonRef=p.jsonRef;
				save();
			}	m=p.mv();
			}
			return get();}

		public enum C implements Tbl.CI{no,p,b,f,u,jsonRef,dt;
			@Override public Class<? extends Tbl>cls(){return Sheet.class;}
			@Override public Class<? extends Form>clss(){return cls();}
			@Override public String text(){return name();}
			@Override public Field f(){return Cols.f(name(), cls());}
			@Override public Tbl tbl(){return Tbl.tbl(cls());}
			@Override public void save(){tbl().save(this);}
			@Override public Object load(){return tbl().load(this);}
			@Override public Object value(){return val(tbl());}
			@Override public Object value(Object v){return val(tbl(),v);}
			@Override public Object val(Form f){return f.v(this);}
			@Override public Object val(Form f,Object v){return f.v(this,v);}
		}//C

		@Override public Tbl.CI pkc(){return C.no;}
		@Override public Object pkv(){return no;}
		@Override public C[]columns(){return C.values();}

		@Override public List creationDBTIndices(TL tl){
			return Util.lst(
			 Util.lst("int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT"//no
			   ,"int(11) NOT NULL"//p
			   ,"int(11) NOT NULL"//b
			   ,"int(11) NOT NULL"//f
			   ,"int(11) NOT NULL"//u
			   ,"int(18) NOT NULL"//jsonRef
			   ,"timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP "//dt
			   ),Util.lst(C.p,C.b,C.f,C.u,C.jsonRef,C.dt));/*
			   CREATE TABLE `sheets` (
			   `no` int(11) NOT NULL,
			   `p` int(11) DEFAULT NULL,
			   `b` int(11) DEFAULT NULL,
			   `f` int(11) DEFAULT NULL,
			   `jsonRef` int(18) NOT NULL,
			   `dt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
			   `u` int(11) DEFAULT NULL,
			   PRIMARY KEY (`no`)
			   ) ENGINE=InnoDB DEFAULT CHARSET=utf8


			   }//checkTableCreation*/}

	}//class Sheet

	public static class Project extends Tbl {//implements Serializable
		public static final String dbtName="projects";
		@Override public List creationDBTIndices(TL tl){
			return Util.lst(
				Util.lst("int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT"//p
				   ,"text"//json
				   ));
			/*projects,sheets,imgs

			 CREATE TABLE `projects` (
			 `no` int(11) NOT NULL,
			 `title` varchar(255) DEFAULT NULL,
			 `j` json DEFAULT NULL,
			 PRIMARY KEY (`no`)
			 ) ENGINE=InnoDB DEFAULT CHARSET=utf8 ;
			 insert into projects values();

			
			 */

			/*
			 create database eu059s;
			 use eu059s;

			 */}
		@Override public String getName(){return dbtName;}//public	Ssn(){super(Name);}
		@Form.F public Integer no;
		@Form.F(json=true) public Map json;

		public enum C implements Tbl.CI{no,json;
			@Override public Class<? extends Tbl>cls(){return Project.class;}
			@Override public Class<? extends Form>clss(){return cls();}
			@Override public String text(){return name();}
			@Override public Field f(){return Cols.f(name(), cls());}
			@Override public Tbl tbl(){return Tbl.tbl(cls());}
			@Override public void save(){tbl().save(this);}
			@Override public Object load(){return tbl().load(this);}
			@Override public Object value(){return val(tbl());}
			@Override public Object value(Object v){return val(tbl(),v);}
			@Override public Object val(Form f){return f.v(this);}
			@Override public Object val(Form f,Object v){return f.v(this,v);}

		}//C

		@Override public Tbl.CI pkc(){return C.no;}
		@Override public Object pkv(){return no;}
		@Override public C[]columns(){return C.values();}

	}//class Project


	public static class Building extends Tbl {//implements Serializable
		public static final String dbtName="buildings";
		@Override public List creationDBTIndices(TL tl){
			return Util.lst(
			   Util.lst("int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT"//no
				   ,"int(11) NOT NULL"//p
				   ,"text"//json
				   ),Util.lst(Util.lst(C.p)));
			/*
			 CREATE TABLE `buildings` (
			 `no` int(11) NOT NULL primary key,
			 `p` int(11) NOT NULL ,
			 `j` json DEFAULT NULL,
			 KEY (`p`)
			 ) ENGINE=InnoDB DEFAULT CHARSET=utf8 ;
			 insert into projects values();
			 */}
		@Override public String getName(){return dbtName;}
		@Form.F public Integer no,p;
		@Form.F(json=true) public Map json;

		public enum C implements Tbl.CI{no,p,json;
			@Override public Class<? extends Tbl>cls(){return Building.class;}
			@Override public Class<? extends Form>clss(){return cls();}
			@Override public String text(){return name();}
			@Override public Field f(){return Cols.f(name(), cls());}
			@Override public Tbl tbl(){return Tbl.tbl(cls());}
			@Override public void save(){tbl().save(this);}
			@Override public Object load(){return tbl().load(this);}
			@Override public Object value(){return val(tbl());}
			@Override public Object value(Object v){return val(tbl(),v);}
			@Override public Object val(Form f){return f.v(this);}
			@Override public Object val(Form f,Object v){return f.v(this,v);}

		}//C

		@Override public Tbl.CI pkc(){return C.no;}
		@Override public Object pkv(){return no;}
		@Override public C[]columns(){return C.values();}

	}//class Building


	public static class Floor extends Tbl {//implements Serializable
		public static final String dbtName="floors";

		@Override public List creationDBTIndices(TL tl){
			return Util.lst(
			   Util.lst("int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT"//no
				   ,"int(11) NOT NULL"//p
				   ,"int(11) NOT NULL"//b
				   ,"text"//json
				   ),Util.lst(Util.lst(C.p,C.b)));/*
					 CREATE TABLE `floors` (
					 `no` int(11) NOT NULL primary key,
					 `p` int(11) NOT NULL,
					 `b` int(11) NOT NULL,
					 `j` json DEFAULT NULL,
					 KEY (`p`,`b`)
					 ) ENGINE=InnoDB DEFAULT CHARSET=utf8 ;
					 insert into floors values();
							 */}

		@Override public String getName(){return dbtName;}//public	Ssn(){super(Name);}
		@Form.F public Integer no,p,b;
		@Form.F(json=true) public Map json;

		public enum C implements Tbl.CI{no,p,b,json;
			@Override public Class<? extends Tbl>cls(){return Floor.class;}
			@Override public Class<? extends Form>clss(){return cls();}
			@Override public String text(){return name();}
			@Override public Field f(){return Cols.f(name(), cls());}
			@Override public Tbl tbl(){return Tbl.tbl(cls());}
			@Override public void save(){tbl().save(this);}
			@Override public Object load(){return tbl().load(this);}
			@Override public Object value(){return val(tbl());}
			@Override public Object value(Object v){return val(tbl(),v);}
			@Override public Object val(Form f){return f.v(this);}
			@Override public Object val(Form f,Object v){return f.v(this,v);}

		}//C

		@Override public Tbl.CI pkc(){return C.no;}
		@Override public Object pkv(){return no;}
		@Override public C[]columns(){return C.values();}

	}//class Floor


public static class Json extends Tbl{
	enum Typ{Int,dbl,str,bool,dt,jsonRef,javaObjectDataStream;//,file,function,codeJson

		Object load(ResultSet rs){
			final int col=3;try{switch(this){
				case Int:return rs.getInt(col);
				case dbl:return rs.getDouble(col);
				case str:return rs.getString(col);
				case bool:{byte b=rs.getByte(col);return b==0?false:b==1?true:null;}
				case dt:return rs.getDate(col);
				case jsonRef:Long ref=rs.getLong(col);return Util.mapCreate(Jr,ref);
				case javaObjectDataStream:java.sql.Blob b=rs.getBlob(col);
					java.io.ObjectInputStream s=new ObjectInputStream( b.getBinaryStream());
					Object o=s.readObject();s.close();
					return o;
			}}catch(Exception ex){TL.tl().error(ex, "eu059s.testJsp.App.Json.Typ.get");}
			return null;
		}//get(ResultSet)

		static Typ typ(Object p){
			if(p==null || p instanceof Boolean)return bool;
			if(p instanceof String)return str;
			if(p instanceof Number)return p instanceof Double||p instanceof Float?dbl:Int;
			if(p instanceof Date)return dt;
			if(p instanceof Map && ((Map)p).containsKey(Jr))return jsonRef;
			return javaObjectDataStream;
		}

	} //enum Typ

	@Override public List creationDBTIndices(TL tl){
		return Util.lst(
			Util.lst("int(24) PRIMARY KEY NOT NULL AUTO_INCREMENT"//no
				,"int(18) NOT NULL"//jsonRef
				,"text not null"//path
				,"enum('Int','dbl','str','bool','dt','jsonRef','javaObjectDataStream') NOT NULL"//typ
				,"blob"//json
				)
			 ,Util.lst(Util.lst("unique key (",C.jsonRef,Util.lst(C.path,64))
				,Util.lst(C.typ,Util.lst(C.json,64))
				,Util.lst(Util.lst(C.path,64),Util.lst(C.json,64))
				)
			);/*
			Create table `Json`(
			`no` int(24) primary key auto_increment,
			`jsonRef` int(18) not null,
			`path` text not null,
			`typ` enum( 'Int' , 'dbl' , 'str' , 'bool' , 'dt' , 'jsonRef', ‘javaObjectDataStream’	) not null, --	, ‘file’ ,'function','codeJson','javaMap'
			`json` blob ,
			Unique ( `jsonRef` , `path`(64) ) ,
			key(`typ`,`json`(64)) ,
			key( `path`(64) , `typ`,`json`(64) )
			);*/}

	@F public Integer no,jsonRef;
	@F public String path;
	@F public Typ typ;
	@F public Object json;

	Map mv(){return json instanceof Map?(Map)json:asMap();}

	public enum C implements CI{no,jsonRef,path,typ,json;
		@Override public Class<? extends Tbl>cls(){return Json.class;}
		@Override public Class<? extends Form>clss(){return cls();}
		@Override public String text(){return name();}
		@Override public Field f(){return Cols.f(name(), cls());}
		@Override public Tbl tbl(){return Tbl.tbl(cls());}
		@Override public void save(){tbl().save(this);}
		@Override public Object load(){return tbl().load(this);}
		@Override public Object value(){return val(tbl());}
		@Override public Object value(Object v){return val(tbl(),v);}
		@Override public Object val(Form f){return f.v(this);}
		@Override public Object val(Form f,Object v){return f.v(this,v);}
	}//C

	@Override public CI pkc(){return C.no;}
	@Override public Object pkv(){return no;}
	@Override public CI[]columns(){return C.values();}
	public static final String dbtName="json",Jr=Typ.jsonRef.toString();

	@Override public String getName(){return dbtName;}//public	Ssn(){super(Name);}

	static Object get(Object o,String[]p,int i){
		if(o instanceof Map){Map m=(Map)o;
			String n=p[i];
			o=m.get(n);
			if(i<p.length)
				o=get(o,p,i+1);
		}else if(o instanceof Object[])
		{int j=Util.parseInt(p[i], -1);
			if(j!=-1){
				Object[]a=(Object[])o;
				o=a[j];
				if(i<p.length)
					o=get(o,p,i+1);
			}
		}else if(o instanceof List)//Collection
		{int j=Util.parseInt(p[i], -1);
			if(j!=-1){
				List a=(List)o;
				o=a.get(j);
				if(i<p.length)
					o=get(o,p,i+1);
			}
		}
		return o;
	}//get

	/**load from dbt json all properties, param ref should have a prop "jsonRef"*/
	static Map LoadRef( Map ref ){TL tl=null;
		Object jsonRef=jr(ref);
		for(ItTbl.ItRow row:ItTbl.it(
			 "select `"+C.path+"`,`"+C.typ+"`,`"+C.json
			 +"` from `"+dbtName+"` where `"+C.jsonRef+"`=?", jsonRef))
			try{	String path=row.nextStr();Typ typ=Typ.valueOf(row.nextStr());
				int i=path.indexOf('.');Object v=typ.load(row.rs);if(i==-1)
				{Object o=ref.get(path);
					if(o==null)
						ref.put(path, v);
					else
						(tl==null?tl=TL.tl():tl).log("eu059s.testJsp.App.Json.LoadRef(Map ref):wont overwrite:",path);
				}
				else
					set(ref,path.split("\\."),v,0);
			}catch(Exception ex){
				(tl==null?tl=TL.tl():tl).error(ex,"eu059s.testJsp.App.Json.LoadRef:jr=",jsonRef,row);
			}
		ref.put(Jr, jsonRef);
		return ref;
	} // LoadRef

	/**remark(internal):o is parent*/
	static Object set(Object p,String[]path,Object v,int i){
		Object o=p;
		try{
			String s=path[i];int j=Util.parseInt(s, -1)
			,j1=i+1<path.length?Util.parseInt(path[i+1], -1):-1;
			if(o==null)
				o=j==-1&&j1==-1?Util.mapCreate():Util.lst();
			if(o instanceof Map){Map m=(Map)o;
				if(i==path.length-1)
					m.put(s, v);
				else if(i<path.length){
					o=m.get(s);
					if(o==null)
					{
						o=new HashMap();//Util.mapCreate();
						m.put(s,o);}
					o=set(o,path,v,i+1);
				}
			}else if(o instanceof List){List m=(List)o;//TODO: switch List to map in cases j==-1
				if(i==path.length-1)//TODO: check when j==-1 with o instanceof List
					m.set(j, v);
				else if(i<path.length){
					o=m.get(j);
					if(o==null){
						o=j==-1?Util.mapCreate():Util.lst();
						m.set(j,o);}
					o=set(o,path,v,i+1);
				}
			}}catch(Exception ex){
				TL.tl().error(ex,
							  "Json.set(Object o,String[]path,Object v,int i)"
							  , o ,path,v,i);}
		//if(i<path.length)o=set(o,path,v,i+1);
		return o;}

	static Map LoadRef( Object jsonRef ){
		Map m=jsonRef instanceof Map?(Map)jsonRef:
		//jsonRef instanceof Integer?:
		null;
		if(m!=null && m.get(Jr)==null)
			m.put(Jr, jrmp1());
		if(m==null) m=Util.mapCreate(Jr
										,//jsonRef instanceof Number?jsonRef:
										jsonRef);
		return LoadRef(m);
	} // LoadRef

	/**return from the db tbl the max value of jsonRef plus 1 ,javadoc-draft2016.08.17.11.10*/
	static int jrMaxPlus1() throws SQLException{
		int no= DB.q1int("select max(`"+C.jsonRef+"`)+1 from `"+dbtName+"`", 1);
		TL.tl().log("Json.jrMaxPlus1=",no);
		return no;}

	/**same as jrMaxPlus1 but the method signature doesnt throw anything ,javadoc-draft2016.08.17.11.10*/
	static int jrmp1(){try {
		return jrMaxPlus1();}catch (SQLException ex){}
		return 1;}

	/**get from the arg map the property jsonRef as an int, if not found return -1 ,javadoc-draft2016.08.17.11.10*/
	static int jr(Object m){
		Object o=m instanceof Map?((Map)m).get(Jr):null;
		return o==null?-1:((Number)o).intValue();}

	/**same as js but instead of -1 , returns jrmp1 ,javadoc-draft2016.08.17.11.10*/
	static int jrn(Object m){
		Object o=m instanceof Map?((Map)m).get(Jr):null;
		return o==null?jrmp1():((Number)o).intValue();}

	/**create an instance and set in the db tbl the name-value pairs, uses maPCreate ,javadoc-draft2016.08.17.11.10*/
	static Json create(Object...p) throws SQLException{
		Map m=maPCreate(p==null||p.length<1?null:Util.maPSet(new HashMap(), p));
		Json j=new Json();j.json=m;
		j.jsonRef=jr(m);
		return j;}

	/**convenience method with the variable length-arguments, uses maPCreate ,javadoc-draft2016.08.17.11.10*/
	static Map mapCreate(Object...p) throws SQLException{
		return maPCreate(p==null||p.length<1?null:Util.maPSet(new HashMap(), p));}

	/**create an instance and set in the db tbl the name-value pairs, if there is no prop jsonRef then uses jrMaxPlaus1 , uses Tbl.save ,javadoc-draft2016.08.17.11.10*/
	static Map maPCreate(Map m) throws SQLException{
		if(m==null)m=new HashMap();
		Object o= m.get(Jr) ;
		if(o ==null){
			int jr=jrMaxPlus1();
			m.put(Jr, jr);
		}save(m);return m;}

	/**return a list of all(objects :jsonRef) that have a ref to this jsonRef with the param- prop path*/
	Integer[]allFK(TL t,String prop){
		List l=null;try {l=DB.q1colList(
		   "select `jsonRef` from `Json` where `json`=? and `typ`=? and `path`=?"
		   , jsonRef , Json.Typ.jsonRef , prop );
		} catch (SQLException ex) {t.error(ex,"allFK");}
		int n=l==null?0:l.size();
		Integer[]a=new Integer[n];
		for(int i=0;i<n;i++)
			a[i]=((Number)l.get(i)).intValue();
		return a;}

	/**return a list of the Primary keys of all props with this.jsonRef*/
	Integer[]allNo(TL t){
		List l=null;try {l=DB.q1colList(
		   "select `no` from `Json` where `jsonRef`=? "
		   , jsonRef	);
		} catch (SQLException ex) {t.error(ex,"allNo");}
		int n=l==null?0:l.size();
		Integer[]a=new Integer[n];
		for(int i=0;i<n;i++)
			a[i]=((Number)l.get(i)).intValue();
		return a;}

	static Json load(int jr){
		Json j=new Json();
		j.json=loadProps(j.jsonRef=jr,null);
		return j;}

	/** load from dbTbl `json` all the properties into Map<String,Json>, where the props are tied by dbtColumn `jsonRef`, param jr (short for jsonRef)
	 if jr is negative , then jr is inited from prop jsonRef in param props, if also not found then NOTHING is processed.

	 //return a formal(general-struct) representation of all the properties in the json-obj/array,

	 Motivation: the need when updating from ajax .
	 must consider the case when the new ajax json(obj or array) has new props
	 , or ,
	 old-props that are not mention in the new axaj json
	 ,in a nutshell, Structural Change ,javadoc-draft2016.08.17.11.10*/
	static Map<String,Json>loadProps(int jr,Map<String,Json>props){// ,draft2016.08.17.11.10 , this method is the inspiration for db tbls master-detail (dbTbl:`Json` (head) ,and dbTbl:`jsonProp`)
		if(jr<0 && props!=null)
			jr=jr(props);
		if(jr<0)
			return props;
		if(props==null)
			props=new HashMap<String,Json>();
		for(ItTbl.ItRow row:ItTbl.it( "select `"
			 +C.no+"`,`"+C.path+"`,`"+C.typ+"`,`"+C.json+"` from `"
			 +dbtName+"` where `"+C.jsonRef+"`=?", jr))
		{Json j=new Json();j.jsonRef=jr;
			j.no=row.nextInt();
			j.path=row.nextStr();
			props.put(j.path,j);
			String ty=row.nextStr();
			j.typ=Typ.valueOf(ty);
			j.json=j.typ.load(row.rs);//this is beatiful (tear running down my cheek)
		}//for itrtr
		return props;
	}//loadProps

	/**get member-var json as Map<String,Json>, if necessary load from db, calls loadProps */
	Map<String,Json>prps(){
		Map<String,Json>m=null;
		if(json instanceof Map)//<String,Json>)
		{	m=(Map<String,Json>)json;
			//for(Object k:m.keySet())if()
			Object[]a=m.getClass().getTypeParameters();
			if(a==null|| a.length<2 || a[0]!=String.class || a[1]!=Json.class)
				m=loadProps(jsonRef,null);
		}
		else m=loadProps(jsonRef,null);
		return m;}//prps

	/** as can be clearly read from the source-code of the method body
	 , overwrites the super-class method.
	 according to the run-time type of what is stored in the member-variable(mmbrVrbl) `json`,
	 if mmbrVrbl-json is a Map then call(delegate the work) saveProps(Map) ,
	 if mmbrVrbl-json is a List then call(delegate the work) saveProps(List),
	 otherwise call(delegate the work) saveProp
	 ,javadoc-draft2016.08.17.11.10*/
	@Override public Tbl save() throws Exception{
		if(json instanceof Map)
			saveProps(TL.tl(),(Map)json);
		else if(json instanceof List)
			savePropList(TL.tl(),"",(List)json,prps());
		else
			saveProp(TL.tl(),"",Typ.typ(json),json,prps());
		return this;}

	void saveProps(TL tl,Map p){
		if(jsonRef==null)
			jsonRef=jrn(p);
		Map<String,Json>props=prps();
		try{for(Object k:p.keySet()){
			Object v=p.get(k);
			Typ typ=Typ.typ(v);
			if( v instanceof Map )
			{	int j=jr(v);if(j==-1)
				savePropMap(tl,k+".",(Map)v,props);
			else saveProp(tl,k.toString(),Typ.jsonRef,j,props);
			}
			else if(v instanceof List)
				savePropList(tl,k+".",(List)v,props);
			else saveProp(tl,k.toString(),typ,v,props);
		}//for
		}catch(Exception ex){}}//sav

	void savePropMap(TL tl,String path,Map p,Map<String,Json>props){
		if(jsonRef==null)
			jsonRef=jrn(p);
		try{for(Object k:p.keySet()){
			Object v=p.get(k);
			Typ typ=Typ.typ(v);
			if( v instanceof Map )
			{	int j=jr(v);if(j==-1)
				savePropMap(tl,path+k+'.',(Map)v,props);
			else saveProp(tl,path+k,Typ.jsonRef,j,props);
			}
			else if(v instanceof List)
				savePropList(tl,path+k+".",(List)v,props);
			else saveProp(tl,path+k,typ,v,props);
		}//for
		}catch(Exception ex){}}//sav

	void savePropList(TL tl,String path,List p,Map<String,Json>props){
		if(jsonRef==null)
			jsonRef=jrn(p);int k=0,n=p.size();
		try{for(;k<n;k++){
			Object v=p.get(k);
			Typ typ=Typ.typ(v);
			if( v instanceof Map )
			{	int j=jr(v);if(j==-1)
				savePropMap(tl,path+k+'.',(Map)v,props);
			else saveProp(tl,path+k,Typ.jsonRef,j,props);
			}
			else if(v instanceof List)
				savePropList(tl,path+k+".",(List)v,props);
			else saveProp(tl,path+k,typ,v,props);
		}//for
		}catch(Exception ex){}}//sav

	static boolean propNotEq(Object a,Object b)
	{if((a==null && b==null)
		|| a==b || (a!=null && a.equals(b)))
		return false;
		if(a==null || b==null )
			return true;
		Class ac=a.getClass(),bc=b.getClass();
		if(ac!=bc)
			return true;
		if(a instanceof Map)
		{	Map am=(Map)a,bm=(Map)b;
			if(am.size()!=bm.size())
				return true;
			for(Object k:am.keySet())
			{Object ax=am.get(k),bx=bm.get(k);
				if(propNotEq(ax,bx))
					return true;
			}
		}//if Map
		if(a instanceof List)
		{List am=(List)a,bm=(List)b;int k=0,n=am.size();
			if(n!=bm.size())
				return true;
			for(;k<n;k++)
			{Object ax=am.get(k),bx=bm.get(k);
				if(propNotEq(ax,bx))
					return true;
			}
		}//if List
		return false;
	}

	static final String SqlSv="replace into `"+dbtName
	+"` (`"+C.no+"`,`"+C.jsonRef+"`,`"+
	C.path+"`,`"+C.typ+"`,`"+C.json+"`)values(?,?,?,?,?)";

	Json saveProp(TL tl,String path,Typ t,Object v, Map<String,Json>props ){
		Json j=props==null?null:props.get(path);
		try{boolean New=j==null||j.no==null;
			if(New){if(j==null){
				j=new Json();
				j.path=path==null?"":path;
				if(props!=null)
					props.put(j.path,j);}
				j.no=DB.q1int("select max(`"+C.no+"`)+1 from `"+dbtName+"`", 1);
			}
			if(New || propNotEq(v,j.json)){//int x=
				DB.x(SqlSv,j.no,j.jsonRef=jsonRef,path,(j.typ=t).toString(),j.json=v);
				Log.log_(tl,Log.Entity.json, j.no, New?Log.Act.New:Log.Act.Update, j.json);
			}
		}catch(Exception ex){tl.error(ex,"Json.saveProp:ex:path=",path,": json=",v);}
		return j;}

	void remOldPropsByPathStart(TL tl,String
			pathStarts,Map<String,Json>props){
		for(String k:props.keySet())try{
			if(k.startsWith(pathStarts))
			{	props.get(k).delete();
				props.remove(k);
			}
		}catch(Exception ex){tl.error(ex,
			"Json.remOldPropsByPathStart");}
	}//remOldPropsByPathStart

	void removeOldProps(TL tl,Map p,
		String[]a,int i,int n,Json j,
		Map<String,Json>props)
	throws SQLException
	{	if(i>=n)return;
		Object o=p.get(a[i]);
		if(o==null)
		{j.delete();
			props.remove(j.path);
			return;
		}else if(o instanceof Map)
			removeOldProps(tl,(Map)o,a,i+1,n,j,props);
		else if(o instanceof List)
			removeOldProps(tl,(List)o,a,i+1,n,j,props);
	}//removeOldProps

	void removeOldProps(TL tl,List p,
		String[]a,int i,int n,Json j,
		Map<String,Json>props)
	throws SQLException{
		if(i>=n)return;
		int k=Util.parseInt(a[i], -1);
		Object o=p.get(k);
		if(o==null)
		{j.delete();
			props.remove(j.path);
			return;
		}else if(o instanceof Map)
			removeOldProps(tl,(Map)o,a,i+1,n,j,props);
		else if(o instanceof List)
			removeOldProps(tl,(List)o,a,i+1,n,j,props);
	}

	void removeOldProps(TL tl,Map p,Map<String,Json>props){
		for(String k:props.keySet())try{
			int di=k.indexOf(".");
			if(di!=-1){String[]a=k.split(".");int n=a.length;
				Object o=p.get(a[0]);
				if(o==null)
					remOldPropsByPathStart(tl,a[0]+".",props);
				if(o instanceof Map)
					removeOldProps(tl,(Map)o,a,1,n,props.get(k),props);
				else if(o instanceof List)
					removeOldProps(tl,(List)o,a,1,n,props.get(k),props);
			}else{
				Object o=p.get(k);
				if(o==null)try{
					Json j=props.get(k);
					//DB.x("delete from json where no=",j.no);
					//Log.log_(tl,Log.Entity.json, j.no, Log.Act.Delete, j.jsonRef);
					j.delete();
				}catch(Exception ex){tl.error(ex,"removeOldProps");}
			}//else
		}//for k
		catch(Exception ex){tl.error(ex,"Json.removeOldProps");}
	}//removeOldProps


	static Map save(Map p){
		save(p,jrn(p));
		return p;
	}

	static Map save(Map p,int jr){
		Json j=new Json();
		j.jsonRef=jr;j.json=p;
		try{j.save();}catch(Exception ex){TL.tl().
			error(ex, "Json.save:map,jr");}
		return p;}

}// class TL$DB$Json

}//class App

%>