/*Sita Robinson*/
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

var txtEmail=document.getElementById("email");
var txtPassword=document.getElementById("password");
var login=document.getElementById("login");
login.addEventListener("click", function(e){
var email=txtEmail.value;
var password=txtPassword.value;
var auth=firebase.auth();
const promise = auth.signInWithEmailAndPassword(email, password);
promise.catch(function(e){console.log(e.message);
    
   var errorList = $('#ErrorMessages', $("#adminlogin")).first();

    errorList
    .show()
    .append('<li><span>'+e.message+'</span></li>');
});


});

logout.addEventListener('click', function(e) {
    firebase.auth().signOut();
});

firebase.auth().onAuthStateChanged(function(firebaseUser) {
    if(firebaseUser){
        console.log(firebaseUser);
        
       $("#adminlogin").css("display", "none"); 
       $("#logout").css("display", "block");
    }
    else{
         console.log(firebaseUser);
        console.log("not logged in");

        $("#adminlogin").css("display", "block");
        $("#logout").css("display", "none");
    }

    try {
    firebase.initializeApp(config);
} 
catch (err) {
    if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack)
}
}
// Loop through attendees in order with the forEach() method. The callback
// provided to forEach() will be called synchronously with a DataSnapshot
// for each child:
var dateObj = new Date();
var date=dateObj.getMonth()+1+"-"+ dateObj.getDate()+"-"+ dateObj.getFullYear();
console.log(date);
var array=new Array();
var query = firebase.database().ref(date).orderByKey();
query.once("value")
  .then(function(snapshot) {
     
    snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key;
        var childData = childSnapshot.val();
        
        console.log(key);
        console.log(childData);
        console.log(childData.first_name +" "+ childData.last_name);
        array.push(childData.first_name +" "+ childData.last_name);
        console.log(array);
       
         
  });

 document.getElementById("numAttendees").innerHTML="Number of Attendees: <p>"+ array.length+"</p>";
  })
});
}

// Add errors to form if save fails
$(function() {
    var createAllErrors = function() {
        
        var form = $(this);
        var errorList = $('ul.ErrorMessages', form);

        var showAllErrorMessages = function() {
             $("#email").val($("#email").val().trim());        
            $("#password").val($("#password").val().trim());

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







$( document ).ready(function() {
     handleLoad();
});