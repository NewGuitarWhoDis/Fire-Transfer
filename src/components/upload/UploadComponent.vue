<template>
    <div class="uploading" v-if="uploading">
                Uploading...
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
            console.log(`File Info: \n
            Name: ${file.name} \n
            Size: ${file.size} \n
            Type: ${file.type} \n
            Last Modified: ${file.lastModified}`);

            // Handle 0 size files
            if (file.size == 0) {
                console.log('File is empty');
                return;
            }

            reader = new FileReader();

            // Handle Errors
            reader.addEventListener('error', error => console.error('Error reading file:', error));
            reader.addEventListener('abort', event => console.log('File reading aborted:', event));

            var fileByteArray = [];
            reader.readAsArrayBuffer(file);
            reader.onprogress = updateProgress;
            reader.onloadend = function (evt) {
                if (evt.target.readyState == FileReader.DONE) {
                    var arrayBuffer = evt.target.result,
                    array = new Uint8Array(arrayBuffer);
                    this.uploadProgressMax = array.length;
                    for (var i = 0; i < array.length; i++) {
                        reader.onprogress = updateProgress;
                        // store.uploadProgressValue = i + 1;
                        fileByteArray.push(array[i]);
                    }
                }
                store.file = fileByteArray;
                store.fileName = file.name;
                store.fileType = file.type;

                if (file.size == fileByteArray.length) {
                    console.log('File read successfully');
                    store.isSelected = true;
                } else {
                    console.log('File read failed');
                    return;
                }
            }
        }
    }
}

function updateProgress(evt) {
    // evt is an ProgressEvent.
    // var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
        store.uploadProgressValue = evt.loaded;
        store.uploadProgressMax = evt.total;
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

.uploading {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 2rem;
    font-weight: 300;
    color: white;
    gap: 20px;
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

progress {
  width: 70vw;
  height: 20px;
}
progress::-webkit-progress-value {
  /* style rules */
}
</style>