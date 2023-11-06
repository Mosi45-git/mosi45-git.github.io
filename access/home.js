//控制台输出版权
console.log("\n %c 轻量个人博客 %c \n开发者：陌斯\n", "color: #fadfa3; background: #030307; padding:5px 0;", "color:black;background: #fadfa3; padding:5px 0;");

//网站的基础全局变量
let page_state = "no";//网页信息加载状态
let page_http_get_configs;//网站网页基础信息
let page_http_toparticle_configs;//网页置顶文章信息
let page_http_article_configs;//网页文章内容信息
let page_http_articlelist_configs;//网页列表信息
var page_articlelist_num;//网页首页页码
var page_article_id;//文章页ID或查询页查询内容
let site_start_time = "2023/11/7";//网站首日运作日期(年/月/日)


//设置底部安全运行时长
function siteRun(d) {
	var nowD = new Date();
	return parseInt((nowD.getTime() - Date.parse(d)) / 24 / 60 / 60 / 1000)
}
//判断网页底部安全运行时长展示是否存在
if(document.getElementById("iday")!=null){
	//展示网站安全运行时长
	document.getElementById("iday").innerHTML = siteRun(site_start_time);
}
//获取查询参数
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return undefined;
}
//PC端搜索框函数
function com_search(s=$("#search_text").val()){
	if(s==""||s==undefined){
		alert("搜索内容不得为空");
		return 0;
	}
	openNewWindow("./search.html?search="+s);
}
//移动端搜索框函数
function com_m_search(s=$("#ls").val()){
	if(s==""||s==undefined){
		alert("搜索内容不得为空");
		return 0;
	}
	openNewWindow("./search.html?search="+s);
}

//网站信息加载事件
function page_onload(){
	//加载网站信息
	$("title").text(page_http_get_configs['title']+" - "+page_http_get_configs['titles']);
	$('meta[name="description"]')[0].content=page_http_get_configs['description'];
	$('meta[name="keywords"]')[0].content=page_http_get_configs['description'];
	$('meta[property="og:title"]')[0].content=page_http_get_configs['title']+" - "+page_http_get_configs['titles'];
	$('meta[property="og:site_name"]')[0].content=page_http_get_configs['title']+" - "+page_http_get_configs['titles'];
	$('meta[property="og:description"]')[0].content=page_http_get_configs['description'];
	$("#logo_title").attr("title",page_http_get_configs['title']);
	$("#logo_title").attr("href",page_http_get_configs['logo_onclick_url']);
	$("#logo_titles").text(page_http_get_configs['title']);
	$("#web_title_end").text(page_http_get_configs['title']);
	//加载菜单导航
	let site_menu_web_html='<ul id="nav" class="nav-pills navbar">';
	for(let site_menu_web_key in page_http_get_configs['menu']) {
		if(page_http_get_configs['menu'][site_menu_web_key]!='<ul id="nav" class="nav-pills navbar">'&&site_menu_web_key!="备注")site_menu_web_html = site_menu_web_html+'<li class="navbar-item "><a href="'+page_http_get_configs['menu'][site_menu_web_key]+'" title=""><i class="icon font-home"></i>'+site_menu_web_key+'</a></li>';
	}if(site_menu_web_html!='<ul id="nav" class="nav-pills navbar">')$("#site-menu-web").html(site_menu_web_html+"</ul>");
	//加载页脚超链
	let site_footer_web_html;
	for(let site_footer_web_key in page_http_get_configs['footer']) {
		if(site_footer_web_html==undefined)site_footer_web_html="";if(page_http_get_configs['footer'][site_footer_web_key]!=undefined&&site_footer_web_key!="备注")site_footer_web_html = site_footer_web_html+'<a href="'+page_http_get_configs['footer'][site_footer_web_key]+'"><i class="icon font-home"></i>'+site_footer_web_key+'</a>';
	}if(site_footer_web_html!=undefined)$("#footer").html(site_footer_web_html+"</ul>");
	//隐藏加载页
	$("#load_page").hide();
	//展示网页内容
	$("#load_pages").css("display","block");
}

//网页逻辑首处理（网页信息拉取）
function page_start(){
	//网站首页
	if(location.pathname=="/"||location.pathname=="/index.html"){
		page_articlelist_num = Number(GetQueryString("page"));
		if (page_articlelist_num == undefined || page_articlelist_num <= 0 || Number.isInteger(page_articlelist_num) ==
			false) {
			page_articlelist_num = 1;
		}
		const page_http_get_config = new XMLHttpRequest();
		const page_http_get_config_url = './config/config';
		page_http_get_config.open("GET", page_http_get_config_url);
		page_http_get_config.send();
		page_http_get_config.onreadystatechange = (e) => {
			page_http_get_configs = JSON.parse(page_http_get_config.responseText);
		}
		const page_http_toparticle_config = new XMLHttpRequest();
		const page_http_toparticle_config_url = './config/article_topping';
		page_http_toparticle_config.open("GET", page_http_toparticle_config_url);
		page_http_toparticle_config.send();
		page_http_toparticle_config.onreadystatechange = (e) => {
			page_http_toparticle_configs = JSON.parse(page_http_toparticle_config.responseText);
		}
		const page_http_articlelist_config = new XMLHttpRequest();
		const page_http_articlelist_config_url = './config/article_list/' + page_articlelist_num.toString();
		page_http_articlelist_config.open("GET", page_http_articlelist_config_url);
		page_http_articlelist_config.send();
		page_http_articlelist_config.onreadystatechange = (e) => {
			page_http_articlelist_configs = JSON.parse(page_http_articlelist_config.responseText);
		}
		//使用计时器判断请求加载是否完成
		var index_interval = setInterval(async function(){
			//判断请求加载完成的必要条件是否齐全
			if( page_http_articlelist_config.readyState == 4&& page_http_toparticle_config.readyState == 4 && page_http_get_config.readyState == 4 ){
				//检查api返回是否正常
				if (page_http_articlelist_config.readyState == 4 && page_http_articlelist_configs == undefined) {
					alert("数据异常，可能是网络不稳定，也可能是错误的页码" + page_articlelist_num.toString());
					location.href = "./index.html";
				}
				if (page_http_toparticle_config.readyState == 4 && page_http_toparticle_configs == undefined) {
					alert("数据异常，可能是网络不稳定，即将重新加载");
					location.reload();
				}
				if (page_http_get_config.readyState == 4 && page_http_get_configs == undefined) {
					alert("数据异常，可能是网络不稳定，即将重新加载");
					location.reload();
				}
				//网页信息加载完成
				page_state = "ok";
				//注销计时器
				clearInterval(index_interval);
			}
		},100);
	}
	//文章页
	if(location.pathname=="/page.html"){
		page_article_id = GetQueryString("page");
		if(page_article_id==undefined){alert("文章不存在");location.href="./index.html";}
		const page_http_get_config = new XMLHttpRequest();
		const page_http_get_config_url = './config/config';
		page_http_get_config.open("GET", page_http_get_config_url);
		page_http_get_config.send();
		page_http_get_config.onreadystatechange = (e) => {
			page_http_get_configs = JSON.parse(page_http_get_config.responseText);
		}
		const page_http_article_config = new XMLHttpRequest();
		const page_http_article_config_url = './config/article/'+page_article_id;
		page_http_article_config.open("GET", page_http_article_config_url);
		page_http_article_config.send();
		page_http_article_config.onreadystatechange = (e) => {
			page_http_article_configs = JSON.parse(page_http_article_config.responseText);
		}
		//使用计时器判断请求加载是否完成
		var page_interval = setInterval(async function(){
			//判断请求加载完成的必要条件是否齐全
			if( page_http_article_config.readyState == 4 && page_http_get_config.readyState == 4 ){
				//检查api返回是否正常
				if(page_http_article_config.readyState==4&&page_http_article_configs==undefined){
					alert("数据异常，可能是网络不稳定，即将重新加载");
					location.reload();
				}
				if(page_http_get_config.readyState==4&&page_http_get_configs==undefined){
					alert("数据异常，可能是网络不稳定，即将重新加载");
					location.reload();
				}
				//网页信息加载完成
				page_state = "ok";
				//注销计时器
				clearInterval(page_interval);
			}
		},100);
	}
	//搜索页
	if(location.pathname=="/search.html"){
		page_article_id = GetQueryString("search");
		if(page_article_id==undefined||page_article_id==""){location.href="./index.html";}
		const page_http_get_config = new XMLHttpRequest();
		const page_http_get_config_url = './config/config';
		page_http_get_config.open("GET", page_http_get_config_url);
		page_http_get_config.send();
		page_http_get_config.onreadystatechange = (e) => {
			page_http_get_configs = JSON.parse(page_http_get_config.responseText);
		}
		//使用计时器判断请求加载是否完成
		var search_interval = setInterval(async function(){
			//检查api返回是否正常
			if(page_http_get_config.readyState==4&&page_http_get_configs==undefined){
				alert("数据异常，可能是网络不稳定，即将重新加载");
				location.reload();
			}
			//判断请求加载完成的必要条件是否齐全
			if( page_http_get_config.readyState == 4 ){
				//网页信息加载完成
				page_state = "ok";
				//注销计时器
				clearInterval(search_interval);
			}
		},100);
	}
}

//网页逻辑尾处理（网页正文渲染）
function page_end(){
	//网站首页
	if(location.pathname=="/"||location.pathname=="/index.html"){
		//引用base64
		page_base64 = new Base64();
		//加载置顶文章列表
		let site_toparticle_web_html;
		for (let site_toparticle_web_key in page_http_toparticle_configs) {
			if (site_toparticle_web_html == undefined) site_toparticle_web_html = "";
			if (page_http_toparticle_configs[site_toparticle_web_key] != undefined && site_toparticle_web_key != "备注") {
				site_toparticle_web_html = site_toparticle_web_html + '\
					<article class="post-list leftpic wow fadeInDown" onclick="openNewWindow(\'./page.html?page=' +
					site_toparticle_web_key + '\');">\
						<div class="post-pic">\
							<a class="post-cat post-top"	target="_blank">置顶</a>\
							<a class="post-link">\
								<img class="lazy" src="' + ((page_http_toparticle_configs[site_toparticle_web_key]["image"]) ? page_base64
						.decode(page_http_toparticle_configs[site_toparticle_web_key]["image"]) : "./access/images/00.jpg"
						) + '"> </a>\
						</div>\
						<div class="post-info">\
							<h2><a>' + ((page_base64.decode(page_http_toparticle_configs[site_toparticle_web_key]["flag"]) == "true") ?
						'<span class="recommend-flag">推荐</span>' : '') + ((page_http_toparticle_configs[
						site_toparticle_web_key]["title"]) ? page_base64.decode(page_http_toparticle_configs[
						site_toparticle_web_key]["title"]) : "此文章无标题") + '</a></h2>\
							<div class="info-desc">' + ((page_http_toparticle_configs[site_toparticle_web_key]["body"]) ? page_base64
						.decode(page_http_toparticle_configs[site_toparticle_web_key]["body"]) : "此文章无简介") + '</div>\
						</div>\
					</article>\
					';
			}
		}
		if (site_toparticle_web_html != undefined) $("#page_article_topping").html(site_toparticle_web_html);
		//加载文章列表
		let site_articlelist_web_html;
		for (let site_articlelist_web_key in page_http_articlelist_configs) {
			if (site_articlelist_web_html == undefined) site_articlelist_web_html = "";
			if (page_http_articlelist_configs[site_articlelist_web_key] != undefined && site_articlelist_web_key != "备注") {
				site_articlelist_web_html = site_articlelist_web_html + '\
					<article class="post-list leftpic wow fadeInDown" onclick="openNewWindow(\'./page.html?page=' +
					site_articlelist_web_key + '\');">\
						<div class="post-pic">\
							<a class="post-cat"	target="_blank">' + ((page_http_articlelist_configs[site_articlelist_web_key]["type"]) ?
						page_base64.decode(page_http_articlelist_configs[site_articlelist_web_key]["type"]) : '未分类') + '</a>\
							<a class="post-link">\
								<img class="lazy" src="' + ((page_http_articlelist_configs[site_articlelist_web_key]["image"]) ? page_base64
						.decode(page_http_articlelist_configs[site_articlelist_web_key]["image"]) : './access/images/00.jpg'
						) + '"> </a>\
						</div>\
						<div class="post-info">\
							<h2><a>' + ((page_base64.decode(page_http_articlelist_configs[site_articlelist_web_key]["flag"]) == "true") ?
						'<span class="recommend-flag">推荐</span>' : '') + ((page_http_articlelist_configs[
						site_articlelist_web_key]["title"]) ? page_base64.decode(page_http_articlelist_configs[
						site_articlelist_web_key]["title"]) : "此文章无标题") + '</a></h2>\
							<div class="info-desc">' + ((page_http_articlelist_configs[site_articlelist_web_key]["body"]) ? page_base64
						.decode(page_http_articlelist_configs[site_articlelist_web_key]["body"]) : "此文章无简介") + '</div>\
						</div>\
					</article>\
					';
			}
		}
		if (site_articlelist_web_html != undefined){
			$("#page_article").html(site_articlelist_web_html);
		}
		//加载文章列表页码数
		let pagelist_number = '<ul>';
		var pagelist_i;
		for (pagelist_i = 1; pagelist_i <= pagelist_numbers; pagelist_i++) {
			if (page_articlelist_num == pagelist_i) {
				pagelist_number = pagelist_number + '<ul><li class="active"><span>' + pagelist_i + '</span></li>';
			} else {
				pagelist_number = pagelist_number + '<ul><li><a href="?page=' + pagelist_i + '">' + pagelist_i +
				'</a></li>';
			}
		}
		if (pagelist_number != '<ul>'){
			$("#page_num_list").html(pagelist_number + "<li><span>共 " + pagelist_numbers +
			" 页</span></li></ul>");
		}
	}
	//文章页
	if(location.pathname=="/page.html"){
		var page_type="article";
		var page_title=page_http_article_configs["title"];
		var page_body=page_http_article_configs["body"];
		//引用base64
		page_base64 = new Base64();
		//加载文章标题
		$("#page_title").text(page_base64.decode(page_title));
		//加载文章内容
		$("#page_body").html(page_base64.decode(page_body));
	}
	//搜索页
	if(location.pathname=="/search.html"){
		var page_type="article";
		//引用base64
		page_base64 = new Base64();
		//加载网页
		$("title").text("搜索‘"+page_article_id+"’-"+page_http_get_configs['title']+"-"+page_http_get_configs['titles']);
		//渲染搜索词
		$("#search_texts").text(page_article_id);
	}
}

//使用计时器判断网站信息加载是否完成
var home_interval = setInterval(async function(){
	//判断网站信息加载完成的必要条件是否齐全
	if(page_state=="ok"){
		//渲染网页
		page_onload();
		//渲染正文
		page_end();
		//渲染网页类型
		if(typeof page_type==undefined){$('meta[property="og:type"]')[0].content=page_type;}else{$('meta[property="og:type"]')[0].content=page_http_get_configs['type'];}
		//注销计时器
		clearInterval(home_interval);
	}
},100);

//网页逻辑程序运作
page_start();

