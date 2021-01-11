<template>
  <v-card>
    <apexchart
      v-if="series && series[0].data.length"
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
          data: []
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
      let newData = [];
      for (let i = 0; i < 12; i++) {
        newData[i] = await cvService.getTotalCvInMonth(i);
      }
      this.series = [
        {
          data: newData
        }
      ];
    }
  },
  created() {
    this.getData();
  }
};
</script>
