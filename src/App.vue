<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Login</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
     <notifications group="default"/>
  </div>
</template>

<script>

export default {
  
}
</script>

<style lang="scss">
@import "~bootstrap/dist/css/bootstrap.min.css";
@import url('https://fonts.googleapis.com/css?family=Montserrat:500&display=swap');

</style>
