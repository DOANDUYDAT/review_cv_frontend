<template>
  <v-sheet min-height="70vh" rounded="lg" v-if="question">
    <v-row>
      <v-col cols="12" sm="6">
        <h2>{{ question.title }}</h2>
      </v-col>
      <!-- <v-spacer></v-spacer> -->
      <v-col class="text-right">
        <v-btn
          v-show="!$vuetify.breakpoint.mobile"
          depressed
          color="primary"
          @click="goToQuestionAsk"
          >Ask Question</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn
          :small="$vuetify.breakpoint.mobile"
          :class="$vuetify.breakpoint.mobile ? 'mr-2' : 'mr-4'"
          icon
          @click="likeQuestion"
          ><v-icon>mdi-thumb-up</v-icon></v-btn
        >
        <span :class="$vuetify.breakpoint.mobile ? 'mr-5' : 'mr-8'">
          {{ question.likes.length }} likes
        </span>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <div v-html="question.content"></div>
    <v-btn
      color="warning"
      v-if="isOwner && !question.isClose"
      @click="closeQuestion"
      >Close</v-btn
    >
    <v-divider></v-divider>
  </v-sheet>
</template>

<script>
import questionService from "@/api/question.js";
import authService from "@/api/authentication.js";
import userService from "@/api/user.js";
export default {
  name: "QuestionDetail",
  data: () => ({
    question: null,
    currentUser: null
  }),
  components: {
    // HelloWorld
  },
  computed: {
    isOwner() {
      if (!this.question.user || !this.currentUser) return false;
      return this.currentUser._id == this.question.user._id;
    }
  },
  methods: {
    shortDate: timeStamp => {
      let d = new Date(timeStamp);
      return d.toLocaleDateString();
    },
    closeQuestion: function() {
      questionService
        .closeQuestion(this.question._id)
        .then(res => {
          console.log("res", res);
          this.getData();
        })
        .catch(err => console.log(err));
    },
    getData() {
      const questionId = this.$route.params.questionId;
      questionService
        .getQuestion(questionId)
        .then(res => {
          this.question = JSON.parse(JSON.stringify(res));
        })
        .catch(err => console.log(err));
    },
    goToQuestionAsk() {
      this.$router.push({
        name: "Question Ask"
      });
    },
    likeQuestion() {
      questionService
        .likeQuestion(this.question._id)
        .then(res => {
          console.log(res);
          this.getData();
        })
        .catch(err => console.log(err));
    }
  },
  created() {
    authService.getCurrentUser().then(user => {
      console.log(user);
      userService.getUser(user._id).then(res => console.log(res));
    });
    this.getData();
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
