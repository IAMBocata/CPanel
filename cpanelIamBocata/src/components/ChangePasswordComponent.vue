<template>
    <div class="container w-50 mt-3 pb-5 card">
        <p class="h1 text-center mb-2 mt-3 title">Cambiar contraseña</p>

        <form @submit.prevent="submit">

            <div class="md-form form-inline text-info ml-4 mr-5 mt-4">
                <i class="fa fa-lock prefix mt-2 ml-1 "></i>
                <input class="form-control ml-5" type="password" id="oldpassword" required v-model="oldpassword"/>
                <label for="oldpassword" class="text-info ml-5"> Contraseña actual </label>
            </div>

            <div class="md-form form-inline text-info ml-4 mr-5 mt-4">
                <i class="fa fa-lock prefix mt-2 ml-1 "></i>
                <input class="form-control ml-5" type="password" id="newpassword" required v-model="newpassword"/>
                <label for="newpassword" class="text-info ml-5"> Nueva Contraseña </label>
            </div>

            <div class="md-form form-inline text-info ml-4 mr-5 mt-4">
                <i class="fa fa-lock prefix mt-2 ml-1 "></i>
                <input class="form-control ml-5" type="password" id="repeatnewpassword" required v-model="repeatnewpassword"/>
                <label for="repeatnewpassword" class="text-info ml-5"> Repetir Nueva Contraseña  </label>
            </div>

            <input type="submit" class="btn btn-primary bg-warning border-0 mt-4" value="Cambiar contraseña">

        </form>

    </div>
</template>

<script>
import axios from 'axios'
import config from '../api/config.js'

export default {
    data() {
        return {
            oldpassword: '',
            newpassword: '', 
            repeatnewpassword: ''
        }
    },
    beforeCreate: function() {
        if (!this.$session.exists()) {
            this.$router.push('/')
        }
    },
    methods: {
        submit() {
            if (this.repeatPassword === this.password) {

                let url = config.host + config.paths.changePassword + 'id=' + this.$session.get('userData').id + 
                            '&oldpassword=' + this.oldpassword + '&newpassword=' + this.newpassword + 
                                '&API_KEY=' + config.apiKey;
                
                axios.get(url)
                    .then(res => {
                        if (res.data.done) {
                            this.$swal('Password changed')
                        }
                    })
                    .catch(err => {
                        this.$swal('network error')
                    })

                            
            }
        }
    }
}
</script>

<style>

</style>

