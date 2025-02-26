<template>
  <a-layout-content class="main">
    <header :show-tabs="false" class="header">
      <div class="sys-name">{{ sysName }}</div>
      <div class="header-right">
        <!-- <user class="user" :from="1" /> -->
        <avatar-dropdown :current-user="currentUser" :menu="false" />
        <logout-outlined class="logout" @click="handleLogout" />
      </div>
    </header>
    <div class="content">
      <lyy-select-merchant
        :prop="prop"
        :store="$store"
        @selected="handleSelected"
      ></lyy-select-merchant>
    </div>
    <div class="icp-tip">Copyright © 2015-2022 广东星云开物科技股份有限公司 粤ICP备16014453号</div>
  </a-layout-content>
</template>
<script lang="ts" setup>
// import { ref, getCurrentInstance, computed } from 'vue';
import { ref, computed } from 'vue';
// import User from '../layout/components/header/user.vue';
import { default as AvatarDropdown } from '@/components/avatar-dropdown.vue';
import { LogoutOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
// import { logout } from '@/api/user/login';
import Prop from './prop';
import { useStore } from 'vuex';
// import { clearAuthCode } from '@/utils/tools';
import { LOGOUT, useUserStore, GET_REGION, GET_TENANT_INFO } from '@/store/user';

const prop = ref(Prop);

prop.value.merchantList = JSON.parse(sessionStorage.getItem('merchantList'));

const $store = useStore();

const userStore = useUserStore();

const $router = useRouter();

const currentUser = computed(() => userStore.accountInfo);
console.log('🚀 ~ currentUser:', currentUser);

const sysName = ref(process.env.VUE_APP_SYS_NAME);

// const appInstance = getCurrentInstance();

// prop.value.merchantList = $store.state.merchant.merchantList;
const handleSelected = async (data: Array<object>) => {
  console.log('🚀 ~ handleSelected ~ data:', data);
  const [tenant, org] = data;
  tenant && sessionStorage.setItem('tenant', tenant.tenantId);
  if (org) {
    sessionStorage.setItem('org', org.authOrgId);
    sessionStorage.setItem('orgInfo', JSON.stringify(org));
  }
  // const allRouters = await userStore.GENERATE_ROUTES_DYNAMIC();
  // console.log('allRouters', allRouters);
  // clearAuthCode();
  // 获取地区信息
  // const reginRes = await userStore[GET_REGION]();
  // sessionStorage.setItem('timezone', reginRes.timezone);
  // await userStore[GET_TENANT_INFO]();
  // console.log('🚀 ~ handleSuccess ~ store:', $store.state.user.tenantInfo);
  // sessionStorage.setItem('merchantUserInfo', JSON.stringify($store.state.user.tenantInfo));
  $router.push('/1323315473618706432');
};

const handleLogout = async () => {
  const res = await userStore[LOGOUT]();
  if (res.code === '0000000') {
    sessionStorage.clear();
    $router.push('/login');
  }
};
</script>
<style lang="less" scoped>
.main {
  min-height: 100vh;
  background: url('../../../assets/bg.png') no-repeat;
  padding-bottom: 36px;
  display: flex;
  flex-direction: column;
  background-size: cover;
}
.header {
  height: 48px;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  color: #ffffff;
  .sys-name {
    font-size: 20px;
    font-weight: 600;
  }
  .header-right {
    display: flex;
    align-items: center;
    gap: 24px;
    :deep(.anticon-logout) {
      font-size: 16px;
    }
  }
}
.content {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex: 1;
}
@media screen and (min-width: 1600px) {
  .content {
    padding: 0;
  }
}
@media screen and (min-width: 1200px) and (max-width: 1599px) {
  .content {
    padding-top: 48px;
  }
}
.icp-tip {
  display: flex;
  justify-content: center;
  margin-top: 16px;
  font-size: 12px;
  color: #fff;
  opacity: 0.6;
}
</style>
