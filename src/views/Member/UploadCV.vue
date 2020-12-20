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
                <v-text-field
                  placeholder="Họ và tên"
                  outlined
                  dense
                ></v-text-field
              ></v-col>
              <v-col cols="4">Kinh nghiệm</v-col>
              <v-col cols="8">
                <v-text-field
                  placeholder="Kinh nghiệm"
                  outlined
                  dense
                ></v-text-field
              ></v-col>
              <v-col cols="4">Lĩnh vực làm việc</v-col>
              <v-col cols="8">
                <v-text-field
                  placeholder="Lĩnh vực làm việc"
                  outlined
                  dense
                ></v-text-field
              ></v-col>
              <v-col cols="4">Cấp bậc</v-col>
              <v-col cols="8">
                <v-text-field
                  placeholder="Cấp bậc"
                  outlined
                  dense
                ></v-text-field
              ></v-col>
              <v-col cols="4">Địa điểm làm việc</v-col>
              <v-col cols="8">
                <v-text-field
                  placeholder="Địa điểm làm việc"
                  outlined
                  dense
                ></v-text-field
              ></v-col>
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
                    v-model="file"
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
      file: null,
      form: {
        fullName: "",
        showPassword: false,
        password: ""
      }
    };
  },
  methods: {
    async upLoadCv() {
      const res = await cvService.uploadCv(this.file);
      console.log(res);
    },
    handleFileUpload(file) {
      console.log(file);
      this.file = file;
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
