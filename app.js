<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Management</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100">

<div class="container mx-auto p-8">
    <h1 class="text-2xl font-bold mb-4">User Management</h1>

    <!-- User List -->
    <div id="userList" class="mb-8">
        <!-- User cards will be added here dynamically -->
    </div>

    <!-- Add User Form -->
    <form id="addUserForm" class="flex flex-col md:flex-row items-center">
        <input type="text" id="name" class="rounded-l-md p-2 border border-r-0 border-gray-300 mb-2 md:mb-0" placeholder="Enter Name">
        <input type="text" id="ipAddress" class="p-2 border border-r-0 border-gray-300 mb-2 md:mb-0" placeholder="Enter IP Address">
        <input type="text" id="mobileNumber" class="p-2 border border-r-0 border-gray-300 mb-2 md:mb-0" placeholder="Enter Mobile Number">
        <div class="relative inline-block text-left">
            <select id="package" class="p-2 border border-r-0 border-gray-300 mb-2 md:mb-0">
                <option value="" disabled selected>Select Package</option>
                <option value="8Mbps">8Mbps</option>
                <option value="10Mbps">10Mbps</option>
                <option value="12Mbps">12Mbps</option>
                <option value="15Mbps">15Mbps</option>
                <option value="20Mbps">20Mbps</option>
            </select>
        </div>
        <input type="number" id="payAmount" class="p-2 border border-r-0 border-gray-300 mb-2 md:mb-0" placeholder="Enter Pay Amount">
        <input type="number" id="dueAmount" class="rounded-r-md p-2 border border-gray-300 mb-2 md:mb-0" placeholder="Enter Due Amount">
        <button type="button" onclick="addUser()" class="bg-blue-500 text-white p-2 rounded-md md:rounded-r-md">Add User</button>
    </form>
</div>

<script>
    const userList = document.getElementById('userList');
    const nameInput = document.getElementById('name');
    const ipAddressInput = document.getElementById('ipAddress');
    const mobileNumberInput = document.getElementById('mobileNumber');
    const packageInput = document.getElementById('package');
    const payAmountInput = document.getElementById('payAmount');
    const dueAmountInput = document.getElementById('dueAmount');

    // Dummy data for initial users
    const users = [
        { id: 1, name: 'John Doe', ipAddress: '192.168.1.1', mobileNumber: '1234567890', package: '8Mbps', payAmount: 50, dueAmount: 10 },
        { id: 2, name: 'Jane Doe', ipAddress: '192.168.1.2', mobileNumber: '9876543210', package: '10Mbps', payAmount: 75, dueAmount: 5 },
    ];

    // Function to render users
    function renderUsers() {
        userList.innerHTML = '';
        users.forEach(user => {
            const card = document.createElement('div');
            card.className = 'bg-white p-4 mb-2 flex flex-col md:flex-row justify-between items-center';
            card.innerHTML = `
                <div>
                    <p><strong>Name:</strong> ${user.name}</p>
                    <p><strong>IP Address:</strong> ${user.ipAddress}</p>
                    <p><strong>Mobile Number:</strong> ${user.mobileNumber}</p>
                    <p><strong>Package:</strong> ${user.package}</p>
                    <p><strong>Pay Amount:</strong> $${user.payAmount}</p>
                    <p><strong>Due Amount:</strong> $${user.dueAmount}</p>
                </div>
                <div class="flex items-center">
                    <button onclick="editUser(${user.id})" class="bg-yellow-500 text-white p-2 rounded-l-md">Edit</button>
                    <button onclick="deleteUser(${user.id})" class="bg-red-500 text-white p-2 rounded-r-md md:rounded-l-md">Delete</button>
                </div>
            `;
            userList.appendChild(card);
        });
    }

    // Function to add a new user
    function addUser() {
        const name = nameInput.value.trim();
        const ipAddress = ipAddressInput.value.trim();
        const mobileNumber = mobileNumberInput.value.trim();
        const packageValue = packageInput.value.trim();
        const payAmount = parseFloat(payAmountInput.value) || 0;
        const dueAmount = parseFloat(dueAmountInput.value) || 0;

        if (name && ipAddress && mobileNumber && packageValue && !isNaN(payAmount) && !isNaN(dueAmount)) {
            const newUser = { 
                id: Date.now(), 
                name, 
                ipAddress, 
                mobileNumber, 
                package: packageValue, 
                payAmount, 
                dueAmount 
            };
            users.push(newUser);
            renderUsers();
            
            // Clear input fields
            nameInput.value = '';
            ipAddressInput.value = '';
            mobileNumberInput.value = '';
            packageInput.value = '';
            payAmountInput.value = '';
            dueAmountInput.value = '';
        }
    }

    // Function to edit a user
    function editUser(userId) {
        const userToEdit = users.find(user => user.id === userId);

        if (userToEdit) {
            nameInput.value = userToEdit.name;
            ipAddressInput.value = userToEdit.ipAddress;
            mobileNumberInput.value = userToEdit.mobileNumber;
            packageInput.value = userToEdit.package;
            payAmountInput.value = userToEdit.payAmount;
            dueAmountInput.value = userToEdit.dueAmount;

            // Remove the user from the list
            deleteUser(userId);
        }
    }

    // Function to delete a user
    function deleteUser(userId) {
        const index = users.findIndex(user => user.id === userId);
        if (index !== -1) {
            users.splice(index, 1);
            renderUsers();
        }
    }

    // Initial rendering
    renderUsers();
</script>

</body>
</html>
