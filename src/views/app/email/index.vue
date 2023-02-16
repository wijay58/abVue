<template>
  <div class="md:flex md:space-x-5 overflow-hidden relative">
    <div class="w-full flex-1">
      <Card bodyClass="h-full flex flex-col  overflow-auto">
        <div class="bg-white dark:bg-slate-900 rounded-md sticky top-0 mx-6 mt-6">
          <Button icon="heroicons-outline:plus" text="Compose" btnClass="btn-dark w-full block  " @click="openEmail" />
        </div>
        <div class="mt-4 mx-4 py-2 max-h-80">
          <p class="mb-2">Filters</p>
          <PersonalProfile class="mb-5" @complete-todo="seeData" ></PersonalProfile>
          <BusinessProfile></BusinessProfile>
        </div>
      </Card>
    </div>
    <Transition name="overlay-fade">
      <div v-if="width < 1280 && mobileEmailSidebar"
        class="overlay bg-slate-900 dark:bg-slate-900 dark:bg-opacity-60 bg-opacity-60 backdrop-filter backdrop-blur-sm absolute w-full flex-1 inset-0 z-[99] rounded-md"
        @click="closeMobileEmailSidebar"></div>
    </Transition>
    <div class="w-full size">
      <Card bodyClass="h-full relative p-5">
        <v-sheet >
          <DataTable></DataTable>
        </v-sheet>
      </Card>
    </div>
    <SendMail />
  </div>
</template>
<script setup>
import Button from "@/components/Button";
import Card from "@/components/Card";
import { computed, ref, watch, onMounted } from "vue";
import { useEmailStore } from "@/store/email";
import SendMail from "./SendMail.vue";
import PersonalProfile from "./PersonalProfile.vue";
import BusinessProfile from "./BusinessProfile.vue";
import DataTable from "./DataTable.vue";

let checkbox1 = true;

const width = ref(0);
const handleResize = () => {
  width.value = window.innerWidth;
};
onMounted(() => {
  window.addEventListener("resize", handleResize);
  handleResize();
});

const seeData = (e) => {
  console.log(e)
}

let store = useEmailStore();
const openEmail = () => {
  store.openEmail();
};

// store  computed
const mobileEmailSidebar = computed(() => store.mobileEmailSidebar);

// dispatch closeMobileEmailSidebar
const closeMobileEmailSidebar = () => {
  store.closeMobileEmailSidebar();
};

</script>
<style lang="scss">
.singleEmail-enter-active {
  animation: fade-in-left 0.44s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}

.singleEmail-leave-active {
  animation: fade-in-left 0.34s cubic-bezier(0.39, 0.575, 0.565, 1) both reverse;
}

@keyframes fade-in-left {
  0% {
    transform: translateX(100%);
    opacity: 0;
  }

  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

.email_height {
  height: calc(var(--vh, 1vh) * 100 - 12.1rem);
}

@media (max-width: 768px) {
  .email_height {
    height: calc(var(--vh, 1vh) * 100 - 10.5rem);
  }
}

.size {
  flex: 3 1 0%;
}
</style>
