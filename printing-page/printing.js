let targetSlot = null;
        let shouldRotate = false;
        const picker = document.getElementById('filePicker');

        function upload(slot, rotate) {
            targetSlot = slot;
            shouldRotate = rotate;
            picker.click();
        }

        picker.onchange = function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (shouldRotate) {
                        rotateImage(e.target.result, targetSlot);
                    } else {
                        targetSlot.style.backgroundImage = `url('${e.target.result}')`;
                        targetSlot.innerText = '';
                    }
                };
                reader.readAsDataURL(this.files[0]);
            }
            this.value = ''; 
        };

        function rotateImage(src, slot) {
            const img = new Image();
            img.src = src;
            img.onload = function() {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.height;
                canvas.height = img.width;
                ctx.translate(canvas.width / 2, canvas.height / 2);
                ctx.rotate(90 * Math.PI / 180);
                ctx.drawImage(img, -img.width / 2, -img.height / 2);
                slot.style.backgroundImage = `url('${canvas.toDataURL()}')`;
                slot.innerText = '';
            };
        }
