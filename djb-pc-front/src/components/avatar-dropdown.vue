<template>
  <a-dropdown
    v-if="currentUser && currentUser.name"
    class="ant-pro-dropdown ant-pro-dropdown-action"
    :class="{ 'ant-pro-dropdown-action-before': menu }"
    placement="bottomRight"
    overlayClassName="pro-components-header-dropdown-index-container"
  >
    <span>
      <a-avatar size="small" :src="avatar" class="ant-pro-header-account-avatar" />
      <span class="ant-pro-header-account-name anticon">{{ currentUser.name }}</span>
    </span>
    <template v-slot:overlay>
      <a-menu class="ant-pro-dropdown-menu" v-if="menu" :selected-keys="[]">
        <!-- <a-menu-item v-if="menu" key="center" @click="handleToCenter">
          <template #icon><user-outlined /></template>
          个人中心
        </a-menu-item>
        <a-menu-item v-if="menu" key="settings" @click="handleToSettings">
          <template #icon><setting-outlined /></template>
          个人设置
        </a-menu-item> -->
        <!-- <a-menu-divider v-if="menu" /> -->
        <a-menu-item key="logout" @click="handleLogout">
          <template #icon><logout-outlined /></template>
          退出登录
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  <span v-else>
    <a-spin size="small" :style="{ marginLeft: 8, marginRight: 8 }" />
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons-vue';
import { LogoutOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useUserStore } from '@/store/user';
import defaultAvatar from '@/assets/leyaoyao.png';
import { computed } from 'vue';

export default defineComponent({
  name: 'AvatarDropdown',
  props: {
    currentUser: {
      type: Object,
      default: () => null,
    },
    menu: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const userStore = useUserStore();
    const { t } = useI18n();

    const avatar = computed(() => {
      return props.currentUser?.avatar ?? defaultAvatar;
    });
    console.log('🚀 ~ avatar ~ props.currentUser:', props.currentUser);
    const handleToCenter = () => {
      router.push({ path: '/account/center' });
    };
    const handleToSettings = () => {
      router.push({ path: '/account/settings' });
    };
    const handleLogout = () => {
      userStore.LOGOUT().then(res => {
        const { code } = res;
        if (code === '0000000') {
          sessionStorage.clear();
          router.push('/login');
        }
        // location.replace(
        //   `${process.env.VUE_APP_PUBLIC_PATH} + ${loginRoutePath}`.replaceAll('//', '/'),
        // );
      });
    };

    return {
      t,
      avatar,
      handleToCenter,
      handleToSettings,
      handleLogout,
    };
  },
  components: {
    // UserOutlined,
    // SettingOutlined,
    LogoutOutlined,
  },
});
</script>

<style lang="less">
body {
  @import './header-dropdown.less';
  .ant-pro-dropdown.ant-pro-dropdown-action-before {
    position: relative;
    display: flex;
    align-items: center;
    &:before {
      border-right: 1px solid #ebebeb;
      content: '';
      height: 18px;
      left: 0px;
      position: absolute;
      top: 16px;
      width: 0;
    }
  }
  .ant-pro-header-account-name {
    vertical-align: unset;
  }
  .ant-pro-header-account-avatar {
    margin: 12px 8px 12px 0;
    color: @primary-color;
    vertical-align: top;
    background: hsla(0, 0%, 100%, 0.85);
  }
  .ant-pro-dropdown .ant-pro-header-account-name {
    font-size: 14px !important;
    margin-left: 4px;
  }
}
</style>
@/store/user @/store/user
