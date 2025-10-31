<script setup lang="ts">
import { sendPost } from '../../../../../types/ru34'
import { onMounted } from 'vue'

const favorite = defineModel<sendPost[]>('favoriteList')
const handleFavorite = (data: sendPost[]): void => {
  console.log('监听', data)
  favorite.value = data
}
onMounted(async () => {
  favorite.value = await window.ru34Api.favoriteList()
  window.ru34Api.handleFavoriteList(handleFavorite)
})
</script>

<template>
  <div>
    <div v-show="!favorite || favorite?.length >= 0">
      <div v-for="(item, index) in favorite" :key="index">
        {{ item.file_url }}
      </div>
    </div>
    <div v-show="favorite?.length === 0">还没有收藏</div>
  </div>
</template>

<style scoped></style>
