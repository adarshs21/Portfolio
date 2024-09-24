document.addEventListener("DOMContentLoaded", function() {
    const doctorsTable = document.getElementById("doctors-table").getElementsByTagName('tbody')[0];
    const medicinesTable = document.getElementById("medicines-table").getElementsByTagName('tbody')[0];

    let doctorsData = [];
    let medicinesData = [];

    function updateTables() {
        // Clear current tables
        doctorsTable.innerHTML = '';
        medicinesTable.innerHTML = '';

        // Populate doctors table
        doctorsData.forEach(department => {
            const row = document.createElement("tr");
            row.innerHTML = `<td>${department.department}</td><td>${department.count}</td>`;
            doctorsTable.appendChild(row);
        });

        // Populate medicines table
        medicinesData.forEach(medicine => {
            const row = document.createElement("tr");
            row.innerHTML = `<td>${medicine.medicine}</td><td>${medicine.quantity}</td>`;
            medicinesTable.appendChild(row);
        });
    }

    window.addDoctor = function() {
        const deptSelect = document.getElementById("dept-select");
        const deptName = deptSelect.options[deptSelect.selectedIndex].value;
        const docCount = parseInt(document.getElementById("doc-count").value);

        if (deptName && !isNaN(docCount)) {
            doctorsData.push({ department: deptName, count: docCount });
            updateTables();
            document.getElementById("doc-count").value = '';
        } else {
            alert("Please select a department and enter a valid doctor count.");
        }
    };

    window.addMedicine = function() {
        const medSelect = document.getElementById("med-select");
        const medName = medSelect.options[medSelect.selectedIndex].value;
        const medQuantity = parseInt(document.getElementById("med-quantity").value);

        if (medName && !isNaN(medQuantity)) {
            medicinesData.push({ medicine: medName, quantity: medQuantity });
            updateTables();
            document.getElementById("med-quantity").value = '';
        } else {
            alert("Please select a medicine and enter a valid quantity.");
        }
    };

    document.getElementById("hospital-form").addEventListener("submit", function(event) {
        event.preventDefault();

        const address = document.getElementById("address").value;
        const beds = document.getElementById("beds").value;
        const oxygenTanks = document.getElementById("oxygen-tanks").value;

        document.getElementById("display-address").textContent = address;
        document.getElementById("display-beds").textContent = beds;
        document.getElementById("display-oxygen-tanks").textContent = oxygenTanks;
    });
});