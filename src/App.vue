<template>
  <div class="app">
    <div class="bar">
      <div class="left">
        <img src="https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/70345/cartoon-flame-clipart-md.png" class="logo" alt="">
        <h1>Fire Transfer</h1>
      </div>
      <div class="right">
        <button class="close" @click="closeApp">X</button>
      </div>
    </div>
    <div class="display">
      <FriendsComponent v-if="store.isSelected" />
      <UploadComponent @fileSelected="fileSelected" v-else class="uploader"/>
      <!-- <sendRequest v-if="sendRequest" /> -->
      <div class="toggle">
        <label class="switch">
         <input @click="toggleRecieve" type="checkbox">
         <span class="slider round"></span>
        </label>
        <p>Recieve Files</p>
      </div>
      </div>
      <p class="userid" @click="copyID()">Click Here to copy ID to clipboard</p>
  </div>
</template>

<script>
// imports
import MenuComponent from './components/menu/MenuComponent.vue'
import FriendsComponent from './components/friends/FriendsComponent.vue'
import UploadComponent from './components/upload/UploadComponent.vue'
import sendRequest from './components/sendRequest.vue'

import { store } from './store';

var peer = new Peer();

getVersion();

export default {
  name: 'App',
  components: {
    MenuComponent,
    FriendsComponent,
    UploadComponent,
    sendRequest
  },
  data() {
    return {
      isFileSelected: false,
      sendRequest: false,
      FileSelected: [],
      store,
      receiveProgressValue: 0,
    }
  },
  methods: {
    closeApp: function() {
      window.close();
    },
    toggleRecieve() {
      if (store.recieveEnabled == false) {
        store.recieveEnabled = true;
      }
      else {
        store.recieveEnabled = false;
      }
    },
    fileSelected(value) {
      this.FileSelected = value;
    },
    copyID() {
      navigator.clipboard.writeText(this.store.id);
    }
  }
}

peer.on('open', function(id) {
  console.log('My peer ID is: ' + id);
  store.id = id;
  console.log(store.id);
});

let receivedSize = 0;
let receiveBuffer = [];

peer.on('connection', function(conn) 
{ 
  if (store.recieveEnabled == false) {
        conn.close();
        console.log('connection closed');
      }
      else {
        console.log('connection Recieved');
        conn.send('Connection Recieved!');
        this.sendRequest = true;
        conn.on('data', function(data) {

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
              
              var link=document.createElement('a');
              link.href=window.URL.createObjectURL(received);
              link.download=store.recievedFileName;
              link.click();  

              receivedSize = 0;
            }
          }
        });
      }
});

function getVersion() {
  var txt = "";
  // sample url used here, you can make it more dynamic as per your need.
  // used AJAX here to just hit the url & get the page source from those website. It's used here like the way CURL or file_get_contents (https://www.php.net/manual/en/function.file-get-contents.php) from PHP used to get the page source.
  $.ajax({
      url: "https://newguitarwhodis.github.io/Fire-Transfer/",
			error: function() {
				txt = "Unable to retrieve webpage source HTML";
			}, 
      success: function(response){
          // will get the output here in string format
          // used $.parseHTML to get DOM elements from the retrieved HTML string. Reference: https://api.jquery.com/jquery.parsehtml/
          response = $.parseHTML(response);
          $.each(response, function(i, el){
              if(el.nodeName.toString().toLowerCase() == 'meta' && $(el).attr("name") != null && typeof $(el).attr("name") != "undefined"){
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
      complete: function(){
          console.log(txt);
      }
  });
}

</script>

<style>
  /* roboto font */
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');

.bar {
  width: 100vw;
  height: 30px;
  overflow: hidden;
  background: #181818;
  -webkit-app-region: drag;
  display: flex;
  justify-content: space-between;
}
#app, .display, .app {
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

.logo {
  height: 25px;
  margin: 5px;
  margin-left: 15px;
  cursor: pointer;
  -webkit-app-region: no-drag;
}

.left {
  display: flex;
}

.right {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  padding-right: 10px;
}

.close {
  border: none;
  background: none;
  color: white;
  font-size: 1.1rem;
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
  bottom: -6px;
  right: 15px;
  color: rgb(105, 105, 105);
  cursor: pointer;
}

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

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
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
