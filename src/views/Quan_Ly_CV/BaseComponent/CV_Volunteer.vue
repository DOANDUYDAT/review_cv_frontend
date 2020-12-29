<template>
  <div class="container">
    <v-container>
      <v-row class="profile">
        <v-col cols="4">
          <img
            src="https://media4.s-nbcnews.com/j/newscms/2020_19/1562894/future-of-travel-today-main_32aedb81d10d25bd8ddeb01da051c4bd.fit-2000w.png"
            alt=""
          />
        </v-col>
        <v-col cols="8" class="profile_user">
          <h3>Hường N.</h3>
          <div class="profile_detail">
            <p>Ngay sinh: 20/02/1998</p>
            <p>Ngay sinh: 20/02/1998</p>
            <p>Ngay sinh: 20/02/1998</p>
            <p>Ngay sinh: 20/02/1998</p>
            <p>Ngay sinh: 20/02/1998</p>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <!-- <div class="info_user">
      <div class="image_user">
        <img src="" alt="" />
      </div>
      <div class="profile_user">
        <h1>Hường N.</h1>
        <div class="profile_detail">
          <p>Ngay sinh: 20/02/1998</p>
          <p>Ngay sinh: 20/02/1998</p>
          <p>Ngay sinh: 20/02/1998</p>
          <p>Ngay sinh: 20/02/1998</p>
          <p>Ngay sinh: 20/02/1998</p>
        </div>
      </div>
    </div> -->
    <div class="goal_job">
      <h2 class="goal__title">MUC TIEU NGHE NGHIEP</h2>
      <!-- <hr /> -->
      <div class="goal__detail">
        <p>
          + Nhận được vị trí đầy cơ hội và thách thức đang được tuyển dụng trong
          tổ chức năng động và chuyên nghiệp. Bằng kinh nghiệm có được trong quá
          trình học tập, cùng kỹ năng giao tiếp và đam mê sẵn có, cam kết đóng
          góp hết khả năng của mình để giúp một phần cho Công Ty. Trau dồi kỹ
          năng chuyên sâu bằng những dự án thực tế. Trải nghiệm và hết mình làm
          việc với công việc
        </p>
        <p>
          + Mong muốn trở thành tester chuyên nghiệp, trau dồi học hỏi, tích lũy
          kiến thức về auto test
        </p>
      </div>
    </div>
    <div class="education">
      <h2 class="education__title">HOC VAN</h2>
      <div class="education_item">
        <v-row class="education_item--title">
          <v-col cols="6" class="education_item--name"
            >Học viện công nghệ bưu chính viễn thông</v-col
          >
          <v-col cols="6" class="education_item--date"
            ><span class="date">09/2016</span> -
            <span class="dateEnd">Nay</span></v-col
          >
        </v-row>
        <div class="education_item--value">
          <p>
            Chuyên ngành Công nghệ thông tin
          </p>
          <p>
            CPA hiện tại: 3.15
          </p>
          <p>
            Hiện tại là sinh viên năm 4
          </p>
        </div>
      </div>
      <div class="education_item">
        <v-row class="education_item--title">
          <v-col cols="6" class="education_item--name"
            >Học viên tại trung tâm T3H</v-col
          >
          <v-col cols="6" class="education_item--date"
            ><span class="date">06/2019</span> -
            <span class="dateEnd">12/2019</span></v-col
          >
        </v-row>
        <div class="education_item--value">
          <p>
            Chuyên ngành: Lập trình java-android
          </p>
          <p>
            Nắm vững kiến thức OOP, tự phát triển app trên thiết bị di động
          </p>
        </div>
      </div>
      <div class="education_item">
        <v-row class="education_item--title">
          <v-col cols="6" class="education_item--name"
            >Học viên tại trung tâm TesterTop</v-col
          >
          <v-col cols="6" class="education_item--date"
            ><span class="date">11/2020</span> -
            <span class="dateEnd">nay</span></v-col
          >
        </v-row>
        <div class="education_item--value">
          <p>
            Chuyên ngành: Tester
          </p>
        </div>
      </div>
      <!-- <h2 class="goal__title">MUC TIEU NGHE NGHIEP</h2>
      <hr />
      <div class="goal__detail">
        <p>+</p>
        <p>+</p>
      </div> -->
    </div>
    <div class="certification">
      <h2 class="certification__title">CHUNG CHI</h2>
      <v-row class="certification_item">
        <v-col cols="6" class="certification_item--name">Toeic 590</v-col>
        <v-col cols="6" class="certification_item--date"
          ><span class="date">2020</span></v-col
        >
      </v-row>
    </div>
    <v-container class="skill">
      <v-row class="skill-title">
        <h2>CÁC KỸ NĂNG</h2>
      </v-row>
      <v-row class="skill-item">
        <v-col cols="4" class="skill-item__title">
          <p>Kỹ năng chuyên môn</p>
        </v-col>
        <v-col cols="8" class="skill-item__value">
          <ul>
            <li><span>+</span>Co kha nang doc hieu tai lieu tieng anh</li>
            <li><span>+</span>Co kha nang doc hieu tai lieu tieng anh</li>
            <li><span>+</span>Co kha nang doc hieu tai lieu tieng anh</li>
            <li><span>+</span>Co kha nang doc hieu tai lieu tieng anh</li>
            <li><span>+</span>Co kha nang doc hieu tai lieu tieng anh</li>
            <li><span>+</span>Co kha nang doc hieu tai lieu tieng anh</li>
          </ul>
        </v-col>
      </v-row>
      <v-row class="skill-item">
        <v-col cols="4" class="skill-item__title">
          <p>Kỹ năng làm việc nhóm</p>
        </v-col>
        <v-col cols="8" class="skill-item__value">
          <ul>
            <li><span>+</span>Co kha nang làm việc nhóm tương đối tốt, cùng hỗ trợ các thành viên trong nhóm làm việc hiệu quả và có trách nhiệm với việc mình được giao</li>
          </ul>
        </v-col>
      </v-row>
      <v-row class="skill-item">
        <v-col cols="4" class="skill-item__title">
          <p>Kỹ năng Tiếng Anh</p>
        </v-col>
        <v-col cols="8" class="skill-item__value">
          <ul>
            <li><span>+</span>Đọc hiểu tài liệu tiếng anh</li>
          </ul>
        </v-col>
      </v-row>
      <v-row class="skill-item">
        <v-col cols="4" class="skill-item__title">
          <p>Kỹ năng giao tiếp</p>
        </v-col>
        <v-col cols="8" class="skill-item__value">
          <ul>
            <li><span>+</span>Giao tiếp tốt, cởi mở, hòa đồng</li>
          </ul>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
/* eslint-disable no-unused-vars */
import { mapActions, mapGetters } from "vuex";
export default {
  name: "CV_Volunteer",
  data() {
    return {
      // contentDetails: {},
      // defaultSize: "",
      // currentTagName: "",
      // idItem: ""
    };
  },
  watch: {
    // currentTagName() {
    //   console.log(this.command);
    //   this.getCurrentTagName();
    // },
    // command: function(newVal, oldVal) {
    //   // watch it
    //   console.log("Prop changed: ", newVal, " | was: ", oldVal);
    //   // console.log(this);
    //   this.exec(newVal);
    // },
    // contentDetails: {
    //   handler: function(val, oldVal) {
    //     this.updateCategoryData(val);
    //   },
    //   deep: true
    // }
  },
  computed: {
    // ...mapGetters("Cv", {
    //   command: "command",
    //   loading: "loading",
    //   error: "error"
    // })
  },
  methods: {
    //   editItem(e, i) {
    //     const item = e.srcElement;
    //     this.contentDetails.content[i].value = item.innerHTML;
    //   },
    //   goodJob() {
    //     debugger;
    //     const title = this.$refs.titleEduca.innerHTML;
    //     this.contentDetails.name = title;
    //   },
    //   exec(command, arg) {
    //     debugger;
    //     console.log(this.command);
    //     document.execCommand(command, false, arg);
    //   },
    //   getCurrentTagName() {
    //     if (window.getSelection().baseNode) {
    //       this.currentTagName = window.getSelection().baseNode.parentNode.tagName;
    //       console.log(this.currentTagName);
    //     }
    //   },
    //   addContent(i) {
    //     const elementArray = [...this.contentDetails.content];
    //     const newElement = { ...elementArray[i] };
    //     this.contentDetails.content.splice(i + 1, 0, newElement);
    //   },
    //   deleteContent(i) {
    //     const length = this.contentDetails
    //       ? this.contentDetails.content
    //         ? this.contentDetails.content.length
    //         : 0
    //       : 0;
    //     if (i <= length - 1 && length > 1) {
    //       this.contentDetails.content.splice(i, 1);
    //     }
    //   },
    //   ...mapActions("Cv", [
    //     "incrementOrder",
    //     "decrementOrder",
    //     "hiddenCategory",
    //     "updateCategoryData"
    //   ])
    // },
    // props: ["data", "bigfont", "smallFont", "lineheight", "fontfamily"],
    // created() {
    //   this.contentDetails = JSON.parse(JSON.stringify(this.data));
    //   // console.log(this.content);
    //   // console.log(this.bigFont);
    // }
  }
};
</script>

<style lang="scss">
.option__content .v-btn:first-child {
  margin-right: 10px;
}
img {
  width: 100%;
}
.profile {
  align-items: center;
  .profile_user {
    text-align: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    h3 {
      font-weight: bold;
      font-size: 30px;
      margin-bottom: 20px;
    }
    .profile_detail {
      p {
        margin-bottom: 5px;
      }
    }
  }
}
.goal_job {
  margin-bottom: 25px;

  h2.goal__title {
    border-bottom: 2px solid;
  }
  .goal__detail {
    padding: 10px 0;
    p {
      margin-bottom: 0;
    }
  }
}

h2.education__title {
  border-bottom: 2px solid;
  margin-bottom: 20px;
}

.row.education_item--title {
  /* font-weight: bold; */
}

.education_item--name {
  font-weight: bold;
  font-size: 18px;
  word-spacing: 5px;
}

.education_item--date {
  text-align: right;
}

.education_item--value p {
  margin-bottom: 4px;
}

.education_item {
  margin-bottom: 14px;
}

.education_item--value p:first-child {
  font-style: italic;
}

h2.certification__title {
  border-bottom: 2px solid;
}

.certification_item--date.col.col-6 {
  text-align: right;
}
.skill .skill-item {
  border-bottom: 1px solid;
      padding: 15px 0;
      &:last-child {
        border-bottom: none;
      }
}
.skill-item__title {
  padding: 0;
    font-size: 18px;
    word-spacing: 3px;
}
.skill-item__value {
  padding: 0;
  ul {
    list-style-type: none;
  }
  span {
    display: inline-block;
    margin-right: 10px;
  }
}

.skill-title {
  margin-bottom: 30px;
  border-bottom: 2px solid;
  // h2 {
  //   border-bottom: 2px solid;

  // }
}
</style>
