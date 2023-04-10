<template>
    <div class="toggle">
        <label class="switch">
            <input @click="toggleRecieve" type="checkbox">
            <span class="slider round"></span>
        </label>
        <p>Recieve Files</p>
    </div>
</template>

<script>
import { store } from '../store';

export default ({
    data() {
        return {
            store,
        }
    },
    methods: {
        toggleRecieve() {
            if (store.recieveEnabled == false) {
                store.recieveEnabled = true;
            }
            else {
                store.recieveEnabled = false;
            }
        },
    }
})
</script>

<style scoped>
.toggle {
    position: absolute;
    bottom: 25px;
    left: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: rgb(105, 105, 105);
}

.switch {
    position: relative;
    display: inline-block;
    width: 35px;
    height: 20px;
    cursor: pointer;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

/* The slider */
.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #3f3f3f;
    -webkit-transition: .4s;
    transition: .4s;
}

.slider:before {
    position: absolute;
    content: "";
    height: 12px;
    width: 12px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
}

input:checked+.slider {
    background-color: #2196F3;
}

input:focus+.slider {
    box-shadow: 0 0 1px #2196F3;
}

input:checked+.slider:before {
    -webkit-transform: translateX(14px);
    -ms-transform: translateX(14px);
    transform: translateX(14px);
}

/* Rounded sliders */
.slider.round {
    border-radius: 34px;
}

.slider.round:before {
    border-radius: 50%;
}
</style>
