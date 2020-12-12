<template>
  <div>
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
import questionService from "@/api/question.js";
import authService from "@/api/authentication.js";
export default {
  data() {
    return {
      answer: null,
      isAllowComment: false,
      snackbar: false
    };
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {},
  methods: {
    async getData() {
      const id = this.$route.params.questionId;
      try {
        const question = await questionService.getQuestion(id);
        if (question) {
          this.question = JSON.parse(JSON.stringify(question));
        }
        const user = await authService.getUserByRole();
        this.currentUser = user;
      } catch (err) {
        console.log(err);
      }
    },
    postComment() {
      console.log("post comment");
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
