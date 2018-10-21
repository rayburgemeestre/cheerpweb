import _ from 'lodash';
import * as monaco from 'monaco-editor';
import { initVimMode } from 'monaco-vim';
import Vue from 'vue'
import App from './App.vue'


if (!window.included) {
    window.included = true;
    new Vue({
        el: '#app',
        render: h => h(App)
    })

    require('./mystyles.scss');

    /*
    function component() {
      let element = document.createElement('div');

      element.innerHTML = _.join(['Hello', 'webpack'], ' ');

      return element;
    }

    document.body.appendChild(component());
    */

    const editor_cpp = monaco.editor.create(document.getElementById('container_editor_cpp'), {
        value: `#include <cheerp/client.h>
#include <cheerp/clientlib.h>

// We need to extend the client namespace to declare our
// custom JavaScript function
namespace client
{
    // The name should be the same as the JavaScript one
    // The parameters needs to be a const client::String reference
    // so that implicit conversion from const char* is supported
    void changeTitle(const String& str);
}

using namespace client;

void webMain()
{
    Element* titleElement=document.getElementById("pagetitle");
    String* oldText=titleElement->get_textContent();
    changeTitle("Literal C++ string");
}`,
        language: 'cpp',
        automaticLayout: true
    });

    const editor_html = monaco.editor.create(document.getElementById('container_editor_html'), {
        value: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Cheerp test</title>
    <script defer src="example.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
    <script>
        // Use jQuery to make a (trivial) change to the page
        function changeTitle(str)
        {
                $("#pagetitle").text(str);
        }
    </script>
  </head>
  <body>
  <h1 id="pagetitle">Boring static text</h1>
  </body>
</html>`,
        language: 'cpp',
        automaticLayout: true
    });


    const editor_javascript = monaco.editor.create(document.getElementById('container_editor_javascript'), {
        value: `
"use strict";
/*Compiled using Cheerp (R) by Leaning Technologies Ltd*/
var aSlot=null;var oSlot=0;var nullArray=[null];var nullObj={d:nullArray,o:0};
function __Z7webMainv(){
	var LretConstructor=null;
	LretConstructor="pagetitle";
	LretConstructor=document.getElementById(LretConstructor);
	LretConstructor.textContent;
	LretConstructor="Literal C++ string";
	changeTitle(LretConstructor);
	return;
}
function _cheerpCreate_ZN6client6StringC2EPKc(Larg0,Marg0){
	var tmp0=0,Lgeptoindexphi=0,LretConstructor$pi=null,tmp3=null;
	LretConstructor$pi=String();
	tmp0=Larg0[Marg0]|0;
	if((tmp0&255)===0){
		return String(LretConstructor$pi);
	}else{
		Lgeptoindexphi=0;
	}
	while(1){
		tmp3=String.fromCharCode(tmp0<<24>>24);
		LretConstructor$pi=LretConstructor$pi.concat(tmp3);
		Lgeptoindexphi=Lgeptoindexphi+1|0;
		tmp0=Larg0[Marg0+Lgeptoindexphi|0]|0;
		if((tmp0&255)===0){
			break;
		}
	}
	return String(LretConstructor$pi);
}
var _$pstr=new Uint8Array([112,97,103,101,116,105,116,108,101,0]);
var _$pstr1=new Uint8Array([76,105,116,101,114,97,108,32,67,43,43,32,115,116,114,105,110,103,0]);
__Z7webMainv();
`,
        language: 'javascript',
        automaticLayout: true
    });

    const vimMode_1 = initVimMode(editor_cpp, document.getElementById('statusbar_editor_cpp'))
    const vimMode_2 = initVimMode(editor_html, document.getElementById('statusbar_editor_html'))
    const vimMode_3 = initVimMode(editor_javascript, document.getElementById('statusbar_editor_javascript'))

    //vimMode_1.dispose();

//console.log(editor);

}
