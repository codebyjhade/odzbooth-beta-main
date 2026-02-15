/**
 * Updates the visual grid based on localStorage data.
 * FIX: Matches IDs slot-1 through slot-9.
 */
function updateDashboard() {
    const queue = JSON.parse(localStorage.getItem('odz_print_queue') || '[]');
    const statusLabel = document.getElementById('statusIndicator');
    
    if (statusLabel) {
        statusLabel.innerText = `Batch Status: ${queue.length}/9`;
    }

    // Loop through all 9 slots
    for (let i = 1; i <= 9; i++) {
        const slot = document.getElementById(`slot-${i}`);
        if (slot) {
            // Arrays are 0-indexed, slots are 1-indexed
            const imageData = queue[i - 1];
            if (imageData) {
                slot.style.backgroundImage = `url(${imageData})`;
                slot.style.backgroundColor = "transparent";
            } else {
                slot.style.backgroundImage = "none";
                slot.style.backgroundColor = "#eee";
            }
        }
    }
}

function clearQueue() {
    if (confirm("Clear all photos in the current batch?")) {
        localStorage.setItem('odz_print_queue', JSON.stringify([]));
        updateDashboard();
    }
}

// Auto-refresh the dashboard every 2 seconds
setInterval(updateDashboard, 2000);
window.onload = updateDashboard;
