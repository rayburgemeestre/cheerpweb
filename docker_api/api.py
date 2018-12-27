import binascii
import os
import exec_helpers
import re
import uuid
import json

from flask import request, url_for
from flask_api import FlaskAPI, status, exceptions
from flask_cors import CORS

app = FlaskAPI(__name__)
CORS(app)


@app.route("/compile", methods=['POST'])
def compile():
    if request.method == 'POST':
        note = str(request.data.get('source', ''))
        html = str(request.data.get('html', ''))
        flags = str(request.data.get('flags', ''))
        uuid_ = str(request.data.get('uuid', ''))

        if not uuid_:
            uuid_ = str(uuid.uuid1())


        counter = 0
        if os.path.exists("/data/{}/counter".format(uuid_)):
            with open("/data/{}/counter".format(uuid_), "r") as f:
                counter = int(f.read().strip()) + 1
                f.close()
        else:
            os.mkdir("/data/{}".format(uuid_))

        os.mkdir("/data/{}/{}".format(uuid_, counter))
        with open("/data/{}/{}/environ".format(uuid_, counter), "w") as f:
            for env in os.environ:
                f.write("{}={}\n".format(env, os.environ[env]))
            f.close()
        with open("/data/{}/{}/headers".format(uuid_, counter), "w") as f:
            for k, v in request.headers:
                f.write("{}: {}\n".format(k, v))
            f.close()
        with open("/data/{}/{}/source".format(uuid_, counter), "w") as f:
            f.write(note)
            f.close()
        with open("/data/{}/{}/html".format(uuid_, counter), "w") as f:
            f.write(html)
            f.close()
        with open("/data/{}/{}/flags".format(uuid_, counter), "w") as f:
            f.write(flags)
            f.close()
        with open("/data/{}/counter".format(uuid_), "w") as f:
            f.write(str(counter))
            f.close()

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
                   'wasm': binascii.b2a_base64(output_wasm).decode("utf-8") if wasm else "",
                   'uuid': uuid_,
                   'version': counter,
               }, status.HTTP_201_CREATED


@app.route("/retrieve", methods=['POST'])
def retrieve():
    if request.method == 'POST':
        uuid_ = str(request.data.get('uuid', ''))
        version = str(request.data.get('version', ''))
        source = ''
        html = ''
        flags = ''

        if not os.path.exists("/data/{}/{}".format(uuid_, version)):
            return False

        with open("/data/{}/{}/source".format(uuid_, version), "r") as f:
            source = f.read()
            f.close()
        with open("/data/{}/{}/html".format(uuid_, version), "r") as f:
            html = f.read()
            f.close()
        with open("/data/{}/{}/flags".format(uuid_, version), "r") as f:
            flags = f.read()
            f.close()

        return {
                   'source': source,
                   'html': html,
                   'flags': flags,
               }, status.HTTP_201_CREATED


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)

