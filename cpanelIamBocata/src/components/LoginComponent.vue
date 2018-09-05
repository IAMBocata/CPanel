<template lang="html">

    <div id="login-component" class="container w-25 mt-5 card">
        <p class="h1 text-center mb-4 mt-3 title">CPanel IAM Bocata!</p>
        <p class="h4 text-center">Login</p>
        <form @submit.prevent="submit">
            <div class="md-form form-inline text-info ml-4 mr-5">
                <i class="fa fa-envelope prefix mt-1"></i>
                <input class="form-control ml-5" type="email" id="mail" v-model="mail" />
                <label for="mail" class="text-info ml-5" >
                    
                    {{ mailLabel }}</label>
            </div>

            <div class="md-form form-inline text-info ml-4 mr-5 mt-4">
                <i class="fa fa-lock prefix mt-2 ml-1 "></i>
                <input class="form-control ml-5" type="password" id="password" v-model="password"/>
                <label for="password" class="text-info ml-5"> 
                    {{ passwordLabel }} </label>
            </div>
            
            <div class="md-form mb-4 mt-4">
                <input type="submit" class="btn btn-primary bg-warning border-0 text-dark" name="login" value="Login" />
            </div>

        </form>
    </div>

</template>

<script>
import axios from 'axios'
import config from '../api/config.js'

export default {
    data() {
        return {
            mailLabel: 'Email',
            mail: '',
            passwordLabel: 'Password',
            password: ''
        }
    },
    methods: {
        submit: function() {

            if (validateEmail(this.mail) && this.password.length > 0) {
                
                var mailParameter = 'mail=' + this.mail
                var passwordParameter = '&password=' + this.password
                var apiKeyParameter = '&API_KEY=' + config.apiKey

                var url = config.host + config.paths.login + mailParameter 
                                + passwordParameter + apiKeyParameter

                axios.get(url)
                    .then( (res) => {
                        if (res.data.userdata) {
                            this.$session.start()
                            this.$session.set('userData', res.data.userdata)

                            this.$router.push('/Home')
                        } else {
                            this.$swal('fail')
                        }
                    })
                    .catch( (err) => {
                        swal('failako: ' + err)
                    })
            }
        }
    }
}

function validateEmail(email) {
  var re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
  return re.test(email);
}

</script>

<style lang="scss">
</style>