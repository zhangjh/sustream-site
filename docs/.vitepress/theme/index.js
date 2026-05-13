import DefaultTheme from 'vitepress/theme'
import './custom.css'
import LatestRelease from './components/LatestRelease.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('LatestRelease', LatestRelease)
  }
}
