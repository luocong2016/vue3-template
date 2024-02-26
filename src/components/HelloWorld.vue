<template>
  <div>
    <Searchable :object="data" />
    {{ data }}
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import Searchable from './Searchable.vue'

const data = reactive({
  logic: 'and',
  field: '',
  type: '',
  symbol: '',
  value: '',
  condition: [{ field: '', symbol: '', type: '', value: '' }]
})
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
