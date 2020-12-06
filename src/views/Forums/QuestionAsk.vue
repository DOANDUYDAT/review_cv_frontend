<template>
  <v-sheet rounded="xs" class="pa-4">
    <div class="subtitle-2">Title</div>
    <v-text-field
      label="Enter title"
      outlined
      dense
      v-model="question.title"
    ></v-text-field>
    <div class="subtitle-2">Body</div>
    <div class="qa-editor">
      <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
        <div class="menubar">
          <v-btn
            text
            icon
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 1 }) }"
            @click="commands.heading({ level: 1 })"
          >
            <b> H1 </b>
          </v-btn>
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
            :class="{ 'is-active': isActive.underline() }"
            @click="commands.underline"
          >
            <v-icon>mdi-format-underline</v-icon>
          </v-btn>
        </div>
      </editor-menu-bar>

      <editor-content class="editor__content" :editor="editor" />
    </div>
    <!-- <pre><code v-html="question.content">{{ question.content }}</code></pre> -->
    <v-btn small color="primary" class="my-4" @click="postQuestion">
      Post your question
    </v-btn>
  </v-sheet>
</template>

<script>
import questionService from "@/api/question";
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
          this.question.content = getHTML();
        }
      }),
      question: {
        title: "",
        content: ""
      }
    };
  },
  methods: {
    clearContent() {
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
    postQuestion() {
      questionService
        .createQuestion(this.question)
        .then(question => {
          console.log(question);
          this.$router.push({
            name: "Forums Home"
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeDestroy() {
    this.editor.destroy();
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
</style>
<style lang="scss">
.qa-editor .editor__content .ProseMirror {
  min-height: 200px;
  // overflow: auto;
}
</style>
