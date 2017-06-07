$(document).ready(function() {
	
	var app = {
		startingWords: ["pizza", "fried+chicken", "steak", "beer", "whiskey", "burrito", "taco", "grilling", "bbq"],

		initialize: function(){
			for (var i=0;i<this.startingWords.length;i++){
				this.createBtn(this.startingWords[i]);
			}
		},
		
		userButton: function(){
			var searchTerm=$("#searchVal").val();
			this.createBtn(searchTerm);
		},
		
		createBtn: function(word){
			var queryURL = "http://api.giphy.com/v1/gifs/search?q="+word+"&api_key=dc6zaTOxFJmzC&limit=10";
			$("#btn-target").append("<button class='btn js-getImages' data-url='"+queryURL+"'>"+word+"</button>");
			$(".js-getImages").on("click",function(){
				app.getImages($(this).attr("data-url"));
			});
		},

		imageClickResponse: function(object){
			if($(object).attr("data-static")===$(object).attr("src")){
				$(object).attr("src", $(object).attr("data-active"));
			}
			else{
				$(object).attr("src", $(object).attr("data-static"));
			}
		},

		getImages: function(url){
			var queryURL = url;
			$.ajax({
				url: queryURL,
				method: "GET"
			}).done(function(data) {
				
				$("#image-target").html("");
				for (var i=0; i<10;i++){
					var staticImageURL=data.data[i].images.fixed_height_still.url;
					var activeImageURL=data.data[i].images.fixed_height.url;
					
					//create new object for image and its rating
					var newImageDiv = $("<div>");
					newImageDiv.addClass("col-md-4");
					
					//load url information onto new image object
					var newImage = $("<img>");
					newImage.addClass("js-image");
					newImage.attr("src", staticImageURL);
					newImage.attr("data-static", staticImageURL);
					newImage.attr("data-active", activeImageURL);
					
					//load rating information onto rating label
					var rating = $("<div>");
					rating.text("rating: "+ data.data[i].rating);

					newImageDiv.append(newImage);
					newImageDiv.append(rating);
					//add the new object to the html page
					$("#image-target").append(newImageDiv);

				}
				$(".js-image").on("click",function(){
					app.imageClickResponse(this);
				});
			});
		}
	};
	
	app.initialize();
	
	$("#newBtn").on("click",function(){
		app.userButton();
	});


	

});