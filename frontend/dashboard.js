const API_BASE_URL = process.env.REACT_APP_API_URL || "https://parking-system.up.railway.app"; // ✅ Dynamic API URL

document.addEventListener('DOMContentLoaded', () => {
    fetchAvailableSlots();
    setupUserInterface();
});

function fetchAvailableSlots() {
    fetch(`${API_BASE_URL}/api/slots`)
        .then(response => response.json())
        .then(slots => {
            const availableSlots = document.getElementById('availableSlots');
            availableSlots.innerHTML = '';

            slots.forEach(slot => {
                if (slot.is_available) {
                    const slotDiv = document.createElement('div');
                    slotDiv.classList.add('slot');
                    slotDiv.innerText = `Slot ${slot.slot_number}`;
                    slotDiv.addEventListener('click', () => bookSlot(slot.id));
                    availableSlots.appendChild(slotDiv);
                }
            });
        })
        .catch(error => {
            console.error("❌ Error fetching slots:", error);
            alert("⚠️ Error loading available slots. Please try again later.");
        });
}

function bookSlot(slotId) {
    const userId = localStorage.getItem('user_id');

    if (!userId) {
        alert("⚠️ Please log in to book a slot.");
        window.location.href = "index.html";
        return;
    }

    fetch(`${API_BASE_URL}/api/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, slot_id: slotId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("✅ Slot booked successfully!");
            fetchAvailableSlots(); // ✅ Refresh slot availability
        } else {
            alert("❌ Error: " + (data.message || "Failed to book slot."));
        }
    })
    .catch(error => {
        console.error("❌ Error booking slot:", error);
        alert("⚠️ An error occurred while booking. Please try again.");
    });
}

function setupUserInterface() {
    const username = localStorage.getItem('username');
    document.getElementById('username').textContent = username || 'User';

    // Redirect to booking page when clicking the button
    document.getElementById('bookSlotBtn').addEventListener('click', () => {
        window.location.href = 'booking.html';
    });

    // Logout functionality
    document.getElementById('logout').addEventListener('click', () => {
        localStorage.clear();
        window.location.href = 'index.html';
    });
}
