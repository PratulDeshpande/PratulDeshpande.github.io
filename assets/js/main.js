/*
	Solid State by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$banner = $('#banner');

	// Handle video autoplay on mobile
document.addEventListener('DOMContentLoaded', function() {
    var video = document.getElementById('bg-video');
    try {
        video.play().catch(function(error) {
            // Autoplay was prevented, show fallback
            //document.getElementById('video-background').style.backgroundImage = 'url(images/bg.jpg)';
            //video.style.display = 'none';
        });
    } catch(e) {
        // Fallback if video fails entirely
        //document.getElementById('video-background').style.backgroundImage = 'url(images/bg.jpg)';
        //video.style.display = 'none';
    }
});


document.addEventListener('DOMContentLoaded', function() {
    var video = document.getElementById('bg-video');
    
    // Required for iOS
    video.playsInline = true;
    video.muted = true;
    video.setAttribute('muted', '');
    
    // Try to play video (required for some mobile browsers)
    var playPromise = video.play();
    
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            // Auto-play was prevented
            // Show play button or fallback silently
            console.log('Auto-play prevented:', error);
            
            // Attempt to play on user interaction
            function tryPlay() {
                video.play()
                    .then(() => {
                        // Success! Remove listeners
                        document.removeEventListener('click', tryPlay);
                        document.removeEventListener('touchstart', tryPlay);
                    })
                    .catch(e => {
                        console.log('Still cannot play:', e);
                    });
            }
            
            // Try to play on any user interaction
            document.addEventListener('click', tryPlay);
            document.addEventListener('touchstart', tryPlay);
        });
    }
    
    // Fix for iOS - reload video when page becomes visible
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            video.play().catch(e => console.log('Visibility change play failed:', e));
        }
    });
    
    // Fix for some Android devices
    window.addEventListener('load', function() {
        video.play().catch(e => console.log('Window load play failed:', e));
    });
});

	// Breakpoints.
		breakpoints({
			xlarge:	'(max-width: 1680px)',
			large:	'(max-width: 1280px)',
			medium:	'(max-width: 980px)',
			small:	'(max-width: 736px)',
			xsmall:	'(max-width: 480px)'
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$window.on('resize', function() { $window.trigger('scroll'); });

			$banner.scrollex({
				bottom:		$header.outerHeight(),
				terminate:	function() { $header.removeClass('alt'); },
				enter:		function() { $header.addClass('alt'); },
				leave:		function() { $header.removeClass('alt'); }
			});

		}

	// Menu.
		var $menu = $('#menu');

		$menu._locked = false;

		$menu._lock = function() {

			if ($menu._locked)
				return false;

			$menu._locked = true;

			window.setTimeout(function() {
				$menu._locked = false;
			}, 350);

			return true;

		};

		$menu._show = function() {

			if ($menu._lock())
				$body.addClass('is-menu-visible');

		};

		$menu._hide = function() {

			if ($menu._lock())
				$body.removeClass('is-menu-visible');

		};

		$menu._toggle = function() {

			if ($menu._lock())
				$body.toggleClass('is-menu-visible');

		};

		$menu
			.appendTo($body)
			.on('click', function(event) {

				event.stopPropagation();

				// Hide.
					$menu._hide();

			})
			.find('.inner')
				.on('click', '.close', function(event) {

					event.preventDefault();
					event.stopPropagation();
					event.stopImmediatePropagation();

					// Hide.
						$menu._hide();

				})
				.on('click', function(event) {
					event.stopPropagation();
				})
				.on('click', 'a', function(event) {

					var href = $(this).attr('href');

					event.preventDefault();
					event.stopPropagation();

					// Hide.
						$menu._hide();

					// Redirect.
						window.setTimeout(function() {
							window.location.href = href;
						}, 350);

				});

		$body
			.on('click', 'a[href="#menu"]', function(event) {

				event.stopPropagation();
				event.preventDefault();

				// Toggle.
					$menu._toggle();

			})
			.on('keydown', function(event) {

				// Hide on escape.
					if (event.keyCode == 27)
						$menu._hide();

			});

})(jQuery);
