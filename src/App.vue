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
        <UploadComponent class="uploader"/>
        <FriendsComponent v-show="IfFileIsSelected" />
    </div>
  </div>
</template>

<script>
// imports
import MenuComponent from './components/menu/MenuComponent.vue'
import FriendsComponent from './components/friends/FriendsComponent.vue'
import UploadComponent from './components/upload/UploadComponent.vue'

export default {
  name: 'App',
  components: {
    MenuComponent,
    FriendsComponent,
    UploadComponent
  },
  data () {
    return {
    }
  },
  methods: {
    
  }
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
  bottom: 15px;
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
</style>
