<template>
  <div class="flex items-center mb-2">
    <input
      v-model="model"
      :id="id"
      :name="id"
      type="checkbox"
      :value="id"
      class="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
    />
    <label :for="id" class="ml-2 block text-sm text-gray-700" v-text="label"></label>
  </div>
</template>

<script setup lang="ts">
  const model = defineModel()
  const props = defineProps<{
    id?: string
    label?: string
  }>()
</script>
