<template>
  <div>
    <div v-if="listAnswers">
      <answer-item
        v-for="answer in listAnswers"
        :key="answer._id"
        :answer-data="answer"
        :question-is-close="questionIsClose"
        :current-user-data="currentUserData"
        :owner-of-question="ownerOfQuestion"
      ></answer-item>
      <div class="text-center">
        <v-pagination v-model="page" :length="lengthPage"></v-pagination>
      </div>
    </div>
    <div v-else>
      <div class="headline">Chưa có câu trả lời</div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import AnswerItem from "./AnswerItem";
import { answerServiceRoot } from "@/api/answer";
import answerService from "@/api/answer.js";
import { acceptService } from "@/api/answer.js";

export default {
  data() {
    return {
      listAnswers: null,
      page: 1
    };
  },
  components: {
    AnswerItem
  },
  props: {
    questionIsClose: {
      type: Boolean,
      required: true,
      default: false
    },
    currentUserData: {
      type: Object,
      required: true,
      default: function() {
        return null;
      }
    },
    ownerOfQuestion: {
      type: Object,
      required: true,
      default: function() {
        return null;
      }
    },
    totalAnswer: {
      type: Number,
      required: true
    }
  },
  computed: {
    lengthPage() {
      if (this.totalAnswer === 0) {
        return 1;
      } else {
        if (this.totalAnswer % 5 === 0) {
          return Math.floor(this.totalAnswer / 5);
        } else {
          return Math.floor(this.totalAnswer / 5) + 1;
        }
      }
    }
  },
  watch: {
    page: function() {
      this.getData();
    }
  },
  methods: {
    async getData() {
      const questionId = this.$route.params.questionId;
      // this.listAnswers = JSON.parse(JSON.stringify(this.listAnswersData));
      console.log(questionId);
      this.listAnswers = await answerService.getListAnswersByQuestionId(
        questionId,
        this.page
      );
    }
  },
  created() {
    this.getData();
    answerServiceRoot.on("created", async () => this.getData());
  }
};
</script>
