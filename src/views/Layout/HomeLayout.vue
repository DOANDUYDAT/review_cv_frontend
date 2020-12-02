<template>
  <v-app>
    <v-app-bar class="px-16" flat clipped-left app>
      <v-row>
        <v-col cols="12" class="py-2">
          <v-toolbar-title>CV</v-toolbar-title>
        </v-col>
        <v-col cols="12" class="py-0"> <v-divider></v-divider></v-col>
      </v-row>
    </v-app-bar>

    <v-main>
      <v-container class="mx-auto" fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>
