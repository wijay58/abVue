<template>
  <div class="md:flex justify-between pb-6 md:space-y-0 space-y-3 items-center">
    <h5>Advanced</h5>
  </div>

  <!-- mode="remote" -->
  <vue-good-table @on-page-change="onPageChange" @on-sort-change="onSortChange" @on-column-filter="onColumnFilter"
    @on-per-page-change="onPerPageChange" :totalRows="totalRecords" :isLoading.sync="loading" max-height="70vh"
    :columns="columns" styleClass=" vgt-table bordered centered" :rows="rows" :sort-options="{
      enabled: false,
    }" :pagination-options="{
      enabled: true,
      perPage: perpage,
    }" :search-options="{
      enabled: true,
      externalQuery: searchTerm,
    }" :select-options="{
      enabled: true,
      selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
      selectioninfoClass: 'custom-class',
      selectionText: 'rows selected',
      clearSelectionText: 'clear',
      disableSelectinfo: true, // disable the select info-500 panel on top
      selectAllByGroup: true, // when used in combination with a grouped table, add a checkbox in the header row to check/uncheck the entire group
    }">
    <template v-slot:table-row="props">
      <span v-if="props.column.field == 'customer'" class="flex">
        <span class="w-7 h-7 rounded-full mr-3 flex-none">
        </span>
        <span class="text-sm text-slate-600 dark:text-slate-300 capitalize">{{ props.row.customer.name }}</span>
      </span>
      <span v-if="props.column.field == 'order'">
        {{ '#' + props.row.order }}
      </span>
      <span v-if="props.column.field == 'date'" class="text-slate-500 dark:text-slate-300">
        {{ props.row.date }}
      </span>
      <span v-if="props.column.field == 'status'" class="block w-full">
        <span class="inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25" :class="`${props.row.status === 'paid'
  ? 'text-success-500 bg-success-500'
  : ''
  } 
                ${props.row.status === 'due'
    ? 'text-warning-500 bg-warning-500'
    : ''
  }
                ${props.row.status === 'cancled'
    ? 'text-danger-500 bg-danger-500'
    : ''
  }
                
        `">
          {{ props.row.status }}
        </span>
      </span>
      <span v-if="props.column.field == 'action'">
        <v-row class="gap-2">
          <span v-if="props.row.linkedin_username" class="text-sm">
            <v-icon @click="linkdIn(props.row.linkedin_username)" :icon="'fa-brands fa-linkedin'"></v-icon>
          </span>
          <span  v-if="props.row.email" class="text-sm">
            <v-icon icon="fa-solid fa-envelope" />
          </span>
        </v-row>
      </span>
    </template>
    <template #pagination-bottom="props">
      <div class="py-4 px-3">
        <Pagination :total="totalRecords" :current="current" :per-page="perpage" @page-changed="current = $event"
          :pageChanged="onPageChange" :perPageChanged="onPerPageChange" enableSearch enableSelect :options="options">
          >
        </Pagination>
      </div>
    </template>
  </vue-good-table>
</template>

<script setup>
import Pagination from '@/components/Pagination';
import axiosClient from '@/plugins/axios';
import { useTableStore } from '@/store/table'
import { storeToRefs } from 'pinia'

const { count, loading, error, tableData } = storeToRefs(useTableStore())
let { page } = useTableStore()

const store = useTableStore()
const { fetchData } = store
fetchData()

const linkdIn = (linkd) => {
  window.open(`https://www.linkedin.com/in/${linkd}`)
}

let current = page;
let perpage = 30;
let isLoading = false;
let totalRecords = count;
let searchTerm = '';
let rows = tableData;
let serverParams = {
  columnFilters: {
  },
  sort: [
    {
      field: '', // example: 'name'
      type: '' // 'asc' or 'desc'
    }
  ],

  page: page, // what page I want to show
  perPage: 30 // how many items I'm showing per page
};

let options = [
  {
    value: '1',
    label: '1',
  },
  {
    value: '3',
    label: '3',
  },
  {
    value: '5',
    label: '5',
  },
];

let columns = [
  {
    label: 'Name',
    field: 'full_name',
  },
  {
    label: 'Title',
    field: 'job_title',
  },

  {
    label: 'Industry',
    field: 'industry',
  },

  {
    label: 'Location',
    field: 'location_country',
  },
  {
    label: 'Company Industry',
    field: 'job_company_name',
  },
  {
    label: 'Company Size',
    field: 'job_company_size',
  },
  {
    label: 'Action',
    field: 'action',
  },
];


const updateParams = (newProps) => {
  serverParams = Object.assign({}, serverParams, newProps);
  page = newProps.page;
  store.$patch({ page })
};

const onPageChange = (params) => {
  updateParams({ page: params.currentPage });
  loadItems(params);
};

const onPerPageChange = (params) => {
  updateParams({ perPage: params.currentPerPage });
  loadItems();
};

const onSortChange = (params) => {
  updateParams({
    sort: [{
      type: params.sortType,
      field: this.columns[params.columnIndex].field,
    }],
  });
  loadItems();
};

const onColumnFilter = (params) => {
  updateParams(params);
  loadItems();
};

// load items is what brings back the rows from server
const loadItems = () => {
  fetchData()
}


</script>