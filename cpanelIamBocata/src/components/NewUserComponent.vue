<template>
  <div class="container w-50 mt-3 pb-5 card">

    <p class="h1 text-center mb-2 mt-3 title">Nuevo Usuario</p>
    
    <form @submit.prevent="submit">

        <div class="md-form form-inline text-info ml-4 mr-5">
            <i class="fa fa-user prefix mt-1"></i>
            <input class="form-control ml-5" type="text" id="name" v-model="name" required />
            <label for="name" class="text-info ml-5" >{{ nameLabel }}</label>
        </div>

        <div class="md-form form-inline text-info ml-4 mr-5">
            <i class="fa fa-envelope prefix mt-1"></i>
            <input class="form-control ml-5" type="email" id="mail" v-model="mail" required />
            <label for="mail" class="text-info ml-5" >{{ mailLabel }}</label>
        </div>

        <div class="md-form form-inline text-info ml-4 mr-5 mt-4">
            <i class="fa fa-lock prefix mt-2 ml-1 "></i>
            <input class="form-control ml-5" type="password" id="password" required v-model="password"/>
            <label for="password" class="text-info ml-5">{{ passwordLabel }} </label>
        </div>

        <div class="md-form form-inline text-info ml-4 mr-5 mt-4">
            <i class="fa fa-lock prefix mt-2 ml-1 "></i>
            <input class="form-control ml-5" type="password" id="repeatpassword" required v-model="repeatPassword"/>
            <label for="repeatpassword" class="text-info ml-5">{{ repeatPasswordLabel }} </label>
        </div>

        <label class="text-info text-right mt-3 mb-3">{{ permissionLevelLabel }} </label>

        <div class="form-inline ml-5 mt-1">

            <template v-for="permission in permissions">
                
                <div class="form-check" v-bind:key="permission">
                    <input class="form-check-input" type="radio" name="exampleRadios" :id="permission"
                                    v-model="permissionModel" :value="permission" checked>
                    <label class="form-check-label text-info mr-5" :for="permission">
                        {{ permission }}
                    </label>
                </div>

            </template>
        </div>

        <input type="submit" class="btn btn-primary bg-warning border-0 mt-4" value="Crea Usuario">

    </form>
  </div>
</template>

<script>
import axios from 'axios'
import config from '../api/config.js'

export default {
  data() {
      return {
          nameLabel: 'Nombre', 
          mailLabel: 'Email',
          passwordLabel: 'Password',
          repeatPasswordLabel: 'Repetir password',
          permissionLevelLabel: 'Tipo de usuario',
          permissions: [
              'Usuario Normal',
              'Usuario Bar',
              'Usuario Administrador'
          ],
          permissionModel: '',
          name: '', 
          mail: '',
          password: '',
          repeatPassword:''
      }      
  }, 
  beforeCreate: function() {
    if (!this.$session.exists()) {
      this.$router.push('/')
    }
  },
  methods: {
      submit() {

          console.log('Name: ' + this.name + '\nmail: ' + this.mail + '\nPassword: ' + this.password + 
                        '\nRepeatPassword: ' + this.repeatPassword + '\nPermissionLevel: '
                         + this.permissionModel)

        
        if (this.repeatPassword === this.password) {

            var permissionNumber = this.getPermissionNumber(this.permissionModel);

            var url = config.host + config.paths.createUser + 'idUserApplicant=' + 
                        this.$session.get('userData').id + '&API_KEY=' + config.apiKey + 
                            '&name=' + this.name + '&mail=' + this.mail + '&password=' + this.password
                                + '&permissionLevel=' + permissionNumber;

            console.log(url)

            axios.get(url)
                .then(res => {
                    console.log(res)
                    if (res.data.done) {
                        this.$swal('User created')
                    }
                })
                .catch(err => {
                    this.$swal('network error')
                })
        }          
      },
      getPermissionNumber(permission) {

          if (permission.localeCompare('Usuario Normal')) {
            return 1;
          } else if (permission.localeCompare('Usuario Bar')) {
            return 2;
          } else if (permission.localeCompare('Usuario Administrador')) {
            return 3;
          }

          return 1;
      }
  }
}
</script>

<style>

</style>
