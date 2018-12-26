<template>
  <div class="columns is-fullheight">
    <div class="column">
      <nav class="navbar is-black" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href="https://cheerp.cppse.nl">
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
            <!--
            <a class="navbar-item">Home</a>
            <a class="navbar-item">Documentation</a>
            -->
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">
                Load example
              </a>
              <div class="navbar-dropdown">
                <div v-for="item in examples">
                  <a class="navbar-item" v-on:click="load_example(item)">{{ item.title }}</a>
                </div>
              </div>
            </div>
          </div>

          <div class="navbar-end">
            <div class="share">
              <input class="input" type="text" v-on:focus="select_link($event)" v-model="share_link" placeholder="Compile before sharing link!">
            </div>
            <div class="navbar-item">
              <div class="buttons">
                <a class="button is-primary" v-on:click="compile" v-shortkey.once="['ctrl', 'f9']" @shortkey="compile()">
                  <strong>Compile [CTRL+F9]</strong>
                </a>
                <a class="button is-light" v-on:click="run" v-shortkey.once="['ctrl', 'f10']" @shortkey="run()">
                  Run [CTRL+F10]
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
                  <li v-bind:class="{'is-active': editor_tabs == 1}" v-on:click="editor_tabs = 1"><a>Code editor</a></li>
                  <li v-bind:class="{'is-active': editor_tabs == 2}" v-on:click="editor_tabs = 2"><a>Compiler</a></li>
                </ul>
              </div>

              <editor-component v-if="editor_tabs == 1" v-model="cpp_code" name="cpp" language="cpp" height="50vh"/>

              <div v-if="editor_tabs == 2" class="settings">
              <textarea class="textarea" v-model="compiler_flags"></textarea>
              </div>

            </div>
            <div class="row">

              <div class="tabs">
                <ul>
                  <li class="is-active"><a>HTML</a></li>
                </ul>
              </div>
              <editor-component v-model="html_code" name="html" language="html" height="50vh"/>
            </div>
          </div>

        </div>
        <div class="column">
          <div class="rows">
            <div class="row">
              <div class="tabs">
                <ul>
                  <li v-bind:class="{'is-active': js_tabs == 1}" v-on:click="js_tabs = 1"><a>Javascript</a></li>
                  <li v-bind:class="{'is-active': js_tabs == 2}" v-on:click="js_tabs = 2" v-if="wasm_code"><a>Webassembly</a></li>
                </ul>
              </div>
              <editor-component v-if="js_tabs == 1" v-model="js_code" name="js" language="javascript" height="50vh"/>
              <editor-component v-if="js_tabs == 2 && wasm_code" v-model="wasm_code" name="wasm" language="javascript" height="80vh"/>
            </div>
            <div class="row">
              <div class="tabs">
                <ul>
                  <li v-bind:class="{'is-active': output_tabs == 1}" v-on:click="output_tabs = 1"><a>Compiler output</a></li>
                  <li v-bind:class="{'is-active': output_tabs == 2}" v-on:click="output_tabs = 2"><a>Run output</a></li>
                </ul>
              </div>
              <textarea v-if="output_tabs == 1" class="textarea" placeholder="Compiler output will be displayed here.">{{ compiler_output }}</textarea>
              <iframe v-if="output_tabs == 2" src="about:blank" v-on:load="onLoadIframe" name="myIframe"></iframe>
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

    import { dom_example } from './dom_example'
    import { pong_example } from './pong_example'

    let cpp_code = dom_example.cpp
    let js_code = dom_example.js
    let wasm_code = dom_example.wasm
    let html_code = dom_example.html
    let compiler_flags = dom_example.flags

    function findIframeByName(name) {
        return _.find(window.frames, frame => frame.name === name);
    }

    export default {
        props: {
            uuid: {
                type: String,
                default: '',
            },
            version: {
                type: String,
                default: '',
            },
            editor_tabs: {
                type: Number,
                default: 1,
            },
            output_tabs: {
                type: Number,
                default: 1,
            },
            js_tabs: {
                type: Number,
                default: 1,
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
            },
            wasm_code: {
                type: String,
            },
            compiler_output: {
                type: String,
            },
            compiler_flags: {
                type: String,
                default: compiler_flags
            },

            do_update_iframe: {
                type: Boolean,
                default: false
            },
            examples: {
                type: Array,
                default: function () {
                    return [
                        { title: 'DOM example', cpp_code: dom_example.cpp, 'js_code': dom_example.js, 'wasm_code': dom_example.wasm, 'html_code': dom_example.html, flags: dom_example.flags },
                        { title: 'Pong WASM example', cpp_code: pong_example.cpp, 'js_code': pong_example.js, 'wasm_code': pong_example.wasm, 'html_code': pong_example.html, flags: pong_example.flags },
                    ]
                }
            },
            share_link: {
                type: String,
                default: '',
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

                // wasm
                iframe.document.write("function fetchBuffer(path) {\n");
                iframe.document.write("    return new Promise( (resolve, reject) => {\n");
                iframe.document.write("        var wasm = '" + this.wasm_code.trim() + "';\n");
                iframe.document.write("        wasm = atob(wasm)\n");
                iframe.document.write("\n");
                iframe.document.write("        var len = wasm.length;\n");
                iframe.document.write("        var bytes = new Uint8Array(len);\n");
                iframe.document.write("        for (var i = 0; i < len; i++) {\n");
                iframe.document.write("            bytes[i] = wasm.charCodeAt(i);\n");
                iframe.document.write("        }\n");
                iframe.document.write("        resolve(bytes.buffer);\n");
                iframe.document.write("    });\n");
                iframe.document.write("}\n");

                iframe.document.write(this.js_code);
                iframe.document.write("<\/script>");
            },
            onLoadIframe(event) {
                // iframe ready, set flag?
                console.log("loaded iframe");
                if (this.do_update_iframe) {
                    this.update_iframe('myIframe');
                    this.do_update_iframe = false;
                }
            },
            compile() {
                this.output_tabs = 1;

                var url = 'https://cheerp.cppse.nl/api/compile';
                if (window.location.href.indexOf('cheerp.cppse.nl') == -1) {
                    // assuming local dev env
                    url = '//localhost:5000/compile';
                }
                axios.post(url, {
                    flags: this.compiler_flags,
                    source: this.cpp_code,
                    uuid: this.uuid,
                })
                    .then(function (response) {
                       const str =
                            'COMMAND:   ' + response.data.command + '\n' +
                            'EXIT_CODE: ' + response.data.retcode + '\n' +
                            'STDOUT:\n------------------------------\n' +
                            response.data.stdout +
                            'STDERR:\n------------------------------\n' +
                            response.data.stderr;
                        this.compiler_output = str;
                        var js = response.data.javascript;

                        var idx = js.indexOf('function fetchBuffer'), jdx = -1;
                        if (idx != -1) {
                            var level = 0;
                            for (var i=idx; ; i++) {
                                if (js[i] == '{') {
                                    level++;
                                }
                                else if (js[i] == '}') {
                                    level--;
                                    if (!level) {
                                        jdx = i;
                                        break;
                                    }
                                }
                            }
                        }
                        this.js_code = js.substr(0, idx) + js.substr(jdx + 1);
                        this.wasm_code = response.data.wasm;
                        this.uuid = response.data.uuid
                        this.version = response.data.version
                        this.share_link = 'https://cheerp.cppse.nl/#' + this.uuid + ":" + this.version
                        console.log(this.uuid)
                        console.log(this.version)
                    }.bind(this))
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            run() {
                this.do_update_iframe = true;
                this.output_tabs = 2;
                try {
                    this.update_iframe('myIframe');
                }
                catch (e) {}
            },
            load_example(ex) {
                this.cpp_code = ex.cpp_code
                this.js_code = ex.js_code
                this.wasm_code = ex.wasm_code
                this.html_code = ex.html_code
                this.compiler_flags = ex.flags
                return true;
            },
            select_link(event) {
                setTimeout(function() {
                    this.select();
                }.bind(event.target), 10);
            },
        },
        watch: {
            html_code(new_val) {
            },
            cpp_code(new_val) {
            },
            js_code(new_val) {
            },
        },
        created: function() {
            var hashchange_fun = function() {
                if (window.location.hash.length > 3) {
                    var h = window.location.hash.substr(1).split(':')
                    if (h.length == 2) {
                        var load_hash = h[0];
                        var load_version = h[1];

                        console.log("Should load: ",load_hash," ", load_version);
                        var url = 'https://cheerp.cppse.nl/api/retrieve';
                        if (window.location.href.indexOf('cheerp.cppse.nl') == -1) {
                            // assuming local dev env
                            url = '//localhost:5000/retrieve';
                        }
                        // Keeping this POST on purpose, just to keep things HARD for crawlers
                        axios.post(url, {
                            uuid: load_hash,
                            version: load_version,
                        })
                        .then(function (response) {
                            var js = response.data.source;
                            if (js == '') {
                                const str =
                                    'Loading hash: '+ load_hash + '\n' +
                                    'With version: '+ load_version + '\n' +
                                    'FAILED.'
                                this.compiler_output = str;
                                return false;
                            }
                            const str =
                                'Loading hash: '+ load_hash + '\n' +
                                'With version: '+ load_version + '\n' +
                                'SUCCEEDED.'
                            this.compiler_output = str;

                            var code = response.data.source;
                            var flags = response.data.flags;

                            this.cpp_code = code;
                            this.compiler_flags = flags;

                            this.uuid = load_hash
                            this.version = load_version

                            this.share_link = 'https://cheerp.cppse.nl/#' + this.uuid + ":" + this.version
                        }.bind(this))
                        .catch(function (error) {
                            const str =
                                'Loading hash: '+ load_hash + '\n' +
                                'With version: '+ load_version + '\n' +
                                'FAILED: ' + error
                            this.compiler_output = str;
                        });
                    }
                }
            }.bind(this);
            window.onhashchange = hashchange_fun;
            hashchange_fun();
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
  .settings {
    height: calc(50vh - 6rem);
  }
</style>
