
<script>
import {Bar} from 'vue-chartjs'
import axios from 'axios'
import config from '../../api/config.js'

export default {
  extends: Bar,
  data () {
    return {
      datacollection: {
        labels: [],
        datasets: [
          {
            label: 'Ventas',
            backgroundColor: '#ffc107',
            data: []
          }
        ]
      }
    }
  },
  mounted () {
    this.renderChart(this.datacollection, {responsive: true, maintainAspectRatio: false})
  },
  created() {

      for (let i = 0; i < 24; i++) {
        this.datacollection.labels[i] = i;
        this.datacollection.datasets[0].data[i] = 0;
      }
      
      let url = config.host + config.paths.bi.hourOfBuys + 'API_KEY=' + config.apiKey

      axios.get(url)
        .then(res => {

            if (res.data.length == 0) {
                return
            }

            for (let i = 0; i < res.data.length; i++) {

                let hour = parseInt(res.data[i].hour)
                let buys = parseInt(res.data[i].buys)

                this.datacollection.datasets[0].data[hour] = buys
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
