<template>
  <div id="app">
    <div class="content">
      <LJ/>
      <LDYCB/>
    </div>
  </div>
</template>

<script>
import LJ from './components/LJ';
import LDYCB from './components/LDYCB';

export default {
  name: 'App',
  components:{LJ,LDYCB},
}
</script>

<style>
@import "./css/index.css";
</style>
