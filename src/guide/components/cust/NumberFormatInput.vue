<script setup lang="ts">
const { modelValue } = defineProps<{
  modelValue: number
}>()

const emit = defineEmits(['update:modelValue'])

const localedNumber = computed({
  get: () => {
    return Intl.NumberFormat('ko-KR').format(modelValue)
  },
  set: (val) => {
    if (!val)
      val = '0'
    const numStr = val.replace(/[^0-9]/g, '')

    emit('update:modelValue', Number(numStr))
  },
})
</script>

<template>
  <input v-model="localedNumber" type="text" class="border-2 p-1">
</template>

<style scoped>

</style>
