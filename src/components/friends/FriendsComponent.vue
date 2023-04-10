<template>
    <!-- <a @click="this.$emit('isSelected', false)">Back</a> -->
    <div class="sending" v-if="sending">
                Sending...
            <progress id="uploadProgress" :max="ProgressMax" :value="sendProgressValue"></progress>
    </div>
    <div v-else-if="completed" class="complete">
      File Transfer Complete!
    </div>
    <div class="friends" v-else>
        <!-- <FriendComponent name="NewGuitarWhoDis"/> -->
        <h2>Friends ID:</h2>
        <input id="Inputid" type="text">
        <div class="buttons">
          <button @click="Submit()">Connect</button>
          <button @click="SendFile()">Send File</button>
        </div>
        <!-- <progress id="sendProgress" :max="store.ProgressMax" :value="store.sendProgressValue"></progress> -->
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
      store,
      sendProgressValue: 0,
      ProgressMax: 0,
      sending: false,
      completed: false,
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
      this.sending = true;
      // conn.send({ fileName: store.fileName, fileType: store.fileType, file: store.file });
      var file = store.uploadedFile;

      this.ProgressMax = file.size;
      const chunkSize = 16384;
      let offset = 0;

      var fileReader = new FileReader();

      console.log(file);
      var fileSize = file.size;

      // error handling
      fileReader.addEventListener('error', error => console.error('Error reading file:', error));
      fileReader.addEventListener('abort', event => console.log('File reading aborted:', event));

      conn.send({ fileName: file.name, fileType: file.type, fileSize: file.size });

      console.log(file);

      fileReader.addEventListener('load', e => {
        console.log('FileRead.onload ', e);
        conn.send(e.target.result);
        offset += e.target.result.byteLength;
        this.sendProgressValue = offset;
        if (offset < fileSize) {
          readSlice(offset);
        }
      });
      const readSlice = o => {
        console.log('readSlice ', o);
        const slice = file.slice(offset, o + chunkSize);
        fileReader.readAsArrayBuffer(slice);
      };
      readSlice(0);
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

  .sending, .complete {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 2rem;
    font-weight: 300;
    color: white;
    gap: 20px;
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
</style>