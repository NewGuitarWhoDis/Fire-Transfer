<template>
  <div class="app">
    <BarComponent />
    <div class="display">
      <FriendsComponent v-if="store.isSelected" />
      <UploadComponent @fileSelected="fileSelected" v-else class="uploader" />
      <SendRequest :name="store.senderName" v-if="store.sendRequest" />
      <ToggleSwitch />
      <p class="userid" @click="copyID()">Click Here to copy ID to clipboard</p>
    </div>
  </div>
</template>

<script>
// imports
import MenuComponent from './components/menu/MenuComponent.vue'
import BarComponent from './components/menu/BarComponent.vue'
import FriendsComponent from './components/friends/FriendsComponent.vue'
import UploadComponent from './components/upload/UploadComponent.vue'
import SendRequest from './components/sendRequest.vue'
import ToggleSwitch from './components/toggleSwitch.vue'

import { store } from './store';

var peer = new Peer();

getVersion();

export default {
  name: 'App',
  components: {
    MenuComponent,
    FriendsComponent,
    UploadComponent,
    SendRequest,
    BarComponent,
    ToggleSwitch
  },
  data() {
    return {
      isFileSelected: false,
      FileSelected: [],
      store,
      receiveProgressValue: 0,
    }
  },
  methods: {
    fileSelected(value) {
      this.FileSelected = value;
    },
    copyID() {
      navigator.clipboard.writeText(this.store.id);
    }
  }
}

peer.on('open', function (id) {
  console.log('My peer ID is: ' + id);
  store.id = id;
  console.log(store.id);
});

let receivedSize = 0;
let receiveBuffer = [];

peer.on('connection', function (conn) {
  store.conn = conn;
  console.log('connected');
  conn.send("hello!")

  if (store.recieveEnabled == false) {
    conn.close();
    console.log('connection closed');
  } else {
    store.sendRequest = true;
    store.senderName = conn.peer;
  }
  conn.on('data', function (data) {
    console.log(data);
    if (data.fileName && data.fileType && data.fileSize) {
      store.recievedFileName = data.fileName;
      store.recievedFileType = data.fileType;
      store.recievedFileSize = data.fileSize;
      console.log("Received file info");
    } else {
      console.log(`Received Message ${data.byteLength}`);
      receiveBuffer.push(data);
      receivedSize += data.byteLength;
      store.receiveProgressValue = receivedSize;

      if (receivedSize == store.recievedFileSize) {
        console.log("Received all data");

        const received = new Blob(receiveBuffer);

        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(received);
        link.download = store.recievedFileName;
        link.click();

        receivedSize = 0;
      }
    }
  });
});

function getVersion() {
  var txt = "";
  // sample url used here, you can make it more dynamic as per your need.
  // used AJAX here to just hit the url & get the page source from those website. It's used here like the way CURL or file_get_contents (https://www.php.net/manual/en/function.file-get-contents.php) from PHP used to get the page source.
  $.ajax({
    url: "https://newguitarwhodis.github.io/Fire-Transfer/",
    error: function () {
      txt = "Unable to retrieve webpage source HTML";
    },
    success: function (response) {
      // will get the output here in string format
      // used $.parseHTML to get DOM elements from the retrieved HTML string. Reference: https://api.jquery.com/jquery.parsehtml/
      response = $.parseHTML(response);
      $.each(response, function (i, el) {
        if (el.nodeName.toString().toLowerCase() == 'meta' && $(el).attr("name") != null && typeof $(el).attr("name") != "undefined") {
          if ($(el).attr("name") == "version") {
            if ($(el).attr("content") != "1.0.0") {
              alert("New version available! Please download the latest version from https://newguitarwhodis.github.io/Fire-Transfer/");
            }
          }

          // txt += $(el).attr("name") +"="+ ($(el).attr("content")?$(el).attr("content"):($(el).attr("value")?$(el).attr("value"):"")) +"<br>";
          // console.log($(el).attr("name") ,"=", el);
        }
      });
    },
  });
}

</script>

<style>
/* roboto font */
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');

#app,
.display,
.app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #181818;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  position: relative;
  -webkit-user-select: none;
}

.display {
  display: flex;
  align-items: center;
  justify-content: center;
}

.uploader {
  position: relative;
  bottom: 24px;
}

h1 {
  color: white;
  font-size: 1rem;
  font-weight: 400;
  padding: 10px 20px 0px 10px;
  margin: 0px;
  margin-left: 0px;
  cursor: pointer;
  width: 90%;
  height: 90%;
  color: white;
}

.userid {
  position: absolute;
  bottom: 23px;
  right: 15px;
  color: rgb(105, 105, 105);
  cursor: pointer;
}
</style>
