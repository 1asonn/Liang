<template>
  <router-view v-slot="{ Component }">
    <transition :name="transitionName" appear>
      <component v-if="Component" :is="Component"></component>
      <slot v-else />
    </transition>
  </router-view>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { MultiTabStoreConsumer } from '@/components/multi-tab';
import { injectMenuState } from './use-menu-state';

export default defineComponent({
  name: 'CustomRouterView',
  setup() {
    const menuState = injectMenuState();
    return {
      transitionName: computed(() => menuState.transitionName.value),
    };
  },
  components: {
    MultiTabStoreConsumer,
  },
});
</script>
