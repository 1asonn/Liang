<template>
  <a-dropdown :trigger="['click']" placement="bottomRight" v-model:visible="visible">
    <span @click="handleClick" class="store-reference">
      <span class="tag">{{ tagText }}</span>
      <span class="store-name anticon">{{ curStoreName }}</span>
      <down-outlined class="arr-down" />
    </span>
    <template #overlay>
      <div class="panel" :class="{ 'pb-48': showButton }">
        <div class="search">
          <a-input-search
            v-model:value="searchValue"
            @search="handleSearch"
            placeholder="请输入门店名称"
            :allowClear="true"
          ></a-input-search>
        </div>
        <a-menu @click="handleMenuClick" v-model:selectedKeys="selectedKeys">
          <a-menu-item v-for="item in renderData" :key="item[id]">
            <span class="tag">{{ getTagText(item[tagField]) }}</span>
            <span>{{ item[name] }}</span>
          </a-menu-item>
        </a-menu>
        <div class="button" v-if="showButton" @click="handleChangeMerchant">切换商户</div>
      </div>
    </template>
  </a-dropdown>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex';
import { DownOutlined } from '@ant-design/icons-vue';
import { computed, ref, watchEffect } from 'vue';
import type { MenuProps } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { tagTextMap, tagConfig, storeFieldNames } from '@/views/user/selectMerchant/prop';
// import { ActionsTypes } from '@/store/modules/tagsView';
import { useUserStore } from '@/store/user';
import { clearAuthCode } from '@/utils/tools';
import { useMultiTab } from '@/components/multi-tab/multi-tab-store';

const renderData = ref([]);

const $store = useStore();
const $router = useRouter();
const userStore = useUserStore();

const storeList = computed(() => {
  return $store.state.merchant?.curStoreList;
});

const [{ closeAllCache }] = useMultiTab();

const merchantList = computed(() => {
  return $store.state.merchant.merchantList;
});

const showButton = computed(() => {
  return merchantList.value.length > 1;
});

const id = ref(storeFieldNames.id ?? 'id');
const name = ref(storeFieldNames.name ?? 'name');
const tagField = ref(tagConfig.field ?? 'tag');

const visible = ref(false);

const initStore = JSON.parse(sessionStorage.getItem('orgInfo') as string);

const curStoreName = ref(initStore[name.value]);

const tag = ref(initStore[tagField.value]);

const searchValue = ref('');

const selectedKeys = ref([sessionStorage.getItem('org')]);

const getTagText = (tag: string | number) => {
  const one = tagTextMap.find(item => {
    return item.origin === tag;
  });
  return one?.result ?? tag;
};

const tagText = computed(() => {
  const res = getTagText(tag.value);
  return res;
});

const handleClick = () => {
  visible.value = true;
};

// const appInstance = getCurrentInstance();

const handleMenuClick: MenuProps['onClick'] = async ({ key }) => {
  const curSelect = renderData.value.find(item => item[id.value as string] === key) || {};
  curStoreName.value = curSelect[name.value as string] ?? '';
  tag.value = curSelect[tagField.value];
  sessionStorage.setItem('org', key as string);
  sessionStorage.setItem('orgInfo', JSON.stringify(curSelect));
  visible.value = false;
  renderData.value = storeList.value;
  searchValue.value = '';
  $router.push('/1323315473618706432');
  setTimeout(() => {
    closeAllCache();
    userStore.GET_TIMEZONE_CURRENCY();
    userStore.GENERATE_ROUTES_DYNAMIC();
    clearAuthCode();
  }, 0);
};

const handleSearch = () => {
  renderData.value = searchValue.value
    ? storeList.value.filter(item => {
        return item[name.value as string].includes(searchValue.value);
      })
    : storeList.value;
};

const handleChangeMerchant = async () => {
  // $store.dispatch(ActionsTypes.deleteAllViews);
  await closeAllCache();
  clearAuthCode();
  $router.replace('/select-merchant');
};

watchEffect(() => {
  renderData.value = storeList.value;
});
</script>
<style lang="less" scoped>
.store-reference {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
}
.panel {
  position: relative;
  padding: 16px;
  background-color: #fff;
  box-shadow:
    0 3px 6px -4px #0000001f,
    0 6px 16px #00000014,
    0 9px 28px 8px #0000000d;
  margin-top: 8px;
  &.pb-48 {
    padding-bottom: 48px;
  }
  &::after {
    position: absolute;
    display: block;
    content: '';
    height: 0;
    width: 0;
    border-width: 6px;
    border-color: transparent;
    border-style: solid;
    border-bottom-color: #fff;
    border-top-width: 0;
    top: -5px;
    right: 48px;
  }

  .search {
    margin-bottom: 8px;
  }

  :deep(.ant-menu-vertical .ant-menu-item) {
    height: 36px;
    line-height: 36px;
    border-bottom: 1px solid #f7f8fb;
    margin: 0;
    &:last-child {
      border: none;
    }
  }

  :deep(.ant-menu) {
    max-height: 244px;
    overflow-y: auto;

    &.ant-menu-vertical {
      border: none;
    }
  }
}
.button {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 42px;
  line-height: 42px;
  text-align: center;
  background-color: #f7f8fb;
  cursor: pointer;
}
.tag {
  display: inline-block;
  padding: 0 8px;
  height: 24px;
  line-height: 22px;
  border: 1px solid #d3d4d6;
  color: #909399;
  border-radius: 4px;
  font-size: 12px;
  margin-right: 8px;
}
.store-name {
  display: inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100px;
  height: 100%;
  line-height: 48px;
  margin-right: 8px;
}
.arr-down {
  margin-top: 4px;
}
</style>
