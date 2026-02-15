const DB_NAME = "OdizeePrintingDB";
const STORE_NAME = "print_queue";

function updateDashboard() {
    const request = indexedDB.open(DB_NAME, 1);

    request.onsuccess = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) return;

        const transaction = db.transaction(STORE_NAME, "readonly");
        const store = transaction.objectStore(STORE_NAME);
        const getAllRequest = store.getAll();

        getAllRequest.onsuccess = () => {
            const queue = getAllRequest.result;
            const indicator = document.getElementById('statusIndicator');
            if (indicator) indicator.innerText = `Batch Status: ${queue.length}/9`;

            // Map data to slots slot-1 through slot-9
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
    if (confirm("Permanently delete all high-res photos in this batch?")) {
        const request = indexedDB.open(DB_NAME, 1);
        request.onsuccess = (e) => {
            const db = e.target.result;
            const transaction = db.transaction(STORE_NAME, "readwrite");
            transaction.objectStore(STORE_NAME).clear();
            transaction.oncomplete = () => updateDashboard();
        };
    }
}

setInterval(updateDashboard, 1500);
window.onload = updateDashboard;
