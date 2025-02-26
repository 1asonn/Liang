<template>
  <div class="line"></div>
  <div class="main" @click="onClick">
    <layout-outlined id="setting-drawer-handle"></layout-outlined>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue';
import { LayoutOutlined } from '@ant-design/icons-vue';
import { useAppStore } from '@/store/app';

defineComponent({
  name: 'theme-button',
});

const appStore = useAppStore();

const onClick = () => {
  appStore.SET_SHOW_THEME_SETTING(true);
};
</script>

<style lang="less" scoped>
.main {
  position: relative;
  font-size: 18px;
  cursor: pointer;
  opacity: 0.8;
}

.line {
  position: relative;
  width: 1px;

  &::before {
    position: absolute;
    content: '';
    height: 18px;
    top: 50%;
    transform: translateY(-50%);
    background-color: #ebebeb;
    width: 100%;
  }
}
</style>
