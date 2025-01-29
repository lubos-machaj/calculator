<template>
  <div class="mb-6">
    <label for="insurance-type" class="block text-md font-medium text-gray-700">
     {{ label }} <span class="text-sm text-gray-400">(required)</span>
    </label>
    <div class="select-wrapper">
    <select id="insurance-type" name="insurance-type" v-model="model"
    class="p-3 mt-1 block w-full rounded-md border border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
        <option disabled value="">Please select one</option>
        <option v-for="(value, key) in props.items" :key="key" :value="key">{{ value }}</option>
    </select>
    <svg class="select-icon w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
    </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SelectType } from '../types';

const model = defineModel()
const props = defineProps<{
  label?: string,
  items?: SelectType
}>()
</script>

<style scoped>
  .select-wrapper {
    position: relative;
  }
  select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }
  .select-icon {
    position: absolute;
    right: 17px;
    top: 40%;
    pointer-events: none;
  }
</style>
