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

function onFormSubmitted() {
    event.preventDefault();

    var date = Date.now();
    var ref = firebase.database().ref(date);
    
    var first = document.getElementById("first_name").value;
    var last = document.getElementById("last_name").value;
    var meetupaccount=$("input[name=yesno]:checked").val();
    var meetupname = document.getElementById("meetup_name").value;

     if (first==""  || last=="")
    {

    }
    else
    {
        // Generate a reference to a new location and add some data using push()
        //var postsRef = ref.child("nova-data-science-signin");
        var newPostRef = ref.push({
            first_name: first,
            last_name: last,
            meetup_name: meetupname
        });
    }
    
}

/* Add errors to form if save fails */
$(function() {
    var createAllErrors = function() {
        var form = $(this);
        var errorList = $('ul.errorMessages', form);
        
        var showAllErrorMessages = function() {
            errorList.empty();
            
            //Find all invalid fields within the form.
            form.find(':invalid').each(function(index, node) {

                //Find the field's corresponding label
                var label = $('label[for=' + node.id + ']');

                //Opera incorrectly does not fill the validationMessage property.
                var message = node.validationMessage || 'Invalid value.';
                errorList
                    .show()
                    .append('<li><span>' + label.html() + '</span> ' + message + '</li>');
            });
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
function yesnoCheck() {
    if (document.getElementById('meetup_account').checked) {
        document.getElementById('ifYes').style.display = 'block';
        $("#meetup_name").attr("required","true");
    }
    else
    {
        document.getElementById('ifYes').style.display = 'none';
    } 
}