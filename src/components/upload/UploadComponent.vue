<template>
    <div class="uploading" v-if="uploading">
                Sending...
            <progress id="uploadProgress" :max="store.uploadProgressMax" :value="store.uploadProgressValue"></progress>
    </div>
    <div v-else class="uploader">
        <label for="file-upload" class="custom-file-upload">
            Choose File
        </label>
        <input @change="onInputChange()" id="file-upload" type="file" />
    </div>
</template>

<script>
var reader;

import { store } from '../../store';

export default {
    data() {
        return {
            store,
            uploading: false,
            // uploadProgressMax: 0,
        }
    },
    methods: {
        setisSelected() {
            this.$emit('isSelected', true);
        },
        async onInputChange() {
            // Show Loading Screen
            this.uploading = true;

            // Get File from Input Element
            var file = document.getElementById('file-upload').files[0];

            store.uploadedFile = file;
            store.isSelected = true;
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
    height: 87vh;
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