<template>
  <v-sheet min-height="70vh" rounded="lg">
    <v-row>
      <v-col cols="12" sm="6">
        <h2>{{ question.title }}</h2>
      </v-col>
      <!-- <v-spacer></v-spacer> -->
      <v-col class="text-right">
        <v-btn v-show="!$vuetify.breakpoint.mobile" depressed color="primary"
          >Ask Question</v-btn
        >
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <div v-html="question.content"></div>
    <v-btn color="warning" v-if="isOwner">Close</v-btn>
  </v-sheet>
</template>

<script>
import questionService from "@/api/question.js";
import authService from "@/api/authentication.js";

export default {
  name: "QuestionDetail",
  data: () => ({
    question: {},
    currentUser: {}
  }),
  components: {
    // HelloWorld
  },
  computed: {
    isOwner() {
      if (!this.question.user) return false;
      return this.currentUser._id == this.question.user._id;
    }
  },
  methods: {
    shortDate: timeStamp => {
      let d = new Date(timeStamp);
      return d.toLocaleDateString();
    }
  },
  created() {
    const questionId = this.$route.params.questionId;
    questionService
      .getQuestion(questionId)
      .then(res => {
        this.question = JSON.parse(JSON.stringify(res));
      })
      .catch(err => console.log(err));

    authService
      .getCurrentUser()
      .then(user => {
        this.currentUser = user;
      })
      .catch(err => console.log(err));
  }
};
</script>
<style lang="scss" scoped></style>
