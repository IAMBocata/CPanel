
<script>
import {Bar} from 'vue-chartjs'
import axios from 'axios'
import config from '../../api/config.js'

export default {
  extends: Bar,
  data () {
    return {
      datacollection: {
        labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
        datasets: [
          {
            label: 'Ventas',
            backgroundColor: '#ffc107',
            data: [0, 0, 0, 0, 0, 0, 0]
          }
        ]
      }
    }
  },
  mounted () {
    this.renderChart(this.datacollection, {responsive: true, maintainAspectRatio: false})
  },
  created() {
      
      let url = config.host + config.paths.bi.buysOfThisWeek + 'API_KEY=' + config.apiKey

      axios.get(url)
        .then(res => {

            if (res.data.length == 0) {
                return
            }

            for (let i = 0; i < res.data.length; i++) {

                let day = parseInt(res.data[i].day)
                let buys = parseInt(res.data[i].buys)

                if (day === 1) {
                    this.datacollection.datasets[0].data[6] = buys
                } else {
                    this.datacollection.datasets[0].data[day-2] = buys
                }
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
