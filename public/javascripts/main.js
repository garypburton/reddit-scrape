/////////////////////////////
////    client side     ////
///////////////////////////
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
	    		if (typeof data == "string"){
	    			var error = $('<h2></h2>').html(data);
	    			$container.append(error);
	    			loader.fadeOut('slow');
	    		}else{
	    			for(var i = 0; i < data.length; i++) {
					    var obj = data[i];
					    var src = obj.data.url
					    if(src.indexOf('.png') > 0 || src.indexOf('.jpg') > 0 || src.indexOf('.gif') > 0 && src.indexOf('.gifv') <= 0){
					    	var images = $('<img class="item"/>').attr('src', src);
					    	$container.append(images);
					    }   
					}
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
	    		}
	    	});
  		};
  	});

});