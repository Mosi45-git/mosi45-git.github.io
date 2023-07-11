//加载网站信息
$("title").text(page_http_get_configs['title']+" - "+page_http_get_configs['titles']);
$('meta[name="description"]')[0].content=page_http_get_configs['description'];
$('meta[name="keywords"]')[0].content=page_http_get_configs['description'];
$('meta[property="og:type"]')[0].content=page_http_get_configs['type'];
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
}
if(site_menu_web_html!='<ul id="nav" class="nav-pills navbar">')$("#site-menu-web").html(site_menu_web_html+"</ul>");
//搜索功能
function com_search(){
	alert("搜索功能还没写");
}