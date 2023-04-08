<template>
    <!-- <a @click="this.$emit('isSelected', false)">Back</a> -->
    <div class="friends">
        <!-- <FriendComponent name="NewGuitarWhoDis"/> -->
        <h2>Friends ID:</h2>
        <input id="Inputid" type="text">
        <div class="buttons">
          <button @click="Submit()">Connect</button>
          <button @click="SendFile()">Send File</button>
        </div>
      </div>
</template>

<script>
import FriendComponent from './FriendComponent.vue'
import { store } from '../../store';
var peer = new Peer();
var conn;

export default {
  name: 'FriendsComponent',
  components: {
    FriendComponent
  },
  data() {
    return {
      store
    }
  },
  methods: {
    Submit(e) {
      // get the value of the input
      let id = document.getElementById('Inputid').value;
      conn = peer.connect(id);

      peer.on('error', function(err){
        console.log('error');
      });
    },
    SendFile() {
      conn.send({ fileName: store.fileName, fileType: store.fileType, file: store.file });
    }
  }
}
</script>

<style scoped>
  .friends {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
     /* gap: 20px;
     flex-wrap: wrap; */
     width: 80vw;
     height: 80vh;
     position: relative;
     bottom: 30px;
  }

  h2 {
    font-size: 1.5rem;
    color: rgb(192, 192, 192);
    margin: 0px;
  }

  input {
    width: 300px;
    height: 20px;
    border-radius: 5px;
    border: none;
    padding: 5px;
    margin: 10px;
    font-size: 1rem;
    color: rgb(192, 192, 192);
    background: transparent;
    border: 2px solid rgb(64, 64, 64);
  }
  button {
    width: 100px;
    height: 30px;
    border-radius: 5px;
    border: none;
    padding: 5px;
    margin: 10px;
    font-size: 1rem;
    color: rgb(192, 192, 192);
    background: transparent;
    border: 2px solid rgb(64, 64, 64);
  }
</style>