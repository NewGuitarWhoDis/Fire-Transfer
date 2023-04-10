<template>
    <div class="bar">
        <div class="left">
            <img src="https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/70345/cartoon-flame-clipart-md.png"
                class="logo" alt="">
            <h1>Fire Transfer</h1>
        </div>
        <div class="right">
            <button class="minimise" @click="minimise()"><i class="fa-solid fa-minus"></i></button>
            <button class="maximise" @click="maximise()"><i class="fa-regular fa-window-maximize"></i></button>
            <button class="close" @click="closeApp()"><i class="fa-solid fa-xmark"></i></button>
        </div>
    </div>
</template>

<script>
</script>

<style scoped>

.bar {
  width: 100vw;
  height: 30px;
  overflow: hidden;
  background: #181818;
  -webkit-app-region: drag;
  display: flex;
  justify-content: space-between;
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
    cursor: pointer;
}

.maximise {
    border: none;
    background: none;
    color: white;
    font-size: 1rem;
    cursor: pointer;
}

.minimise {
    border: none;
    background: none;
    color: white;
    font-size: 1.1rem;
    cursor: pointer;
}
</style>