<template>
  <v-list-item link>
    <v-list-item-avatar>
      <v-icon :color="icon.color" large>
        {{ icon.text }}
      </v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-subtitle class="subtitle-1 black--text"
        ><slot name="content"></slot
      ></v-list-item-subtitle>
      <v-list-item-subtitle class="primary--text"
        >Ngày {{ shortDate(data.createdAt) }}</v-list-item-subtitle
      >
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
      default: function() {
        return null;
      }
    },
    icon: {
      type: Object,
      required: true,
      default: function() {
        return null;
      }
    }
  },
  methods: {
    shortDate: timeStamp => {
      let d = new Date(timeStamp);
      return d.toLocaleDateString();
    }
  }
};
</script>
