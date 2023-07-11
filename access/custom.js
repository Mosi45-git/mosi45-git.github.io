
/* 归档 */
(function($, window) {
	$(function() {
		var $a = $('#cundang'),
			$m = $('.al_mon_list.item h3', $a),
			$l = $('.al_post_list', $a),
			$l_f = $('.al_post_list:first,.al_mon_list.item:nth-child(2) ul.al_post_list', $a);
		$l.hide();
		$l_f.show();
		$m.css('cursor', 'pointer').on('click', function() {
			$(this).next().slideToggle(0);
		});
		var animate = function(index, status, s) {
			if (index > $l.length) {
				return;
			}
			if (status == 'up') {
				$l.eq(index).slideUp(s, function() {
					animate(index + 1, status, (s - 10 < 1) ? 0 : s - 10);
				});
			} else {
				$l.eq(index).slideDown(s, function() {
					animate(index + 1, status, (s - 10 < 1) ? 0 : s - 10);
				});
			}
		};
		$('#al_expand_collapse').on('click', function(e) {
			e.preventDefault();
			if ($(this).data('s')) {
				$(this).data('s', '');
				animate(0, 'up', 300);
			} else {
				$(this).data('s', 1);
				animate(0, 'down', 300);
			}
		});
	});
})(jQuery, window);
//UBB
function addNumber(a) {
	document.getElementById("txaArticle").value += a
}
if ($('#comment-tools,.msgarticle,.comment-content').length) {
	objActive = "txaArticle";

	function InsertText(a, b, c) {
		if (b == "") {
			return ("")
		}
		var d = document.getElementById(a);
		if (document.selection) {
			if (d.currPos) {
				if (c && (d.value == "")) {
					d.currPos.text = b
				} else {
					d.currPos.text += b
				}
			} else {
				d.value += b
			}
		} else {
			if (c) {
				d.value = d.value.slice(0, d.selectionStart) + b + d.value.slice(d.selectionEnd, d.value.length)
			} else {
				d.value = d.value.slice(0, d.selectionStart) + b + d.value.slice(d.selectionStart, d.value.length)
			}
		}
	}

	function ReplaceText(a, b, c) {
		var d = document.getElementById(a);
		var e;
		if (document.selection && document.selection.type == "Text") {
			if (d.currPos) {
				var f = document.selection.createRange();
				f.text = b + f.text + c;
				return ("")
			} else {
				e = b + c;
				return (e)
			}
		} else {
			if (d.selectionStart || d.selectionEnd) {
				e = b + d.value.slice(d.selectionStart, d.selectionEnd) + c;
				return (e)
			} else {
				e = b + c;
				return (e)
			}
		}
	}
}
//if($('#ComtoolsFrame').length){$(this).bind("click",function(a){if(a&&a.stopPropagation){a.stopPropagation()}else{a.cancelBubble=true}})}
if ($('.face-show').length) {
	$("a.face-show").click(function() {
		$(".ComtoolsFrame").slideToggle(15)
	})
}
//listree
function autotree() {
	$(document).ready(function() {
		var c = 1,
			b = $("#listree-ol");
		$("#listree-bodys").find("h1, h2, h3,h4,h5,h6").each(function(a) {
			if ("" !== $(this).text().trim()) {
				$(this).attr("id", "listree-list" + a).attr("class", "listree-list");
				var d = parseInt($(this)[0].tagName.slice(1));
				0 === a || d === c ? (a = $('<li><a id="listree-click" href="#listree-list' + a + '">' +
					$(this).text() + "</a></li>"), b.append(a)) : d > c ? (a = $(
					'<ul><li><a id="listree-click" href="#listree-list' + a + '">' + $(this)
					.text() + "</a></li></ul>"), b.append(a), b = a) : d < c && (a = $(
					'<li><a id="listree-click" href="#listree-list' + a + '">' + $(this)
				.text() + "</a></li>"), 1 === d ? ($("#listree-ol").append(a), b = $(
					"#listree-ol")) : (b.parent("ol").append(a), b = b.parent("ol")));
				c = d
			}
		});
		$(".listree-btn").click(function() {
			"\u76ee\u5f55[+]" == $(".listree-btn").text() ? $(".listree-btn").attr("title",
					"\u6536\u8d77").text("\u76ee\u5f55[-]").parent().next().show() : $(".listree-btn")
				.attr("title", "\u5c55\u5f00").text("\u76ee\u5f55[+]").parent().next().hide();
			return !1
		});
		$("a#listree-click").click(function(a) {
			a.preventDefault();
			$("html, body").animate({
				scrollTop: $($(this).attr("href")).offset().top - 15
			}, 800)
		});
		1 < c && $(".listree-box").css("display", "block")
	})
}
autotree();
jQuery(document).ready(function($) {
	var p = $('.listree-list');
	if (p.length < 1) return;
	var arr = [];

	function part_offset_top() {
		p.each(function() {
			var of = $(this).offset();
			arr.push(Math.floor(of.top))
		})
	}

	function goto_current(index) {
		var a = $('#listree-ol li');
		var b = $('.listree-list');
		if (a.length < 1) return;
		var h = a.outerHeight();
		if (!a.eq(index).hasClass('current')) {
			a.removeClass('current');
			a.eq(index).addClass('current');
			b.animate({
				'top': h * index + (a.outerHeight() - b.outerHeight()) / 2 + 1
			}, 50)
		}
	}

	function window_scroll() {
		var st = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
		var limit = Math.ceil(st + 20);
		var index = 0;
		for (var i = 0; i < arr.length; i++) {
			if (limit >= arr[i]) {
				index = i
			} else {
				break
			}
		}
		if (index < 0) index = 0;
		if (!p.eq(index).hasClass('current')) {
			p.removeClass('current');
			p.eq(index).addClass('current');
			goto_current(index)
		}
	}
	part_offset_top();
	setTimeout(window_scroll, 0);
	$(window).on('scroll', window_scroll)
});
//sidebar
(function($) {
	$.fn.theiaStickySidebar = function(options) {
		var defaults = {
			'containerSelector': '',
			'additionalMarginTop': 0,
			'additionalMarginBottom': 0,
			'updateSidebarHeight': true,
			'minWidth': 0,
			'disableOnResponsiveLayouts': true,
			'sidebarBehavior': 'modern'
		};
		options = $.extend(defaults, options);
		options.additionalMarginTop = parseInt(options.additionalMarginTop) || 0;
		options.additionalMarginBottom = parseInt(options.additionalMarginBottom) || 0;
		tryInitOrHookIntoEvents(options, this);

		function tryInitOrHookIntoEvents(options, $that) {
			var success = tryInit(options, $that);
			if (!success) {
				console.log('TST: Body width smaller than options.minWidth. Init is delayed.');
				$(document).scroll(function(options, $that) {
					return function(evt) {
						var success = tryInit(options, $that);
						if (success) {
							$(this).unbind(evt)
						}
					}
				}(options, $that));
				$(window).resize(function(options, $that) {
					return function(evt) {
						var success = tryInit(options, $that);
						if (success) {
							$(this).unbind(evt)
						}
					}
				}(options, $that))
			}
		}

		function tryInit(options, $that) {
			if (options.initialized === true) {
				return true
			}
			if ($('body').width() < options.minWidth) {
				return false
			}
			init(options, $that);
			return true
		}

		function init(options, $that) {
			options.initialized = true;
			$('head').append($(
				'<style>.theiaStickySidebar:after {content: ""; display: table; clear: both;}</style>'));
			$that.each(function() {
				var o = {};
				o.sidebar = $(this);
				o.options = options || {};
				o.container = $(o.options.containerSelector);
				if (o.container.length == 0) {
					o.container = o.sidebar.parent()
				}
				o.sidebar.parents().css('-webkit-transform', 'none');
				o.sidebar.css({
					'position': 'relative',
					'overflow': 'visible',
					'-webkit-box-sizing': 'border-box',
					'-moz-box-sizing': 'border-box',
					'box-sizing': 'border-box'
				});
				o.stickySidebar = o.sidebar.find('.theiaStickySidebar');
				if (o.stickySidebar.length == 0) {
					var javaScriptMIMETypes = /(?:text|application)\/(?:x-)?(?:javascript|ecmascript)/i;
					o.sidebar.find('script').filter(function(index, script) {
						return script.type.length === 0 || script.type.match(
							javaScriptMIMETypes)
					}).remove();
					o.stickySidebar = $('<div>').addClass('theiaStickySidebar').append(o.sidebar
						.children());
					o.sidebar.append(o.stickySidebar)
				}
				o.marginTop = parseInt(o.sidebar.css('margin-top'));
				o.marginBottom = parseInt(o.sidebar.css('margin-bottom'));
				o.paddingTop = parseInt(o.sidebar.css('padding-top'));
				o.paddingBottom = parseInt(o.sidebar.css('padding-bottom'));
				var collapsedTopHeight = o.stickySidebar.offset().top;
				var collapsedBottomHeight = o.stickySidebar.outerHeight();
				o.stickySidebar.css('padding-top', 0);
				o.stickySidebar.css('padding-bottom', 0);
				collapsedTopHeight -= o.stickySidebar.offset().top;
				collapsedBottomHeight = o.stickySidebar.outerHeight() - collapsedBottomHeight -
					collapsedTopHeight;
				if (collapsedTopHeight == 0) {
					o.stickySidebar.css('padding-top', 0);
					o.stickySidebarPaddingTop = 0
				} else {
					o.stickySidebarPaddingTop = 0
				}
				if (collapsedBottomHeight == 0) {
					o.stickySidebar.css('padding-bottom', 0);
					o.stickySidebarPaddingBottom = 0
				} else {
					o.stickySidebarPaddingBottom = 0
				}
				o.previousScrollTop = null;
				o.fixedScrollTop = 0;
				resetSidebar();
				o.onScroll = function(o) {
					if (!o.stickySidebar.is(":visible")) {
						return
					}
					if ($('body').width() < o.options.minWidth) {
						resetSidebar();
						return
					}
					if (o.options.disableOnResponsiveLayouts) {
						var sidebarWidth = o.sidebar.outerWidth(o.sidebar.css('float') == 'none');
						if (sidebarWidth + 50 > o.container.width()) {
							resetSidebar();
							return
						}
					}
					var scrollTop = $(document).scrollTop();
					var position = 'static';
					if (scrollTop >= o.container.offset().top + (o.paddingTop + o.marginTop - o
							.options.additionalMarginTop)) {
						var offsetTop = o.paddingTop + o.marginTop + options.additionalMarginTop;
						var offsetBottom = o.paddingBottom + o.marginBottom + options
							.additionalMarginBottom;
						var containerTop = o.container.offset().top;
						var containerBottom = o.container.offset().top + getClearedHeight(o
							.container);
						var windowOffsetTop = 0 + options.additionalMarginTop;
						var windowOffsetBottom;
						var sidebarSmallerThanWindow = (o.stickySidebar.outerHeight() + offsetTop +
							offsetBottom) < $(window).height();
						if (sidebarSmallerThanWindow) {
							windowOffsetBottom = windowOffsetTop + o.stickySidebar.outerHeight()
						} else {
							windowOffsetBottom = $(window).height() - o.marginBottom - o
								.paddingBottom - options.additionalMarginBottom
						}
						var staticLimitTop = containerTop - scrollTop + o.paddingTop + o.marginTop;
						var staticLimitBottom = containerBottom - scrollTop - o.paddingBottom - o
							.marginBottom;
						var top = o.stickySidebar.offset().top - scrollTop;
						var scrollTopDiff = o.previousScrollTop - scrollTop;
						if (o.stickySidebar.css('position') == 'fixed') {
							if (o.options.sidebarBehavior == 'modern') {
								top += scrollTopDiff
							}
						}
						if (o.options.sidebarBehavior == 'stick-to-top') {
							top = options.additionalMarginTop
						}
						if (o.options.sidebarBehavior == 'stick-to-bottom') {
							top = windowOffsetBottom - o.stickySidebar.outerHeight()
						}
						if (scrollTopDiff > 0) {
							top = Math.min(top, windowOffsetTop)
						} else {
							top = Math.max(top, windowOffsetBottom - o.stickySidebar.outerHeight())
						}
						top = Math.max(top, staticLimitTop);
						top = Math.min(top, staticLimitBottom - o.stickySidebar.outerHeight());
						var sidebarSameHeightAsContainer = o.container.height() == o.stickySidebar
							.outerHeight();
						if (!sidebarSameHeightAsContainer && top == windowOffsetTop) {
							position = 'fixed'
						} else if (!sidebarSameHeightAsContainer && top == windowOffsetBottom - o
							.stickySidebar.outerHeight()) {
							position = 'fixed'
						} else if (scrollTop + top - o.sidebar.offset().top - o.paddingTop <=
							options.additionalMarginTop) {
							position = 'static'
						} else {
							position = 'absolute'
						}
					}
					if (position == 'fixed') {
						o.stickySidebar.css({
							'position': 'fixed',
							'width': o.sidebar.width(),
							'top': top,
							'left': o.sidebar.offset().left + parseInt(o.sidebar.css(
								'padding-left'))
						})
					} else if (position == 'absolute') {
						var css = {};
						if (o.stickySidebar.css('position') != 'absolute') {
							css.position = 'absolute';
							css.top = scrollTop + top - o.sidebar.offset().top - o
								.stickySidebarPaddingTop - o.stickySidebarPaddingBottom
						}
						css.width = o.sidebar.width();
						css.left = '';
						o.stickySidebar.css(css)
					} else if (position == 'static') {
						resetSidebar()
					}
					if (position != 'static') {
						if (o.options.updateSidebarHeight == true) {
							o.sidebar.css({
								'min-height': o.stickySidebar.outerHeight() + o
									.stickySidebar.offset().top - o.sidebar.offset().top + o
									.paddingBottom
							})
						}
					}
					o.previousScrollTop = scrollTop
				};
				o.onScroll(o);
				$(document).scroll(function(o) {
					return function() {
						o.onScroll(o)
					}
				}(o));
				$(window).resize(function(o) {
					return function() {
						o.stickySidebar.css({
							'position': 'static'
						});
						o.onScroll(o)
					}
				}(o));

				function resetSidebar() {
					o.fixedScrollTop = 0;
					o.sidebar.css({
						'min-height': '0px'
					});
					o.stickySidebar.css({
						'position': 'static',
						'width': ''
					})
				}

				function getClearedHeight(e) {
					var height = e.height();
					e.children().each(function() {
						height = Math.max(height, $(this).height())
					});
					return height
				}
			})
		}
	}
})(jQuery);
$(document).ready(function() {
	$('.slide-wrap .side').theiaStickySidebar({
		additionalMarginTop: 20,
		additionalMarginBottom: 10
	})
});
$("#mo-so,.search_top i.fa").click(function(e) {
	if ($(".mini_search,.top_search").hasClass("open")) {
		$(".top_search").removeClass("open");
		return
	}
	e.stopPropagation();
	$(".mini_search,.top_search").addClass("open");
	$(".top_search input.text,input.searchInput").focus()
});
$(document).click(function(e) {
	var _con = $('.top_search input.text');
	if (!_con.is(e.target) && _con.has(e.target).length === 0) {
		$(".mini_search,.top_search").removeClass("open")
	}
});
//手机导航
jQuery(document).ready(function() {
	$("<span class='toggle-btn'><i class='fa fa-chevron-down'></i></span>").insertBefore(".sub-menu");
	$("#list1,#list2,#list3,.widget:nth-child(1),.widget:nth-child(2)").removeClass("wow");
	$("#list1,#list2,#list3,.widget:nth-child(1),.widget:nth-child(2)").removeClass("fadeInDown");
	var nav = $(".nav-sousuo");
	$(".nav-sjlogo i").click(function() {
		$(".sub-menu").toggleClass("m-sub-menu");
		$(".nav-bar").toggleClass("on");
		$(".mobile_nav").toggleClass("mobile_nav_on")
	});
	jQuery(".mobile-menu .nav-pills > li,.mobile-menu .nav-pills > li ul li").each(function() {
		jQuery(this).children(".mobile-menu .m-sub-menu").not(".active").css('display', 'none');
		jQuery(this).children(".mobile-menu .toggle-btn").bind("click",
			function() {
				$('.mobile-menu .m-sub-menu').addClass('active');
				jQuery(this).children().addClass(function() {
					if (jQuery(this).hasClass("active")) {
						jQuery(this).removeClass("active");
						return ""
					}
					return "active"
				});
				jQuery(this).siblings(".mobile-menu .m-sub-menu").slideToggle()
			})
	})
});
jQuery(document).ready(function($) {
	var datatype = $(".header-nav").attr("data-type");
	$("#backTop").hide();
	$('#monavber li').hover(function() {
			$(this).addClass('on')
		},
		function() {
			$(this).removeClass('on')
		});
	$(".nav-pills>li ").each(function() {
		try {
			var myid = $(this).attr("id");
			if ("index" == datatype) {
				if (myid == "nvabar-item-index") {
					$("#nvabar-item-index").addClass("active")
				}
			} else if ("category" == datatype) {
				var infoid = $(".header-nav").attr("data-infoid");
				if (infoid != null) {
					var b = infoid.split(' ');
					for (var i = 0; i < b.length; i++) {
						if (myid == "navbar-category-" + b[i]) {
							$("#navbar-category-" + b[i] + "").addClass("active")
						}
					}
				}
			} else if ("article" == datatype) {
				var infoid = $(".header-nav").attr("data-infoid");
				if (infoid != null) {
					var b = infoid.split(' ');
					for (var i = 0; i < b.length; i++) {
						if (myid == "navbar-category-" + b[i]) {
							$("#navbar-category-" + b[i] + "").addClass("active")
						}
					}
				}
			} else if ("page" == datatype) {
				var infoid = $(".header-nav").attr("data-infoid");
				if (infoid != null) {
					if (myid == "navbar-page-" + infoid) {
						$("#navbar-page-" + infoid + "").addClass("active")
					}
				}
			} else if ("tag" == datatype) {
				var infoid = $(".header-nav").attr("data-infoid");
				if (infoid != null) {
					if (myid == "navbar-tag-" + infoid) {
						$("#navbar-tag-" + infoid + "").addClass("active")
					}
				}
			}
		} catch (E) {}
	});
	$(".header-nav").delegate("a", "click",
		function() {
			$(".nav-pills>li").each(function() {
				$(this).removeClass("active")
			});
			if ($(this).closest("ul") != null && $(this).closest("ul").length != 0) {
				if ($(this).closest("ul").attr("id") == "menu-navigation") {
					$(this).addClass("active")
				} else {
					$(this).closest("ul").closest("li").addClass("active")
				}
			}
		})
});
//快捷回复
$(document).keypress(function(e) {
	var s = $('.button');
	if (e.ctrlKey && e.which == 13 || e.which == 10) {
		s.click();
		document.body.focus();
		return
	};
	if (e.shiftKey && e.which == 13 || e.which == 10) s.click();
});
//backtop
$(function() {
	$("#backtop").each(function() {
		$(this).find(".weixin").mouseenter(function() {
			$(this).find(".pic").fadeIn("fast")
		});
		$(this).find(".weixin").mouseleave(function() {
			$(this).find(".pic").fadeOut("fast")
		});
		$(this).find(".phone").mouseenter(function() {
			$(this).find(".phones").fadeIn("fast")
		});
		$(this).find(".phone").mouseleave(function() {
			$(this).find(".phones").fadeOut("fast")
		});
		$(this).find(".top").click(function() {
			$("html, body").animate({
					"scroll-top": 0
				},
				"fast")
		});
		$(".bottom").click(function() {
			$("html, body").animate({
					scrollTop: $(".footer").offset().top
				},
				800);
			return false;
		});
	});
	var lastRmenuStatus = false;
	$(window).scroll(function() {
		var _top = $(window).scrollTop();
		if (_top > 500) {
			$("#backtop").data("expanded", true)
		} else {
			$("#backtop").data("expanded", false)
		}
		if ($("#backtop").data("expanded") != lastRmenuStatus) {
			lastRmenuStatus = $("#backtop").data("expanded");
			if (lastRmenuStatus) {
				$("#backtop .top").slideDown()
			} else {
				$("#backtop .top").slideUp()
			}
		}
	})
});
$(function() {
	var navlee = $("#header");
	var cubuk_seviye = $(document).scrollTop();
	var navlee_top = $(document);
	var header_yuksekligi = $('.fixed-nav').outerHeight();
	$(window).scroll(function() {
		var kaydirma_cubugu = $(document).scrollTop();
		if (navlee_top.scrollTop() >= 66) {
			navlee.addClass("fixed-nav");
			$(".navTmp").fadeIn()
		} else {
			navlee.removeClass("fixed-nav fixed-enabled fixed-appear");
			$(".navTmp").fadeOut()
		}
		if (kaydirma_cubugu > header_yuksekligi) {
			$('.fixed-nav').addClass('fixed-enabled')
		} else {
			$('.fixed-nav').removeClass('fixed-enabled')
		};
		if (kaydirma_cubugu > cubuk_seviye) {
			$('.fixed-nav').removeClass('fixed-appear')
		} else {
			$('.fixed-nav').addClass('fixed-appear')
		};
		cubuk_seviye = $(document).scrollTop()
	});
});
//标签
(function() {
	var sc = $(document);
	var tags_a = $("#divTags ul li,#hottags ul li");
	tags_a.each(function() {
		var x = 10;
		var y = 0;
		var rand = parseInt(Math.random() * (x - y + 1) + y);
		$(this).addClass("divTags" + rand);
	});
})();
function setCookie(cname,cvalue,exdays){
    var d = new Date();
    d.setTime(d.getTime()+(exdays*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
}
function getCookie(cname){
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name)==0) { return c.substring(name.length,c.length); }
    }
    return "";
}
function checkCookie(){
    var user=getCookie("username");
    if (user!=""){
        alert("欢迎 " + user + " 再次访问");
    }
    else {
        user = prompt("请输入你的名字:","");
          if (user!="" && user!=null){
            setCookie("username",user,30);
        }
    }
}
//switchNightMode
function switchNightMode() {
	if (getCookie('night') == '1' || $('body').hasClass('night')) {
		setCookie('night', '0',24);
		$('body').removeClass('night');
		console.log('夜间模式关闭');
	} else {
		setCookie('night', '1',24);
		$('body').addClass('night');
		console.log('夜间模式开启');
	}
};
//视觉差效果
jQuery(window).bind('scroll',
	function() {
		$(window).scroll(function() {
			var scrollTop = $(window).scrollTop();
			var paralasicValue = $('.cat_bg_img').attr('data-paralasic');
			$('.cat_bg_img').css('background-position', '50% -' + scrollTop * paralasicValue + 'px');
		});
	});
/*jQuery(window).bind('scroll',function() {
	$(window).scroll(function() {
        var scrollTop = $(window).scrollTop() / 2;
        $('.cat_bg_img').css("backgroundPositionY",scrollTop - 34);
    });
});*/