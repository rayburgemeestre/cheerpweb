const cpp_code = `
#include <cmath>
#include <cheerp/client.h>
#include <cheerp/clientlib.h>

class [[cheerp::jsexport]] JsBridge
{
public:
    JsBridge() = default;
    size_t test()
    {
        volatile size_t counter = 0;
        for (int i = 0; i < 50000; ++i) {
            for (int j = 0; j < 50000; ++j) {
                counter++;
          }
        }
        return sqrt(counter);
    }
};
void webMain() {}
`.trim();

const html_code = `
<html>
  <head>
    <script>
      function test() {
        var counter = 0
        for (var i = 0; i < 50000; ++i) {
          for (var j = 0; j < 50000; ++j) {
            counter++;
          }
        }
        return Math.sqrt(counter);
      }
      function benchmark() {
        var jsBridge = new JsBridge();
        {
          document.write("Running native JS..<br>");
          var start = new Date().getTime();
          var ret = test();
          var time = new Date().getTime() - start;
          document.write("Result: " + ret + "<br>");
          document.write("Execution time: " + (time / 1000.0) + " secs<br>");
        }
        document.write("<br>");
        {
          document.write("Running compiled JS..<br>");
          var start = new Date().getTime();
          var ret = jsBridge.test();
          var time = new Date().getTime() - start;
          document.write("Result: " + ret + "<br>");
          document.write("Execution time: " + (time / 1000.0) + " secs<br>");
        }
      }
    </script>
  </head>
  <body>
    Benchmark started... <br/><br/>
    <script>
    benchmark();
    </script>
    <br/>
    Benchmark finished... <br/>
  </body>
</html>`.trim();

const js_code = ``.trim();

const flags = `
-cheerp-pretty-code
-cheerp-no-type-optimizer
-cheerp-no-native-math
-cheerp-no-math-imul
-cheerp-no-math-fround
-O3
-target cheerp`.trim()

const wasm_code = '';

export const example = {
    title: 'JS vs Compiled JS perf',
    cpp_code: cpp_code,
    js_code: js_code,
    wasm_code: wasm_code,
    html_code: html_code,
    flags: flags
}

