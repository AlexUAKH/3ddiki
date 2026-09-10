<script setup lang="ts">
defineEmits(["handleDrawer"]);
</script>

<template>
  <v-app-bar color="white" fixed app>
    <div class="title">3Ddiki</div>

    <div class="ml-auto flex items-center gap-3">
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>

      <v-btn>
        user@hbchbcd.jnj <v-icon size="xl">mdi-account-circle</v-icon>
      </v-btn>
    </div>
    <v-app-bar-nav-icon
      class="mde:hidden ml-4 me-4"
      variant="text"
      @click.stop="$emit('handleDrawer')"
    ></v-app-bar-nav-icon>
  </v-app-bar>
</template>

<style scoped lang="scss">
.v-toolbar__content {
  & > .v-toolbar-title {
    margin-inline-start: 0;
    height: 100%;
    & .title {
      width: 220px;
      height: 100%;
      display: flex;
      align-items: center;
      font-size: 21px;
      font-weight: 700;
      letter-spacing: 0.09em;
      box-shadow: 0 2px 26px rgba(54, 54, 54, 0.25);
    }
  }
}
.title {
  width: 220px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 21px;
  font-weight: 700;
  letter-spacing: 0.09em;
  box-shadow: 0 2px 26px rgba(54, 54, 54, 0.25);
}
</style>
