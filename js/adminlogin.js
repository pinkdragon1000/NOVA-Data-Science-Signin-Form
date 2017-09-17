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
promise.catch(function(e){console.log(e.message);});
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
});
}

$( document ).ready(function() {
     handleLoad();
});