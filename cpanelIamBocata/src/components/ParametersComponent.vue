<template>
    <div class="card container w-25 mt-2">
        <p class="h1 text-center mb-2 mt-3 title">Parámetros</p>

        <form @submit.prevent="submit" class="mt-3">

            <div class="mr-5 row ml-5">
                <md-field class="col">
                    <label class="text-info">Hora de Apertura</label>
                    <md-input v-model="parameters.TIME_OPEN" type="number" maxlength="2" required></md-input>
                </md-field>
            </div>

            <div class="mr-5 row ml-5">
                <md-field class="col ">
                    <label class="text-info">Hora de cierre</label>
                    <md-input v-model="parameters.TIME_CLOSE" type="number" maxlength="2" required></md-input>
                </md-field>
            </div>

            <div class="mr-5 row ml-5">
                <md-field class="col">
                    <label class="text-info">Margen de minutos</label>
                    <md-input v-model="parameters.MARGIN_MIN" type="number" maxlength="2" required></md-input>
                </md-field>
            </div>

            <div class="mr-5 row  ml-5">
                <p class="card-text">
                    <span> IAM Bocata activado 
                        <toggle-button @change="change()" :sync="true" v-model="parameters.RUNNING" /></span>
                </p>
            </div>

            <input type="submit" class="btn btn-primary bg-warning border-0 mt-4 mb-3" value="APLICAR">

        </form>

    </div>    
</template>

<script>
import axios from 'axios'
import config from '../api/config.js'

export default {
    data() {
        return {
            parameters: {}
        };
    },
    created() {

        let url = config.host + config.paths.parameters + 'API_KEY=' + config.apiKey;
        
        axios.get(url) 
            .then( res => {
                this.parameters = res.data
                this.parameters.RUNNING = (this.parameters.RUNNING === 'true')
            })
            .catch(err => {
                console.log('FAIL')
            })

    },
    beforeCreate: function() {
        if (!this.$session.exists()) {
            this.$router.push('/')
        }
    },
    methods: {
        submit() {

            if (this.parameters.TIME_CLOSE < 0 || this.parameters.TIME_CLOSE > 23
                || this.parameters.TIME_OPEN < 0 || this.parameters.TIME_OPEN > 23 ||
                this.parameters.MARGIN_MIN < 0) {

                    this.$swal('Datos incorrectos')
                    return;
            }
            
            var url = config.host + config.paths.setParameters + 'API_KEY=' + config.apiKey + '&idUser=' 
                        + this.$session.get('userData').id + '&hourOpen=' + this.parameters.TIME_OPEN +
                        '&hourClose=' + this.parameters.TIME_CLOSE +
                        '&marginMin=' + this.parameters.MARGIN_MIN + '&running=' + this.parameters.RUNNING;

            axios.get(url)
                .then(res => {
                    if (res.data.done) {
                        this.$swal('Parámetros actualizados.')
                    } else {
                        this.$swal('Ha habido algun problema con los datos actualizados')
                    }
                })
                .catch(err => {
                    this.$swal('Hay problemas para conectar con el servidor.')
                })
        },
        change() {
            console.log('Aloha')
        }
    },
    watch: {
        running(val) {
            console.log(val)
        }
    }
}
</script>

<style>

</style>
