<template>
    <div class="card container w-25">
        <p class="h2 mt-2 title">TOP Productos</p>

        <table class="table table-striped border">
            <thead>
                <tr>
                    <th>
                        Producto
                    </th>
                    <th>
                        Ventas
                    </th>
                </tr>
            </thead>
            <tbody>
                <template v-for="sale in sales">
                    <tr v-bind:key="sale">
                        <td>{{sale.product}}</td>
                        <td>{{sale.buys}}</td>
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
            sales: []
        }
    },
    created() {
        var url = config.host + config.paths.bi.topSales + 'API_KEY=' + config.apiKey

        axios.get(url)
            .then(res => {
                this.sales = res.data
            })
            .catch(err => {
                console.log('fail')
            })
    }
}
</script>

<style>

</style>
