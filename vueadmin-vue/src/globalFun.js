import Vue from 'vue'

Vue.mixin({
    methods:{
        hasAuth(perm){
            let authoritys = this.$store.state.menu.permList
            console.log(perm)
            return authoritys.indexOf(perm) > -1
        }
    }
})