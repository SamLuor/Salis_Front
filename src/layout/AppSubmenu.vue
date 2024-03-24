<template>
  <ul v-if="items">
    <template v-for="(item, i) of items">
      <li
        v-if="visible(item) && !item.separator"
        :key="item.label || i"
        :class="[
          {
            'layout-menuitem-category': root,
            'active-menuitem': activeIndex === i && !item.to && !item.disabled
          }
        ]"
        role="none"
      >
        <template v-if="root">
          <div
            class="layout-menuitem-root-text text-color-defined"
            :aria-label="item.label"
          >
            {{ item.label }}
          </div>
          <appsubmenu
            :items="visible(item) && item.items"
            @menuitem-click="$emit('menuitem-click', $event)"
          ></appsubmenu>
        </template>
        <template v-else>
          <router-link
            v-if="item.to"
            v-ripple
            :to="item.to"
            :class="[
              'p-ripple',
              { 'p-disabled': item.disabled },
              'menu-item-tailwind',
              { 'router-link-exact-active': isActive(item) }
            ]"
            :style="item.style"
            :target="item.target"
            :aria-label="item.label"
            role="menuitem"
            @click="onMenuItemClick($event, item, i)"
          >
            <i :class="item.icon"></i>
            <span>{{ item.label }}</span>
            <i
              v-if="item.items"
              class="pi pi-fw pi-angle-down menuitem-toggle-icon"
            ></i>
            <Badge v-if="item.badge" :value="item.badge"></Badge>
          </router-link>
          <a
            v-if="!item.to"
            v-ripple
            :href="item.url || '#'"
            :style="item.style"
            :class="[item.class, 'p-ripple', { 'p-disabled': item.disabled }]"
            :target="item.target"
            :aria-label="item.label"
            role="menuitem"
            @click="onMenuItemClick($event, item, i)"
          >
            <i :class="item.icon"></i>
            <span>{{ item.label }}</span>
            <i
              v-if="item.items"
              class="pi pi-fw pi-angle-down menuitem-toggle-icon"
            ></i>
            <Badge v-if="item.badge" :value="item.badge"></Badge>
          </a>
          <transition name="layout-submenu-wrapper">
            <appsubmenu
              v-show="activeIndex === i"
              :items="visible(item) && item.items"
              @menuitem-click="$emit('menuitem-click', $event)"
            ></appsubmenu>
          </transition>
        </template>
      </li>
      <li
        v-if="visible(item) && item.separator"
        :key="'separator' + i"
        class="p-menu-separator"
        :style="item.style"
        role="separator"
      ></li>
    </template>
  </ul>
</template>
<script>
import { useRoute } from 'vue-router'

export default {
  name: 'Appsubmenu',
  props: {
    items: Array,
    root: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeIndex: null
    }
  },
  methods: {
    isActive: (to) => {
      if (useRoute().path.includes(to.label.toLowerCase())) {
        return true
      }
    },
    onMenuItemClick(event, item, index) {
      if (item.disabled) {
        event.preventDefault()
        return
      }

      if (!item.to && !item.url) {
        event.preventDefault()
      }

      //execute command
      if (item.command) {
        item.command({ originalEvent: event, item: item })
      }

      this.activeIndex = index === this.activeIndex ? null : index

      this.$emit('menuitem-click', {
        originalEvent: event,
        item: item
      })
    },
    visible(item) {
      return typeof item.visible === 'function'
        ? item.visible()
        : item.visible !== false
    }
  }
}
</script>
<style scoped>
.text-section {
  @apply dark:text-dark-white70;
}
.menu-item-tailwind {
  @apply text-white dark:text-dark-white70;
}
.menu-item-tailwind:hover {
  @apply text-dark-white70 bg-primary-principal dark:text-dark-white70 dark:bg-secondary-500;
}
.layout-menu li a.router-link-exact-active {
  @apply text-secondary-300 dark:text-secondary-500 hover:text-primary-options-text-color;
}
.layout-menu li a.router-link-exact-active:hover {
  @apply dark:text-dark-white70;
}
</style>
