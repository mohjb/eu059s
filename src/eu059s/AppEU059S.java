package eu059s;//eu059s.AppEU059S.Srvlt

import java.io.*;
import java.lang.annotation.Annotation;
import java.lang.reflect.Field;

import java.lang.reflect.Array;
import java.net.MalformedURLException;
import java.net.URL;
import java.security.Principal;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.Statement;
import java.sql.SQLException;
import java.util.*;
import javax.servlet.*;
import javax.servlet.descriptor.JspConfigDescriptor;
import javax.servlet.http.*;import javax.servlet.jsp.JspWriter;import javax.servlet.jsp.PageContext;
import javax.servlet.jsp.el.ExpressionEvaluator;
import javax.servlet.jsp.el.VariableResolver;

import com.mysql.jdbc.jdbc2.optional.MysqlConnectionPoolDataSource;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
//%><%AppEU059S.TL.run(request, response, out);%><%!

public class AppEU059S  {//
public static class TL {
	enum context{ROOT(
		"D:\\apache-tomcat-8.0.15\\webapps\\ROOT\\"
		,"/Users/moh/Google Drive/air/apache-tomcat-8.0.30/webapps/ROOT/"
		,"/public_html/i1io/"//EU059S/

		);
		String str,a[];context(String...p){str=p[0];a=p;}
		enum DB{
			pool("dbpool-eu059s")
			,reqCon("javax.sql.PooledConnection")
			,server("localhost","216.227.216.46","localhost")//,"216.227.220.84"
			,dbName("eu059s","js4d00_eu059s","eu059s")
			,un("root","js4d00_theblue","root")
			,pw("qwerty","theblue","","root")/*
			,root( "/public_html/i1io/EU059S/"
				,"D:\\apache-tomcat-8.0.15\\webapps\\ROOT/"
				,"/Users/moh/Google Drive/air/apache-tomcat-8.0.30/webapps/ROOT/")*/
			;String str,a[];DB(String...p){str=p[0];a=p;}
		}

		static String getRealPath(TL t,String path){
			String real=t.getServletContext().getRealPath(path);
			boolean b=true;
			try{File f=null;
				if(real==null){int i=0;
					while( i<ROOT.a.length && (b=(f==null|| !f.exists())) )
						try{
							f=new File(ROOT.a[i++]);
						}catch(Exception ex){}//t.error
					real=(b?"./":f.getCanonicalPath())+path;
				}
			}catch(Exception ex){
				t.error(ex,"eu059s.TL.context.getRealPath:",path);}
			return real==null?"./"+path:real;}

		static int getContextIndex(TL t){
			try{File f=null;
				int i=ROOT.a.length-1;
				while( i>=0 )
				{	f=new File(ROOT.a[i]);
					if(f!=null && f.exists())
						return i;i--;
				}
			}catch(Exception ex){
				t.error(ex,"AppEU059S.TL.context.getContextIndex:");}
			return -1;}
		//***/static Map<DB,String> getContextPack(TL t,List<Map<DB,String>>a){return null;}
	}//context

	//TL member variables
	public String ip;
	public DB.Tbl.Usr usr;
	public DB.Tbl.Ssn ssn;
	public Map<String,Object>json;//accessing request in json-format
	//public Map<Object,Object> response;
	public Date now;//,sExpire;
	/**wrapping JspWriter or any other servlet writer in "out" */
	Json.Output out,/**jo is a single instanceof StringWriter buffer*/jo;
	int htmlIndentation;
	/**the static/class variable "tl"*/ static ThreadLocal<TL> tl=new ThreadLocal<TL>();
	static boolean LogOut=false;//tlLog=true;
	public boolean logOut=LogOut;
	public static final String CommentHtml[]={"\n<!--","-->\n"},CommentJson[]={"\n/*","\n*/"};
	public String comments[]=CommentJson;
	public HttpServletRequest req;AppEU059S a;
	public HttpServletResponse rspns;//JspWriter out;//javax.servlet.jsp.PageContext pc;//GenericServlet srvlt;HttpSession session;

	//public TL(GenericServlet s,HttpServletRequest r,HttpServletResponse n,PrintWriter o){_srvlt=s;req=r;rspns=n;out=o;}
	public TL(HttpServletRequest r,Writer o){//HttpServletResponse n,
		req=r;out=new Json.Output(o);}//rspns=n;

	public Json.Output jo(){if(jo==null)try{jo=new Json.Output();}catch(Exception x){error(x,"moh.TL.jo:IOEx:");}return jo;}
	public Json.Output getOut() throws IOException{return out;}//JspWriter//if(out==null)out=rspns.getWriter();
	public HttpServletRequest getRequest(){return req;}
	public HttpSession getSession(){return req.getSession();}
	public ServletContext getServletContext(){return getSession().getServletContext();}//srvlt.getServletContext();
	/**sets a new TL-instance to the localThread*/

	public static TL Enter(HttpServletRequest r,HttpServletResponse response,Writer out)
	throws IOException
	{TL p;tl.set(p=new TL(r,out!=null?out:response.getWriter()));
		p.rspns=response;//p.session=session;
		p.onEnter();
		return p;}

	private void onEnter()throws IOException
	{ip=getRequest().getRemoteAddr();
		now=new Date();
		try{Object o=req.getContentType();
			o=o==null?null
			:o.toString().contains("json")?Json.Parser.parse(req)
			:o.toString().contains("part")?getMultiParts():null;
			json=o instanceof Map<?, ?>?(Map<String, Object>)o:null;//req.getParameterMap() ;
			//response=TL.Util.mapCreate("return",false , "op",req("op"),"req",o);//"msg",0 ,
			logOut=var("logOut",logOut);
			if(getSession().isNew())DB.Tbl.check(this);
			DB.Tbl.Ssn.onEnter();
		}catch(Exception ex){error(ex,"TL.onEnter");}
		//if(pages==null){rsp.setHeader("Retry-After", "60");rsp.sendError(503,"pages null");throw new Exception("pages null");}
		if(logOut)out.w(comments[0]).w("TL.tl.onEnter:\n").o(this).w(comments[1]);
		//else log(new Json.Output().o(this).toString());
	}//onEnter

	private void onExit(){usr=null;ssn=null;ip=null;now=null;req=null;json=null;out=jo=null;}//response=null;srvlt=null;rspns=null;

	/**unsets the localThread, and unset local variables*/
	public static void Exit()//throws Exception
	{TL p=TL.tl();if(p==null)return;
		DB.close((Connection)p.r(context.DB.reqCon.str));
		p.onExit();tl.set(null);}

 Map getMultiParts(){
	Map<Object,Object>m=null;
		if(ServletFileUpload.isMultipartContent(req))try
		{DiskFileItemFactory factory=new DiskFileItemFactory();
			factory.setSizeThreshold(40000000);//MemoryThreshold);
			//factory.setRepository(new File(System.getProperty("java.io.tmpdir","defaultDirUpload")));
			//upload.setFileSizeMax(MaxFileSize);
			//upload.setSizeMax(MaxRequestSize);
			//final String pth="",UploadDirectory="sheetUploads";
			String path=AppEU059S.app(this).getUploadPath();
			String real=TL.context.getRealPath(this, path);//getServletContext().getRealPath(path);
			File f=null,uploadDir;
			/*if(real==null){int i=0; boolean b=false;
			 while( i<context.ROOT.a.length && (b=(f==null|| !f.exists())) )
			 try{
			 f=new File(context.ROOT.a[i++]);
			 }catch(Exception ex){}
			 real=(b?"./":f.getCanonicalPath())+path;
			 }*/
			uploadDir=new File(real);
			if( ! uploadDir.exists() )
				uploadDir.mkdirs();//mkDir();
			factory.setRepository(uploadDir);
			ServletFileUpload upload=new ServletFileUpload(factory);
			List<FileItem>formItems=upload.parseRequest(req);
			if(formItems!=null && formItems.size()>0 )
			{	m=new HashMap<Object,Object>();
				for(FileItem item:formItems)
				{	String fieldNm=item.getFieldName();
					boolean fld=item.isFormField();//mem=item.isInMemory(),
					if(fld)
					{String v=item.getString();
						Object o=v;
						if(fieldNm.indexOf("json")!=-1)
							o=Json.Parser.parse(v);
						m.put(fieldNm, o);
					}else{
						long sz=item.getSize();
						if(sz>0){
							String ct=item.getContentType()
							,nm=item.getName();
							int count=0;
							f=new File(uploadDir,nm);
							while(f.exists())
								f=new File(uploadDir,(count++)+'.'+nm);
							//String path=pth+f.getCanonicalPath().substring(real.length());
							m.put(fieldNm,Util.mapCreate(//"name",fieldNm,
								"contentType",ct,"size",sz
								,"fileName",path+f.getName()
								//,"isInMemory",mem//,"isFormField",fld
								//,"data",item.get()//byt[](sz,item.getInputStream())
								));
							item.write(f);
						}//if sz > 0
					}//if isField else
				}//for(FileItem item:formItems)
			}//if(formItems!=null && formItems.size()>0 )
		}catch(Exception ex){
			error(ex,"TL.getMultiParts");}
		//if(ServletFileUpload.isMultipartContent(req))
		return m;
	}//Map getMultiParts()

	public static class Util{//utility methods

		public static Map<Object, Object> mapCreate(Object...p)
		{Map<Object, Object> m=new HashMap<Object,Object>();//null;
			return p.length>0?maPSet(m,p):m;}

		public static Map<Object, Object> mapSet(Map<Object, Object> m,Object...p){return maPSet(m,p);}

		public static Map<Object, Object> maPSet(Map<Object, Object> m,Object[]p)
		{for(int i=0;i<p.length;i+=2)m.put(p[i],p[i+1]);return m;}

		public final static java.text.SimpleDateFormat
		dateFormat=new java.text.SimpleDateFormat("yyyy/MM/dd hh:mm:ss");

		public static Integer[]parseInts(String s){
			java.util.Scanner b=new java.util.Scanner(s),
			c=b.useDelimiter("[\\s\\.\\-/\\:A-Za-z,]+");
			List<Integer>l=new LinkedList<Integer>();
			while(c.hasNextInt()){
				//if(c.hasNextInt())else c.skip();
				l.add(c.nextInt());
			}c.close();b.close();
			Integer[]a=new Integer[l.size()];l.toArray(a);
			return a;}

		static Date parseDate(String s){
			Integer[]a=parseInts(s);int n=a.length;
			if(n<2){long l=Long.parseLong(s);
				Date d=new Date(l);
				return d;}
			java.util.GregorianCalendar c=new java.util.GregorianCalendar();
			c.set(n>0?a[0]:0,n>1?a[1]-1:0,n>2?a[2]:0,n>3?a[3]:0,n>4?a[4]:0);
			return c.getTime();}

		/**returns a format string of the date as yyyy/MM/dd hh:mm:ss*/
		public static String formatDate(Date p)
		{return p==null?"":dateFormat.format(p);}

		static String format(Object o)throws Exception
		{if(o==null)return null;StringBuilder b=new StringBuilder("\"");
			String a=o.getClass().isArray()?new String((byte[])o):o.toString();
			for(int n=a.length(),i=0;i<n;i++)
			{	char c=a.charAt(i);if(c=='\\')b.append('\\').append('\\');
			else if(c=='"')b.append('\\').append('"');
			else if(c=='\n')b.append('\\').append('n');//.append("\"\n").p(indentation).append("+\"");
			else if(c=='\r')b.append('\\').append('r');
			else if(c=='\t')b.append('\\').append('t');
			else if(c=='\'')b.append('\\').append('\'');
				else b.append(c);}return b.append('"').toString();}

		/**return the integer-index of the occurrence of element-e in the array-a, or returns -1 if not found*/
		public static int indexOf(Object[]a,Object e){int i=a.length;while(--i>-1&&(e!=a[i])&&(e==null||!e.equals(a[i])));return i;}

		static boolean eq(Object a,Object e)
		{if(a==e||(a!=null&&a.equals(e)))return true;//||(a==null&&e==null)
			return (a==null)?false:a.getClass().isArray()?indexOf((Object[])a,e)!=-1:false;}

		public static List<Object>lst(Object...p){List<Object>r=new LinkedList<Object>();for(Object o:p)r.add(o);return r;}

		public static boolean isNum(String v){
			int i=-1,n=v!=null?v.length():0;
			char c='\0';
			boolean b=n>0;
			while(b&& c!='.'&& i<n)
			{c=++i<n?v.charAt(i):'\0';
				b= Character.isDigit(c)||c=='.';
			}
			if(c=='.') while(b&& i<n)
			{c=++i<n?v.charAt(i):'\0';
				b= Character.isDigit(c);
			};
			return b;
		}
		public static int parseInt(String v,int dv)
		{if(isNum(v) //v!=null
			)try{dv=Integer.parseInt(v);}
			catch(Exception ex){//changed 2016.06.27 18:28
				TL.tl().error(ex, "TL.Util.parseInt:",v,dv);
			}return dv;}

		public static <T>T parse(String s,T defval){
		 if(s!=null)try{
			Class<T> ct=(Class<T>) defval.getClass();
			Class c=ct;
			boolean b=c==null?false:c.isEnum();
				if(!b){c=ct.getEnclosingClass();b=c==null?false:c.isEnum();}
				if(b){
					for(Object o:c.getEnumConstants())
						if(s.equalsIgnoreCase(o.toString()))
							return (T)o;
				}}catch(Exception x){//changed 2016.06.27 18:28
					TL.tl().error(x, "TL.Util.<T>T parse(String s,T defval):",s,defval);}
			return defval;}

		public static Object parse(String s,Class c){
		if(s!=null)try{if(String.class.equals(c))return s;
			else if(Number.class.isAssignableFrom(c)||c.isPrimitive()) {
					 if (Integer.class.equals(c)|| "int"   .equals(c.getName())) return new Integer(s);
				else if (Double .class.equals(c)|| "double".equals(c.getName())) return new Double(s);
				else if (Float  .class.equals(c)|| "float" .equals(c.getName())) return new Float(s);
				else if (Short  .class.equals(c)|| "short" .equals(c.getName())) return new Short(s);
				else if (Long   .class.equals(c)|| "long"  .equals(c.getName())) return new Long(s);
				else if (Byte   .class.equals(c)|| "byte"  .equals(c.getName())) return new Byte(s);
			}///else return new Integer(s);}
			else if(Boolean.class.equals(c)||(c.isPrimitive()&&"boolean".equals(c.getName())))return new Boolean(s);
			else if(Date.class.equals(c))return parseDate(s);
			else if(Character.class.isAssignableFrom(c)||(c.isPrimitive()&&"char".equals(c.getName())))
				return s.length()<1?'\0':s.charAt(0);
			boolean b=c==null?false:c.isEnum();
			if(!b){Class ct=c.getEnclosingClass();b=ct==null?false:ct.isEnum();if(b)c=ct;}
			if(b){
				for(Object o:c.getEnumConstants())
					if(s.equalsIgnoreCase(o.toString()))
						return o;
			}
			return Json.Parser.parse(s);
	 	}catch(Exception x){//changed 2016.06.27 18:28
				TL.tl().error(x, "TL.Util.<T>T parse(String s,Class):",s,c);}
		return s;}

	}//class util

	//static{log("TL.static:version 2015.10.22.08.08,9.31,13.42");}

	/**get the TL-instance for the current Thread*/
	public static TL tl(){Object o=tl.get();return o instanceof TL?(TL)o:null;}

	/**get a request-scope attribute*/
	public Object r(Object n){return req.getAttribute(String.valueOf(n));}

	/**set a request-scope attribute*/
	public Object r(Object n,Object v){req.setAttribute(String.valueOf(n),v);return v;}

	/**get a session-scope attribute*/
	public Object s(Object n){return getSession().getAttribute(String.valueOf(n));}

	/**set a session-scope attribute*/
	public Object s(Object n,Object v){getSession().setAttribute(String.valueOf(n),v);return v;}

	/**get an application-scope attribute*/
	public Object a(Object n){return getServletContext().getAttribute(String.valueOf(n));}

	/**set an application-scope attribute*/
	public void a(Object n,Object v){getServletContext().setAttribute(String.valueOf(n),v);}


	/**get variable, a variable is considered
	 1: a parameter from the http request
	 2: if the request-parameter is not null then set it in the session with the attribute-name pn
	 3: if the request-parameter is null then get pn attribute from the session
	 4: if both the request-parameter and the session attribute are null then return null
	 @parameters String pn Parameter/attribute Name
	 HttpSession ss the session to get/set the attribute
	 HttpServletRequest rq the http-request to get the parameter from.
	 @return variable value.*/
	public Object var(String pn)
	{HttpSession ss=getSession();//HttpServletRequest rq=p.getRequest();
		Object r=null;try{Object sVal=ss.getAttribute(pn);String reqv=req(pn);
			if(reqv!=null&&!reqv.equals(sVal)){ss.setAttribute(pn,r=reqv);//logo("TL.var(",pn,")reqVal:sesssion.set=",r);
			}
			else if(sVal!=null){r=sVal; //logo("TL.var(",pn,")sessionVal=",r);
			}}catch(Exception ex){ex.printStackTrace();}return r;}

	public Number var(String pn,Number r)
	{Object x=var(pn);return x==null?r:x instanceof Number?(Number)x:Double.parseDouble(x.toString());}

	public String var(String pn,String r)
	{Object x=var(pn);return x==null?r:String.valueOf(x);}

	public boolean var(String pn,boolean r)
	{Object x=var(pn);return x==null?r:x instanceof
		Boolean?(Boolean)x:Boolean.parseBoolean(x.toString());}

	/**mostly used for enums , e.g. "enum Screen"*/
 public <T>T var(String n,T defVal) {
	String r=req(n);
		if(r!=null)
			s(n,defVal=Util.parse(r,defVal));
		else{
			Object s=s(n);
			if(s==null)
				s(n,defVal);
			else{Class c=defVal.getClass();
				if(c.isAssignableFrom(s.getClass()))
					defVal=(T)s;//s(n,defVal=(T)s); //changed 2016.07.18
				else
					log("TL.var(",n,",<T>",defVal,"):defVal not instanceof ssnVal:",s);//added 2016.07.18
			}
		}return defVal;
	}

	/////////////////////////////// */


	public String req(String n){
	if(json!=null )
	{Object o=json.get(n);if(o!=null)return o.toString();}
		String r=req.getParameter(n);
		if(r==null)r=req.getHeader(n);
		if(logOut)log("TL.req(",n,"):",r);
		return r;}

	public int req(String n,int defval)
	{String s=req(n);
		int r=Util.parseInt(s, defval);
		return r;}

	public Date req(String n,Date defval)
	{String s=req(n);if(s!=null)
		defval=Util.parseDate(s);//(s, defval);
		return defval;}

	public double req(String n,double defval)
	{String s=req(n);if(s!=null)
		try{defval=Double.parseDouble(s);//(s, defval);
		}catch(Exception x){}
		return defval;}

	public <T>T req(String n,T defVal)
	{String s=req(n);if(s!=null)
		defVal=Util.parse(s,defVal);
		return defVal;}

	public Object req(String n,Class c)
	{String s=req(n);//if(s!=null)
		Object o=Util.parse(s,c);
		return o;}

	////////////////////////////////
	public String logo(Object...a){String s=null;
		if(a!=null&&a.length>0)
			try{//TL p=this;
				Json.Output o=tl().jo().clrSW();//new Json.Output();
				for(Object i:a)o.o(i);
				s=o.toStrin_();
				getServletContext().log(s);//CHANGED 2016.08.17.10.00
				if(logOut){out.flush().
					w(comments[0]//"\n/*"
					  ).w(s).w(comments[1]//"*/\n"
						);}}catch(Exception ex){ex.printStackTrace();}return s;}

	/**calls the servlet log method*/
	public void log(Object...s){logA(s);}
	public void logA(Object[]s){try{
		jo().clrSW();//StringBuilder b=new StringBuilder();//builder towards the log
		for(Object t:s)jo.w(String.valueOf(t));//b.append(t);//g.log(String.valueOf(t));{if(p.logOut)p.getOut().w(t);}
		String t=jo.toStrin_();
		getServletContext().log(t);
		if(logOut)out.flush().w(comments[0]).w(t).w(comments[1]);//"*/\n");
	}catch(Exception ex){ex.printStackTrace();}}

	public void error(Throwable x,Object...p){try{
		String s=jo().clrSW().w("error:").o(p,x).toString();
		getServletContext().log(s);
		if(logOut)out.w(comments[0]//"\n/*
			).w("error:").w(s.replaceAll("<", "&lt;"))
			.w("\n---\n").o(x).w(comments[1]//"*/\n"
			);if(x!=null)x.printStackTrace();}
		catch(Exception ex){ex.printStackTrace();}}

	/**get a pooled jdbc-connection for the current Thread, calling the function dbc()*/
	Connection dbc()throws SQLException
	{TL p=this;Object s=context.DB.reqCon.str,o=p.r(s);
		if(o==null||!(o instanceof Connection))
			p.r(s,o=DB.c());
		return (Connection)o;}

	public static class DB
	{//public static boolean dbLog=false;//CHANGED: 2016.05.05.07.57
		/**returns a jdbc pooled Connection.
		 uses MysqlConnectionPoolDataSource with a database from the enum context.DB.url.str,
		 sets the pool as an application-scope attribute named context.DB.pool.str
		 when first time called, all next calls uses this context.DB.pool.str*/
		public static synchronized Connection c()throws SQLException
		{ TL t=tl();Connection r=(Connection)t.r(context.DB.reqCon.str);if(r!=null)return r;
			Object[]a={0,0,0};
			MysqlConnectionPoolDataSource d=(MysqlConnectionPoolDataSource)t.a(context.DB.pool.str);
			r=d==null?null:d.getPooledConnection().getConnection();
			if(r!=null)//changed 2016.07.18
				t.r(context.DB.reqCon.str,r);
			else try
			{try{int x=context.getContextIndex(t);t.log("TL.DB.c:1:getContextIndex:",x);
					if(x!=-1)
					{	a=c(t,x,x,x,x);t.log("TL.DB.c:1:c2:",a);
						r=(Connection)a[1];
						return r;}
				}catch(Exception e){t.log("TL.DB.MysqlConnectionPoolDataSource:1:",e);}
				String[]dba=context.DB.dbName.a
					,sra=context.DB.server.a
					,una=context.DB.un.a
					,pwa=context.DB.pw.a;//CHANGED: 2016.02.18.10.32
				for(int idb=0;r==null&&idb<dba.length;idb++)
					for(int iun=0;r==null&&iun<una.length;iun++)
						for(int ipw=0;r==null&&ipw<pwa.length;ipw++)//n=context.DB.len()
							for(int isr=0;r==null&&isr<sra.length;isr++)try
							{	a=c(t,idb,iun,ipw,isr);
								//d=(MysqlConnectionPoolDataSource)a[0];ss=(String)a[2];
								r=(Connection)a[1];//t.a(context.DB.pool.str,a[0]);t.r(context.DB.reqCon.str,a[1]);
								if(t.logOut)t.log("new "+context.DB.pool.str+":"+a[0]);
							}catch(Exception e){t.log("TL.DB.MysqlConnectionPoolDataSource:",idb,",",isr,",",iun,ipw,t.logOut?a[2]:"",",",e);}
			}catch(Throwable e){t.error(e,"TL.DB.MysqlConnectionPoolDataSource:throwable:");}//ClassNotFoundException
			if(t.logOut)t.log(context.DB.pool.str+":"+a[0]);
			if(r==null)try
			{r=java.sql.DriverManager.getConnection
				("jdbc:mysql://"+context.DB.server.str
				 +"/"+context.DB.dbName.str
				 ,context.DB.un.str,context.DB.pw.str
				 );
				t.r(context.DB.reqCon.str,r);
			}catch(Throwable e){t.error(e,"TL.DB.DriverManager:");}
			return r;}

		public static synchronized Object[]c(TL t,int idb,int iun,int ipw,int isr)
		throws SQLException{
			MysqlConnectionPoolDataSource d=new MysqlConnectionPoolDataSource();
			String ss=null,s=context.DB.dbName.a[Math.min(context.DB.dbName.a.length-1,idb)];
			if(t.logOut)ss="\ndb:"+s;
			d.setDatabaseName(s);d.setPort(3306);
			s=context.DB.server.a[Math.min(context.DB.server.a.length-1,isr)];
			if(t.logOut)ss+="\nsrvr:"+s;
			d.setServerName(s);
			s=context.DB.un.a[Math.min(context.DB.un.a.length-1,iun)];if(t.logOut)ss+="user:"+s;
			d.setUser(s);
			s=context.DB.pw.a[Math.min(context.DB.pw.a.length-1,ipw)];if(t.logOut)ss+="\npw:"+s;
			d.setPassword(s);
			Connection r=d.getPooledConnection().getConnection();
			t.a(context.DB.pool.str,d);
			t.r(context.DB.reqCon.str,r);
			Object[]a={d,r,ss};
			return a;}

		/**returns a jdbc-PreparedStatement, setting the variable-length-arguments parameters-p, calls dbP()*/
		public static PreparedStatement p(String sql,Object...p)throws SQLException{return P(sql,p);}

		/**returns a jdbc-PreparedStatement, setting the values array-parameters-p, calls TL.dbc() and log()*/
		public static PreparedStatement P(String sql,Object[]p)throws SQLException{return P(sql,p,true);}//tl().dbParamsOddIndex

		public static PreparedStatement P(String sql,Object[]p,boolean odd)throws SQLException
		{TL t=tl();Connection c=t.dbc();
			PreparedStatement r=c.prepareStatement(sql);if(t.logOut)
				t.log("TL("+t+").DB.P(sql="+sql+",p="+p+",odd="+odd+")");
			if(odd){if(p.length==1)
				r.setObject(1,p[0]);else
					for(int i=1;p!=null&&i<p.length;i+=2)
						r.setObject(i/2+1,p[i]);//if(t.logOut)TL.log("dbP:"+i+":"+p[i]);
			}else
				for(int i=0;p!=null&&i<p.length;i++)
				{r.setObject(i+1,p[i]);if(t.logOut)t.log("dbP:"+i+":"+p[i]);}
			if(t.logOut)t.log("dbP:sql="+sql+":n="+(p==null?-1:p.length)+":"+r);return r;}

		/**@return a jdbc-PreparedStatement stored in the application-scope, when first time called,this function creates the PreparedStatement and set it in the application scope with the attribute-name nm parameter*/
		public static PreparedStatement Ps(String nm,String sql)throws Exception
		{TL tl=TL.tl();Object[]a=(Object[])tl.a(nm);
			if(a==null){a=new Object[2];a[0]=c().prepareStatement(sql);tl.a(nm,a);}
			else {tl.log("Ps:1:else:tl.now="+tl.now+", a[1]="+a[1]);
				if( (tl.now.getTime()-((java.util.Date)a[1]).getTime()) >1000*60*5)
				{try{((PreparedStatement)a[0]).getConnection().close();}
					catch(Exception ex){tl.log("",ex);}
					a[0]=c().prepareStatement(sql);}}
			a[1]=tl.now;return(PreparedStatement)a[0];}

		/**returns a jdbc-ResultSet, setting the variable-length-arguments parameters-p, calls dbP()*/
		public static ResultSet r(String sql,Object...p)throws SQLException{return P(sql,p,true).executeQuery();}

		/**returns a jdbc-ResultSet, setting the values array-parameters-p, calls dbP()*/
		public static ResultSet R(String sql,Object[]p)throws SQLException{
			PreparedStatement x=P(sql,p,true);
			ResultSet r=x.executeQuery();
			return r;}

		/**closes the resultSet-r and the statement, but DOES-NOT close the connection*/
		public static void closeRS(ResultSet r)//,Connection c
		{if(r!=null)try{Statement s=r.getStatement();r.close();s.close();}catch(Exception e){e.printStackTrace();}}
		public void close(ResultSet r){if(r!=null)try{Statement s=r.getStatement();r.close();close(s);}catch(Exception e){e.printStackTrace();}}
		public static void close(Statement s){try{Connection c=s.getConnection();s.close();close(c);}catch(Exception e){e.printStackTrace();}}
		public static void close(Connection c){
			try{if(c!=null){
				tl().r("java.sql.Connection",null);
				c.close();}
			}catch(Exception e){e.printStackTrace();}}

		/**returns a string or null, which is the result of executing sql,
		 calls dpR() to set the variable-length-arguments parameters-p*/
		public static String q1str(String sql,Object...p)throws SQLException{return q1Str(sql,p);}
		public static String q1Str(String sql,Object[]p)throws SQLException
		{String r=null;ResultSet s=null;try{s=R(sql,p);r=s.next()?s.getString(1):null;}finally{closeRS(s);}return r;}//CHANGED:2015.10.23.16.06:closeRS ; CHANGED:2011.01.24.04.07 ADDED close(s,dbc());

		public static String newUuid()throws SQLException{return q1str("select uuid();");}

		/**returns an java obj, which the result of executing sql,
		 calls dpR() to set the variable-length-arguments parameters-p*/
		//public static Object q1obj(String sql,Object...p)throws Exception{ResultSet s=null;try{s=R(sql,p);return s.next()?s.getObject(1):null;}finally{close(s,dbc());}}
		public static Object q1obj(String sql,Object...p)throws SQLException{return q1Obj(sql,p);}
		public static Object q1Obj(String sql,Object[]p)throws SQLException
		{ResultSet s=null;try{
			s=R(sql,p);
			return s.next()?s.getObject(1):null;
		}finally{closeRS(s);}}

		/**returns an integer or df, which the result of executing sql,
		 calls dpR() to set the variable-length-arguments parameters-p*/
		public static int q1int(String sql,int df,Object
			...p)throws SQLException{return q1Int(sql,df,p);}

		public static int q1Int(String sql,int df,Object[]p)throws SQLException
		{ResultSet s=null;try{s=R(sql,p);return s.next()?s.getInt(1):df;}finally{closeRS(s);}}//CHANGED:2015.10.23.16.06:closeRS ;

		/**returns a double or df, which is the result of executing sql,
		 calls dpR() to set the variable-length-arguments parameters-p*/
		public static double q1dbl(String sql,double df,Object...p)throws SQLException
		{ResultSet s=null;try{s=R(sql,p);return s.next()?s.getDouble(1):df;}finally{closeRS(s);}}//CHANGED:2015.10.23.16.06:closeRS ;

		/**returns as an array of rows of arrays of columns of values of the results of the sql
		 , calls dbL() setting the variable-length-arguments values parameters-p*/
		public static Object[][]q(String sql,Object...p)throws SQLException{return Q(sql,p);}

		public static Object[][]Q(String sql,Object...p)throws SQLException
		{List<Object[]>r=L(sql,p);Object b[][]=new Object[r.size()][];r.toArray(b);r.clear();return b;}

		/**return s.getMetaData().getColumnCount();*/
		public static int cc(ResultSet s)throws SQLException{return s.getMetaData().getColumnCount();}

		/**calls L()*/
		public static List<Object[]> l(String sql,Object...p)throws SQLException{return L(sql,p);}

		/**returns a new linkedList of the rows of the results of the sql
		 ,each row/element is an Object[] of the columns
		 ,calls dbR() and dbcc() and dbclose(ResultSet,TL.dbc())*/
		public static List<Object[]> L(String sql,Object[]p)throws SQLException
		{TL t=tl();ResultSet s=null;List<Object[]> r=null;try{s=R(sql,p);Object[]a;r=new LinkedList<Object[]>();
			int cc=cc(s);while(s.next()){r.add(a=new Object[cc]);
				for(int i=0;i<cc;i++){a[i]=s.getObject(i+1);
				}}return r;}finally{closeRS(s);//CHANGED:2015.10.23.16.06:closeRS ;
					if(t.logOut)try{t.log(t.jo().o("TL.DB.L:sql=")
	.o(sql).w(",prms=").o(p).w(",return=").o(r).toStrin_());}catch(IOException x){t.error(x,"TL.DB.List:",sql);}}}

		public static List<Object> q1colList(String sql,Object...p)throws SQLException
		{ResultSet s=null;List<Object> r=null;try{s=R(sql,p);r=new LinkedList<Object>();
			while(s.next())r.add(s.getObject(1));return r;}
			finally{closeRS(s);TL t=tl();if(t.logOut)
				try{t.log(t.jo().o("TL.DB.q1colList:sql=")//CHANGED:2015.10.23.16.06:closeRS ;
	.o(sql).w(",prms=").o(p).w(",return=").o(r).toStrin_());}catch(IOException x){t.error(x,"TL.DB.q1colList:",sql);}}}

		public static Object[] q1col(String sql,Object...p)throws SQLException
		{List<Object> l=q1colList(sql,p);Object r[]=new Object[l.size()];l.toArray(r);l.clear();return r;}

		/**returns a row of columns of the result of sql
		 ,calls dbR(),dbcc(),and dbclose(ResultSet,TL.dbc())*/
		public static Object[] q1row(String sql,Object...p)throws SQLException{return q1Row(sql,p);}
		public static Object[] q1Row(String sql,Object[]p)throws SQLException
		{ResultSet s=null;try{s=R(sql,p);Object[]a=null;int cc=cc(s);if(s.next())
		{a=new Object[cc];for(int i=0;i<cc;i++)try{a[i]=s.getObject(i+1);}
			catch(Exception ex){tl().error(ex,"TL.DB.q1Row:",sql);a[i]=s.getString(i+1);}}
			return a;}finally{closeRS(s);}}//CHANGED:2015.10.23.16.06:closeRS ;

		/**returns the result of (e.g. insert/update/delete) sql-statement
		 ,calls dbP() setting the variable-length-arguments values parameters-p
		 ,closes the preparedStatement*/
		public static int x(String sql,Object...p)throws SQLException{return X(sql,p);}

		public static int X(String sql,Object[]p)throws SQLException
		{int r=-1;try{PreparedStatement s=P(sql,p,false);r=s.executeUpdate();s.close();return r;}
			finally{TL t=tl();if(t.logOut)try{
				t.log(t.jo().o("TL.DB.x:sql=").o(sql).w(",prms=").o(p).w(",return=").o(r).toStrin_());}
				catch(IOException x){t.error(x,"TL.DB.X:",sql);}}}

		/**output to tl.out the Json.Output.oRS() of the query*/
		public static void q2json(String sql,Object...p)throws SQLException
		{ResultSet s=null;try{s=R(sql,p);try{tl().getOut()
			//(new Json.Output())//TODO:investigate where the Json.Output.w goes
			.o(s);
		}catch (IOException e) {e.printStackTrace();}}
			finally{closeRS(s);TL t=tl();if(t.logOut)try{t.log(t.jo().o(
				"TL.DB.L:q2json=").o(sql).w(",prms=").o(p).toStrin_());
			}catch(IOException x){t.error(x,"TL.DB.q1json:",sql);}}}

		/**return a list of maps , each map has as a key a string the name of the column, and value obj*/
		static List<Map<String,Object>>json(String sql,Object...p) throws SQLException{return Lst(sql,p);}
		static List<Map<String,Object>>Lst(String sql,Object[ ]p) throws SQLException{
			List<Map<String,Object>>l=new LinkedList
			< Map < String ,Object>>();ItTbl i=new ItTbl(sql,p);
			List<String>cols=new LinkedList<String>();
			for(int j=1;j<=i.row.cc;j++)cols.add(i.row.m.getColumnLabel(j));
			for(ItTbl.ItRow w:i){Map<String,Object>m=
				new HashMap<String,Object>();l.add(m);
				for(Object o:w)m.put(cols.get(w.col-1),o);
			}return l;}

		public static class ItTbl implements Iterator<ItTbl.ItRow>,Iterable<ItTbl.ItRow>{
			public ItRow row=new ItRow();

			public ItRow getRow(){return row;}

			public static ItTbl it(String sql,Object...p){return new ItTbl(sql,p);}

			public ItTbl(String sql,Object[]p){
				try {init(TL.DB.R(sql, p));}
				catch (Exception e) {tl().logo("TL.DB.ItTbl.<init>:Exception:sql=",sql,",p=",p," :",e);}}

			public ItTbl(ResultSet o) throws SQLException{init(o);}

			public ItTbl init(ResultSet o) throws SQLException
			{row.rs=o;row.m=o.getMetaData();row.row=row.col=0;
				row.cc=row.m.getColumnCount();return this;}

			static final String ErrorsList="TL.DB.ItTbl.errors";

			@Override public boolean hasNext(){
				boolean b=false;try {if(b=row!=null&&row.rs!=null&&row.rs.next())row.row++;
				else TL.DB.closeRS(row.rs);//CHANGED:2015.10.23.16.06:closeRS ;	//,row.rs.getStatement().getConnection());
				}catch (SQLException e) {//e.printStackTrace();
					TL t=TL.tl();//changed 2016.06.27 18:05
					final String str="TL.DB.ItTbl.next";
					t.error(e,str);
					List l=(List)t.json.get(ErrorsList);//t.response
					if(l==null)t.json.put(ErrorsList,l=new LinkedList());//t.response
					l.add(Util.lst(str,row!=null?row.row:-1,e));
				}return b;}

			@Override public ItRow next() {if(row!=null)row.col=0;return row;}
			@Override public void remove(){throw new UnsupportedOperationException();}

			@Override public Iterator<ItRow>iterator(){return this;}

			public class ItRow implements Iterator<Object>,Iterable<Object>{
				ResultSet rs;int cc,col,row;ResultSetMetaData m;
				public int getCc(){return cc;}
				public int getCol(){return col;}
				public int getRow(){return row;}
				@Override public Iterator<Object>iterator(){return this;}

				@Override public boolean hasNext(){return col<cc;}

				@Override public Object next(){
					try {return rs==null?null:rs.getObject(++col);}
					catch (SQLException e) {//changed 2016.06.27 18:05
						TL t=TL.tl();
						final String str="TL.DB.ItTbl.ItRow.next";
						t.error(e,str);
						List l=(List)t.json.get(ErrorsList);//t.response
						if(l==null)t.json.put(ErrorsList,l=new LinkedList());//t.response
						l.add(Util.lst(str,row,col,e));
					}//.printStackTrace();}
					return null;}

				@Override public void remove(){throw new UnsupportedOperationException();}

				public int nextInt(){
					try {return rs==null?-1:rs.getInt(++col);}
					catch (SQLException e) {e.printStackTrace();}
					return -1;}
				public String nextStr(){
					try {return rs==null?null:rs.getString(++col);}
					catch (SQLException e) {e.printStackTrace();}
					return null;}

			}//ItRow

		}//ItTbl

		/**represents one entity , one row from a table in a relational database*/
		public abstract static class Tbl extends Form{
			static final String StrSsnTbls="TL.DB.Tbl.tbls";
			//public Map<Class<? extends DB.Tbl.Sql>,DB.Tbl.Sql>tbls;
			public static Tbl tbl(Class<? extends Tbl>p){
				TL t=tl();Object o=t.s(StrSsnTbls);
				Map<Class<? extends Tbl>,Tbl>tbls=o instanceof Map?(Map)o:null;
				if(tbls==null)t.s(StrSsnTbls,tbls=new HashMap<Class<? extends Tbl>,Tbl>());
				Tbl r=tbls.get(p);if(r==null)try {tbls.put(p, r=p.newInstance());}
				//catch (InstantiationException ex) {}catch(IllegalAccessException ex){}
				catch(Exception ex){t.error(ex,"TL.DB.Tbl.tbl(Class<TL.DB.Tbl>",p,"):Exception:");}
				return r;}

			/**Sql-Column Interface, for enum -items that represent columns in sql-tables
			 * the purpose of creating this interface is to centerlize
			 * the definition of the names of columns in java source code*/
			public interface CI extends FI{
				//**per column, get the primary key column*/public CI pkc();
				//**per column, get the primary key value */public Object pkv();
				/**per column, load from the sql/db table
				 * the value of this column, store the value
				 * in the F field and return the value*/Object load();
				/**per column, save into the db-table
				 * the value from the member field */public void save();
				//public StringBuilder where(StringBuilder b);
				//void save(<T>newVal);
				//String tblNm();
				public Class<? extends Tbl>cls();
				public Tbl tbl();
			}//interface CI

			public static CI[]cols(CI...p){return p;}
			public static CI[]orderBy(CI...p){return p;}//static Col[]groupBy(Col...p){return p;}
			public static Object[]where(Object...p){return p;}

			public abstract CI pkc();
			public abstract Object pkv();
			public abstract CI[]columns();

			@Override public FI[]flds(){return columns();}

			/** returns a list of 3 lists,
			 * the 1st is a list for the db-table columns-CI
			 * the 2nd is a list for the db-table-key-indices
			 * the 3rd is a list for row insertion
			 *
			 * the 1st list, the definition of the column is a string
			 * , e.i. varchar(255) not null
			 * or e.i. int(18) primary key auto_increment not null
			 * the 2nd list of the db-table key-indices(optional)
			 * each dbt-key-index can be a CI or a list , if a list
			 * each item has to be a List
			 * ,can start with a prefix, e.i. unique , or key`ix1`
			 * , the items of this list should be a CI
			 * ,	or the item can be a list that has as the 1st item the CI
			 * and the 2nd item the length of the index
			 * the third list is optional, for each item in this list
			 * is a list of values to be inserted into the created table
			 */
			public abstract List creationDBTIndices(TL tl);

			public void checkDBTCreation(TL tl){
				String dtn=getName();Object o=null;
				try {o=TL.DB.q("desc "+dtn);} catch (SQLException ex) {
					tl.error(ex, "TL.DB.Tbl.checkTableCreation:check-pt1:",dtn);}
				try{if(o==null){
					StringBuilder sql=
					new StringBuilder("CREATE TABLE `")
					.append(dtn).append("` (\n");
					CI[]ci=columns();int an,x=0;
					List a=creationDBTIndices(tl),b=(List)a.get(0);

					for(CI i:ci){
						if(x>0 )
							sql.append("\n,");
						sql.append('`').append(i).append('`')
						.append(String.valueOf(b.get(x)) );
						x++;}
					an=a.size();b=an>1?(List)a.get(1):b;
					if(an>1)for(Object bo:b)
					{sql.append("\n,");x=0;
						if(bo instanceof CI)
							sql.append("KEY(`").append(bo).append("`)");
						else if(bo instanceof List)
						{	List bl=(List)bo;x=0;boolean keyHeadFromList=false;
							for(Object c:bl){
								boolean s=c instanceof String;
								if(x<1 && !s&& !keyHeadFromList)
									sql.append("KEY(");
								if(x>0)
									sql.append(',');//in the list
								if(s){sql.append((String)c);if(x==0){x--;keyHeadFromList=true;}}
								else {List l=c instanceof List?(List)c:null;
									sql.append('`').append(
										l==null?String.valueOf(c)
										:String.valueOf(l.get(0))
										).append("`");
									if(l!=null&&l.size()>1)
										sql.append('(').append(l.get(1)).append(')');
								}x++;
							}sql.append(")");
						}else
							sql.append(bo);
					}
					/*"KEY (`"+C.p+"`,`"+C.b+"`,`"+C.f+"`),\n" +
					 "KEY (`"+C.jsonRef+"`)\n" +
					 "KEY (`"+C.dt+"`)\n" +*/
					sql.append(") ENGINE=InnoDB DEFAULT CHARSET=utf8 ;");
					tl.log("TL.DB.Tbl.checkTableCreation:before:sql=",sql);
					int r=TL.DB.x(sql.toString());
					tl.log("TL.DB.Tbl.checkTableCreation:executedSql:",dtn,":returnValue=",r);
					b=an>2?(List)a.get(2):b;if(an>2)
						for(Object bo:b){
							List c=(List)bo;
							Object[]p=new Object[c.size()];
							c.toArray(p);
							vals(p);
							try {save();} catch (Exception ex) {
								tl.error(ex, "TL.DB.Tbl.checkTableCreation:insertion",c);}
						}
				}
				} catch (SQLException ex) {
					tl.error(ex, "TL.DB.Tbl.checkTableCreation:errMain:",dtn);}
			}//checkTableCreation

			/**where[]={col-name , param}*/
			public int count(Object[]where) throws Exception{
				StringBuilder sql=new StringBuilder(
				"select count(*) from `")
				.append(getName())
				.append("` where `")
				.append(where[0])
				.append("`=").append(Cols.M.m(where[0]).txt);//where[0]instanceof CI?m((CI)where[0]):'?');
				return DB.q1int(sql.toString(),-1,where[0],where[1]);}

			/**where[]={col-name , param}*/public
			int maxPlus1(CI col) throws Exception{
				StringBuilder sql=new StringBuilder(
													"select max(`"+col+"`)+1 from `")
				.append(getName()).append("`");
				return DB.q1int(sql.toString(),1);}

			/**returns one object from the db-query*/
			public Object obj(CI col,Object[]where) throws Exception{
				StringBuilder sql=new StringBuilder("select `")
				.append(col).append("` from `")
				.append(getName()).append('`');
				Cols.where(sql, where);
				return DB.q1Obj(sql.toString(),where);}

			/**returns one string*/
			public String select(CI col,Object[]where) throws Exception{
				StringBuilder sql=new StringBuilder("select `")
				.append(col).append("` from `")
				.append(getName()).append('`');
				Cols.where(sql, where);
				return DB.q1Str(sql.toString(),where);}

			/**returns one column, where:array of two elements:1st is column param, 2nd value of param*/
			Object[]column(CI col,Object...where) throws Exception{
				return DB.q1col("select `"+col+"` from `"+getName()
								+"` where `"+where[0]+"`="
								+Cols.M.m(where[0]).txt//(where[0]instanceof CI?m((CI)where[0]):Cols.M.prm)
								,where[0],where[1]);}//at

			/**returns a table*/
			public Object[][]select(CI[]col,Object[]where)throws Exception{
				StringBuilder sql=new StringBuilder("select ");
				Cols.generate(sql,col);
				sql.append(" from `").append(getName()).append('`');
				Cols.where(sql,where);
				return DB.Q(sql.toString(), where);}

			/**loads one row from the table*/
			Tbl load(ResultSet rs)throws Exception{return load(rs,fields());}

			/**loads one row from the table*/
			Tbl load(ResultSet rs,Field[]a)throws Exception{
				int c=0;for(Field f:a)v(f,rs.getObject(++c));
				return this;}

			/**loads one row from the table*/
			public Tbl load(Object pk){
				ResultSet r=null;TL t=tl();
				try{r=DB.r("select * from `"+getName()+"` where `"+pkc()+"`="+Cols.M.prm.txt,pk);
					if(r.next())load(r);
					else{t.error(null,"TL.DB.Tbl(",this,").load(pk=",pk,"):resultset.next=false");nullify();}}
				catch(Exception x){t.error(x,"TL.DB.Tbl(",this,"):",pk);}
				finally{DB.closeRS(r);}
				return this;}

			public Tbl nullify(){return nullify(fields());}
			public Tbl nullify(Field[]a){for(Field f:a)v(f,null);return this;}

			/**loads one row from the table*/
			Tbl load(){return load(pkv());}

			/**loads one object from column CI c ,from one row of primary-key value pkv ,from the table*/
			Object load(CI c){Object pkv=pkv();
				Object o=null;try{o=DB.q1obj("select `"+c+"` from `"+getName()+"` where `"+pkc()+"`="+Cols.M.m(c).txt,pkv);
					v(c,o);}
				catch(Exception x){tl().error(x,"TL.DB.Tbl(",this,").load(CI ",c,"):",pkv);}
				return o;}//load

			/**loads one row using column CI c */
			Tbl loadBy(CI c,Object v){
				try{Object[]a=DB.q1row("select * from `"
					+getName()+"` where `"+c+"`="+Cols.M.m(c).txt,v);
					vals(a);}
				catch(Exception x){tl().error(x,"TL.DB.Tbl(",this,").loadBy(",c,",",v,")");}
				return this;}//loadBy

			Tbl save(CI c){// throws Exception
				CI pkc=pkc();
				Object cv=v(c),pkv=pkv();TL t=TL.tl();
				if(cv instanceof Map)try
				{String j=t.jo().clrSW().o(cv).toString();cv=j;}
				catch (IOException e) {t.error(e,"TL.DB.Tbl.save(CI:",c,"):");}
				try{DB.x("replace into `"+getName()+"` (`"+pkc+
						 "`,`"+c+"`) values("+Cols.M.m(pkc).txt
						 +","+Cols.M.m(c).txt+")",pkv,cv);
					Integer k=(Integer)pkv;
					TL.DB.Tbl.Log.log(
									  TL.DB.Tbl.Log.Entity.valueOf(getName())
									  , k, TL.DB.Tbl.Log.Act.Update
									  , TL.Util.mapCreate(c,v(c)) );
				}catch(Exception x){tl().error(x
					,"TL.DB.Tbl(",this,").save(",c,"):pkv=",pkv);}
				return this;}//save

			/**store this entity in the dbt , if pkv is null , this method uses the max+1 */
			public Tbl save() throws Exception{
				Object pkv=pkv();CI pkc=pkc();boolean nw=pkv==null;//Map old=asMap();
				if(nw){
					int x=DB.q1int("select max(`"
								   +pkc+"`)+1 from `"+getName()+"`",1);
					v(pkc,pkv=x);
					tl().log("TL.DB.Tbl(",toJson(),").save-new:max(",pkc,") + 1:",x);
				}CI[]cols=columns();
				StringBuilder sql=new StringBuilder("replace into`")
				.append(getName()).append("`( ");
				Cols.generate(sql, cols).toString();
				sql.append(")values(").append(Cols.M.m(cols[0]).txt);//Cols.M.prm);
				for(int i=1;i<cols.length;i++)
					sql.append(",").append(Cols.M.m(cols[i]).txt);
				sql.append(")");//int x=
				DB.X( sql.toString(), vals() ); //TODO: investigate vals() for json columns
				log(nw?TL.DB.Tbl.Log.Act.New:TL.DB.Tbl.Log.Act.Update);
				return this;}//save

			public Tbl readReq_save() throws Exception{
				Map old=asMap();
				readReq("");
				Map val=asMap();
				for(CI c:columns()){String n=c.f().getName();
					Object o=old.get(n),v=val.get(n);
					if(o==v ||(o!=null && o.equals(v)))
					{val.remove(n);old.remove(n);}
					else save(c);}
				//log(TL.DB.Tbl.Log.Act.Update,old);
				return this;
			}//readReq_save

			public Tbl readReq_saveNew() throws Exception{
				Object pkv=pkv();readReq("");if(pkv()==null&&pkv!=null)v(pkc(),pkv);
				return save();//log(TL.DB.Tbl.Log.Act.Update,old);
			}//readReq_save

			@Override public Object[] vals() {
				Object[]r=super.vals();
				for(int i=0;i<r.length;i++)
					if(r[i] instanceof Map)
					{TL t=TL.tl();try {
						r[i]=t.jo().clrSW().o(r[i]).toStrin_();
					} catch (IOException e) {e.printStackTrace();}}
				return r;
			}

			void log(TL.DB.Tbl.Log.Act act)//,Map old)
			{	Map val=asMap();
				Integer k=(Integer)pkv();
				TL.DB.Tbl.Log.log(
					TL.DB.Tbl.Log.Entity.valueOf(getName())
					, k, act, val);}

			public int delete() throws SQLException{
				Object pkv=pkv();
				//if(pkv==null)return 0;
				//Map old=asMap();
				int x=TL.DB.x("delete from `"+getName()+"` where `"+pkc()+"`=?", pkv);
				log(TL.DB.Tbl.Log.Act.Delete);
				return x;}

			/**retrieve from the db table all the rows that match
			 * the conditions in < where > , create an iterator
			 * , e.g.<code>for(Tbl row:query(
			 * 		Tbl.where( CI , < val > ) ))</code>*/
			public Itrtr query(Object[]where){
				Itrtr r=new Itrtr(where);
				return r;}

			public class Itrtr implements Iterator<Tbl>,Iterable<Tbl>{
				public ResultSet rs=null;public int i=0;Field[]a;
				public Itrtr(Object[]where){a=fields();
					StringBuilder sql=new StringBuilder("select * from `"+getName()+"`");
					if(where!=null&&where.length>0)
						Cols.where(sql, where);
					try{rs=DB.R(sql.toString(), where);}
					catch(Exception x){tl().error(x,"TL.DB.Tbl(",this,").Itrtr.<init>:where=",where);}}

				@Override public Iterator<Tbl>iterator(){return this;}

				@Override public boolean hasNext(){boolean b=false;
					try {b = rs!=null&&rs.next();} catch (SQLException x)
					{tl().error(x,"TL.DB.Tbl(",this,").Itrtr.hasNext:i=",i,",rs=",rs);}
					if(!b&&rs!=null){DB.closeRS(rs);rs=null;}
					return b;}

				@Override public Tbl next(){i++;/*
					try {int c=0;for(Field f:fields())try{v(f,rs.getObject(++c));}catch(Exception x)
					{TL.error("DB.Tbl.Sql("+this+").I2.next:i="+i+",c="+c+",rs="+rs,x);}}catch(Exception x)
					{TL.error("DB.Tbl.Sql("+this+").I2.next:i="+i+":"+rs, x);rs=null;}*/
					try{load(rs,a);}catch(Exception x){tl().error(x,"TL.DB.Tbl("
						,this,").Itrtr.next:i=",i,":",rs);rs=null;}
					return Tbl.this;}

				@Override public void remove(){throw new UnsupportedOperationException();}

			}//Itrtr


			/**Class for Utility methods on set-of-columns, opposed to operations on a single column*/
			public static class Cols {//Marker ,sql-preparedStatement-parameter

				public enum M implements CI{
					uuid("uuid()")
					,now("now()")
					,count("count(*)")
					,all("*")
					,prm("?")
					,password("password(?)")
					,Null("null")
					,lt("<"),le("<="),ne("<>"),gt(">"),ge(">=")
					,or("or"),like("like")//,and("and"),prnthss("(")
					;String txt;
					private M(String p){txt=p;}
					public List of(CI c){return Util.lst(c,this);}
					public String text(){return txt;}
					public Class<? extends Tbl>cls(){return Tbl.class;}
					public Class<? extends Form>clss(){return cls();}
					public Tbl tbl(){return null;}
					public Field f(){return null;}
					public Object value(){return null;}
					public Object value(Object p){return null;}
					public Object val(Form f){return null;}
					public Object val(Form f,Object p){return null;}
					public Object load(){return null;}
					public void save(){}
					public static M m(Object p){return p instanceof CI?m((CI)p):p instanceof Field?m((Field)p):prm;}
					public static M m(CI p){return m(p.f());}
					public static M m(Field p){
						return p.getAnnotation(F.class).prmPw()?password:prm;}

				}//enum M

				//public static StringBuilder where(StringBuilder b,Field f){M m=m(f);b.append("`").append(f.getName()).append("`=").append(m);return b;}

				public static Field f(String name,Class<? extends Tbl>c){
					//for(Field f:fields(c))if(name.equals(f.getName()))return f;return null;
					Field r=null;try{r=c.getField(name);}catch(Exception x)
					{tl().error(x,"TL.DB.Tbl.f(",name,c,"):");}
					return r;}

				/**generate Sql into the StringBuilder*/
				public static StringBuilder generate(StringBuilder b,CI[]col){
					return generate(b,col,",");}

				static StringBuilder generate(StringBuilder b,CI[]col,String separator){
					if(separator==null)separator=",";
					for(int n=col.length,i=0;i<n;i++){
						if(i>0)b.append(separator);
						if(col[i] instanceof Cols.M)
							//b.append(((Col)col[i]).name);
							b.append(col[i]);
						//else if(col[i] instanceof Tbl)b.append('\'').append(col[i]).append('\'');
						//else if(col[i] instanceof String)b.append(col[i]);
						else b.append("`").append(col[i]).append("`");}
					return b;}

				static StringBuilder where(StringBuilder b,Object[]where){b.append(" where ");
					for(int n=where.length,i=0;i<n;i++){Object o=where[i];
						if(i>0)b.append(" and ");
						if(o instanceof Cols.M)b.append(o);else
						if(o instanceof CI)//((CI)where[i]).where(b);
							b.append('`').append(o).append("`=")
							.append(Cols.M.m(o).txt);
						else if(o instanceof List){List l=(List)o;o=l.get(0);
							b.append('`').append(o).append("`").append(l.get(1))
							.append(Cols.M.m(o).txt);}
						else tl().error(null,"TL.DB.Tbl.Col.where:for:",o);
						i++;
					}//for
					return b;}

			}//class Cols

			/**output to jspOut one row of json of this row*/
			public void outputJson(){try{TL.tl().getOut().o(this);}catch(IOException x){tl().error(x,"moh.TL.DB.Tbl.outputJson:IOEx:");}}

			/**output to jspOut rows of json that meet the 'where' conditions*/
			public void outputJson(Object...where){try{
				TL.Json.Output o=TL.tl().getOut();
				o.w('[');boolean comma=false;
				for(Tbl i:query(where)){
					if(comma)o.w(',');else comma=true;
					i.outputJson();}
				o.w(']');
			} catch (IOException e){tl().error(e,"TL.DB.Tbl.outputJson:");}
			}//outputJson(Object...where)
public static List<Class<? extends Tbl>>registered=new LinkedList<Class<? extends Tbl>>();
//			public void register(Class<? extends Tbl>p){registered.add(p);}
 static void check(TL tl){
	for(Class<? extends Tbl>c:registered)try
	{String n=c.getName(),n2=".checkDBTCreation."+n;
	 if( tl.a(n2)==null){
		Tbl t=c.newInstance();
		t.checkDBTCreation(tl);
		tl.a(n2,tl.now);
	}}catch(Exception ex){}
 }

			/**represents a row in the `usr` mysql table ,
			 * a sub class from TL.DB.Tbl,
			 * hence has built-in methods to operate with
			 * the mysql-table, like querying and and updating*/
			public static class Usr extends Tbl{
				static final String dbtName="Usr";
				/**the attribute-name	in the session*/
				public final static String prefix=dbtName;

				//public Usr(){super(Name);}
				@Override public String getName(){return dbtName;}
				@F public Integer uid;
				//public enum Gender{male,female}
				//public enum Flags{eu,auth,admin}
				//@F public Flags flags;
				@F public String un;
				@F(prmPw=true) public String pw;
				//@F public String full,tel,email;
				//@F public Date dob;
				//@F public Gender gender;
				//@F public URL img;
				@F(json=true) public Map json;

				/**load uid by un,pw , load from mysql*/
				public Integer loadUid()throws Exception{
					TL tl=TL.tl();tl.logo("Usr.loadUid:",this);
					Object o=obj(C.uid, where(C.un,un,C.pw,pw));
					if(o==null)uid=null;else
						if(o instanceof Integer)uid=(Integer)o;else
							if(o instanceof Number)uid=((Number)o).intValue();
							else uid=Integer.parseInt(o.toString());
					return uid;}

				/**returns null if the credentials are invalid,
				 * the credentials are username and password
				 * which are read from the http-request
				 * parameters "un" , "pw" */
				public static Usr login()throws Exception{//String un,String pw
					Usr u=new Usr();TL tl=TL.tl();
					u.readReq(prefix+".");tl.logo("Usr.login:",u);
					try{u.loadUid();tl.logo("Usr.login:2:",u);}catch(Exception x){tl.error(x,"DB.Tbl.Usr.login:loadUid");tl.logo("Usr.login:3:",u);}
					tl.log("Usr.login:u=",u);//n=",u.un," ,pw=",u.pw);
					if(u!=null&&u.uid!=null)u.load();
					else u=null;tl.logo("Usr.login:4:",u);
					return u;}

				/**update the member variables , load from the mysql table*/
				public void onLogin()throws Exception{
					TL tl=TL.tl();tl.logo("Usr.onLogin:1:",this);
					tl.usr=this;
					Ssn n=tl.ssn=new Ssn();
					n.sid=null;//0;
					n.uid=uid;
					n.auth=n.dt=
					n.last=new Date();
					n.save();
					n.usr=this;
					tl.s(Ssn.SessionAttrib,n);
					Object o=tl.s(StrSsnTbls);
					Map<Class<? extends TL.DB.Tbl>,TL.DB.Tbl>
					tbls=o instanceof Map?(Map)o:null;
					if(tbls==null)tl.s(StrSsnTbls,tbls=new
									   java.util.HashMap<Class<? extends TL.DB.Tbl>,TL.DB.Tbl>());
					tbls.put(Usr.class, tl.usr);
					tbls.put(Ssn.class, n);tl.logo("Usr.onLogin:n:",this);}

				/**update the member variables , save to the mysql table*/
				public void onSignup()throws Exception{onLogin();save();}

				public enum C implements CI{uid,un,pw,json;//,flags,full,tel,email,dob,gender,img;
					@Override public Class<? extends TL.DB.Tbl>cls(){return Usr.class;}
					@Override public Class<? extends TL.Form>clss(){return cls();}
					@Override public String text(){return name();}
					@Override public Field f(){return Cols.f(name(), cls());}
					@Override public TL.DB.Tbl tbl(){return TL.DB.Tbl.tbl(cls());}
					@Override public void save(){tbl().save(this);}
					@Override public Object load(){return tbl().load(this);}
					@Override public Object value(){return val(tbl());}
					@Override public Object value(Object v){return val(tbl(),v);}
					@Override public Object val(TL.Form f){return f.v(this);}
					@Override public Object val(TL.Form f,Object v){return f.v(this,v);}
				}//C

				@Override public CI pkc(){return C.uid;}
				@Override public Object pkv(){return uid;}
				@Override public C[]columns(){return C.values();}
				@Override public List creationDBTIndices(TL tl){
					return Util.lst(
									Util.lst("int(6) NOT NULL AUTO_INCREMENT PRIMARY KEY "//uid
											 ,"varchar(255) not null"//un
											 ,"varchar(255) not null"//pw
											 ,"text"//json
											 )
									,Util.lst(C.un)
									,Util.lst(Util.lst("1","admin","admin","{title:\"admin\",avatar:\"avatar.jpg\"}"))
									);/*CREATE TABLE `usr` (
									   `uid` int(6) NOT NULL AUTO_INCREMENT,
									   `flags` set('eu','auth','admin') not null default 'eu',
									   `un` varchar(255) NOT NULL,
									   `pw` varchar(255) NOT NULL,
									   `full` text ,
									   `tel` text ,
									   `email` text ,
									   `dob` date,
									   `gender` set('male','female'),
									   `img` text ,
									   PRIMARY KEY (`uid`),
									   KEY `uk` (`un`)
									   ) ENGINE=MyISAM DEFAULT CHARSET=utf8;

									   insert into usr values
									   (1,'admin','admin',password('admin'),'admin','admin','admin','1/1/1','male','admin'),
									   (2,'auth','auth',password('auth'),'auth','auth','auth','1/1/1','male','auth'),
									   (3,'eu','eu',password('eu'),'eu','eu','eu','1/1/1','male','eu');
									   */}
	static{registered.add(Usr.class);}
				}//class Usr

			public static class Ssn extends Tbl {//implements Serializable
				public static final String dbtName="ssn";
				static final String SessionAttrib="TL.DB.Tbl."+dbtName;
				Usr usr;

				@Override public String getName(){return dbtName;}//public	Ssn(){super(Name);}
				@F public Integer sid,uid;
				@F public Date dt,auth,last;

				public void onLogout()throws Exception{
					TL tl=TL.tl();tl.ssn=null;tl.usr=null;
					tl.s(Ssn.SessionAttrib,null);
					HttpSession s=tl.getSession();
					s.setMaxInactiveInterval(1);
				}

				public static void onEnter(){
					TL tl=TL.tl();Object o=tl.s(Ssn.SessionAttrib);
					if(o instanceof Ssn){
						Ssn n=(Ssn)o;
						tl.ssn=n;tl.usr=n.usr;
						tl.ssn.last=tl.now;
						n.save(C.last);}}

				public enum C implements CI{sid,uid,dt,auth,last;
					@Override public Class<? extends TL.DB.Tbl>cls(){return Ssn.class;}
					@Override public Class<? extends TL.Form>clss(){return cls();}
					@Override public String text(){return name();}
					@Override public Field f(){return Cols.f(name(), cls());}
					@Override public TL.DB.Tbl tbl(){return TL.DB.Tbl.tbl(cls());}
					@Override public void save(){tbl().save(this);}
					@Override public Object load(){return tbl().load(this);}
					@Override public Object value(){return val(tbl());}
					@Override public Object value(Object v){return val(tbl(),v);}
					@Override public Object val(TL.Form f){return f.v(this);}
					@Override public Object val(TL.Form f,Object v){return f.v(this,v);}

				}//C

				@Override public CI pkc(){return C.sid;}
				@Override public Object pkv(){return sid;}
				@Override public C[]columns(){return C.values();}
				@Override public List creationDBTIndices(TL tl){
					return Util.lst(
									Util.lst("int(6) PRIMARY KEY NOT NULL AUTO_INCREMENT"//sid
											 ,"int(6) NOT NULL"//uid
											 ,"timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"//dt
											 ,"timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'"//auth
											 ,"timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'"//last
											 ),Util.lst(C.dt,C.auth,C.last,Util.lst(C.uid,C.dt))
									);/*

									   CREATE TABLE `ssn` (
									   `sid` int(6) NOT NULL AUTO_INCREMENT,
									   `uid` int(6) NOT NULL ,
									   `dt` timestamp not null,
									   `auth` timestamp,
									   `last` timestamp not null,
									   PRIMARY KEY (`sid`),
									   KEY `kDt` (`dt`),
									   KEY `kAuth` (`auth`),
									   KEY `kLast` (`last`)
									   ) ENGINE=MyISAM DEFAULT CHARSET=utf8;
									   */}
				static{registered.add(Ssn.class);}
			}//class Ssn

			public static class Log extends Tbl {//implements Serializable
				public static final String dbtName="log";

				@Override public List creationDBTIndices(TL tl){
					return Util.lst(
									Util.lst("int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT"//no
											 ,"timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"//dt
											 ,"int(11) NOT NULL"//uid
											 ,"enum('projects','usr','sheets','json','ssn','log','buildings','floors')"//entity
											 ,"int(11) NOT NULL"//pk
											 ,"enum('New','Update','Delete','Login','Logout','Log','Error')"//act
											 ,"text"//json
											 )
									,Util.lst(Util.lst(C.uid,C.dt)
											  ,C.dt
											  ,Util.lst(C.entity,C.act,C.dt)
											  ,Util.lst(C.entity,C.pk,C.dt))
									);	/*projects,sheets,imgs

										 CREATE TABLE `log` (
										 `no` int(11) primary key,
										 `dt` timestamp not null,
										 `uid` int(11)not null,
										 `entity` enum('projects','usr','sheets','img','ssn','log'),
										 `pk` int(11) DEFAULT NULL,
										 `act` enum('New','Update','Delete','Login','Logout','Log','Error'),
										 `val` text,
										 `old` text,
										 key(uid,dt),
										 key(dt),
										 key(`entity`,`act`,`dt`),
										 key(`entity`,`pk`,`dt`)
										 ) ENGINE=InnoDB DEFAULT CHARSET=utf8 ;
										 */}
				@Override public String getName(){return dbtName;}//public	Ssn(){super(Name);}
				@F public Integer no;
				@F public Date dt;
				@F public Integer uid;
				public enum Entity{Project,usr,sheets,ssn,log,json,Building,Floor,Storage}//,img //CHANGED 2016.08.17.10.49
				@F public Entity entity;
				@F public Integer pk;
				public enum Act{New,Update,Delete,Login,Logout,Log,Error}
				@F public Act act;
				@F public String json;//,old;

				public enum C implements CI{no,dt,uid,entity,pk,act,json;//,old;
					@Override public Class<? extends TL.DB.Tbl>cls(){return Log.class;}
					@Override public Class<? extends TL.Form>clss(){return cls();}
					@Override public String text(){return name();}
					@Override public Field f(){return Cols.f(name(), cls());}
					@Override public TL.DB.Tbl tbl(){return TL.DB.Tbl.tbl(cls());}
					@Override public void save(){tbl().save(this);}
					@Override public Object load(){return tbl().load(this);}
					@Override public Object value(){return val(tbl());}
					@Override public Object value(Object v){return val(tbl(),v);}
					@Override public Object val(TL.Form f){return f.v(this);}
					@Override public Object val(TL.Form f,Object v){return f.v(this,v);}
				}//C

				@Override public CI pkc(){return C.no;}
				@Override public Object pkv(){return no;}
				@Override public C[]columns(){return C.values();}

				public static int log(Entity e,Integer pk,Act act,Map val){return log(TL.tl(),e,pk,act,val);}

				public static int log(TL t,Entity e,Integer pk,Act act,Map val){//,Map old
					int r=-1;try{//throws SQLException, IOException
						r= TL.DB.x(
							"insert into `"+dbtName+"`(`"+C.uid+"`,`"+C.entity+"`,`"+C.pk+"`,`"+C.act+"`,`"+C.json+"`) values(?,?,?,?,?)"
							,t.usr!=null?t.usr.uid:-1,e.toString(),pk , act.toString()
							, t.jo().clrSW().o(val).toString()
							//, null//t.jo().clrSW().o(old).toString()
					);}
					catch(Exception x){t.error(x,"TL.DB.Tbl.Log.log:ex:");}return r;}

				public static int log_(TL t,Entity e,Integer pk,Act act,Object val){//,Map old
					int r=-1;try{r= TL.DB.x(
						"insert into `"+dbtName+"`(`"+C.uid+"`,`"+C.entity+"`,`"+C.pk+"`,`"+C.act+"`,`"+C.json+"`) values(?,?,?,?,?)"
						,t.usr!=null?t.usr.uid:-1,e.toString(),pk , act.toString()
						, t.jo().clrSW().o(val).toString()
						//, null//t.jo().clrSW().o(old).toString()
						);t.log("TL.DB.Tbl.Log.log_:",e,",",pk,",",act,",",val);}
					catch(Exception x){t.error(x,"TL.DB.Tbl.Log.log:ex:");}
					return r;}
				static{registered.add(Log.class);}
			}//class Log

			public static class Json extends Tbl{
				enum Typ{Int,dbl,str,bool,dt,jsonRef,javaObjectDataStream;//,file,function,codeJson

					Object load(ResultSet rs){
						final int col=3;try{switch(this){
							case Int:return rs.getInt(col);
							case dbl:return rs.getDouble(col);
							case str:return rs.getString(col);
							case bool:{byte b=rs.getByte(col);return b==0?false:b==1?true:null;}
							case dt:return rs.getDate(col);
							case jsonRef:Long ref=rs.getLong(col);return TL.Util.mapCreate(Jr,ref);
							case javaObjectDataStream:java.sql.Blob b=rs.getBlob(col);
								java.io.ObjectInputStream s=new ObjectInputStream( b.getBinaryStream());
								Object o=s.readObject();s.close();
								return o;
						}}catch(Exception ex){TL.tl().error(ex, "TL.DB.Json.Typ.get");}
						return null;
					}//get(ResultSet)
					/*
					 int save(PreparedStatement ps,String p,Object v) throws Exception{
					 int x=-1;Typ t=this;try{
					 ps.setString(2, p);
					 ps.setString(3, t.toString());
					 switch(t){
					 case javaObjectDataStream:{
					 java.io.PipedInputStream pi=new PipedInputStream();
					 java.io.ObjectOutputStream s=new java.io.
					 ObjectOutputStream(new PipedOutputStream(pi));
					 s.writeObject(v);s.close();
					 ps.setBinaryStream(4, pi);}break;
					 case bool://ps.setObject(4, v==null?-1: ((Boolean)v).booleanValue() );break;
					 case Int:
					 case dbl:
					 case dt:
					 case str:
					 case jsonRef:
					 default:
					 ps.setObject(4, v);
					 }
					 x=ps.executeUpdate();
					 }catch(Exception ex){
					 TL.tl().error(ex,"TL.DB.Tbl.Json.Typ.save");}
					 return x;
					 }*

					 int save(PreparedStatement ps,String p,Object v) throws Exception{
					 int x=-1;Typ t=this;byte[]a=null;ByteBuffer b=null;
					 ps.setString(2, p);
					 ps.setString(3, t.toString());
					 switch(t){
					 case jsonRef:v=v instanceof Map?((Map)v).get(Jr):v;//ps.setObject(4, v);break;
					 case Int:b=ByteBuffer.allocate(8)
					 .putLong(((Number)v).longValue());break;
					 case dbl:b=ByteBuffer.allocate(8)
					 .putDouble(((Number)v).doubleValue());break;
					 case dt:b=ByteBuffer.allocate(8)
					 .putLong(((Date)v).getTime());break;
					 case bool:a=new byte[1];a[0]=(byte)(v==null?
					 -1:((Boolean)v).booleanValue()?1:0);break;
					 case str:a=((String)v).getBytes("utf8");break;
					 case javaObjectDataStream:{
					 java.io.PipedInputStream pi=new PipedInputStream();
					 java.io.ObjectOutputStream s=new java.io.
					 ObjectOutputStream(new PipedOutputStream(pi));
					 s.writeObject(v);s.close();
					 ps.setBinaryStream(4, pi);}break;
					 }//switch
					 if(b!=null)
					 a=b.array();
					 if(a!=null)
					 ps.setBytes(4,a);
					 x=ps.executeUpdate();
					 return x;}

					 Object load(ResultSet rs){
					 final int col=3;try{
					 if(this==javaObjectDataStream){
					 java.sql.Blob b=rs.getBlob(col);
					 ObjectInputStream s=new
					 ObjectInputStream( b.getBinaryStream());
					 Object o=s.readObject();s.close();
					 return o;}
					 byte[]a=rs.getBytes(col);
					 ByteBuffer b=this!=str?ByteBuffer.wrap(a):null;
					 switch(this){
					 case Int:return b.getLong();
					 case dbl:return b.getDouble();
					 case str:return new String(a,"utf8");
					 case bool:return a[0]==0?false:a[0]==1?true:null;
					 case dt:return new Date(b.getLong());
					 case jsonRef:return TL.Util.mapCreate(Jr,b.getLong());
					 }}catch(Exception ex){TL.tl().error(ex, "TL.DB.Json.Typ.get");}
					 return null;
					 }//get(ResultSet)
					 */
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
									   Create table `jsonHead`(
									   `jsonRef` int(18) primary key auto_increment,
									   `parent` int(18) not null,
									   `proto` int(18) not null,
									   `meta` text, -- json
									   Key (`parent`),
									   Key (`proto`),
									   );

									   Create table `Json`(
									   `no` int(24) primary key auto_increment,
									   `jsonRef` int(18) not null,
									   `path` text not null,
									   `typ` enum( 'Int' , 'dbl' , 'str' , 'bool' , 'dt' , 'jsonRef', ‘javaObjectDataStream’	) not null, --	, ‘file’ ,'function','codeJson','javaMap'
									   `json` blob ,
									   Unique ( `jsonRef` , `path`(64) ) ,
									   key(`typ`,`json`(64)) ,
									   key( `path`(64) , `typ`,`json`(64) )
									   );

									   Create table `log`(
									   `no` int(27) primary key auto_increment ,
									   `dt` timestamp not null ,
									   `proto` int(18) ,
									   `jsonRef`int(18) ,
									   `path` text ,
									   `json` blob ,
									   `act` enum(‘insert’ ,’update’ ,’delete’ ,’login’ ,’logout’) ,
									   Key (`proto`,`path`(64),`json`(64)),
									   key(`dt`),
									   key(`jsonRef`,`path`(64),`act`)
									   );
									   */}

				@F public Integer no,jsonRef;
				@F public String path;
				@F public Typ typ;
				@F public Object json;

				Map mv(){return json instanceof Map?(Map)json:asMap();}

				public enum C implements CI{no,jsonRef,path,typ,json;
					@Override public Class<? extends TL.DB.Tbl>cls(){return Json.class;}
					@Override public Class<? extends TL.Form>clss(){return cls();}
					@Override public String text(){return name();}
					@Override public Field f(){return Cols.f(name(), cls());}
					@Override public TL.DB.Tbl tbl(){return TL.DB.Tbl.tbl(cls());}
					@Override public void save(){tbl().save(this);}
					@Override public Object load(){return tbl().load(this);}
					@Override public Object value(){return val(tbl());}
					@Override public Object value(Object v){return val(tbl(),v);}
					@Override public Object val(TL.Form f){return f.v(this);}
					@Override public Object val(TL.Form f,Object v){return f.v(this,v);}
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
					{int j=TL.Util.parseInt(p[i], -1);
						if(j!=-1){
							Object[]a=(Object[])o;
							o=a[j];
							if(i<p.length)
								o=get(o,p,i+1);
						}
					}else if(o instanceof List)//Collection
					{int j=TL.Util.parseInt(p[i], -1);
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
					for(TL.DB.ItTbl.ItRow row:TL.DB.ItTbl.it(
															 "select `"+C.path+"`,`"+C.typ+"`,`"+C.json
															 +"` from `"+dbtName+"` where `"+C.jsonRef+"`=?", jsonRef))
						try{	String path=row.nextStr();Typ typ=Typ.valueOf(row.nextStr());
							int i=path.indexOf('.');Object v=typ.load(row.rs);if(i==-1)
							{Object o=ref.get(path);
								if(o==null)
									ref.put(path, v);
								else
									(tl==null?tl=TL.tl():tl).log("TL.DB.Tbl.Json.LoadRef(Map ref):wont overwrite:",path);
							}
							else
								set(ref,path.split("\\."),v,0);
						}catch(Exception ex){
							(tl==null?tl=TL.tl():tl).error(ex,"TL.DB.Tbl.Json.LoadRef:jr=",jsonRef,row);
						}
					ref.put(Jr, jsonRef);
					return ref;
				} // LoadRef

				/**remark(internal):o is parent*/
				static Object set(Object p,String[]path,Object v,int i){
					Object o=p;
					try{
						String s=path[i];int j=TL.Util.parseInt(s, -1)
						,j1=i+1<path.length?TL.Util.parseInt(path[i+1], -1):-1;
						if(o==null)
							o=j==-1&&j1==-1?TL.Util.mapCreate():TL.Util.lst();
						if(o instanceof Map){Map m=(Map)o;
							if(i==path.length-1)
								m.put(s, v);
							else if(i<path.length){
								o=m.get(s);
								if(o==null)
								{
									o=new HashMap();//TL.Util.mapCreate();
									m.put(s,o);}
								o=set(o,path,v,i+1);
							}
						}else if(o instanceof List){List m=(List)o;//TODO: switch List to map in cases j==-1
							if(i==path.length-1)//TODO: check when j==-1 with o instanceof List
								m.set(j, v);
							else if(i<path.length){
								o=m.get(j);
								if(o==null){
									o=j==-1?TL.Util.mapCreate():TL.Util.lst();
									m.set(j,o);}
								o=set(o,path,v,i+1);
							}
						}}catch(Exception ex){
							TL.tl().error(ex,
										  "TL.DB.Tbl.Json.set(Object o,String[]path,Object v,int i)"
										  , o ,path,v,i);}
					//if(i<path.length)o=set(o,path,v,i+1);
					return o;}

				static Map LoadRef( Object jsonRef ){
					Map m=jsonRef instanceof Map?(Map)jsonRef:
					//jsonRef instanceof Integer?:
					null;
					if(m!=null && m.get(Jr)==null)
						m.put(Jr, jrmp1());
					if(m==null) m=TL.Util.mapCreate(Jr
													,//jsonRef instanceof Number?jsonRef:
													jsonRef);
					return LoadRef(m);
				} // LoadRef

				/**return from the db tbl the max value of jsonRef plus 1 ,javadoc-draft2016.08.17.11.10*/
				static int jrMaxPlus1() throws SQLException{
					int no= TL.DB.q1int("select max(`"+C.jsonRef+"`)+1 from `"+dbtName+"`", 1);
					TL.tl().log("TL.DB.Tbl.Json.jrMaxPlus1=",no);
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
					List l=null;try {l=TL.DB.q1colList(
													   "select `jsonRef` from `Json` where `json`=? and `typ`=? and `path`=?"
													   , jsonRef , TL.DB.Tbl.Json.Typ.jsonRef , prop );
					} catch (SQLException ex) {t.error(ex,"allFK");}
					int n=l==null?0:l.size();
					Integer[]a=new Integer[n];
					for(int i=0;i<n;i++)
						a[i]=((Number)l.get(i)).intValue();
					return a;}

				/**return a list of the Primary keys of all props with this.jsonRef*/
				Integer[]allNo(TL t){
					List l=null;try {l=TL.DB.q1colList(
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
					for(TL.DB.ItTbl.ItRow row:TL.DB.ItTbl.it( "select `"
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
							Tbl.Log.log_(tl,Log.Entity.json, j.no, New?Log.Act.New:Log.Act.Update, j.json);
						}
					}catch(Exception ex){tl.error(ex,"TL.DB.Tbl.Json.saveProp:ex:path=",path,": json=",v);}
					return j;}

				void remOldPropsByPathStart(TL tl,String
											pathStarts,Map<String,Json>props){
					for(String k:props.keySet())try{
						if(k.startsWith(pathStarts))
						{	props.get(k).delete();
							props.remove(k);
						}
					}catch(Exception ex){tl.error(ex,
												  "TL.DB.Tbl.Json.remOldPropsByPathStart");}
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
								//Tbl.Log.log_(tl,Log.Entity.json, j.no, Log.Act.Delete, j.jsonRef);
								j.delete();
							}catch(Exception ex){tl.error(ex,"removeOldProps");}
						}//else
					}//for k
					catch(Exception ex){tl.error(ex,"TL.DB.Tbl.Json.removeOldProps");}
				}//removeOldProps


				static Map save(Map p){
					//Object o=p.get(Jr);int i=o instanceof Number?((Number)o).intValue():jrmp1();
					save(p,jrn(p));
					return p;
				}

				static Map save(Map p,int jr){
					Json j=new Json();
					j.jsonRef=jr;j.json=p;
					try{j.save();}catch(Exception ex){TL.tl().
						error(ex, "TL.DB.Tbl.Json.save:map,jr");}
					return p;}
				static{registered.add(Json.class);}
			}// class TL$DB$Json

/*idea:rhino Tbl, need rhino wrapper for Overriding
		getName ,@F , creationDBTIndices , pkc,pkv,columns
		 , CI enums & cls
 JsTblTest=function JsTblTest(){Packages.eu059s.AppEU059S.TL.registerOp(this);}
 JsTblTest.prototype=JavaAdaptor(Packages.eu059s.AppEU059S.TL.DB.Tbl,{
 dbtName:'JsTblTest'
 ,getName:function(){return this.dbtName;}
 ,C:{
    //enum columns,,,
    cls:function(){return JsTblTest.prototype;}
    				@Override public String text(){return name();}
					@Override public Field f(){return Cols.f(name(), cls());}
					@Override public TL.DB.Tbl tbl(){return TL.DB.Tbl.tbl(cls());}
					@Override public void save(){tbl().save(this);}
					@Override public Object load(){return tbl().load(this);}
					@Override public Object value(){return val(tbl());}
					@Override public Object value(Object v){return val(tbl(),v);}
					@Override public Object val(TL.Form f){return f.v(this);}
					@Override public Object val(TL.Form f,Object v){return f.v(this,v);}
    }//C
 //@F ,,,

				@Override public CI pkc(){return C.sid;}
				@Override public Object pkv(){return sid;}
				@Override public C[]columns(){return C.values();}
				@Override public List creationDBTIndices(TL tl){
					return Util.lst(
									Util.lst("int(6) PRIMARY KEY NOT NULL AUTO_INCREMENT"//sid
											 ,"int(6) NOT NULL"//uid
											 ,"timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"//dt
											 ,"timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'"//auth
											 ,"timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'"//last
											 ),Util.lst(C.dt,C.auth,C.last,Util.lst(C.uid,C.dt))
									);/*

									   CREATE TABLE `ssn` (
									   `sid` int(6) NOT NULL AUTO_INCREMENT,
									   `uid` int(6) NOT NULL ,
									   `dt` timestamp not null,
									   `auth` timestamp,
									   `last` timestamp not null,
									   PRIMARY KEY (`sid`),
									   KEY `kDt` (`dt`),
									   KEY `kAuth` (`auth`),
									   KEY `kLast` (`last`)
									   ) ENGINE=MyISAM DEFAULT CHARSET=utf8;
									   * /}

 }//JsTblTest.prototype


	idea: rhino Op sub class

	*/

		}//class Tbl
	}//class DB

	/**encapsulating Html-form fields, use annotation Form.F for defining/mapping member-variables to html-form-fields*/
	public abstract static class Form{
		//public final String name;
		//public abstract Fld[]fields();
		//public abstract Sql tbl();

		//public Form(String name){this.name=name;}
		@Override public String toString(){return toJson();}
		public abstract String getName();
		public String toJson(){Json.Output o= tl().jo().clrSW();
			try {o.oForm(this, "", "");}
			catch (IOException ex) {}return o.toString();}

		//public Writer toJson(Writer w){Json.Output o= new Json.Output(w);try {o.oForm(this, "", "").toString();}catch (IOException ex) {}return w;}

		public String[]prmsReq(String prefix){return prmsReq(prefix,fields());}

		public static String[]prmsReq (String prefix,Field[]a){
			String[]r=new String[a.length];int i=-1;TL t=tl();
			for(Object e:a)r[++i]=t.req(prefix+e);
			return r;}

		public static Object parse(String p,Class<?> c){
			TL t=tl();if(c.isEnum()){
				for(Object i:c.getEnumConstants())
					if(i!=null&&i.toString().equals(p))
						return i;}else
							if(c.isAssignableFrom(Float.class))return Float.parseFloat(p);else
								if(c.isAssignableFrom(Double.class))return Double.parseDouble(p);else
									if(c.isAssignableFrom(Integer.class))return Integer.parseInt(p);else
										if(c.isAssignableFrom(URL.class))try {return new URL("file:" +t.getServletContext().getContextPath()+'/'+p);}
			catch (Exception ex) {t.error(ex,"TL.Form.parse:URL:p=",p," ,c=",c);}else
				if(c.isAssignableFrom(String.class))return p;else
					if(c.isAssignableFrom(Date.class))try {return Util.parseDate(p);}//Util.dateFormat.parse(p);}
			catch (Exception ex) {t.error(ex,"TL.Form.parse:Date:p=",p," ,c=",c);}
					else//if(c.isAssignableFrom(Map.class))
						try{return Json.Parser.parse(p);}
			catch (Exception ex) {t.error(ex,"TL.Form.parse:Json.Parser.parse:p=",p," ,c=",c);}
			return null;}

		public Form readReq(String prefix){
			TL t=tl();FI[]a=flds();for(FI f:a){
				String s=t.req(prefix+f);
				Class <?>c=s==null?null:f.f().getType();
				Object v=null;try {
					if(s!=null)v=parse(s,c);
					v(f,v);//f.set(this, v);
				}catch (Exception ex) {// IllegalArgumentException,IllegalAccessException
					t.error(ex,"TL.Form.readReq:t=",this," ,field="
							,f+" ,c=",c," ,s=",s," ,v=",v);}}
			return this;}

		public abstract FI[]flds();

		public Object[]vals(){
			Field[]a=fields();
			Object[]r=new Object[a.length];
			int i=-1;
			for(Field f:a){i++;
				r[i]=v(a[i]);
			}return r;}

		public Form vals (Object[]p){
			Field[]a=fields();int i=-1;
			for(Field f:a)
				v(f,p[++i]);
			return this;}

		public Map asMap(){
			return asMap(null);}

		public Map asMap(Map r){
			Field[]a=fields();
			if(r==null)r=new HashMap();
			int i=-1;
			for(Field f:a){i++;
				r.put(f.getName(),v(a[i]));
			}return r;}

		public Form fromMap (Map p){
			Field[]a=fields();
			for(Field f:a)
				v(f,p.get(f.getName()));
			return this;}

		public Field[]fields(){return fields(getClass());}

		public static Field[]fields(Class<?> c){//this is beautiful(tear running down cheek)
			Field[]a=c.getDeclaredFields();
			List<Field>l=new LinkedList<Field>();
			for(Field f:a){F i=f.getAnnotation(F.class);//getDeclaredAnnotation
				if(i!=null)l.add(f);}
			//if(this instanceof Sql){};//<enum>.values() =:= c.getEnumConstants()
			Field[]r=new Field[l.size()];
			l.toArray(r);
			return r;}

		public Form v(FI p,Object v){return v(p.f(),v);}//this is beautiful(tear running down cheek)
		public Object v(FI p){return v(p.f());}//this is beautiful(tear running down cheek)

		public Form v(Field p,Object v){//this is beautiful(tear running down cheek)
			try{Class <?>t=p.getType();
				//boolean b=v!=null&&p.isEnumConstant();
				if(v!=null && !t.isAssignableFrom( v.getClass() ))//t.isEnum()||t.isAssignableFrom(URL.class))
					v=parse(v instanceof String?(String)v:String.valueOf(v),t);
				p.set(this,v);
			}catch (Exception ex) {tl().error(ex,"TL.Form.v(",this,",",p,",",v,")");}
			return this;}

		public Object v(Field p){//this is beautiful(tear running down cheek)
			try{return p.get(this);}
			catch (Exception ex) {//IllegalArgumentException,IllegalAccessException
				tl().error(ex,"TL.Form.v(",this,",",p,")");return null;}}


		/**Field annotation to designate a java member for use in a Html-Form-field/parameter*/
		@java.lang.annotation.Retention(java.lang.annotation.RetentionPolicy.RUNTIME)
		public @interface F{	boolean prmPw() default false;boolean json() default false; }


		/**Interface for enum-items from different forms and sql-tables ,
		 * the enum items represent a reference Column Fields for identifing the column and selection.*/
		public interface FI{//<T>
			public String text();
			//public String tblNm();
			public Class<? extends Form>clss();
			public Field f();
			public Object value();//<T>
			public Object value(Object p);//<T>
			public Object val(Form f);
			public Object val(Form f,Object p);
		}//interface I

	}//public abstract static class Form


	public Json.Output o(Object...a)throws IOException{if(out!=null&&out.w!=null)for(Object s:a)out.w.write(s instanceof String?(String)s:String.valueOf(s));return out;}

	public static class Json
	{
		public static class Output
		{ public Writer w;//JspWriter jw;
			public boolean initCache=false,includeObj=false,comment=false;
			Map<Object, String> cache;
			public static void out(Object o,Writer w,boolean initCache,boolean includeObj)
					throws IOException{Json.Output t=new Json.Output(w,initCache,includeObj);t.o(o);if(t.cache!=null){t.cache.clear();t.cache=null;}}
			public static String out(Object o,boolean initCache,boolean includeObj){StringWriter w=new StringWriter();
				try{out(o,w,initCache,includeObj);}catch(Exception ex){TL.tl().log("Json.Output.out",ex);}return w.toString();}
			public static String out(Object o){StringWriter w=new StringWriter();try{out(o,w,
					false,false);}catch(Exception ex){TL.tl().log("Json.Output.out",ex);}return w.toString();}
			public Output(){w=new StringWriter();}
			public Output(Writer p){w=p;}
			public Output(Writer p,boolean initCache,boolean includeObj)
			{w=p;this.initCache=initCache;this.includeObj=includeObj;}
			public Output(boolean initCache,boolean includeObj){this(new StringWriter(),initCache,includeObj);}
			public Output(String p)throws IOException{w=new StringWriter();w(p);}
			public Output(OutputStream p)throws Exception{w=new OutputStreamWriter(p);}

			public String toString(){return w==null?null:w.toString();}
			public String toStrin_(){String r=w==null?null:w.toString();clrSW();return r;}
			public Output w(char s)throws IOException{if(w!=null)w.write(s);return this;}
			public Output w(String s)throws IOException{if(w!=null)w.write(s);return this;}

			public Output p(String s)throws IOException{return w(s);}
			public Output p(char s)throws IOException{return w(s);}
			public Output p(long s)throws IOException{return w(String.valueOf(s));}
			public Output p(int s)throws IOException{return w(String.valueOf(s));}
			public Output p(boolean s)throws IOException{return w(String.valueOf(s));}

			public Output o(Object...a)throws IOException{return o("","",a);}
			public Output o(Object a,String indentation)throws IOException{return o(a,indentation,"");}
			public Output o(String ind,String path,Object[]a)throws IOException
			{for(Object i:a)o(i,ind,path);return this;}

			public Output o(Object a,String ind,String path)throws IOException
			{if(cache!=null&&a!=null&&((!includeObj&&path!=null&&path.length()<1)||cache.containsKey(a)))
			{Object p=cache.get(a);if(p!=null){o(p.toString());o("/*cacheReference*/");return this;}}
				final boolean c=comment;
				if(a==null)w("null"); //Object\n.p(ind)
				else if(a instanceof String)oStr(String.valueOf(a),ind);
				else if(a instanceof Boolean||a instanceof Number)w(a.toString());
				else if(a instanceof TL.Form)oForm((TL.Form)a,ind,path);
				else if(a instanceof Map<?,?>)oMap((Map)a,ind,path);
				else if(a instanceof Collection<?>)oCollctn((Collection)a,ind,path);
				else if(a instanceof Object[])oArray((Object[])a,ind,path);
				else if(a.getClass().isArray())oarray(a,ind,path);
				else if(a instanceof java.util.Date)oDt((java.util.Date)a,ind);
				else if(a instanceof Iterator<?>)oItrtr((Iterator)a,ind,path);
				else if(a instanceof Enumeration<?>)oEnumrtn((Enumeration)a,ind,path);
				else if(a instanceof Throwable)oThrbl((Throwable)a,ind);
				else if(a instanceof ResultSet)oResultSet(( ResultSet)a,ind,path);
				else if(a instanceof ResultSetMetaData)oResultSetMetaData((ResultSetMetaData)a,ind,path);
				//else if(a instanceof List<?>)oList((List<Object>)a,ind,cache,level);
				else if(a instanceof TL)oTL((TL)a,ind,path);
				else if(a instanceof ServletContext)oSC((ServletContext)a,ind,path);
				else if(a instanceof ServletConfig)oSCnfg((ServletConfig)a,ind,path);
				else if(a instanceof HttpServletRequest)oReq((HttpServletRequest)a,ind,path);
				else if(a instanceof HttpSession)oSession((HttpSession)a,ind,path);
				else if(a instanceof Cookie)oCookie((Cookie)a,ind,path);
//		else if(a instanceof java.sql.ConnectionMetaData)oConnectionMetaData((java.sql.ConnectionMetaData)a,ind,path);
					//else if(a instanceof Part)oPart((Part)a,ind,path);
				else if(a instanceof java.util.UUID)w("\"").p(a.toString()).w(c?"\"/*uuid*/":"\"");
				else{w("{\"class\":").oStr(a.getClass().getName(),ind)
						.w(",\"str\":").oStr(String.valueOf(a),ind)
						.w(",\"hashCode\":").oStr(Long.toHexString(a.hashCode()),ind);
					if(c)w("}//Object&cachePath=\"").p(path).w("\"\n").p(ind);
					else w("}");}return this;}

	/*public Output oPart(Part p,String ind,String path)throws IOException{
	String i2=ind+'\n';if(comment)w("{//javax.servlet.http.Part:").
	w(p.getClass().toString()).w(':').oStr(path, ind).
	w('\n').p(ind);else w("{");
	w("\"name\":").oStr(p.getName(),ind).
	w(",\"ContentType\":").oStr(p.getContentType(),ind).
	//w(",\"SubmittedFileName\":").oStr(p.getSubmittedFileName(),ind).
	w(",\"size\":").p(p.getSize()).w(",\"headers\":{");int comma=-1;
	for(String f:p.getHeaderNames()){w(comma++ >0?',':' ')
	.oStr(f,i2).w(':').o(p.getHeaders(f),i2,comment?path+'.'+f:path);
	if(comment)w("//").w(f).w("\n").p(i2);}
	return comment?w("}}//javax.servlet.http.Part:").oStr(path, ind).w('\n').w(ind):w("}}");}*/

			public Output oFormFlds(TL.Form p,String ind,String path)throws IOException{
				Field[]a=p.fields();String i2=ind+'\n';
				w("\"name\":").oStr(p.getName(),ind);
				for(Field f:a)
				{	w(',').oStr(f.getName(),i2).w(':')
						.o(p.v(f),ind,comment?path+'.'+f.getName():path);
					if(comment)w("//").w(f.toString()).w("\n").p(i2);
				}return this;}

			public Output oForm(TL.Form p,String ind,String path)throws IOException{
				if(p instanceof TL.DB.Tbl)return oDbTbl((TL.DB.Tbl)p,ind,path);
				if(comment)w("{//TL.Form:").w(p.getClass().toString()).w('\n').p(ind);
				else w('{');
				oFormFlds(p,ind,path);
				return (comment?w("}//TL.Form&cachePath=\"").p(path).w("\"\n").p(ind):w('}'));}

			public Output oDbTbl(TL.DB.Tbl p,String ind,String path)throws IOException{
				if(comment)w("{//TL.DB.Tbl:pkc=").o(p.pkc()).w(':')
						.w(p.getClass().toString()).w("\n").p(ind);else w('{');
				oFormFlds(p,ind,path);
				return comment?w("}//TL.DB.Tbl&cachePath=\"").p(path).w("\"\n").p(ind):w('}');}

			public Output oStr(String a,String indentation)throws IOException
			{final boolean m=comment;if(a==null)return w(m?" null //String\n"+indentation:"null");
				w('"');for(int n=a.length(),i=0;i<n;i++)
			{char c=a.charAt(i);if(c=='\\')w('\\').w('\\');
			else if(c=='"')w('\\').w('"');
			else if(c=='\n'){w('\\').w('n');if(m)w("\"\n").p(indentation).w("+\"");}
			else if(c=='\r')w('\\').w('r');
			else if(c=='\t')w('\\').w('t');
			else if(c=='\'')w('\\').w('\'');
			else p(c);}return w('"');}

			public Output oDt(java.util.Date a,String indentation)throws IOException
			{if(a==null)return w(comment?" null //Date\n":"null");
				w("{\"class\":\"Date\",\"time\":").p(a.getTime())
						.w(",\"str\":").oStr(a.toString(),indentation);
				if(comment)w("}//Date\n").p(indentation);else w("}");
				return this;}

			public Output oThrbl(Throwable x,String indentation)throws IOException
			{w("{\"message\":").oStr(x.getMessage(),indentation).w(",\"stackTrace\":");
				try{StringWriter sw=new StringWriter();
					x.printStackTrace(new PrintWriter(sw));
					oStr(sw.toString(),indentation);}catch(Exception ex)
				{TL.tl().log("Json.Output.x("+x+"):",ex);}return w("}");}

			public Output oEnumrtn(Enumeration a,String ind,String path)throws IOException
			{final boolean c=comment;
				if(a==null)return c?w(" null //Enumeration\n").p(ind):w("null");
				boolean comma=false;String i2=c?ind+"\t":ind;
				if(c)w("[//Enumeration\n").p(ind);else w("[");
				if(c&&path==null)path="";if(c&&path.length()>0)path+=".";int i=0;
				while(a.hasMoreElements()){if(comma)w(" , ");else comma=true;
					o(a.nextElement(),i2,c?path+(i++):path);}
				return c?w("]//Enumeration&cachePath=\"").p(path).w("\"\n").p(ind):w("]");}

			public Output oItrtr(Iterator a,String ind,String path)throws IOException
			{final boolean c=comment;if(a==null)return c?w(" null //Iterator\n").p(ind):w("null");
				boolean comma=false;String i2=c?ind+"\t":ind;
				if(c){w("[//").p(a.toString()).w(" : Itrtr\n").p(ind);
					if(path==null)path="";if(path.length()>0)path+=".";}
				else w("[");int i=0;
				while(a.hasNext()){if(comma)w(" , ");else comma=true;o(a.next(),i2,c?path+(i++):path);}
				return c?w("]//Iterator&cachePath=\"").p(path).w("\"\n").p(ind):w("]");}

			public Output oArray(Object[]a,String ind,String path)throws IOException
			{final boolean c=comment;
				if(a==null)return c?w(" null //array\n").p(ind):w("null");
				String i2=c?ind+"\t":ind;
				if(c){w("[//array.length=").p(a.length).w("\n").p(ind);
					if(path==null)path="";if(path.length()>0)path+=".";}else w("[");
				for(int i=0;i<a.length;i++){if(i>0)w(" , ");o(a[i],i2,c?path+i:path);}
				return c?w("]//cachePath=\"").p(path).w("\"\n").p(ind):w("]");}

			public Output oarray(Object a,String ind,String path)throws IOException
			{final boolean c=comment;
				if(a==null)return c?w(" null //array\n").p(ind):w("null");
				int n=Array.getLength(a);String i2=c?ind+"\t":ind;
				if(c){w("[//array.length=").p(n).w("\n").p(ind);
					if(path==null)path="";if(path.length()>0)path+=".";}else w("[");
				for(int i=0;i<n;i++){if(i>0)w(" , ");o(Array.get(a,i),i2,c?path+i:path);}
				return c?w("]//cachePath=\"").p(path).w("\"\n").p(ind):w("]");}

			public Output oCollctn(Collection o,String ind,String path)throws IOException
			{if(o==null)return w("null");final boolean c=comment;
				if(c){w("[//").p(o.getClass().getName()).w(":Collection:size=").p(o.size()).w("\n").p(ind);
					if(cache==null&&initCache)cache=new HashMap<Object, String>();
					if(cache!=null)cache.put(o,path);
					if(c&&path==null)path="";if(c&&path.length()>0)path+=".";
				}else w("[");
				Iterator e=o.iterator();int i=0;
				if(e.hasNext()){o(e.next(),ind,c?path+(i++):path);
					while(e.hasNext()){w(",");o(e.next(),ind,c?path+(i++):path);}}
				return c?w("]//").p(o.getClass().getName()).w("&cachePath=\"").p(path).w("\"\n").p(ind)
						:w("]");}

			public Output oMap(Map o,String ind,String path) throws IOException
			{if(o==null)return w("null");final boolean c=comment;
				if(c){w("{//").p(o.getClass().getName()).w(":Map\n").p(ind);
					if(cache==null&&initCache)cache=new HashMap<Object, String>();
					if(cache!=null)cache.put(o,path);}else w("{");
				Iterator e=o.keySet().iterator();Object k,v;
				//if(o instanceof Store.Obj)w("uuid:").o(((Store.Obj)o).uuid);
				if(e.hasNext()){k=e.next();v=o.get(k);//if(o instanceof Store.Obj)w(",");
					o(k,ind,c?path+k:path);w(":");o(v,ind,c?path+k:path);}
				while(e.hasNext()){k=e.next();v=o.get(k);w(",");
					o(k,ind,c?path+k:path);w(":");o(v,ind,c?path+k:path);}
				if(c) w("}//")
						.p(o.getClass().getName())
						.w("&cachePath=\"")
						.p(path)
						.w("\"\n")
						.p(ind);else w("}");
				return this;}

			public Output oReq(HttpServletRequest r,String ind,String path)throws IOException
			{final boolean c=comment;try{boolean comma=false,c2;//,d[]
				String k,i2=c?ind+"\t":ind,ct;int j;Enumeration e,f;
				(c?w("{//").p(r.getClass().getName()).w(":HttpServletRequest\n").p(ind):w("{"))
						.w("\"dt\":").oDt(TL.tl().now,i2)//new java.util.Date()
						.w(",\"AuthType\":").o(r.getAuthType(),i2,c?path+".AuthTyp":path)
						.w(",\"CharacterEncoding\":").o(r.getCharacterEncoding(),i2,c?path+".CharacterEncoding":path)
						.w(",\"ContentLength\":").o(r.getContentLength(),i2,c?path+".ContentLength":path)
						.w(",\"ContentType\":").o(ct=r.getContentType(),i2,c?path+".ContentType":path)
						.w(",\"ContextPath\":").o(r.getContextPath(),i2,c?path+".ContextPath":path)
						.w(",\"Method\":").o(r.getMethod(),i2,c?path+".Method":path)
						.w(",\"PathInfo\":").o(r.getPathInfo(),i2,c?path+".PathInfo":path)
						.w(",\"PathTranslated\":").o(r.getPathTranslated(),i2,c?path+".PathTranslated":path)
						.w(",\"Protocol\":").o(r.getProtocol(),i2,c?path+".Protocol":path)
						.w(",\"QueryString\":").o(r.getQueryString(),i2,c?path+".QueryString":path)
						.w(",\"RemoteAddr\":").o(r.getRemoteAddr(),i2,c?path+".RemoteAddr":path)
						.w(",\"RemoteHost\":").o(r.getRemoteHost(),i2,c?path+".RemoteHost":path)
						.w(",\"RemoteUser\":").o(r.getRemoteUser(),i2,c?path+".RemoteUser":path)
						.w(",\"RequestedSessionId\":").o(r.getRequestedSessionId(),i2,c?path+".RequestedSessionId":path)
						.w(",\"RequestURI\":").o(r.getRequestURI(),i2,c?path+".RequestURI":path)
						.w(",\"Scheme\":").o(r.getScheme(),i2,c?path+".Scheme":path)
						.w(",\"UserPrincipal\":").o(r.getUserPrincipal(),i2,c?path+".UserPrincipal":path)
						.w(",\"Secure\":").o(r.isSecure(),i2,c?path+".Secure":path)
						.w(",\"SessionIdFromCookie\":").o(r.isRequestedSessionIdFromCookie(),i2,c?path+".SessionIdFromCookie":path)
						.w(",\"SessionIdFromURL\":").o(r.isRequestedSessionIdFromURL(),i2,c?path+".SessionIdFromURL":path)
						.w(",\"SessionIdValid\":").o(r.isRequestedSessionIdValid(),i2,c?path+".SessionIdValid":path)
						.w(",\"Locales\":").oEnumrtn(r.getLocales(),ind,c?path+".Locales":path)
						.w(",\"Attributes\":{");
				comma=false;
				e=r.getAttributeNames();while(e.hasMoreElements())
					try{k=e.nextElement().toString();if(comma)w(",");else comma=true;
						o(k).w(":").o(r.getAttribute(k),i2,c?path+"."+k:path);
					}catch(Throwable ex){TL.tl().error(ex,"HttpRequestToJsonStr:attrib");}
				w("}, \"Headers\":{");comma=false;e=r.getHeaderNames();
				while(e.hasMoreElements())try
				{k=e.nextElement().toString();
					if(comma)w(",");else comma=true;o(k).w(":[");
					f=r.getHeaders(k);c2=false;j=-1;while(f.hasMoreElements())
				{if(c2)w(",");else c2=true;o(f.nextElement(),i2,c?path+".Headers."+k+"."+(++j):path);}
					w("]");
				}catch(Throwable ex){TL.tl().error(ex,"Json.Output.oReq:Headers");}
				w("}, \"Parameters\":").oMap(r.getParameterMap(),i2,c?path+".Parameters":path)
						.w(",\"Session\":").o(r.getSession(false),i2,c?path+".Session":path)
						.w(", \"Cookies\":").o(r.getCookies(),i2,c?path+".Cookies":path);
				//if(ct!=null&&ct.indexOf("part")!=-1)w(", \"Parts\":").o(r.getParts(),i2,c?path+".Parts":path);
				//AsyncContext =r.getAsyncContext();
				//long =r.getDateHeader(arg0)
				//DispatcherType =r.getDispatcherType()
				//String =r.getLocalAddr()
				//String =r.getLocalName()
				//int =r.getLocalPort()
				//int =r.getRemotePort()
				//RequestDispatcher =r.getRequestDispatcher(String)
				//StringBuffer r.getRequestURL()
				//String r.getServerName()
				//int r.getServerPort()
				//ServletContext =r.getServletContext()
				//String r.getServletPath()
				//boolean r.isAsyncStarted()
				//boolean r.isAsyncSupported()
				//boolean r.isUserInRole(String)
			}catch(Exception ex){TL.tl().error(ex,"Json.Output.oReq:Exception:");}
				if(c)w("}//").p(r.getClass().getName()).w("&cachePath=\"").p(path).w("\"\n").p(ind);
				else w("}");
				return this;}

			Output oSession(HttpSession s,String ind,String path)throws IOException
			{final boolean c=comment;try{if(s==null)w("null");else
			{String i2=c?ind+"\t":ind;
				(c?w("{//").p(s.getClass().getName()).w(":HttpSession\n").p(ind):w("{"))
						.w("{\"isNew\":").p(s.isNew()).w(",sid:").oStr(s.getId(),ind)
						.w(",\"CreationTime\":").p(s.getCreationTime())
						.w(",\"MaxInactiveInterval\":").p(s.getMaxInactiveInterval())
						.w(",\"attributes\":{");Enumeration e=s.getAttributeNames();boolean comma=false;
				while(e.hasMoreElements())
				{Object k=e.nextElement().toString();if(comma)w(",");else comma=true;
					o(k,i2).w(":").o(s.getAttribute(String.valueOf(k)),i2,c?path+".Attributes."+k:path);
				}w("}");}}catch(Exception ex){TL.tl().error(ex,"Json.Output.Session:");}
				if(c)w("}//").p(s.getClass().getName()).w("&cachePath=\"").p(path).w("\"\n").p(ind);
				else w("}");
				return this;}

			public Output oCookie(Cookie y,String ind,String path)throws IOException
			{final boolean c=comment;try{(c?w("{//")
					.p(y.getClass().getName()).w(":Cookie\n").p(ind):w("{"))
					.w("\"Comment\":").o(y.getComment())
					.w(",\"Domain\":").o(y.getDomain())
					.w(",\"MaxAge\":").p(y.getMaxAge())
					.w(",\"Name\":").o(y.getName())
					.w(",\"Path\":").o(y.getPath())
					.w(",\"Secure\":").p(y.getSecure())
					.w(",\"Version\":").p(y.getVersion())
					.w(",\"Value\":").o(y.getValue());
			}catch(Exception ex){TL.tl().error(ex,"Json.Output.Cookie:");}
				if(c)try{w("}//").p(y.getClass().getName()).w("&cachePath=\"").p(path).w("\"\n").p(ind);
				}catch(Exception ex){TL.tl().error(ex,"Json.Output.Cookie:");}else w("}");
				return this;}

			Output oTL(TL y,String ind,String path)throws IOException
			{final boolean c=comment;try{String i2=c?ind+"\t":ind;
				(c?w("{//").p(y.getClass().getName()).w(":PageContext\n").p(ind):w("{"))
						.w("\"ip\":").o(y.ip,i2,c?path+".ip":path)
						.w(",\"usr\":").o(y.usr,i2,c?path+".usr":path)//.w(",uid:").o(y.uid,i2,c?path+".uid":path)
						.w(",\"ssn\":").o(y.ssn,i2,c?path+".ssn":path)//.w(",sid:").o(y.sid,i2,c?path+".sid":path)
						.w(",\"now\":").o(y.now,i2,c?path+".now":path)
						.w(",\"json\":").o(y.json,i2,c?path+".json":path)
						//.w(",\"response\":").o(y.response,i2,c?path+".response":path)
						.w(",\"Request\":").o(y.getRequest(),i2,c?path+".request":path)
						//.w(",\"Session\":").o(y.getSession(false))
						.w(",\"application\":").o(y.getServletContext(),i2,c?path+".application":path)
				//.w(",\"config\":").o(y.req.getServletContext().getServletConfig(),i2,c?path+".config":path)
				//.w(",\"Page\":").o(y.srvlt,i2,c?path+".Page":path)
				//.w(",\"Response\":").o(y.rspns,i2,c?path+".Response":path)
				;
			}catch(Exception ex){TL.tl().error(ex,"Json.Output.oTL:");}
				if(c)try{w("}//").p(y.getClass().getName()).w("&cachePath=\"").p(path).w("\"\n").p(ind);}
				catch(Exception ex){TL.tl().error(ex,"Json.Output.oTL:closing:");}
				else w("}");
				return this;}

			Output oSC(ServletContext y,String ind,String path)
			{final boolean c=comment;try{String i2=c?ind+"\t":ind;(c?w("{//").p(y.getClass().getName()).w(":ServletContext\n").p(ind):w("{"))
					.w(",\"ContextPath\":").o(y.getContextPath(),i2,c?path+".ContextPath":path)
					.w(",\"MajorVersion\":").o(y.getMajorVersion(),i2,c?path+".MajorVersion":path)
					.w(",\"MinorVersion\":").o(y.getMinorVersion(),i2,c?path+".MinorVersion":path);
				if(c)
					w("}//").p(y.getClass().getName()).w("&cachePath=\"").p(path).w("\"\n").p(ind);
				else w("}");
			}catch(Exception ex){TL.tl().error(ex,"Json.Output.ServletContext:");}
				return this;}

			Output oSCnfg(ServletConfig y,String ind,String path)throws IOException
			{final boolean c=comment;try{if(c)w("{//").p(y.getClass().getName()).w(":ServletConfiguration\n").p(ind);
			else w("{");
				//String getInitParameter(String)
				//Enumeration getInitParameterNames()
				//getServletContext()
				//String getServletName()	.w(",:").o(y.(),i2,c?path+".":path)
			}catch(Exception ex){TL.tl().error(ex,"Json.Output.ServletConfiguration:");}
				return c?w("}//").p(y.getClass().getName()).w("&cachePath=\"").p(path).w("\"\n").p(ind)
						:w("}");}

			Output oBean(Object o,String ind,String path)
			{final boolean c=comment;try{String i2=c?ind+"\t":ind,i3=c?i2+"\t":ind;Class z=o.getClass();
				(c?w("{//").p(z.getName()).w(":Bean\n").p(ind):w("{"))
						.w("\"str\":").o(o.toString(),i2,c?path+".":path)
//		.w(",:").o(o.(),i2,c?path+".":path)
				;java.lang.reflect.Method[]a=z.getMethods();//added 2015.11.21
				for(java.lang.reflect.Method m:a){String n=m.getName();
					if(n.startsWith("get")&&m//.getParameterCount()
							.getParameterTypes().length==0)
						w("\n").w(i2).w(",").p(n).w(':').o(m.invoke(o), i3, path+'.'+n);}
				if(c)w("}//").p(o.getClass().getName()).w("&cachePath=\"").p(path).w("\"\n").p(ind)
						;else w("}");}catch(Exception ex){TL.tl().error(ex,"Json.Output.Bean:");}return this;}

			Output oResultSet(ResultSet o,String ind,String path)
			{final boolean c=comment;try{String i2=c?ind+"\t":ind;
				TL.DB.ItTbl it=new TL.DB.ItTbl(o);
				(c?w("{//").p(o.getClass().getName()).w(":ResultSet\n").p(ind):w("{"))
						.w("\"h\":").oResultSetMetaData(it.row.m,i2,c?path+".h":path)
						.w("\n").p(ind).w(",\"a\":").o(it,i2,c?path+".a":path)
				;if(c)w("}//").p(o.getClass().getName()).w("&cachePath=\"").p(path).w("\"\n").p(ind)
						;else w("}");}catch(Exception ex){TL.tl().error(ex,"Json.Output.ResultSet:");}return this;}

			Output oResultSetMetaData(ResultSetMetaData o,String ind,String path)
			{final boolean c=comment;try{String i2=c?ind+"\t":ind;
				int cc=o.getColumnCount();
				if(c)w("[//").p(o.getClass().getName()).w(":ResultSetMetaData\n").p(ind);
				else w("[");
				for(int i=1;i<=cc;i++){
					if(i>1){if(c)w("\n").p(i2).w(",");else w(",");}
					w("{\"name\":").oStr(o.getColumnName( i ),i2)
							.w(",\"label\":").oStr(o.getColumnLabel( i ),i2)
							.w(",\"width\":").p(o.getColumnDisplaySize( i ))
							.w(",\"className\":").oStr(o.getColumnClassName( i ),i2)
							.w(",\"type\":").oStr(o.getColumnTypeName( i ),i2).w("}");
				}//for i<=cc
				if(c)w("]//").p(o.getClass().getName()).w("&cachePath=\"").p(path).w("\"\n").p(ind)
						;else w("]");}catch(Exception ex){TL.tl().error(ex,"Json.Output.ResultSetMetaData:");}return this;}
			Output clrSW(){if(w instanceof StringWriter){((StringWriter)w).getBuffer().setLength(0);}return this;}
			Output flush() throws IOException{w.flush();return this;}


		} //class Output

		public static class Parser
		{public String p,comments=null;
			public int offset,len,row,col;
			public char c;Map<String,Object>cache=null;
			//XmlTokenizer t;
			public final static Object NULL="null";

			public static Object parse(HttpServletRequest req)throws Exception{return parse(servletRequest_content2str(req));}

			public static Object parse(String p)throws Exception{Json.Parser j=new Json.Parser(p);return j.parse();}

			public static String servletRequest_content2str(HttpServletRequest req)throws Exception
			{int n=req.getContentLength(),i=0;byte[]ba;if(n<=0)return"{}";ba=new byte[n];java.io.InputStream is=req
					.getInputStream();while(n>0&&i>=0){i=is.read(ba,i,n);n-=i;}is.close();return new String(ba,"utf8");}

			public Parser(String p){init(p);}
			public void init(String p){this.p=p;offset=-1;len=p.length();row=col=1;c=peek();offset++;}

			public char peek(){return (offset+1<len)?p.charAt(offset+1):'\0';}

			public char next()
			{char c2=peek();if(c2=='\0'){if(offset<len)offset++;return c=c2;}
				if(c=='\n'||c=='\r'){row++;col=1;
					if(c!=c2&&(c2=='\n'||c2=='\r'))offset++;c=peek();offset++;}
				else{col++;offset++;c=c2;}return c;}

			public Object parse()throws Exception{Object r=null;while(c!='\0')r=parseItem();return r;}

			public Object parseItem()throws Exception
			{Object r=null;int i;skipWhiteSpace();switch(c)
			{case '"':case '\'':case '`':r=extractStringLiteral();break;
				case '0':case '1':case '2':case '3':case '4':
				case '5':case '6':case '7':case '8':case '9':
				case '-':case '+':case '.':r=extractDigits();break;
				case '[':r=extractArray();break;
				case '{':Map m=extractObject();
					r=m==null?null:m.get("class");
					if("date".equals(r)){r=m.get("time");
						r=new Date(((Number)r).longValue());}
					else r=m;break;
				case '(':next();skipWhiteSpace();r=parseItem();
					skipWhiteSpace();if(c==')')next();break;
				default:r=extractIdentifier();}skipWhiteSpace();
				if(comments!=null&&((i=comments.indexOf("cachePath=\""))!=-1
						||(cache!=null&&comments.startsWith("cacheReference"))))
				{if(i!=-1){if(cache==null)cache=new HashMap<String,Object>();int j=comments.indexOf
						("\"",i+=11);cache.put(comments.substring(i,j!=-1?j:comments.length()),r);}
				else r=cache.get(r);comments=null;}return r;}

			public void skipWhiteSpace()
			{boolean b=false;do{b=c==' '||c=='\t'||c=='\n'||c=='\r';
				while(c==' '||c=='\t'||c=='\n'||c=='\r')next();
				b=b||(c=='/'&&skipComments());}while(b);}

			public boolean skipComments()
			{char c2=peek();if(c2=='/'||c2=='*'){next();next();StringBuilder b=new StringBuilder();if(c2=='/')
			{while(c!='\0'&&c!='\n'&&c!='\r'){b.append(c);next();}
				if(c=='\n'||c=='\r'){next();if(c=='\n'||c=='\r')next();}
			}else
			{while(c!='\0'&&c2!='/'){b.append(c);next();if(c=='*')c2=peek();}
				if(c=='*'&&c2=='/'){b.deleteCharAt(b.length()-1);next();next();}
			}comments=b.toString();return true;}return false;}

			public String extractStringLiteral()throws Exception
			{char first=c;next();boolean b=c!=first&&c!='\0';
				StringBuilder r=new StringBuilder();while(b)
			{if(c=='\\'){next();switch(c)
			{case 'n':r.append('\n');break;case 't':r.append('\t');break;
				case 'r':r.append('\r');break;case '0':r.append('\0');break;
				case 'x':case 'X':next();r.append( (char)
					java.lang.Integer.parseInt(
							p.substring(offset,offset+2
							),16));next();//next();
				break;
				case 'u':
				case 'U':
					next();r.append( (char)
						java.lang.Integer.parseInt(
								p.substring(offset,offset+4
								),16));next();next();next();//next();
					break;default:if(c!='\0')r.append(c);}}
			else r.append(c);
				next();b=c!=first&&c!='\0';
			}if(c==first)next();return r.toString();}

			public Object extractIdentifier()
			{int i=offset;
				while(!Character.isUnicodeIdentifierStart(c))
				{System.err.println("unexpected:"+c+" at row="+row+", col="+col);next();return null;}
				next();
				while(c!='\0'&&Character.isUnicodeIdentifierPart(c))next();
				String r=p.substring(i,offset);
				return "true".equals(r)?new Boolean(true)
						:"false".equals(r)?new Boolean(false)
						:"null".equals(r)||"undefined".equals(r)?NULL:r;}

			public Object extractDigits()
			{int i=offset,iRow=row,iCol=col;boolean dot=c=='.';
				if(c=='0'&&offset+1<len)
				{char c2=peek();if(c2=='x'||c2=='X')
				{i+=2;next();next();
					while((c>='A'&&c<='F')
							||(c>='a'&&c<='f')
							||Character.isDigit(c))next();
					String s=p.substring(i,offset);
					try{return Long.parseLong(s,16);}
					catch(Exception ex){}return s;}}
				if(c=='-'||c=='+'||dot)next();
				else{offset=i;row=iRow;col=iCol;c=p.charAt(i);}
				while(c!='\0'&&Character.isDigit(c))next();
				if(!dot&&c=='.'){dot=true;next();}
				if(dot){while(c!='\0'&&Character.isDigit(c))next();}
				if(c=='e'||c=='E')
				{dot=false;next();if(c=='-'||c=='+')next();
					while(c!='\0'&&Character.isDigit(c))next();
				}else if(c=='l'||c=='L'||c=='d'||c=='D'||c=='f'||c=='F')next();
				String s=p.substring(i,offset);
				if(!dot)try{return Long.parseLong(s);}catch(Exception ex){}
				try{return Double.parseDouble(s);}catch(Exception ex){}return s;}

			public List<Object> extractArray()throws Exception
			{if(c!='[')return null;next();LinkedList<Object> r=new LinkedList<Object>();skipWhiteSpace();
				if(c!='\0'&&c!=']')r.add(parseItem());while(c!='\0'&&c!=']')
			{if(c!=',')throw new IllegalArgumentException("Array:("+row+","+col+") expected ','");
				next();r.add(parseItem());}if(c==']')next();return r;}

			public Map<Object,Object> extractObject()throws Exception
			{if(c=='{')next();else return null;skipWhiteSpace();HashMap<Object,Object> r=new HashMap<Object,Object>();
				Object k,v;Boolean t=new Boolean(true);while(c!='\0'&&c!='}')
			{v=t;if(c=='"'||c=='\''||c=='`')k=extractStringLiteral();else k=extractIdentifier();
				skipWhiteSpace();if(c==':'||c=='='){next();v=parseItem();}//else skipWhiteSpace();//{{
				if(c!='\0'&&c!='}'){if(c!=',')throw new IllegalArgumentException(
						"Object:("+row+","+col+") expected '}' or ','");next();skipWhiteSpace();
				}r.put(k,v);}if(c=='}')next();return r;}
		}//class Json.Parser
	}//class Json


	/** annotation to designate a java method as an ajax/xhr entry point of execution*/
	@java.lang.annotation.Retention(java.lang.annotation.RetentionPolicy.RUNTIME)
	public static @interface Op{
		boolean useClassName() default true;
		//boolean caseSensitive() default true;
		boolean nestJsonReq() default true;//if false , then only the returned-value from the method call is json-stringified as a response body, if true the returned-value is set in the json-request with prop-name "return"
		//String prefix() default "";//prefix for parameter names
		String urlPath() default "\n"; //if no method name match from parameters, then this string is mathed with the requested url, "*" means method will match any request path
		String prmName() default "";
	}//Op

	static Map<String,java.lang.reflect.Method>
	ops=new HashMap<String,java.lang.reflect.Method>(),
	url=new HashMap<String,java.lang.reflect.Method>();

	public static void registerOp(Class p){
		java.lang.reflect.Method[]b=p.getMethods();
		String cn=p.getSimpleName();
		for(java.lang.reflect.Method m:b){
			Op op= m.getAnnotation(Op.class);
			if(op!=null)
			{	String s=m.getName();
				ops.put(op.useClassName()?cn+"."+s:s,m);
				if(!"\n".equals(op.urlPath()))
					url.put(op.urlPath(),m);
			}
		}
	}//registerOp


	void respond(String contentType,String content){
		try{r("responseDone",true);
			rspns.setContentType(contentType);
			o(content);}catch(Exception ex){error(ex,"TL.respond:");}}

	public static void run(HttpServletRequest request,HttpServletResponse response,Writer out)throws IOException{
		TL tl=null;try
		{tl=TL.Enter(request,response,out);
			tl.r("contentType","text/json");//tl.logOut=tl.var("logOut",false);
			java.lang.reflect.Method op=ops.get(tl.req("op"));//Prm.op.toString()));

			if(op==null) {String p=tl.req.getContextPath();
				for (String s : url.keySet())
					if ( p.startsWith(s) || "*".equals(s) ) {//s == null || s.length() < 1 ||
						op = url.get(s);
						if(!"*".equals(s))break;
					}
			}
			tl.log("jsp:version2017.02.09.17.10:op=",op);
			//if((tl.usr!=null||tl.logOut)|| op==Op.login || op==Op.none)//TODO: AFTER TESTING DEVELOPMENT, REMOVE from if: logOut

			//op.doOp(AppEU059S.app(tl),tl.json);
			Object retVal=null;
			if(op!=null){
				Class[]prmTypes=op.getParameterTypes();//int n=prmTypes==null?0:prmTypes.length;
				Class cl=op.getDeclaringClass();
				Annotation[][] tv=op.getParameterAnnotations();//java.lang.reflect.TypeVariable<java.lang.reflect.Method>[]tv=op.getTypeParameters();
				int n=tv==null?0:tv.length,i=-1;
				Object[]args=new Object[n];
				for(Annotation[]t:tv)try{//java.lang.reflect.TypeVariable<java.lang.reflect.Method>t
					Op pp=t.length>0&&t[0] instanceof Op?(Op)t[0]:null;
					Class c=prmTypes[++i];
					String nm=pp!=null?pp.prmName():"arg"+i;//t.getName();
					Object o=null;
					if(TL.Form.class.isAssignableFrom(c))//c.isAssignableFrom(TL.Form.class))//TL.DB.Tbl
					{args[i]=o=c.newInstance();
						TL.Form f=(TL.Form)o;
						o=tl.json.get(nm);
						if(o instanceof Map)f.fromMap((Map)o);
						else if(o instanceof List)f.vals(((List)o).toArray());
						else if(o instanceof Object[])f.vals((Object[])o);
						else f.readReq("");
					}else
					 args[i]=o=TL.class.equals(c)?tl
						:AppEU059S.class.equals(c)?tl.a
							// :c==HttpServletRequest.class?tl.xxx	///  xxx
							// :c==HttpServletResponse.class?tl.rspns
							//:c==HttpSession.class?tl.getSession()
						:Map.class.equals(c)
							&&(nm.indexOf("p")!=-1)
							&&(nm.indexOf("r")!=-1)
							&&(nm.indexOf("m")!=-1)?tl.json
						:tl.req(nm,c);
				}catch(Exception ex){tl.error(ex,"TL.run:arg:i=",i);}
				retVal=n==0?op.invoke(cl)
					:n==1?op.invoke(cl,args[0])
					:n==2?op.invoke(cl,args[0],args[1])
					:n==3?op.invoke(cl,args[0],args[1],args[2])
					:n==4?op.invoke(cl,args[0],args[1]
						,args[2],args[3])
					:n==5?op.invoke(cl,args[0],args[1]
						,args[2],args[3],args[4])
					:n==6?op.invoke(cl,args[0],args[1]
						,args[2],args[3],args[4],args[5])
					:n==7?op.invoke(cl,args[0],args[1]
						,args[2],args[3],args[4],args[5],args[6])
					:op.invoke(cl,args);
				Op pp=op.getAnnotation(Op.class);
				if(pp!=null && pp.nestJsonReq() && tl.json!=null){
					tl.json.put("return",retVal);retVal=tl.json;}
			}
			// else TL.Util.mapSet(tl.response,"msg","Operation not authorized ,or not applicable","return",false);
			if(tl.r("responseDone")==null)
			{if(tl.r("responseContentTypeDone")==null)
				response.setContentType(String.valueOf(tl.r("contentType")));
				tl.getOut().o(retVal);
				tl.log("AppEU059S.TL.run:xhr-response:",tl.jo().o(retVal).toString());}
			tl.getOut().flush();
		}catch(Exception x){
			if(tl!=null){
				tl.error(x,"AppEU059S.jsp:");
				tl.getOut().o(x);
			}else
				x.printStackTrace();
		}finally{TL.Exit();}
	}//run op servlet.service

}//class TL //TL tl=null;try{tl=TL.Enter(request,out);

//public class AppEU059S

	static final String SsnNm="AppEU059S"
	,UploadPth="/eu059sUploads/";

	public static AppEU059S app(){return app(TL.tl());}
	public static AppEU059S app(TL tl){
		Object o=tl.s(SsnNm);
		if(o==null || !(o instanceof AppEU059S))
			tl.s(SsnNm,o=new AppEU059S());
		AppEU059S e=(AppEU059S)o;tl.a=e;//e.tl=tl;
		return e;}

	/**path to the uploaded files for Sheet (the sheet stored in the session)*/
	public String getUploadPath(){return UploadPth;
		/*//readVars();//if(proj.no!=sheet.p)proj.no=sheet.p;
		if(bld.no==-1)//sheet.b
			bld.no=sheet.b;
		if(flr.no==-1)//!=sheet.f
			flr.no=sheet.f;
		return UploadPth//+proj.no+'/'+bld.no+'/'+flr.no+'/'+sheet.no+'/'
		+sheet.p+'/'+sheet.b+'/'+sheet.f+'/'+sheet.no+'/';*/}

	{	/*

<servlet>
	<servlet-name>EU059Servlet</servlet-name>
	<servlet-class >eu059s.AppEU059S.Srvlt</servlet-class>
</servlet>
<servlet-mapping>
	<servlet-name>EU059Servlet</servlet-name>
	<url-pattern>/EU059S/*</url-pattern>
</servlet-mapping>

	void authenticate(Op op) throws Exception{

		if(tl.usr==null&&op==Op.login){tl.logo("index:4:login");
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

		if(tl.usr!=null&&op==Op.logout)
		{ TL.DB.Tbl.Log.log(TL.DB.Tbl.Log.Entity.usr, tl.usr.uid
				, TL.DB.Tbl.Log.Act.Logout
				,TL.Util.mapCreate("usr",tl.usr));
			tl.ssn.onLogout();}

		if(tl.usr==null){try{//tl.o("version 2016.05.04 08:36");
			//pageContext.include("flat-login-form/index.html");
			tl.o("<script>location=\"login.html\"</script>");
		}catch(Exception x){tl.error(x,"AppEU059S.authenticate");}
			tl.logo("index:8:end");
			return;
		}tl.logo("index:9");
	}//authenticate

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
			 ,"<script src=\"app.js\"></script><script>AppEU059S.clkEdit=clkEdit=\r\n"
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
			 ,"\t\t\t\t\t\t\t\t\t<form id=\"search\" method=\"get\" action=\"?",Prm.screen,'=',Prm.Screen.Search,'&',Prm.op,'=',Op.query
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
			 ,"\t\t\t\t\t\t\t\t<form id=\"search\" method=\"get\" action=\"?",Prm.screen,'=',Prm.Screen.Search,'&',Prm.op,'=',Op.query
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
		AppEU059S e=this;
		if(e.screen==Prm.Screen.UsersList){
			tl.o("\r\n"
				 ,"\t\t\t\t\t\t\t\t\t<li>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t<a href=\"#\">\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t\t<h3>New User</h3>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t\t<p><form method=\"post\"><input type=\"hidden\" name=\"",Prm.op
				 ,"\" value=\"",Op.newUser
				 ,"\"/><input type=\"submit\" value=\"Create\"/></form></p>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t</a>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t</li>");
		}else if(e.screen==Prm.Screen.User){
			tl.o("\r\n"
				 ,"\t\t\t\t\t\t\t\t\t<li>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t<a href=\"#\">\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t\t<h3>Delete User</h3>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t\t<p><form method=\"post\"><input type=\"hidden\" name=\"",Prm.op
				 ,"\" value=\"",Op.deleteUser
				 ,"\"/><input type=\"submit\" value=\"Delete\"/></form></p>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t</a>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t</li>");
		}else if(e.screen==Prm.Screen.ProjectsList){
			tl.o("\r\n"
				 ,"\t\t\t\t\t\t\t\t\t<li>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t<a href=\"#\">\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t\t<h3>New Project</h3>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t\t<p><form method=\"post\"><input type=\"hidden\" name=\"",Prm.op
				 ,"\" value=\"",Op.newProject
				 ,"\"/><input type=\"submit\" value=\"Create\"/></form></p>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t</a>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t</li>");
		}else if(e.screen==Prm.Screen.ProjectScreen){
			tl.o("\r\n"
				 ,"\t\t\t\t\t\t\t\t\t<li>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t<a href=\"#\">\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t\t<h3>Delete Project</h3>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t\t<p><form method=\"post\"><input type=\"hidden\" name=\"",Prm.op
				 ,"\" value=\"",Op.deleteProject
				 ,"\"/><input type=\"submit\" value=\"Delete\"/></form></p>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t</a>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t</li>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t<li>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t<a href=\"#\">\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t\t<h3>New Building</h3>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t\t<p><form method=\"post\"><input type=\"hidden\" name=\"",Prm.op
				 ,"\" value=\"",Op.newBuilding
				 ,"\"/><input type=\"submit\" value=\"Create\"/></form></p>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t</a>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t</li>");
		}else if(e.screen==Prm.Screen.BuildingScreen){
			tl.o("\r\n"
				 ,"\t\t\t\t\t\t\t\t\t<li>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t<a href=\"#\">\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t<h3>Delete Building</h3>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t<p><form method=\"post\"><input type=\"hidden\" name=\"",Prm.op
				 ,"\" value=\"",Op.deleteBuilding
				 ,"\"/><input type=\"submit\" value=\"Delete\"/></form></p>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t</a>\r\n"
				 ,"\t\t\t\t\t\t\t\t</li>\r\n"
				 ,"\t\t\t\t\t\t\t\t<li>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t<a href=\"#\">\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t<h3>New Floor</h3>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t<p><form method=\"post\"><input type=\"hidden\" name=\"",Prm.op
				 ,"\" value=\"",Op.newFloor
				 ,"\"/><input type=\"submit\" value=\"Create\"/></form></p>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t</a>\r\n"
				 ,"\t\t\t\t\t\t\t\t</li>");
		}else if(e.screen==Prm.Screen.FloorScreen){
			tl.o("\r\n"
				 ,"\t\t\t\t\t\t\t\t\t<li>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t<a href=\"#\">\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t\t<h3>Delete Floor</h3>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t\t<p><form method=\"post\"><input type=\"hidden\" name=\"",Prm.op
				 ,"\" value=\"",Op.deleteFloor
				 ,"\"/><input type=\"submit\" value=\"Delete\"/></form></p>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t</a>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t</li>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t<li>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t<a href=\"#\">\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t\t<h3>New Sheet</h3>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t\t<p><form method=\"post\"><input type=\"hidden\" name=\"",Prm.op
				 ,"\" value=\"",Op.newSheet
				 ,"\"/><input type=\"submit\" value=\"Create\"/></form></p>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t\t</a>\r\n"
				 ,"\t\t\t\t\t\t\t\t\t</li>");
		}else if(e.screen==Prm.Screen.Sheet){
			tl.o("<li><a href=\"#\"><h3>Delete Sheet</h3>\r\n"
				 ,"<p><form method=\"post\"><input type=\"hidden\" name=\"",Prm.op
				 ,"\" value=\"",Op.deleteSheet
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
			 ,"\t\t\t\t\t\t\t\t\t<li><a href=\"?",Prm.op,'=',Op.logout
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
		tl.o("</table><a href=\"?",Prm.op,'=',Op.newUser,"\">New User</a>","\r\n");
	}//jspScreenUsersList

	void jspScreenConfig() throws IOException{
		tl.o("<h1>Config</h1>","Change Password");
	}//jspScreenConfig

	void jspScreenProjectsList() throws IOException{
		AppEU059S e=this;int serialNo=0;//Project p=new Project();
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
			 ,'&',Prm.op,'=',Op.newProject,"\">New Project</a>");
	}//jspScreenProjectsList

	void jspScreenProject() throws IOException, SQLException {
		AppEU059S e=this;int serialNo=1;
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
				 ,Prm.op,'=',Op.deleteProject,'&',Prm.projNo,'=',e.proj.no
				 ,"\" class=\"button big\">Delete Project</a>"
				 ,"<a href=\"?",Prm.screen,'=',Prm.Screen.BuildingScreen
				 ,'&',Prm.op,'=',Op.newBuilding,'&',Prm.projNo,'=',e.proj.no
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
		AppEU059S e=this;int serialNo=0;

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
	}//jspScreenBuildingList	//jspScreenProject

	void jspScreenBuilding()throws IOException, SQLException{
		AppEU059S e=this;int serialNo=1;
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
				 ,"\t\t\t\t<button ><a href=\"?",Prm.op,'=',Op.newFloor
				 ,"\">New Floor</a></button>\r\n"
				 ,"\t\t\t\t<button ><a href=\"?",Prm.op,'=',Op.deleteBuilding
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
		AppEU059S e=this;
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
			 ,Prm.op,"\" value=\"",Op.deleteFloor
			 ,"\"/><input type=\"submit\" value=\"Delete Floor\"/></form>\r\n"

			 ,"<form method=\"post\"><input type=\"hidden\" name=\""
			 ,Prm.op,"\" value=\"",Op.newSheet
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
		AppEU059S e=this;int serialNo=0,sIx=screen.ordinal();
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
		AppEU059S e=this;
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
				tl.error(ex,"AppEU059S:SheetScreen:load Sheet and Json map");}
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

	public static void jspOld
	(HttpServletRequest request
	 ,HttpServletResponse response
	 ,javax.servlet.http.HttpSession session
	 ,JspWriter out
	 ,javax.servlet.jsp.PageContext pageContext)
	throws IOException, javax.servlet.ServletException
	{TL tl=null;try{tl=TL.Enter(request,out);
		Op op=tl.req(Prm.op.toString(),Op.none);tl.logo("index:1:",op);
		response.setContentType("text/html; charset=UTF-8");
		tl.logOut=tl.var("logOut",false);
		AppEU059S e=AppEU059S.app(tl).appInit();
		e.authenticate(op);
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
	}//jspOld
	* /

 public static void jsp(HttpServletRequest request,HttpServletResponse response,Writer out)throws IOException{
	TL tl=null;try
	{tl=TL.Enter(request,response,out);
		tl.r("contentType","text/json");//tl.logOut=tl.var("logOut",false);
		Op op=tl.req(Prm.op.toString(),Op.none);
		tl.log("jsp:version2017.02.09.17.10:op=",op);
		//if((tl.usr!=null||tl.logOut)|| op==Op.login || op==Op.none)//TODO: AFTER TESTING DEVELOPMENT, REMOVE from if: logOut

			op.doOp(AppEU059S.app(tl),tl.json);
		// else TL.Util.mapSet(tl.response,"msg","Operation not authorized ,or not applicable","return",false);
		if(tl.r("responseDone")==null)
		{if(tl.r("responseContentTypeDone")==null)
			response.setContentType(String.valueOf(tl.r("contentType")));
			tl.getOut().o(tl.json);
			tl.log("AppEU059S:xhr-response:",tl.jo().o(tl.json).toString());}
		tl.getOut().flush();
	}catch(Exception x){
		if(tl!=null){
			tl.error(x,"AppEU059S.jsp:");
			tl.getOut().o(x);
		}else
			x.printStackTrace();
	}finally{TL.Exit();}
 }
/*
 void respond(String contentType,String content){
	try{tl.r("responseDone",true);
	tl.rspns.setContentType(contentType);
	tl.o(content);}catch(Exception ex){tl.error(ex,"AppEU059S.respond:");}}

 enum Op{
	 /**none is equivelant to bootstrapping the web-application system to Storage:key=app* /
 none{@Override void doOp(AppEU059S a,Map prms){//TODO: after the development stage of bootstrapping , change the respond to get from dbTbl-storage the js code path: "eu059s.bootStrap" ::= raw minimal js code to load LocalStorage "eu059s.BootStrap" and execute or do a xhr of xhr-op:eu059s.BootStrap
	a.respond("text/html",//"<html><head><script src=\"sys.js\"></script></head><body></body></html>"
	"<html><head><script>window.onload=function bootstrap(){"
+"	var path='eu059s.files:sys.js',x=localStorage[path] \n"
+"	function init(x){console.log('bootstrap.js:init:',x)\n"
+"		var s=document.createElement('script');			\n"
+"		document.body.appendChild(s);\n"
+"		s.text=x;}				\n"
+"	if(!x)						\n"
+"	{function xhr(p){			\n"
+"			if(!p)return p;		\n"
+"			var ct='Content-Type',cs='charset'	\n"
+"				,x=typeof XMLHttpRequest === 'undefined'\n"
+"				?new ActiveXObject('microsoft.XMLHTTP')\n"
+"				:new XMLHttpRequest();x.p=p;p.xhr=x;	\n"
+"			x.open(p.method||'POST',p.url||'', p.onload )\n"
+"			x.setRequestHeader(ct, 'text/json');\n"
+"			x.setRequestHeader(cs, 'utf-8');	\n"
+"			x.onload=p.onload					\n"
+"			x.send(JSON.stringify(p.data));		\n"
+"			console.log('xhr:response:',x.response,p,x); \n"
+"			return x.response;					\n"
+"		}//function xhr							\n"
+"		xhr({data:{op:'StorageGet',path:path	\n"
+"			,onload:function(e){				\n"
+"			localStorage[path]=x=e&&(e.response	\n"
+"				||(e.target&&e.target.response)	\n"
+"				||(e.src&&e.src.response))		\n"
+"			init(x);\n"
+"		}//onload function\n"
+"		}//data		\n"
+"		}//xhr param\n"
+"		)//xhr		\n"
+"	}//if !x		\n"
+"	else init(x)	\n"
+"}//function bootstrap\n"
+"</script></head><body></body></html>"
	);}}

 ,login{@Override void doOp(AppEU059S a,Map prms){try{
	TL.DB.Tbl.Usr u=TL.DB.Tbl.Usr.login();TL tl=a.tl;
	if(u!=null){u.onLogin();
		TL.DB.Tbl.Log.log(TL.DB.Tbl.Log.Entity.usr
			, tl.usr.uid
			, TL.DB.Tbl.Log.Act.Login
			,TL.Util.mapCreate("usr",tl.usr,"request",tl.req));}
	else// msg="incorrect login";
		TL.DB.Tbl.Log.log(TL.DB.Tbl.Log.Entity.usr
			, tl!=null&&tl.usr!=null?tl.usr.uid:-1
			, TL.DB.Tbl.Log.Act.Log
			,TL.Util.mapCreate(
				"msg","incorrect login"
				,"request",tl.req));}catch(Exception ex){
					a.tl.error(ex,"AppEU059S.Op.login:");}}}

 ,logout{@Override void doOp(AppEU059S a,Map prms)
	{try{TL.DB.Tbl.Log.log(TL.DB.Tbl.Log.Entity.usr, a.tl.usr.uid,TL.
		DB.Tbl.Log.Act.Logout,TL.Util.mapCreate("usr",a.tl.usr));
		a.tl.ssn.onLogout();}catch(Exception ex){
			a.tl.error(ex,"AppEU059S.Op.logout:");}}}

 ,newProject{@Override void doOp(AppEU059S a,Map prms){
	a.proj.no=null;//TL.DB.q1int("select max(`no`)+1 from projects;", 1);
	a.proj.json=TL.Util.mapCreate("title","Project "+a.tl.now
		, "date",TL.Util.formatDate( a.tl.now )
		, "shortDesc","short Desc"//"avatar","avatar.jpg"
		, "author",a.tl.usr.uid, "desc","description" );
	try{a.proj.save();}catch(Exception ex){a.tl.error(ex,"AppEU059S.Op.newProject:");}
	a.tl.s(Prm.projNo.toString(),a.proj.no);//a.tl.s(Prm.screen.toString(),a.screen=Prm.Screen.ProjectScreen);
	}}

 ,newBuilding{@Override void doOp(AppEU059S a,Map prms){
	a.bld.no=null;a.bld.p=a.proj.no;
	a.bld.json=TL.Util.mapCreate("date",TL.Util.formatDate( a.tl.now )
		, "author",a.tl.usr.uid , "title","Building "+a.tl.now );//"avatar","avatar.jpg"
	try{a.bld.save();}catch(Exception ex){a.tl.error(ex,"AppEU059S.Op.newBuilding:");}
	a.tl.s(Prm.buildingNo.toString(),a.bld.no);
	a.tl.s(Prm.screen.toString(), Prm.Screen.BuildingScreen);}}

 ,newFloor{@Override void doOp(AppEU059S a,Map prms){
	a.flr.no=null;a.flr.b=a.bld.no;a.flr.p=a.proj.no;
	a.flr.json=TL.Util.mapCreate("date", TL.Util.formatDate( a.tl.now )
		, "author",a.tl.usr.uid , "title","Floor "+a.tl.now);//"avatar","avatar.jpg"
	try{a.flr.save();}catch(Exception ex){a.tl.error(ex,"AppEU059S.Op.newFloor:");}
	a.tl.s(Prm.floorNo.toString(),a.flr.no);
	a.tl.s(Prm.screen.toString(), Prm.Screen.FloorScreen);}}

 ,newSheet{@Override void doOp(AppEU059S a,Map prms){
	a.sheet.no=null;
	a.sheet.dt=a.tl.now;a.sheet.u=a.tl.usr.uid;
	a.sheet.p=a.proj.no;a.sheet.b=a.bld.no;a.sheet.f=a.flr.no;
	//a.sheet.jsonRef=TL.DB.Tbl.Json.jrmp1();
	//a.sheet.m=a.sheet.asMap();
	//a.sheet.m.put("datetime", TL.Util.formatDate(a.sheet.dt ));
	TL.DB.Tbl.Json j=a.sheet.json();
	//a.sheet.m.put(j.Jr,j.jsonRef);
	//sheet.jsonRef=j.jsonRef=j.jrmp1();//((Number)sheet.m.get(TL.DB.Tbl.Json.Jr)).intValue();
	try{a.sheet.save();
	//a.sheet.m.put("no", a.sheet.no);j.save(a.sheet.m);
	}catch(Exception ex){a.tl.error(ex,"AppEU059S.Op.newSheet:");}
	a.tl.s(Prm.sheetNo.toString(), a.sheet.no);//a.tl.s(Prm.screen.toString(), a.screen=Prm.Screen.Sheet);
	}}

 ,newUser{@Override void doOp(AppEU059S a,Map prms){
	TL.DB.Tbl.Usr u=new TL.DB.Tbl.Usr();
	u.readReq("");//u .j=TL.Util.mapCreate name tel gender address email tel-ext id cid	"avatar","avatar.jpg"
	u.uid=null;
	try{u.save();}catch(Exception ex){a.tl.error(ex,"AppEU059S.Op.newUser:");}
	a.tl.s(Prm.screen.toString(), Prm.Screen.User);}}

 ,deleteProject{@Override void doOp(AppEU059S a,Map prms){
	try{a.proj.delete();}catch(Exception ex){a.tl.error(ex,"AppEU059S.Op.deleteProject:");}
	a.tl.s(Prm.projNo.toString(),a.proj.no=-1);//a.screen=Prm.Screen.ProjectsList;
	}}

 ,deleteBuilding{@Override void doOp(AppEU059S a,Map prms){
	try{a.bld.delete();}catch(Exception ex){a.tl.error(ex,"AppEU059S.Op.deleteBuilding:");}
	a.tl.s(Prm.buildingNo.toString(),a.bld.no=-1);//a.screen=Prm.Screen.ProjectScreen;
	}}

 ,deleteFloor{@Override void doOp(AppEU059S a,Map prms){
	try{a.flr.delete();}catch(Exception ex){a.tl.error(ex,"AppEU059S.Op.deleteFloor:");}
	a.tl.s(Prm.floorNo.toString(),a.flr.no=-1);//a.screen=Prm.Screen.BuildingScreen;
	}}

 ,deleteSheet{@Override void doOp(AppEU059S a,Map prms){
	/*deleteImages();
		void deleteImages(){try{
			//delete folder//Integer jsonRef=sheet.jsonRef;	 //AppEU059S app=app(t);app.
			String path=getUploadPath()
			,real=TL.context.getRealPath(tl,path);//t.getServletContext().getRealPath(path);
			File f=new File(real);
			if(f.exists())
				f.delete();
		}catch(Exception ex){tl.error(ex,"deleteImages");}
		}//deleteImages* /
	try{a.sheet.delete();}catch(Exception ex){a.tl.error(ex,"AppEU059S.Op.deleteSheet:");}
	a.tl.s(Prm.sheetNo.toString(), a.sheet.no=-1);//a.screen=Prm.Screen.FloorScreen;
	}}

 ,deleteUser{@Override void doOp(AppEU059S a,Map prms){
	TL.DB.Tbl.Usr u=new TL.DB.Tbl.Usr();u.readReq("");
	try{u.delete();}catch(Exception ex){a.tl.error(ex,"AppEU059S.Op.deleteUser:");}
	//a.tl.s(Prm.screen.toString(),a.screen=Prm.Screen.UsersList);
 }}
/*,userChngPw{@Override void doOp(AppEU059S a,Map prms){}}
,query{@Override void doOp(AppEU059S a,Map prms){/*
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
	* * /}}* /

 ,xhrEdit{@Override void doOp(AppEU059S a,Map prms){try{
	a.tl.log("AppEU059S.Op.xhrEdit : op==xhrEdit");
	//if(a.tl.response==null)a.tl.response=TL.Util.mapCreate();
	TL.Util.mapSet(prms,"msg","um...");//a.tl.response
	String entity=a.tl.req("entity");
	Map v=(Map)a.tl.json.get("v");
	Integer pk=a.tl.req("pk",-1);
	TL.DB.Tbl t="project".equals(entity)?a.proj
	:"building".equals(entity)?a.bld
	:"floor".equals(entity)?a.flr:null;
	a.tl.log("AppEU059S.Op.xhrEdit : entity=",entity," ,pk=",pk," ,v=",v ," ,t=",t);
	if(t!=null && pk!=-1)
	{t.load(pk);a.tl.log("AppEU059S.Op.xhrEdit : t!=null && pk!=-1");
		Map j=a.getJ(t);
		a.merge(j,v);
		a.tl.log("AppEU059S.Op.xhrEdit : merge:",t);
		t.save();
		a.tl.log("AppEU059S.Op.xhrEdit : save");
	}else a.tl.log("AppEU059S.Op.xhrEdit : else: t!=null && pk!=-1");
	a.tl.getOut().o(prms);//a.tl.response
	a.tl.log("AppEU059S.Op.xhrEdit : return");
	}catch(Exception ex){a.tl.error(ex,"AppEU059S.Op.xhrEdit:");}}}

 ,saveSheet{@Override void doOp(AppEU059S a,Map prms){try{
	a.tl.log("op-saveSheet");
	TL.DB.Tbl.Json json=a.sheet.json();
	Map old=null,j=null;//a.sheet.m,j=a.sheet.m=(Map) (json.json=a.tl.json.get("json"));
	//a.sheet.fromMap(j);
	for(int i=0;i<4;i++)try{
		String n="img"+(i+1);
		Object o=a.tl.json.get(n);//Map m=(Map)tl.json.get(n);
		if(o==null && old!=null)
			o=old.get(n);
		if(o!=null &&(!(o instanceof String) || o.toString().trim().length()>0))
			j.put(n, o);
	}catch(Exception ex){
		a.tl.error(ex,"AppEU059S.saveSheet");}
	j.put("no", a.sheet.no);
	json.save();
	a.sheet.save();}catch(Exception ex){a.tl.error(ex,"AppEU059S.Op.saveSheet:");}
	}}
 //,getImg

 ,StorageList{@Override void doOp(AppEU059S a,Map prms){
	Storage.C[]x={Storage.C.no,Storage.C.path,Storage.C.contentType,Storage.C.lastModified};
	a.storage.readReq("");
	StringBuilder sql=new StringBuilder("select ");
	TL.DB.Tbl.Cols.generate(sql,x)
		.append(" from ").append(Storage.dbtName)
		.append(" where `").append(Storage.C.lastModified).append("`>?");
	List<Object>l=TL.Util.lst(x),r;

	prms.put("return",l);//a.tl.response
	for (TL.DB.ItTbl.ItRow i:TL.DB.ItTbl.it( sql.toString()
		,a.storage.lastModified)) {
		l.add(r=TL.Util.lst());
		for (Storage.C c:x)
			r.add(i.next());}}}

 ,StorageGet{@Override void doOp(AppEU059S a,Map prms){
	try{a.storage.readReq("");a.storage.load();prms.put("return",a.storage);} catch (Exception e) {
		a.tl.error(e,"AppEU059S.Op.StorageGet");}}}

 ,StorageContent{@Override void doOp(AppEU059S a,Map prms){
	try{a.storage.readReq("");a.storage.load();//prms.put("return",a);
	//set response headers: lastModified,
	a.respond(a.storage.contentType,a.storage.data);
	} catch (Exception e) {
		a.tl.error(e,"Storage.Op.StorageContent");}}}/*

 ,StorageScript{@Override void doOp(AppEU059S a,Map prms){
	try{a.storage.readReq("");a.storage.load();//prms.put("return",a);
	//set response headers: lastModified,
	a.respond(a.storage.contentType,a.storage.data);
	} catch (Exception e) {
		a.tl.error(e,"AppEU059S.Op.get");}}}

 ,StorageCss{@Override void doOp(AppEU059S a,Map prms){
	try{a.storage.readReq("");a.storage.load();prms.put("return",a);} catch (Exception e) {
		a.tl.error(e,"AppEU059S.Op.get");}}}

 ,StorageImg{@Override void doOp(AppEU059S a,Map prms){
	try{a.storage.readReq("");a.storage.load();prms.put("return",a);} catch (Exception e) {
		a.tl.error(e,"AppEU059S.Op.get");}}}* /

 ,StorageSet{@Override void doOp(AppEU059S a,Map prms) {
	try{a.storage.readReq_save();prms.put("return",true);} catch (Exception e) {
		a.tl.error(e,"AppEU059S.Op.StorageSet");}}}

 ,StorageNew{@Override void doOp(AppEU059S a,Map prms) {
	try{int no=a.storage.no=a.storage.maxPlus1(Storage.C.no);
	prms.put("return",no);
	a.storage.readReq_saveNew();} catch (Exception e) {
		a.tl.error(e,"AppEU059S.Op.StorageNew");}}}

 ,StorageDelete{@Override void doOp(AppEU059S a,Map prms) {
	try{a.storage.readReq("");
	prms.put("return",a.storage.delete());} catch (Exception e) {
		a.tl.error(e,"AppEU059S.Op.StorageDelete");}}}

 //,StorageSyncOffline{@Override void doOp(TL tl,Map prms){}}
 ;
 void doOp(AppEU059S a,Map params){params.put("msg","op not implemented");}
 }//enum Op

//public interface IOp{public void doOp(AppEU059S a,Map params);}

public static class Srvlt extends HttpServlet{
 @Override public void service(HttpServletRequest q,HttpServletResponse r)
	throws IOException, javax.servlet.ServletException{jsp(q,r,r.getWriter());}//jsp

 //@Override  public void init(){}//Servlet.init
}//public static class Srvlt extends HttpServlet


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

	AppEU059S appInit(){try{
		//screen=tl.var(Prm.screen.toString(),Prm.Screen.ProjectsList);
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
			//j.json=sheet.m=j.LoadRef(j.jsonRef);
			//if(sheet.f!=flr.no)flr.load(sheet.f);
		}//else sheet.m=null;
		}
		/*if(sheet!=null && sheet.no!=null && sheet.jsonRef==null)
			sheet.jsonRef=TL.DB.q1int(
				"select `"+Sheet.C.jsonRef
				+"` from `"+sheet.getName()
				+"` where `"+Sheet.C.no
				+"`=?", -1, sheet.no);

		/*sheet=(Sheet)tl.s("sheet");
		 if(sheet==null)
		 {//sheet=new;
		 sheet.no=tl.var(Prm.sheetNo.toString(),-1).intValue();
		 if(sheet.no!=-1)
		 {	sheet.load();
		 TL.DB.Tbl.Json j=sheet.json();
		 j.load();
		 if(j.json instanceof Map)
		 {	sheet.m=(Map)j.json;
		 sheet.m.get(TL.DB.Tbl.Json.Jr);
		 }
		 }
		 tl.s("sheet",sheet);
		 }else
		 {Number n=tl.var(Prm.sheetNo.toString(),sheet.no);
		 if(n!=sheet.no)
		 sheet.load(n);
		 }
		 * /
		 if(sheet!=null && flr!=null && flr.no!=null && sheet.f!=null && sheet.f!=-1 && sheet.f!=flr.no)flr.load(sheet.f);
		 if(flr!=null && bld!=null && flr.no!=null && bld.no!=null && flr.b!=-1 && flr.b!=bld.no)bld.load(flr.b);
		 if( bld!=null && proj!=null && bld.no!=null && proj.no!=null && bld.p!=-1 && bld.p!=proj.no)proj.load(bld.p);* /
	}catch(Exception ex){
		tl.error(ex,SsnNm,".appInit");}
		return this;
}//appInit

	String title(TL.DB.Tbl t){Map j=getJ(t);
		Object ttl=j==null?null:j.get("title");
		String r=ttl==null?"title"+t:ttl.toString();
		return r;}

	String author(TL.DB.Tbl t){
		Map j=getJ(t);
		TL.DB.Tbl.Usr author=null;
		Object a=j==null?null:j.get("author");
		if(a!=null)try{author=usr(a);}
		catch(Exception ex){tl.error(ex,"AppEU059S.author");}
		Object authorName=author!=null && author.json!=null?author.json.get("name"):author!=null?author.un:null;
		String retVal= authorName==null?"author:"+t : authorName.toString();
		return retVal;}

public Project proj=new Project();
public Building bld=new Building();
public Floor flr=new Floor();
public Sheet sheet=new Sheet();
public Storage storage=new Storage();
//public Prm.Screen screen;
public TL tl;

*/
	}

	public static class Project extends TL.DB.Tbl {//implements Serializable
		public static final String dbtName="projects";
		@Override public List creationDBTIndices(TL tl){
			return TL.Util.lst(
							   TL.Util.lst("int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT"//p
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

			 CREATE TABLE `sheets` (
			 `no` int(11) NOT NULL,
			 `p` int(11) DEFAULT NULL,
			 `b` int(11) DEFAULT NULL,
			 `f` int(11) DEFAULT NULL,
			 `n` int(11) DEFAULT NULL,
			 `j` json DEFAULT NULL,
			 PRIMARY KEY (`no`)
			 ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

			 */}
		@Override public String getName(){return dbtName;}//public	Ssn(){super(Name);}
		@TL.Form.F public Integer no;
		@TL.Form.F(json=true) public Map json;

		public enum C implements TL.DB.Tbl.CI{no,json;
			@Override public Class<? extends TL.DB.Tbl>cls(){return Project.class;}
			@Override public Class<? extends TL.Form>clss(){return cls();}
			@Override public String text(){return name();}
			@Override public Field f(){return TL.DB.Tbl.Cols.f(name(), cls());}
			@Override public TL.DB.Tbl tbl(){return TL.DB.Tbl.tbl(cls());}
			@Override public void save(){tbl().save(this);}
			@Override public Object load(){return tbl().load(this);}
			@Override public Object value(){return val(tbl());}
			@Override public Object value(Object v){return val(tbl(),v);}
			@Override public Object val(TL.Form f){return f.v(this);}
			@Override public Object val(TL.Form f,Object v){return f.v(this,v);}

		}//C

		@Override public TL.DB.Tbl.CI pkc(){return C.no;}
		@Override public Object pkv(){return no;}
		@Override public C[]columns(){return C.values();}
		static{registered.add(Project.class);}
	}//class Project


	public static class Building extends TL.DB.Tbl {//implements Serializable
		public static final String dbtName="buildings";
		@Override public List creationDBTIndices(TL tl){
			return TL.Util.lst(
							   TL.Util.lst("int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT"//no
										   ,"int(11) NOT NULL"//p
										   ,"text"//json
										   ),TL.Util.lst(TL.Util.lst(C.p)));
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
		@TL.Form.F public Integer no,p;
		@TL.Form.F(json=true) public Map json;

		public enum C implements TL.DB.Tbl.CI{no,p,json;
			@Override public Class<? extends TL.DB.Tbl>cls(){return Building.class;}
			@Override public Class<? extends TL.Form>clss(){return cls();}
			@Override public String text(){return name();}
			@Override public Field f(){return TL.DB.Tbl.Cols.f(name(), cls());}
			@Override public TL.DB.Tbl tbl(){return TL.DB.Tbl.tbl(cls());}
			@Override public void save(){tbl().save(this);}
			@Override public Object load(){return tbl().load(this);}
			@Override public Object value(){return val(tbl());}
			@Override public Object value(Object v){return val(tbl(),v);}
			@Override public Object val(TL.Form f){return f.v(this);}
			@Override public Object val(TL.Form f,Object v){return f.v(this,v);}

		}//C

		@Override public TL.DB.Tbl.CI pkc(){return C.no;}
		@Override public Object pkv(){return no;}
		@Override public C[]columns(){return C.values();}
		static{registered.add(Building.class);}
	}//class Building


	public static class Floor extends TL.DB.Tbl {//implements Serializable
		public static final String dbtName="floors";

		@Override public List creationDBTIndices(TL tl){
			return TL.Util.lst(
				TL.Util.lst("int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT"//no
				   ,"int(11) NOT NULL"//p
				   ,"int(11) NOT NULL"//b
				   ,"text"//json
				   ),TL.Util.lst(TL.Util.lst(C.p,C.b)));/*
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
		@TL.Form.F public Integer no,p,b;
		@TL.Form.F(json=true) public Map json;

		public enum C implements TL.DB.Tbl.CI{no,p,b,json;
			@Override public Class<? extends TL.DB.Tbl>cls(){return Floor.class;}
			@Override public Class<? extends TL.Form>clss(){return cls();}
			@Override public String text(){return name();}
			@Override public Field f(){return TL.DB.Tbl.Cols.f(name(), cls());}
			@Override public TL.DB.Tbl tbl(){return TL.DB.Tbl.tbl(cls());}
			@Override public void save(){tbl().save(this);}
			@Override public Object load(){return tbl().load(this);}
			@Override public Object value(){return val(tbl());}
			@Override public Object value(Object v){return val(tbl(),v);}
			@Override public Object val(TL.Form f){return f.v(this);}
			@Override public Object val(TL.Form f,Object v){return f.v(this,v);}

		}//C

		@Override public TL.DB.Tbl.CI pkc(){return C.no;}
		@Override public Object pkv(){return no;}
		@Override public C[]columns(){return C.values();}
		static{registered.add(Floor.class);}
	}//class Floor


	public static class Sheet extends TL.DB.Tbl {//implements Serializable
		public static final String dbtName="sheets";

		@Override public String getName(){return dbtName;}//public	Ssn(){super(Name);}
		public enum Checkbox{f,on}
		public enum Radio1_2{v1,v2}
		public enum Radio1_3{v1,v2,v3}
		public enum Radio1_4{v1,v2,v3,v4}

		@TL.Form.F public Integer no,p,b,f,u;
		@TL.Form.F public Date dt;//,datetime;

		@TL.Form.F public Checkbox TypeofMemberBeam
		,TypeofMemberColunm
,TypeofMemberSlab
,TypeofMemberStairs
,TypeofMemberMansory
,TypeofMemberRC
,TypeofMemberFoundation
,TypeofMemberOther;//on
		@TL.Form.F public String TypeofMemberOtherText,location;
		@TL.Form.F public Checkbox exposure_wetDry
,exposure_chemical
,exposure_erosion
,exposure_elec
,exposure_heat
,LoadingCondition_Dead
,LoadingCondition_Live
,LoadingCondition_Impact
,LoadingCondition_Vibration
,LoadingCondition_Traffic
,LoadingCondition_Seismic
,LoadingCondition_Other;//7
		@TL.Form.F public String LoadingConditionOther;
		@TL.Form.F public Radio1_3 GeneralCondition;
		@TL.Form.F public Checkbox Distress_Cracking
,Distress_Staining
,Distress_Surface
,Distress_Leaking
,Cracking_Checking
,Cracking_Craze
,Cracking_D//on----------------------------- replace the dash : -cracks // done/fixed
,Cracking_Diagnol
,Cracking_Hairline
,Cracking_Longitudinal
,Cracking_Map
,Cracking_Pattern
,Cracking_Plastic
,Cracking_Random
,Cracking_Shrinkage
,Cracking_Temperature
,Cracking_Transverse;//on
@TL.Form.F public Double width;// steps of 0.05, minimum is 0
@TL.Form.F public Checkbox Leaching;//on
@TL.Form.F public Radio1_2 WorkingOrDormant;//2
@TL.Form.F public Checkbox Textural_AirVoid
,Textural_Blistering
,Textural_Bugholes
,Textural_ColdJoints
,Textural_ColdLines
,Textural_Discoloration
,Textural_Honeycomb
,Textural_Incrustation
,Textural_Laitance
,Textural_SandPocket
,Textural_SandStreak
,Textural_Segregation
,Textural_Staining
,Textural_Stalactite
,Textural_Stalagmite
,Textural_Stratification
,Distresses_Chalking
,Distresses_Deflection
,Distresses_Delamination
,Distresses_Distortion
,Distresses_Dusting
,Distresses_Exfoliation
,Distresses_Leakage
,Distresses_Peeling
,Distresses_Warping
,Distresses_Curling
,Distresses_Deformation
,Distresses_Disintegration
,Distresses_DrummyArea
,Distresses_Efflorescence
,Distresses_Exudation
,Distresses_MortarFlaking
,Distresses_Pitting
,JointDeficiencies
,Spall
,SealantFailure
,Leakage
,Fault
,Popout;//on
public @TL.Form.F Radio1_3 PopoutSize;//3
@TL.Form.F public Checkbox isScaling;//on
@TL.Form.F public Radio1_4 Scaling;//4
@TL.Form.F public Checkbox Exposed
,Corroded
,Snapped
,isSpall;//on
@TL.Form.F public Radio1_2 SpallSize;//2
@TL.Form.F public String notes;//2
@TL.Form.F(json=true) public Map json;

		public Map get() {//if(m==null)m=TL.Util.mapCreate("title","-");return m;
			return null;}

		public TL.DB.Tbl.Json json() {/*
			TL.DB.Tbl.Json j=new TL.DB.Tbl.Json();
			j.jsonRef=jsonRef;
			j.json=get();
			if(jsonRef==null)
				j.jsonRef=jsonRef=TL.DB.Tbl.Json.jrn(j.json);//(Integer)j.mv().get(j.Jr);
			return j;*/return null;}

		public Object get(String p) {
			return get().get(p);}

		public Map set(TL.DB.Tbl.Json p) throws Exception{/*
			if(p!=null){ if(jsonRef!=p.jsonRef)
			{jsonRef=p.jsonRef;
				save();
			}	m=p.mv();
			}*/
			return get();}

		public enum C implements TL.DB.Tbl.CI{no,p,b,f,u,dt//,datetime

			,TypeofMemberBeam,TypeofMemberColunm,TypeofMemberSlab,TypeofMemberStairs
			,TypeofMemberMansory,TypeofMemberRC,TypeofMemberFoundation,TypeofMemberOther
			,TypeofMemberOtherText

			,location

			,exposure_wetDry,exposure_chemical,exposure_erosion,exposure_elec,exposure_heat

			,LoadingCondition_Dead,LoadingCondition_Live,LoadingCondition_Impact,LoadingCondition_Vibration
			,LoadingCondition_Traffic,LoadingCondition_Seismic,LoadingCondition_Other
			,LoadingConditionOther

			,GeneralCondition//1_3

			,Distress_Cracking,Distress_Staining,Distress_Surface,Distress_Leaking

			,Cracking_Checking,Cracking_Craze
			,Cracking_D//------------------------------- replace dash with underscore : Cracking_D-cracks
			,Cracking_Diagnol,Cracking_Hairline
			,Cracking_Longitudinal,Cracking_Map,Cracking_Pattern,Cracking_Plastic,Cracking_Random
			,Cracking_Shrinkage,Cracking_Temperature,Cracking_Transverse

			,width
			,Leaching

			,WorkingOrDormant//1_2

			,Textural_AirVoid,Textural_Blistering,Textural_Bugholes,Textural_ColdJoints
			,Textural_ColdLines,Textural_Discoloration,Textural_Honeycomb,Textural_Incrustation
			,Textural_Laitance,Textural_SandPocket,Textural_SandStreak,Textural_Segregation
			,Textural_Staining,Textural_Stalactite,Textural_Stalagmite,Textural_Stratification

			,Distresses_Chalking,Distresses_Deflection,Distresses_Delamination,Distresses_Distortion
			,Distresses_Dusting,Distresses_Exfoliation,Distresses_Leakage,Distresses_Peeling
			,Distresses_Warping,Distresses_Curling,Distresses_Deformation,Distresses_Disintegration
			,Distresses_DrummyArea,Distresses_Efflorescence,Distresses_Exudation,Distresses_MortarFlaking
			,Distresses_Pitting

			,JointDeficiencies
			,Spall
			,SealantFailure
			,Leakage
			,Fault
			,Popout

			,PopoutSize//1_3

			,isScaling

			,Scaling//1_4

			,Exposed
			,Corroded
			,Snapped

			,isSpall//1_2
			,SpallSize
			,notes
			,json
			;

			@Override public Class<? extends TL.DB.Tbl>cls(){return Sheet.class;}
			@Override public Class<? extends TL.Form>clss(){return cls();}
			@Override public String text(){return name();}
			@Override public Field f(){return TL.DB.Tbl.Cols.f(name(), cls());}
			@Override public TL.DB.Tbl tbl(){return TL.DB.Tbl.tbl(cls());}
			@Override public void save(){tbl().save(this);}
			@Override public Object load(){return tbl().load(this);}
			@Override public Object value(){return val(tbl());}
			@Override public Object value(Object v){return val(tbl(),v);}
			@Override public Object val(TL.Form f){return f.v(this);}
			@Override public Object val(TL.Form f,Object v){return f.v(this,v);}
		}//C

		@Override public TL.DB.Tbl.CI pkc(){return C.no;}
		@Override public Object pkv(){return no;}
		@Override public C[]columns(){return C.values();}

		@Override public List creationDBTIndices(TL tl){
			final String cb="enum('f','on') NOT NULL DEFAULT 'f'"
			,r1_2="enum('v1','v2') "// NOT NULL DEFAULT 'v1'"
			,r1_3="enum('v1','v2','v3') "
			,r1_4="enum('v1','v2','v3','v4')";
			return TL.Util.lst(
				TL.Util.lst("int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT"//no
,"int(11) NOT NULL"//p
,"int(11) NOT NULL"//b
,"int(11) NOT NULL"//f
,"int(11) NOT NULL"//u
,"timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP "//dt
//,"timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP "//datetime
,cb//TypeofMemberBeam;
,cb//TypeofMemberColunm;
,cb//TypeofMemberSlab;
,cb//TypeofMemberStairs;
,cb//TypeofMemberMansory;
,cb//TypeofMemberRC;
,cb//TypeofMemberFoundation;
,cb//TypeofMemberOther;//on
,"text"//TypeofMemberOtherText,
,"text"// location;

,cb// exposure_wetDry;
,cb//exposure_chemical;//2
,cb// exposure_erosion;
,cb//exposure_elec;//4
,cb// exposure_heat;
,cb//LoadingCondition_Dead;
,cb//LoadingCondition_Live;
,cb//LoadingCondition_Impact;
,cb//LoadingCondition_Vibration;
,cb//LoadingCondition_Traffic;//5
,cb// LoadingCondition_Seismic;
,cb//LoadingCondition_Other;//7
,"text"// LoadingConditionOther;
,r1_3//					@F Radio1_3 GeneralCondition;
,cb// Distress_Cracking;
,cb//Distress_Staining;
,cb//Distress_Surface;
,cb//Distress_Leaking;
,cb//Cracking_Checking;
,cb//Cracking_Craze;
,cb//Cracking_D
,cb//Cracking_Diagnol;
,cb//Cracking_Hairline;
,cb//Cracking_Longitudinal;
,cb//Cracking_Map;
,cb//Cracking_Pattern;
,cb//Cracking_Plastic;
,cb//Cracking_Random;
,cb//Cracking_Shrinkage;
,cb//Cracking_Temperature;
,cb//Cracking_Transverse;
,"decimal(6,2)"//			@F Double width;// steps of 0.05, minimum is 0
,cb//Leaching;//on
,r1_2//			@F Radio1_2 WorkingOrDormant;//2
,cb//Textural_AirVoid;//on
,cb// Textural_Blistering;//on
,cb// Textural_Bugholes;//on
,cb// Textural_ColdJoints;//on
,cb// Textural_ColdLines;//on
,cb// Textural_Discoloration;//on
,cb// Textural_Honeycomb;//on
,cb// Textural_Incrustation;//on
,cb// Textural_Laitance;//on
,cb// Textural_SandPocket;//on
,cb// Textural_SandStreak;//on
,cb// Textural_Segregation;//on
,cb// Textural_Staining;//on
,cb// Textural_Stalactite;//on
,cb// Textural_Stalagmite;//on
,cb// Textural_Stratification;//on
,cb// Distresses_Chalking;//on
,cb// Distresses_Deflection;//on
,cb// Distresses_Delamination;//on
,cb// Distresses_Distortion;//on
,cb// Distresses_Dusting;//on
,cb// Distresses_Exfoliation;//on
,cb// Distresses_Leakage;//on
,cb// Distresses_Peeling;//on
,cb// Distresses_Warping;//on
,cb// Distresses_Curling;//on
,cb// Distresses_Deformation;//on
,cb// Distresses_Disintegration;//on
,cb// Distresses_DrummyArea;//on
,cb// Distresses_Efflorescence;//on
,cb// Distresses_Exudation;//on
,cb// Distresses_MortarFlaking;//on
,cb// Distresses_Pitting;//on
,cb// JointDeficiencies;//on
,cb// Spall;//on
,cb// SealantFailure;//on
,cb// Leakage;//on
,cb// Fault;//on
,cb// Popout;//on
,r1_3//			@F Radio1_3 PopoutSize;//3
,cb// isScaling;//on
,r1_4//			@F Radio1_4 Scaling;//4
,cb// Exposed;//on
,cb// Corroded;//on
,cb// Snapped;//on
,cb// isSpall;//on
,r1_2//			@F Radio1_2 SpallSize;//2
,"text"//notes
,"text"//json
					),TL.Util.lst(
	 TL.Util.lst(C.p,C.b,C.f,C.u)										//1
	,TL.Util.lst(C.u,C.p,C.no)											//2
	,TL.Util.lst(C.dt)													//3
	,TL.Util.lst(C.p,C.TypeofMemberBeam,C.TypeofMemberColunm			//4
 ,C.b),TL.Util.lst(C.p,C. TypeofMemberSlab,C.TypeofMemberStairs			//5
 ,C.b),TL.Util.lst(C.p,C. TypeofMemberMansory,C.TypeofMemberRC			//6
 ,C.b),TL.Util.lst(C.p,C. TypeofMemberFoundation						//7
 ,C.b),TL.Util.lst(C.p,C. TypeofMemberOther,TL.Util.lst(C.TypeofMemberOtherText,200)//8
 ,C.b),TL.Util.lst(C.p,TL.Util.lst(C.location,200)				//text(255) //9
 ,C.b),TL.Util.lst(C.p,C. exposure_wetDry,C.exposure_chemical			//10
 ,C.b),TL.Util.lst(C.p,C. exposure_erosion,C. exposure_elec				//1
 ,C.b),TL.Util.lst(C.p,C. exposure_heat									//2
 ,C.b),TL.Util.lst(C.p,C. LoadingCondition_Dead,C. LoadingCondition_Live//3
 ,C.b),TL.Util.lst(C.p,C. LoadingCondition_Impact,C. LoadingCondition_Vibration//4
 ,C.b),TL.Util.lst(C.p,C. LoadingCondition_Traffic,C. LoadingCondition_Seismic//5
 ,C.b),TL.Util.lst(C.p,C. LoadingCondition_Other,TL.Util.lst(C. LoadingConditionOther,200)//text(255)//6
 ,C.b),TL.Util.lst(C.p,C. GeneralCondition								//7
 ,C.b),TL.Util.lst(C.p,C. Distress_Cracking,C.Distress_Staining			//8
 ,C.b),TL.Util.lst(C.p,C. Distress_Surface,C. Distress_Leaking				//9
 ,C.b),TL.Util.lst(C.p,C. Cracking_Checking,C. Cracking_Craze			//20
 ,C.b),TL.Util.lst(C.p,C. Cracking_D,C. Cracking_Diagnol				//1
 ,C.b),TL.Util.lst(C.p,C. Cracking_Hairline,C. Cracking_Longitudinal	//2
 ,C.b),TL.Util.lst(C.p,C. Cracking_Map,C. Cracking_Pattern				//3
 ,C.b),TL.Util.lst(C.p,C. Cracking_Plastic,C. Cracking_Random			//4
 ,C.b),TL.Util.lst(C.p,C. Cracking_Shrinkage,C. Cracking_Temperature	//5
 ,C.b),TL.Util.lst(C.p,C. Cracking_Transverse,C.Leaching				//6
 ,C.b),TL.Util.lst(C.p,C. width//number									//7
 ,C.b),TL.Util.lst(C.p,C. WorkingOrDormant								//8
 ,C.b),TL.Util.lst(C.p,C. Textural_AirVoid,C. Textural_Blistering,C. Textural_ColdJoints,C. Textural_Discoloration,C. Textural_Incrustation,C. Textural_SandPocket,C. Textural_Segregation,C. Textural_Stalactite,C. Textural_Stratification,C. Textural_Bugholes,C. Textural_ColdLines,C. Textural_Honeycomb,C. Textural_Laitance//,C. Textural_SandStreak//,C. Textural_Staining//,C. Textural_Stalagmite		   //9
 ,C.b),TL.Util.lst(C.p,C. Textural_Bugholes,C. Textural_ColdJoints,C. Textural_Stratification,C. Textural_Stalactite,C. Textural_Segregation,C. Textural_SandPocket,C. Textural_Incrustation,C. Textural_Discoloration,C. Textural_Stalagmite,C. Textural_Staining,C. Textural_SandStreak,C. Textural_Laitance,C. Textural_Honeycomb//,C. Textural_ColdLines		  //30
 ,C.b),TL.Util.lst(C.p,C. Textural_ColdLines,C. Textural_Discoloration	//1
 ,C.b),TL.Util.lst(C.p,C. Textural_Honeycomb,C. Textural_Incrustation	//2
 ,C.b),TL.Util.lst(C.p,C. Textural_Laitance,C. Textural_SandPocket		//3
 ,C.b),TL.Util.lst(C.p,C. Textural_SandStreak,C. Textural_Segregation	//4
 ,C.b),TL.Util.lst(C.p,C. Textural_Staining,C. Textural_Stalactite		//5
 ,C.b),TL.Util.lst(C.p,C. Textural_Stalagmite,C. Textural_Stratification//6
 ,C.b),TL.Util.lst(C.p,C. Distresses_Chalking,C. Distresses_Deflection	//7
 ,C.b),TL.Util.lst(C.p,C. Distresses_Delamination,C. Distresses_Distortion//8
 ,C.b),TL.Util.lst(C.p,C. Distresses_Dusting,C. Distresses_Exfoliation	//9
 ,C.b),TL.Util.lst(C.p,C. Distresses_Leakage,C. Distresses_Peeling		//40
 ,C.b),TL.Util.lst(C.p,C. Distresses_Warping,C. Distresses_Curling		//1
 ,C.b),TL.Util.lst(C.p,C. Distresses_Deformation,C.Distresses_Disintegration//2
 ,C.b),TL.Util.lst(C.p,C. Distresses_DrummyArea,C. Distresses_Efflorescence //3
 ,C.b),TL.Util.lst(C.p,C. Distresses_Exudation,C. Distresses_MortarFlaking  //4
 ,C.b),TL.Util.lst(C.p,C. Distresses_Pitting							//5
 ,C.b),TL.Util.lst(C.p,C. JointDeficiencies,C. Spall,C. SealantFailure,C. Leakage,C. Fault//6
 ,C.b),TL.Util.lst(C.p,C. JointDeficiencies,C. SealantFailure,C. Fault,C. Leakage,C. Spall//7
 ,C.b),TL.Util.lst(C.p,C. JointDeficiencies,C. Leakage,C. Fault,C. SealantFailure,C. Spall//8
 ,C.b),TL.Util.lst(C.p,C. JointDeficiencies,C. Fault,C. Leakage,C. Spall,C. SealantFailure//9
 ,C.b),TL.Util.lst(C.p,C. Popout,C. PopoutSize							//50
 ,C.b),TL.Util.lst(C.p,C. isScaling,C. Scaling							//1
 ,C.b),TL.Util.lst(C.p,C. Exposed,C. Corroded,C. Snapped				//2
 ,C.b),TL.Util.lst(C.p,C. Corroded,C. Snapped,C. Exposed				//3
 ,C.b),TL.Util.lst(C.p,C. Snapped,C. Corroded,C. Exposed				//4
 ,C.b),TL.Util.lst(C.p,C. isSpall,C. SpallSize							//5
 ,C.b),TL.Util.lst(C.p,TL.Util.lst(C. notes,200)						//6
 ,C.b)			));
/*	CREATE TABLE `sheets` (
	`no` int(11) NOT NULL,
	`p` int(11) DEFAULT NULL,
	`b` int(11) DEFAULT NULL,
	`f` int(11) DEFAULT NULL,
	`jsonRef` int(18) NOT NULL,
	`dt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`u` int(11) DEFAULT NULL,
	PRIMARY KEY (`no`)
	) ENGINE=InnoDB DEFAULT CHARSET=utf8


	public static void checkTableCreation(TL tl){
	String sql="CREATE TABLE `"+dbtName+"` (\n" +
	"`"+C.no+"` int(11) NOT NULL primary key,\n" +
	"`"+C.p+"` int(11) NOT NULL,\n" +
	"`"+C.b+"` int(11) NOT NULL,\n" +
	"`"+C.f+"` int(11) NOT NULL,\n" +
	"`"+C.u+"` int(11) NOT NULL,\n" +
	"`"+C.jsonRef+"` int(24) NOT NULL,\n" +
	"`"+C.dt+"` timestamp NOT NULL,\n" +
	"KEY (`"+C.p+"`,`"+C.b+"`,`"+C.f+"`),\n" +
	"KEY (`"+C.jsonRef+"`)\n" +
	"KEY (`"+C.dt+"`)\n" +
	") ENGINE=InnoDB DEFAULT CHARSET=utf8 ;";
	try {
	Object o=TL.DB.q("desc "+dbtName,0);
	if(o==null){
	int x=TL.DB.x(sql);
	tl.log("AppEU059S.Sheet.checkTableCreation:",x,sql);
	}
	} catch (SQLException ex) {
	tl.error(ex, "AppEU059S.Sheet.checkTableCreation");}
	}//checkTableCreation*/}

		static{registered.add(Sheet.class);}

	}//class Sheet

public static class Storage extends TL.DB.Tbl {//implements Serializable
	public static final String dbtName="Storage";

	@Override public String getName(){return dbtName;}//public	Ssn(){super(Name);}
	@TL.Form.F public Integer no;
	@TL.Form.F public String path,data,contentType;
	@TL.Form.F public Date lastModified;

	public enum C implements TL.DB.Tbl.CI{no,path,data,contentType,lastModified;
		@Override public Class<? extends TL.DB.Tbl>cls(){return Storage.class;}
		@Override public Class<? extends TL.Form>clss(){return cls();}
		@Override public String text(){return name();}
		@Override public Field f(){return TL.DB.Tbl.Cols.f(name(), cls());}
		@Override public TL.DB.Tbl tbl(){return TL.DB.Tbl.tbl(cls());}
		@Override public void save(){tbl().save(this);}
		@Override public Object load(){return tbl().load(this);}
		@Override public Object value(){return val(tbl());}
		@Override public Object value(Object v){return val(tbl(),v);}
		@Override public Object val(TL.Form f){return f.v(this);}
		@Override public Object val(TL.Form f,Object v){return f.v(this,v);}
	}//C

	@Override public TL.DB.Tbl.CI pkc(){return C.no;}
	@Override public Object pkv(){return no;}
	@Override public C[]columns(){return C.values();}

	@Override public List creationDBTIndices(TL tl){
		return TL.Util.lst(
			TL.Util.lst("int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT"//no
				,"varchar(255) NOT NULL"//path
				,"MEDIUMTEXT NOT NULL"//data
				,"varchar(255) NOT NULL"//contentType
				,"timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP "//lastModified
				,"varchar(255) NOT NULL"//
			), TL.Util.lst(
				TL.Util.lst(C.path,C.lastModified),
				TL.Util.lst(C.lastModified,C.path)));/*
CREATE TABLE `Storage` (
  `no` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `path` varchar(255) NOT NULL,
  `data` text NOT NULL,
  `contentType` text NOT NULL,
  `lastModified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ,
   key(`path`,`lastModified`),
   key(`lastModified`,`path`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8

*/}

// Map vals(C except){}

 public	static @TL.Op int New(@TL.Op(prmName="storage") Storage storage,TL tl){int no=-1;
		try{no=storage.no=storage.maxPlus1(C.no);
			storage.save();
			} catch (Exception e) {
			tl.error(e,"AppEU059S.Storage.New:op");}
		return no;}

 public	static @TL.Op ResultSet list(@TL.Op(prmName="lastModified") Date lastModified,TL tl){ResultSet rs=null;
		try{C[]x={C.no,C.path,C.contentType,C.lastModified};
			StringBuilder sql=new StringBuilder("select ");
			TL.DB.Tbl.Cols.generate(sql,x)
				.append(" from ").append(dbtName)
				.append(" where `").append(C.lastModified).append("`>?");
			rs=TL.DB.r(sql.toString(),lastModified);
		} catch (Exception e) {
			tl.error(e,"AppEU059S.Storage.list:op");}
		return rs;}

 public static @TL.Op Storage get(@TL.Op(prmName="path") String path,TL tl){Storage s=null;
		try{s=new Storage();s.loadBy(C.path,path);
		} catch (Exception e) {
			tl.error(e,"AppEU059S.Storage.get:op");}
		return s;}

 public static @TL.Op Storage content(@TL.Op(prmName="path") String path,TL tl){Storage s=null;
		try{s=new Storage();s.loadBy(C.path,path);
			tl.respond(s.contentType,s.data);
		} catch (Exception e) {
			tl.error(e,"Storage.Storage.content");}
		return s;}

 public static @TL.Op Storage set(@TL.Op(prmName="storage") Storage s,TL tl){
		try{s.save();
		} catch (Exception e) {
			tl.error(e,"Storage.Storage.set");}
		return s;}

 public static @TL.Op int delete(@TL.Op(prmName="no") int no,TL tl){
		try{Storage s=new Storage();s.no=no;return s.delete();
		} catch (Exception e) {
			tl.error(e,"Storage.Storage.set");}
		return 0;}
	static{registered.add(Storage.class);TL.registerOp(Storage.class);}
}//class Storage


public static class Dbg{
		static final String Name="eu059s.AppEU059S.TL.Dbg";
		//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
		public static class Req implements HttpServletRequest{
			Ssn ssn=new Ssn();String data,contentType="text/json",method="POST",protocolVersion,uri;
			//"{op:'query',sql:'select d,count(*),min(no),max(no) from d group by y,m,w'}"
			HashMap<String,Object> attribs=new HashMap<String,Object>();
			HashMap<String,String> headers=new HashMap<String,String>();
			HashMap<String,String[]>prms=new HashMap<String,String[]>();
			@Override public AsyncContext getAsyncContext() {return null;}
			@Override public Object getAttribute(String p) {return attribs.get(p);}
			@Override public Enumeration<String> getAttributeNames() {return new Enumeration<String>() {
				java.util.Iterator<String>i=attribs.keySet().iterator();
				@Override	public boolean hasMoreElements() {	return i.hasNext();}
				@Override	public String nextElement() {return i.next();}};}
			@Override public String getCharacterEncoding() {return "utf8";}
			@Override public int getContentLength() {return data.length();}
			@Override public long getContentLengthLong() {return data.length();}
			@Override public String getContentType() {p("Req.getContentType:",contentType);return contentType;}
			@Override public String getContextPath() {return "";}
			@Override public DispatcherType getDispatcherType() {return null;}
			@Override public ServletInputStream getInputStream() throws IOException
			{return new ServletInputStream() {int i=0;
				@Override public int read() throws IOException{return data.charAt(i++);}
				@Override public void setReadListener(ReadListener p){}
				@Override public boolean isReady() {return true;}
				@Override public boolean isFinished() {return i>=data.length();}};}//new java.io.ByteArrayInputStream(data.getBytes());}//(new java.io.StringReader(data));//StringBufferInputStream(data);
			@Override public String getLocalAddr() {return null;}
			@Override public String getLocalName() {return null;}
			@Override public int getLocalPort() {return 0;}
			@Override public Locale getLocale() {return null;}
			@Override public Enumeration<Locale> getLocales() {return null;}
			@Override public String getParameter(String p){String[]a= prms.get(p);return a!=null&&a.length>0?a[0]:null;}
			@Override public Map<String, String[]> getParameterMap() {return prms;}
			@Override public Enumeration<String> getParameterNames() {return new Enumeration<String>() {
				java.util.Iterator<String>i=prms.keySet().iterator();
				@Override	public boolean hasMoreElements() {	return i.hasNext();}
				@Override	public String nextElement() {return i.next();}};}
			@Override public String[] getParameterValues(String p) {return prms.get(p);}
			@Override public String getProtocol() {return protocolVersion;}
			@Override public BufferedReader getReader() throws IOException {return new BufferedReader(new java.io.CharArrayReader(data.toCharArray()));}
			@Override public String getRealPath(String p) {return null;}
			@Override public String getRemoteAddr() {return "127.0.0.1";}
			@Override public String getRemoteHost() {return null;}
			@Override public int getRemotePort() {return 0;}
			@Override public RequestDispatcher getRequestDispatcher(String p) {return null;}
			@Override public String getScheme() {return null;}
			@Override public String getServerName() {return null;}
			@Override public int getServerPort() {return 0;}
			@Override public ServletContext getServletContext() {return null;}
			@Override public boolean isAsyncStarted() {return false;}
			@Override public boolean isAsyncSupported() {return false;}
			@Override public boolean isSecure() {return false;}
			@Override public void removeAttribute(String p) {attribs.remove(p);}
			@Override public void setAttribute(String p, Object p2) {attribs.put(p, p2);}
			@Override public void setCharacterEncoding(String p) throws UnsupportedEncodingException {}
			@Override public AsyncContext startAsync() throws IllegalStateException {return null;}
			@Override public AsyncContext startAsync(ServletRequest p, ServletResponse p2) throws IllegalStateException {return null;}
			@Override public boolean authenticate(HttpServletResponse p) throws IOException, ServletException {return false;}
			@Override public String changeSessionId() {return null;}
			@Override public String getAuthType() {return null;}
			@Override public Cookie[] getCookies() {return null;}
			@Override public long getDateHeader(String p) {return 0;}
			@Override public String getHeader(String p) {return headers.get(p);}
			@Override public Enumeration<String> getHeaderNames() {return new Enumeration<String>() {
				java.util.Iterator<String>i=headers.keySet().iterator();
				@Override	public boolean hasMoreElements() {	return i.hasNext();}
				@Override	public String nextElement() {return i.next();}};}
			@Override public Enumeration<String> getHeaders(String p) {return null;}
			@Override public int getIntHeader(String p) {return 0;}
			@Override public String getMethod() {return method;}
			@Override public Part getPart(String p) throws IOException, ServletException {return null;}
			@Override public Collection<Part> getParts() throws IOException, ServletException {return null;}
			@Override public String getPathInfo() {return null;}
			@Override public String getPathTranslated() {return null;}
			@Override public String getQueryString() {return "/adoqs/xhr.jsp";}
			@Override public String getRemoteUser() {return null;}
			@Override public String getRequestURI() {return null;}
			@Override public StringBuffer getRequestURL() {return null;}
			@Override public String getRequestedSessionId() {return null;}
			@Override public String getServletPath() {return null;}
			@Override public HttpSession getSession() {return ssn;}
			@Override public HttpSession getSession(boolean p) {return ssn;}
			@Override public Principal getUserPrincipal() {return null;}
			@Override public boolean isRequestedSessionIdFromCookie() {return false;}
			@Override public boolean isRequestedSessionIdFromURL() {return false;}
			@Override public boolean isRequestedSessionIdFromUrl() {return false;}
			@Override public boolean isRequestedSessionIdValid() {return false;}
			@Override public boolean isUserInRole(String p) {return false;}
			@Override public void login(String p, String p2) throws ServletException {}
			@Override public void logout() throws ServletException {}
			@Override public <T extends HttpUpgradeHandler> T upgrade(Class<T> p) throws IOException, ServletException {return null;}
		}//class Req

		//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
		public static class Rsp implements HttpServletResponse{
			String contentType="";Sos sos;static final String Name=Dbg.Name+".Rsp";
			PrintWriter out=new PrintWriter(new SrvltWrtr());//System.out//strW);StringWriter strW=new StringWriter();
			@Override public void flushBuffer() throws IOException {if(out!=null)out.flush();if(sos!=null)sos.flush();}
			@Override public int getBufferSize() {p(Name,".getBufferSize:0");return 0;}
			@Override public String getCharacterEncoding() {p(Name,".getCharacterEcoding");return null;}
			@Override public String getContentType() {p(Name,".getContentType:",contentType);return contentType;}
			@Override public Locale getLocale() {p(Name,".getLocale");return null;}
			@Override public ServletOutputStream getOutputStream() throws IOException {p(Name,".getOutputStream");return sos;}
			@Override public PrintWriter getWriter() throws IOException {p(Name,".getWriter");return out;}
			@Override public boolean isCommitted() {p(Name,".isCommited");return false;}
			@Override public void reset() {p(Name,".reset");}
			@Override public void resetBuffer() {p(Name,".resetBuffer");}
			@Override public void setBufferSize(int p) {p(Name,".setBufferSize:",p);}
			@Override public void setCharacterEncoding(String p) {p(Name,".setCharacterEncoding:",p);}
			@Override public void setContentLength(int p) {p(Name,".setContentLength:",p);}
			@Override public void setContentLengthLong(long p) {p(Name,".setContentLengthLong:",p);}
			@Override public void setContentType(String p) {p(Name,".setContentType:",p);contentType=p;}
			@Override public void setLocale(Locale p) {p(Name,".setLocale:",p);}
			@Override public void addCookie(Cookie p) {p(Name,".addCookie:",p);}
			@Override public void addDateHeader(String p, long p2) {p(Name,".addDateHeader:",p,",",p2);}
			@Override public void addHeader(String p, String p2) {p(Name,".addHeader:",p,",",p2);}
			@Override public void addIntHeader(String p, int p2) {p(Name,".addIntHeader:",p,",",p2);}
			@Override public boolean containsHeader(String p) {p(Name,".containsHeader:",p);return false;}
			@Override public String encodeRedirectURL(String p) {p(Name,".ecodeRedirectURL:",p);return null;}
			@Override public String encodeRedirectUrl(String p) {p(Name,".encodeRedirectUrl:",p);return null;}
			@Override public String encodeURL(String p) {p(Name,".encodeURL:",p);return null;}
			@Override public String encodeUrl(String p) {p(Name,".encodeUrl:",p);return null;}
			@Override public String getHeader(String p) {p(Name,".getHeader:",p);return null;}
			@Override public Collection<String> getHeaderNames() {p(Name,".getHeaderNames");return null;}
			@Override public Collection<String> getHeaders(String p) {p(Name,".getHeaders:",p);return null;}
			@Override public int getStatus() {p(Name,".getStatus");return 0;}
			@Override public void sendError(int p) throws IOException {p(Name,".sendError:",p);}
			@Override public void sendError(int p, String p2) throws IOException {p(Name,".sendError:",p,",",p2);}
			@Override public void sendRedirect(String p) throws IOException {p(Name,".sendRedirect:",p);}
			@Override public void setDateHeader(String p, long p2) {p(Name,".setDateHeader:",p,",",p2);}
			@Override public void setHeader(String p, String p2) {p(Name,".setHeader:",p,",",p2);}
			@Override public void setIntHeader(String p, int p2) {p(Name,".setIntHeader:",p,",",p2);}
			@Override public void setStatus(int p) {p(Name,".setStatus:",p);}
			@Override public void setStatus(int p, String p2) {p(Name,".setStatus:",p,",",p2);}

			public static class Sos extends ServletOutputStream{
				StringBuilder sb=new StringBuilder();// java.io.OutputStream o;
				Sos(java.io.OutputStream p){p("\n------------------------------\nSos.<init>:",p);}//o=p;
				@Override public boolean isReady() {return true;}
				@Override public void setWriteListener(WriteListener p) {}//super.setWriteListener(p);}
				@Override public void write(int p) throws IOException {sb.append((char)p);}//p("Sos.write(int:",p,"):",(char)p);}//o.write(p);
				@Override public void flush() throws IOException {p("Dbg.Sos.flush:",sb.toString());sb.setLength(0);}//super.flush();}//o.flush();
				@Override public void close() throws IOException {p("Dbg.Sos.close:",sb.toString());sb.setLength(0);}//super.close();}//o.close();
				@Override public void write(byte[] p) throws IOException {sb.append(new String(p));}//p("Sos.write(byte[]):",new String(p));super.write(p);}//o.write(p);}
				@Override public void write(byte[] a, int b, int c) throws IOException {sb.append(new String(a,b,c));
				}//p("Sos.write(byte[]:",a,",int:",b,",int:",c,"):",new String(a, b, c));super.write(a, b, c);}//o.write(a, b, c);}
				@Override public void print(int p) throws IOException {sb.append(p);}
				@Override public void print(boolean p) throws IOException {sb.append(p);}
				@Override public void print(char p) throws IOException {sb.append(p);}
				@Override public void print(double p) throws IOException {sb.append(p);}
				@Override public void print(float p) throws IOException {sb.append(p);}
				@Override public void print(long p) throws IOException {sb.append(p);}
				@Override public void print(String p) throws IOException {sb.append(p);}
				@Override public void println(int p) throws IOException {sb.append(p).append('\n');}
				@Override public void println(boolean p) throws IOException {sb.append(p).append('\n');}
				@Override public void println() throws IOException {sb.append('\n');}
				@Override public void println(char p) throws IOException {sb.append(p).append('\n');}
				@Override public void println(double p) throws IOException {sb.append(p).append('\n');}
				@Override public void println(float p) throws IOException {sb.append(p).append('\n');}
				@Override public void println(long p) throws IOException {sb.append(p).append('\n');}
				@Override public void println(String p) throws IOException {sb.append(p).append('\n');}
			}//class Sos

			public static class SrvltWrtr extends java.io.Writer{
				SrvltWrtr(){p("SrvltWrtr.<init>");}StringBuilder sb=new StringBuilder();
				@Override public void flush() throws IOException {p("SrvltWrtr.flush:",sb.toString());sb.setLength(0);}
				@Override public void close() throws IOException {p("SrvltWrtr.close:",sb.toString());sb.setLength(0);}
				//@Override public String toString() {String s=sb.toString();p("SrvltWrtr.toString:",s);return s;}
				@Override public void write(char[] cbuf, int off, int len) throws IOException {sb.append(cbuf, off, len);}
				@Override public void write(char[] cbuf) throws IOException {sb.append(cbuf);}
				@Override public void write(String p) throws IOException {sb.append(p);}
				@Override public void write(String p, int off, int len) throws IOException {sb.append(p, off, len);}
				//p("SrvltWrtr.write(char[]",cbuf,",off=",off,",len=",len,"):",String.valueOf(cbuf,off,len));
				@Override public void write(int p){sb.append((char)p);}
				@Override public Writer append(CharSequence p) throws IOException {sb.append(p);return this;}
				@Override public Writer append(CharSequence p, int off, int len) throws IOException {sb.append(p, off, len);return this;}
				@Override public Writer append(char p) throws IOException {sb.append(p);return this;}
				//@Override public Writer append(String p)  {sb.append(p);super.;return this;}
				//@Override public Writer append(String p, int off, int len) throws IOException {sb.append(p, off, len);return this;}
			}//public static class SrvltWrtr extends java.io.Writer
		}//class Rsp

		public static class PC extends PageContext{

			@Override public void forward(String arg0) throws ServletException, IOException {}
			@Override public Exception getException() {return null;}
			@Override public Object getPage() {return null;}
			@Override public ServletRequest getRequest(){return Srvlt.sttc.q;}
			@Override public ServletResponse getResponse(){return Srvlt.sttc.p;}
			@Override public ServletConfig getServletConfig(){return Srvlt.sttc.getServletConfig();}
			@Override public ServletContext getServletContext(){return Srvlt.sttc.getServletContext();}
			@Override public HttpSession getSession(){return Srvlt.sttc.q.ssn;}
			@Override public void handlePageException(Exception arg0) throws ServletException, IOException{}
			@Override public void handlePageException(Throwable arg0) throws ServletException, IOException{}
			@Override public void include(String arg0) throws ServletException, IOException{}
			@Override public void include(String arg0, boolean arg1) throws ServletException, IOException{}
			@Override public void initialize(Servlet arg0, ServletRequest arg1, ServletResponse arg2, String arg3, boolean arg4, int arg5,
											 boolean arg6) throws IOException, IllegalStateException, IllegalArgumentException{}
			@Override public void release(){}
			@Override public Object findAttribute(String n){Srvlt s=Srvlt.sttc;Object o=s.q.getAttribute(n);if(o==null)o=s.q.ssn.getAttribute(n);if(o==null)o=s.a.getAttribute(n);return o;}
			@Override public Object getAttribute(String n){return findAttribute(n);}
			@Override public Object getAttribute(String n, int arg1){return null;}
			@Override public Enumeration<String> getAttributeNamesInScope(int arg0){return null;}
			@Override public int getAttributesScope(String arg0) {TL.tl().log("Dbg.PC.getAttributesScope:not implemented:return null");return 0;}

			@Override public ExpressionEvaluator getExpressionEvaluator(){return null;}
			@Override public JspWriter getOut(){TL.tl().log("Dbg.PC.getOut:not implemented:return null");return null;}
			@Override public VariableResolver getVariableResolver(){return null;}
			@Override public void removeAttribute(String arg0){TL.tl().log("Dbg.PC.removeAttribute a:not implemented:return null");}
			@Override public void removeAttribute(String arg0, int arg1){TL.tl().log("Dbg.PC.removeAttribute a,b:not implemented:return null");}
			@Override public void setAttribute(String arg0, Object arg1) {TL.tl().log("Dbg.PC.setAttribute a,b:not implemented:return null");}
			@Override public void setAttribute(String arg0, Object arg1, int arg2) {TL.tl().log("Dbg.PC.setAttribute a,b,c:not implemented:return null");}
			@Override public javax.el.ELContext getELContext(){TL.tl().log("Dbg.PC.getELContext:not implemented:return null");return null;}
//public static class ELContext{}
		}//class PC

		//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
		public static class Srvlt extends GenericServlet{
			static final String Name=Dbg.Name+".Srvlt";
			@Override public void service(ServletRequest q, ServletResponse
					p)throws ServletException, IOException {p(Name,".service:",q,",",p);}
			Req q=new Req();Rsp p=new Rsp();SrvltContxt a=new SrvltContxt();
			PC pc=new PC();static Srvlt sttc=new Srvlt();
			@Override public void log(String message, Throwable t) {log(message);t.printStackTrace();}//super.log(message, t);}
			@Override public void log(String msg) {p("log:",msg);}//super.log(msg);
			@Override public ServletContext getServletContext() {return a;}//super.getServletContext()
			@Override public String getServletName() {return Name;}//super.getServletName();
		}//class Srvlt

		//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
		public static class Ssn implements HttpSession{
			HashMap<String,Object> attribs=new HashMap<String,Object>();long expir;
			@Override public Object getAttribute(String p){return attribs.get(p);}
			@Override public Enumeration<String> getAttributeNames() {return new Enumeration<String>() {
				java.util.Iterator<String>i=attribs.keySet().iterator();
				@Override	public boolean hasMoreElements() {	return i.hasNext();}
				@Override	public String nextElement() {return i.next();}};}
			@Override public long getCreationTime() {return 0;}
			@Override public String getId() {return null;}
			@Override public long getLastAccessedTime() {return 0;}
			@Override public int getMaxInactiveInterval() {return 0;}
			@Override public ServletContext getServletContext() {return Srvlt.sttc.a;}
			@Override public HttpSessionContext getSessionContext() {return null;}
			@Override public Object getValue(String p){return null;}
			@Override public String[] getValueNames() {return null;}
			@Override public void invalidate(){}
			@Override public boolean isNew() {return false;}
			@Override public void putValue(String p, Object p2){}
			@Override public void removeAttribute(String p){}
			@Override public void removeValue(String p){}
			@Override public void setAttribute(String k, Object v){attribs.put(k, v);}
			@Override public void setMaxInactiveInterval(int p){}}
		//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
		public static class SrvltContxt implements ServletContext{//static SrvltContxt sttc;
			HashMap<String,Object> attribs=new HashMap<String,Object>();
			@Override public FilterRegistration.Dynamic addFilter(String arg0, String p2){return null;}
			@Override public FilterRegistration.Dynamic addFilter(String arg0, Filter p2){return null;}
			@Override public FilterRegistration.Dynamic addFilter(String arg0, Class<? extends Filter> p2){return null;}
			@Override public void addListener(String p){}
			@Override public <T extends EventListener> void addListener(T p){}
			@Override public void addListener(Class<? extends EventListener> p){}
			@Override public javax.servlet.ServletRegistration.Dynamic addServlet(String arg0, String p2){return null;}
			@Override public javax.servlet.ServletRegistration.Dynamic addServlet(String arg0, Servlet p2){return null;}
			@Override public javax.servlet.ServletRegistration.Dynamic addServlet(String arg0, Class<? extends Servlet> p2){return null;}
			@Override public <T extends Filter> T createFilter(Class<T> p2)throws ServletException{return null;}
			@Override public <T extends EventListener> T createListener(Class<T> p2)throws ServletException{return null;}
			@Override public <T extends Servlet> T createServlet(Class<T> p2)throws ServletException{return null;}
			@Override public void declareRoles(String... p){}
			@Override public Object getAttribute(String p){return attribs.get(p);}
			@Override public Enumeration<String> getAttributeNames(){return new Enumeration<String>() {
				java.util.Iterator<String>i=attribs.keySet().iterator();
				@Override	public boolean hasMoreElements() {	return i.hasNext();}
				@Override	public String nextElement() {return i.next();}};}
			@Override public ClassLoader getClassLoader(){return null;}
			@Override public ServletContext getContext(String p){return null;}
			@Override public String getContextPath(){return null;}
			@Override public Set<SessionTrackingMode> getDefaultSessionTrackingModes(){return null;}
			@Override public int getEffectiveMajorVersion(){return 0;}
			@Override public int getEffectiveMinorVersion(){return 0;}
			@Override public Set<SessionTrackingMode> getEffectiveSessionTrackingModes(){return null;}
			@Override public FilterRegistration getFilterRegistration(String p){return null;}
			@Override public Map<String, ? extends FilterRegistration> getFilterRegistrations(){return null;}
			@Override public String getInitParameter(String p){return null;}
			@Override public Enumeration<String> getInitParameterNames(){return null;}
			@Override public JspConfigDescriptor getJspConfigDescriptor(){return null;}
			@Override public int getMajorVersion(){return 0;}
			@Override public String getMimeType(String p){return null;}
			@Override public int getMinorVersion(){return 0;}
			@Override public RequestDispatcher getNamedDispatcher(String p){return null;}
			@Override public String getRealPath(String p){return null;}
			@Override public RequestDispatcher getRequestDispatcher(String p){return null;}
			@Override public URL getResource(String arg0) throws MalformedURLException {return null;}
			@Override public InputStream getResourceAsStream(String p){return null;}
			@Override public Set<String> getResourcePaths(String p){return null;}
			@Override public String getServerInfo(){return null;}
			@Override public Servlet getServlet(String p2)throws ServletException{return null;}
			@Override public String getServletContextName(){return null;}
			@Override public Enumeration<String> getServletNames(){return null;}
			@Override public ServletRegistration getServletRegistration(String p){return null;}
			@Override public Map<String, ? extends ServletRegistration> getServletRegistrations(){return null;}
			@Override public Enumeration<Servlet> getServlets(){return null;}
			@Override public SessionCookieConfig getSessionCookieConfig(){return null;}
			@Override public String getVirtualServerName(){return null;}
			@Override public void log(String p){p("log:",p);}
			@Override public void log(Exception x, String p){x.printStackTrace();p(p);}
			@Override public void log(String p, Throwable x){log(p);x.printStackTrace();}
			@Override public void removeAttribute(String p){}
			@Override public void setAttribute(String p, Object v){p(Name,".SrvltContxt.setAttribute:",p,",",v);attribs.put(p, v);}
			@Override public boolean setInitParameter(String arg0, String p2){return false;}
			@Override public void setSessionTrackingModes(Set<SessionTrackingMode> p){}}

		//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
		public static void p(Object...p){for(Object s:p)System.out.print(s);System.out.println();}
		public static void pa(String...p){for(String s:p)System.out.print(s);}

 }//class Dbg

 public static @TL.Op(urlPath ="*")void firstPage(TL tl){//TODO: after the development stage of bootstrapping , change the respond to get from dbTbl-storage the js code path: "eu059s.bootStrap" ::= raw minimal js code to load LocalStorage "eu059s.BootStrap" and execute or do a xhr of xhr-op:eu059s.BootStrap
	tl.respond("text/html",
"<html><head><script>window.onload=function bootstrap(){"
		+"	var path='eu059s.files:sys.js',x=localStorage[path] \n"
		+"	function init(x){console.log('bootstrap.js:init:',x)\n"
		+"		var s=document.createElement('script');			\n"
		+"		document.body.appendChild(s);\n"
		+"		s.text=x;}				\n"
		+"	if(!x)						\n"
		+"	{function xhr(p){			\n"
		+"			if(!p)return p;		\n"
		+"			var ct='Content-Type',cs='charset'	\n"
		+"				,x=typeof XMLHttpRequest === 'undefined'\n"
		+"				?new ActiveXObject('microsoft.XMLHTTP')\n"
		+"				:new XMLHttpRequest();x.p=p;p.xhr=x;	\n"
		+"			x.open(p.method||'POST',p.url||'', p.onload )\n"
		+"			x.setRequestHeader(ct, 'text/json');\n"
		+"			x.setRequestHeader(cs, 'utf-8');	\n"
		+"			x.onload=p.onload					\n"
		+"			x.send(JSON.stringify(p.data));		\n"
		+"			console.log('xhr:response:',x.response,p,x); \n"
		+"			return x.response;					\n"
		+"		}//function xhr							\n"
		+"		xhr({data:{op:'StorageGet',path:path	\n"
		+"			,onload:function(e){				\n"
		+"			localStorage[path]=x=e&&(e.response	\n"
		+"				||(e.target&&e.target.response)	\n"
		+"				||(e.src&&e.src.response))		\n"
		+"			init(x);\n"
		+"		}//onload function\n"
		+"		}//data		\n"
		+"		}//xhr param\n"
		+"		)//xhr		\n"
		+"	}//if !x		\n"
		+"	else init(x)	\n"
		+"}//function bootstrap\n"
		+"</script></head><body></body></html>"
	);}

 public static void main(String[]args){
 Dbg.p("DebugXhr.main:begin");
	final String prms=",storage:{path:'eu059s.files:dbg.txt',contentType:'text/Javascript',lastModified:1487164764805,data:'dbgOk'},path:'eu059s.files:dbg.txt',lastModified:1486164764805,no:0,logOut:true}";
	final String[]testCases={
		// "{op:'Storage.New'"	+prms,
		"{op:'Storage.list'"	+prms
		,"{op:'Storage.get'"	+prms
		,"{op:'Storage.content'"+prms
		,"{op:'Storage.set'"	+prms
		,"{op:'Storage.delete'"	+prms
		,""
	};//final String[]testCases
	Dbg.Srvlt s=new Dbg.Srvlt();Dbg.p("DebugXhr.main:new Srvlt");
	//TL.registerOp(AppEU059S.class);TL.registerOp(AppEU059S.Storage.class);
	for(String data:testCases)
	{Dbg.p("DebugXhr.main:data=",s.q.data=data);
	 try {s.q.attribs.clear();
		TL.run(s.q,s.p,s.p.out);//AppEU059S.jsp(s.q,s.p,s.p.out);
	 }catch (Exception e) {e.printStackTrace();}}
	Dbg.p("Dbg.main:end");
 }//main

static{TL.registerOp( AppEU059S.class);}

}//class AppEU059S
