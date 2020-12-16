<template>
  <div style="background-color:#3f51b5; height:100%">
    <v-row justify="center">
      <v-col cols="8" class="text-center pt-16">
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
                  color="#3f51b5"
                  style="position: absolute; top: 30px; left: 60px; z-index: 10"
                  v-model="file"
                >
                </v-file-input>
              </v-img>
            </v-card-text>
            <v-card-actions class="d-flex justify-center">
              <v-btn color="#0da1ec" class="white--text" @click="upLoadCv">
                Get a free CV review
              </v-btn>
            </v-card-actions>
          </v-card>
        </form>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import cvService from "@/api/cv";
export default {
  data: () => {
    return {
      file: null
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
