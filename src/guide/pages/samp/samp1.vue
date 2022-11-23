<script setup lang="ts">
import Basic from '~/guide/pages/interface.md'
import { EState } from '~/types/enums/guide'

enum UNIT_POSITION {
  FRONT, // 0
  BACK, // 1
}

const position = UNIT_POSITION.FRONT

console.log({ EState }, Object.keys(EState).length)
console.log({ UNIT_POSITION }, Object.keys(UNIT_POSITION).length, position)
</script>

<template>
  <div>
    <div>
      Sample
    </div>
    <Basic />
  </div>
</template>

  <route lang="yaml">
meta:
  layout: guide
  </route>

