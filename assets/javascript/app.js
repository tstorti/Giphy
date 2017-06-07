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
			var queryURL = "http://api.giphy.com/v1/gifs/search?q="+word+"&api_key=dc6zaTOxFJmzC";
			$("#btn-target").append("<button class='btn js-getImages' data-url='"+queryURL+"'>"+word+"</button>");
			this.clickResponse();
		},

		clickResponse: function(){
			$(".js-getImages").on("click",function(){
				//console.log($(this).attr("data-url"));
				app.getImages($(this).attr("data-url"));
			});

		},
		getImages: function(url){
			var queryURL = url;
			$.ajax({
				url: queryURL,
				method: "GET"
			}).done(function(data) {
				$("#image-target").html("");
				for (var i=0; i<5;i++){
					var imageURL=data.data[i].images.fixed_height.url;
					$("#image-target").append("<img src='"+imageURL+"'>");
				}
			});
		}
	};
	
	app.initialize();
	
	$("#newBtn").on("click",function(){
		app.userButton();
	});


	

});