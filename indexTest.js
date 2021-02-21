const express = require('express')
const app = express()
const port = 3000
var path = require('path');

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

// Used to connect to Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCFZXLNj0exYOlKq2aSYh3BPcshAeQjlNg",
  authDomain: "foodshare-305408.firebaseapp.com",
  databaseURL: "https://foodshare-305408-default-rtdb.firebaseio.com",
  projectId: "foodshare-305408",
  storageBucket: "foodshare-305408.appspot.com",
  messagingSenderId: "94734562464",
  appId: "1:94734562464:web:8e960cbafb3c8eab34c5c5",
  measurementId: "G-CELBEMS28G"
};

// Initialize firebase
firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();

// Grabbing our DOM element
const submitBtn = document.querySelector('#submit');

let userName = document.querySelector('#userFullName');
let userPhone = document.querySelector('#userPhone');
let userAddress = document.querySelector('#userAddress');
let userFoodName = document.querySelector('#userFoodName');
let userFoodType = document.querySelector('#userFoodType');

const db = firestore.collection("formData");

submitBtn.addEventListener('click', function() {
    let userNameInput = userName.value;
    let userPhoneInput = userPhone.value;
    let userAddressInput = userAddress.value;
    let userFoodNameInput = userFoodName.value;
    let userFoodTypeInput = userFoodType.value;

    // Access the Database collection
    db.doc().set({
        name: userNameInput,
        phone: userPhoneInput,
        address: userAddressInput,
        foodname: userFoodNameInput,
        foodtype: userFoodTypeInput
    }).then(function(){ // check if set was successful
        console.log("Data Saved")
    }).catch(function(error) { // catch and log errors
        console.log(error);
    });
});


app.use('/images', express.static(__dirname + "/images"));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/foods.html', (req, res) => {
  res.sendFile(path.join(__dirname + '/foods.html'));
})

app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/style.css', function(req, res) {
  res.sendFile(__dirname + "/" + "style.css");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
