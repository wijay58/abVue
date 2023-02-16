import { defineStore } from 'pinia';
import axiosClient from '@/plugins/axios';

export const useTableStore = defineStore('table', {
  state: () => ({
    count: 0,
    tableData: [],
    loading: false,
    error: null,
    page: 1,
    searchURL: `https://api.abillionleads.com/search/?value={"location_country":[],
    "location_locality":[],"industry":[],"skills":[],"interests":[],"certifications":[],"schoolnames":[],"degrees":[],
    "job_title":[],"job_title_levels":[],"languages":[],"job_company_name":[],"job_company_size":[],"job_company_industry":[]}
    &page=1`,
  }),
  actions: {
    increaseCounter() {
      this.counter = this.counter + 1
    },
    async fetchData() {
      this.loading = true
      this.posts = []
      const lol = encodeURIComponent('{}');
      const url = `https://api.abillionleads.com/search/?value=${lol}&page=${this.page}`
      axiosClient.get(url)
        .then(res => {
          this.tableData = res.data.data
          this.count = res.data.count
        })
        .catch(err => {
          this.error = err
        })
        .finally(() => {
          this.loading = false
        })
    },
    async searchData() {
      this.loading = true
      this.posts = []
      axiosClient.get(this.searchURL)
        .then(res => {
          this.tableData = res.data.data
          this.count = res.data.count
        })
        .catch(err => {
          this.error = err
        })
        .finally(() => {
          this.loading = false
        })
    }
  },
  getters: {
    getTableData: (state) => state.tableData
  }
})