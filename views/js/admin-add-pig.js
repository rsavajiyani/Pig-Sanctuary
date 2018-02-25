$(document).ready(function() {

    // When submit button is clicked
    $("#pig-submit-btn").on("click", function(event) {
        event.preventDefault();
        alert("you clicked the button");
        console.log("you clicked the button");
        // Create a new pig object
        var newPig = {
            pigName: $("#pigNameInput").val().trim(),
            pigAge: $("pigAgeInput").val().trim(),
            pigGender: $("#pigGenderInput").val().trim(),
            pigImage: $("pigImgUrlInput").val().trim(),
            pigColor: $("pigColorInput").val().trim(),
            pigBio: $("pigBioInput").val().trim()
        };

        console.log(newPig);

        $.ajax({
            type: "POST",
            url: "/addpig",
            data: newPig,
            contentType: "application/json",
            dataType: "json",
            success: function (data) { alert(data); },
            failure: function (errMsg) {
                alert(errMsg);
            }
        });

        // Send an AJAX POST-request with jQuery
        // $.post("api/newpig", newPig)
        // .then(function() {
            
        //     $("#pigTable > tbody").append("<tr><td>" + newPig.pigName + "</td><td>" + newPig.pigAge + "</td><td>" + newPig.pigGender + "</td><td>" newPig.pigImage + "</td><td>" + newPig.pigColor + "</td><td>" + newPig.pigBio + "</td></tr>");
        // });

        // // Empty the new pig values
        // $("pigNameInput").val("");
        // $("pigAgeInput").val("");
        // $("pigGenderInput").val("");
        // $("pigImgUrlInput").val("");
        // $("pigColorInput").val("");
        // $("pigBioInput").val("");
    });

    // Grab all pigs when page loads
    // $.get("api/allpigs", function(data) {

    //     if (data.length !== 0) {
    //         for (var i = 0; i < data.length; i++) {
                
    //             $("#pigTable > tbody").append("<tr><td>" + data[i].pigName + "</td><td>" + data[i].pigAge + "</td><td>" + data[i].pigGender + "</td><td>" + data[i].pigImage + "</td><td>" + data[i].pigColor + "</td><td>" + data[i].pigBio + "</td></tr>");
                
    //         }
    //     }
    // });
});