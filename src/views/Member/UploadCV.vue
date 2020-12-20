<template>
  <div style="background-color:#3f51b5; height:100%">
    <ValidationObserver v-slot="{ invalid }">
      <v-row justify="center">
        <v-col cols="5" class="pt-16">
          <div style="background-color:white; height:100%">
            <v-row class="px-8 pt-4">
              <h2 class="text-highlight ">Thông tin cá nhân</h2>
            </v-row>
            <v-row class="px-8">
              <v-col cols="4">Họ và tên</v-col>
              <v-col cols="8">
                <ValidationProvider
                  mode="aggressive"
                  name="fullName"
                  rules="required"
                  v-slot="{ errors }"
                  :bails="false"
                >
                  <v-text-field
                    v-model="cv.fullName"
                    placeholder="Họ và tên"
                    outlined
                    dense
                  ></v-text-field>
                  <span class="red--text text--lighten-1">{{ errors[0] }}</span>
                </ValidationProvider>
              </v-col>
              <v-col cols="4">Kinh nghiệm</v-col>
              <v-col cols="8">
                <v-select
                  v-model="cv.exp"
                  placeholder="Kinh nghiệm"
                  :items="exps"
                  outlined
                ></v-select>
                <!-- <v-text-field
                  v-model="cv.exp"
                  placeholder="Kinh nghiệm"
                  outlined
                  dense
                ></v-text-field -->
              </v-col>
              <v-col cols="4">Lĩnh vực làm việc</v-col>
              <v-col cols="8">
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
              </v-col>
              <v-col cols="4">Cấp bậc</v-col>
              <v-col cols="8">
                <v-select
                  v-model="cv.position"
                  placeholder="Kinh nghiệm"
                  :items="positions"
                  outlined
                ></v-select>
                <!-- <v-text-field
                  v-model="cv.position"
                  placeholder="Cấp bậc"
                  outlined
                  dense
                ></v-text-field -->
              </v-col>
              <v-col cols="4">Địa điểm làm việc</v-col>
              <v-col cols="8">
                <ValidationProvider
                  mode="aggressive"
                  name="fullName"
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
                <!-- <v-text-field
                  v-model="cv.timeType"
                  placeholder="Thời gian làm việc"
                  outlined
                  dense
                ></v-text-field -->
              </v-col>
            </v-row>
          </div>
          <!-- <v-form>
              <ValidationProvider
                mode="aggressive"
                name="email"
                rules="required|email"
                v-slot="{ errors }"
                :bails="false"
              >
                <v-text-field
                  v-model="form.email"
                  prepend-icon="mdi-email"
                  label="Email"
                  type="email"
                ></v-text-field>
                <span class="red--text text--lighten-1">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider
                mode="aggressive"
                name="password"
                rules="required|alpha_dash|min:6"
                v-slot="{ errors }"
                :bails="false"
              >
                <v-text-field
                  :type="form.showPassword ? 'text' : 'password'"
                  v-model="form.password"
                  label="Password"
                  counter="16"
                  prepend-icon="mdi-lock"
                  :append-icon="form.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="form.showPassword = !form.showPassword"
                  @keyup.enter="login"
                ></v-text-field>
                <span class="red--text text--lighten-1">{{ errors[0] }}</span>
              </ValidationProvider>
            </v-form> -->
        </v-col>
        <v-col cols="4" class="text-center pt-16">
          <h1 class="font-weight-medium white--text">
            Getting a great job starts
          </h1>
          <h1 class="font-weight-medium white--text">with a great CV.</h1>
          <h3 class="font-weight-regular white--text">Upload your CV</h3>

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
                    accept=".doc,.docx,application/pdf"
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
                      Get a free CV review
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
      fieldsData: [
        { name: "An toàn lao động" },
        { name: "Bất động sản" },
        { name: "Bưu chính - Viễn thông" },
        { name: "Công nghệ thông tin" },
        { name: "Dệt may/Da giày" },
        { name: "Điện tử viễn thông" },
        { name: "Du lịch" },
        { name: "Kế toán/Kiểm toán" },
        { name: "Luật/Pháp lý" },
        { name: "Quản lý điều hành" }
      ],
      cv: {
        file: null,
        fullName: "",
        exp: "",
        fields: [],
        position: "",
        location: "",
        timeType: ""
      }
    };
  },
  methods: {
    async upLoadCv() {
      if (this.cv.file) {
        const res = await cvService.uploadCv(this.cv);
        console.log(res);
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
    },
    remove(item) {
      const index = this.cv.fields.indexOf(item.name);
      if (index >= 0) this.cv.fields.splice(index, 1);
    }
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
