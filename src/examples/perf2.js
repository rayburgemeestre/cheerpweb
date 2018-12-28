const cpp_code = `
#include <vector>
#include <algorithm>
#include <cheerp/client.h>
#include <cheerp/clientlib.h>

class [[cheerp::jsexport]] JsBridge
{
public:
    JsBridge() = default;
	
	void sort(client::Float64Array* ar)
	{
        // copy all the numbers
		std::vector<double> test;
		test.reserve(ar->get_length());

	    for(size_t i=0;i<ar->get_length();i++) {
            test.push_back((*ar)[i]);
		}

        // sort them
	    std::sort(std::begin(test), std::end(test), std::less<double>()) ;

        // copy them back
	    for(size_t i=0;i<ar->get_length();i++) {
            (*ar)[i] = test[i];
		}
	}
};
void webMain() {
}
`.trim();

const html_code = `
<html>
  <head>
    <script>
      function benchmark(func) {
        var start = new Date().getTime();
        func();
        var time = new Date().getTime() - start;
        return time;
      }

      // Please note that running this might take a while! (but I expect < 30s on an average PC)
      for (var n = 10; n <= 10000000; n *= 10) {
        document.write("<strong>Test for N=",n,"</strong><BR>");
              
        var some_array = [], some_array2 = []; 
        var time = benchmark(function () {
          for (var i = 0; i < n; ++i) {
            var num = Math.random();
            some_array.push(num);
            some_array2.push(num);
          }
        });
        document.write("Initialized arrays: ",some_array.slice(0, 1), ", took: ",(time/1000.0)," secs<BR>");

        // "C++"
        var jsBridge = new JsBridge();
        time = benchmark(_ => 
          jsBridge.sort(some_array2)
        );
        document.write("C++: ",some_array2.slice(0, 1), ", took: ",(time/1000.0)," secs<BR>");
        
        // JS
        time = benchmark(_ =>
          some_array.sort((a, b) => a - b) // lambda required for sorting numerically instead of alphabetically
        );
        document.write("JS: ",some_array.slice(0, 1), ", took: ",(time/1000.0)," secs<BR><BR>");
      }
    </script>
  </head>
  <body>
  </body>
</html>
`.trim();

const js_code = ``.trim();

const flags = `
-cheerp-pretty-code
-O3
-target cheerp`.trim()

const wasm_code = '';

export const example = {
    title: 'JS vs Compiled JS perf (sorting)',
    cpp_code: cpp_code,
    js_code: js_code,
    wasm_code: wasm_code,
    html_code: html_code,
    flags: flags
}
