<template>
  <div class="render" :class="{ 'empty-pd': config.length === 0 }">
    <a-spin :tip="tip" :spinning="spinning" size="large">
      <div v-if="config.length === 0" class="empty"></div>
      <a-layout-content
        ref="contentBoxRef"
        class="content-box"
        :class="hasBar ? 'has-bar' : ''"
        v-else
      >
        <lyy-pc-render
          :page-config="config"
          :jsobject="jsobject"
          :dataSetList="dataSetList"
        ></lyy-pc-render>
      </a-layout-content>
    </a-spin>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'render-index',
});
</script>
<script lang="ts" setup>
import { reactive, onBeforeMount, ref, onMounted, nextTick } from 'vue';
// import { useRoute, useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import { getPageConfig, getPageAuthCode, getJsObject } from '@/api/app';
// import type { TagView } from '@/store/modules/tagsView';
// import { ActionsTypes } from '@/store/modules/tagsView';
// import { useStore } from 'vuex';

const tip = ref('页面加载中......');
const spinning = ref(false);
const contentBoxRef = ref(null);
const hasBar = ref(null);

const config = reactive([]);
// const $store = useStore();
const $route = useRoute();
// const $router = useRouter();
const jsobject = ref([]);
const dataSetList = ref([]);
// window.Watcher['$on']('closeTag', (type, data) => {
//   const path = $route.fullPath;
//   const visitedViews = $store.state.tagsView.visitedViews || [];
//   const index = visitedViews.findIndex((item: TagView) => item.fullPath === path);
//   if (index < 0) {
//     return;
//   }
//   $store.dispatch(ActionsTypes.deleteView, visitedViews[index]);
//   $router.replace({
//     path: data.path,
//   });
// });
const getPageConfigFn = async (id: string) => {
  spinning.value = true;
  const res = await getPageConfig(id);
  const pageConfig = Array.isArray(res) ? res : [];
  spinning.value = false;
  config.push(...pageConfig);
  nextTick(() => {
    calcHeight();
  });
};

const getAuthCode = async (id: string) => {
  const meta = $route.meta || {};
  const res = await getPageAuthCode('/gw/ram-service/permission/menu/authCode', {
    pageConfigureId: id,
    queryButton: meta.queryButtonAuthCode,
    queryField: meta.queryFieldAuthCode,
  });
  if (res?.body) {
    try {
      const authCodeList = JSON.parse(sessionStorage.getItem('service-authCodeList'));
      authCodeList[id] = res?.body;
      sessionStorage.setItem('service-authCodeList', JSON.stringify(authCodeList));
    } catch {
      sessionStorage.setItem('service-authCodeList', JSON.stringify({}));
    }
  }
  getPageConfigFn(id as string);
};
const handlePageConfig = async () => {
  const pathItems = $route.path.split('/');
  const id = pathItems.pop();
  try {
    const JsObjectRes = await getJsObject(id as string);
    const { datasource, js } = JsObjectRes ?? {};
    if (datasource) dataSetList.value.push(...datasource);
    if (js) jsobject.value.push(...js);
    console.log('请求到逻辑集和数据集了', JsObjectRes);
  } catch (error) {
    console.log('请求不到逻辑集和数据集了', error);
  }
  const meta = $route.meta || {};
  if (!meta.queryButtonAuthCode && !meta.queryFieldAuthCode) {
    getPageConfigFn(id as string);
    return;
  }
  const serviceAuthCodeList = sessionStorage.getItem('service-authCodeList');
  if (serviceAuthCodeList) {
    const authCodeList = JSON.parse(serviceAuthCodeList);
    if (authCodeList[id]) {
      getPageConfigFn(id as string);
    } else {
      getAuthCode(id as string);
    }
  } else {
    sessionStorage.setItem('service-authCodeList', JSON.stringify({}));
    getAuthCode(id as string);
  }
  // getPageConfigFn(id as string)
};
const calcHeight = () => {
  if (contentBoxRef.value.$el) {
    const actionBar = document.querySelector('.content-box .lyy-erp-action-bar');
    if (actionBar) {
      hasBar.value = true;
      const contentRect = contentBoxRef.value.$el.getBoundingClientRect();
      const actionBarRect = actionBar.getBoundingClientRect();
      const viewportHeight = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0,
      );
      contentBoxRef.value.$el.style.height = viewportHeight - contentRect.top + 'px';
      actionBar.style.position = 'absoulte';
      actionBar.style.top = -actionBarRect.height + 'px';
      contentBoxRef.value.$el.style.paddingTop = actionBarRect.height + 'px';
    }
  }
};

onBeforeMount(() => {
  handlePageConfig();
});
</script>
<style lang="less" scoped>
.content-box {
  position: relative;
  overflow-y: auto;
}
.has-bar {
  :deep(.lyy-erp-action-bar) {
    position: absolute;
    width: 100%;
    z-index: 1;
    left: 0;
  }
}
.render {
  width: 100%;
  height: 100%;
}
:deep(.ant-layout-content) {
  height: 100%;
}
:deep(.ant-spin-nested-loading, .ant-spin-container) {
  height: 100%;
  flex: 1;
  //overflow: hidden;
}
.empty-pd {
  padding: 16px;
}
.empty {
  height: 100%;
  width: 100%;
  background: #fff;
}
</style>
