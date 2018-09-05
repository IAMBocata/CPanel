<template>
    <div class="card container w-25">
        <p class="h2 mt-2 title">TOP Clientes</p>
        <table class="table table-striped border">
            <thead>
                <tr>
                    <th>
                        Cliente
                    </th>
                    <th>
                        Compras
                    </th>
                </tr>
            </thead>
            <tbody>
                <template v-for="user in users">
                    <tr v-bind:key="user">
                        <td>{{user.user}}</td>
                        <td>{{user.buys}}</td>
                    </tr>
                </template>
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
            users: []
        }
    },
    created() {
        var url = config.host + config.paths.bi.topUsers + 'API_KEY=' + config.apiKey

        axios.get(url)
            .then(res => {
                this.users = res.data
            })
            .catch(err => {
                console.log('fail')
            })
    }
}
</script>

<style>

</style>
