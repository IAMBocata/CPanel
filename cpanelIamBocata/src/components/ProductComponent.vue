<template>
  <div class="card mt-5 mb-5 w-25">
      <img class="card-img-top" :src="photo" alt="Card image cap" />
      <div class="card-body">
        <p class="card-title title h4"><u>{{ name }}</u></p>
        
        <div class="row mb-4">
          <div class="col-sm">
            <p class="h2">{{ price }} €</p>
            <div>Categoria: </div>
            <p class="card-text badge badge-warning"> {{ category }} </p>
          </div>

          <div class="col-sm mr-3">
            <div class="text-right">Ingredients:</div>
            <template v-for="ingredient in ingredients">    
                <div v-bind:key="ingredient" class="text-right">
                  <p class="card-text badge badge-success"> {{ingredient}} </p>
                </div>
            </template>
          </div>
        </div>

        <span class="row mb-2  ml-4">
          <p class="card-text"> 
            Habilitat 
            <toggle-button class="ml-1 mr-4" v-model="enabled" />
            Del dia 
            <toggle-button v-model="oftheday" /> 
          </p> 
        </span>

      </div>
  </div>
</template>

<script>

import axios from 'axios'
import config from '../api/config.js'

export default {
  props: {
    bocata: {
        type: Object
    }
  },
  data() {
    return {
      name: this.bocata.name,
      price: this.bocata.price,
      category: this.bocata.category,
      ingredients: this.bocata.ingredients,
      enabled: this.bocata.enabled,
      oftheday: this.bocata.oftheday,
      photo: config.host + '/' + this.bocata.photoPath
    }
  },
  components: {
  },
  created() {
  },
  mounted() {
  },
  methods: {
    viewBoolean() {
      console.log('Enabled: ' +  this.enabled)
      console.log('oftheday: ' +  this.oftheday)
    }
  },
  watch: {
    enabled(val) {
      if (val) {

        var url = config.host + config.paths.enableProduct + 'idUser=' +
          this.$session.get('userData').id + '&idProduct=' + this.bocata.id +
          '&API_KEY=' + config.apiKey;

        axios.get(url)
          .then( (res) => {
            if (res.data.done) {
              this.$swal('Producto habilitado')
            }
          })
          .catch( (err) => {
            this.$swal('failako: ' + err)
          })
      } else {
        var url = config.host + config.paths.disableProduct + 'idUser=' +
          this.$session.get('userData').id + '&idProduct=' + this.bocata.id +
          '&API_KEY=' + config.apiKey;

        axios.get(url)
          .then( (res) => {
            if (res.data.done) {
              this.$swal('Producto deshabilitado')
            }
          })
          .catch( (err) => {
            this.$swal('failako: ' + err)
          })
      }
    },
    oftheday(val) {
      if (val) {

        var url = config.host + config.paths.setOfTheDay + 'API_KEY=' + config.apiKey +
                    '&idUser=' + this.$session.get('userData').id + '&idProduct=' + 
                        this.bocata.id;

        axios.get(url)
          .then( (res) => {
            if (res.data.done) {
              this.$parent.$emit('newOfTheDay')
              this.$swal('Nuevo bokata del día')
            }
          })
          .catch( (err) => {
            this.$swal('failako: ' + err)
          })

        
      } else {
        oftheday = true;
        this.$swal('Siempre tiene que haber un bokata del día')
      }
    }
  }
}

</script>

<style>
.col-centered{
      float: none;
      margin: 0 auto;
}


</style>

