<template>
  <div id="app">
    <div class="content">
      <LJ/>
      <LDYCB/>
      <LDECB/>
      <LQB/>
      <LQT/>
    </div>
  </div>
</template>

<script>
import LJ from './components/LJ';
import LDYCB from './components/LDYCB';
import LDECB from './components/LDECB';
import LQB from './components/LQB';
import LQT from './components/LQT';

export default {
  name: 'App',
  components:{LJ,LDYCB,LDECB,LQB,LQT},
}
</script>

<style>
@import "./css/index.css";
</style>
