// Custom Directives Plugin
import api from './api'
import directives from './directives'
import filters from './filters'

export default {
  install(app) {
    // Register all custom directives
    Object.keys(directives).forEach(key => {
      app.directive(key, directives[key])
    })

    // Register global properties
    app.config.globalProperties.$filters = filters
    app.config.globalProperties.$api = api

    // Provide API globally
    app.provide('api', api)
  }
}
