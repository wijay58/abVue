<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-title v-slot="{ open }">
        <v-row no-gutters>
          Business Profile
        </v-row>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-row justify="space-around" no-gutters>
          <v-sheet class="w-full">
            <v-form>
              <v-autocomplete density="compact" multiple closable-chips chips label="Business Industry" hide-no-data
                hide-selected @update:search="search($event, 'job_company_industry')"
                @update:model-value="searchString($event, 'job_company_industry')" :items="industryItems">
              </v-autocomplete>
              <v-autocomplete density="compact" multiple closable-chips chips label="Business Name" hide-no-data
                hide-selected @update:search="search($event, 'job_company_name')"
                @update:model-value="searchString($event, 'job_company_name')" :items="companyItems">
              </v-autocomplete>
              <p>Business Size</p>
              <v-checkbox class="-mb-5" density="compact" v-model="selectedSizes" @change="searchString($event)"
                value="1-10" label="1-10"></v-checkbox>
              <v-checkbox class="-mb-5" density="compact" v-model="selectedSizes" @change="searchString($event)"
                value="11-50" label="11-50"></v-checkbox>
              <v-checkbox class="-mb-5" density="compact" v-model="selectedSizes" @change="searchString($event)"
                value="51-200" label="51-200"></v-checkbox>
              <v-checkbox class="-mb-5" density="compact" v-model="selectedSizes" @change="searchString($event)"
                value="201-500" label="201-500"></v-checkbox>
              <v-checkbox class="-mb-5" density="compact" v-model="selectedSizes" @change="searchString($event)"
                value="501-1000" label="501-1000"></v-checkbox>
              <v-checkbox class="-mb-5" density="compact" v-model="selectedSizes" @change="searchString($event)"
                value="1001-5000" label="1001-5000"></v-checkbox>
              <v-checkbox class="-mb-5" density="compact" v-model="selectedSizes" @change="searchString($event)"
                value="5001-10000" label="5001-10000"></v-checkbox>
              <v-checkbox class="-mb-5" density="compact" v-model="selectedSizes" @change="searchString($event)"
                value="10000+" label="10000+"></v-checkbox>
              <v-text-field density="compact" v-model="firstname" label="Technologies"></v-text-field>
              <v-text-field density="compact" v-model="firstname" label="Key Words"></v-text-field>
              <p class="mb-2">Total Funding</p>
              <p class="mb-2">Revenue Range</p>
              <v-text-field density="compact" v-model="firstname" label="Hiring for job title"></v-text-field>
            </v-form>
          </v-sheet>
        </v-row>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>
import axiosClient from '@/plugins/axios';
import { ref } from 'vue';
import { useTableStore } from '@/store/table'
import { storeToRefs } from 'pinia'

const store = useTableStore()
const { searchData } = store
let { searchURL } = storeToRefs(useTableStore())

let industryItems = ref([]);
let companyItems = ref([]);
let selectedSizes = ref([]);
let industries = [];
let companies = [];

const search = async (text, field) => {
  axiosClient.get(`https://api.abillionleads.com/suggest?field=${field}&text=${text}`)
    .then(res => {
      switch (field) {
        case 'job_company_industry':
          industryItems.value = res.data
          break;
        case 'job_company_name':
          companyItems.value = res.data
          break;
        default:
          break;
      }
    })
    .catch(err => {
      console.log(err)
    })
}

const searchString = (event, field) => {

  if (field) {
    switch (field) {
      case 'job_company_industry':
        industries = '"' + event.join('","') + '"';
        break;
      case 'job_company_name':
        companies = '"' + event.join('","') + '"';
        break;
      default:
        break;
    }
  }

  const job_company_size = '"' + selectedSizes.value.join('","') + '"';

  let temp = `https://api.abillionleads.com/search/?value={"location_country":[],
  "location_locality":[],"industry":[],"skills":[],"interests":[],"certifications":[],"schoolnames":[],
  "degrees":[],"job_title":[],"job_title_levels":[],"languages":[],"job_company_name":[${companies}],"job_company_size":[${job_company_size}],"job_company_industry":[${industries}]}
  &page=1`;

  const businessFilters = temp.split('"languages":[],')[1];
  const otherFilters = searchURL.value.split('"languages":[],')[0];
  const tempUrl = `${otherFilters}"languages":[],${businessFilters}`;

  const urlString = tempUrl.replaceAll('""', '');


  store.$patch({ searchURL: urlString });
  searchData()

}

</script>