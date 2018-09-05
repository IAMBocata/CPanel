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

            <template v-for="user in usersDisplayeds">
                <span v-bind:key="user">
                    <user-component class="d-inline-block ml-4" :user="user" />
                </span>
            </template>  
        </div>
    </div>
</template>

<script>
import UserComponent from './UserComponent.vue'

import axios from 'axios'
import config from '../api/config.js'

export default {
    data() {
        return {
            usersDisplayeds: [],
            users: [],
            name
        }
    },
    beforeCreate: function() {
        if (!this.$session.exists()) {
            this.$router.push('/')
        }
    },
    created() {

        var url = config.host + config.paths.userList + 
                    'idUser=' + this.$session.get('userData').id + '&API_KEY=' + config.apiKey;

        axios.get(url)
            .then( (res) => {
                this.users = res.data
                this.usersDisplayeds = this.users
            })
            .catch( (err) => {
                this.$swal('failako: ' + err)
            })
    },
    components: {
        UserComponent
    },
    watch: {
        name(name) {
            if (name.length == 0) {
                this.usersDisplayeds = this.users
            } else {
                this.usersDisplayeds = []

                this.users.forEach(user => {
                    if (user.name.toLowerCase().includes(name.toLowerCase())) {
                        this.usersDisplayeds.push(user)
                    }
                })
            }
        }
    }
    
}
</script>

<style>

</style>

