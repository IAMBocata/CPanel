<template>
    <div class="card container mb-2 w-75">
        <div class="card-body">
            <div class="row">
                <div class="col-sm">
                    <table class="table table-striped border">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="checkout in buy.checkouts">
                                <tr v-bind:key="checkout">
                                    <td>{{checkout.product.name}}</td>
                                    <td>{{checkout.quantity}}</td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
                <div class="col-sm">
                    <p class="title h5">Compra #{{buy.id}}</p>
                    <p>Comprado por {{buy.user.name}}
                        <br>a las {{buy.buydate}}
                    </p>
                    <p>Hay que entregarlo a las <strong>{{hora}}</strong></p>

                    <span>
                        <button type="button" class="btn btn-seconday bg-warning border-0" @click="cancelBuy">
                            Cancelar 
                        </button>

                        <button type="button" v-if="this.buy.state === 'STARTED'" class="btn btn-seconday bg-warning border-0" @click="endBuy">
                            Finalizar Compra
                        </button>
                        <button type="button" v-if="(this.buy.state === 'SENDED')" class="btn btn-seconday bg-warning border-0" @click="startBuy">
                            Empezar Compra
                        </button>
                    </span>
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
import axios from 'axios'
import config from '../api/config.js'

export default {
  props: {
    buy: {
        type: Object
    }
  },
  data() {
      return {
          hora: ''
      }
  },
  created() {
      var valuesData = this.buy.deliverDate.split(' ')
      var valueshora = valuesData[1].split(':')
      this.hora = valueshora[0] + ':' + valueshora[1]
  },
  methods: {
      startBuy() {
          let url = config.host + config.paths.startBuy + 'API_KEY=' + config.apiKey +
                        '&idUser=' + this.$session.get('userData').id + '&idBuy=' + this.buy.id

          this.$swal({
              title: 'Empezar esta compra?',
              text: 'El usuario va a recibir una notificación.',
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085D6',
              cancelButtonColor: '#D33',
              confirmButtonText: 'Empezar compra!'
          }).then( res => {
              if (res.value) {
                  axios.get(url)
                    .then(res => {
                        if (res.data.done) {
                            this.$swal('Compra empezada.', 
                                        'El usuario ha recibido una notificación.',
                                        'success')
                        }
                    })
                    .catch(err => {
                        this.$swal('network error')
                    })
              }
          })
      },
      endBuy() {
          let url = config.host + config.paths.endBuy + 'API_KEY=' + config.apiKey +
                        '&idUser=' + this.$session.get('userData').id + '&idBuy=' + this.buy.id
        
          this.$swal({
              title: 'Estas segur@ de finalizar esta compra?',
              text: 'El usuario va a recibir una notificación.',
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085D6',
              cancelButtonColor: '#D33',
              confirmButtonText: 'Finalizar compra!'
          }).then( res => {
              if (res.value) {
                  axios.get(url)
                    .then(res => {
                        if (res.data.done) {
                            this.$swal('Compra finalizada.', 
                                        'El usuario ha recibido una notificación.',
                                        'success')
                        }
                    })
                    .catch(err => {
                        this.$swal('network error')
                    })
              }
          })   
      }, 
      cancelBuy() {

          let url = config.host + config.paths.cancelBuy + 'idBuy=' + this.buy.id + 
                    '&idUser=' + this.$session.get('userData').id + '&API_KEY=' + config.apiKey

          this.$swal({
              title: 'Cancelar esta compra?',
              text: 'El usuario va a recibir una notificación.',
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085D6',
              cancelButtonColor: '#D33',
              confirmButtonText: 'Finalizar compra!'
          }).then( res => {
              if (res.value) {
                  axios.get(url)
                    .then(res => {
                        if (res.data.done) {
                            this.$swal('Compra cancelada.', 
                                        'El usuario ha recibido una notificación.',
                                        'success')
                        } else {
                            this.$swal('Ha sucedido algun error')
                        }
                    })
                    .catch(err => {
                        this.$swal('network error')
                    })
              }
          })
      }
  }    
}
</script>

<style>

</style>
