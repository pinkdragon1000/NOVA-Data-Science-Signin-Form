function getUserInformation() {
var config = {
    apiKey: "AIzaSyAOdoqi80u5QNcmjwymTnY7RnvS1sgN9sg",
    authDomain: "nova-data-science-signin.firebaseapp.com",
    databaseURL: "https://nova-data-science-signin.firebaseio.com",
    projectId: "nova-data-science-signin",
    storageBucket: "nova-data-science-signin.appspot.com",
    messagingSenderId: "628585999318"
  };

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


  var numString=document.getElementById("numRand").value;
  var numInt=parseInt(numString);
  if(isNaN(numInt))
    {
        document.getElementById("winners").innerHTML="Invalid Input ";
    }
  else if (numInt < 0)
    {
         document.getElementById("winners").innerHTML="Cannot compute winners of a negative amount.";
    }
  else if (numInt == 0)
    {
        document.getElementById("winners").innerHTML="Cannot compute winners if value typed in is 0. "
    }
  else
  {
      document.getElementById("winners").innerHTML="Winners"+"<br>";
      for(s=0;s<=numInt-1;s++)
        {
            var index=Math.floor(Math.random()*array.length);
            randName=array[index];
            console.log("index"+index);
            console.log("Length of array"+array.length);

                if(randName==undefined)
                {
                    document.getElementById("winners").innerHTML+="<p>Not enough values</p>";
                }
                else
                {
                    document.getElementById("winners").innerHTML+="<p>"+num+". "+randName+"<br></p>";
                } 
        
                array.splice(index, 1);

        }

  }
});

}
