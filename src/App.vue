<template>
  <div class="columns is-fullheight">
    <div class="column">
      <nav class="navbar is-black" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href="https://bulma.io">
            <img src="cheerp.png" height="28">
          </a>

          <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start">
            <a class="navbar-item">
              Home
            </a>

            <a class="navbar-item">
              Documentation
            </a>

            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">
                More
              </a>

              <div class="navbar-dropdown">
                <a class="navbar-item">
                  About
                </a>
                <a class="navbar-item">
                  Jobs
                </a>
                <a class="navbar-item">
                  Contact
                </a>
                <hr class="navbar-divider">
                <a class="navbar-item">
                  Report an issue
                </a>
              </div>
            </div>
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <a class="button is-primary" v-on:click="compile" v-shortkey.once="['ctrl', 'f9']" @shortkey="compile()">
                  <strong>Compile</strong>
                </a>
                <a class="button is-light" v-on:click="run" v-shortkey.once="['ctrl', 'f10']" @shortkey="run()">
                  Run
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div class="columns is-fullheight">
        <div class="column">
          <div class="rows">
            <div class="row">

              <div class="tabs">
                <ul>
                  <li class="is-active"><a>Code editor</a></li>
                  <li><a>Compiler</a></li>
                </ul>
              </div>

              <editor-component v-model="cpp_code" name="cpp" language="cpp" height="50vh" :vim_mode="vim_mode" />

            </div>
            <div class="row">

              <div class="tabs">
                <ul>
                  <li class="is-active"><a>HTML</a></li>
                </ul>
              </div>
              <editor-component v-model="html_code" name="html" language="html" height="50vh" :vim_mode="vim_mode" />
            </div>
          </div>

        </div>
        <div class="column">
          <div class="rows">
            <div class="row">
              <div class="tabs">
                <ul>
                  <li class="is-active"><a>Javascript</a></li>
                </ul>
              </div>
              <editor-component v-model="js_code" name="js" language="javascript" height="50vh" :vim_mode="vim_mode" />
            </div>
            <div class="row">
              <div class="tabs">
                <ul>
                  <li class="is-active"><a>Compiler output</a></li>
                  <li><a>Run output</a></li>
                </ul>
              </div>
              <!--
              <textarea class="textarea" placeholder="Compiler output will be displayed here."></textarea>
              -->
              <iframe src="about:blank" v-on:load="onLoadIframe" name="myIframe"></iframe>
            </div>
          </div>
        </div>
      </div>

      <!-- for development commented out <script src="main.js"></script> -->
    </div>
  </div>
</template>

<script>
    import EditorComponent from './components/EditorComponent.vue'
    const _ = require('lodash');
    const axios = require('axios');

    const cpp_code = `
#include <cheerp/client.h>
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
}`.trim();

    const html_code = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Cheerp test</title>
    <script defer src="example.js"><\/script>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"><\/script>
    <script>
        // Use jQuery to make a (trivial) change to the page
        function changeTitle(str)
        {
                $("#pagetitle").text(str);
        }
    <\/script>
  </head>
  <body>
  <h1 id="pagetitle">Boring static text</h1>
  </body>
</html>`.trim();

    const js_code = `
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
__Z7webMainv();`.trim();

    function findIframeByName(name) {
        return _.find(window.frames, frame => frame.name === name);
    }

    export default {
        props: {
            vim_mode: {
                type: Boolean,
                default: true
            },
            cpp_code: {
                type: String,
                default: cpp_code,
            },
            html_code: {
                type: String,
                default: html_code,
            },
            js_code: {
                type: String,
                // default: js_code,
            }
        },
        components: {
            EditorComponent
        },
        methods: {
            update_iframe(name) {
                const iframe = findIframeByName(name);
                iframe.document.body.innerHTML = '';
                iframe.document.write(this.html_code);
                iframe.document.write("<script>");
                iframe.document.write(this.js_code);
                iframe.document.write("<\/script>");
            },
            onLoadIframe(event) {
                // iframe ready, set flag?
            },
            compile() {
                // axios.post('//localhost:5000/compile', {
                axios.post('//cheerp.cppse.nl/api/compile', {
                    flags: '',
                    source: this.cpp_code
                })
                    .then(function (response) {
                        // response.data.retcode
                        // response.data.stdout
                        // response.data.stderr
                        this.js_code = response.data.javascript;
                    }.bind(this))
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            run() {
                console.log('running..');
                this.update_iframe('myIframe');
            },
        },
        watch: {
            html_code(new_val) {
            },
            cpp_code(new_val) {
            },
            js_code(new_val) {
            },
        }
    }
</script>

<style scoped>
  .full-width {
    width: 100%;
  }
  .center-content {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
