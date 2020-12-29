<template>
  <v-card id="chart">
    <apexchart
      type="area"
      width="730"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </v-card>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import cvService from "@/api/cv";

export default {
  components: {
    apexchart: VueApexCharts
  },
  data() {
    return {
      series: [
        {
          name: "Số lượng CV",
          data: [31, 40, 28, 51, 42, 109, 100, 200, 58, 113, 234, 38]
        }
      ],
      chartOptions: {
        chart: {
          height: 370,
          type: "area"
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "smooth"
        },
        xaxis: {
          categories: [
            "Tháng 1",
            "Tháng 2",
            "Tháng 3",
            "Tháng 4",
            "Tháng 5",
            "Tháng 6",
            "Tháng 7",
            "Tháng 8",
            "Tháng 9",
            "Tháng 10",
            "Tháng 11",
            "Tháng 12"
          ]
        },
        title: {
          text: "Thống kê số lượng CV",
          floating: true,
          offsetY: 30,
          align: "center",
          style: {
            color: "#444"
          }
        }
      }
    };
  },
  methods: {
    async getData() {
      console.log(this.series[0].data);
      for (let i = 0; i < 12; i++) {
        this.series[0].data[i] = await cvService.getTotalCvInMonth(i);
      }
    }
  },
  created() {
    this.getData();
  }
};
</script>
