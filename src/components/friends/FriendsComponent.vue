<template>
    <div class="friends">
        <FriendComponent name="NewGuitarWhoDis"/>
        <FriendComponent name="JoesFireTransferAccount"/>
        <FriendComponent name="Snitzels"/>
        <FriendComponent name="NewGuitarWhoDis"/>
        <FriendComponent name="JoesFireTransferAccount"/>
        <FriendComponent name="Snitzels"/>
        <FriendComponent name="NewGuitarWhoDis"/>
        <FriendComponent name="JoesFireTransferAccount"/>
        <FriendComponent name="Snitzels"/>
        <FriendComponent name="NewGuitarWhoDis"/>
        <FriendComponent name="JoesFireTransferAccount"/>
        <FriendComponent name="Snitzels"/>
    </div>
</template>

<script>
import FriendComponent from './FriendComponent.vue'

export default {
  name: 'FriendsComponent',
  components: {
    FriendComponent
  }
}
</script>

<style scoped>
  .friends {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
     gap: 20px;
     flex-wrap: wrap;
     width: 80vw;
     height: 80vh;
  }
</style>