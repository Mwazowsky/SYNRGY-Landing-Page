import * as http from "http";
import * as fs from "fs";
import * as path from "path";

const { PORT = 8001 } = process.env;
const PUBLIC_DIRECTORY = path.join(__dirname, "../public/");

function listHtmlFiles(directoryPath: string): Record<string, string> {
    const htmlFiles: Record<string, string> = {};

    const files = fs.readdirSync(directoryPath);
    files.forEach((file) => {
        const filePath = path.join(directoryPath, file);
        if (fs.statSync(filePath).isFile() && path.extname(filePath) === '.html') {
            let key = `/${path.basename(file, '.html')}`;

            if (key === '/index') {
                key = '/';
            }

            htmlFiles[key] = file;
        }
    });

    return htmlFiles;
}

function serveStaticFile(res: http.ServerResponse, filePath: string): void {
    const contentType = getContentType(filePath);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end("Error 404: Page Not Found");
        } else {
            res.writeHead(200, { "Content-Type": contentType });
            res.end(data);
        }
    });
}

function getContentType(filePath: string): string {
    const extname = path.extname(filePath);
    switch (extname) {
        case ".html":
            return "text/html";
        case ".css":
            return "text/css";
        case ".js":
            return "text/javascript";
        case ".jpg":
            return "image/jpeg";
        default:
            return "application/octet-stream";
    }
}

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
    const pathUrl = req.url;

    if (pathUrl) {
        const htmlFilesJson = listHtmlFiles(PUBLIC_DIRECTORY);

        if (pathUrl in htmlFilesJson) {
            serveStaticFile(res, path.join(PUBLIC_DIRECTORY, htmlFilesJson[pathUrl] || ""));
        } else {
            const filePath = path.join(PUBLIC_DIRECTORY, pathUrl);
            serveStaticFile(res, filePath);
        }
    } else {
        res.writeHead(404);
        res.end("Error 404: Page Not Found");
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
