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
        // get a plain c pointer
        double* ptr = &(*ar)[0];
        size_t len = ar->get_length(); 
        
        // sort them
        std::sort(ptr, ptr + len, std::less<double>()) ;
    }
};
void webMain() {
}
`.trim();

const html_code = `
<html>
  <head>
    <script>
      let some_array = [], some_array2 = [];
      for (var i = 0; i < 100000; ++i) {
        var num = Math.random();
        some_array.push(num);
        some_array2.push(num);
      }

      // "C++"
      var jsBridge = new JsBridge(); // The compiled from C++ class
      jsBridge.sort(some_array2)
      document.write("C++: ",some_array2.slice(0, 5),"<BR>");

      // The normal way to sort numerically (not alphabetically, which is default)
      some_array.sort((a, b) => a - b) // Default Array.sort method
      document.write("Javascript: ",some_array.slice(0, 5), "<BR>");
    </script>
  </head>
</html>
`.trim();

const js_code = ``.trim();

const flags = `
-cheerp-pretty-code
-O3
-target cheerp`.trim()

const wasm_code = '';

export const example = {
    title: 'Sorting array of numbers',
    cpp_code: cpp_code,
    js_code: js_code,
    wasm_code: wasm_code,
    html_code: html_code,
    flags: flags
}
