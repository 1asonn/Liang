<template>
<el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="clickTap" >
  <el-tab-pane
    :key="item.name"
    v-for="(item, index) in editableTabs"
    :label="item.title"
    :name="item.name"
  >
  </el-tab-pane>
</el-tabs>

</template>



<script>
import router from '@/router'

    export  default{
        data(){
            return {}
        },

        name:"Tabs",

        computed:{
            editableTabsValue:{
                get(){
                    return this.$store.state.menu.editableTabsValue
                },
                set(val){
                    this.$store.state.menu.editableTabsValue = val
                }
            },
            editableTabs:{
                get(){
                    return this.$store.state.menu.editableTabs
                },
                set(val){
                    this.$store.state.menu.editableTabs = val
                }
            }
        },

        methods:{

        removeTab(targetName) {
            let tabs = this.editableTabs;
            let activeName = this.editableTabsValue;
            if(targetName === 'Index'){
                return 
            }
            if (activeName === targetName) {
            tabs.forEach((tab, index) => {
                if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                    activeName = nextTab.name;
                }
                }
            });
            }
            
            this.editableTabsValue = activeName;
            this.editableTabs = tabs.filter(tab => tab.name !== targetName);
            this.$router.push({name : activeName})
        },

        clickTap(target){
            this.$router.push({name : target.name})

        }
        }
    }

</script>






<style scoped>


</style>