$(document).ready(function(){ 

    // When submit button is clicked
    $("#contact-submit-btn").on("click", function(event) {
        event.preventDefault();

        // add new contact   
        var newContact = {
            firstName: $("#firstNameInput").val().trim(),
            lastName: $("lastNameInput").val().trim(),
            phone: $("#phoneInput").val().trim(),
            email: $("emailInput").val().trim(),
            isVolunteer: $("isVolunteerInput").val(),
            message: $("messageInput").val().trim()
        };

        // ============= THIS NEEDS UPDATING TO CREATE TABLE
        // send post request
        $.post("api/new", newContact)
        .then(function(data) {
            console.log(data)
        });

        //empty value
        $("firstNameInput").val("");
        $("lastNameInput").val("");
        $("phoneInput").val("");
        $("emailInput").val("");
        $("input:checkbox").removeAttr("checked");
        $("messageInput").val("");
    });

    $('#characterLeft').text('140 characters left');

    $('#message').keydown(function () {
        var max = 500;
        var len = $(this).val().length;
        if (len >= max) {
            $('#characterLeft').text('You have reached the limit');
            $('#characterLeft').addClass('red');
            $('#btnSubmit').addClass('disabled');            
        } 
        else {
            var ch = max - len;
            $('#characterLeft').text(ch + ' characters left');
            $('#btnSubmit').removeClass('disabled');
            $('#characterLeft').removeClass('red');            
        }
    });
});