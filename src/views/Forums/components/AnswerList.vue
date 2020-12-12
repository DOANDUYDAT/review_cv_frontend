<template>
  <div>
    <div v-if="listAnswers">
      <answer-item
        v-for="answer in listAnswers"
        :key="answer._id"
        :answer-data="answer"
        :question-data="questionData"
        :current-user-data="currentUserData"
      ></answer-item>
      <div class="text-center">
        <v-pagination v-model="page" :length="5"></v-pagination>
      </div>
    </div>
    <div v-else>
      <div class="headline">Chưa có câu trả lời</div>
    </div>
  </div>
</template>

<script>
import AnswerItem from "./AnswerItem";
import answerService from "@/api/answer";

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
    questionData: {
      type: Object,
      required: true,
      default: function() {
        return null;
      }
    },
    currentUserData: {
      type: Object,
      required: true,
      default: function() {
        return null;
      }
    }
  },
  computed: {},
  watch: {
    page: function() {
      this.getData();
    },
    "questionData.listAnswers": "getData"
  },
  methods: {
    async getData() {
      const questionId = this.$route.params.questionId;
      this.listAnswers = await answerService.getListAnswersByQuestionId(
        questionId,
        this.page
      );
    }
  },
  created() {
    this.getData();
  }
};
</script>
