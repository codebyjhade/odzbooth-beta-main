function updateDashboard() {
    const queue = JSON.parse(localStorage.getItem('odz_print_queue') || '[]');
    const indicator = document.getElementById('statusIndicator');
    
    if (indicator) indicator.innerText = `Batch Status: ${queue.length}/9`;

    // Matches IDs slot-1 to slot-9
    for (let i = 1; i <= 9; i++) {
        const slot = document.getElementById(`slot-${i}`);
        if (slot) {
            const data = queue[i-1]; // 0-indexed array
            if (data) {
                slot.style.backgroundImage = `url(${data})`;
                slot.style.backgroundColor = "transparent";
            } else {
                slot.style.backgroundImage = "none";
                slot.style.backgroundColor = "#eee";
            }
        }
    }
}

function clearQueue() {
    if(confirm("Clear current batch?")) {
        localStorage.setItem('odz_print_queue', JSON.stringify([]));
        updateDashboard();
    }
}

setInterval(updateDashboard, 1000);
window.onload = updateDashboard;
