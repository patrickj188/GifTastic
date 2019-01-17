var movieGifArr = ["Beetlejuice", "Evil Dead", "Hellboy", "Face Off", "WickerMan"];

function renderButtons() {
    $("#buttonPanel").empty();
    for (var i = 0; i < movieGifArr.length; i++) {
        var button = $("<button>");
        button.addClass("movieButton");
        button.attr("data-movie", movieGifArr[i]);
        button.text(movieGifArr[i]);
        $("#buttonPanel").append(button);
    }
}

$("#add-movie").on("click", function (event) {
    event.preventDefault();
    var movie = $("#movie-input").val().trim();
    movieGifArr.push(movie);
    console.log(movie);
    $("#movie-input").val("");
    renderButtons();
});

function fetchMovieGifs() {
    var movieName = $(this).attr("data-movie");
    var movieStr = movieName.split(" ").join("+");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movieStr +
        "&rating=pg-13&limit=30&api_key=it74oWKwhquf4CVbbHevvjAZltIGwL0Y";
    $.ajax({
        method: "GET",
        url: queryURL,
    })
        .done(function (result) {
            var dataArray = result.data;
            $("#gifPanel").empty();
            for (var i = 0; i < dataArray.length; i++) {
                var newDiv = $("<div>");
                newDiv.addClass("movieGif");
                var newRating = $("<h6>").html("Rating: " + dataArray[i].rating);
                // var gifTitle = $("<h2>").html(dataArray[i].title.toUpperCase());
                // var br = $("<br>");
                // newDiv.append(gifTitle);
                newDiv.append(newRating);
                var newImg = $("<img>");
                newImg.attr("src", dataArray[i].images.fixed_height_still.url);
                newImg.attr("data-still", dataArray[i].images.fixed_height_still.url);
                newImg.attr("data-animate", dataArray[i].images.fixed_height.url);
                newImg.attr("data-state", "still");
                newDiv.append(newImg);
                $("#gifPanel").append(newDiv);
                console.log(dataArray[i]);
            }
        });
}

function animateGif() {
    var state = $(this).find("img").attr("data-state");
    if (state === "still") {
        $(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
        $(this).find("img").attr("data-state", "animate");
    } else {
        $(this).find("img").attr("src", $(this).find("img").attr("data-still"));
        $(this).find("img").attr("data-state", "still");
    }
}

$(document).ready(function () {
    renderButtons();
});
$(document).on("click", ".movieButton", fetchMovieGifs);

$(document).on("click", ".movieGif", animateGif);
