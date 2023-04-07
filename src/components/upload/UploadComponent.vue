<template>
    <div class="uploader">
        <label for="file-upload" class="custom-file-upload">
            Choose File
        </label>
        <input @change="onInputChange()" id="file-upload" type="file"/>
    </div>
</template>

<script>
export default {
    methods: {
        onInputChange() {
            console.log('file selected');
            this.$emit('uploaded');
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