<template>
  <div>
    <v-tabs color="teal accent-4" left v-model="tab">
      <v-tab>Tin tuyển dụng</v-tab>
      <v-tab>Thêm tin tuyển dụng mới</v-tab>
      <v-tab-item>
        <v-container
          fluid
          style="min-height: 63vh"
          v-if="listRecruitment && listRecruitment.length"
        >
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="subtitle-1 text-center">
                    Vị trí tuyển dụng
                  </th>
                  <th class="subtitle-1 text-center">
                    Hạn nhận hồ sơ
                  </th>
                  <th class="subtitle-1 text-center">
                    Ngành nghề
                  </th>
                  <th class="subtitle-1 text-center">
                    Địa điểm làm việc
                  </th>
                  <th class="subtitle-1 text-center">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="recruitment in listRecruitment"
                  :key="recruitment._id"
                  @click.stop="goToRecruitmentDetailPage(recruitment)"
                >
                  <td class="text-left">
                    {{ recruitment.title }}
                    <v-icon
                      v-if="isPrimary(recruitment._id)"
                      small
                      color="warning"
                      >mdi-star</v-icon
                    >
                  </td>
                  <td class="text-center">
                    {{ shortDate(recruitment.expiredDate) }}
                  </td>
                  <td class="text-center">{{ recruitment.field }}</td>
                  <td class="text-center">{{ recruitment.location }}</td>
                  <td class="text-center">
                    <v-btn
                      text
                      color="primary"
                      v-if="!isPrimary(recruitment._id)"
                      @click.stop="setPrimary(recruitment._id)"
                      >Đặt làm tin chính</v-btn
                    >
                    <!-- <v-icon left small> mdi-star</v-icon>Đặt làm tin chính -->
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-container>
        <v-container v-else style="min-height: 63vh">
          <h3>Bạn không có tin tuyển dụng nào!</h3>
        </v-container>
      </v-tab-item>
      <v-tab-item>
        <v-card rounded="xs" class="pa-4">
          <h2>Tạo tin tuyển dụng mới</h2>
          <v-divider></v-divider>
          <ValidationObserver v-slot="{ invalid }">
            <h3 class="pt-4">Tiêu đề <span class="red--text">*</span></h3>
            <h4 class="font-weight-regular font-italic">
              Viết ngắn gọn, chính xác vị trí và công việc cần tuyển.
            </h4>
            <ValidationProvider
              mode="aggressive"
              name="Title"
              rules="required"
              v-slot="{ errors }"
              :bails="false"
            >
              <v-text-field
                v-model="recruitment.title"
                placeholder="VD: Nhân viên kinh doanh, Lập trình viên PHP"
                outlined
                dense
              ></v-text-field>
              <span class="red--text text--lighten-1">{{ errors[0] }}</span>
            </ValidationProvider>
            <h3>Ngành <span class="red--text">*</span></h3>
            <h4 class="font-weight-regular font-italic">
              Lựa chọn ngành nghề liên quan đến vị trí tuyển dụng này.
            </h4>
            <v-select
              placeholder="Chọn ngành nghề"
              :items="fields"
              outlined
              v-model="recruitment.field"
            ></v-select>
            <h3>Địa điểm làm việc<span class="red--text">*</span></h3>
            <h4 class="font-weight-regular font-italic">
              Ứng viên khi đi làm, sẽ làm việc tại địa chỉ này.
            </h4>
            <ValidationProvider
              mode="aggressive"
              name="Location"
              rules="required"
              v-slot="{ errors }"
              :bails="false"
            >
              <v-text-field
                placeholder="Địa điểm làm việc"
                outlined
                dense
                v-model="recruitment.location"
              ></v-text-field>
              <span class="red--text text--lighten-1">{{ errors[0] }}</span>
            </ValidationProvider>
            <h3>Hạn nộp hồ sơ <span class="red--text">*</span></h3>
            <v-menu
              v-model="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="recruitment.expiredDate"
                  outlined
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="recruitment.expiredDate"
                @input="menu = false"
              ></v-date-picker>
            </v-menu>
            <h3>Mô tả công việc <span class="red--text">*</span></h3>
            <div class="qa-editor">
              <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
                <div class="menubar">
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
                    :class="{ 'is-active': isActive.italic() }"
                    @click="commands.italic"
                  >
                    <v-icon>mdi-format-italic</v-icon>
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
                  <v-btn
                    text
                    icon
                    class="menubar__button"
                    :class="{ 'is-active': isActive.heading({ level: 1 }) }"
                    @click="commands.heading({ level: 1 })"
                  >
                    <v-icon>mdi-format-header-1</v-icon>
                  </v-btn>
                  <v-btn
                    text
                    icon
                    class="menubar__button"
                    :class="{ 'is-active': isActive.heading({ level: 2 }) }"
                    @click="commands.heading({ level: 2 })"
                  >
                    <v-icon>mdi-format-header-2</v-icon>
                  </v-btn>

                  <v-btn
                    text
                    icon
                    class="menubar__button"
                    :class="{ 'is-active': isActive.heading({ level: 3 }) }"
                    @click="commands.heading({ level: 3 })"
                  >
                    <v-icon>mdi-format-header-3</v-icon>
                  </v-btn>
                  <v-btn
                    text
                    icon
                    class="menubar__button"
                    :class="{ 'is-active': isActive.bullet_list() }"
                    @click="commands.bullet_list"
                  >
                    <v-icon>mdi-format-list-checkbox</v-icon>
                  </v-btn>

                  <v-btn
                    text
                    icon
                    class="menubar__button"
                    :class="{ 'is-active': isActive.ordered_list() }"
                    @click="commands.ordered_list"
                  >
                    <v-icon>mdi-format-list-numbered-rtl</v-icon>
                  </v-btn>
                </div>
              </editor-menu-bar>

              <editor-content class="editor__content" :editor="editor" />
            </div>

            <v-btn
              small
              color="error"
              class="my-4"
              @click.stop="createRecruitment"
              :disabled="invalid"
            >
              Thêm tin
            </v-btn>
          </ValidationObserver>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import authService from "@/api/authentication";
import specialistService from "@/api/specialist.js";
import recruitmentService from "@/api/recruitment.js";
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
  components: {
    EditorContent,
    EditorMenuBar
    // Icon
  },
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      menu: false,
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
          // this.json = getJSON();
          this.recruitment.content = getHTML();
        }
      }),
      recruitment: {
        title: "",
        content: "",
        expiredDate: new Date().toISOString().substr(0, 10),
        field: null,
        location: ""
      },
      listRecruitment: null,
      specialist: null,
      tab: null
    };
  },
  methods: {
    shortDate: timeStamp => {
      let d = new Date(timeStamp);
      return d.toLocaleDateString();
    },
    isPrimary(recruitmentId) {
      return this.specialist.primaryRecruitment === recruitmentId;
    },
    goToRecruitmentDetailPage(recruitment) {
      this.$router.push({ path: `/recruitment-news/${recruitment._id}` });
    },
    async getData() {
      const userId = await authService.getCurrentUserId();
      this.specialist = await specialistService.getSpecialist(userId);

      const { listRecruitmentNews } = this.specialist;
      this.listRecruitment = await recruitmentService.getListRecruitment(
        listRecruitmentNews
      );
    },
    clearContent() {
      this.recruitment = {
        title: "",
        content: "",
        expiredDate: new Date().toISOString().substr(0, 10),
        field: null,
        location: ""
      };
      this.editor.clearContent(true);
      this.editor.focus();
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
                  text: "This is some inserted text. 👋"
                }
              ]
            }
          ]
        },
        true
      );
      // HTML string is also supported
      // this.editor.setContent('<p>This is some inserted text. 👋</p>')
      this.editor.focus();
    },
    createRecruitment() {
      const data = this.recruitment;
      recruitmentService
        .createRecruitment(data)
        .then(res => {
          this.tab = 0;
          this.$swal({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "Thêm tin tuyển dụng thành công",
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch(err => {
          this.$swal({
            toast: true,
            position: "top-end",
            title: "Thêm tin tuyển dụng thất bại!",
            text: err,
            icon: "error",
            showConfirmButton: false,
            timer: 1500
          });
        });
    },
    setPrimary(recruitmentId) {
      recruitmentService
        .setPrimary(recruitmentId)
        .then(res => {
          this.$swal({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "Đặt tin tuyển dụng chính thành công",
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch(err => {
          this.$swal({
            toast: true,
            position: "top-end",
            title: "Đặt tin tuyển dụng chính thất bại!",
            text: err,
            icon: "error",
            showConfirmButton: false,
            timer: 1500
          });
        })
        .finally(() => {
          this.getData();
        });
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
.menubar__button.is-active {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
<style lang="scss">
.qa-editor .editor__content .ProseMirror {
  height: 200px;
  overflow: auto;
  outline: none;
}
.qa-editor .editor__content .ProseMirror:focus {
  outline: 2px solid #2196f3;
}
</style>
