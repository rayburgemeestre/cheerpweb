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
            <a target="_blank" href="https://github.com/rayburgemeestre/cheerpweb" class="button github">
                <span class="icon">
                  <svg class="svg-inline--fa fa-github fa-w-16" aria-hidden="true" data-prefix="fab" data-icon="github" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" data-fa-i2svg=""><path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg><!-- <i class="fab fa-github"></i> -->
                </span>
                <span>View on GitHub</span>
            </a>
              <a href="https://paypal.me/cppse?locale.x=en_US" target="_blank"><img class="donate" src="donate.png"></a>
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
              <editor-component v-if="js_tabs == 2 && wasm_code" v-model="wasm_code" name="wasm" language="javascript" height="50vh"/>
            </div>
            <div class="row">
              <div class="tabs">
                <ul>
                  <li v-bind:class="{'is-active': output_tabs == 1}" v-on:click="output_tabs = 1"><a>Compiler output</a></li>
                  <li v-bind:class="{'is-active': output_tabs == 2}" v-on:click="output_tabs = 2"><a>Run output</a></li>
                  <li v-bind:class="{'is-active': output_tabs == 3}" v-on:click="output_tabs = 3"><a>Resulting HTML</a></li>
                </ul>
              </div>
              <textarea v-if="output_tabs == 1" class="textarea" placeholder="Compiler output will be displayed here.">{{ compiler_output }}</textarea>
              <iframe v-if="output_tabs == 2" src="about:blank" v-on:load="onLoadIframe" name="myIframe"></iframe>
              <textarea v-if="output_tabs == 3" class="textarea" placeholder="Resulting HTML will be displayed here">{{ generated_html }}</textarea>
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

    var context = require.context("./examples", true, /\.js$/);
    var examples = [];
    var dom_example_index = -1;
    context.keys().forEach(function (key) {
        if (key.indexOf('dom.js') != -1) {
            dom_example_index = examples.length;
            console.log("FOUND: " + dom_example_index);
        }
        examples.push(context(key)['example'])
    });

    let cpp_code = examples[dom_example_index].cpp_code,
        js_code = examples[dom_example_index].js_code,
        wasm_code = examples[dom_example_index].wasm_code,
        html_code = examples[dom_example_index].html_code,
        compiler_flags = examples[dom_example_index].flags;

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
            generated_html: {
                type: String,
                default: ''
            },
            do_update_iframe: {
                type: Boolean,
                default: false
            },
            examples: {
                type: Array,
                default: function () {
                    return examples
                }
            },
            share_link: {
                type: String,
                default: '',
            },
            hash_set: {
                type: Boolean,
                default: false,
            },

        },
        components: {
            EditorComponent
        },
        methods: {
            update_iframe(name) {
                if (false) {
                    const iframe = findIframeByName(name);
                    iframe.document.body.innerHTML = ''
                    var head = this.html_code.indexOf("<head>");
                    if (head != -1) {
                        iframe.document.write(this.html_code.substr(0, head + 6 /* len(<head>) */));
                    }
                    else {
                        iframe.document.write(this.html_code);
                    }

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

                    if (head != -1) {
                        iframe.document.write(this.html_code.substr(head + 6 /* len(<head>) */ + 1));
                    }
                } else {
                    // new experimental rendering
                    //const iframe = findIframeByName(name);
                    const iframe = document.getElementsByTagName('iframe')[0];
                    //iframe.document.body.innerHTML = ''
                    var marker = '<!-- MARKER: Include javascript here. -->';
                    var m = this.html_code.indexOf(marker);
                    var s = "";
                    if (m != -1) {
                        s += this.html_code.substr(0, m);
                    } else {
                        var head = this.html_code.indexOf("<head>");
                        if (head != -1) {
                            s += this.html_code.substr(0, head + 6 /* len(<head>) */);
                        }
                        else {
                            s += this.html_code;
                        }
                    }

                    s += "<script>";
                    if (this.compiler_flags.indexOf('-cheerp-mode=wasm') != -1) {
                        // wasm
                        s += "function fetchBuffer(path) {\n";
                        s += "    return new Promise( (resolve, reject) => {\n";
                        s += "        var wasm = '" + this.wasm_code.trim() + "';\n";
                        s += "        wasm = atob(wasm)\n";
                        s += "\n";
                        s += "        var len = wasm.length;\n";
                        s += "        var bytes = new Uint8Array(len);\n";
                        s += "        for (var i = 0; i < len; i++) {\n";
                        s += "            bytes[i] = wasm.charCodeAt(i);\n";
                        s += "        }\n";
                        s += "        resolve(bytes.buffer);\n";
                        s += "    });\n";
                        s += "}\n";
                    }
                    s += this.js_code;
                    s += "<\/script>";

                    if (m != -1) {
                        s += this.html_code.substr(m + marker.length);
                    } else if (head != -1) {
                        s += this.html_code.substr(head + 6 /* len(<head>) */ + 1);
                    }

                    iframe.srcdoc = s;
                    this.generated_html = s;
                }
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
                    html: this.html_code,
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
                        this.hash_set = true
                        window.location.hash = '#' + this.uuid + ":" + this.version

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

                this.uuid = ''
                this.version = ''
                this.share_link = ''
                window.location.hash = ''
                return true;
            },
            select_link(event) {
                setTimeout(function() {
                    this.select();
                }.bind(event.target), 10);
            },
        },
        watch: {
            html_code(new_val) {},
            cpp_code(new_val) {},
            js_code(new_val) {},
        },
        created: function() {
            var hashchange_fun = function() {
                if (this.hash_set) {
                    this.hash_set = false;
                    return;
                }
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
                            var html = response.data.html;
                            var flags = response.data.flags;

                            this.cpp_code = code;
                            this.html_code = html;
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
