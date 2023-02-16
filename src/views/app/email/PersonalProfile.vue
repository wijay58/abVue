<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-title v-slot="{ open }">
        <v-row no-gutters>
          Personal Profile
        </v-row>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-row justify="space-around" no-gutters>
          <v-sheet class="w-full">
            <v-form>
              <v-autocomplete density="compact" multiple chips closable-chips label="Country" hide-no-data hide-selected
                @update:search="search($event, 'location_country')"
                @update:model-value="searchString($event, 'location_country')" :items="countryItems">
              </v-autocomplete>
              <v-autocomplete density="compact" multiple chips closable-chips label="City" hide-no-data hide-selected
                @update:search="search($event, 'location_locality')"
                @update:model-value="searchString($event, 'location_locality')" :items="cityItems">
              </v-autocomplete>
              <v-autocomplete density="compact" multiple chips closable-chips label="Industry"
                @update:search="search($event, 'industry')" @update:model-value="searchString($event, 'industry')"
                :items="industryItems" hide-no-data hide-selected>
              </v-autocomplete>
              <v-autocomplete density="compact" multiple chips closable-chips label="Skills"
                @update:search="search($event, 'skills')" @update:model-value="searchString($event, 'skills')"
                :items="skillsItems" hide-no-data hide-selected>
              </v-autocomplete>
              <v-autocomplete density="compact" multiple chips closable-chips label="Interests"
                @update:search="search($event, 'interests')" @update:model-value="searchString($event, 'interests')"
                :items="interestsItems" hide-no-data hide-selected>
              </v-autocomplete>
              <v-autocomplete density="compact" multiple chips closable-chips label="Certifications"
                @update:search="search($event, 'certifications')"
                @update:model-value="searchString($event, 'certifications')" :items="certificationsItems" hide-no-data
                hide-selected>
              </v-autocomplete>
              <v-autocomplete density="compact" multiple chips closable-chips label="Schools Attended"
                @update:search="search($event, 'schoolnames')" @update:model-value="searchString($event, 'schoolnames')"
                :items="schoolnamesItems" hide-no-data hide-selected>
              </v-autocomplete>
              <v-autocomplete density="compact" multiple chips closable-chips label="Degrees"
                @update:search="search($event, 'degrees')" @update:model-value="searchString($event, 'degrees')"
                :items="degreesItems" hide-no-data hide-selected>
              </v-autocomplete>
              <v-autocomplete density="compact" multiple chips closable-chips label="Job Title"
                @update:search="search($event, 'job_title')" @update:model-value="searchString($event, 'job_title')"
                :items="jobtitleItems" hide-no-data hide-selected>
              </v-autocomplete>
              <p>Seniority</p>
              <v-checkbox class="-mb-5" density="compact" @change="searchString($event)" value="owner"
                v-model="selectedJobTitles" label="Owner"></v-checkbox>
              <v-checkbox class="-mb-5" density="compact" @change="searchString($event)" v-model="selectedJobTitles"
                value="cxo" label="CXO"></v-checkbox>
              <v-checkbox class="-mb-5" density="compact" @change="searchString($event)" v-model="selectedJobTitles"
                value="partner" label="Partner"></v-checkbox>
              <v-checkbox class="-mb-5" density="compact" @change="searchString($event)" v-model="selectedJobTitles"
                value="vp" label="VP"></v-checkbox>
              <v-checkbox class="-mb-5" density="compact" @change="searchString($event)" v-model="selectedJobTitles"
                value="director" label="Director"></v-checkbox>
              <v-checkbox class="-mb-5" density="compact" @change="searchString($event)" v-model="selectedJobTitles"
                value="manager" label="Manager"></v-checkbox>
              <v-checkbox class="-mb-5" density="compact" @change="searchString($event)" v-model="selectedJobTitles"
                value="senior" label="Senior"></v-checkbox>
              <v-checkbox class="-mb-5" density="compact" @change="searchString($event)" v-model="selectedJobTitles"
                value="training/intern" label="Intern"></v-checkbox>
              <v-checkbox class="-mb-5" density="compact" @change="searchString($event)" v-model="selectedJobTitles"
                value="unpaid" label="Unpaid"></v-checkbox>
              <p class="mb-2">Personal Data</p>
              <v-text-field density="compact" v-model="firstname" label="Buy Intent"></v-text-field>
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

let { searchURL } = storeToRefs(useTableStore())
const store = useTableStore()
const { searchData } = store

let countryItems = ref([]);
let cityItems = ref([]);
let industryItems = ref([]);
let skillsItems = ref([]);
let interestsItems = ref([]);
let certificationsItems = ref([]);
let schoolnamesItems = ref([]);
let degreesItems = ref([]);
let jobtitleItems = ref([]);
let selectedJobTitles = ref([]);
let country = [];
let city = [];
let industry = [];
let skills = [];
let interests = [];
let certifications = [];
let schoolnames = [];
let degrees = [];
let job_title = [];

const search = async (text, field) => {
  axiosClient.get(`https://api.abillionleads.com/suggest?field=${field}&text=${text}`)
    .then(res => {
      switch (field) {
        case 'location_country':
          countryItems.value = res.data
          break;
        case 'location_locality':
          cityItems.value = res.data
          break;
        case 'industry':
          industryItems.value = res.data
          break;
        case 'skills':
          skillsItems.value = res.data
          break;
        case 'interests':
          interestsItems.value = res.data
          break;
        case 'certifications':
          certificationsItems.value = res.data
          break;
        case 'schoolnames':
          schoolnamesItems.value = res.data
          break;
        case 'degrees':
          degreesItems.value = res.data
          break;
        case 'job_title':
          jobtitleItems.value = res.data
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
      case 'location_country':
        country = '"' + event.join('","') + '"';
        break;
      case 'location_locality':
        city = '"' + event.join('","') + '"';
        break;
      case 'industry':
        industry = '"' + event.join('","') + '"';
        break;
      case 'skills':
        skills = '"' + event.join('","') + '"';
        break;
      case 'interests':
        interests = '"' + event.join('","') + '"';
        break;
      case 'certifications':
        certifications = '"' + event.join('","') + '"';
        break;
      case 'schoolnames':
        schoolnames = '"' + event.join('","') + '"';
        break;
      case 'degrees':
        degrees = '"' + event.join('","') + '"';
        break;
      case 'job_title':
        job_title = '"' + event.join('","') + '"';
        break;
      default:
        break;
    }
  }

  const job_title_levels = '"' + selectedJobTitles.value.join('","') + '"';

  let temp = `https://api.abillionleads.com/search/?value={"location_country":[${country}],
  "location_locality":[${city}],"industry":[${industry}],"skills":[${skills}],"interests":[${interests}],"certifications":[${certifications}],"schoolnames":[${schoolnames}],
  "degrees":[${degrees}],"job_title":[${job_title}],"job_title_levels":[${job_title_levels}],"languages":[],"job_company_name":[],"job_company_size":[],"job_company_industry":[]}
  &page=1`;

  const personalFilters = temp.split('"languages":[],')[0];
  const otherFilters = searchURL.value.split('"languages":[],')[1];
  const tempUrl = `${personalFilters}"languages":[],${otherFilters}`;

  const urlString = tempUrl.replaceAll('""', '');

  store.$patch({ searchURL: urlString });
  searchData()
}

</script>