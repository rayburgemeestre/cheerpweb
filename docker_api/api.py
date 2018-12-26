import binascii
import os
import exec_helpers
import re

from flask import request, url_for
from flask_api import FlaskAPI, status, exceptions
from flask_cors import CORS

app = FlaskAPI(__name__)
CORS(app)


@app.route("/compile", methods=['POST'])
def compile():
    if request.method == 'POST':
        note = str(request.data.get('source', ''))
        flags = str(request.data.get('flags', ''))

        with open("/tmp/test.cpp", "w") as f:
            f.write(note)
            f.close()

        stdout = ''
        stderr = ''
        retcode = 0
        output = ''
        output_wasm = ''

        flags = flags.replace("\n", " ")
        wasm = 'cheerp-mode=wasm' in flags

        # Simple way to disable malicious flags (hopefully)
        if not re.match('^[\s\ta-zA-Z0-9=\-_\.]*$', flags):
            flags = ""

        cmd = "/opt/cheerp/bin/clang {} /tmp/test.cpp -o /tmp/test.js".format(flags)
        if wasm:
            cmd = "/opt/cheerp/bin/clang {} /tmp/test.cpp -cheerp-wasm-loader=/tmp/test.js -o /tmp/test.wasm".format(flags)

        with exec_helpers.Subprocess() as executor:
            try:
                ret = executor.check_call(cmd, shell=True, timeout=10)
                if ret:
                    retcode = ret.exit_code
                    output = ret.stdout_str
            except exec_helpers.ExecHelperTimeoutError as e:
                #stdout = e.stdout
                #stderr = e.stderr
                stderr = str(e)
            except exec_helpers.CalledProcessError as e:
                stdout = e.stdout
                stderr = e.stderr

        if os.path.exists("/tmp/test.js"):
            with open("/tmp/test.js", "r") as f:
                output = f.read()
                f.close()

        if wasm and os.path.exists("/tmp/test.wasm"):
            with open("/tmp/test.wasm", "rb") as f:
                output_wasm = f.read()
                f.close()

        return {
                   'stdout': stdout,
                   'stderr': stderr,
                   'command': cmd,
                   'retcode': retcode,
                   'javascript': output,
                   'wasm': binascii.b2a_base64(output_wasm).decode("utf-8") if wasm else ""
               }, status.HTTP_201_CREATED

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)

