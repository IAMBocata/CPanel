<template>
    <div class="card container w-25">
        <p class="h2 mt-2 title">Dinero facurado...</p>

        <table class="table table-striped border">
            <thead>
                <tr>
                    <th>
                        Cuando
                    </th>
                    <th>
                        Cuanto
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Hoy</td>
                    <td>{{moneys.today}} €</td>
                </tr>
                <tr>
                    <td>Esta semana</td>
                    <td>{{moneys.week}} €</td>
                </tr>
                <tr>
                    <td>Este mes</td>
                    <td>{{moneys.month}} €</td>
                </tr>
                <tr>
                    <td>Este año</td>
                    <td>{{moneys.year}} €</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios'
import config from '../../api/config.js'

export default {
    data() {
        return {
            moneys: {}
        }
    },
    created() {
        var url = config.host + config.paths.bi.moneys + 'API_KEY=' + config.apiKey

        axios.get(url)
            .then(res => {
                this.moneys = res.data
            })
            .catch(err => {
                console.log('fail')
            })
    }
}
</script>

<style>

</style>
