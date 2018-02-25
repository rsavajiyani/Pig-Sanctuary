$("#pig-submit-btn").on("click", function(event) {
    event.preventDefault();

    // add new pig    
    var newPig = {
        pigName: $("#pigNameInput").val().trim(),
        pigAge: $("pigAgeInput").val().trim(),
        pigGender: $("#pigGenderInput").val().trim(),
        pigImage: $("pigImgUrlInput").val().trim(),
        pigColor: $("pigColorInput").val().trim(),
        pigBio: $("pigBioInput").val().trim()
    };

    // send post request
    $.post("api/new", newPig)
    .then(function(data) {
        console.log(data)
    });

    //empty value
    $("pigNameInput").val("");
    $("pigAgeInput").val("");
    $("pigGenderInput").val("");
    $("pigImgUrlInput").val("");
    $("pigColorInput").val("");
    $("pigBioInput").val("");
});