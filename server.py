import http.server
import socketserver
import os

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Serve index.html if the root URL is requested
        if self.path == '/' or self.path == '':
            self.path = 'index.html'
        super().do_GET()

    def end_headers(self):
        # Add required headers for cross-origin isolation
        self.send_header('Cross-Origin-Embedder-Policy', 'require-corp')
        self.send_header('Cross-Origin-Opener-Policy', 'same-origin')
        super().end_headers()

if __name__ == "__main__":
    PORT = 8000
    DIRECTORY = os.getcwd()  # Serve files from the current directory

    os.chdir(DIRECTORY)  # Change working directory to serve files correctly

    with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
        print(f"Serving HTTP on 0.0.0.0 port {PORT} (http://localhost:{PORT}/) ...")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")
            httpd.server_close()
