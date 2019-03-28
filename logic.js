var topics = ["ferrari", "lamborghini", "bmw", "mercedez-benz", "audi", "land rover", "porsche"]

function renderButtons() {
    $("#btns-view").empty();

    for (i = 0; i < topics.length; i++){
        var createBtn = $("<button>");
        createBtn.addClass("car");
        createBtn.attr("data-car", topics[i]);
        createBtn.text(topics[i]);
        $("#btns-view").append(createBtn);
    }
};

renderButtons();

function displayGif () {

var searchGif = $(this).attr("data-car");
var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=mqaXHcZDgnlSOELGsQWX8ywukDULUIaB&q=" + searchGif + "&limit=10";

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
        console.log(response);

        var results = response.data;

        for (var i = 0; i < results.length.data; i++){
            var gifDiv = $("<div>");

            var rating = results[i].rating;

            var p = $("<p>").text("Ratings: " + rating);

            var carImage = $("<img>");
            console.log(results[i].images)
            carImage.attr("src", results[i].images.fixed_height.url);
            
            gifDiv.prepend(p);
            gifDiv.prepend(carImage);

            $("#car-view").prepend(gifDiv);
        }
    });
};

$("#search").on("click", function(event){
    event.preventDefault();

    var car = $("#car-input").val().trim();
    topics.push(car);
    console.log(car);

    renderButtons();
    this.displayGif();
});

$(document).on("click", ".car", displayGif);

$(".car").on("click", function() {
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});