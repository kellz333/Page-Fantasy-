document.addEventListener("DOMContentLoaded", function () {
    const profileImage = document.getElementById("profileImage");
    const uploadProfilePic = document.getElementById("uploadProfilePic");
    const username = document.getElementById("username");
    const userEmail = document.getElementById("userEmail");
    const userAddress = document.getElementById("userAddress");
    const paymentMethod = document.getElementById("paymentMethod");
    const clothingSize = document.getElementById("clothingSize");
    const savedPayments = document.getElementById("savedPayments");
    const logoutBtn = document.getElementById("logoutBtn");

    // Simulated Firebase Data (Replace with actual Firebase fetch)
    const userData = {
        name: "Juan Dela Cruz",
        email: "juan@example.com",
        profilePic: "user-profile.jpg",
        address: "123 Fashion Street, Manila",
        paymentMethod: "Visa **** 5678",
        clothingSize: "Medium",
        savedPayments: "GCash, PayPal, Credit Card",
        orderStatus: {
            toShip: 2,
            toReceive: 1,
            toDeliver: 3,
            delivered: 5
        }
    };

    // Load user profile dynamically
    username.textContent = userData.name;
    userEmail.textContent = userData.email;
    profileImage.src = userData.profilePic;
    userAddress.textContent = userData.address;
    paymentMethod.textContent = userData.paymentMethod;
    clothingSize.textContent = userData.clothingSize;
    savedPayments.textContent = userData.savedPayments;
    
    // Load Order Status
    document.getElementById("toShip").textContent = userData.orderStatus.toShip;
    document.getElementById("toReceive").textContent = userData.orderStatus.toReceive;
    document.getElementById("toDeliver").textContent = userData.orderStatus.toDeliver;
    document.getElementById("delivered").textContent = userData.orderStatus.delivered;

    // Change profile picture
    profileImage.addEventListener("click", function () {
        uploadProfilePic.click();
    });

    uploadProfilePic.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profileImage.src = e.target.result;
                // TODO: Upload new image to Firebase Storage
            };
            reader.readAsDataURL(file);
        }
    });

    // Logout function (Simulated)
    logoutBtn.addEventListener("click", function () {
        alert("Logged out successfully!");
        window.location.href = "LOGIN.html"; // Redirect to login page
    });
});
