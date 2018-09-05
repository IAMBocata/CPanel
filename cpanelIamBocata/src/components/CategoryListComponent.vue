<template>
    <div class="container card w-50 pt-2">
        <h1 class="h1 title mb-3">Categorías</h1>
        <template v-for="category in categories">
            <div v-bind:key="category" >
                <p class="title "> - {{category}}</p>
            </div>
        </template>
    </div>
    
</template>

<script>
import axios from 'axios'
import config from '../api/config.js'

export default {
    data() {
        return {
            categories: []
        }
    },
    beforeCreate: function() {
        if (!this.$session.exists()) {
        this.$router.push('/')
        }
    },
    created() {

        var url = config.host + config.paths.categoryList + 
            'idUser=' + this.$session.get('userData').id + 
                '&API_KEY=' + config.apiKey

        axios.get(url)
            .then((res) => {
                this.categories = res.data
            }).catch((err) => {
                this.$swal('Fallo de conexión con el servidor.')
            });
    }
}
</script>

<style>

</style>
