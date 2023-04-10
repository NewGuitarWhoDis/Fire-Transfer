<template>
    <div class="popup">
        <h1>{{ name }} would like to send you a file!</h1>
        <div class="buttons">
            <button @click="accept()" class="accept">Accept</button>
            <button @click="decline()" class="decline">Decline</button>
        </div>
    </div>
</template>

<script>
import { store } from '../store';

var peer = new Peer();
var conn;

export default {
    props: ['name'],
    data() {
        return {
            store
        }
    },
    methods: {
        accept() {

            conn = peer.connect(store.conn.peer);
            conn.send('accept');

        },
        decline() {
            conn = peer.connect(store.conn.peer);
            conn.send('decline');
        }
    }
}
</script>

<style scoped>
h1 {
    color: white;
    font-size: 1rem;
    margin: 0;
    padding: 10px 10px;
    cursor: default;
}

.buttons {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

button {
    border: none;
    padding: 5px 10px;
    margin: 5px;
    border-radius: 5px;
    font-size: 1rem;
    font-weight: 100;
    cursor: pointer;
}

.accept {
    background: rgb(132, 255, 132);
    color: rgb(0, 0, 0);
}

.decline {
    background: rgb(255, 154, 154);
    color: rgb(0, 0, 0);
}

.popup {
    position: absolute;
    bottom: 65px;
    right: 0px;
    background: rgb(36, 36, 36);
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    filter: drop-shadow(-2px 5px 5px rgba(0, 0, 0, 0.219));
    padding: 5px 20px 5px 5px;
    white-space:nowrap;
    cursor: default;
}
</style>