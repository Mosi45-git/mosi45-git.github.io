document.writeln(
	"<script src='./access/prism.js' type='text/javascript'><\/script><link rel='stylesheet' type='text/css' href='./access/prism.css'/>"
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