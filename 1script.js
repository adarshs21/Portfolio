function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                map.setCenter(userLocation);

                const userMarker = new google.maps.Marker({
                    position: userLocation,
                    map: map,
                    icon: {
                        url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                    },
                    title: "Your Location",
                });

                searchHospitals(map, userLocation);
            },
            (error) => {
                console.error("Geolocation error:", error);
                handleLocationError(true, map);
            }
        );
    } else {
        handleLocationError(false, map);
    }
}

function searchHospitals(map, location) {
    const service = new google.maps.places.PlacesService(map);
    const request = {
        location: location,
        radius: '5000',
        type: ['hospital'],
    };

    service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            displayHospitals(results, location, map);
        } else {
            console.error("Nearby search failed:", status);
            document.getElementById('hospital-items').innerHTML = `<p>No hospitals found nearby.</p>`;
        }
    });
}

function displayHospitals(hospitals, userLocation, map) {
    const hospitalList = document.getElementById('hospital-items');
    hospitalList.innerHTML = '';

    const hospitalsWithDistance = hospitals.map(place => {
        const distance = calculateDistance(userLocation, place.geometry.location);
        return { place, distance };
    });

    hospitalsWithDistance.sort((a, b) => a.distance - b.distance);

    hospitalsWithDistance.forEach((hospital) => {
        const place = hospital.place;
        const distance = hospital.distance;

        new google.maps.Marker({
            position: place.geometry.location,
            map: map,
            title: place.name,
        });

        const hospitalInfo = document.createElement('li');
        hospitalInfo.className = 'hospital-info';
        hospitalInfo.innerHTML = `
            <div>
                <strong>${place.name}</strong>
                <span>${distance.toFixed(2)} km away</span>
            </div>
            <button onclick="selectHospital('${place.place_id}')">Select</button>
            <div id="details-${place.place_id}" class="hospital-details hidden"></div>
            <div id="contact-${place.place_id}" class="hospital-contact hidden">
                <p><strong>Contact Number:</strong> <span id="contact-number-${place.place_id}"></span></p>
                <form id="contact-form-${place.place_id}" class="hidden">
                    <input type="text" id="user-name-${place.place_id}" placeholder="Your Name" required>
                    <input type="text" id="user-phone-${place.place_id}" placeholder="Your Phone Number" required>
                    <button type="button" onclick="submitAlert('${place.place_id}')">Submit</button>
                </form>
            </div>
        `;
        hospitalList.appendChild(hospitalInfo);
    });
}

function selectHospital(placeId) {
    const service = new google.maps.places.PlacesService(document.createElement('div'));
    service.getDetails({ placeId }, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            const contactNumber = place.formatted_phone_number || 'N/A';
            const detailsElement = document.getElementById(`details-${placeId}`);
            const contactElement = document.getElementById(`contact-${placeId}`);
            const contactNumberSpan = document.getElementById(`contact-number-${placeId}`);
            const contactForm = document.getElementById(`contact-form-${placeId}`);

            contactNumberSpan.textContent = contactNumber;
            contactElement.classList.remove('hidden');
            contactForm.classList.remove('hidden');
        } else {
            console.error("Place details request failed:", status);
        }
    });
}

function submitAlert(placeId) {
    const name = document.getElementById(`user-name-${placeId}`).value;
    const phone = document.getElementById(`user-phone-${placeId}`).value;
    
    if (name && phone) {
        alert("Successfully Alerted the Hospital. You will be reached out soon.");
        document.getElementById(`contact-form-${placeId}`).reset(); 
        document.getElementById(`contact-${placeId}`).classList.add('hidden'); 
    } else {
        alert("Please enter both your name and phone number.");
    }
}

function calculateDistance(loc1, loc2) {
    const R = 6371; 
    const dLat = deg2rad(loc2.lat() - loc1.lat);
    const dLng = deg2rad(loc2.lng() - loc1.lng);
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(loc1.lat)) * Math.cos(deg2rad(loc2.lat())) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

function handleLocationError(browserHasGeolocation, map) {
    const errorMsg = browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation.";
    alert(errorMsg);
    map.setCenter({ lat: -34.397, lng: 150.644 });
}

window.onload = initMap;
let currentSelectedHospital = null;

function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                map.setCenter(userLocation);

                const userMarker = new google.maps.Marker({
                    position: userLocation,
                    map: map,
                    icon: {
                        url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                    },
                    title: "Your Location",
                });

                searchHospitals(map, userLocation);
            },
            (error) => {
                console.error("Geolocation error:", error);
                handleLocationError(true, map);
            }
        );
    } else {
        handleLocationError(false, map);
    }
}

function searchHospitals(map, location) {
    const service = new google.maps.places.PlacesService(map);
    const request = {
        location: location,
        radius: '5000',
        type: ['hospital'],
    };

    service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            displayHospitals(results, location, map);
        } else {
            console.error("Nearby search failed:", status);
            document.getElementById('hospital-items').innerHTML = `<p>No hospitals found nearby.</p>`;
        }
    });
}

function displayHospitals(hospitals, userLocation, map) {
    const hospitalList = document.getElementById('hospital-items');
    hospitalList.innerHTML = '';

    const hospitalsWithDistance = hospitals.map(place => {
        const distance = calculateDistance(userLocation, place.geometry.location);
        return { place, distance };
    });

    hospitalsWithDistance.sort((a, b) => a.distance - b.distance);

    hospitalsWithDistance.forEach((hospital) => {
        const place = hospital.place;
        const distance = hospital.distance;

        new google.maps.Marker({
            position: place.geometry.location,
            map: map,
            title: place.name,
        });

        const hospitalInfo = document.createElement('li');
        hospitalInfo.className = 'hospital-info';
        hospitalInfo.innerHTML = `
            <div>
                <strong>${place.name}</strong>
                <span>${distance.toFixed(2)} km away</span>
            </div>
            <button onclick="selectHospital('${place.place_id}', this)">Select</button>
            <div id="details-${place.place_id}" class="hospital-details hidden"></div>
            <div id="contact-${place.place_id}" class="hospital-contact hidden">
                <p><strong>Contact Number:</strong> <span id="contact-number-${place.place_id}"></span></p>
                <form id="contact-form-${place.place_id}" class="hidden">
                    <input type="text" id="user-name-${place.place_id}" placeholder="Your Name" required>
                    <input type="text" id="user-phone-${place.place_id}" placeholder="Your Phone Number" required>
                    <button type="button" onclick="submitAlert('${place.place_id}')">Submit</button>
                </form>
            </div>
        `;
        hospitalList.appendChild(hospitalInfo);
    });
}

function selectHospital(placeId, button) {
    if (currentSelectedHospital && currentSelectedHospital !== placeId) {
        document.getElementById(`details-${currentSelectedHospital}`).classList.add('hidden');
        document.getElementById(`contact-${currentSelectedHospital}`).classList.add('hidden');
        const previousButton = document.querySelector(`button[onclick*='${currentSelectedHospital}']`);
        if (previousButton) {
            previousButton.textContent = 'Select';
        }
    }

    const service = new google.maps.places.PlacesService(document.createElement('div'));
    service.getDetails({ placeId }, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            const contactNumber = place.formatted_phone_number || 'N/A';
            const detailsElement = document.getElementById(`details-${placeId}`);
            const contactElement = document.getElementById(`contact-${placeId}`);
            const contactNumberSpan = document.getElementById(`contact-number-${placeId}`);
            const contactForm = document.getElementById(`contact-form-${placeId}`);
            const currentButton = button;

            contactNumberSpan.textContent = contactNumber;
            contactElement.classList.remove('hidden');
            contactForm.classList.remove('hidden');
            currentSelectedHospital = placeId;
            currentButton.textContent = 'Selected';
        } else {
            console.error("Place details request failed:", status);
        }
    });
}

function submitAlert(placeId) {
    const name = document.getElementById(`user-name-${placeId}`).value;
    const phone = document.getElementById(`user-phone-${placeId}`).value;
    
    if (name && phone) {
        alert("Successfully Alerted the Hospital. You will be reached out soon.");
        document.getElementById(`contact-form-${placeId}`).reset(); 
        document.getElementById(`contact-${placeId}`).classList.add('hidden'); 
        const button = document.querySelector(`button[onclick*='${placeId}']`);
        if (button) {
            button.textContent = 'Select';
        }
        currentSelectedHospital = null; 
    } else {
        alert("Please enter both your name and phone number.");
    }
}

function calculateDistance(loc1, loc2) {
    const R = 6371; 
    const dLat = deg2rad(loc2.lat() - loc1.lat);
    const dLng = deg2rad(loc2.lng() - loc1.lng);
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(loc1.lat)) * Math.cos(deg2rad(loc2.lat())) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

function handleLocationError(browserHasGeolocation, map) {
    const errorMsg = browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation.";
    alert(errorMsg);
    map.setCenter({ lat: -34.397, lng: 150.644 });
}

window.onload = initMap;
