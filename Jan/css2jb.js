cssLib={toJb:function(o){
	var n=o&&o.constructor&&o.constructor.name,f=cssLib[n]
	return f?f(o):cssLib.props(o);
 }
 ,props:function(o){ 
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
	,'CSSViewportRule']
	if(o){var a={},n=o&&o.constructor&&o.constructor.name;
		if(n)a.constructorName=n;
		for(var i in o)
		{var x=o[i],f;
			if(x!=undefined&&x!=null){//&&x!=''
			n=x&&x.constructor&&x.constructor.name
			f=cssLib[n];if(f)a[i]=f(x)
			else{f=classNames[n]
			a[i]=f?cssLib.props(x):x}}}
		return a;}}
 ,list:function(o){
	var a=[],n=(o&&o.length)||0;
	for(var i =0;i<n;i++)
		a.push(cssLib.toJb(o[i]))
	return a;}
 ,'StyleSheetList':function(o){return cssLib.list(o);}
 ,'CSSRuleList':function(o){return cssLib.list(o);}
 ,'CSSStyleSheet':function(o){
	var a={},b=['href','type','title','disabled','media'],n;
		for(var i=0;i<b.length;i++)
		{n=b[i],x=o[n];if(x&&x!='')
			a[n]=x;}
		b=o.rules||o.cssRules//CSSRuleList
		if(b)a.s=cssLib.list(b);
		//for(var i=0;b&&b.length&&i<b.length;i++)c.push(cssLib.toJb(b[i]))
		return a;}
 ,'CSSStyleDeclaration':function(o){
	var n=o&&o.length||0,x
	,a={x:{}}
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
	return a;}
}//cssLib

cssSheets=cssLib.toJb(document.styleSheets)


 /*
 ,'CSSStyleRule':function(o){
	var a={},b=['selectorText','type','cssText']//,'href','media'
	for(var i=0;i<b.length;i++)
	{n=b[i],x=o[n];if(x&&x!='')
		a[n]=x;}
	b=o.style//CSSStyleDeclaration
	if(b)a.s=cssLib['CSSStyleDeclaration'](b);
	//for(var i=0;b&&b.length&&i<b.length;i++)c.push(cssLib.toJb(b[i]))
	return a;
 },'CSSImportRule':function(o){
	var c=[],a={c:c},b=['type','href','media','cssText']//
	for(var i=0;i<b.length;i++)
	{n=b[i],x=o[n];if(x&&x!='')
		a[n]=x;}
	//CSSStyleSheet
	b=o.styleSheet;//for(var i=0;b&&b.length&&i<b.length;i++)c.push(cssLib.toJb(b[i]))
	if(b)a.s=cssLib['CSSStyleSheet'](o.styleSheet)
	return a;
 }/*
 ,'CSSMediaRule':function(o){
	var c=[],a={c:c},b=['type','href','media','cssText']//
	for(var i=0;i<b.length;i++)
	{n=b[i],x=o[n];if(x&&x!='')
		a[n]=x;}
	//CSSStyleSheet
	b=o.styleSheet;
	if(b)a.s=cssLib['CSSStyleSheet'](o.styleSheet)
	return a;}



cssSheetList2jb=function cssSheetList2jb(o){
	var a=[];
	for(var i =0;i<o.length;i++)
		a.push(cssSheet2jb(o[i]))
	return a

	function cssSheet2jb(o){//cssSheet2jb=
		var a={rules:[]},b=['href','type','title'],n;
		for(var i=0;i<b.length;i++)
		{n=b[i],x=o[n];if(x&&x!='')
			a[n]=x;}
		b=o.rules||o.cssRules
		for(var i=0;i<b.length;i++)
			a.rules.push(rule2jb(b[i]))
		return a;
		function rule2jb(o){
			var a={style:[]},b=['href','type','cssText','media']
			for(var i=0;i<b.length;i++)
			{n=b[i],x=o[n];if(x&&x!='')
				a[n]=x;}
			b=o.rules||o.cssRules
			for(var i=0;b&&b.length&&i<b.length;i++)
				a.style.push(css2jb(b[i]))

			function css2jb(o){
				var s=o&&o.style
				,n=s.length||0,x//,b=['type','cssText','']
				,a={selectorText:o.selectorText,style:{},x:{}}
				x=o.type;if(x!=undefined&&x!='')a.type=x
				x=s.cssText;if(x!=undefined&&x!='')a.cssText=x
				x=o.cssText;if(x!=undefined&&x!='')
					a.t=x// this is a string tah has packed selectorText and braces encompassing o.style.cssText
				
				for(var i=0,k;i<n;i++)
				{k=s[i]
					a.style[k]=s[k]
				}
				for(var i in s)
				if(s[i]&&s[i]!=''&&i!='parentRule'){
					a.x[k]=s[k]
				}
				return a;
			}//css2jb=function(o)
		}//rule2jb=function
	}//cssSheet2jb=function(o)
}//cssSheetList2jb


 */