<template>
  <div v-if="answer">
    <v-row>
      <v-col cols="1" class="align-center flex-column d-flex py-0">
        <v-btn
          small
          outlined
          fab
          color="teal"
          v-if="!questionData.isClose"
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
        <span> {{ answer.likes.length }} likes </span>
      </v-col>
      <v-col cols="11" class="py-0">
        <div v-html="answer.content"></div>
      </v-col>
      <v-col offset="1" cols="8" class="pb-0">
        <v-btn text color="grey" class="pl-0" x-small>
          <v-icon dark>
            mdi-pencil
          </v-icon>
          Chỉnh sửa
        </v-btn>
      </v-col>
      <v-col cols="3" class="text-right pb-0">
        asked by {{ answer.user.userName }}
      </v-col>
      <v-col cols="10" offset="2" v-if="listComments">
        <div
          v-for="comment in listComments"
          :key="comment._id"
          :comment-data="comment"
          :answer-data="answerData"
          :current-user-data="currentUserData"
        >
          <v-row>
            <v-col cols="12" class="py-0">
              <div v-html="comment.content"></div>
            </v-col>
            <v-col cols="3" class="text-right pb-0">
              asked by {{ comment.user.userName }}
            </v-col>
          </v-row>
        </div>
      </v-col>
      <v-col cols="11" offset="1">
        <v-btn color="primary" text @click.stop="checkPoint"
          >add a comment</v-btn
        >
        <v-snackbar v-model="snackbar" top>
          You must have 50 reputation to comment
          <template v-slot:action="{ attrs }">
            <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </v-col>
    </v-row>
    <v-row v-if="isAllowComment">
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
import answerService from "@/api/answer.js";
import commentService from "@/api/comment.js";
export default {
  data() {
    return {
      answer: null,
      isAllowComment: false,
      snackbar: false,
      edit: false,
      listComments: null,
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
  methods: {
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
        this.comment.content = "";
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
    checkPoint() {
      if (this.currentUserData && this.currentUserData.reputationPoint > 10) {
        this.isAllowComment = true;
      } else {
        this.snackbar = true;
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
  }
};
</script>
