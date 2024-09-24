let map;
let directionsService;
let directionsRenderer;
let fromAutocomplete;
let toAutocomplete;

function initMap() {
    // Initialize map and directions services
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 20.5937, lng: 78.9629 }, // Default location: India
        zoom: 5,
    });
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    // Autocomplete for input fields
    const fromInput = document.getElementById("fromLocation");
    const toInput = document.getElementById("toLocation");

    fromAutocomplete = new google.maps.places.Autocomplete(fromInput);
    toAutocomplete = new google.maps.places.Autocomplete(toInput);

    // Try to detect the user's location automatically
    detectLocation();
}

function detectLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const userLocation = { lat: latitude, lng: longitude };

                // Update map center and zoom in on user's location
                map.setCenter(userLocation);
                map.setZoom(15);

                // Reverse geocode to fill the current hospital input
                const geocoder = new google.maps.Geocoder();
                geocoder.geocode({ location: userLocation }, (results, status) => {
                    if (status === "OK" && results[0]) {
                        document.getElementById("fromLocation").value = results[0].formatted_address;
                    }
                });
            },
            () => {
                alert("Could not detect your location.");
            }
        );
    } else {
        alert("Geolocation is not supported by your browser.");
    }
}

function clearInput(id) {
    document.getElementById(id).value = "";
}

function findAmbulances() {
    const fromLocation = document.getElementById("fromLocation").value;
    const toLocation = document.getElementById("toLocation").value;
    const ambulanceType = document.getElementById("ambulanceType").value;

    if (fromLocation && toLocation) {
        // Fetch directions and display route on map
        const request = {
            origin: fromLocation,
            destination: toLocation,
            travelMode: "DRIVING",
        };

        directionsService.route(request, (result, status) => {
            if (status === "OK") {
                directionsRenderer.setDirections(result);

                // Calculate distance and time
                const distance = result.routes[0].legs[0].distance.text;
                const duration = result.routes[0].legs[0].duration.text;
                const price = calculatePrice(ambulanceType, result.routes[0].legs[0].distance.value); // in meters

                // Display ambulance details with distance, time, and price
                displayAmbulanceDetails(distance, duration, price);
            } else {
                alert("Could not find a route.");
            }
        });
    } else {
        alert("Please enter both current and destination hospitals.");
    }
}

function calculatePrice(ambulanceType, distanceInMeters) {
    const distanceInKm = distanceInMeters / 1000;
    let pricePerKm;

    if (ambulanceType === "BLS") 
    return 500;
else
return 1200
}

function displayAmbulanceDetails(distance, duration, price) {
    const ambulanceDetails = document.getElementById("ambulanceDetails");
    ambulanceDetails.innerHTML = `
        <h3>Ambulance Details</h3>
        <p>Type: ${document.getElementById("ambulanceType").value}</p>
        <p>Distance: ${distance}</p>
        <p>Estimated Travel Time: ${duration}</p>
        <p>Price: ₹${price.toFixed(0)}</p>
    <h3>Available Ambulances</h3>
        <div class="ambulance-card">
            <h3>Ambulance 1</h3>
            <p>Driver: Adarsh Swain</p>
            <p>Vehicle: OD-14B-0395</p>
            <button onclick="callDriver('7008789139')">Call Now</button>
            <button onclick="bookDriver('7008789139')">Book Now</button>
        </div><div class="ambulance-card">
            <h3>Ambulance 2</h3>
            <p>Driver: Sandeep Ekka</p>
            <p>Vehicle: OD-14B-0143</p>
            <button onclick="callDriver('6371305386')">Call Now</button>
            <button onclick="bookDriver('6371305386')">Book Now</button>
        </div>
        <div class="ambulance-card">
            <h3>Ambulance 3</h3>
            <p>Driver: Manas Bhai-(mansi)</p>
            <p>Vehicle: OD-14B-0282</p>
            <button onclick="callDriver('9437521136')">Call Now</button>
            <button onclick="bookDriver('9437521136')">Book Now</button>
        </div>
        <div class="ambulance-card">
            <h3>Ambulance 4</h3>
            <p>Driver: Amlan </p>
            <p>Vehicle: OD-14B-0987</p>
            <button onclick="callDriver('9348917870')">Call Now</button>
            <button onclick="bookDriver('9348917870')">Book Now</button>
        </div>
         
         <div class="ambulance-card">
            <h3>Ambulance 5</h3>
            <p>Driver: Aditya </p>
            <p>Vehicle: OD-14B-0969</p>
            <button onclick="callDriver('7846996822')">Call Now</button>
            <button onclick="bookDriver('7846996822')">Book Now</button>
        </div>
         <div class="ambulance-card">
            <h3>Ambulance 6</h3>
            <p>Driver: Vaishnavi </p>
            <p>Vehicle: OD-14B-0125</p>
            <button onclick="callDriver('9348659546')">Call Now</button>
            <button onclick="bookDriver('9348659546')">Book Now</button>
        </div>
        
    `;
}

function callDriver(phoneNumber) {
    window.location.href = `tel:${phoneNumber}`;
}

function bookDriver(phoneNumber) {
    alert(`Booking ambulance with phone number ${phoneNumber}`);
}
function findAmbulances() {
    const fromLocation = document.getElementById("fromLocation").value;
    const toLocation = document.getElementById("toLocation").value;
    const ambulanceType = document.getElementById("ambulanceType").value;

    if (fromLocation && toLocation) {
        const request = {
            origin: fromLocation,
            destination: toLocation,
            travelMode: "DRIVING",
        };

        directionsService.route(request, (result, status) => {
            if (status === "OK") {
                const distanceInMeters = result.routes[0].legs[0].distance.value; // distance in meters
                const distanceInKm = distanceInMeters / 1000; // convert to kilometers

                if (distanceInKm <= 500) {
                    directionsRenderer.setDirections(result);
                    
                    // Calculate distance and time
                    const distance = result.routes[0].legs[0].distance.text;
                    const duration = result.routes[0].legs[0].duration.text;
                    const price = calculatePrice(ambulanceType, distanceInMeters);

                    displayAmbulanceDetails(distance, duration, price);
                } else {
                    alert("The destination is more than 100 km away. Please select a closer location.");
                }
            } else {
                alert("Could not find a route.");
            }
        });
    } else {
        alert("Please enter both current and destination hospitals.");
    }
}