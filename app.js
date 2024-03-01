const userList = document.getElementById('userList');
const nameInput = document.getElementById('name');
const ipAddressInput = document.getElementById('ipAddress');
const mobileNumberInput = document.getElementById('mobileNumber');
const packageInput = document.getElementById('package');
const payAmountInput = document.getElementById('payAmount');
const dueAmountInput = document.getElementById('dueAmount');
const searchUserInput = document.getElementById('searchUser');
const packageFilterInput = document.getElementById('packageFilter');

const addUserModal = document.getElementById('addUserModal');
const deleteConfirmationModal = document.getElementById('deleteConfirmationModal');
const editUserModal = document.getElementById('editUserModal');
const addUserForm = document.getElementById('addUserForm');
const addPackageInput = document.getElementById('addPackage');

const editUserIdInput = document.getElementById('editUserId');
const editNameInput = document.getElementById('editName');
const editIpAddressInput = document.getElementById('editIpAddress');
const editMobileNumberInput = document.getElementById('editMobileNumber');
const editPackageInput = document.getElementById('editPackage');
const editPayAmountInput = document.getElementById('editPayAmount');
const editDueAmountInput = document.getElementById('editDueAmount');

const totalPayAmountElement = document.getElementById('totalPayAmount');
const totalDueAmountElement = document.getElementById('totalDueAmount');
const totalUserCountElement = document.getElementById('totalUserCount');
const totalUserActiveElement = document.getElementById('totalUserActive');

// Predefined monthly bill values for each package
const packageMonthlyBill = {
    '8Mbps': 500,
    '10Mbps': 600,
    '12Mbps': 700,
    '15Mbps': 800,
    '20Mbps': 1000,
};

// Dummy data for initial users
const users = [
    { id: 1, name: 'John Doe', ipAddress: '192.168.1.1', mobileNumber: '1234567890', package: '8Mbps', payAmount: 500, dueAmount: 10 },
    { id: 2, name: 'Jane Doe', ipAddress: '192.168.1.2', mobileNumber: '9876543210', package: '10Mbps', payAmount: 600, dueAmount: 5 },
];

// Function to render users
function renderUsers(filteredUsers = users) {
    userList.innerHTML = '';
    let totalPayAmount = 0;
    let totalDueAmount = 0;

    filteredUsers.forEach(user => {
        totalPayAmount += user.payAmount;
        totalDueAmount += user.dueAmount;

        const card = document.createElement('div');
        card.className = 'bg-white p-4 mb-2 flex flex-col justify-between items-center md:items-start';
        card.innerHTML = `
            <div class="">
                <p><strong>Name:</strong> ${user.name}</p>
                <p><strong>IP Address:</strong> ${user.ipAddress}</p>
                <p><strong>Mobile Number:</strong> ${user.mobileNumber}</p>
                <p><strong>Package:</strong> ${user.package}</p>
                <p><strong>Pay Amount:</strong> $${user.payAmount}</p>
                <p><strong>Due Amount:</strong> $${user.dueAmount}</p>
            </div>
            <div class="flex items-center mt-2 md:mt-0">
                <button onclick="openEditUserModal(${user.id})" class="bg-yellow-500 text-white p-2 rounded-l-md">Edit</button>
                <button onclick="openDeleteConfirmationModal(${user.id})" class="bg-red-500 text-white p-2 rounded-r-md md:rounded-l-md ml-2">Delete</button>
            </div>
        `;
        userList.appendChild(card);
    });

    // Update total Pay and Due Amounts
    totalPayAmountElement.textContent = totalPayAmount.toFixed(2);
    totalDueAmountElement.textContent = totalDueAmount.toFixed(2);

    // Update total user count
    totalUserCountElement.textContent = filteredUsers.length;
}

// Function to add a new user
function addUser() {
    const name = nameInput.value.trim();
    const ipAddress = ipAddressInput.value.trim();
    const mobileNumber = mobileNumberInput.value.trim();
    const packageValue = packageInput.value.trim();
    const dueAmount = parseFloat(dueAmountInput.value) || 0;

    // Use predefined monthly bill value for the selected package
    const payAmount = packageValue ? packageMonthlyBill[packageValue] || 0 : 0;

    if (name && ipAddress && mobileNumber && packageValue && !isNaN(dueAmount)) {
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

        // Close the add user modal
        closeAddUserModal();
    }
}

// Function to update Pay Amount based on the selected package
function updatePayAmount() {
    const packageValue = packageInput.value.trim();
    payAmountInput.value = packageValue ? packageMonthlyBill[packageValue] || '' : '';
}

// Function to open the add user modal
function openAddUserModal() {
    // Show the add user modal
    addUserModal.classList.remove('hidden');
}

// Function to close the add user modal
function closeAddUserModal() {
    // Clear input fields
    nameInput.value = '';
    ipAddressInput.value = '';
    mobileNumberInput.value = '';
    packageInput.value = '';
    payAmountInput.value = '';
    dueAmountInput.value = '';

    // Hide the add user modal
    addUserModal.classList.add('hidden');
}

// Function to open the delete confirmation modal
function openDeleteConfirmationModal(userId) {
    // Set the current user ID to be deleted
    deleteConfirmationModal.dataset.userId = userId;
    // Show the delete confirmation modal
    deleteConfirmationModal.classList.remove('hidden');
}

// Function to close the delete confirmation modal
function closeDeleteConfirmationModal() {
    // Hide the delete confirmation modal
    deleteConfirmationModal.classList.add('hidden');
}

// Function to confirm or cancel the delete operation
function confirmDelete(isConfirmed) {
    const userId = parseInt(deleteConfirmationModal.dataset.userId);

    if (isConfirmed && !isNaN(userId)) {
        // Delete the user
        deleteUser(userId);
    }

    // Close the delete confirmation modal
    closeDeleteConfirmationModal();
}

// Function to open the edit user modal
function openEditUserModal(userId) {
    const userToEdit = users.find(user => user.id === userId);

    if (userToEdit) {
        editUserIdInput.value = userToEdit.id;
        editNameInput.value = userToEdit.name;
        editIpAddressInput.value = userToEdit.ipAddress;
        editMobileNumberInput.value = userToEdit.mobileNumber;
        editPackageInput.value = userToEdit.package;
        editPayAmountInput.value = userToEdit.payAmount;
        editDueAmountInput.value = userToEdit.dueAmount;

        // Show the edit user modal
        editUserModal.classList.remove('hidden');
    }
}

// Function to update Edit Pay Amount based on the selected package in the edit modal
function updateEditPayAmount() {
    const packageValue = editPackageInput.value.trim();
    editPayAmountInput.value = packageValue ? packageMonthlyBill[packageValue] || '' : '';
}

// Function to close the edit user modal
function closeEditUserModal() {
    // Clear input fields
    editUserIdInput.value = '';
    editNameInput.value = '';
    editIpAddressInput.value = '';
    editMobileNumberInput.value = '';
    editPackageInput.value = '';
    editPayAmountInput.value = '';
    editDueAmountInput.value = '';

    // Hide the edit user modal
    editUserModal.classList.add('hidden');
}

// Function to update a user
function updateUser() {
    const userId = parseInt(editUserIdInput.value);
    const name = editNameInput.value.trim();
    const ipAddress = editIpAddressInput.value.trim();
    const mobileNumber = editMobileNumberInput.value.trim();
    const packageValue = editPackageInput.value.trim();
    const payAmount = parseFloat(editPayAmountInput.value) || 0;
    const dueAmount = parseFloat(editDueAmountInput.value) || 0;

    if (userId && name && ipAddress && mobileNumber && packageValue && !isNaN(dueAmount)) {
        const index = users.findIndex(user => user.id === userId);

        if (index !== -1) {
            const updatedUser = {
                id: userId,
                name,
                ipAddress,
                mobileNumber,
                package: packageValue,
                payAmount,
                dueAmount
            };

            // Update the user in the array
            users[index] = updatedUser;

            // Render the updated user list
            renderUsers();

            // Close the edit user modal
            closeEditUserModal();
        }
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

// Function to search users by name
function searchUsers() {
    const searchTerm = searchUserInput.value.trim().toLowerCase();
    const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchTerm));
    renderUsers(filteredUsers);
}

// Function to filter users by package
function filterUsers() {
    const selectedPackage = packageFilterInput.value;
    if (selectedPackage === 'all') {
        renderUsers(users);
    } else {
        const filteredUsers = users.filter(user => user.package === selectedPackage);
        renderUsers(filteredUsers);
    }
}

// Initial rendering
renderUsers();