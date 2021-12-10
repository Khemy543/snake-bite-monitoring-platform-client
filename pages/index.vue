<template>
  <div class="row">
    <!-- Big Chart -->
    <div class="col-12">
      <card type="chart">
        <template slot="header">
          <div class="row">
            <div class="col-sm-6" :class="isRTL ? 'text-right' : 'text-left'">
              <h2 class="card-title">Products</h2>
            </div>
            <div class="col-sm-6 d-flex d-sm-block">
              <div
                class="btn-group btn-group-toggle"
                :class="isRTL ? 'float-left' : 'float-right'"
                data-toggle="buttons"
              >
                <div class=" d-flex">
                   <base-input class=" mr-3">
                    <el-date-picker v-model="start_date"
                                    type="date"
                                    placeholder="Start Date">
                      </el-date-picker>
                  </base-input>

                   <base-input>
                    <el-date-picker v-model="end_date"
                                    type="date"
                                    placeholder="End Date">
                      </el-date-picker>
                  </base-input>
                </div>
              </div>
            </div>
          </div>
        </template>
        <div class="chart-area">
          <line-chart
            style="height: 100%"
            ref="bigChart"
            :chart-data="bigLineChart.chartData"
            :gradient-colors="bigLineChart.gradientColors"
            :gradient-stops="bigLineChart.gradientStops"
            :extra-options="bigLineChart.extraOptions"
          >
          </line-chart>
        </div>
      </card>
    </div>


    <!-- Small charts -->
    <div class="col-lg-6" :class="{ 'text-right': isRTL }">
      <card type="chart">
        <template slot="header">
          <h3 class="card-title">
            <i class="tim-icons icon-bell-55 text-primary "></i> Reported Cases
          </h3>
        </template>
        <div class="chart-area">
          <line-chart
            style="height: 100%"
            ref="purpleChart"
            :chart-data="purpleLineChart.chartData"
            :gradient-colors="purpleLineChart.gradientColors"
            :gradient-stops="purpleLineChart.gradientStops"
            :extra-options="purpleLineChart.extraOptions"
          >
          </line-chart>
        </div>
      </card>
    </div>
    <div class="col-lg-6" :class="{ 'text-right': isRTL }">
      <card type="chart">
        <template slot="header">
          <h3 class="card-title">
            <i class="tim-icons icon-send text-success "></i> Victims
          </h3>
        </template>
        <div class="chart-area">
          <line-chart
            style="height: 100%"
            ref="greenChart"
            :chart-data="greenLineChart.chartData"
            :gradient-stops="greenLineChart.gradientStops"
            :extra-options="greenLineChart.extraOptions"
          >
          </line-chart>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import LineChart from '@/components/Charts/LineChart';
import BarChart from '@/components/Charts/BarChart';
import * as chartConfigs from '@/components/Charts/config';
import TaskList from '@/components/Dashboard/TaskList';
import config from '@/config';
import { Table, TableColumn } from 'element-ui';
import moment from 'moment';

let bigChartDatasetOptions = {
  fill: true,
  borderColor: config.colors.primary,
  borderWidth: 2,
  borderDash: [],
  borderDashOffset: 0.0,
  pointBackgroundColor: config.colors.primary,
  pointBorderColor: 'rgba(255,255,255,0)',
  pointHoverBackgroundColor: config.colors.primary,
  pointBorderWidth: 20,
  pointHoverRadius: 4,
  pointHoverBorderWidth: 15,
  pointRadius: 4,
}

let purpleChartDatasetOptions = {
  label: 'Data',
  fill: true,
  borderColor: config.colors.primary,
  borderWidth: 2,
  borderDash: [],
  borderDashOffset: 0.0,
  pointBackgroundColor: config.colors.primary,
  pointBorderColor: 'rgba(255,255,255,0)',
  pointHoverBackgroundColor: config.colors.primary,
  pointBorderWidth: 20,
  pointHoverRadius: 4,
  pointHoverBorderWidth: 15,
  pointRadius: 4,
}

let greenChartDatasetOptions = {
  label: 'My First dataset',
  fill: true,
  borderColor: config.colors.danger,
  borderWidth: 2,
  borderDash: [],
  borderDashOffset: 0.0,
  pointBackgroundColor: config.colors.danger,
  pointBorderColor: 'rgba(255,255,255,0)',
  pointHoverBackgroundColor: config.colors.danger,
  pointBorderWidth: 20,
  pointHoverRadius: 4,
  pointHoverBorderWidth: 15,
  pointRadius: 4,
}


export default {
  name: 'dashboard',
  components: {
    LineChart,
    BarChart,
    TaskList,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    UserTable : () => import('~/components/Dashboard/UserTable.vue')
  },
  data () {
    return {
      start_date:null,
      end_date:null,
      bigLineChart: {
        activeIndex: 0,
        chartData: {
          datasets: [{
            ...bigChartDatasetOptions,
            data: []
          }],
          labels: []
        },
        extraOptions: chartConfigs.purpleChartOptions,
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
        categories: []
      },
      purpleLineChart: {
        extraOptions: chartConfigs.purpleChartOptions,
        chartData: {
          labels: [],
          datasets: [
            {
              ...purpleChartDatasetOptions,
              data: []
            }
          ]
        },
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.2, 0]
      },
      greenLineChart: {
        extraOptions: chartConfigs.greenChartOptions,
        chartData: {
          labels: [],
          datasets: [
            {
              ...greenChartDatasetOptions,
              data: []
            }
          ]
        },
        gradientColors: [
          'rgba(66,134,121,0.15)',
          'rgba(66,134,121,0.0)',
          'rgba(66,134,121,0)'
        ],
        gradientStops: [1, 0.4, 0]
      }
    };
  },
  computed: {
    enableRTL () {
      return this.$route.query.enableRTL;
    },
    isRTL () {
      return this.$rtl.isRTL;
    },
    bigLineChartCategories () {
      return [{ name: 'Accounts', icon: 'tim-icons icon-single-02' }, {
        name: 'Purchases',
        icon: 'tim-icons icon-gift-2'
      }, { name: 'Sessions', icon: 'tim-icons icon-tap-02' }];
    }
  },
  methods: {
    initBigChart (data, labels) {
      let chartData = {
        datasets: [{
          ...bigChartDatasetOptions,
          data
        }],
        labels
      };
      this.$refs.bigChart.updateGradients(chartData);
      this.bigLineChart.chartData = chartData;
    },
    initVictimsChart (data, labels) {
      let chartData = {
        datasets: [{
          ...purpleChartDatasetOptions,
          data
        }],
        labels
      };
      this.$refs.greenChart.updateGradients(chartData);
      this.purpleLineChart.chartData = chartData;
    },
    initReportedChart (data, labels) {
      let chartData = {
        datasets: [{
          ...greenChartDatasetOptions,
          data
        }],
        labels
      };
      this.$refs.purpleChart.updateGradients(chartData);
      this.greenLineChart.chartData = chartData;
    },
    async loadDashboardStats(){
      try {
        if(this.start_date && this.end_date && moment(this.start_date).isAfter(this.end_date)){
          return this.$notify({type:'danger', message:"End date must be greater than start date"})
        }
        const response = await this.$axios.get(`fetch/dashboard/stats`,{
          params:{
            start_date: this.start_date ? moment(this.start_date).format('YYYY-MM-DD') : null,
            end_date: this.end_date ? moment(this.end_date).format('YYYY-MM-DD') : null
            }
        });

        console.log(response.data)

        if(response && response.data){
          const { products_stats, reported_cases, victims_stats } = response.data;
            let product_labels = [];
            let product_data = []
            let victims_labels = [];
            let victims_data = []
            let reported_cases_labels = [];
            let reported_cases_data = []

            products_stats.forEach((stat)=>{
              product_labels.push(stat.created_at);
              product_data.push(stat.counts)
            });
            reported_cases.forEach((stat)=>{
              reported_cases_labels.push(stat.created_at);
              reported_cases_data.push(stat.counts)
            });
            victims_stats.forEach((stat)=>{
              victims_labels.push(stat.created_at);
              victims_data.push(stat.counts)
            });
            this.initReportedChart(reported_cases_data, reported_cases_labels);
            this.initVictimsChart(victims_data, victims_labels);
            this.initBigChart(product_data,product_labels);
        }
      } catch (error) {
        console.log(error)
          this.$notify({ type:'danger', message:"Error fetching dashboard stats" })
      }
    }
  },
  mounted () {
    this.loadDashboardStats();
  },
  watch:{
      start_date(newDate, oldDate){
        if(newDate && this.end_date){
          this.loadDashboardStats()
        }
      },
      end_date(newDate, oldDate){
        if(newDate && this.start_date){
          this.loadDashboardStats()
        }
      }
  }
}
</script>
<style></style>
