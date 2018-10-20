import _ from 'lodash';
import * as monaco from 'monaco-editor';
import { initVimMode } from 'monaco-vim';

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

