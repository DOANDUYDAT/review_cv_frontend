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
        <v-btn
          color="warning"
          v-if="isOwner && !question.isClose"
          @click="closeQuestion"
          >Close</v-btn
        >
      </v-col>
      <v-col class="d-flex justify-end py-0">
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
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h3>4 Answers</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="1" class="align-center flex-column d-flex py-0">
        <v-btn small outlined fab color="teal" v-if="!question.isClose">
          <v-icon>mdi-check-bold</v-icon>
        </v-btn>
        <v-icon v-if="answer.isAccept" color="teal" large
          >mdi-check-bold</v-icon
        >
        <v-btn
          :small="$vuetify.breakpoint.mobile"
          icon
          large
          @click="likeQuestion"
        >
          <v-icon color="primary">mdi-thumb-up</v-icon>
        </v-btn>
        <span> {{ question.likes.length }} likes </span>
      </v-col>
      <v-col cols="11" class="py-0">
        <span
          >“Hôm nay ăn gì?” hay “tối nay ăn gì?” là câu hỏi kinh điển khiến các
          chị em không khỏi đau đầu. Nhưng với danh sách thực đơn hàng ngày
          phong phú của một tài khoản trên Facebook có tên Nguyễn Thị Phương
          Thanh trong suốt 31 ngày dưới đây sẽ giúp chị em giải quyết được vấn
          đề này. Trong thực đơn hàng ngày này đều là những món ăn đơn giản, dễ
          làm nhưng vẫn ngon, đảm bảo chất dinh dưỡng cho mọi người. Mời các bạn
          tham khảo. “Hôm nay ăn gì?” hay “tối nay ăn gì?” là câu hỏi kinh điển
          khiến các chị em không khỏi đau đầu. Nhưng với danh sách thực đơn hàng
          ngày phong phú của một tài khoản trên Facebook có tên Nguyễn Thị
          Phương Thanh trong suốt 31 ngày dưới đây sẽ giúp chị em giải quyết
          được vấn đề này. Trong thực đơn hàng ngày này đều là những món ăn đơn
          giản, dễ làm nhưng vẫn ngon, đảm bảo chất dinh dưỡng cho mọi người.
          Mời các bạn tham khảo.</span
        >

        <!-- <answer-list></answer-list> -->
      </v-col>
      <v-col cols="1" class="pb-0"></v-col>
      <v-col cols="8" class="pb-0">
        <v-btn text color="grey" class="pl-0">
          <v-icon dark>
            mdi-pencil
          </v-icon>
          Chỉnh sửa
        </v-btn>
        <!-- <v-btn text color="grey">
          <v-icon dark>
            mdi-delete
          </v-icon>
          Xóa
        </v-btn> -->
      </v-col>
      <v-col cols="3" class="text-right pb-0">
        asked by {{ question.user.userName }}
      </v-col>
      <v-col cols="1" class=""></v-col>
      <v-col cols="11" v-if="!isAllowComment" @click="checkPoint">
        <v-btn color="primary" text>add a comment</v-btn>
        <v-tooltip v-model="tooltipComment" bottom>
          <span>You must have 50 reputation to comment</span>
        </v-tooltip>
      </v-col>
      <v-col cols="11" class="" v-else>
        <ValidationObserver v-slot="{ invalid }">
          <ValidationProvider
            name="comment"
            rules="required|max:300"
            v-slot="{ errors }"
            :bails="false"
          >
            <v-textarea
              outlined
              rows="2"
              counter="300"
              label="Thêm bình luận"
            ></v-textarea>
            <span class="red--text">{{ errors[0] }}</span>
          </ValidationProvider>
          <div class="mb-1">
            <v-btn color="primary" @click="submit" :disabled="invalid"
              >Bình luận</v-btn
            >
          </div>
        </ValidationObserver>
      </v-col>
    </v-row>
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
// import AnswerList from "./AnswerList";
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
    EditorMenuBar
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
        content: "",
        isAccept: false
      },
      question: null,
      currentUser: null,
      tooltipComment: false
    };
  },
  computed: {
    isOwner() {
      if (!this.question.user || !this.currentUser) return false;
      return this.currentUser._id == this.question.user._id;
    },
    isAllowComment() {
      return this.currentUser ? this.currentUser.reputationPoint > 100 : false;
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
          this.getData();
        })
        .catch(err => console.log(err));
    },
    setContent() {
      // you can pass a json document
      this.editor.setContent(
        {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "This is some inserted text. "
                }
              ]
            }
          ]
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
    },
    checkPoint() {
      if (this.currentUser.reputationPoint > 100) {
        this.isAllowComment = true;
      } else {
        this.tooltipComment = true;
      }
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
