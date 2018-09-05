<template>
  <div id="app" class="pb-5" >
    <a href="/#/Home">
      <img width="350" src="./assets/iconbocata.png" class="mt-5 mb-4">
    </a>
    <router-view />
  </div>
</template>

<script>
import LoginComponent from './components/LoginComponent.vue'
import ProductComponent from './components/ProductComponent.vue'
import MenuComponent from './components/MenuComponent.vue'
import NewUserComponent from './components/NewUserComponent.vue'
import NewProductComponent from './components/NewProductComponent.vue'
import NewCategoryComponent from './components/NewCategoryComponent.vue'

export default {
  name: 'App',
  components: {
    LoginComponent,
    ProductComponent,
    MenuComponent,
    NewUserComponent,
    NewProductComponent,
    NewCategoryComponent
  }
}
</script>

<style lang="scss">
@import '../node_modules/bootstrap/scss/bootstrap.scss';
@import url('https://unpkg.com/vue-material@beta/dist/vue-material.min.css');
@import url('https://unpkg.com/vue-material@beta/dist/theme/default.css');
@import url("http://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300ita‌​lic,400italic,500,500italic,700,700italic,900italic,900");

#app {
  font-family: 'Roboto';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

.title {
  font-family: 'Roboto Thin';
}

</style>
