import http.server
import socketserver
import os
import json
import time

PORT = 5000
HOST = "0.0.0.0"
WATCH_EXTENSIONS = {".html", ".css", ".js"}

LIVERELOAD_SCRIPT = b"""
<script>
(function() {
  var lastHash = null;
  function check() {
    fetch('/__livereload__')
      .then(function(r) { return r.json(); })
      .then(function(data) {
        if (lastHash === null) { lastHash = data.hash; return; }
        if (data.hash !== lastHash) { location.reload(); }
      })
      .catch(function() {});
  }
  setInterval(check, 1000);
})();
</script>
</body>"""


def get_file_hash():
    total = 0
    for root, dirs, files in os.walk("."):
        dirs[:] = [d for d in dirs if not d.startswith(".")]
        for f in files:
            ext = os.path.splitext(f)[1].lower()
            if ext in WATCH_EXTENSIONS:
                path = os.path.join(root, f)
                try:
                    total += int(os.path.getmtime(path) * 1000)
                except OSError:
                    pass
    return str(total)


class LiveReloadHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        super().end_headers()

    def do_GET(self):
        if self.path == "/__livereload__":
            body = json.dumps({"hash": get_file_hash()}).encode()
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return

        # Inject livereload script into HTML responses
        if self.path.endswith(".html") or self.path == "/" or "." not in self.path.split("/")[-1]:
            path = self.translate_path(self.path)
            if os.path.isdir(path):
                path = os.path.join(path, "index.html")
            if os.path.isfile(path) and path.endswith(".html"):
                try:
                    with open(path, "rb") as f:
                        content = f.read()
                    content = content.replace(b"</body>", LIVERELOAD_SCRIPT)
                    self.send_response(200)
                    self.send_header("Content-Type", "text/html; charset=utf-8")
                    self.send_header("Content-Length", str(len(content)))
                    self.end_headers()
                    self.wfile.write(content)
                    return
                except Exception:
                    pass

        super().do_GET()

    def log_message(self, fmt, *args):
        print(fmt % args)


with socketserver.TCPServer((HOST, PORT), LiveReloadHandler) as httpd:
    httpd.allow_reuse_address = True
    print(f"Serving with live-reload on http://{HOST}:{PORT}")
    httpd.serve_forever()
