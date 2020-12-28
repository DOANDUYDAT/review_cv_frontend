<template>
  <div style="background-color:#3f51b5; height:100%">
    <ValidationObserver v-slot="{ invalid }" ref="formUploadCv">
      <v-row justify="center">
        <v-col cols="5" class="pt-16">
          <div style="background-color:white; height:100%">
            <v-row class="px-8 pt-4">
              <h2 class="text-highlight ">Thông tin cá nhân</h2>
            </v-row>
            <v-row class="px-8">
              <v-col cols="4">Kinh nghiệm</v-col>
              <v-col cols="8">
                <v-select
                  v-model="cv.exp"
                  placeholder="Kinh nghiệm"
                  :items="exps"
                  outlined
                ></v-select>
              </v-col>
              <v-col cols="4">Lĩnh vực làm việc</v-col>
              <!-- <v-col cols="8">
                <ValidationProvider>
                  <v-select
                    v-model="cv.fields"
                    :items="fieldsData"
                    filled
                    chips
                    outlined
                    background-color="white"
                    label="Lĩnh vực làm việc"
                    item-text="name"
                    item-value="name"
                    multiple
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        :input-value="data.selected"
                        close
                        @click="data.select"
                        @click:close="remove(data.item)"
                      >
                        {{ data.item.name }}
                      </v-chip>
                    </template>
                    <template v-slot:item="data">
                      <template v-if="typeof data.item !== 'object'">
                        <v-list-item-content
                          v-text="data.item"
                        ></v-list-item-content>
                      </template>
                      <template v-else>
                        <v-list-item-content>
                          <v-list-item-title
                            v-html="data.item.name"
                          ></v-list-item-title>
                        </v-list-item-content>
                      </template>
                    </template>
                  </v-select>
                </ValidationProvider>
              </v-col> -->
              <v-col cols="8">
                <v-select
                  v-model="cv.field"
                  placeholder="Lĩnh vực làm việc"
                  :items="fields"
                  outlined
                ></v-select>
              </v-col>
              <v-col cols="4">Cấp bậc</v-col>
              <v-col cols="8">
                <v-select
                  v-model="cv.position"
                  placeholder="Cấp bậc"
                  :items="positions"
                  outlined
                ></v-select>
              </v-col>
              <v-col cols="4">Địa điểm làm việc</v-col>
              <v-col cols="8">
                <ValidationProvider
                  mode="aggressive"
                  name="Location"
                  rules="required"
                  v-slot="{ errors }"
                  :bails="false"
                >
                  <v-text-field
                    v-model="cv.location"
                    placeholder="Địa điểm làm việc"
                    outlined
                    dense
                  ></v-text-field
                  ><span class="red--text text--lighten-1">{{
                    errors[0]
                  }}</span>
                </ValidationProvider>
              </v-col>
              <v-col cols="4">Thời gian làm việc</v-col>
              <v-col cols="8">
                <v-select
                  v-model="cv.timeType"
                  placeholder="Thời gian làm việc"
                  :items="timeTypes"
                  outlined
                ></v-select>
              </v-col>
            </v-row>
          </div>
        </v-col>
        <v-col cols="4" class="text-center pt-16">
          <h1 class="font-weight-medium white--text">
            Bắt đầu một công việc tuyệt vời
          </h1>
          <h1 class="font-weight-medium white--text">với một CV tuyệt vời.</h1>
          <h3 class="font-weight-regular white--text">Tải lên CV của bạn</h3>

          <form
            action="http://localhost:3030/uploads"
            method="post"
            enctype="multipart/form-data"
          >
            <v-card
              class="mx-auto my-10 px-15 py-10"
              max-width="300"
              style="padding: inherit;border: 3px dashed white;"
              outlined
              color="#3f51b5"
            >
              <v-card-text class="text-center">
                <v-img src="../../assets/cv.png" style="position: relative;">
                  <v-file-input
                    hide-input
                    prepend-icon="mdi-upload"
                    accept="application/pdf"
                    color="#3f51b5"
                    style="position: absolute; top: 30px; left: 60px; z-index: 10"
                    v-model="cv.file"
                  >
                  </v-file-input>
                </v-img>
              </v-card-text>
              <v-card-actions class="d-flex justify-center">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="#0da1ec"
                      class="white--text"
                      v-bind="attrs"
                      v-on="on"
                      @click="upLoadCv"
                      :disabled="invalid"
                    >
                      Nhận review CV miễn phí
                    </v-btn>
                  </template>
                  <span>Bạn hãy cập nhật thông tin cá nhân</span>
                </v-tooltip>
              </v-card-actions>
            </v-card>
          </form>
        </v-col>
      </v-row>
    </ValidationObserver>
  </div>
</template>
<script>
import cvService from "@/api/cv";
export default {
  data: () => {
    return {
      exps: [
        "Chưa có",
        "Dưới 1 năm",
        "1 năm",
        "2 năm",
        "3 năm",
        "4 năm",
        "5 năm"
      ],
      positions: [
        "Nhân viên",
        "Trưởng nhóm",
        "Quản lý/Giám sát",
        "Trưởng/Phó phòng",
        "Trưởng chi nhánh",
        "Phó giám đốc",
        "Giám đốc",
        "Thực tập sinh"
      ],
      timeTypes: ["Full-time", "Part-time"],
      file: null,
      fields: [
        "An toàn lao động",
        "Bất động sản",
        "Bưu chính - Viễn thông",
        "Công nghệ thông tin",
        "Dệt may/Da giày",
        "Điện tử viễn thông",
        "Du lịch",
        "Kế toán/Kiểm toán",
        "Luật/Pháp lý",
        "Quản lý điều hành"
      ],
      cv: {
        file: null,
        exp: "",
        field: [],
        position: "",
        location: "",
        timeType: ""
      }
    };
  },
  methods: {
    async upLoadCv() {
      if (this.cv.file) {
        await cvService.uploadCv(this.cv);
        this.cv.file = null;
        this.cv.exp = "";
        this.cv.field = [];
        this.cv.position = "";
        this.cv.location = "";
        this.cv.timeType = "";
        //then do this to reset your ValidationObserver
        this.$nextTick(() => this.$refs.formUploadCv.reset());
        // this.errors.clear();
        this.$swal({
          position: "center",
          icon: "success",
          title: "Upload CV thành công",
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        this.$swal({
          position: "center",
          icon: "warning",
          title: "File không được bỏ trống",
          showConfirmButton: false,
          timer: 1500
        });
      }
    },
    handleFileUpload(file) {
      console.log(file);
      this.file = file;
    }
    // remove(item) {
    //   const index = this.cv.fields.indexOf(item.name);
    //   if (index >= 0) this.cv.fields.splice(index, 1);
    // }
  }
};
</script>
<style lang="scss" scoped>
.theme--light.v-btn.v-btn--disabled {
  background-color: #2196f3;
  color: white;
}
.text-highlight {
  color: #3f51b5;
}
</style>
