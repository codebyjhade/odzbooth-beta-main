/**
 * Monitors the localStorage queue and updates the A4 layout slots.
 */
function updateDashboard() {
    // Retrieve existing queue or default to empty array
    const queue = JSON.parse(localStorage.getItem('odz_print_queue') || '[]');
    const statusIndicator = document.getElementById('statusIndicator');
    
    if (statusIndicator) {
        statusIndicator.innerText = `Batch Status: ${queue.length}/9`;
    }

    // FIX: Loop from 1 to 9 to match HTML IDs: slot-1, slot-2... slot-9
    for (let i = 1; i <= 9; i++) {
        const slot = document.getElementById(`slot-${i}`);
        if (slot) {
            // Arrays are 0-indexed, so we use i-1 to get the correct photo
            if (queue[i - 1]) {
                slot.style.backgroundImage = `url(${queue[i - 1]})`;
                slot.style.backgroundColor = "transparent";
            } else {
                slot.style.backgroundImage = "none";
                slot.style.backgroundColor = "#eee";
            }
        }
    }

    // Auto-trigger print when the batch is full
    if (queue.length === 9) {
        triggerBatchPrint();
    }
}

function triggerBatchPrint() {
    window.print();
    // Clear storage after printing
    setTimeout(() => {
        localStorage.setItem('odz_print_queue', JSON.stringify([]));
        updateDashboard();
    }, 2000);
}

function clearQueue() {
    if (confirm("Are you sure you want to clear the entire queue?")) {
        localStorage.setItem('odz_print_queue', JSON.stringify([]));
        updateDashboard();
    }
}

// Check for updates every 2 seconds
setInterval(updateDashboard, 2000);
window.onload = updateDashboard;
