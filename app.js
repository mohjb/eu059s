window.xa=app=
angular.module('app', ['ngSanitize','angular-md5','ui.router'] )
.config(function($stateProvider,$urlRouterProvider){
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




app.factory('app', [ function() {
    var p=window.xa||{}
    p.usr=0
    p.server={
        	Op:{//client facade reflection of server-Op,
        	login:'Usr.login'//function(){}
        	,logout:'Usr.logout'//function(){}
         }//Op
        }//server
    p.logout=function(state){p.usr=0;state.go('login');}
    return function(message) {return p;}}]);


app.controller('MainCtrl', //['app','md5',
function($scope,app ) {
	if(app instanceof Function)
		app=app();
	if(app){
		app.usr=0
		//var test=(new Date()).toString(),tst=md5.createHash(test)
		console.log('controller:MainCntrl:version=',$scope.version='MainCntrl , app='+app //,'md5Test=',test,tst
		)
	}else{
		$scope.usr=null;
		console.log('controller:MainCntrl:version=',$scope.version='MainCntrl , no app')
	}
}//]
)


.controller('loginCtrl',function($scope,app,db,md5,$state) {//['app','angular-md5','db', // angularMd5
	console.log('app.controller:loginCtrl:($scope,app,db,arguments,this)=',$scope,app,db,arguments,this) // md5,
	//$scope.usr=null;
	$scope.un=''
	$scope.pw=''
	$scope.msg=''
	$scope.clk=
	function calek(){
		console.log('loginCtrl:clk',arguments,this);
		//if(!db)db=window.app.db;//if(!db.usr)db=app.db
		if(db  instanceof Function)db=db();
		if(app instanceof Function)app=app();
		var u=db.usr.entries[$scope.un]
		if(!md5){console.error('controller:loginCtrl:function-clk:param-md5 not defined');md5={createHash:function(){}}}//,md5=app.md5||window.xa.md5||{createHash:function(){}}
		if(u && u.pw == md5.createHash($scope.pw)){
			app.usr=u;
			//TODO: DbLog.newEntry(login)
			$scope.msg='login successful,\n'+(new Date)
			//$scope.screen=app.screen='projects'
			$state.go('projects')
		}
		else $scope.msg='invalid login \n,'+(new Date)
	}


	//$scope.chng=function chng(){console.log('loginCtrl:chng',arguments,this);}


	/* a=document.getElementsByTagName('button')
	if(a&&a[0]&& !a[0].onclick)
	a[0].onclick=function(){
		console.log('loginCtrl:button.onclick',arguments,this);
		calek()
	}*/
}//]
)
.controller('projectsCtrl',
function($scope,app ) {
	if(app instanceof Function)
		app=app();
	console.log('controller:Cntrl:',app ,arguments,this)
	})
.controller('sheetCtrl',
function($scope,app ) {
	if(app instanceof Function)
		app=app();
	console.log('controller:Cntrl:',app ,arguments,this)
	})
.controller('searchCtrl',
function($scope,app ) {
	if(app instanceof Function)
		app=app();
	console.log('controller:Cntrl:',app ,arguments,this)
	})
.controller('queryCtrl',
function($scope,app ) {
	if(app instanceof Function)
		app=app();
	console.log('controller:Cntrl:',app ,arguments,this)
	})
.controller('printCtrl',
function($scope,app ) {
	if(app instanceof Function)
		app=app();
	console.log('controller:Cntrl:',app ,arguments,this)
	})
.controller('configCtrl',
function($scope,app ) {
	if(app instanceof Function)
		app=app();
	console.log('controller:Cntrl:',app ,arguments,this)
	})
.controller('configHelpCtrl',
function($scope,app ) {
	if(app instanceof Function)
		app=app();
	console.log('controller:Cntrl:',app ,arguments,this)
	})
.controller('usersCtrl',
function($scope,app ) {
	if(app instanceof Function)
		app=app();
	console.log('controller:Cntrl:',app ,arguments,this)
	})

app.factory('db', ['app', function(app) {
    var db={
        storage:{
         def:{name:'storage'
          ,columns:[//columns
             {name:'no',type:'integer',pk:1}
            ,{name:'path',type:'text',indices:[{name:'path',at:0}]}
            ,{name:'contentType',type:'enum','enum':['text/plain','text/html'
                ,'text/json','text/javascript','image/png','text/css']}
            ,{name:'lastModified',type:'date-time',readonly:1,indices:[{name:'lastModified',at:0}]}
            ,{name:'data',type:'textarea'}
         ],indices:{path:['path'],'lastModified':['lastModified']}}
        }//dbTbl storage
        ,usr:{
         def:{name:'usr'
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
         ,entries:{moh:{un:'moh',pw:'6f8f57715090da2632453988d9a1501b',uid:0,firstName:'Mohammad',lastName:'Buhamad',email:'mbohamad@kisr.edu.kw',level:'fullAccess',notes:'',created:'2017/06/20T21:05',created:'2017/06/20T21:05'}}
         }
        ,projects:{
         def:{name:'projects'
          ,columns:[
            {name:'no',type:'Integer',pk:1}
            ,{name:'title',type:'text',unique:1}
            ,{name:'owner',type:'integer',readonly:1,fk:{entity:'usr',col:'uid'}}
            ,{name:'created',type:'date-time',readonly:1}
            ,{name:'lastModified',type:'date-time',readonly:1,indices:[{name:'lastModified',at:0}]}
            ,{name:'notes',type:'text'}
          ],indices:{'lastModified':['lastModified']}
          ,unique:{'title':['title']}}
         ,entries:{}}//dbTbl Project
        ,buildings:{
         def:{name:'buildings',columns:[
            {name:'no',type:'Integer',pk:1}//inbound floors,sheets
            ,{name:'p',type:'Integer',readonly:1,fk:{entity:'projects',col:'no'}}
            ,{name:'title',type:'text',unique:'p'}
            ,{name:'owner',type:'integer',readonly:1,fk:{entity:'usr',col:'uid'}}
            ,{name:'created',type:'date-time',readonly:1}
            ,{name:'lastModified',type:'date-time',readonly:1,indices:[{name:'lastModified',at:0}]}
            ,{name:'notes',type:'text'}
        ],indices:{'lastModified':['lastModified']}
         ,unique:{'title':['p','title']}}
         ,entries:{}}//dbTbl Building
        ,floors:{
         def:{name:'floors',columns:[
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
        ,sheet:{
         def:{name:'sheet'
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
        }//sheets.def
        ,entries:{}
        }//dbTbl Sheet
        ,help:{
         def:{name:'help'
          ,columns:[
            {name:'field',type:'text',indices:[{name:'field',at:0}]}
            ,{name:'html',type:'text'}
            ,{name:'usr',type:'integer',readonly:1,fk:{entity:'usr',col:'uid'}}
            ,{name:'lastModified',type:'date-time',indices:[{name:'lastModified',at:0}]}
        ]}
         ,entries:{}}
        ,log:{def:{name:'log',cols:[
'no,logTime,uid,entity,pk,act,json,lastModified'
        ]},entries:{}}
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
    if(app)app.db=db
    return function(message) {return db;}}]);