<template>
  <v-sheet min-height="70vh" rounded="lg">
    <v-row>
      <v-col cols="6">
        <h2>Top Questions</h2>
      </v-col>
      <!-- <v-spacer></v-spacer> -->
      <v-col class="text-right">
        <v-btn
          :small="$vuetify.breakpoint.mobile"
          depressed
          color="primary"
          @click="goToQuestionAsk"
          >Ask Question</v-btn
        >
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <div v-for="item in listQuestions" :key="item.id">
      <v-row
        :class="{ 'mx-0': true, 'flex-column': $vuetify.breakpoint.mobile }"
        @click="goToQuestion(item)"
      >
        <v-col md="4">
          <v-icon
            :small="$vuetify.breakpoint.mobile"
            :class="$vuetify.breakpoint.mobile ? 'mr-2' : 'mr-4'"
            >mdi-thumb-up</v-icon
          >
          <span :class="$vuetify.breakpoint.mobile ? 'mr-5' : 'mr-8'">
            {{ item.likes.length }} likes
          </span>
          <v-icon
            :small="$vuetify.breakpoint.mobile"
            :class="$vuetify.breakpoint.mobile ? 'mr-2' : 'mr-4'"
            >mdi-reply</v-icon
          >
          <span :class="$vuetify.breakpoint.mobile ? 'mr-5' : 'mr-8'">
            {{ item.listAnswers.length }} answers
          </span>
        </v-col>
        <v-col>
          {{ item.title }}
        </v-col>
        <v-col md="1">
          {{ shortDate(item.createdAt) }}
        </v-col>
        <v-col class="text-right" md="2">
          {{ item.user.userName }}
        </v-col>
      </v-row>
      <v-divider></v-divider>
    </div>
  </v-sheet>
</template>

<script>
import questionService from "@/api/question.js";

export default {
  name: "HomeForums",
  data: () => ({
    listQuestions: [],
    pageNumber: 1
  }),
  components: {
    // HelloWorld
  },
  computed: {},
  methods: {
    shortDate: timeStamp => {
      let d = new Date(timeStamp);
      return d.toLocaleDateString();
    },
    goToQuestion(item) {
      this.$router.push({
        name: "Question Detail",
        params: {
          questionId: item._id,
          questionTitle: item.title.split(" ").join("-")
        }
      });
    },
    goToQuestionAsk() {
      this.$router.push({
        name: "Question Ask"
      });
    }
  },
  created() {
    questionService
      .getAllQuestions(this.pageNumber)
      .then(res => {
        this.listQuestions = res.data;
      })
      .catch(err => console.log(err));
  }
};
</script>
<style lang="scss" scoped></style>
