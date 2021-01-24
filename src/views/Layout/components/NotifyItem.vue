<template>
  <v-list-item link :href="getLink()" v-if="role">
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
import authService from "@/api/authentication";

export default {
  data() {
    return {
      role: null
    };
  },
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
    },
    getLink() {
      const role = this.role;
      const notify = this.data;
      const baseUrl = "http://localhost:8080";
      let linkCv = "";
      if (notify.type === "newCv") {
        if (role === "volunteer") {
          linkCv = `${baseUrl}/volunteerHome/view-cv/${notify.cvId}`;
        }
        if (role === "specialist") {
          linkCv = `${baseUrl}/specialistHome/view-cv/${notify.cvId}`;
        }
      } else if (notify.type === "newReview") {
        linkCv = `${baseUrl}/memberHome/review-result/${notify.reviewId}`;
      } else {
        linkCv = "";
      }
      return linkCv;
    },
    async getData() {
      this.role = await authService.getRole();
    }
  },
  created() {
    this.getData();
  }
};
</script>
