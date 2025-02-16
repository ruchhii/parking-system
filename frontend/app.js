document.addEventListener("DOMContentLoaded", () => {
    const API_BASE_URL = "http://parking-system-production.up.railway.app"; // ✅ Updated Backend URL
    const loginSection = document.getElementById("loginSection");
    const registerSection = document.getElementById("registerSection");
    const loginForm = document.getElementById("loginForm");
@@ -39,7 +41,7 @@ document.addEventListener("DOMContentLoaded", () => {
            const password = document.getElementById("loginPassword").value.trim();

            try {
                const response = await fetch("http://localhost:3000/login", {
                const response = await fetch(`${API_BASE_URL}/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password })
@@ -69,7 +71,7 @@ document.addEventListener("DOMContentLoaded", () => {
            const password = document.getElementById("adminPassword").value.trim();

            try {
                const response = await fetch("http://localhost:3000/admin/login", {
                const response = await fetch(`${API_BASE_URL}/admin/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password })
@@ -97,7 +99,7 @@ document.addEventListener("DOMContentLoaded", () => {
            const password = document.getElementById("registerPassword").value.trim();

            try {
                const response = await fetch("http://localhost:3000/register", {
                const response = await fetch(`${API_BASE_URL}/register`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password })
@@ -132,7 +134,7 @@ document.addEventListener("DOMContentLoaded", () => {
            }

            try {
                const response = await fetch("http://localhost:3000/api/slots", {
                const response = await fetch(`${API_BASE_URL}/api/slots`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
@@ -155,12 +157,3 @@ document.addEventListener("DOMContentLoaded", () => {
        });
    }
});
if (data.success) {
    localStorage.setItem("token", data.token); // ✅ Ensure token is saved
    localStorage.setItem("user_id", data.user_id);
    alert("Login successful!");
    window.location.href = "dashboard.html";
} else {
    alert(data.message || "Invalid login credentials.");
}
