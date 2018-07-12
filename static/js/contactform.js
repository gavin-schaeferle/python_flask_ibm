/// <reference path="../typings/globals/jquery/index.d.ts" />
$(function () {
        //On site load hide the error div
        $('#errors').hide();

        //create input mask for phone number
        $("#phonenumber").mask("(999)999-9999");

        //change fields that have focus
        var fields = document.querySelectorAll(".hilightable");
        for(var i=0; i < fields.length; i++){
            fields[i].addEventListener("focus", function(e){
                e.target.classList.toggle("highlight");
            });
            fields[i].addEventListener("blur", function(e){
                e.target.classList.toggle("highlight");
            });
        }

        //remove error from required fields when they have changed
        var reqFields = document.querySelectorAll(".required");
        for(var i=0; i < reqFields.length; i++){
            reqFields[i].addEventListener("change", function(e){
                e.target.classList.remove("error");
            });
        }

        //when submit button is pressed
        $("#register").on('click', function(event){
            //assume everything is valid and no errors occured
            var valid = true;
            var message = "";

            //remove all pervious errors
            $('#errorMessages').empty();

            //Create reg expresssions to use for checking
            var emailCheck = new RegExp('^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,4}$');
            var phoneCheck = new RegExp('^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$')

            //Make appropriate checks
            if($('#firstname').val().length === 0){
                invalid("First name is required.", '#firstname');
            }

            if($('#lastname').val().length === 0){
                invalid("Last name is required.", '#lastname');
            }

            if (!emailCheck.test( $('#email').val() )) {
                invalid("Invalid email address.", '#email');
            }

            if(!phoneCheck.test( $('#phonenumber').val() )){
                invalid("Invalid phone number.", '#phonenumber');
            }

            //test if valid and if not prevent submission of form
            if(!valid){
                $('#errors').show();
                $('#errorMessages').append(message);
                event.preventDefault();
            }

            //create function to handle when errors occure 
            function invalid(errorMessage, container){
                valid = false;
                message += '<p>' + errorMessage + '</p>';
                $(container).addClass('error');
            };   
        });
});