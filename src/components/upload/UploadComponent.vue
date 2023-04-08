<template>
    <div class="uploader">
        <label for="file-upload" class="custom-file-upload">
            Choose File
        </label>
        <input @change="onInputChange()" id="file-upload" type="file"/>
    </div>
</template>

<script>

import { store } from '../../store';

export default {
    data() {
        return {
            store
        }
    },
    methods: {
        async onInputChange() {
            var file = document.getElementById('file-upload').files[0];
            console.log(file);
            var reader = new FileReader();
            var fileByteArray = [];
            reader.readAsArrayBuffer(file);
            reader.onloadend = function (evt) {
                if (evt.target.readyState == FileReader.DONE) {
                var arrayBuffer = evt.target.result,
                    array = new Uint8Array(arrayBuffer);
                for (var i = 0; i < array.length; i++) {
                    fileByteArray.push(array[i]);
                    }
                }
            }
            store.file = fileByteArray;
            store.fileName = file.name;
            store.fileType = file.type;
            console.log(store.fileName);

            this.$emit('isSelected', true);
        }
    }
}

</script>

<style scoped>

.uploader {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: calc(100vh - 30px);
}
input[type="file"] {
    display: none;
}
.custom-file-upload {
    border: 2px dashed #4b4b4b;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: 300;
    padding: 6px 12px;
    cursor: pointer;
    width: 90%;
    height: 90%;
    color: white;
}
</style>