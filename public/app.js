// Initialize Firebase(2)
var config = {
    apiKey: "AIzaSyCFZXLNj0exYOlKq2aSYh3BPcshAeQjlNg",
    authDomain: "foodshare-305408.firebaseapp.com",
    databaseURL: "https://foodshare-305408-default-rtdb.firebaseio.com",
    projectId: "foodshare-305408",
    storageBucket: "foodshare-305408.appspot.com",
    messagingSenderId: "94734562464",
    appId: "1:94734562464:web:8e960cbafb3c8eab34c5c5",
    measurementId: "G-CELBEMS28G"
};

// Initialize Cloud Firestore through Firebase
firebase.initializeApp(config);

var db = firebase.firestore();

//listen for submit event//(1)
document
  .getElementById('registrationform')
  .addEventListener('submit', formSubmit);

//Submit form(1.2)
function formSubmit(e) {
  e.preventDefault();
  // Get Values from the DOM
  let userName = document.querySelector('#userFullName').value;
  let userPhone = document.querySelector('#userPhone').value;
  let userAddress = document.querySelector('#userAddress').value;
  let userFoodName = document.querySelector('#userFoodName').value;
  let userFoodType = document.querySelector('#userFoodType').value;

  //send message values
  sendMessage(userName, userPhone, userAddress, userFoodName, userFoodType);

  //Show Alert Message(5)
  document.querySelector('.alert').style.display = 'block';

  //Hide Alert Message After Seven Seconds(6)
  setTimeout(function() {
    document.querySelector('.alert').style.display = 'none';
  }, 7000);

  //Form Reset After Submission(7)
  document.querySelector('#registrationform').reset();
}

//Send Message to Firebase(4)
function sendMessage(userName, userPhone, userAddress, userFoodName, userFoodType) {
    db.collection("formData").add({
        name: userName,
        phone: userPhone,
        address: userAddress,
        foodname: userFoodName,
        foodtype: userFoodType
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}
