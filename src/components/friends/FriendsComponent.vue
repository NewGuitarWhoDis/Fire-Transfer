<template>
    <div class="friends">
        <!-- <FriendComponent name="NewGuitarWhoDis"/> -->
        <p>Friends ID</p>
        <input id="Inputid" type="text">
        <button @click="Submit()">Submit</button>
        <button @click="SendFile()">Send File</button>
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
  }
</style>