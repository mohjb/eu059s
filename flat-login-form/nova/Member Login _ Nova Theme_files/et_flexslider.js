(function($){
	var $featured = $('#featured'),
		et_container_width = $('#main-area .container').width(),
		et_slider;

	$(document).ready(function(){
		var et_slider_settings;

		if ( $featured.length ){
			et_slider_settings = {
				slideshow: false,
				start: function(slider) {
					et_slider = slider;

					// fixes 'slider isn't shown on the second load' bug in webkit browsers
					slider.css( 'background', 'none' );
					slider.find( '.container' ).css( 'visibility', 'visible' );
				}
			}

			if ( $featured.find('.flexslider').hasClass('et_slider_auto') ) {
				var et_slider_autospeed_class_value = /et_slider_speed_(\d+)/g;

				et_slider_settings.slideshow = true;

				et_slider_autospeed = et_slider_autospeed_class_value.exec( $featured.find('.flexslider').attr('class') );

				et_slider_settings.slideshowSpeed = et_slider_autospeed[1];
			}

			et_slider_settings.pauseOnHover = $featured.find('.flexslider').hasClass('et_pause_on') ? true : false;

			$featured.flexslider( et_slider_settings );
		}

		$featured.find('iframe').each( function(){
			var src_attr = jQuery(this).attr('src'),
				wmode_character = src_attr.indexOf( '?' ) == -1 ? '?' : '&amp;',
				this_src = src_attr + wmode_character + 'wmode=opaque';
			jQuery(this).attr('src',this_src);
		} );

		et_duplicate_menu( $('#header ul.nav'), $('#header .mobile_nav'), 'main_mobile_menu', 'et_mobile_menu' );

		function et_duplicate_menu( menu, append_to, menu_id, menu_class ){
			var $cloned_nav;

			menu.clone().attr('id',menu_id).removeClass().attr('class',menu_class).appendTo( append_to );
			$cloned_nav = append_to.find('> ul');
			$cloned_nav.find('li:first').addClass('et_first_mobile_item').end().find('a').css('opacity',1);

			append_to.click( function(){
				if ( $(this).hasClass('closed') ){
					$(this).removeClass( 'closed' ).addClass( 'opened' );
					$cloned_nav.slideDown( 500 );
				} else {
					$(this).removeClass( 'opened' ).addClass( 'closed' );
					$cloned_nav.slideUp( 500 );
				}
				return false;
			} );

			append_to.find('a').click( function(event){
				event.stopPropagation();
			} );
		}

		$(window).resize( function(){
			if ( et_container_width != $('#main-area .container').width() ) {
				et_container_width = $('#main-area .container').width();

				if ( ! $featured.is(':visible') ) $featured.flexslider( 'pause' );

				et_center_home_tabs();
			}
		});
	});

	function et_center_home_tabs(){
		var $et_home_tabs = $('ul#main-tabs'),
			maintabswidth = $et_home_tabs.width(),
			container_width = $('#main-area .container').width(),
			maintabsleft = Math.round( ( container_width - maintabswidth ) / 2 );
		if ( maintabswidth < container_width ) $et_home_tabs.css('left',maintabsleft);
	}

	$(window).load(function(){
		et_center_home_tabs();
	});
})(jQuery)