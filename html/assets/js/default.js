$(document).ready(function(){
	//window.setInterval(function(){random_position('.cover', '.triangles_effect');random_position('.cover', '.circles_effect');}, 5000);

	$('#carousel-seja').owlCarousel({
		autoplay: false,
		margin: 15,
		smartSpeed: 1200,
		//autoplayTimeout:100,
		loop: false,
		//autoWidth: true,
		nav: false,
		navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
		responsive: {
			0: {
				items: 1
			},
	
			768: {
				items: 2
			},
			1000: {
				items: 3
			},
			1220: {
				items: 3
			}
		}
	})


	$('[data-toggle="popover"]').popover({
		trigger: 'focus'
	});
	$('a[data-toggle="popover"]').click(function(event){
		event.preventDefault();
	});

	$('.nav-link-menu').click(function(event){
		event.preventDefault();
		$('body').toggleClass('overflow-hidden');
		$('.menu-screen').toggleClass('opened').css('top', $(window).scrollTop());
		$(this).toggleClass('opened');
		if($(this).hasClass('opened')){
			window.setTimeout(function(){
				$('.navbar').toggleClass('navbar-fixed');	
			}, 450);
		}else{
			$('.navbar').toggleClass('navbar-fixed');	
		}
	});

	$('.block-content-page-content-carousel').each(function(){
		var owlcarousel_selector = $(this).find('.owl-carousel');
		var owlcarousel = owlcarousel_selector.owlCarousel({
			// autoWidth: true,
			dots: false,
			nav: false,
			items: 1
		});
		$(this).find('.owl-carousel-buttons-next').unbind('click').click(function(event){
			event.preventDefault();
			owlcarousel.trigger('next.owl.carousel');
		});
		$(this).find('.owl-carousel-buttons-prev').unbind('click').click(function(){
			event.preventDefault();
			owlcarousel.trigger('prev.owl.carousel');
		});
	});

	$('.property-alert-label button').click(function(event){
		event.preventDefault();
		$('.modal').unbind('hidden.bs.modal').on('hidden.bs.modal', function(e){
			var tour = introJs();
			tour.setOptions({
				doneLabel: 'Entendi',
				showStepNumbers: false,
				showBullets: false,
				steps: [{
					element: document.querySelector('.block-content-page-search-item aside'),
					intro: "Altere os filtros e caso não encontre o que quer, peça ajuda ao Caxias novamente.",
					position: 'right'
				}],
				tooltipPosition: 'auto'
			});
			$('.modal').unbind('hidden.bs.modal');
			tour.start();
		});
	});

	var col_maps_fixed_height = $(window).height();
	$(window).scroll(function(){
		var max_scroll_y = $(document).height()-$(window).height();
		if($('.col-maps-fixed').length > 0){
			if($(this).scrollTop() >= max_scroll_y-$('footer').height()){
				$('.col-maps-fixed').css('top', '0px');
				$('.col-maps-fixed').height(col_maps_fixed_height-$('footer').height()-30);
			}else if($(this).scrollTop() > 20){
				$('.col-maps-fixed').css('top', '0px');
				$('.col-maps-fixed').height(col_maps_fixed_height);
			}else{
				$('.col-maps-fixed').css('top', '98px');
				$('.col-maps-fixed').height(col_maps_fixed_height-100);
			}
		}
	});
	$(window).trigger('scroll');

	$('.page-cover .owl-carousel').owlCarousel({
		// autoWidth: true,
		dots: false,
		nav: false,
		items: 3,
		margin: 10
	});

	var bigimage = $(".property-gallery");
	var thumbs = $(".property-gallery-thumbs");
	//var totalslides = 10;
	var syncedSecondary = true;

	bigimage.owlCarousel({
		items: 1,
		slideSpeed: 2000,
		nav: false,
		// autoplay: true,
		dots: false,
		loop: true,
		responsiveRefreshRate: 200,
		navText: [
			'<i class="fa fa-arrow-left" aria-hidden="true"></i>',
			'<i class="fa fa-arrow-right" aria-hidden="true"></i>'
		]
	}).on("changed.owl.carousel", syncPosition);

	thumbs.on("initialized.owl.carousel", function () {
		thumbs.find(".owl-item").eq(0).addClass("current");
	}).owlCarousel({
		items: 4,
		dots: true,
		nav: false,
		margin: 5,
		navText: [
			'<i class="fa fa-arrow-left" aria-hidden="true"></i>',
			'<i class="fa fa-arrow-right" aria-hidden="true"></i>'
		],
		smartSpeed: 200,
		slideSpeed: 500,
		slideBy: 4,
		responsiveRefreshRate: 100
	}).on("changed.owl.carousel", syncPosition2);
		
	thumbs.on("click", ".owl-item", function (e) {
		e.preventDefault();
		var number = $(this).index();
		bigimage.data("owl.carousel").to(number, 300, true);
	});

	function syncPosition(el) {
		//if loop is set to false, then you have to uncomment the next line
		//var current = el.item.index;
	
		//to disable loop, comment this block
		var count = el.item.count - 1;
		var current = Math.round(el.item.index - el.item.count / 2 - 0.5);
	
		if (current < 0) {
			current = count;
		}
		if (current > count) {
			current = 0;
		}
		//to this
		thumbs
			.find(".owl-item")
			.removeClass("current")
			.eq(current)
			.addClass("current");
		var onscreen = thumbs.find(".owl-item.active").length - 1;
		var start = thumbs
			.find(".owl-item.active")
			.first()
			.index();
		var end = thumbs
			.find(".owl-item.active")
			.last()
			.index();
	
		if (current > end) {
			thumbs.data("owl.carousel").to(current, 100, true);
		}
		if (current < start) {
			thumbs.data("owl.carousel").to(current - onscreen, 100, true);
		}
	}
	
	function syncPosition2(el) {
		if (syncedSecondary) {
			var number = el.item.index;
			bigimage.data("owl.carousel").to(number, 100, true);
		}
	}
	
	$('.block-content-gallery').each(function(){
		var owlcarousel_selector = $(this).find('.owl-carousel');
		var owlcarousel = owlcarousel_selector.owlCarousel({
			// autoWidth: true,
			dots: false,
			nav: false,
			items: 1
		});
		$(this).find('.owl-carousel-buttons-next').unbind('click').click(function(event){
			event.preventDefault();
			owlcarousel.trigger('next.owl.carousel');
		});
		$(this).find('.owl-carousel-buttons-prev').unbind('click').click(function(){
			event.preventDefault();
			owlcarousel.trigger('prev.owl.carousel');
		});
	});
	
	$('.block-content-units').each(function(){
		var owlcarousel_selector = $(this).find('.owl-carousel');
		var owlcarousel = owlcarousel_selector.owlCarousel({
			// autoWidth: true,
			dots: false,
			nav: false,
			items: 3,
			margin: 20
		});
	});

	$('.step-by-step').each(function(){
		var widget = $(this);
		var count_steps = widget.find('.step-item').length;
		var current_step_div = widget.find('.step-item.active');

		widget.find('[data-next]').unbind('click').click(function(event){
			event.preventDefault();
			current_step_div = widget.find('.step-item.active');
			var index = widget.find('.step-item').index(widget.find('.step-item.active'));
			if(index < count_steps-1){
				if(step_valid(current_step_div)){
					widget.find('.step-item').removeClass('active');
					widget.find('.step-item:eq('+(index+1)+')').addClass('active');
				}
			}else{
				console.log(step_valid(current_step_div));
				if(step_valid(current_step_div)){
					console.log(widget.find('form'));
					widget.submit();
				}
			}
		});
	});
});

function step_valid(step){
	step.find('select[required], input[required], textarea[required]').each(function(){
		if($(this).val() == ''){
			return false;
		}
	});
	return true;
}

var map;
var markers = [];
function initialize() {
	map = new google.maps.Map(document.querySelector('.col-maps'), {
		center: {lat: -34.397, lng: 150.644},
		zoom: 8,
		mapTypeControl: false,
		streetViewControl: false
	});
	$('.col-maps-fixed').width($('.col-maps-width').width()+15);
	$('.col-maps-fixed').height($(window).height()-$('header').height());

	get_properties();
}

function get_properties(){
	$.get('properties.json', {}, function(json){
		if(typeof json && json.data.length > 0){
			var bounds = new google.maps.LatLngBounds();
			$.each(json.data, function(i, value){
				var marker = new google.maps.Marker({code: value.control_id, position: {lat: value.latitude, lng: value.longitude}, map: map});
				bounds.extend({lat: value.latitude, lng: value.longitude});
				marker.addListener('mouseover', function() {
					if($('.block-properties-item[data-property-code="'+value.control_id+'"]').length > 0){
						$('html, body').stop().animate({scrollTop: $('.block-properties-item[data-property-code="'+value.control_id+'"]').offset().top}, 500, 'swing', function(){});
					}
					$('.block-properties-item').addClass('disabled');
					$('.block-properties-item[data-property-code="'+value.control_id+'"]').removeClass('disabled');
				});
				marker.addListener('mouseout', function() {
					$('.block-properties-item').removeClass('disabled');
				});

				markers.push(marker);
			});
			map.fitBounds(bounds);

			var markerCluster = new MarkerClusterer(map, markers, {imagePath: 'assets/plugins/markerclusterer/m'});
			var position = -1;
			$('.block-properties-item').hover(function(){
				var code = $(this).attr('data-property-code');
				
				$.each(markers, function(i, value){
					if(value.code == code){
						position = i;
						return;
					}
				});

				if(typeof markers[position] != 'undefined'){
					markers[position].setAnimation(null);
					markers[position].setAnimation(google.maps.Animation.BOUNCE);
					map.setCenter(markers[position].position);
				}	

				$('.block-properties-item').addClass('disabled');
				$('.block-properties-item[data-property-code="'+code+'"]').removeClass('disabled');
			}, function(){
				$.each(markers, function(i, value){
					markers[i].setAnimation(null);
				});
				position = -1;
				$('.block-properties-item').removeClass('disabled');
				map.fitBounds(bounds);
			});
		}
	}, 'json');
}

function random_position(parent, items){
	$(items).each(function(i, value){
		var itemsitem = $(this);
		var posx = 0;
		if(typeof itemsitem.attr('data-x') != 'undefined'){
			posx = itemsitem.attr('data-x');
		}else{
			//posx = (Math.random()*($(parent).width()-($(itemsitem).width()*(i+1)))).toFixed();
			posx = (Math.random()*($(parent).width()-$(itemsitem).width())).toFixed();
		}
		var posy = 0;
		if(typeof itemsitem.attr('data-y') != 'undefined'){
			posy = itemsitem.attr('data-y');
		}else{
			//posy = (Math.random()*($(parent).height()-($(itemsitem).height()*(i+1)))).toFixed();
			posy = (Math.random()*($(parent).height()-$(itemsitem).height())).toFixed();
		}
		// var posx = (Math.random()*($(parent).width()-$(itemsitem).width())).toFixed();
		// var posy = (Math.random()*($(parent).height()-$(itemsitem).height())).toFixed();
		var top = true;
		var left = false;

		
		console.log(Math.random()*($(parent).width()-$(itemsitem).height()));
		if(top){
			$(itemsitem).css({'top': posy+'px'});
			top = false;
		}else{
			$(itemsitem).css({'bottom': posy+'px'});
			top = true;
		}

		if(left){
			$(itemsitem).css({'left': posx+'px'});
			left = false;
		}else{
			$(itemsitem).css({'right': posx+'px'});
			left = true;
		}
	});
}