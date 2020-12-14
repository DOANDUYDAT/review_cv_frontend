<template>
  <div>
    <div v-if="listAnswers">
      <answer-item
        v-for="answer in listAnswers"
        :key="answer._id"
        :answer-data="answer"
        :question-is-close="questionIsClose"
        :current-user-data="currentUserData"
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
import AnswerItem from "./AnswerItem";
import { answerServiceRoot } from "@/api/answer";
import answerService from "@/api/answer.js";

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
    listAnswersData: {
      type: Array,
      required: true,
      default: function() {
        return null;
      }
    }
  },
  computed: {
    lengthPage() {
      return Math.floor(this.listAnswers.length / 20) + 1;
    }
  },
  watch: {
    page: function() {
      this.getData();
    },
    listAnswersData: "getData"
    // "questionData.listAnswers": "getData"
  },
  methods: {
    async getData() {
      // const questionId = this.$route.params.questionId;
      // this.listAnswers = await answerService.getListAnswersByQuestionId(
      //   questionId,
      //   this.page
      // );
      this.listAnswers = this.listAnswersData;
    }
  },
  created() {
    this.getData();
    // console.log(typeof this.getData);
    answerServiceRoot.on("created", async () => {
      const questionId = this.$route.params.questionId;
      this.listAnswers = await answerService.getListAnswersByQuestionId(
        questionId,
        this.page
      );
    });
  }
};
</script>
