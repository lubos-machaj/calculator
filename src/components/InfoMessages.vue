<template>
  <div class="mb-6">
    <div
      v-if="props.type === MessageTypesEnum.SUCCESS"
      class="animate-showing p-3 text-green-800 border border-green-300 rounded-lg bg-green-50"
    >
      <slot v-if="!text" name="text"></slot>
    </div>

    <div
      v-else-if="props.type === MessageTypesEnum.WARNING"
      class="animate-showing flex items-center p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 border border-yellow-300"
      role="alert"
    >
      <svg
        class="flex-shrink-0 inline w-4 h-4 me-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
        />
      </svg>
      <span class="sr-only">Info</span>
      <div>
        <span class="font-medium" v-text="text" />
      </div>
    </div>

    <div
      v-else-if="props.type === MessageTypesEnum.ERROR"
      id="alert-2"
      class="animate-showing flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 border border-red-300"
      role="alert"
    >
      <svg
        class="flex-shrink-0 w-4 h-4"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
        />
      </svg>
      <span class="sr-only">Info</span>
      <div class="ms-3 text-sm font-medium" v-text="text" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { MessageTypes } from '../types'
  import { MessageTypesEnum } from '../enums'

  const props = defineProps<{
    text?: string
    type?: MessageTypes
  }>()
</script>
