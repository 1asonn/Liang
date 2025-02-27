import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export const i18n = new VueI18n({
    locale: 'zh-TW',
    messages: {
        'zh-TW': require('./lang/zh-TW').default,
        'zh-CN': require('./lang/zh-CN').default
    }
})

export default i18n