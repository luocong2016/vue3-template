<template>
  <div>
    <Searchable :object="data" />
    {{ data }}
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import Searchable, { addConditionGroupItem } from './Searchable.vue'

const data = reactive(addConditionGroupItem())
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
