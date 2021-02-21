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

const foodList = document.querySelector('#myTable');

// Code for map on foods.html
function initMap() {
    // Map options
    var options = {
        zoom: 13,
        center:{lat:32.8801,lng:-117.2340}
    }
    // New map
    var map = new google.maps.Map(document.querySelector('#map'), options);

    // Add marker function
    function addMarker(props) {
        var marker = new google.maps.Marker({
            position:props.coords,
            map:map
        });
        //Check content
        if(props.content != null) {
            var infoWindow = new google.maps.InfoWindow({
                content: props.content
            });
            marker.addListener('click', function(){
                infoWindow.open(map, marker);
            });
        }
    }

    /*** Geocoding function for map markers from address ***/
    function geocode(props) {
        var name = props.name;
        var location = props.location;
        var phone_number = props.phone_number;
        var foodName = props.foodName;
        var foodType = props.foodType;
        axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
            params:{
                address:location,
                key:'AIzaSyCFZXLNj0exYOlKq2aSYh3BPcshAeQjlNg'
            }
        }).then(function(response) {
            var coordsInput = response.data.results[0].geometry.location;

            addMarker({
                coords:coordsInput,
                content: `<h2>${name}</h2><p>Address: ${location}<br>Contact Number: ${phone_number}<br>Food Name: ${foodName}<br>Food Type: ${foodType}</p>`
            });
        }).catch(function(error) {
            console.log(error);
        });
    }

    function renderInfo(doc){
        var row = foodList.insertRow([foodList.rowIndex+1]);
        let name = document.createElement('span');
        let phone_number = document.createElement('span');
        let address = document.createElement('span');
        let food_name = document.createElement('span');
        let food_type = document.createElement('span');

        row.setAttribute('data-id', doc.id);
        name.textContent = doc.data().name;
        phone_number.textContent = doc.data().phone;
        address.textContent = doc.data().address;
        food_name.textContent = doc.data().foodname;
        food_type.textContent = doc.data().foodtype;

        //Call geocode on address from form submission
        geocode({
            name:`${name.textContent}`,
            location:`${address.textContent}`,
            phone_number:`${phone_number.textContent}`,
            foodName:`${food_name.textContent}`,
            foodType:`${food_type.textContent}`
        });

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);

        cell1.innerHTML = name.textContent;
        cell2.innerHTML = phone_number.textContent;
        cell3.innerHTML = address.textContent;
        cell4.innerHTML = food_name.textContent;
        cell5.innerHTML = food_type.textContent;

    }
    // real-time listener
    db.collection('formData').onSnapshot(snapshot => {
        snapshot.docs.forEach(doc => {
            renderInfo(doc)
        })
    })
}
