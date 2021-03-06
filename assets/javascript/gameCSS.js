$(document).ready(function() {
  
    var topics = ["Cat", "Dog", "Owl", "Lion"];

    function init() {
        renderButtons();

        $("#inputForm").css({"float":"right", "width":"300px", "margin-right":"10px"})
        $("#form-input").css({"width":"280px"})
        $("#addButton").css({"margin-top":"5px"})

        $("#gifArea").css({"float":"left", "width":"960px"})
    }

    function getGiphy(clickelement) {

        var subject = $(clickelement).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + subject + "&api_key=NshS51SjbOwAsmY01cjQCInJLamEKGxt&limit=10";

        var $gifArea = $("#gifArea");

        $gifArea.empty();

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            console.log(response);
           
            for (var j=0; j<response.data.length; j++) {

                var $gifContainer = $("<div>")
                var $newRating = $("<p>");
                var $newImage = $("<img>");

                var rowCount = 1

                if (j%3 === 0) {
                    var $gifRow = $("<div>");
                    $gifRow.css({"clear":"both"});
                };
                
                //create rating
                $newRating.text("Rating: " + response.data[j].rating);

                //create image
                $newImage.addClass("gifImage");
                $newImage.css({"max-width":"300px"});
                $newImage.attr("data-still", response.data[j].images.fixed_height_still.url);
                $newImage.attr("src", response.data[j].images.fixed_height_still.url);
                $newImage.attr("data-animate", response.data[j].images.fixed_height.url);
                $newImage.attr("data-state", "still");

                //add to the div
                $gifContainer.css({"float":"left", "margin":"0px", "padding":"0px 05px"});
                $gifContainer.append($newRating);
                $gifContainer.append($newImage);
                
                //add to the row
                $gifRow.append($gifContainer);

                //add to page
                $gifArea.append($gifRow);



            }
        });
    };

    function renderButtons() {
        var $buttonSet = $("#buttonSet");
        $buttonSet.empty();
        


        for (var i = 0; i < topics.length; i++) {

            var $button = $("<button>");
           
            $button.addClass("btn btn-default btn-xs dynaButton");
            $button.css({"background-color":"#4aaaa5", "color":"#ffffff", "margin":"2px"});
            $button.text(topics[i]);
            $button.attr("data-name", topics[i]);
            
            $buttonSet.append($button);
        }
    }


    function giphyClick(clickelement) {
        var state = $(clickelement).attr("data-state");
        if (state === "still") {
            $(clickelement).attr("src", $(clickelement).attr("data-animate"));
            $(clickelement).attr("data-state", "animate");
        } else if (state === "animate") {
            $(clickelement).attr("src", $(clickelement).attr("data-still"));
            $(clickelement).attr("data-state", "still");
        }
    }

    //Add the dynamic button
    $(document).on("click", "#addButton", function(event) {
        event.preventDefault();
        
        var newButton = $("#form-input").val().trim();

        topics.push(newButton);

        renderButtons();

    });

    //Click a dynamic button
    $(document).on("click", ".dynaButton", function(event) {
        getGiphy(this);
    });
    
    //Start-Stop a giphy
    $(document).on("click", ".gifImage", function(event) {
        giphyClick(this);
    });

    init();
});
