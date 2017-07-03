(window.xa=app=(angular||{})
.module('app', ['ngSanitize','angular-md5','ui.router'] ))
.config(function appConfig($stateProvider,$urlRouterProvider){
	console.log('config',this,arguments);
	$urlRouterProvider.otherwise('/login');
	$stateProvider.state('login',{
	  url:'/login',
	  templateUrl:'template-login.html'
	  ,controller:'loginCtrl'
	})
	.state('projects',{
	  url:'/projects',
	  templateUrl:'template-projects.html'
	  ,controller:'projectsCtrl'
	})
	.state('project',{
	  url:'/project',
	  templateUrl:'template-project.html'
	  ,controller:'projectsCtrl'
	})
	.state('building',{
	  url:'/building',
	  templateUrl:'template-building.html'
	  ,controller:'projectsCtrl'
	})
	.state('floor',{
	  url:'/floor',
	  templateUrl:'template-floor.html'
	  ,controller:'projectsCtrl'
	})
	.state('sheet',{
	  url:'/sheet',
	  templateUrl:'template-sheet.html'
	  ,controller:'sheetCtrl'
	})
	.state('search',{
	  url:'/search',
	  templateUrl:'template-search.html'
	  ,controller:'searchCtrl'
	})
	.state('query',{
	  url:'/query',
	  templateUrl:'template-query.html'
	  ,controller:'queryCtrl'
	})
	.state('print',{
	  url:'/print',
	  templateUrl:'template-print.html'
	  ,controller:'printCtrl'
	})
	.state('config',{
	  url:'/config',
	  templateUrl:'template-config.html'
	  ,controller:'configCtrl'
	})
	.state('config-help',{
	  url:'/config-help',
	  templateUrl:'template-config-help.html'
	  ,controller:'configHelpCtrl'
	})
	.state('users',{
	  url:'/users',
	  templateUrl:'template-users.html'
	  ,controller:'usersCtrl'
	})
  })//config

app.factory('app', [ function appFactory() {
	var p=window.xa||{}
	p.usr=0
	p.server={
			Op:{//client facade reflection of server-Op,
			login:'Usr.login'//function(){}
			,logout:'Usr.logout'//function(){}
		 }//Op
		}//server
	p.logout=function appLogout(state){p.usr=0;state.go('login');}
	//p.indxOf=function app_indxOf(e,a){for(var i in a)if(a[i]==e)return i;}

	return function appFactoryCallback(message) {return p;}}]);

app.controller('MainCtrl', //['app','md5',
 function mainCtrlController($scope,app,$rootScope ) {
	if(app instanceof Function)
		app=app();
	if(app){
		$rootScope.app=app
		$scope.usrFlag=app.usr=0
		//var test=(new Date()).toString(),tst=md5.createHash(test)
		console.log('controller:MainCntrl:version=',$scope.version='MainCntrl , app='+app //,'md5Test=',test,tst
		)
	}else{
		$scope.usr=null;
		console.log('controller:MainCntrl:version=',$scope.version='MainCntrl , no app')
	}
}//]
)

.controller('loginCtrl',
 function loginCtrlController($scope,app,db
	,md5,$state,$rootScope) 
 {	console.log('app.controller:loginCtrl:($scope'
 		,$scope,',app',app,',db',db,',md5',md5
 		,',$state',$state,',$rootScope',$rootScope
 		,',arguments',arguments,',this',this,')')
	$scope.un=''
	$scope.pw=''
	$scope.msg=''
	$rootScope.$state=$scope.$state=$state
	if(db  instanceof Function)db=db();
	if(app instanceof Function)app=app();
	$scope.app=app;
	$scope.clk=
	function calek(){
		console.log('loginCtrl:clk',arguments,this);
		var u=db.ls.usr[$scope.un]
		if(!md5){console.error('controller:loginCtrl:function-clk:param-md5 not defined');
			md5={createHash:function loginCtrlDummyMd5(){}}}
		if(u && u.pw == md5.createHash($scope.pw)){
			app.usr=u;
			//TODO: DbLog.newEntry(login)
			$scope.msg='login successful,\n'+(new Date)
			//db.util.reloadLoclStorg()
			$state.go('projects')
		}
		else $scope.msg='invalid login \n,'+(new Date)
	}})

.controller('projectsCtrl',
 function projectsCtrlController($scope,app,db ) {
	if(app instanceof Function)
		app=app();
	if(db instanceof Function)
		db=db();
	$scope.app=app
	$scope.db=db;
	var x=window.location.hash
	$scope.clss=x && x.indexOf?
		(x.indexOf('floor')!=-1?'floor'
			:x.indexOf( 'building')!=-1
			?'building':'project'
		):'project'
	console.log('projectsListCntrl:',app ,arguments,this)
	$scope.projects=db.ls.projTree
	$scope.proj=app.proj;$scope.bld=app.bld;$scope.flr=app.flr;

	$scope.chng=function projectsCtrlChng(evt,prefix,ix){
		var s=(evt||window.event||{})
		,t=s.target||s.sourceElement
		,u=t?t.className:0
		if(u && u.indexOf && u.indexOf('title')!=-1)
		{	var clss=x && x.indexOf?
				(x.indexOf('floor')!=-1?'floor'
					:x.indexOf( 'building')!=-1
					?'building':'project'
				):'project'
			,x=window.location.hash
			,e=clss=='floor'?app.flr:clss=='building'?app.bld:app.proj
			,a=clss=='floor'?app.bld.floors:clss=='building'
				?app.proj.buildings:$scope.projects;
			u=$scope.withTitle(e,a);
			if(u)
			{t.value=e.title=(t.oldVal||((
					t.getAttribute instanceof Function
					)&&t.getAttribute('oldVal'))
					||e.title);
			 t.style.backgroundColor='pink';
			 s=0;}
			else
			{t.oldVal=t.value;t.style.backgroundColor='';}
		}
		if(!prefix)prefix=db.prefix.projTree;
		if(!ix)ix=app.proj.no||app.proj.aux
		console.log('projectsCtrl.chng:prefix',prefix,',ix',ix
			,' ,this',this,' ,$scope',$scope,' ,arguments',arguments);
		if(s)
			db.onDirty(prefix,ix);
	}//$scope.chng=function projectsCtrlChng
	$scope.blr=function projectsCtrlBlur(prefix,ix){
		if(!prefix)prefix=db.prefix.projTree;
		if(!ix)ix=app.proj.no||app.proj.aux
		console.log('projectsCtrl.blr:prefix',prefix,',ix',ix
			,' ,this',this,' ,$scope',$scope,' ,arguments',arguments);
		db.onBlur(prefix,ix);
	}

	$scope.sheetsCountInProj=function projectsCtrlSheetsCountInProj(p){
		var c=0,a,b;if(!p)p=app.proj;
		p=p && p.buildings
		if(p)for(var i in p)
		  {	b=p[i];
		    a=b && b.floors
			if(a)for(var j in a)
			{	b=a[j];
				b=(b&& b.sheets)||0;
				c+=b.length||0
		}}
		return c;}/*
	$scope.sheetsCountInProj=function projectsCtrlSheetsCountInProj(p){
		var c=0,a,b;if(!p)p=app.proj;if(p && p.buildings)
		for(var i in p.buildings){a=p.buildings[i];if(a && a.floors)
			for(var j in a.floors){b=a.floors[j]
				c+=b && b.sheets?(b.sheets.length||0):0
		}}return c;}*/

	$scope.sheetsCountInBld=function projectsCtrlsheetsCountInBld(p){
		var a,b,c=0;if(!p)
			p=app.bld;a=p && p.floors;
		if(a)for(var i in a)
		{	b=a[i];
			b=(b&& b.sheets)||0
			c+=b.length||0
		}
		return c;}

	$scope.withTitle=function projectsCtrlwithTitle(ttl,a){
		for(var i in a)if(a[i]!=ttl && a[i].title==ttl.title)//i.title==ttl || 
			return i;
		return null;}

	$scope.setTitle=function projectsCtrlsetTitle(ttl,x,a){
		var z=$scope.withTitle(ttl,a);
		if(z)return false;
		x.title=ttl;
		return x;}

	$scope.newProj=function projectsCtrlnewProj(){return db.newProj();}
	$scope.newBld=function projectsCtrlnewBld(){return db.newBld();}
	$scope.newFlr=function projectsCtrlnewFlr(){return db.newFlr();}
	$scope.newSht=function projectsCtrlnewSht(){return db.newSht();}
	$scope.delPrj=function projectsCtrlDelPrj(){return db.deletePrj(app.proj);}
	$scope.delBld=function projectsCtrlDelBld(){return db.deleteBld(app.bld,app.proj.buildings);}
	$scope.delFlr=function projectsCtrlDelFlr(){return db.deleteFlr(app.flr,app.bld.floors);}


	$scope.countFlrsInPrj=function projectsCtrlsheetsCountInBld(p){
		var a,x,c=0;if(!p)
			p=app.proj;
		a=p && p.buildings
		if(a)
		  for(var j in a)
		  { x=a[j]
			x=(x && x.floors)||0
			c+= x.length ||0;}
		return c;}

	})
.controller('sheetCtrl',
 function sheetCtrl($scope,app,db ) {
	if(app instanceof Function)app=app();
	if(db instanceof Function)db=db();
	var proj=$scope.proj=app.proj||db.ls.projTree
		,bld=$scope.bld=app.bld
		,flr=$scope.flr=app.flr
		,sht=$scope.sht=app.sht

	$scope.chng=function sheetCtrlchng(prefix,ix){
		if(!prefix)
			prefix=db.prefix.projTree;
		if(!ix)ix=app.proj.no||app.proj.aux
		console.log('sheetCtrl.chng:prefix',prefix,',ix',ix
			,' ,this',this,' ,$scope',$scope,' ,arguments',arguments);
		db.onDirty(prefix,ix);
		}
	$scope.blr=function sheetCtrlblr(prefix,ix){
		if(!prefix)prefix=db.prefix.projTree;
		if(!ix)ix=app.proj.no||app.proj.aux
		console.log('sheetCtrl.blr:prefix',prefix,',ix',ix
			,' ,this',this,' ,$scope',$scope,' ,arguments',arguments);
		db.onBlur(prefix,ix);
		}

	$scope.shtNew=function sheetCtrlNew(){
		return $scope.sht=app.sht=db.newSht();}
	$scope.shtPrev=function sheetCtrlPrev(){
		var s=app.sht,a=app.flr.sheets
		,i=s&&a instanceof Array  && a.length && a.indexOf(s)
		,x=i>-1 && a[(i-1+a.length)%a.length]
		if(x )
			s=x
		return s;}
	$scope.shtNext=function sheetCtrlNext(){
		var s=app.sht,a=app.flr.sheets
		,i=s&&a instanceof Array  && a.length && a.indexOf(s)
		,x= i>-1 && a[(i+1)%a.length]
		if(x )
			s=x
		return s;}

	$scope.del=function sheetCtrlDel(){
		var x=confirm('Please confirm deleting this sheet')
		if(x)
		{	x=app.proj;
			x=x.no||x.aux
			x=db.deleteSheet(app.sht,app.flr,x);
			console.log('sheetCtrlDel: delete-status=',x);
			localtion.hash='#!/floor'
		}
	}

	console.log('sheetCtrl:',app ,arguments,this)
	}//sheetCtrl
)//controller sheetCtrl

.controller('searchCtrl',
 function searchCtrl($scope,app ) {
	if(app instanceof Function)
		app=app();

	function fltr(rx,a){}
	function fltrP(rx,o){}
	function fltrPrj(rx,p){}
	function fltrBld(rx,b){}
	function fltrFlr(rx,f){}
	function fltrSht(rx,s){}
	function fltrUsr(rx,u){}
	function fltrHelp(rx,h){}
	function fltrConfig(rx,c){}
	
	console.log('controller:searchCntrl:',app ,arguments,this)
	})
.controller('queryCtrl',
function queryCtrl($scope,app ) {
	if(app instanceof Function)
		app=app();
	console.log('controller:queryCntrl:',app ,arguments,this)
	})
.controller('printCtrl',
function printCtrl($scope,app ) {
	if(app instanceof Function)
		app=app();
	console.log('controller:printCntrl:',app ,arguments,this)
	})
.controller('configCtrl',
function configCtrl($scope,app ) {
	if(app instanceof Function)
		app=app();
	console.log('controller:Cntrl:',app ,arguments,this)
	})
.controller('configHelpCtrl',
function configHelpCtrl($scope,app ) {
	if(app instanceof Function)
		app=app();
	console.log('controller:Cntrl:',app ,arguments,this)
	})
.controller('usersCtrl',
 function usersCtrl($scope,app ) {
	if(app instanceof Function)
		app=app();
	console.log('controller:Cntrl:'
		,app ,arguments,this)
	})

app.factory('db', ['app', function dbFactory(app) {
 if(!window.db) db={
 	prefix:{app:'EU059S'	//prefix strings used for keys of localStorage
 		,config:'config',help:'help'
 		,projTree:'projTree'//,sheet:'sheet'
 		,usr:'usr',file:'file'}
	,ls:{projTree:{},config:{},help:{},usr:{
		moh:{un:'moh',pw:'6f8f57715090da2632453988d9a1501b',uid:0,firstName:'Mohammad',lastName:'Buhamad',email:'mbohamad@kisr.edu.kw',level:'fullAccess',notes:'',created:'2017/06/20T21:05',created:'2017/06/20T21:05'}
	},file:{}}//localStorage stored objects 	//,sheet:{}
	,intrvl:{projTree:{},config:{},help:{},usr:{},file:{}}//setInterval(javascript built-in function) references for localStorage-dirty-data
	,intrvlTm:5000//,logQ:[] //q is a queue for sending to the server all pending db-changes-events, this is in cases when the web-app is offline

	,onDirty:function srvcDB_onDirty(prefix,ix){
		function intrvlF()
		{var nowd=new Date(),now=nowd.getTime();
			if(now-db.intrvlTm>=db.intrvl[prefix][ix][1])
			{	clearInterval(db.intrvl[prefix][ix][0]);
				db.lsSave(prefix,ix);
				db.intrvl[prefix][ix]=0;}}
		var now=new Date().getTime()
		if(!db.intrvl[prefix][ix])
			db.intrvl[prefix][ix]=[setInterval(intrvlF,db.intrvlTm),now]
		else	db.intrvl[prefix][ix][1]=now;}
	,onBlur:function srvcDB_onBlur(prefix,ix){//db.log(  )
		if(db.intrvl[prefix][ix])
		{	clearInterval(db.intrvl[prefix][ix][0])
			db.intrvl[prefix][ix]=0;
			db.lsSave(prefix,ix);
			console.log('db-srvc:onBlur:',this,arguments);
		}}

	,lsSave:function dbSrvc_lsSave(prefix,ix){//db.log(  )
		if(prefix||ix){
			if(!prefix)prefix=db.prefix.projTree;if(!ix)ix='';
			var x=db.prefix.app+prefix+ix
			,s=JSON.stringify(db.ls[prefix][ix])
			localStorage[x]=s;
			console.log('db.lsSave:',x,s);
		}else{
			for(var p in db.ls){
				for(var i in db.ls[p])
				{var s=JSON.stringify(db.ls[p][i]),
					x=db.prefix.app+p+i;
					localStorage[x]=s;
					console.log('db.lsSave:',x,s);
		}}}}
	,lsLoad:function dbSrvc_lsLoad(prefix,ix){
		var regex=/\d+[\-\\\/\.]\d+[\-\\\/\.]\d+([T ]\d+\:\d+)?(\:\d+)?(\.\d+)?/
		function prsDt(x){
			if(x)for(var i in x)
			{var v=x[i];if(typeof(v)=='string' && regex.test(v))
			 {	var d=new Date(v);
				if(!isNaN(d.getTime()))
					x[i]=d;
			 }
			 else if(typeof(v)=='object')
				prsDt(v)
			}return x;
		}
		if(prefix||ix){
			if(!prefix)
				prefix=db.prefix.projTree;if(!ix)ix='';
			var x=prefix+ix,o;
			try{o=localStorage[db.prefix.app+x]
				o=prsDt(JSON.parse(o));
				db.ls[prefix][ix]=o}catch(ex){
						console.error('db-srvc:lsLoad: ,prefix=',prefix,' ,ix=',ix,o,ex)}
			return o;
		}else{function getPrefix(key){
			for(var pre in db.prefix)
				if(key.startsWith(db.prefix.app+pre))
					return pre;}
			var o,old=db.ls;db.ls={projTree:{},config:{},help:{},usr:{},file:{}};
			for(var key in localStorage)
			{	var v=localStorage[key],prefix=getPrefix(key)
				console.log( 'lsLoad:All:prefix=',prefix,' ,key=',key
					,' ,localStorage[key]=',(v&&v.length>199&&v.substring?v.substring(0,200):v) );
				if(prefix){var ix=key.substring(db.prefix.app.length+prefix.length)
					try{o=prsDt(JSON.parse(v));db.ls[prefix][ix]=o}catch(ex){
						console.error('db-srvc:lsLoad:all:key=',key,' ,prefix=',prefix,' ,ix=',ix,ex)}
			}}
			if(Object.keys(db.ls.usr).length==0)
				db.ls.usr=old.usr
		}
	}
	,newProj:function dbSrvc_newProj(){
		var nowd=new Date(),now=nowd.getTime()
		, p=db.ls.projTree[now]={aux:now//no:$scope.getNewNo($scope.projects),
			,lastModified:nowd,date:nowd,owner:app.usr.uid
			,title:'Project'+now,buildings:[]}
		db.lsSave(db.prefix.projTree,p.aux);
		return p//$scope.projsCount=$scope.projects.length
	}
	
	,newBld:function dbSrvc_newBld(){//
		var proj=app.proj,p={no:db.getNewNo(proj.buildings),
			lastModified:new Date(),owner:app.usr.uid,floors:[]}
		proj.buildings.push(p);p.title='Building'+p.no;p.date=p.lastModified;
		db.lsSave(db.prefix.projTree,proj.no||proj.aux);
		return p//proj.buildings.length
	}
	,newFlr:function dbSrvc_newFlr(){
		var bld=app.bld
		,p={no:db.getNewNo(bld.floors)
			,lastModified:new Date()
			,owner:app.usr.uid
			,sheets:[]}
		,j=app.proj
		bld.floors.push(p);
		p.title='Floor'+p.no;
		p.date=p.lastModified;
		db.lsSave(db.prefix.projTree,j.no||j.aux);
		return p//bld.floors.length
	}
	,newSht:function dbSrvc_newSht(){
		var flr=app.flr
		,j=app.proj
		,d=new Date()
		,n=d.getTime()
		,p={no:db.getNewNo(flr.sheets)
			,lastModified:d
			,date:d
			,owner:app.usr.uid
			,TypeofMember:{}
			,exposure:{} 
			,LoadingCondition:{} 
			,Distress:{} 
			,Cracking:{} 
			,Textural:{} 
			,Distresses:{} 
			,JointDeficiencies:{}
			,Reinforcement:{}}
		flr.sheets.push(p);
		db.lsSave(db.prefix.projTree,j.no||j.aux);
		return p//flr.sheets.length
	}
	,deleteSheet:function dbSrvc_deleteSheet(s,f,pIx){	// ,app.flr.sheets.indexOf(app.sht)
		var a=f.sheets,i=a.indexOf(s);
		if(i>-1){
			a.splice(i,1);
			db.lsSave(db.prefix.projTree,pIx);
			return true;
		}
		return false;
	}
	,getNewNo:function dbSrvc_getNewNo(a){var x=0;
		for(var i in a)if(i.no&&i.no>=x)
			x=i.no+1;
		return x;}

	,modifiedAfter:function dbSrvc_modifiedAfter(d){
		var r=[-1,-1,[]]
		for(var j in db.ls.projTree){}
		for(var j in db.ls.usr){}
		//config help file
	}/*
	,log:function dbSrvc_(act,lastModified,x,entity,col,newVal,oldVal){
		var p={uid:app.usr.uid,act:act,lastModified:lastModified
			,x:x,entity:entity,col:col,newVal:newVal,oldVal:oldVal,lastModified:lastModified}
		console.log('db-service:dbLog(act',act,',lastModified',lastModified
			,',x',x,',entity',entity,',col',col,',newVal',newVal,',oldVal',oldVal,')');
		db.logQ.push(p);}*/

	,serverDefinitions:{
		storage:{name:'storage',lsPrefix:'config'
		  ,columns:[//columns
			 {name:'no',type:'integer',pk:1}
			,{name:'path',type:'text',indices:[{name:'path',at:0}]}
			,{name:'contentType',type:'enum','enum':['text/plain','text/html'
				,'text/json','text/javascript','image/png','text/css']}
			,{name:'lastModified',type:'date-time',readonly:1,indices:[{name:'lastModified',at:0}]}
			,{name:'data',type:'textarea'}
		 ],indices:{path:['path'],'lastModified':['lastModified']}
		}//dbTbl storage
		,usr:{name:'usr',lsPrefix:'users'
		  ,columns:[
			{name:'uid',type:'integer',pk:1}
			,{name:'un',type:'text',unique:1,indices:[{name:'un',at:0}]}
			,{name:'pw',type:'text',password:1}
			,{name:'firstName',type:'text'},{name:'lastName',type:'text'}
			,{name:'email',type:'text'},{name:'tel',type:'text'},{name:'tel2',type:'text'}
			,{name:'level',type:'enum','enum':['viewer','inspector','fullAccess']}
			,{name:'notes',type:'text'}
			,{name:'created',type:'date-time',readonly:1}
			,{name:'lastModified'	,type:'date-time',readonly:1,indices:[{name:'lastModified',at:0}]}
			],indices:{'lastModified':['lastModified']}
			 ,unique:{'title':['un']}}
		,projects:{name:'projects',lsPrefix:'projTrees'
		  ,columns:[
			{name:'no',type:'Integer',pk:1}
			,{name:'title',type:'text',unique:1}
			,{name:'owner',type:'integer',readonly:1,fk:{entity:'usr',col:'uid'}}
			,{name:'created',type:'date-time',readonly:1}
			,{name:'lastModified',type:'date-time',readonly:1,indices:[{name:'lastModified',at:0}]}
			,{name:'notes',type:'text'}
		  ],indices:{'lastModified':['lastModified']}
		  ,unique:{'title':['title']}}//dbTbl Project
		,buildings:{name:'buildings',lsPrefix:'projTrees',columns:[
			{name:'no',type:'Integer',pk:1}//inbound floors,sheets
			,{name:'p',type:'Integer',readonly:1,fk:{entity:'projects',col:'no'}}
			,{name:'title',type:'text',unique:'p'}
			,{name:'owner',type:'integer',readonly:1,fk:{entity:'usr',col:'uid'}}
			,{name:'created',type:'date-time',readonly:1}
			,{name:'lastModified',type:'date-time',readonly:1,indices:[{name:'lastModified',at:0}]}
			,{name:'notes',type:'text'}
		],indices:{'lastModified':['lastModified']}
		 ,unique:{'title':['p','title']}}//dbTbl Building
		,floors:{name:'floors',lsPrefix:'projTrees',columns:[
			{name:'no',type:'Integer',pk:1}
			,{name:'p',type:'Integer',readonly:1,fk:{entity:'projects',col:'no'}}
			,{name:'b',type:'Integer',readonly:1,fk:{entity:'buildings',col:'no'}}
			,{name:'title',type:'text',unique:'b'}
			,{name:'owner',type:'integer',readonly:1,fk:{entity:'usr',col:'uid'}}
			,{name:'created',type:'date-time',readonly:1}
			,{name:'lastModified',type:'date-time',readonly:1,indices:[{name:'lastModified',at:0}]}
			,{name:'notes',type:'text'}
		 ],indices:{'lastModified':['lastModified']}
		  ,unique :{'title':['b','title']}}//dbTbl Floor
		,sheet:{name:'sheet',lsPrefix:'projTrees'
		  ,columns:[
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
		}//dbTbl Sheet
		,help:{name:'help',lsPrefix:'help'
		  ,columns:[
			{name:'field',type:'text',indices:[{name:'field',at:0}]}
			,{name:'html',type:'text'}
			,{name:'usr',type:'integer',readonly:1,fk:{entity:'usr',col:'uid'}}
			,{name:'lastModified',type:'date-time',indices:[{name:'lastModified',at:0}]}]}
		,log:{name:'log',lsPrefix:'logQ',cols:[
			'no','logTime','uid','entity','pk','act','json','lastModified'
		]}
  }//serverDefinitions
 }//dbSchema
 if(app instanceof Function)app=app();if(app)app.db=db
 try{db.lsLoad();}catch(ex){
 	console.error('db-srvc:line 531',ex);}
 return function dbFactoryCallback(message) {return db;}
}]);