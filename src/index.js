import _ from 'lodash';
import * as monaco from 'monaco-editor';
import { initVimMode } from 'monaco-vim';
import Vue from 'vue'
import App from './App.vue'

new Vue({
      el: '#app',
      render: h => h(App)
})

require('./mystyles.scss');

function component() {
  let element = document.createElement('div');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());

const editor = monaco.editor.create(document.getElementById('container'), {
  value: 'int main() {}  ',
  language: 'cpp'
});

const vimMode = initVimMode(editor, document.getElementById('my-statusbar'))

