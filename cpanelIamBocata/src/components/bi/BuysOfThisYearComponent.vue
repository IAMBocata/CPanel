
<script>
import {Bar} from 'vue-chartjs'
import axios from 'axios'
import config from '../../api/config.js'

export default {
  extends: Bar,
  data () {
    return {
      datacollection: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 
                    'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: [
          {
            label: 'Ventas',
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
      
      let url = config.host + config.paths.bi.buysOfThisYear + 'API_KEY=' + config.apiKey

      axios.get(url)
        .then(res => {

            if (res.data.length == 0) {
                return
            }

            for (let i = 0; i < res.data.length; i++) {

                let month = parseInt(res.data[i].month)
                let buys = parseInt(res.data[i].buys)

                this.datacollection.datasets[0].data[month-1] = buys
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
