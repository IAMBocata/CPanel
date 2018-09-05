<template>
    <div class="container">
        <template v-for="buy in buys">
            <span v-bind:key="buy">
                <buy-component :buy="buy" />
            </span>
        </template>  
    </div>    
</template>

<script>
import axios from 'axios'
import config from '../api/config.js'

import BuyComponent from './BuyComponent.vue'

export default {
    data() {
        return {
            buys: []
        }
    },
    created() {

        var url = config.host + config.paths.activeBuys + 'API_KEY=' + config.apiKey

        this.loadBuys(url)

        this.intervalBuys = setInterval(() => {
            this.loadBuys(url);
        }, 2000)
    },
    destroyed() {
        clearInterval(this.intervalBuys)
    },
    components: {
        BuyComponent
    },
    methods: {
        loadBuys(u) {
            axios.get(u)
                .then(res => {
                    this.buys = res.data
                })
                .catch(err => {
                    this.$swal(err)
                })
        }
    },
    beforeCreate: function() {
        if (!this.$session.exists()) {
        this.$router.push('/')
        }
    }
    
}
</script>

<style>

</style>

