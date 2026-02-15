let activeSlotId = null;

/**
 * Triggers the hidden file input for a specific slot number.
 */
function triggerInput(slotNum) {
    activeSlotId = `slot-${slotNum}`;
    const fileInput = document.getElementById('manualFileInput');
    if (fileInput) fileInput.click();
}

/**
 * Handles the manual file selection and updates the slot background.
 */
function handleFile(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const slot = document.getElementById(activeSlotId);
            if (slot) {
                slot.style.backgroundImage = `url(${e.target.result})`;
                // Hide the placeholder text upon insertion
                const span = slot.querySelector('span');
                if (span) span.style.display = 'none';
            }
        };
        reader.readAsDataURL(input.files[0]);
    }
    input.value = ''; // Reset for re-selection
}

/**
 * Resets the entire A4 template for a new batch.
 */
function resetTemplate() {
    if (confirm("Reset the 19th Anniversary template?")) {
        document.querySelectorAll('.slot').forEach(slot => {
            slot.style.backgroundImage = 'none';
            const span = slot.querySelector('span');
            if (span) span.style.display = 'block';
        });
    }
}
