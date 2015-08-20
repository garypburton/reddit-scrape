/////////////////////////////
////    client side     ////
///////////////////////////
var source = $("#search-results").html();
var dataTemplate = Handlebars.compile(source);
var $container = $('#results');
var $grid;
var masonryActive;


$(function(){
  	$('#search').on('keyup', function(e){
	  	if(e.keyCode === 13) {
	  		var loader = $('.loader');
	  		loader.css('display', 'block');
	    	var parameters = { search: $(this).val() };
	    	
    		if($('#results > h2').length > 0 && masonryActive == false){
    			$('#results > h2').remove();
				console.log(masonryActive);
    		}
    		if(masonryActive == true){
    			console.log(masonryActive);
    			$('#results > img').remove();
    			$grid.masonry('destroy');
    			masonryActive = false;
    			console.log(masonryActive);
    		}
	    	$.get( '/searching',parameters, function(data) {
	    		if (data.length > 0){
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
					masonryActive = true;
					console.log(masonryActive);
	    		}else{
					var error = $('<h2></h2>').html('No results found');
	    			$container.append(error);
	    			loader.fadeOut('slow');
	    			masonryActive = false;
	    			console.log(masonryActive);
	    		}
	    	});
  		};
  	});

});

