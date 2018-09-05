<template>
    <div class="card container w-25">
        <p class="h2 mt-2 title">TOP Likes</p>
        <table class="table table-striped border">
            <thead>
                <tr>
                    <th>
                        Producto
                    </th>
                    <th>
                        Likes
                    </th>
                </tr>
            </thead>
            <tbody>
                <template v-for="like in likes">
                    <tr v-bind:key="like">
                        <td>{{like.product}}</td>
                        <td>{{like.likes}}</td>
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
            likes: []
        }
    },
    created() {
        var url = config.host + config.paths.bi.topLikes + 'API_KEY=' + config.apiKey

        axios.get(url)
            .then(res => {
                this.likes = res.data
            })
            .catch(err => {
                console.log('fail')
            })
    }
}
</script>