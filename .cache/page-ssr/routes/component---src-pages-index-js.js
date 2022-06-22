"use strict";
exports.id = 678;
exports.ids = [678];
exports.modules = {

/***/ 3204:
/***/ ((module) => {



const preserveCamelCase = string => {
	let isLastCharLower = false;
	let isLastCharUpper = false;
	let isLastLastCharUpper = false;

	for (let i = 0; i < string.length; i++) {
		const character = string[i];

		if (isLastCharLower && /[a-zA-Z]/.test(character) && character.toUpperCase() === character) {
			string = string.slice(0, i) + '-' + string.slice(i);
			isLastCharLower = false;
			isLastLastCharUpper = isLastCharUpper;
			isLastCharUpper = true;
			i++;
		} else if (isLastCharUpper && isLastLastCharUpper && /[a-zA-Z]/.test(character) && character.toLowerCase() === character) {
			string = string.slice(0, i - 1) + '-' + string.slice(i - 1);
			isLastLastCharUpper = isLastCharUpper;
			isLastCharUpper = false;
			isLastCharLower = true;
		} else {
			isLastCharLower = character.toLowerCase() === character && character.toUpperCase() !== character;
			isLastLastCharUpper = isLastCharUpper;
			isLastCharUpper = character.toUpperCase() === character && character.toLowerCase() !== character;
		}
	}

	return string;
};

const camelCase = (input, options) => {
	if (!(typeof input === 'string' || Array.isArray(input))) {
		throw new TypeError('Expected the input to be `string | string[]`');
	}

	options = Object.assign({
		pascalCase: false
	}, options);

	const postProcess = x => options.pascalCase ? x.charAt(0).toUpperCase() + x.slice(1) : x;

	if (Array.isArray(input)) {
		input = input.map(x => x.trim())
			.filter(x => x.length)
			.join('-');
	} else {
		input = input.trim();
	}

	if (input.length === 0) {
		return '';
	}

	if (input.length === 1) {
		return options.pascalCase ? input.toUpperCase() : input.toLowerCase();
	}

	const hasUpperCase = input !== input.toLowerCase();

	if (hasUpperCase) {
		input = preserveCamelCase(input);
	}

	input = input
		.replace(/^[_.\- ]+/, '')
		.toLowerCase()
		.replace(/[_.\- ]+(\w|$)/g, (_, p1) => p1.toUpperCase())
		.replace(/\d+(\w|$)/g, m => m.toUpperCase());

	return postProcess(input);
};

module.exports = camelCase;
// TODO: Remove this for the next major release
module.exports["default"] = camelCase;


/***/ }),

/***/ 9359:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ bio)
});

// EXTERNAL MODULE: external "C:\\Users\\patri\\Documents\\webpage\\blog\\node_modules\\react\\index.js"
var external_C_Users_patri_Documents_webpage_blog_node_modules_react_index_js_ = __webpack_require__(342);
var external_C_Users_patri_Documents_webpage_blog_node_modules_react_index_js_default = /*#__PURE__*/__webpack_require__.n(external_C_Users_patri_Documents_webpage_blog_node_modules_react_index_js_);
// EXTERNAL MODULE: ./.cache/gatsby-browser-entry.js + 4 modules
var gatsby_browser_entry = __webpack_require__(7533);
// EXTERNAL MODULE: ./node_modules/camelcase/index.js
var camelcase = __webpack_require__(3204);
// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(5697);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);
;// CONCATENATED MODULE: ./node_modules/gatsby-plugin-image/dist/gatsby-image.module.js
function n(){return n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var i in a)Object.prototype.hasOwnProperty.call(a,i)&&(e[i]=a[i]);}return e;},n.apply(this,arguments);}function o(e,t){if(null==e)return{};var a,i,r={},n=Object.keys(e);for(i=0;i<n.length;i++)t.indexOf(a=n[i])>=0||(r[a]=e[a]);return r;}var s=(/* unused pure expression or super */ null && ([.25,.5,1,2])),l=(/* unused pure expression or super */ null && ([750,1080,1366,1920])),d=(/* unused pure expression or super */ null && ([320,654,768,1024,1366,1600,1920,2048,2560,3440,3840,4096])),u=function(e){return console.warn(e);},c=function(e,t){return e-t;},h=function(e){return e.map(function(e){return e.src+" "+e.width+"w";}).join(",\n");};function g(e){var t=e.lastIndexOf(".");if(-1!==t){var a=e.slice(t+1);if("jpeg"===a)return"jpg";if(3===a.length||4===a.length)return a;}}function p(e){var t=e.layout,i=void 0===t?"constrained":t,r=e.width,o=e.height,s=e.sourceMetadata,l=e.breakpoints,d=e.aspectRatio,u=e.formats,c=void 0===u?["auto","webp"]:u;return c=c.map(function(e){return e.toLowerCase();}),i=a(i),r&&o?n({},e,{formats:c,layout:i,aspectRatio:r/o}):(s.width&&s.height&&!d&&(d=s.width/s.height),"fullWidth"===i?(r=r||s.width||l[l.length-1],o=o||Math.round(r/(d||1.3333333333333333))):(r||(r=o&&d?o*d:s.width?s.width:o?Math.round(o/1.3333333333333333):800),d&&!o?o=Math.round(r/d):d||(d=r/o)),n({},e,{width:r,height:o,aspectRatio:d,layout:i,formats:c}));}function m(e,t){var a;return void 0===t&&(t=20),null==(a=(0,(e=p(e)).generateImageSource)(e.filename,t,Math.round(t/e.aspectRatio),e.sourceMetadata.format||"jpg",e.fit,e.options))?void 0:a.src;}function f(e){var t,a=(e=p(e)).pluginName,i=e.sourceMetadata,r=e.generateImageSource,o=e.layout,d=e.fit,c=e.options,m=e.width,f=e.height,b=e.filename,E=e.reporter,k=void 0===E?{warn:u}:E,M=e.backgroundColor,S=e.placeholderURL;if(a||k.warn('[gatsby-plugin-image] "generateImageData" was not passed a plugin name'),"function"!=typeof r)throw new Error("generateImageSource must be a function");i&&(i.width||i.height)?i.format||(i.format=g(b)):i={width:m,height:f,format:(null==(t=i)?void 0:t.format)||g(b)||"auto"};var N=new Set(e.formats);(0===N.size||N.has("auto")||N.has(""))&&(N.delete("auto"),N.delete(""),N.add(i.format)),N.has("jpg")&&N.has("png")&&(k.warn("["+a+"] Specifying both 'jpg' and 'png' formats is not supported. Using 'auto' instead"),N.delete("jpg"===i.format?"png":"jpg"));var x=function(e){var t=e.filename,a=e.layout,i=void 0===a?"constrained":a,r=e.sourceMetadata,o=e.reporter,d=void 0===o?{warn:u}:o,c=e.breakpoints,h=void 0===c?l:c,g=Object.entries({width:e.width,height:e.height}).filter(function(e){var t=e[1];return"number"==typeof t&&t<1;});if(g.length)throw new Error("Specified dimensions for images must be positive numbers (> 0). Problem dimensions you have are "+g.map(function(e){return e.join(": ");}).join(", "));return"fixed"===i?function(e){var t=e.filename,a=e.sourceMetadata,i=e.width,r=e.height,n=e.fit,o=void 0===n?"cover":n,l=e.outputPixelDensities,d=e.reporter,c=void 0===d?{warn:u}:d,h=a.width/a.height,g=v(void 0===l?s:l);if(i&&r){var p=y(a,{width:i,height:r,fit:o});i=p.width,r=p.height,h=p.aspectRatio;}i?r||(r=Math.round(i/h)):i=r?Math.round(r*h):800;var m=i;if(a.width<i||a.height<r){var f=a.width<i?"width":"height";c.warn("\nThe requested "+f+' "'+("width"===f?i:r)+'px" for the image '+t+" was larger than the actual image "+f+" of "+a[f]+"px. If possible, replace the current image with a larger one."),"width"===f?(i=a.width,r=Math.round(i/h)):i=(r=a.height)*h;}return{sizes:g.filter(function(e){return e>=1;}).map(function(e){return Math.round(e*i);}).filter(function(e){return e<=a.width;}),aspectRatio:h,presentationWidth:m,presentationHeight:Math.round(m/h),unscaledWidth:i};}(e):"constrained"===i?w(e):"fullWidth"===i?w(n({breakpoints:h},e)):(d.warn("No valid layout was provided for the image at "+t+". Valid image layouts are fixed, fullWidth, and constrained. Found "+i),{sizes:[r.width],presentationWidth:r.width,presentationHeight:r.height,aspectRatio:r.width/r.height,unscaledWidth:r.width});}(n({},e,{sourceMetadata:i})),I={sources:[]},W=e.sizes;W||(W=function(e,t){switch(t){case"constrained":return"(min-width: "+e+"px) "+e+"px, 100vw";case"fixed":return e+"px";case"fullWidth":return"100vw";default:return;}}(x.presentationWidth,o)),N.forEach(function(e){var t=x.sizes.map(function(t){var i=r(b,t,Math.round(t/x.aspectRatio),e,d,c);if(null!=i&&i.width&&i.height&&i.src&&i.format)return i;k.warn("["+a+"] The resolver for image "+b+" returned an invalid value.");}).filter(Boolean);if("jpg"===e||"png"===e||"auto"===e){var i=t.find(function(e){return e.width===x.unscaledWidth;})||t[0];i&&(I.fallback={src:i.src,srcSet:h(t),sizes:W});}else{var n;null==(n=I.sources)||n.push({srcSet:h(t),sizes:W,type:"image/"+e});}});var R={images:I,layout:o,backgroundColor:M};switch(S&&(R.placeholder={fallback:S}),o){case"fixed":R.width=x.presentationWidth,R.height=x.presentationHeight;break;case"fullWidth":R.width=1,R.height=1/x.aspectRatio;break;case"constrained":R.width=e.width||x.presentationWidth||1,R.height=(R.width||1)/x.aspectRatio;}return R;}var v=function(e){return Array.from(new Set([1].concat(e))).sort(c);};function w(e){var t,a=e.sourceMetadata,i=e.width,r=e.height,n=e.fit,o=void 0===n?"cover":n,l=e.outputPixelDensities,d=e.breakpoints,u=e.layout,h=a.width/a.height,g=v(void 0===l?s:l);if(i&&r){var p=y(a,{width:i,height:r,fit:o});i=p.width,r=p.height,h=p.aspectRatio;}i=i&&Math.min(i,a.width),r=r&&Math.min(r,a.height),i||r||(r=(i=Math.min(800,a.width))/h),i||(i=r*h);var m=i;return(a.width<i||a.height<r)&&(i=a.width,r=a.height),i=Math.round(i),(null==d?void 0:d.length)>0?(t=d.filter(function(e){return e<=a.width;})).length<d.length&&!t.includes(a.width)&&t.push(a.width):t=(t=g.map(function(e){return Math.round(e*i);})).filter(function(e){return e<=a.width;}),"constrained"!==u||t.includes(i)||t.push(i),{sizes:t=t.sort(c),aspectRatio:h,presentationWidth:m,presentationHeight:Math.round(m/h),unscaledWidth:i};}function y(e,t){var a=e.width/e.height,i=t.width,r=t.height;switch(t.fit){case"fill":i=t.width?t.width:e.width,r=t.height?t.height:e.height;break;case"inside":var n=t.width?t.width:Number.MAX_SAFE_INTEGER,o=t.height?t.height:Number.MAX_SAFE_INTEGER;i=Math.min(n,Math.round(o*a)),r=Math.min(o,Math.round(n/a));break;case"outside":var s=t.width?t.width:0,l=t.height?t.height:0;i=Math.max(s,Math.round(l*a)),r=Math.max(l,Math.round(s/a));break;default:t.width&&!t.height&&(i=t.width,r=Math.round(t.width/a)),t.height&&!t.width&&(i=Math.round(t.height*a),r=t.height);}return{width:i,height:r,aspectRatio:i/r};}var b=(/* unused pure expression or super */ null && (["baseUrl","urlBuilder","sourceWidth","sourceHeight","pluginName","formats","breakpoints","options"])),E=(/* unused pure expression or super */ null && (["images","placeholder"]));function k(){return true&&true;}var M=function(e){var t;return function(e){var t,a;return Boolean(null==e||null==(t=e.images)||null==(a=t.fallback)?void 0:a.src);}(e)?e:function(e){return Boolean(null==e?void 0:e.gatsbyImageData);}(e)?e.gatsbyImageData:function(e){return Boolean(null==e?void 0:e.gatsbyImage);}(e)?e.gatsbyImage:null==e||null==(t=e.childImageSharp)?void 0:t.gatsbyImageData;},S=function(e){var t,a,i;return null==(t=M(e))||null==(a=t.images)||null==(i=a.fallback)?void 0:i.src;},N=function(e){var t,a,i;return null==(t=M(e))||null==(a=t.images)||null==(i=a.fallback)?void 0:i.srcSet;};function x(e){var t,a=e.baseUrl,i=e.urlBuilder,r=e.sourceWidth,s=e.sourceHeight,l=e.pluginName,u=void 0===l?"getImageData":l,c=e.formats,h=void 0===c?["auto"]:c,g=e.breakpoints,p=e.options,m=o(e,b);return null!=(t=g)&&t.length||"fullWidth"!==m.layout&&"FULL_WIDTH"!==m.layout||(g=d),f(n({},m,{pluginName:u,generateImageSource:function(e,t,a,r){return{width:t,height:a,format:r,src:i({baseUrl:e,width:t,height:a,options:p,format:r})};},filename:a,formats:h,breakpoints:g,sourceMetadata:{width:r,height:s,format:"auto"}}));}function I(e,t){var a,i,r,s=e.images,l=e.placeholder,d=n({},o(e,E),{images:n({},s,{sources:[]}),placeholder:l&&n({},l,{sources:[]})});return t.forEach(function(t){var a,i=t.media,r=t.image;i?(r.layout!==e.layout&&"development"==="production"&&0,(a=d.images.sources).push.apply(a,r.images.sources.map(function(e){return n({},e,{media:i});}).concat([{media:i,srcSet:r.images.fallback.srcSet}])),d.placeholder&&d.placeholder.sources.push({media:i,srcSet:r.placeholder.fallback})): false&&0;}),(a=d.images.sources).push.apply(a,s.sources),null!=l&&l.sources&&(null==(i=d.placeholder)||(r=i.sources).push.apply(r,l.sources)),d;}var W,R=["src","srcSet","loading","alt","shouldLoad"],j=["fallback","sources","shouldLoad"],_=function(t){var a=t.src,i=t.srcSet,r=t.loading,s=t.alt,l=void 0===s?"":s,d=t.shouldLoad,u=o(t,R);return/*#__PURE__*/external_C_Users_patri_Documents_webpage_blog_node_modules_react_index_js_default().createElement("img",n({},u,{decoding:"async",loading:r,src:d?a:void 0,"data-src":d?void 0:a,srcSet:d?i:void 0,"data-srcset":d?void 0:i,alt:l}));},A=function(t){var a=t.fallback,i=t.sources,r=void 0===i?[]:i,s=t.shouldLoad,l=void 0===s||s,d=o(t,j),u=d.sizes||(null==a?void 0:a.sizes),c=/*#__PURE__*/external_C_Users_patri_Documents_webpage_blog_node_modules_react_index_js_default().createElement(_,n({},d,a,{sizes:u,shouldLoad:l}));return r.length?/*#__PURE__*/external_C_Users_patri_Documents_webpage_blog_node_modules_react_index_js_default().createElement("picture",null,r.map(function(t){var a=t.media,i=t.srcSet,r=t.type;return/*#__PURE__*/external_C_Users_patri_Documents_webpage_blog_node_modules_react_index_js_default().createElement("source",{key:a+"-"+r+"-"+i,type:r,media:a,srcSet:l?i:void 0,"data-srcset":l?void 0:i,sizes:u});}),c):c;};_.propTypes={src:prop_types.string.isRequired,alt:prop_types.string.isRequired,sizes:prop_types.string,srcSet:prop_types.string,shouldLoad:prop_types.bool},A.displayName="Picture",A.propTypes={alt:prop_types.string.isRequired,shouldLoad:prop_types.bool,fallback:prop_types.exact({src:prop_types.string.isRequired,srcSet:prop_types.string,sizes:prop_types.string}),sources:prop_types.arrayOf(prop_types.oneOfType([prop_types.exact({media:prop_types.string.isRequired,type:prop_types.string,sizes:prop_types.string,srcSet:prop_types.string.isRequired}),prop_types.exact({media:prop_types.string,type:prop_types.string.isRequired,sizes:prop_types.string,srcSet:prop_types.string.isRequired})]))};var T=["fallback"],O=function(t){var a=t.fallback,i=o(t,T);return a?/*#__PURE__*/external_C_Users_patri_Documents_webpage_blog_node_modules_react_index_js_default().createElement(A,n({},i,{fallback:{src:a},"aria-hidden":!0,alt:""})):/*#__PURE__*/external_C_Users_patri_Documents_webpage_blog_node_modules_react_index_js_default().createElement("div",n({},i));};O.displayName="Placeholder",O.propTypes={fallback:prop_types.string,sources:null==(W=A.propTypes)?void 0:W.sources,alt:function(e,t,a){return e[t]?new Error("Invalid prop `"+t+"` supplied to `"+a+"`. Validation failed."):null;}};var z=function(t){return/*#__PURE__*/external_C_Users_patri_Documents_webpage_blog_node_modules_react_index_js_default().createElement((external_C_Users_patri_Documents_webpage_blog_node_modules_react_index_js_default()).Fragment,null,/*#__PURE__*/external_C_Users_patri_Documents_webpage_blog_node_modules_react_index_js_default().createElement(A,n({},t)),/*#__PURE__*/external_C_Users_patri_Documents_webpage_blog_node_modules_react_index_js_default().createElement("noscript",null,/*#__PURE__*/external_C_Users_patri_Documents_webpage_blog_node_modules_react_index_js_default().createElement(A,n({},t,{shouldLoad:!0}))));};z.displayName="MainImage",z.propTypes=A.propTypes;var L=["children"],q=function(){return/*#__PURE__*/external_C_Users_patri_Documents_webpage_blog_node_modules_react_index_js_default().createElement("script",{type:"module",dangerouslySetInnerHTML:{__html:'const t="undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype;if(t){const t=document.querySelectorAll("img[data-main-image]");for(let e of t){e.dataset.src&&(e.setAttribute("src",e.dataset.src),e.removeAttribute("data-src")),e.dataset.srcset&&(e.setAttribute("srcset",e.dataset.srcset),e.removeAttribute("data-srcset"));const t=e.parentNode.querySelectorAll("source[data-srcset]");for(let e of t)e.setAttribute("srcset",e.dataset.srcset),e.removeAttribute("data-srcset");e.complete&&(e.style.opacity=1,e.parentNode.parentNode.querySelector("[data-placeholder-image]").style.opacity=0)}}'}});},C=function(t){var a=t.layout,i=t.width,r=t.height;return"fullWidth"===a?/*#__PURE__*/external_C_Users_patri_Documents_webpage_blog_node_modules_react_index_js_default().createElement("div",{"aria-hidden":!0,style:{paddingTop:r/i*100+"%"}}):"constrained"===a?/*#__PURE__*/external_C_Users_patri_Documents_webpage_blog_node_modules_react_index_js_default().createElement("div",{style:{maxWidth:i,display:"block"}},/*#__PURE__*/external_C_Users_patri_Documents_webpage_blog_node_modules_react_index_js_default().createElement("img",{alt:"",role:"presentation","aria-hidden":"true",src:"data:image/svg+xml;charset=utf-8,%3Csvg height='"+r+"' width='"+i+"' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E",style:{maxWidth:"100%",display:"block",position:"static"}})):null;},D=function(a){var i=a.children,r=o(a,L);return/*#__PURE__*/external_C_Users_patri_Documents_webpage_blog_node_modules_react_index_js_default().createElement(external_C_Users_patri_Documents_webpage_blog_node_modules_react_index_js_.Fragment,null,/*#__PURE__*/external_C_Users_patri_Documents_webpage_blog_node_modules_react_index_js_default().createElement(C,n({},r)),i,/*#__PURE__*/external_C_Users_patri_Documents_webpage_blog_node_modules_react_index_js_default().createElement(q,null));},P=["as","className","class","style","image","loading","imgClassName","imgStyle","backgroundColor","objectFit","objectPosition"],H=["style","className"],F=function(e){return e.replace(/\n/g,"");},B=function(t){var a=t.as,i=void 0===a?"div":a,r=t.className,s=t.class,l=t.style,d=t.image,u=t.loading,c=void 0===u?"lazy":u,h=t.imgClassName,g=t.imgStyle,p=t.backgroundColor,m=t.objectFit,f=t.objectPosition,v=o(t,P);if(!d)return console.warn("[gatsby-plugin-image] Missing image prop"),null;s&&(r=s),g=n({objectFit:m,objectPosition:f,backgroundColor:p},g);var w=d.width,y=d.height,b=d.layout,E=d.images,M=d.placeholder,S=d.backgroundColor,N=function(e,t,a){var i={},r="gatsby-image-wrapper";return k()||(i.position="relative",i.overflow="hidden"),"fixed"===a?(i.width=e,i.height=t):"constrained"===a&&(k()||(i.display="inline-block",i.verticalAlign="top"),r="gatsby-image-wrapper gatsby-image-wrapper-constrained"),{className:r,"data-gatsby-image-wrapper":"",style:i};}(w,y,b),x=N.style,I=N.className,W=o(N,H),R={fallback:void 0,sources:[]};return E.fallback&&(R.fallback=n({},E.fallback,{srcSet:E.fallback.srcSet?F(E.fallback.srcSet):void 0})),E.sources&&(R.sources=E.sources.map(function(e){return n({},e,{srcSet:F(e.srcSet)});})),/*#__PURE__*/external_C_Users_patri_Documents_webpage_blog_node_modules_react_index_js_default().createElement(i,n({},W,{style:n({},x,l,{backgroundColor:p}),className:I+(r?" "+r:"")}),/*#__PURE__*/external_C_Users_patri_Documents_webpage_blog_node_modules_react_index_js_default().createElement(D,{layout:b,width:w,height:y},/*#__PURE__*/external_C_Users_patri_Documents_webpage_blog_node_modules_react_index_js_default().createElement(O,n({},function(e,t,a,i,r,o,s,l){var d={};o&&(d.backgroundColor=o,"fixed"===a?(d.width=i,d.height=r,d.backgroundColor=o,d.position="relative"):("constrained"===a||"fullWidth"===a)&&(d.position="absolute",d.top=0,d.left=0,d.bottom=0,d.right=0)),s&&(d.objectFit=s),l&&(d.objectPosition=l);var u=n({},e,{"aria-hidden":!0,"data-placeholder-image":"",style:n({opacity:1,transition:"opacity 500ms linear"},d)});return k()||(u.style={height:"100%",left:0,position:"absolute",top:0,width:"100%"}),u;}(M,0,b,w,y,S,m,f))),/*#__PURE__*/external_C_Users_patri_Documents_webpage_blog_node_modules_react_index_js_default().createElement(z,n({"data-gatsby-image-ssr":"",className:h},v,function(e,t,a,i,r){return void 0===r&&(r={}),k()||(r=n({height:"100%",left:0,position:"absolute",top:0,transform:"translateZ(0)",transition:"opacity 250ms linear",width:"100%",willChange:"opacity"},r)),n({},a,{loading:i,shouldLoad:e,"data-main-image":"",style:n({},r,{opacity:0})});}("eager"===c,0,R,c,g)))));},G=["src","__imageData","__error","width","height","aspectRatio","tracedSVGOptions","placeholder","formats","quality","transformOptions","jpgOptions","pngOptions","webpOptions","avifOptions","blurredOptions"],V=function(t){return function(a){var i=a.src,r=a.__imageData,s=a.__error,l=o(a,G);return s&&console.warn(s),r?/*#__PURE__*/external_C_Users_patri_Documents_webpage_blog_node_modules_react_index_js_default().createElement(t,n({image:r},l)):(console.warn("Image not loaded",i),s||"development"!=="production"||0,null);};}(B),U=function(e,t){return"fullWidth"!==e.layout||"width"!==t&&"height"!==t||!e[t]?prop_types_default().number.apply((prop_types_default()),[e,t].concat([].slice.call(arguments,2))):new Error('"'+t+'" '+e[t]+" may not be passed when layout is fullWidth.");},X=new Set(["fixed","fullWidth","constrained"]),Y={src:(prop_types_default()).string.isRequired,alt:function(e,t,a){return e.alt||""===e.alt?prop_types_default().string.apply((prop_types_default()),[e,t,a].concat([].slice.call(arguments,3))):new Error('The "alt" prop is required in '+a+'. If the image is purely presentational then pass an empty string: e.g. alt="". Learn more: https://a11y-style-guide.com/style-guide/section-media.html');},width:U,height:U,sizes:(prop_types_default()).string,layout:function(e){if(void 0!==e.layout&&!X.has(e.layout))return new Error("Invalid value "+e.layout+'" provided for prop "layout". Defaulting to "constrained". Valid values are "fixed", "fullWidth" or "constrained".');}};V.displayName="StaticImage",V.propTypes=Y;
;// CONCATENATED MODULE: ./src/components/bio.js
/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */const Bio=()=>{var _data$site$siteMetada,_data$site$siteMetada2;const data=(0,gatsby_browser_entry.useStaticQuery)("3257411868");// Set these values by editing "siteMetadata" in gatsby-config.js
const author=(_data$site$siteMetada=data.site.siteMetadata)===null||_data$site$siteMetada===void 0?void 0:_data$site$siteMetada.author;const social=(_data$site$siteMetada2=data.site.siteMetadata)===null||_data$site$siteMetada2===void 0?void 0:_data$site$siteMetada2.social;return/*#__PURE__*/external_C_Users_patri_Documents_webpage_blog_node_modules_react_index_js_.createElement("div",{className:"bio"},/*#__PURE__*/external_C_Users_patri_Documents_webpage_blog_node_modules_react_index_js_.createElement(V,{className:"bio-avatar",layout:"fixed",formats:["auto","webp","avif"],src:"../images/profile-pic.png",width:50,height:50,quality:95,alt:"Profile picture",__imageData:__webpack_require__(1550)}),(author===null||author===void 0?void 0:author.name)&&/*#__PURE__*/external_C_Users_patri_Documents_webpage_blog_node_modules_react_index_js_.createElement("p",null,"Written by ",/*#__PURE__*/external_C_Users_patri_Documents_webpage_blog_node_modules_react_index_js_.createElement("strong",null,author.name)," ",(author===null||author===void 0?void 0:author.summary)||null,` `,/*#__PURE__*/external_C_Users_patri_Documents_webpage_blog_node_modules_react_index_js_.createElement("a",{href:`https://twitter.com/${(social===null||social===void 0?void 0:social.twitter)||``}`},"You should follow them on Twitter")));};/* harmony default export */ const bio = (Bio);

/***/ }),

/***/ 8678:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(342);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7533);
const Layout=({location,title,children})=>{const rootPath=`${""}/`;const isRootPath=location.pathname===rootPath;let header;if(isRootPath){header=/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h1",{className:"main-heading"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link,{to:"/"},title));}else{header=/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link,{className:"header-link-home",to:"/"},title);}return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"global-wrapper","data-is-root-path":isRootPath},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("header",{className:"global-header"},header),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("main",null,children),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("footer",null,"\xA9 ",new Date().getFullYear(),", Built with",` `,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("a",{href:"https://www.gatsbyjs.com"},"Gatsby")));};/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Layout);

/***/ }),

/***/ 9357:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(342);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5697);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4593);
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7533);
/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */const Seo=({description,lang,meta,title})=>{var _site$siteMetadata,_site$siteMetadata2,_site$siteMetadata2$s;const{site}=(0,gatsby__WEBPACK_IMPORTED_MODULE_2__.useStaticQuery)("2841359383");const metaDescription=description||site.siteMetadata.description;const defaultTitle=(_site$siteMetadata=site.siteMetadata)===null||_site$siteMetadata===void 0?void 0:_site$siteMetadata.title;return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_helmet__WEBPACK_IMPORTED_MODULE_1__.Helmet,{htmlAttributes:{lang},title:title,titleTemplate:defaultTitle?`%s | ${defaultTitle}`:null,meta:[{name:`description`,content:metaDescription},{property:`og:title`,content:title},{property:`og:description`,content:metaDescription},{property:`og:type`,content:`website`},{name:`twitter:card`,content:`summary`},{name:`twitter:creator`,content:((_site$siteMetadata2=site.siteMetadata)===null||_site$siteMetadata2===void 0?void 0:(_site$siteMetadata2$s=_site$siteMetadata2.social)===null||_site$siteMetadata2$s===void 0?void 0:_site$siteMetadata2$s.twitter)||``},{name:`twitter:title`,content:title},{name:`twitter:description`,content:metaDescription}].concat(meta)});};Seo.defaultProps={lang:`en`,meta:[],description:``};Seo.propTypes={description:(prop_types__WEBPACK_IMPORTED_MODULE_3___default().string),lang:(prop_types__WEBPACK_IMPORTED_MODULE_3___default().string),meta:prop_types__WEBPACK_IMPORTED_MODULE_3___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_3___default().object)),title:(prop_types__WEBPACK_IMPORTED_MODULE_3___default().string.isRequired)};/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Seo);

/***/ }),

/***/ 6558:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(342);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7533);
/* harmony import */ var _components_bio__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9359);
/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8678);
/* harmony import */ var _components_seo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9357);
const BlogIndex=({data,location})=>{var _data$site$siteMetada;const siteTitle=((_data$site$siteMetada=data.site.siteMetadata)===null||_data$site$siteMetada===void 0?void 0:_data$site$siteMetada.title)||`Title`;const posts=data.allMarkdownRemark.nodes;if(posts.length===0){return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_layout__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z,{location:location,title:siteTitle},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_seo__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z,{title:"All posts"}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_bio__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z,null),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p",null,"No blog posts found. Add markdown posts to \"content/blog\" (or the directory you specified for the \"gatsby-source-filesystem\" plugin in gatsby-config.js)."));}return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_layout__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z,{location:location,title:siteTitle},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_seo__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z,{title:"All posts"}),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_bio__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z,null),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("ol",{style:{listStyle:`none`}},posts.map(post=>{const title=post.frontmatter.title||post.fields.slug;return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("li",{key:post.fields.slug},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("article",{className:"post-list-item",itemScope:true,itemType:"http://schema.org/Article"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("header",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link,{to:post.fields.slug,itemProp:"url"},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span",{itemProp:"headline"},title))),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("small",null,post.frontmatter.date)),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("section",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p",{dangerouslySetInnerHTML:{__html:post.frontmatter.description||post.excerpt},itemProp:"description"}))));})));};/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BlogIndex);const pageQuery="2239478271";

/***/ }),

/***/ 1550:
/***/ ((module) => {

module.exports = JSON.parse('{"layout":"fixed","backgroundColor":"#f8f8f8","images":{"fallback":{"src":"/static/6dacf7b2c4db85249eda1745ffb570ed/e5610/profile-pic.png","srcSet":"/static/6dacf7b2c4db85249eda1745ffb570ed/e5610/profile-pic.png 50w,\\n/static/6dacf7b2c4db85249eda1745ffb570ed/e9b55/profile-pic.png 100w","sizes":"50px"},"sources":[{"srcSet":"/static/6dacf7b2c4db85249eda1745ffb570ed/d4bf4/profile-pic.avif 50w,\\n/static/6dacf7b2c4db85249eda1745ffb570ed/ee81f/profile-pic.avif 100w","type":"image/avif","sizes":"50px"},{"srcSet":"/static/6dacf7b2c4db85249eda1745ffb570ed/3faea/profile-pic.webp 50w,\\n/static/6dacf7b2c4db85249eda1745ffb570ed/6a679/profile-pic.webp 100w","type":"image/webp","sizes":"50px"}]},"width":50,"height":50}');

/***/ })

};
;
//# sourceMappingURL=component---src-pages-index-js.js.map