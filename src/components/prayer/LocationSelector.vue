<template>
  <div class="flex flex-col md:flex-row items-end gap-6 w-full">
    <div class="flex-1 w-full space-y-2">
      <label class="block text-sm font-medium text-gray-600 dark:text-gray-300">اختر البلد</label>
      <div class="relative">
        <select v-model="selectedCountry" @change="handleCountryChange"
          class="w-full appearance-none bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 pr-8 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all cursor-pointer text-gray-700 dark:text-white font-arabic">
          <option v-for="country in locations" :key="country.country" :value="country">
            {{ country.name_ar }}
          </option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-500">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>

    <div class="flex-1 w-full space-y-2">
      <label class="block text-sm font-medium text-gray-600 dark:text-gray-300">اختر المدينة</label>
      <div class="relative">
        <select v-model="selectedCity" @change="handleCityChange"
          class="w-full appearance-none bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 pr-8 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all cursor-pointer text-gray-700 dark:text-white font-arabic"
          :disabled="!selectedCountry">
          <option v-for="city in availableCities" :key="city.name" :value="city">
            {{ city.name_ar }}
          </option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-500">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>

    <button @click="applyLocation" :disabled="!hasChanges || loading"
      class="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-xl transition-colors flex items-center justify-center gap-2 min-w-[140px]">
      <span v-if="loading" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
      <span v-else>عرض المواقيت</span>
    </button>
  </div>
</template>

<script setup>
import { usePrayerStore } from '@/stores/prayer'
import { locations } from '@/utils/locations'
import { storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'

const store = usePrayerStore()
const { country, city, loading } = storeToRefs(store)

const selectedCountry = ref(null)
const selectedCity = ref(null)

const availableCities = computed(() => {
  return selectedCountry.value?.cities || []
})

const hasChanges = computed(() => {
  if (!selectedCountry.value || !selectedCity.value) return false
  return selectedCountry.value.country !== store.country || selectedCity.value.name !== store.city
})

// Properly watch store changes to update local state if needed
watch([() => store.country, () => store.city], ([newCountry, newCity]) => {
  // Find country object
  const c = locations.find(loc => loc.country === newCountry)
  if (c) {
    selectedCountry.value = c
    // Find city object
    const ct = c.cities.find(ci => ci.name === newCity)
    if (ct) {
      selectedCity.value = ct
    } else if (c.cities.length) {
      selectedCity.value = c.cities[0]
    }
  } else {
    // Default fallback if country not found in list (e.g. initial store state mismatch)
    if (locations.length) {
      selectedCountry.value = locations[0]
      if (locations[0].cities.length) selectedCity.value = locations[0].cities[0]
    }
  }
}, { immediate: true })

const handleCountryChange = () => {
  // Auto-select first city when country changes
  if (selectedCountry.value?.cities?.length) {
    selectedCity.value = selectedCountry.value.cities[0]
  } else {
    selectedCity.value = null
  }
}

const handleCityChange = () => {
  // Required for @change event in template
}

const applyLocation = async () => {
  if (selectedCountry.value && selectedCity.value) {
    await store.setLocation(
      selectedCity.value.name,
      selectedCountry.value.country,
      selectedCity.value.name_ar,
      selectedCountry.value.name_ar
    )
  }
}
</script>

<style scoped>
.font-arabic {
  font-family: var(--font-arabic);
}
</style>
