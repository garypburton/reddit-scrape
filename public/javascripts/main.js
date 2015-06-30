/////////////////////////////
////    client side     ////
///////////////////////////
var source = $("#search-results").html();
var dataTemplate = Handlebars.compile(source);
var $container = $('#results');
var $grid;


$(function(){
  	$('#search').on('keyup', function(e){
	  	if(e.keyCode === 13) {
	  		var loader = $('.loader');
	  		loader.css('display', 'block');
	    	var parameters = { search: $(this).val() };
	    	$.get( '/searching',parameters, function(data) {
	    		$('#results > h2').remove();
	    		if($grid){
	    			$grid.masonry('destroy');
	    			$('#results > img').remove();
	    		}
	    		// if (data.indexOf("Error") > -1){
	    		// 	var error = $('<h2></h2>').html(data[0]);
	    		// 	$container.append(error);
	    		// 	loader.fadeOut('slow');
	    		// }else{
	    			$container.html(dataTemplate({resultsArray:data}));
					// init Masonry
					$grid = $container.masonry({
					  	// options...
					  	itemSelector: '.item'
					});
					// layout Masonry after each image loads
					$grid.imagesLoaded(function() {
					  	$grid.masonry('layout');
					});
					$grid.masonry( 'on', 'layoutComplete', function( laidOutItems ) {
						console.log('done'+laidOutItems.length);
						loader.fadeOut('slow');
					})
	    		//}
	    	});
  		};
  	});

});

