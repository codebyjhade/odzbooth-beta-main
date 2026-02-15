let activeSlotId = null;

function triggerInput(slotNum) {
    activeSlotId = `slot-${slotNum}`;
    document.getElementById('manualFileInput').click();
}

function handleFile(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const slot = document.getElementById(activeSlotId);
            slot.style.backgroundImage = `url(${e.target.result})`;
            slot.classList.add('has-image');
            slot.querySelector('span').style.display = 'none';
        };
        reader.readAsDataURL(input.files[0]);
    }
    // Reset input so the same file can be picked for another slot
    input.value = '';
}

function resetTemplate() {
    if(confirm("Clear all slots?")) {
        document.querySelectorAll('.slot').forEach(slot => {
            slot.style.backgroundImage = 'none';
            slot.classList.remove('has-image');
            slot.querySelector('span').style.display = 'block';
        });
    }
}
