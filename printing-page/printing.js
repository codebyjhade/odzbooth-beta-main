function updateDashboard() {
    const request = indexedDB.open("OdizeePrintingDB", 1);

    request.onsuccess = (e) => {
        const db = e.target.result;
        const transaction = db.transaction("print_queue", "readonly");
        const store = transaction.objectStore("print_queue");
        const getAllRequest = store.getAll();

        getAllRequest.onsuccess = () => {
            const queue = getAllRequest.result;
            document.getElementById('statusIndicator').innerText = `Batch Status: ${queue.length}/9`;

            for (let i = 1; i <= 9; i++) {
                const slot = document.getElementById(`slot-${i}`);
                if (slot) {
                    if (queue[i - 1]) {
                        slot.style.backgroundImage = `url(${queue[i - 1]})`;
                        slot.style.backgroundColor = "transparent";
                    } else {
                        slot.style.backgroundImage = "none";
                        slot.style.backgroundColor = "#f0f0f0";
                    }
                }
            }
        };
    };
}

function clearQueue() {
    if (confirm("Clear all high-res photos?")) {
        const request = indexedDB.open("OdizeePrintingDB", 1);
        request.onsuccess = (e) => {
            const db = e.target.result;
            db.transaction("print_queue", "readwrite").objectStore("print_queue").clear();
            updateDashboard();
        };
    }
}
