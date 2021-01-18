<template>
  <div v-if="listQuestions && listQuestions.length > 0">
    <v-sheet min-height="70vh" rounded="lg">
      <v-row>
        <v-col cols="6">
          <h2>Câu hỏi hàng đầu</h2>
        </v-col>
        <!-- <v-spacer></v-spacer> -->
        <v-col class="text-right">
          <v-btn
            :small="$vuetify.breakpoint.mobile"
            depressed
            color="primary"
            @click="goToQuestionAsk"
            >Đặt câu hỏi</v-btn
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
              color="primary"
              :small="$vuetify.breakpoint.mobile"
              :class="$vuetify.breakpoint.mobile ? 'mr-2' : 'mr-4'"
              >mdi-thumb-up</v-icon
            >
            <span :class="$vuetify.breakpoint.mobile ? 'mr-5' : 'mr-8'">
              {{ item.likes.length }} lượt thích
            </span>
            <v-icon
              color="green"
              :small="$vuetify.breakpoint.mobile"
              :class="$vuetify.breakpoint.mobile ? 'mr-2' : 'mr-4'"
              >mdi-reply</v-icon
            >
            <span :class="$vuetify.breakpoint.mobile ? 'mr-5' : 'mr-8'">
              {{ item.listAnswers.length }} Câu trả lời
            </span>
          </v-col>
          <v-col>
            {{ item.title }}
          </v-col>
          <v-col md="3" class="text-right">
            {{ shortDateTime(item.createdAt) }}
          </v-col>
          <v-col class="text-right" md="2">
            Được hỏi bởi {{ item.user.userName }}
          </v-col>
        </v-row>
        <v-divider></v-divider>
      </div>
    </v-sheet>
    <div class="text-center">
      <v-pagination v-model="page" :length="lengthPage"></v-pagination>
    </div>
  </div>
  <div v-else>
    <v-row>
      <v-col cols="6">
        <h2>Câu hỏi hàng đầu</h2>
      </v-col>
      <!-- <v-spacer></v-spacer> -->
      <v-col class="text-right">
        <v-btn
          :small="$vuetify.breakpoint.mobile"
          depressed
          color="primary"
          @click="goToQuestionAsk"
          >Đặt câu hỏi</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>

<script>
import questionService from "@/api/question.js";
import { questionServiceRoot } from "@/api/question.js";
import EventBus from "../../services/event-bus";

export default {
  name: "HomeForums",
  data: () => ({
    listQuestions: null,
    page: 1,
    totalQuestion: 0,
    pageSize: 10
  }),
  components: {
    // HelloWorld
  },
  computed: {
    lengthPage() {
      if (this.totalQuestion === 0) {
        return 1;
      } else {
        if (this.totalQuestion % this.pageSize === 0) {
          return Math.floor(this.totalQuestion / this.pageSize);
        } else {
          return Math.floor(this.totalQuestion / this.pageSize) + 1;
        }
      }
    }
  },
  watch: {
    page() {
      this.getData();
    }
  },
  methods: {
    shortDateTime: timeStamp => {
      let d = new Date(timeStamp);
      return d.toLocaleString();
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
    },
    async getData() {
      this.listQuestions = await questionService.getListQuestions(this.page);
      this.totalQuestion = await questionService.getTotalQuestion();
    }
  },
  created() {
    this.getData();
    questionServiceRoot.on("created", () => {
      this.getData();
    });
    EventBus.$on("search-question", async textSearch => {
      this.listQuestions = await questionService.search(textSearch);
    });
  },
  destroyed() {
    EventBus.$off();
  }
};
</script>
<style lang="scss" scoped></style>
