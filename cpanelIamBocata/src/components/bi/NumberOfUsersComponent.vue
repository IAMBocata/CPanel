
<script>
import {Line} from 'vue-chartjs'
import axios from 'axios'
import config from '../../api/config.js'

export default {
  extends: Line,
  data () {
    return {
      datacollection: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 
                    'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: [
          {
            label: 'Users',
            backgroundColor: '#ffc107',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
        ]
      }
    }
  },
  mounted () {
    this.renderChart(this.datacollection, {responsive: true, maintainAspectRatio: false})
  },
  created() {
      
      let url = config.host + config.paths.bi.numberOfUsers + 'API_KEY=' + config.apiKey

      axios.get(url)
        .then(res => {

            if (res.data.length == 0) {
                return
            }

            for (let i = 0; i < res.data.length; i++) {
                let number = parseInt(res.data[i])
                this.datacollection.datasets[0].data[i-1] = number
            }

            this.renderChart(this.datacollection, {responsive: true, maintainAspectRatio: false})
        })
        .catch(err => {
            console.log(err)
        })
  }
}

</script>

<style>

</style>
