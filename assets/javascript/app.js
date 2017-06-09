$(document).ready(function() {
	
	var app = {
		startingWords: ["pizza", "fried+chicken", "steak", "beer", "whiskey", "burrito", "taco", "burger", "nachos"],

		//this function creates a new button and sets a query URL for that button based on search word
		createBtn: function(word){
			//create url for api call
			var queryURL = "http://api.giphy.com/v1/gifs/search?q="+word+"&api_key=dc6zaTOxFJmzC&limit=10";
			//add button to appropriate div in the html
			$("#btn-target").append("<button class='searchBtn js-getImages' data-url='"+queryURL+"'>"+word+"</button>");
			//set up click event for new button
			$(".js-getImages").on("click",function(){
				app.getImages($(this).attr("data-url"));
			});
		},

		//this function does the api call based on provided url and, clears content, and appends 10 new images to thepage 
		getImages: function(url){
			//ajac call to giphy api
			$.ajax({
				url: url,
				method: "GET"
			}).done(function(data) {
				//clear page content
				$("#image-target").html("");
				//requirements we to grab 10 images
				for (var i=0; i<10;i++){
					//create new object for image and its rating
					var newImageDiv = $("<div>");
					newImageDiv.addClass("gifContainer");
					
					//get both static and active urls so they can be assigned in the data attribute
					var staticImageURL=data.data[i].images.fixed_height_still.url;
					var activeImageURL=data.data[i].images.fixed_height.url;
					//load url information onto new image object
					var newImage = $("<img>");
					newImage.addClass("js-image");
					newImage.addClass("gifImage");
					newImage.attr("src", staticImageURL);
					newImage.attr("data-static", staticImageURL);
					newImage.attr("data-active", activeImageURL);
					
					//load rating information onto rating label
					var rating = $("<div>");
					rating.addClass("ratingText")
					rating.text("rating: "+ data.data[i].rating);

					newImageDiv.append(newImage);
					newImageDiv.append(rating);
					//add the new object to the html page
					$("#image-target").append(newImageDiv);
				}
				//set up click event for new image
				$(".js-image").on("click",function(){
					app.imageClickResponse(this);
				});
			});
		},

		//this function sets the image url with either the static or active url based on if we need to start or stop the gif
		imageClickResponse: function(object){
			//if gif isn't moving, start the gif
			if($(object).attr("data-static")===$(object).attr("src")){
				$(object).attr("src", $(object).attr("data-active"));
			}
			//if gif already started, stop
			else{
				$(object).attr("src", $(object).attr("data-static"));
			}
		},
		
		//this function sets up the app with all of the search terms in the startingWords array
		initialize: function(){
			for (var i=0;i<this.startingWords.length;i++){
				this.createBtn(this.startingWords[i]);
			}
			$("#newBtn").on("click",function(){
				app.userButton();
			});
		},
		
		//this function gets user input and calls the create button with that information
		userButton: function(){
			var searchTerm=$("#searchVal").val();
			//replace any spaces in the search term with a "+" so api search will work appropriately
			searchTerm = searchTerm.split(' ').join('+');
			//create button with user-entered value
			this.createBtn(searchTerm);
		},
			
	};
	
	//run the app
	app.initialize();

});