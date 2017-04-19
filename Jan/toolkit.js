toolkit={
/*-- Component/Container  Visualization-Editor 
	( http://resources.jointjs.com/demos/links 
	  http://resources.jointjs.com/demos/routing 
	  http://resources.jointjs.com/demos/paper
	)
SVG Vis-Ed
annotations Vis-Ed
Layout Component Alignment(Snapping location) Visualization-Editor
userProfile(training,skills,xp)
UML Class Diagram Vis-Ed , Code-Generation (http://resources.jointjs.com/demos/umlcd )
VisualConstructs Cell(API interface) / Visual Prototype (Prop-Ed) ( http://resources.jointjs.com/demos/hull )
WorkFlow (http://esprima.org) (Javascript AST Visualizer: http://resources.jointjs.com/demos/javascript-ast )
FSM Vis-Ed ( example: http://resources.jointjs.com/demos/fsa )
UML Use Cases
UML Sequence
object/component life cycle
Dependency Levels  / System Layers
Scuffolding , (Code/GUI) Generation / templates, DB Introspection( http://resources.jointjs.com/demos/erd )
HTML+CSS WYSIWYG
CSS+TimeLine Anim Ed
Slides Ed , Dialog Generator ( http://resources.jointjs.com/demos/qad )
Users & RBAC Visualization
WebGL Vis-Ed
FileSys Vis-Ed
Visual Stations
Organizational Visualization-Editor ( example: http://resources.jointjs.com/demos/orgchart )
Business Process Model and Notation( http://resources.jointjs.com/demos/bpmn ) ( http://resources.jointjs.com/demos )
FlowChart ( Perti-net  http://resources.jointjs.com/demos/pn )
UML The Statechart Diagram ( http://resources.jointjs.com/demos/umlsc )
LOGIC CIRCUITS ( http://resources.jointjs.com/demos/logic )
( http://resources.jointjs.com/demos/kitchensink )

selectionMan
undo-redo, macros
conceptLine/conceptsSpan
courses
	( computerSciense-courses: 
		flow-chart, 
		documentation-readability,  
		client-side web programming(html5,css,javascript,svg)
		server-side web programming(java,http,NodeJs)
		data-structures,
		os(kernel(processes,memory-management),shell,fs,inter-process-communication)
		computer graphics(bitmap,vector,gui, font design)
		networking, 
		db and sql
		3d-modeling
		security
		ux
		game-development
		AI(CV,search-space,voice recognision, 3d space scanning
			, 3d planning-routing and detection-and-avoidence
			,language-interaction & open-mind object-oriented automation)
		robotics and computer hardware interfacing
		location-based services
	 philisophy of innovation
	 psychology of learning , and Pedagogy(https://en.wikipedia.org/wiki/Pedagogy )
	 mathematics
	 english
	 arabic
	 social-media/public-opinion ,wisedom circles
	 accounting:
	 mba
	 marketing
	 project-management
	 business-model, Business Process Model and Notation
	 sales
	 customer-care
	 Health informatics , healthcare administration
		(https://en.wikipedia.org/wiki/Health_administration )
	 e-Government, e-Commerce
	)
*/
tkMan:{
	/*
	ref to the currently selected component
	ref to the current mode/state
	*/
newSvg:function(parent,prm){}//,getSvg:function(){}
,create:function(n,a){/*n:path,circle,text*/}
}//tkMan
,comp:{
/*
state/mode: hidden,display,edit,move,resize,rotate,hover,hoverSelected
border
buttons
	propsThis(proto,svgCode-of-this, componentsPalette, ExEntriesPalette, stationProps)
	,move, resize,  rotate, createSub, delete, display/appearence-props(strokeColor,strokeWidth,fill(color,gradient,img),line-styles,textFormatting,css-anim), anchors
eventHandlers
	move,scale,rotate,onOver,onOverOut,onDragStart,onDragEnd,onDrop,onClick,onKeyPress,onKeyRelease,onCopy,onPaste
sub-class that is more specific to the semantics
		
*/
border:{draw:function(){},pos:{cx,cy,w,h,pos:function(prop,val){}}}
}//comp
,Label:{}//sub-class of "comp"
}//toolkit