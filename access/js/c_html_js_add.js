document.writeln(
	"<script src='./access/js/prism.js' type='text/javascript'><\/script><link rel='stylesheet' type='text/css' href='./access/css/prism.css'/>"
	);
$(function() {
	var compatibility = {
		as3: "actionscript",
		"c#": "csharp",
		delphi: "pascal",
		html: "markup",
		xml: "markup",
		vb: "basic",
		js: "javascript",
		plain: "markdown",
		pl: "perl",
		ps: "powershell"
	};
	var runFunction = function(doms, callback) {
		doms.each(function(index, unwrappedDom) {
			var dom = $(unwrappedDom);
			var codeDom = $("<code>");
			if (callback) callback(dom);
			var languageClass = "prism-language-" + function(classObject) {
				if (classObject === null) return "markdown";
				var className = classObject[1];
				return compatibility[className] ? compatibility[className] : className
			}(dom.attr("class").match(/prism-language-([0-9a-zA-Z]+)/));
			codeDom.html(dom.html()).addClass("prism-line-numbers").addClass(languageClass);
			dom.html("").addClass(languageClass).append(codeDom)
		})
	};
	runFunction($("pre.prism-highlight"));
	runFunction($('pre[class*="brush:"]'), function(preDom) {
		var original;
		if ((original = preDom.attr("class").match(/brush:([a-zA-Z0-9\#]+);/)) !== null) {
			preDom.get(0).className = "prism-highlight prism-language-" + original[1]
		}
	});
	Prism.highlightAll()
});
function openNewWindow(strUrl="/"){
	let a = document.createElement("a");
	document.body.appendChild(a);
	a.style = "display: none";
	a.target = "_blank";
	a.href = strUrl;
	a.click();
	document.body.removeChild(a);
}
