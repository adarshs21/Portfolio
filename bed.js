document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const phone = document.getElementById('phone').value;
    const uid = document.getElementById('uid').value;
    const bedType = document.getElementById('bedType').value; // Get the selected bed type

    // Phone Number Validation (Example: Indian format)
    const phonePattern = /^[6-9]\d{9}$/;
    if (!phonePattern.test(phone)) {
        alert("Please enter a valid phone number");
        return;
    }

    // Check availability before processing booking
    if (!areBedsAvailable(bedType)) {
        alert("No beds available for this type.");
        return;
    }

    // Assuming the specific UID required for booking is "123"
    if (uid === "123" && phone === "7008789139") {
        // Increment the available bed count for General or Surgery immediately
        if (bedType === "general") {
            incrementBed("generalAvailable");
        } else if (bedType === "surgery") {
            incrementBed("surgeryAvailable");
        }

        // Show the success alert message after updating bed count
        alert('Bed booked successfully for ' + phone);

    } else {
        alert('Invalid UID / Phone Number. Please try again.');
    }
});

// Function to check if beds are available for the selected type
function areBedsAvailable(bedType) {
    const bedElement = document.getElementById(`${bedType}Available`);
    const currentText = bedElement.textContent;
    const [available, total] = currentText.split("/").map(Number);
    return available < total;
}

// Function to increment available beds and change color from current to red
function incrementBed(bedId) {
    const bedElement = document.getElementById(bedId);
    const currentText = bedElement.textContent;
    const [available, total] = currentText.split("/").map(Number);

    if (available < total) {
        const newAvailable = available + 1;
        bedElement.textContent = `${newAvailable}/${total}`;

        // Calculate the percentage of occupied beds
        const percentageOccupied = (newAvailable / total) * 100;

        // Update the background color from green (initial) to red based on occupancy
        const newColor = calculateOccupiedColor(percentageOccupied);
        bedElement.style.backgroundColor = newColor;

        // Check if all beds are filled
        checkAllBedsFilled();

    } else {
        alert("No beds available for this type.");
    }
}

// Function to calculate color between the current color and red based on percentage of occupied beds
function calculateOccupiedColor(percentage) {
    const initialGreen = 204; // Starting green value (for green beds)
    const initialRed = 102; // Starting red value for light green
    
    const red = Math.min(255, initialRed + Math.floor(percentage * 1.5)); // Increase red as occupancy increases
    const green = Math.max(0, initialGreen - Math.floor(percentage * 1.5)); // Decrease green as occupancy increases

    const blue = 0; // Keeping blue constant for simplicity, adjust if necessary

    return `rgb(${red}, ${green}, ${blue})`; // Return the RGB color transitioning from green to red
}

// Function to check if all beds are filled and disable the booking button if true
function checkAllBedsFilled() {
    const generalAvailable = document.getElementById('generalAvailable').textContent;
    const surgeryAvailable = document.getElementById('surgeryAvailable').textContent;

    const generalTotal = parseInt(generalAvailable.split("/")[1]);
    const surgeryTotal = parseInt(surgeryAvailable.split("/")[1]);

    const allGeneralFilled = parseInt(generalAvailable.split("/")[0]) >= generalTotal;
    const allSurgeryFilled = parseInt(surgeryAvailable.split("/")[0]) >= surgeryTotal;

    const bookingButton = document.querySelector('.booking-form button');

    if (allGeneralFilled && allSurgeryFilled) {
        bookingButton.disabled = true;
        bookingButton.textContent = 'All beds are filled';
    } else {
        bookingButton.disabled = false;
        bookingButton.textContent = 'Book Bed'; // Reset button text if beds are available
    }
}

let selectedHospital = null;

// Simulating hospital selection
function selectHospital(hospital) {
    selectedHospital = hospital;
    document.getElementById("selectedHospitalText").textContent = hospital.name;

    // Update the small map based on the selected hospital's location
    updateMap(hospital.latitude, hospital.longitude);
}

// Function to update the map iframe
function updateMap(lat, lng) {
    const mapFrame = document.getElementById("hospitalMap");
    
    // Google Maps embed URL with dynamic coordinates
    const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBGLpuDsXyK3prGYgAeFCal8x0Dalo7FZ0&q=${lat},${lng}&zoom=16`;

    // Update the iframe's src attribute to show the new hospital location
    mapFrame.innerHTML = `<iframe src="${mapUrl}" allowfullscreen></iframe>`;
}

// Example hospital selection (replace with real API data)
const exampleHospital = {
    name: "K8 Kalinga Nagar, Ghatikia, Bhubaneswar, Odisha 751003",
    latitude:20.2830,
    longitude:85.7726
};

// Simulating hospital selection after fetching from API
selectHospital(exampleHospital);
