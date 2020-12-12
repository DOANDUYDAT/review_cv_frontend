<template>
  <div v-if="answer">
    <v-row>
      <v-col cols="1" class="align-center flex-column d-flex py-0">
        <v-btn small outlined fab color="teal" v-if="!questionData.isClose">
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
        <span>{{ answer.content }}</span>
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
export default {
  data() {
    return {
      answer: null,
      isAllowComment: false,
      snackbar: false
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
    }
  },
  computed: {},
  methods: {
    async getData() {
      this.answer = JSON.parse(JSON.stringify(this.answerData));
    },
    postComment() {
      console.log("post comment");
    },
    likeAnswer() {
      console.log("like answer");
    },
    checkPoint() {
      if (this.isAllowComment) {
        this.isAllowComment = false;
        return;
      }
      if (this.currentUser.reputationPoint > 10) {
        this.isAllowComment = true;
      } else {
        this.snackbar = true;
      }
    }
  },
  created() {
    this.getData();
  }
};
</script>
