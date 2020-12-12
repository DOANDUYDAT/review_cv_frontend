<template>
  <v-sheet min-height="70vh" rounded="lg" v-if="question">
    <v-row>
      <v-col cols="12" sm="6" class="pb-0">
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
      <v-col cols="12" sm="6" class="py-0">
        {{ shortDate(question.createdAt) }}
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="12">
        <div v-html="question.content"></div>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="9" class="text-left py-0">
        <v-btn
          :small="$vuetify.breakpoint.mobile"
          :class="$vuetify.breakpoint.mobile ? 'mr-2' : 'mr-4'"
          icon
          @click="likeQuestion"
        >
          <v-icon color="primary">mdi-thumb-up</v-icon>
        </v-btn>
        <span :class="$vuetify.breakpoint.mobile ? 'mr-5' : 'mr-8'">
          {{ question.likes.length }} likes
        </span>
      </v-col>
      <v-col class="text-right py-0" md="3">
        asked by {{ question.user.userName }}
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="text-right">
        <v-btn small v-if="isOwner" color="warning">close</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h3>{{ totalAnswer }} Answers</h3>
      </v-col>
    </v-row>
    <answer-list :question-data="question"></answer-list>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="12">
        <h3>Your Answer</h3>
      </v-col>
      <v-col>
        <div class="qa-editor">
          <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
            <div class="menubar">
              <v-btn
                text
                icon
                class="menubar__button"
                :class="{ 'is-active': isActive.heading({ level: 1 }) }"
                @click="commands.heading({ level: 1 })"
              >
                <b> H1 </b>
              </v-btn>
              <v-btn
                text
                icon
                class="menubar__button"
                :class="{ 'is-active': isActive.bold() }"
                @click="commands.bold"
              >
                <v-icon>mdi-format-bold</v-icon>
              </v-btn>

              <v-btn
                text
                icon
                class="menubar__button"
                :class="{ 'is-active': isActive.underline() }"
                @click="commands.underline"
              >
                <v-icon>mdi-format-underline</v-icon>
              </v-btn>
            </div>
          </editor-menu-bar>

          <editor-content class="editor__content" :editor="editor" />
        </div>
        <v-btn small color="primary" class="my-4" @click="postAnswer">
          Post your answer
        </v-btn>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
/* eslint-disable no-unused-vars */
import AnswerList from "./components/AnswerList";
import authService from "../../api/authentication";
import questionService from "@/api/question.js";
import answerService from "@/api/answer.js";
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History
} from "tiptap-extensions";

export default {
  name: "QuestionDetail",
  components: {
    EditorContent,
    EditorMenuBar,
    AnswerList
    // Icon
  },
  data() {
    return {
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History()
        ],
        content: "",
        onUpdate: ({ getHTML }) => {
          this.answer.content = getHTML();
        }
      }),
      answer: {
        content: ""
      },
      question: null,
      currentUser: null,
      totalAnswer: 0
    };
  },
  computed: {
    isOwner() {
      if (!this.question || !this.currentUser) return false;
      return this.currentUser.userId == this.question.userId;
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
    async getData() {
      const questionId = this.$route.params.questionId;
      try {
        const question = await questionService.getQuestion(questionId);
        if (question) {
          this.question = JSON.parse(JSON.stringify(question));
        }
        this.currentUser = await authService.getUserByRole();
        this.totalAnswer = await answerService.getTotalAnswer(questionId);
      } catch (err) {
        console.log(err);
      }
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
          this.getData();
        })
        .catch(err => console.log(err));
    },
    setContent() {
      // you can pass a json document
      this.editor.setContent(
        {
          type: "doc",
          content: `<p>your answer</p>`
        },
        true
      );
      // HTML string is also supported
      // this.editor.setContent('<p>This is some inserted text. </p>')
      this.editor.focus();
    },
    postAnswer() {
      let answerData = {
        ...this.answer,
        questionId: this.question._id
      };
      answerService
        .createAnswer(answerData)
        .then(answer => {
          console.log(answer);
          this.getData();
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  created() {
    this.getData();
  }
};
</script>
<style lang="scss" scoped>
.qa-editor {
  border: 1px ridge gray;
  .menubar,
  .editor__content {
    border: 1px ridge gray;
  }
}
</style>
