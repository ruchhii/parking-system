const API_BASE_URL = process.env.REACT_APP_API_URL || "https://parking-system.up.railway.app"; // ✅ Dynamic API URL

function loadAvailableSlots() {
    fetch(`${API_BASE_URL}/api/slots`)
        .then(response => response.json())
        .then(slots => {
            const availableSlots = document.getElementById('availableSlots');
            availableSlots.innerHTML = '';

            slots.forEach(slot => {
                if (slot.is_available) {
                    availableSlots.innerHTML += `
                        <div>
                            ${slot.slot_number} 
                            <button onclick="bookSlot(${slot.id})">Book</button>
                        </div>`;
                }
            });
        })
        .catch(error => {
            console.error('❌ Error fetching slots:', error);
            alert('⚠️ Error loading available slots. Please try again later.');
        });
}

function bookSlot(slotId) {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("⚠️ Please log in to book a slot.");
        window.location.href = "index.html";
        return;
    }

    fetch(`${API_BASE_URL}/api/bookings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // ✅ Token sent for authentication
        },
        body: JSON.stringify({ slot_id: slotId })
    })
    .then(response => {
        console.log("Response Status:", response.status); // ✅ Debugging Step
        return response.json();
    })
    .then(data => {
        console.log("Response Data:", data); // ✅ Debugging Step

        if (data.success) {
            alert("✅ Slot booked successfully!"); 
            loadAvailableSlots(); // ✅ Refresh available slots after booking
        } else {
            alert("❌ Error: " + (data.message || "Failed to book slot."));
        }
    })
    .catch(error => {
        console.error("❌ Error booking slot:", error);
        alert("⚠️ An error occurred while booking the slot. Please try again.");
    });
}

// ✅ Load slots when page loads
document.addEventListener("DOMContentLoaded", loadAvailableSlots);
