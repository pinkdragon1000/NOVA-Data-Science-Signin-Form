 /* Sita Robinson */
 function handleLoad()
{
 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAOdoqi80u5QNcmjwymTnY7RnvS1sgN9sg",
    authDomain: "nova-data-science-signin.firebaseapp.com",
    databaseURL: "https://nova-data-science-signin.firebaseio.com",
    projectId: "nova-data-science-signin",
    storageBucket: "nova-data-science-signin.appspot.com",
    messagingSenderId: "628585999318"
  };
  firebase.initializeApp(config);


  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
  } else {
    // No user is signed in.
    document.location.href="index.html"
  }
});

}


function resetForm() {
    //document.getElementById("mainform").reset();
    $("#first_name").val('');
    $("#last_name").val('');
    $("input[name=yesno]").prop("checked",false)
    $("#email").val('');
    $("#meetup_account").attr("required","true");
}

window.onFormSubmitted = function(event) {

    //e.preventDefault();
    
    var dateObj = new Date();
    var date=dateObj.getMonth()+1+"-"+ dateObj.getDate()+"-"+ dateObj.getFullYear();
    console.log("key: ", date);
    var ref = firebase.database().ref(date);    
    
    var first = $("#first_name").val();
    var last = $("#last_name").val();
    var meetupaccount = $("input[name=yesno]:checked").val();
    var email = $("#email").val();

    firsttrimmed=first.trim();
    lasttrimmed=last.trim();
    meetupaccounttrimmed = meetupaccount.trim();
    emailtrimmed = email.trim();

     if (firsttrimmed==""  || lasttrimmed=="" || meetupaccounttrimmed == "" ||
     emailtrimmed == "")
    {
    }
    else
    {
        // Generate a reference to a new location and add some data using push()
        //var postsRef = ref.child("nova-data-science-signin");
        var newPostRef = ref.push({
            first_name: firsttrimmed,
            last_name: lasttrimmed,
            meetup_account: meetupaccounttrimmed,
            email: emailtrimmed
        });
        resetForm();
        }
    //event.preventDefault();
    return false;
}

// Add errors to form if save fails
$(function() {
    var createAllErrors = function() {
        
        var form = $(this);
        var errorList = $('ul.ErrorMessages', form);

        var showAllErrorMessages = function() {

            $("#first_name").val($("#first_name").val().trim());        
            $("#last_name").val($("#last_name").val().trim());
            $("#email").val($("#email").val().trim());

            
            $("#ErrorMessages").removeClass("SuccessMessages")
            $("#ErrorMessages").addClass("ErrorMessages")
            errorList.empty();

            //Find all invalid fields within the form.
            form.find(':invalid').each(function(index, node) {

                //Find the field's corresponding label
                var label = $('label[for=\"' + node.id + '\"]');

                if ( label.html() === undefined)
                    return;

              
            
                //Opera incorrectly does not fill the validationMessage property.
                var message = node.validationMessage || 'Invalid value.';
                errorList
                    .show()
                    .append('<li><span>' + label.html() + '</span> ' + message + '</li>');
            
            });
        
            if (errorList.html() == "") {
                $("#ErrorMessages").removeClass("ErrorMessages");
                $("#ErrorMessages").addClass("SuccessMessages");
        
        
                errorList
                    .show()
                    .append('<li><span>'+"Thank you your input has been submitted!"+"</li></span>")
                    .delay(1500).hide(0);
            }
    
        };

        $('input[type=submit], button', form).on('click', showAllErrorMessages);
        $('input[type=text]', form).on('keypress', function(event) {
            //keyCode 13 is Enter
            if (event.keyCode == 13) {
                showAllErrorMessages();
            }
        });
    };
    
    $('form').each(createAllErrors);
});



/* Displays field "Meetup name" if yes is checked and doesn't display if no is checked*/

window.yesnoCheck = function() {
    $("#meetup_account").removeAttr("required");
    if ($("#meetup_account").is(":checked")) {
        $("#ifYes").css("display", "block");
        $("#meetup_name").attr("required","true");
    }
    else
    {
        $("#ifYes").css("display", "none");
        $("#meetup_name").removeAttr("required");
    } 
};

$( document ).ready(function() {
     handleLoad();
});



