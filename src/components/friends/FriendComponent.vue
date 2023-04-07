<template>
    <i class="friend">
      <a href="pfp">
      </a>
      {{ name }}
      </i>
</template>

<script>
export default {
  name: 'FriendsComponent',
  components: {
  },
  props: {
    name: String,
  },
}
</script>

<style scoped>
  .friend {
    color: #fff;
    font-style: normal;
    background: #333333;
    padding: 20px 30px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    flex-direction: column;
    width: 150px;
    cursor: pointer;
  }

  a {
    background: rgb(252,186,129);
background: linear-gradient(90deg, rgba(252,186,129,1) 0%, rgba(231,166,110,1) 100%);
border-radius: 50%;
width: 60px;
height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  vertical-align: center;
  font-size: 3rem;
  font-weight: 800;
  color: #fff;
  text-decoration: none;
  font-style: none;
  }
</style>