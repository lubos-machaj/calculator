<template>
  <div class="mb-6 animate-showing">
    <label for="period-start" class="block text-md font-medium text-gray-700">
      {{ props.label }} <span class="text-sm text-gray-400">(required)</span>
    </label>
    <input
      v-model="model"
      @change="$emit('changeDate')"
      type="date"
      :min="minDate"
      id="period-start"
      name="period-start"
      class="p-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
    />
  </div>
</template>

<script setup lang="ts">
  defineEmits(['changeDate'])
  const model = defineModel()
  const props = defineProps<{
    label?: string
    minDate?: string
  }>()
</script>
