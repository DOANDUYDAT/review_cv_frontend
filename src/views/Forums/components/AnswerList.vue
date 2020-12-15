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
      return Math.floor(this.listAnswers.length / 5) + 1;
    }
  },
  watch: {
    page: function() {
      this.getData();
    },
    listAnswersData: {
      handler: function(val, oldVal) {
        this.listAnswers = JSON.parse(JSON.stringify(val));
      },
      deep: true
    }
  },
  methods: {
    async getData() {
      this.listAnswers = JSON.parse(JSON.stringify(this.listAnswersData));
    }
  },
  created() {
    this.getData();
  }
};
</script>
