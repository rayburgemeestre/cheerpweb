<template>
  <div>
    <div class="container" :id="name" :style="{'height': `calc(${height} - ( 8rem) )`}"></div>
    <div class="tags has-addons">
      <span class="tag"><label class="checkbox">
        <input type="checkbox" v-model="vim_mode">VIM</label>
      </span>
      <span class="tag is-primary" :id="`${name}_status`"></span>
    </div>
  </div>
</template>

<script>
import { initVimMode } from 'monaco-vim';
export default {
  props: {
    vim_mode: {
      type: Boolean,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: false
    },
    language: {
      type: String,
      required: false
    },
    height: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.editor = monaco.editor.create(document.getElementById(this.name), {
      value: this.code,
      language: this.language,
      automaticLayout: true
    });
    this.vimMode_1 = initVimMode(this.editor, document.getElementById(this.name + "_status"))
  },
  watch: {
    code(new_val) {
      if (this.editor) {
        if (new_val !== this.editor.getValue()) {
          this.editor.setValue(new_val)
        }
      }
    },
    vim_mode(new_val) {
      if (new_val) {
        this.vimMode_1 = initVimMode(this.editor, document.getElementById(this.name + "_status"))
      } else {
        this.vimMode_1.dispose();
        document.getElementById(this.name + "_status").innerHTML = '';
      }
    }
  }
}
</script>

<style scoped>
.container {
  width: calc(100vh - ( 6rem) );
}
</style>
