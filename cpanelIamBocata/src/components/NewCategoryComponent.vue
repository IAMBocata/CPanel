<template>
  <div class="container w-50 mt-3 pb-5 card">

    <p class="h1 text-center mb-2 mt-3 title">Nueva Categoría</p>
    
    <form @submit.prevent="submit">

        <div class="text-info ml-5 mr-5 ">
            <md-field>
                <label class="text-info">Nombre de categoría</label>
                <md-input v-model="name" type="text"></md-input>
            </md-field>
        </div>

        <input type="submit" class="btn btn-primary bg-warning border-0 mt-4" value="Crea Categoría">

    </form>
  </div>
</template>

<script>

import axios from 'axios'
import config from '../api/config.js'

export default {
  data() {
      return {
          name: ''
      }      
  }, 
  beforeCreate: function() {
    if (!this.$session.exists()) {
      this.$router.push('/')
    }
  },
  methods: {
    submit: function() {

        var url = config.host + config.paths.createCategory + 'API_KEY=' + config.apiKey
            + '&idUser=' + this.$session.get('userData').id + '&category=' + this.name;

        console.log(url)

        axios.get(url)
            .then( (res) => {
                this.name = '';
                this.$swal('Categoría creada')
            })
            .catch( (err) => {
                this.$swal('failako: ' + err)
            })
    }
  }
}
</script>

<style>

</style>
