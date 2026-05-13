<script setup>
import { ref, onMounted } from 'vue'

const version = ref('加载中...')
const publishDate = ref('')
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await fetch('https://api.github.com/repos/zhangjh/sustream-site/releases/latest')
    if (!res.ok) throw new Error('fetch failed')
    const data = await res.json()
    version.value = data.tag_name.startsWith('v') ? data.tag_name : `v${data.tag_name}`
    publishDate.value = data.published_at.split('T')[0]
  } catch (e) {
    version.value = '获取失败'
    publishDate.value = ''
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="latest-release">
    <span class="release-badge">🚀 最新版本</span>
    <span class="release-version">{{ version }}</span>
    <span v-if="publishDate" class="release-date">· 发布于 {{ publishDate }}</span>
  </div>
</template>

<style scoped>
.latest-release {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 8px;
  background: var(--vp-c-brand-soft);
  margin: 16px 0;
  font-size: 15px;
  flex-wrap: wrap;
}

.release-badge {
  font-weight: 600;
  color: var(--vp-c-brand-1);
}

.release-version {
  font-weight: 700;
  font-size: 16px;
  color: var(--vp-c-brand-1);
}

.release-date {
  color: var(--vp-c-text-2);
  font-size: 14px;
}
</style>
