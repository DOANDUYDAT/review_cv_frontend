<template>
  <div>
    <template v-if="answerShow.length > 0">
      <answer-list-item
        v-for="answer in answerShow"
        :key="answer.id"
        :answer="answer"
      ></answer-list-item>
      <v-row>
        <v-btn
          class="mx-auto my-2"
          color="primary"
          text
          v-if="showButtonMore"
          @click="getMoreAnswer"
          >Xem thêm 5 câu trả lời</v-btn
        >
      </v-row>
    </template>
    <template v-else>
      <div class="headline">Chưa có câu trả lời</div>
    </template>
  </div>
</template>

<script>
import AnswerListItem from "./AnswerListItem";
import { productService } from "@/_api";

export default {
  data() {
    return {
      allAnswers: [],
      answerShow: []
    };
  },
  components: {
    AnswerListItem
  },
  computed: {
    showButtonMore() {
      return this.answerShow.length < this.allAnswers.length ? true : false;
    },
    productId() {
      return this.$route.params.productId;
    }
  },
  methods: {
    getMoreAnswer() {
      let offsetAnswer = this.answerShow.length;

      for (let i = 0; i < 5; i++) {
        if (offsetAnswer < this.allAnswers.length) {
          this.answerShow.push(this.allAnswers[offsetAnswer]);
          offsetAnswer++;
        }
      }
    },
    initAnswer() {
      let answerList = [];
      const allAnswers = this.allAnswers;
      for (let i = 0; i < 5; i++) {
        if (i < allAnswers.length) {
          answerList.push(allAnswers[i]);
        }
      }
      return answerList;
    },
    async getData() {
      const productId = this.productId;
      this.allAnswers = await productService.getAllAnswers(productId);
      this.answerShow = this.initAnswer();
    }
  },
  created() {
    this.getData();
  }
};
</script>
