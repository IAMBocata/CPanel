
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

      let date = new Date();
      let month = date.getMonth();
      let year = date.getFullYear();

      console.log(date.toString())

      for (let i = 1; i <= new Date(year, month+1, 0).getDate(); i++) {
          this.datacollection.labels[(i-1)] = i;
          this.datacollection.datasets[0].data[(i-1)] = 0;
      }
      
      let url = config.host + config.paths.bi.buysOfThisMonth + 'API_KEY=' + config.apiKey

      axios.get(url)
        .then(res => {

            if (res.data.length == 0) {
                return
            }

            for (let i = 0; i < res.data.length; i++) {

                let day = parseInt(res.data[i].day)
                let buys = parseInt(res.data[i].buys)

                this.datacollection.datasets[0].data[day-1] = buys
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
