<script setup>
import { ref, watch, onMounted } from 'vue'

const ACTIVATION_API_URL = 'https://code-sustream.zhangjh.cn'

// 登录状态
const isLoggedIn = ref(false)
const username = ref('')
const password = ref('')
const loginError = ref('')
const loginLoading = ref(false)

// 数据状态
const loading = ref(false)
const error = ref('')
const codes = ref([])
const summary = ref(null)

// 分页
const currentPage = ref(1)
const totalPages = ref(1)
const total = ref(0)

// 筛选
const statusFilter = ref('all')
const searchQuery = ref('')

// 搜索防抖
let searchTimer = null

function getAdminKey() {
  return password.value
}

function getSavedKey() {
  return sessionStorage.getItem('admin_key')
}

// 删除
const deleting = ref(new Set())

async function handleDelete(code) {
  if (!confirm(`确认将激活码 ${code} 置为无效？`)) return

  const key = getSavedKey()
  if (!key) return

  deleting.value.add(code)
  try {
    const res = await fetch(`${ACTIVATION_API_URL}/admin/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Admin-Key': key,
      },
      body: JSON.stringify({ code }),
    })

    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      alert(`删除失败: ${data.message || res.status}`)
      return
    }

    await fetchData()
  } catch (e) {
    alert(`网络错误: ${e.message}`)
  } finally {
    deleting.value.delete(code)
  }
}

async function apiCall(params) {
  const key = getSavedKey()
  if (!key) {
    isLoggedIn.value = false
    return null
  }

  const res = await fetch(`${ACTIVATION_API_URL}/admin/list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Admin-Key': key,
    },
    body: JSON.stringify(params),
  })

  if (res.status === 401) {
    isLoggedIn.value = false
    sessionStorage.removeItem('admin_key')
    return null
  }

  if (!res.ok) {
    throw new Error(`请求失败: ${res.status}`)
  }

  return res.json()
}

async function handleLogin() {
  loginError.value = ''
  loginLoading.value = true

  try {
    const res = await fetch(`${ACTIVATION_API_URL}/admin/list`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Admin-Key': getAdminKey(),
      },
      body: JSON.stringify({ page: 1 }),
    })

    if (res.status === 401) {
      loginError.value = '用户名或密码错误'
      return
    }

    if (!res.ok) {
      loginError.value = `请求失败: ${res.status}`
      return
    }

    const data = await res.json()
    codes.value = data.codes || []
    summary.value = data.summary || null
    currentPage.value = data.page || 1
    totalPages.value = data.totalPages || 1
    total.value = data.total || 0
    isLoggedIn.value = true

    sessionStorage.setItem('admin_key', getAdminKey())
  } catch (e) {
    loginError.value = `网络错误: ${e.message}`
  } finally {
    loginLoading.value = false
  }
}

async function fetchData() {
  loading.value = true
  error.value = ''

  try {
    const params = {
      page: currentPage.value,
      status: statusFilter.value,
      search: searchQuery.value.trim() || undefined,
    }

    const data = await apiCall(params)
    if (!data) return

    codes.value = data.codes || []
    summary.value = data.summary || null
    currentPage.value = data.page || 1
    totalPages.value = data.totalPages || 1
    total.value = data.total || 0
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

function handleLogout() {
  isLoggedIn.value = false
  sessionStorage.removeItem('admin_key')
  codes.value = []
  summary.value = null
}

function goToPage(page) {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  fetchData()
}

function onSearchInput() {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    currentPage.value = 1
    fetchData()
  }, 400)
}

function formatTime(iso) {
  if (!iso) return '-'
  return iso.replace('T', ' ').replace(/\.\d{3}\+/, ' +').slice(0, 19)
}

// 状态筛选变化时重置分页
watch(statusFilter, () => {
  currentPage.value = 1
  fetchData()
})

onMounted(() => {
  const key = sessionStorage.getItem('admin_key')
  if (key) {
    isLoggedIn.value = true
    fetchData()
  }
})
</script>

<template>
  <!-- 登录界面 -->
  <div v-if="!isLoggedIn" class="admin-login">
    <div class="login-card">
      <h2>🔐 管理后台</h2>
      <p class="login-desc">请输入管理员凭证</p>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>用户名</label>
          <input
            v-model="username"
            type="text"
            placeholder="admin"
            autocomplete="username"
          />
        </div>
        <div class="form-group">
          <label>密码</label>
          <input
            v-model="password"
            type="password"
            placeholder="••••••••"
            autocomplete="current-password"
          />
        </div>
        <p v-if="loginError" class="error-msg">{{ loginError }}</p>
        <button type="submit" class="login-btn" :disabled="loginLoading">
          {{ loginLoading ? '验证中...' : '登录' }}
        </button>
      </form>
    </div>
  </div>

  <!-- 管理面板 -->
  <div v-else class="admin-panel">
    <div class="admin-header">
      <h2>激活码管理</h2>
      <div class="header-actions">
        <button class="refresh-btn" @click="fetchData" :disabled="loading">
          {{ loading ? '刷新中...' : '🔄 刷新' }}
        </button>
        <button class="logout-btn" @click="handleLogout">退出</button>
      </div>
    </div>

    <!-- 统计概览 -->
    <div v-if="summary" class="summary-cards">
      <div class="stat-card">
        <div class="stat-value">{{ summary.totalCodes }}</div>
        <div class="stat-label">总激活码</div>
      </div>
      <div class="stat-card stat-used">
        <div class="stat-value">{{ summary.usedCodes }}</div>
        <div class="stat-label">已激活</div>
      </div>
      <div class="stat-card stat-unused">
        <div class="stat-value">{{ summary.unusedCodes }}</div>
        <div class="stat-label">未使用</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ summary.totalOrders }}</div>
        <div class="stat-label">订单数</div>
      </div>
    </div>

    <!-- 搜索和筛选 -->
    <div class="filter-bar">
      <input
        v-model="searchQuery"
        @input="onSearchInput"
        type="text"
        class="search-input"
        placeholder="搜索激活码、订单号或设备指纹..."
      />
      <select v-model="statusFilter" class="filter-select">
        <option value="all">全部状态</option>
        <option value="unused">未使用</option>
        <option value="used">已激活</option>
        <option value="revoked">已无效</option>
      </select>
    </div>

    <p v-if="error" class="error-msg">{{ error }}</p>

    <!-- 激活码列表 -->
    <div class="data-table-wrapper">
      <table class="data-table">
        <thead>
          <tr>
            <th>激活码</th>
            <th>状态</th>
            <th>订单号</th>
            <th>创建时间</th>
            <th>激活时间</th>
            <th>设备指纹</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in codes" :key="item.code">
            <td class="code-cell">{{ item.code }}</td>
            <td>
              <span :class="['status-badge', item.status]">
                {{ item.status === 'used' ? '已激活' : item.status === 'revoked' ? '已无效' : '未使用' }}
              </span>
            </td>
            <td class="order-cell">{{ item.orderId || '接口调用' }}</td>
            <td>{{ formatTime(item.createdAt) }}</td>
            <td>{{ formatTime(item.activatedAt) }}</td>
            <td class="fingerprint-cell">{{ item.deviceFingerprint || '-' }}</td>
            <td>
              <button
                v-if="item.status !== 'revoked'"
                class="delete-btn"
                :disabled="deleting.has(item.code)"
                @click="handleDelete(item.code)"
              >
                {{ deleting.has(item.code) ? '...' : '置为无效' }}
              </button>
              <span v-else class="revoked-text">-</span>
            </td>
          </tr>
          <tr v-if="codes.length === 0 && !loading">
            <td colspan="7" class="empty-row">暂无数据</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 分页 -->
    <div v-if="totalPages > 1" class="pagination">
      <button
        class="page-btn"
        :disabled="currentPage <= 1"
        @click="goToPage(currentPage - 1)"
      >
        ‹ 上一页
      </button>
      <span class="page-info">
        第 {{ currentPage }} / {{ totalPages }} 页（共 {{ total }} 条）
      </span>
      <button
        class="page-btn"
        :disabled="currentPage >= totalPages"
        @click="goToPage(currentPage + 1)"
      >
        下一页 ›
      </button>
    </div>
    <div v-else-if="total > 0" class="pagination">
      <span class="page-info">共 {{ total }} 条</span>
    </div>
  </div>
</template>

<style scoped>
.admin-login {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.login-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 2.5rem;
  width: 100%;
  max-width: 380px;
  text-align: center;
}

.login-card h2 {
  margin: 0 0 0.5rem;
  font-size: 1.5rem;
}

.login-desc {
  color: var(--vp-c-text-2);
  margin-bottom: 1.5rem;
}

.form-group {
  text-align: left;
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: 0.3rem;
  color: var(--vp-c-text-2);
}

.form-group input {
  width: 100%;
  padding: 0.6rem 0.8rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 0.95rem;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
}

.login-btn {
  width: 100%;
  padding: 0.7rem;
  background: var(--vp-c-brand-1);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  margin-top: 0.5rem;
}

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-msg {
  color: var(--vp-c-danger-1, #e53e3e);
  font-size: 0.85rem;
  margin: 0.5rem 0;
}

.admin-panel {
  max-width: 1200px;
  margin: 0 auto;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.admin-header h2 {
  margin: 0;
  font-size: 1.4rem;
}

.header-actions {
  display: flex;
  gap: 0.5rem;
}

.refresh-btn,
.logout-btn {
  padding: 0.4rem 0.8rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-size: 0.85rem;
}

.logout-btn {
  color: var(--vp-c-danger-1, #e53e3e);
  border-color: var(--vp-c-danger-1, #e53e3e);
}

.summary-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
}

.stat-value {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.stat-label {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-top: 0.3rem;
}

.stat-used .stat-value {
  color: var(--vp-c-brand-1);
}

.stat-unused .stat-value {
  color: var(--vp-c-green-1, #22c55e);
}

.filter-bar {
  display: flex;
  gap: 0.8rem;
  margin-bottom: 1rem;
}

.search-input {
  flex: 1;
  padding: 0.5rem 0.8rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 0.9rem;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.search-input:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
}

.filter-select {
  padding: 0.5rem 0.8rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 0.9rem;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.data-table-wrapper {
  overflow-x: auto;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}

.data-table th {
  background: var(--vp-c-bg-soft);
  padding: 0.7rem 0.8rem;
  text-align: left;
  font-weight: 600;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  border-bottom: 1px solid var(--vp-c-divider);
}

.data-table td {
  padding: 0.6rem 0.8rem;
  border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

.data-table tr:last-child td {
  border-bottom: none;
}

.code-cell {
  font-family: var(--vp-font-family-mono);
  font-size: 0.8rem;
  word-break: break-all;
}

.order-cell {
  font-family: var(--vp-font-family-mono);
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.fingerprint-cell {
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  word-break: break-all;
  max-width: 220px;
}

.status-badge {
  display: inline-block;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
}

.status-badge.used {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.status-badge.unused {
  background: rgba(34, 197, 94, 0.1);
  color: var(--vp-c-green-1, #22c55e);
}

.status-badge.revoked {
  background: rgba(107, 114, 128, 0.1);
  color: #6b7280;
}

.revoked-text {
  color: var(--vp-c-text-3);
  font-size: 0.8rem;
}

.empty-row {
  text-align: center;
  color: var(--vp-c-text-3);
  padding: 2rem !important;
}

.delete-btn {
  padding: 0.2rem 0.5rem;
  border: 1px solid var(--vp-c-danger-1, #e53e3e);
  border-radius: 4px;
  background: none;
  color: var(--vp-c-danger-1, #e53e3e);
  cursor: pointer;
  font-size: 0.75rem;
}

.delete-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.delete-btn:not(:disabled):hover {
  background: var(--vp-c-danger-1, #e53e3e);
  color: white;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
  padding: 0.8rem 0;
}

.page-btn {
  padding: 0.4rem 0.8rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-size: 0.85rem;
}

.page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.page-btn:not(:disabled):hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.page-info {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
}

@media (max-width: 768px) {
  .summary-cards {
    grid-template-columns: repeat(2, 1fr);
  }

  .filter-bar {
    flex-direction: column;
  }

  .admin-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
  }
}
</style>
