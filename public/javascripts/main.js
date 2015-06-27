/////////////////////////////
////    client side     ////
///////////////////////////
var $container = $('#results');


$(function(){
  	$('#search').on('keyup', function(e){
	  	if(e.keyCode === 13) {
	  		var loader = $('.loader');
	  		loader.css('display', 'block');
	    	var parameters = { search: $(this).val() };
	    	$.get( '/searching',parameters, function(data) {
	    		$('#results > img').remove();
	    		for(var i = 0; i < data.length; i++) {
				    var obj = data[i];
				    var src = obj.data.url
				    if(src.indexOf('.png') > 0 || src.indexOf('.jpg') > 0){
				    	var images = $('<img class="item"/>').attr('src', src);
				    	$container.append(images).imagesLoaded(function(){
						  	$container.masonry({
						    	itemSelector: '.item'
						 	 }).masonry( 'reloadItems');

						});
				    }   
				}
				loader.fadeOut('fast');
	    	});
  		};
  	});

});