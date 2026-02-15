function updateDashboard() {
    const queue = JSON.parse(localStorage.getItem('odz_print_queue') || '[]');
    document.getElementById('statusIndicator').innerText = `Queue Status: ${queue.length}/9`;
    
    // Fill the slots
    for (let i = 0; i < 9; i++) {
        const slot = document.getElementById(`slot-${i}`);
        if (queue[i]) {
            slot.style.backgroundImage = `url(${queue[i]})`;
        } else {
            slot.style.backgroundImage = 'none';
        }
    }

    // Enable/Disable print button
    const printBtn = document.getElementById('manualPrintBtn');
    printBtn.disabled = queue.length === 0;

    // Auto-reset and print logic
    if (queue.length === 9) {
        window.print();
        localStorage.setItem('odz_print_queue', '[]'); // Reset queue
        setTimeout(updateDashboard, 1000);
    }
}

function clearQueue() {
    if(confirm("Clear entire print queue?")) {
        localStorage.setItem('odz_print_queue', '[]');
        updateDashboard();
    }
}

// Check for updates frequently
setInterval(updateDashboard, 2000);
window.onload = updateDashboard;