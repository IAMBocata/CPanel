<template>
  <div>
      <div>
            <div class="card container w-25">
                <div class="md-form form-inline text-info ml-3 mr-5 mb-2">
                    <i class="fa fa-search prefix mt-1"></i>
                    <input class="form-control ml-5" type="text" id="name" v-model="name" required />
                    <label for="name" class="text-info ml-5" >Buscar</label>
                </div>
            </div>
          <template v-for="bocata in displayedBocatas">
            <span v-bind:key="bocata">
              <product-component class="d-inline-block ml-4" :bocata="bocata" />
            </span>
          </template>  
      </div>
  </div>
</template>

<script>
import ProductComponent from './ProductComponent.vue'

import axios from 'axios'
import config from '../api/config.js'

export default {
    data() {
        return {
            displayedBocatas: [],
            bocatas: [],
            name: ''
        }
    },
    beforeCreate: function() {
        if (!this.$session.exists()) {
            this.$router.push('/')
        }
    },
    created() {

        this.reload();

        this.$on('newOfTheDay', () => {
            this.reload()
        })
    },
    components: {
        ProductComponent
    },
    methods: {
        reload() {

            var userdata = this.$session.get('userData');

            var url = config.host + config.paths.productList + 
                        'idUser=' + userdata.id + '&API_KEY=' + config.apiKey;

            axios.get(url)
                .then( (res) => {
                    this.bocatas = res.data
                    this.displayedBocatas = this.bocatas
                })
                .catch( (err) => {
                    this.$swal('failako: ' + err)
                })
        }
    },
    watch: {
        name(name) {
            if (name.length == 0) {
                this.displayedBocatas = this.bocatas
            } else {
                this.displayedBocatas = []

                this.bocatas.forEach(bocata => {
                    if (bocata.name.toLowerCase().includes(name.toLowerCase())) {
                        this.displayedBocatas.push(bocata)
                    }
                })
            }
        }
    }
}
</script>

<style>

</style>
