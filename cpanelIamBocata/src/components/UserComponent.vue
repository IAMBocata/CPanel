<template>

    <div class="card mt-5 mb-5 w-25">
        <script type="text/x-template" id="modal-template">
            <transition name="modal">
                <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-container">

                    <div class="modal-header">
                        <slot name="header">
                        default header
                        </slot>
                    </div>

                    <div class="modal-body">
                        <slot name="body">
                        default body
                        </slot>
                    </div>

                    <div class="modal-footer">
                        <slot name="footer">
                        default footer
                        <button class="modal-default-button" @click="$emit('close')">
                            OK
                        </button>
                        </slot>
                    </div>
                    </div>
                </div>
                </div>
            </transition>
        </script>
        <div class="img-holder">
            <img class="card-img-top" :src="photo" alt="Card image cap" />
           <!--<a class="btn-floating link mr-1 btn-lg blue"></a>-->
            <button id="show-modal" @click="showModal = true" type="button" class="btn btn-amber link px-3">
                <i class="fa fa-pencil fa-1x"></i>
            </button>
        </div>
        <div class="card-body">
            <h3 class="card-title smallTitle font-weight-bold h3-responsive">
                <i v-if="googleUser" class="fa fa-google"></i>
                {{name}}
            </h3>
            <!-- Nav tabs -->
            <ul class="nav nav-tabs nav-justified grey lighten-4" role="tablist">
                <li class="nav-item ">
                    <a class="nav-link active fa fa-address-card-o fa-2x" data-toggle="tab" :href="'#' + tab1" role="tab"></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link fa fa-key fa-2x" data-toggle="tab" :href="'#' + tab2" role="tab"></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link fa fa-credit-card fa-2x" data-toggle="tab" :href="'#' + tab3" role="tab"></a>
                </li>
            </ul>
            <!-- Tab panels -->
            <div class="tab-content">
                <!--Panel 1-->
                <div class="tab-pane fade in show active" :id="tab1" role="tabpanel">
                    <br>
                    <p>{{mail}}</p>
                    <p>Fecha registro: <br> {{registerDate}}</p>
                </div>
                <!--/.Panel 1-->
                <!--Panel 2-->
                <div class="tab-pane fade" :id="tab2" role="tabpanel">
                    <div v-if="googleUser">
                        <p class="h4 mt-5 mb-3 mr-5 ml-5">Este usuario no entra con contraseña</p>
                    </div>

                    <form v-else class="ml-3"  @submit.prevent="resetPassword" >
                        <div >
                            <div class="md-form form-inline text-info ml-3 mr-5">
                                <i class="fa fa-lock prefix mt-1"></i>
                                <input class="form-control" type="password" :id="tab2NewPassword" v-model="newPassword" required />
                                <label :for="tab2NewPassword" class="text-info" >Nueva contraseña</label>
                            </div>
                            <div class="md-form form-inline text-info ml-3 mr-5">
                                <i class="fa fa-lock prefix mt-1"></i>
                                <input class="form-control" type="password" :id="tab2NewPassword2" v-model="newPassword2" required />
                                <label :for="tab2NewPassword2" class="text-info" >Confirmar contraseña</label>
                            </div>
                            <input type="submit" class="btn btn-primary bg-warning border-0 mt-4" value="Reset Password">
                        </div>
                    </form>
                    
                </div>
                <!--/.Panel 2-->
                <!--Panel 3-->
                <div class="tab-pane fade" :id="tab3" role="tabpanel">
                    <br>
                    <h1>{{money}} €</h1>
                    <a class="fa fa-minus-square" v-on:click="minusMoney = true" @click="plusMoney = false"></a>
                    <input v-if="minusMoney" v-model="money2add" placeholder="Restar. ej: 5€">
                    <button v-else @click="getDinero" class="btn btn-amber">Quita dinero</button>
                    <a class="fa fa-plus-square" v-on:click="plusMoney = true" @click="minusMoney = false"></a>
                    <input v-if="plusMoney" v-model="money2add" placeholder="Sumar. ej: 5€">
                    <button v-else @click="addDinero" class="btn btn-amber">Añade dinero</button>

                </div>
                <!--/.Panel 3-->
            </div>
           <!-- <div class="card-text">
                <p>{{mail}}</p>
                <p>{{money}} €</p>
                <p>{{userType}}</p>
                <p>Fecha registro: <br> {{registerDate}}</p>
            </div>-->
        </div>
        
        <div class="row">
            <div class="col pt-3">
                <h5> <span class="badge amber">{{userType}}</span></h5>
            </div>
            <div class="col rounded-bottom mr-3 pt-3 pb-2 text-right">
                Habilitado
                <toggle-button class="ml-1" v-model="enabled" />
            </div>
        </div>
        <modal v-if="showModal" @close="showModal = false">
            <h3>PROVA</h3>
        </modal>
        <modal v-else @click="showModal = true">
        </modal>
    </div>       
</template>

<script>

import axios from 'axios'
import config from '../api/config.js'

export default {
    props: {
        user: {
            type: Object
        }
    },
    data() {
        return {
            name: this.user.name,
            photo: this.user.photoUrl,
            mail: this.user.mail,
            googleUser: this.user.isGoogleUser,
            money: this.user.money,
            userType: '',
            registerDate: this.user.registerDate,
            enabled: this.user.enabled,
            showModal: false,
            plusMoney: false,
            minusMoney: false,
            newPassword: '',
            newPassword2: '',
            money2add: ''
        }
    },
    created() {
        switch (parseInt(this.user.permissionLevel)) {
            case 1: 
                this.userType = 'User App';
                break;
            case 2:
                this.userType = 'User Bar';
                break;
            case 3:
                this.userType = 'User Admin';
                break;
        }

        this.tab1 = (Math.random() * 10000) + 1
        this.tab2 = (Math.random() * 10000) + 1
        this.tab3 = (Math.random() * 10000) + 1
        this.tab2NewPassword = (Math.random() * 10000) + 1
        this.tab2NewPassword2 = (Math.random() * 10000) + 1

    },
    watch: {
        enabled(val) {

            console.log(val)

            if (val) {

                var url = config.host + config.paths.enableUser + 'API_KEY=' +
                            config.apiKey + '&idUser=' + this.user.id +
                                '&iduserapplicant=' + this.$session.get('userData').id

                axios.get(url)
                    .then( res => {
                        
                        if (res.data.done) {
                            this.$swal('Usuario habilitado')
                        }
                    })
                    .catch( err => {
                        this.$swal('Network error')
                    })

            } else {

                var url = config.host + config.paths.disableUser + 'API_KEY=' +
                            config.apiKey + '&idUser=' + this.user.id +
                                '&iduserapplicant=' + this.$session.get('userData').id

                axios.get(url)
                    .then( res => {
                        
                        if (res.data.done) {
                            this.$swal('Usuario deshabilitado')
                        }
                    })
                    .catch( err => {
                        this.$swal('Network error')
                    })

            }
        }
    },
    methods: {
        goToModifyUser() {
            this.$router.push('/ModifyUser')
        },
        resetPassword() {
            
            if (this.newPassword === this.newPassword2) {

                let url = config.host + config.paths.resetPassword + 'API_KEY=' + config.apiKey +    
                                '&id=' + this.user.id + '&idUserApplicant=' + this.$session.get('userData').id + 
                                '&newpassword=' + this.newPassword ;

                axios.get(url)
                    .then(res => {
                        if (res.data.done) {
                            this.$swal('Reset completado')
                        } else {
                            console.log(res.data)
                        }
                    })
                    .catch(err => {
                        console.log('FAILAKO')
                    })
            } else {
                this.$swal('Las passwords no coinciden')
            }
        },
        addDinero(){
            let url = 'http://labs.iam.cat/~a16josortmar/api/addMoneyToThisUser.php?API_KEY=' 
            + config.apiKey + '&iduser=' + this.user.id + '&iduserapplicant=' 
            + this.$session.get('userData').id + '&money=' + this.money2add

            console.log(url)

            axios.get(url)
                .then( res => {
                    
                        if (res.data.done) {
                            this.$swal('Dinero añadido')
                        }
                    })
                    .catch( err => {
                        this.$swal('Network error')
                    })
        },
         getDinero(){
            let url = 'http://labs.iam.cat/~a16josortmar/api/substractMoneyFromThisUser.php?API_KEY=' 
            + config.apiKey + '&iduser=' + this.user.id + '&iduserapplicant=' 
            + this.$session.get('userData').id + '&money=' + this.money2get

            axios.get(url)
                .then( res => {
                    
                    if (res.data.done) {
                            this.$swal('Dinero restado')
                        }
                    })
                    .catch( err => {
                        this.$swal('Network error')
                    })
        }
    },
    

    
}
</script>

<style>

.smallTitle {
    font-size: 20px;
}

link.active{
    background-color: pink;
}

.img-holder{
    position: relative;
}

.img-holder .link{
    position: absolute;
    bottom: 10px;
    right: 10px;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>

