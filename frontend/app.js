document.addEventListener("DOMContentLoaded", () => {
    const API_BASE_URL = process.env.REACT_APP_API_URL || "https://parking-system.up.railway.app"; // ✅ Set from environment variable

    const loginSection = document.getElementById("loginSection");
    const registerSection = document.getElementById("registerSection");
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const username = document.getElementById("loginUsername").value.trim();
        const password = document.getElementById("loginPassword").value.trim();

        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            if (data.success) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user_id", data.user_id);
                alert("Login successful!");
                window.location.href = "dashboard.html";
            } else {
                alert(data.message || "Invalid login credentials.");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("An error occurred. Please try again.");
        }
    });

    const adminLoginForm = document.getElementById("adminLoginForm");
    adminLoginForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const username = document.getElementById("adminUsername").value.trim();
        const password = document.getElementById("adminPassword").value.trim();

        try {
            const response = await fetch(`${API_BASE_URL}/admin/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            if (data.success) {
                alert("Admin login successful!");
                window.location.href = "admin-dashboard.html";
            } else {
                alert(data.message || "Invalid admin credentials.");
            }
        } catch (error) {
            console.error("Admin login error:", error);
            alert("An error occurred. Please try again.");
        }
    });

    const registerForm = document.getElementById("registerForm");
    registerForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const username = document.getElementById("registerUsername").value.trim();
        const password = document.getElementById("registerPassword").value.trim();

        try {
            const response = await fetch(`${API_BASE_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            if (data.success) {
                alert("Registration successful! Please login.");
                window.location.href = "index.html";
            } else {
                alert(data.message || "Registration failed.");
            }
        } catch (error) {
            console.error("Registration error:", error);
            alert("An error occurred. Please try again.");
        }
    });

    async function fetchSlots() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/slots`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });

            const data = await response.json();
            if (data.success) {
                console.log("Slots loaded:", data.slots);
            } else {
                alert("Failed to load parking slots.");
            }
        } catch (error) {
            console.error("Slot fetch error:", error);
        }
    }

    fetchSlots();
});
