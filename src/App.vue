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
      <p class="userid" @click="copyID()">Click Here to copy ID to clipboard</p>
    </div>
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
      store
    }
  },
  methods: {
    closeApp: function() {
      window.close();
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

peer.on('connection', function(conn) 
{ 
    console.log('peer connected');
    this.sendRequest = true;
    conn.on('open', function() {
    });
    conn.on('data', function(data) {
        console.log(data);
        saveByteArrayToFile(data.file, data.fileName, data.fileType);
    });
});

function saveByteArrayToFile(byteArray, fileName, fileType) {
  var bytes = new Uint8Array(byteArray); // pass your byte response to this constructor

  var blob=new Blob([bytes], {type: fileType});// change resultByte to bytes

  var link=document.createElement('a');
  link.href=window.URL.createObjectURL(blob);
  link.download=fileName;
  link.click();  
  
  // var blob = new Blob([byteArray], {type: "application/pdf"});
    // var url = URL.createObjectURL(blob);
    // var a = document.createElement("a");
    // document.body.appendChild(a);
    // a.style = "display: none";
    // a.href = url;
    // a.download = fileName;
    // a.click();
    // URL.revokeObjectURL(url);
}

function getVersion() {
  var txt = "";
  // sample url used here, you can make it more dynamic as per your need.
  // used AJAX here to just hit the url & get the page source from those website. It's used here like the way CURL or file_get_contents (https://www.php.net/manual/en/function.file-get-contents.php) from PHP used to get the page source.
  $.ajax({
      url: "https://jsfiddle.net/",
			error: function() {
				txt = "Unable to retrieve webpage source HTML";
			}, 
      success: function(response){
          // will get the output here in string format
          // used $.parseHTML to get DOM elements from the retrieved HTML string. Reference: https://api.jquery.com/jquery.parsehtml/
          response = $.parseHTML(response);
          $.each(response, function(i, el){
              if(el.nodeName.toString().toLowerCase() == 'meta' && $(el).attr("name") != null && typeof $(el).attr("name") != "undefined"){
                  txt += $(el).attr("name") +"="+ ($(el).attr("content")?$(el).attr("content"):($(el).attr("value")?$(el).attr("value"):"")) +"<br>";
                  console.log($(el).attr("name") ,"=", ($(el).attr("content")?$(el).attr("content"):($(el).attr("value")?$(el).attr("value"):"")), el);
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
  bottom: 15px;
  right: 15px;
  color: rgb(105, 105, 105);
  cursor: pointer;
}
</style>
