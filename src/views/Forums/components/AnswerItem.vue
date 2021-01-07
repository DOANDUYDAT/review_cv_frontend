<template>
  <div v-if="answer">
    <v-row>
      <v-col cols="1" class="align-center flex-column d-flex py-0">
        <v-btn
          small
          outlined
          fab
          color="teal"
          v-if="!questionIsClose && isOwner"
          @click="acceptAnswer"
        >
          <v-icon>mdi-check-bold</v-icon>
        </v-btn>
        <v-icon v-if="answer.isAccept" color="teal" large
          >mdi-check-bold</v-icon
        >
        <v-btn
          :small="$vuetify.breakpoint.mobile"
          icon
          large
          @click="likeAnswer"
        >
          <v-icon color="primary">mdi-thumb-up</v-icon>
        </v-btn>
        <span class="text-center"> {{ answer.likes.length }} lượt thích </span>
      </v-col>
      <v-col cols="11" class="py-0">
        <div v-html="answer.content"></div>
      </v-col>
      <!-- <v-col offset="1" cols="8" class="pb-0">
        <v-btn text color="grey" class="pl-0" x-small>
          <v-icon dark>
            mdi-pencil
          </v-icon>
          Chỉnh sửa
        </v-btn>
      </v-col> -->
      <v-col offset="9" cols="3" class="text-right py-0">
        Trả lời bởi
        <span class="teal--text">{{ answer.user.role }}</span>
        {{ answer.user.userName }}<br />
        <span class="teal--text"
          >Điểm uy tín: {{ answer.user.reputationPoint }}</span
        ><br />
        {{ shortDateTime(answer.createdAt) }}
      </v-col>
      <v-col cols="11" class="pl-4" offset="1" v-if="answer.comments">
        <v-row>
          <v-col cols="12" class="py-0">
            <h4>{{ answer.comments.length }} Bình luận</h4>
          </v-col>
        </v-row>
        <div
          v-for="comment in answer.comments"
          :key="comment._id"
          :comment-data="comment"
          :current-user-data="currentUserData"
        >
          <v-row>
            <v-col cols="9" class="pl-8">
              <div v-html="comment.content"></div>
            </v-col>
            <v-col cols="3" class="text-right">
              bởi {{ comment.user.userName }}
            </v-col>
          </v-row>
          <v-divider></v-divider>
        </div>
      </v-col>
      <v-col cols="11" offset="1">
        <v-btn
          class="px-0"
          color="primary"
          text
          @click="openComment = true"
          v-if="isAllowComment || isOwner"
          >Thêm bình luận</v-btn
        >
        <v-tooltip top v-else :open-on-click="true" :open-on-hover="false">
          <template v-slot:activator="{ on: { click }, attrs }">
            <v-btn color="primary" text dark v-bind="attrs" @click="click">
              Thêm bình luận
            </v-btn>
          </template>
          <span>Bạn phải có đủ 50 điểm uy tin để bình luận</span>
        </v-tooltip>
        <!-- <v-snackbar v-model="snackbar" top>
          Bạn phải có đủ 50 điểm uy tin để bình luận
          <template v-slot:action="{ attrs }">
            <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
              Đóng câu hỏi
            </v-btn>
          </template>
        </v-snackbar> -->
      </v-col>
    </v-row>
    <v-row v-show="openComment">
      <v-col cols="11" offset="1">
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
              v-model="comment.content"
            ></v-textarea>
            <span class="red--text">{{ errors[0] }}</span>
          </ValidationProvider>
          <div class="mb-1">
            <v-btn color="primary" @click="postComment" :disabled="invalid"
              >Bình luận</v-btn
            >
          </div>
        </ValidationObserver>
      </v-col>
    </v-row>
  </div>
</template>
<script>
/* eslint-disable no-unused-vars */
import answerService from "@/api/answer.js";
import commentService from "@/api/comment.js";
import { commentServiceRoot } from "@/api/comment.js";

export default {
  data() {
    return {
      answer: null,
      snackbar: false,
      openComment: false,
      edit: false,
      comment: {
        content: ""
      }
    };
  },
  props: {
    answerData: {
      type: Object,
      required: true,
      default: function() {
        return null;
      }
    },
    questionIsClose: {
      type: Boolean,
      required: true,
      default: false
    },
    ownerOfQuestion: {
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
  computed: {
    isOwner() {
      if (this.ownerOfQuestion && this.currentUserData) {
        return this.ownerOfQuestion._id == this.currentUserData.userId;
      } else {
        return false;
      }
    },
    isAllowComment() {
      return this.currentUserData.user.reputationPoint > 75 ? true : false;
    }
  },
  watch: {
    answerData: {
      handler: "getData",
      deep: true
    }
  },
  methods: {
    shortDateTime: timeStamp => {
      let d = new Date(timeStamp);
      return d.toLocaleString();
    },
    getData() {
      this.answer = JSON.parse(JSON.stringify(this.answerData));
    },
    async postComment() {
      const data = {
        ...this.comment,
        answerId: this.answer._id
      };
      try {
        await commentService.createComment(data);
        this.comment.content = "Nhập bình luận của bạn";
        const updatedAnswer = await answerService.getAnswer(this.answer._id);
        this.answer = updatedAnswer;
      } catch (err) {
        console.log(err);
      }
    },
    async likeAnswer() {
      try {
        await answerService.likeAnswer(this.answer._id);
        const updatedAnswer = await answerService.getAnswer(this.answer._id);
        this.answer = updatedAnswer;
      } catch (err) {
        console.log(err);
      }
    },
    acceptAnswer() {
      answerService
        .acceptAnswer(this.answer._id)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getData();
    commentServiceRoot.on("created", async () => {
      const answerId = this.answer._id;
      this.answer = await answerService.getAnswer(answerId);
    });
  }
};
</script>
