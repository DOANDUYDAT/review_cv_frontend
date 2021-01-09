<template>
  <v-card id="chart">
    <apexchart
      type="bar"
      width="730"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </v-card>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import questionService from "@/api/question";

export default {
  components: {
    apexchart: VueApexCharts
  },
  data() {
    return {
      series: [
        {
          name: "Số lượng câu hỏi",
          data: [1, 0, 2, 1, 6, 10, 3, 1, 2, 1, 5, 1]
        }
      ],
      chartOptions: {
        chart: {
          height: 370,
          type: "bar"
        },
        plotOptions: {
          bar: {
            columnWidth: "50%",
            endingShape: "rounded"
          }
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
          text: "Thống kê số lượng câu hỏi",
          floating: true,
          offsetY: 30,
          align: "center",
          style: {
            color: "#444"
          }
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "light",
            type: "horizontal",
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 0.85,
            opacityTo: 0.85,
            stops: [50, 0, 100]
          }
        }
      }
    };
  },
  methods: {
    async getData() {
      let newData = [];
      for (let i = 0; i < 12; i++) {
        newData[i] = await questionService.getTotalQuestionInMonth(i);
      }
      // this.series = [
      //   {
      //     data: newData
      //   }
      // ];
    }
  },
  created() {
    this.getData();
  }
};
</script>
