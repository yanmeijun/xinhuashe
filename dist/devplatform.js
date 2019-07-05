"use strict";
exports.__esModule = true;
var fs = require("fs");
var os = require("os");
var dns = require("dns");
var net = require("net");
var url = require("url");
var path = require("path");
var crypto = require("crypto");
var process = require("process");
var portfinder = require("portfinder");
var events_1 = require("events");
var electron_1 = require("electron");
var DevPlatformStartup = (function () {
    function DevPlatformStartup() {
        this.stateInstalled = 0;
        this.isDarkTheme = false;
        this.dataCertificates = {};
        this.dataHTTPInformation = {};
    }
    DevPlatformStartup.prototype.main = function (args) {
        var _this = this;
        var debug = /--debug/i.test(args[2] || '');
        var homedir = path.join(os.homedir(), '.' + DevPlatformStartup.appName);
        var licenseFile = path.join(homedir, 'LICENSE.md');
        var licenseData = this.sha1License(DevPlatformStartup.appVersion);
        if (!fs.existsSync(homedir)) {
            fs.mkdirSync(homedir);
        }
        if (!fs.existsSync(licenseFile)) {
            this.stateInstalled = 1;
        }
        else if (this.readFile(licenseFile) !== licenseData) {
            this.stateInstalled = -1;
        }
        if (this.stateInstalled === 1 || this.stateInstalled === -1) {
            this.writeFile(licenseFile, licenseData);
        }
        portfinder.getPort(function (err, proxyPort) {
            if (err) {
                return electron_1.dialog.showErrorBox('ApplicationError', "The application can't start properly(0x000007b). Please click OK to close the application.");
            }
            if (debug && /--runtime/i.test(args[3] || '')) {
                return _this.createProxyService(proxyPort, debug);
            }
            if (!debug || (debug && /--service/i.test(args[3] || ''))) {
                _this.createProxyService(proxyPort, debug);
            }
            electron_1.app.disableHardwareAcceleration();
            electron_1.app.releaseSingleInstanceLock();
            electron_1.app.commandLine.appendSwitch('ignore-certificate-errors');
            electron_1.app.commandLine.appendSwitch('--disable-http-cache');
            electron_1.app.once('ready', function () { return _this.createWindow({ debug: debug, proxyPort: proxyPort }); });
            electron_1.app.once('activate', function () {
                if (!_this.mainWindow) {
                    _this.createWindow({ debug: debug, proxyPort: proxyPort });
                }
            });
            electron_1.app.once('second-instance', function () {
                if (_this.mainWindow) {
                    if (_this.mainWindow.isMaximized()) {
                        _this.mainWindow.restore();
                    }
                    _this.mainWindow.focus();
                }
            });
            electron_1.app.once('window-all-closed', function () {
                if (process.platform !== 'darwin') {
                    electron_1.app.quit();
                }
            });
        });
        process.on('uncaughtException', function (err) {
            if (debug) {
                console.log(Date.now(), 'Main Process UncaughtException: ', err);
            }
        });
    };
    DevPlatformStartup.prototype.createWindow = function (configures) {
        var _this = this;
        var windowOptions = {
            width: 1280,
            height: 800,
            title: DevPlatformStartup.appName,
            titleBarStyle: undefined,
            titlebarAppearsTransparent: false,
            backgroundColor: '#FF2C3C51',
            transparent: true,
            darkTheme: false,
            frame: false,
            show: false,
            icon: '',
            webPreferences: {
                defaultEncoding: 'UTF-8',
                defaultFontSize: 16,
                defaultMonospaceFontSize: 16,
                defaultFontFamily: {
                    standard: 'Ubuntu',
                    serif: 'Ubuntu',
                    sansSerif: 'Ubuntu',
                    monospace: 'Ubuntu Mono'
                },
                devTools: Boolean(configures.debug),
                nodeIntegration: true,
                nodeIntegrationInWorker: true,
                webviewTag: true
            }
        };
        switch (process.platform) {
            case 'darwin':
                windowOptions.frame = true;
                windowOptions.titleBarStyle = 'hidden';
                windowOptions.titlebarAppearsTransparent = true;
                electron_1.systemPreferences.subscribeLocalNotification('AppleInterfaceThemeChangedNotification', function () {
                    _this.isDarkTheme = electron_1.systemPreferences.isDarkMode();
                });
                break;
            case 'linux':
                windowOptions.frame = true;
                windowOptions.icon = path.join(__dirname, '/img/512.png');
                break;
            default:
        }
        this.mainWindow = new electron_1.BrowserWindow(windowOptions);
        this.mainWindow.setMenuBarVisibility(false);
        this.mainWindow.webContents.on('paint', function (event, dirty, image) { });
        this.mainWindow.webContents.setFrameRate(30);
        var proxyPort = "socks5://::1:" + (configures.proxyPort || 8001);
        if (configures.debug) {
            console.info(DevPlatformStartup.appName + " proxy on " + proxyPort);
        }
        this.mainWindow.webContents.session.setProxy({
            proxyRules: proxyPort,
            proxyBypassRules: '<local>;',
            pacScript: undefined
        }, function () { });
        this.mainWindow.webContents.session.setCertificateVerifyProc(function (request, callback) {
            var certificate = request.certificate;
            if (!_this.dataCertificates[certificate.subject.commonName]) {
                _this.dataCertificates[certificate.subject.commonName] = certificate;
            }
            callback(-3);
        });
        this.mainWindow.once('ready-to-show', function () { return _this.mainWindow.show(); });
        this.mainWindow.once('closed', function () {
            _this.mainWindow = undefined;
        });
        if (configures.debug) {
            this.mainWindow.loadURL('http://127.0.0.1:8000/#{"id": 1}');
            this.mainWindow.webContents.openDevTools();
            this.mainWindow.maximize();
        }
        else {
            this.mainWindow.loadURL(url.format({
                protocol: 'file',
                slashes: true,
                pathname: path.join(__dirname, 'assets', 'index.html')
            }));
        }
    };
    DevPlatformStartup.prototype.createProxyService = function (proxyPort, debug, self) {
        if (self === void 0) { self = this; }
        return self.socksv5Server({
            debug: debug,
            port: proxyPort,
            onRequest: function (id, chunk, data) {
                var isHttps = false;
                if ([0x44, 0x47, 0x4f, 0x50].indexOf(chunk[0]) === -1) {
                    return;
                }
                var req = parseHTTPStream(chunk, false);
                if (String(req.Method).toUpperCase() !== 'GET' ||
                    [
                        '.JS',
                        '.JSX',
                        '.CSS',
                        '.ICO',
                        '.BMP',
                        '.JPG',
                        '.PNG',
                        '.TIF',
                        '.GIF',
                        '.PCX',
                        '.TGA',
                        '.EXIF',
                        '.FPX',
                        '.SVG',
                        '.PSD',
                        '.CDR',
                        '.PCD',
                        '.DXF',
                        '.UFO',
                        '.EPS',
                        '.AI',
                        '.RAW',
                        '.WMF',
                        '.WEBP',
                        '.AVI',
                        '.MPEG',
                        '.RM',
                        '.RMVB',
                        '.WMV',
                        '.VCD',
                        '.SVCD',
                        '.DAT',
                        '.VOB',
                        '.MOV',
                        '.MP4',
                        '.MKV',
                        '.ASF',
                        '.FLV',
                        '.WAV',
                        '.RA',
                        '.MIDI',
                        '.RM',
                        '.MP3',
                        '.OGG',
                        '.APE',
                        '.FLAC',
                        '.AAC',
                        '.VQF',
                        '.MOD',
                        '.AIFF',
                        '.AU',
                        '.VOC',
                        '.DOC',
                        '.DOCX',
                        '.ISO',
                        '.RAR',
                        '.ZIP',
                        '.EXE',
                        '.PDF',
                        '.XLS',
                        '.XLSX',
                    ].indexOf(path.extname(String(req.URI)).toUpperCase()) === -1) {
                    self.dataHTTPInformation[id] = {
                        tabId: req.UCAP,
                        Id: id,
                        Host: data.dstAddr,
                        Port: data.dstPort,
                        Method: req.Method,
                        URI: req.URI,
                        Protocol: req.Protocol,
                        Https: isHttps,
                        Request: req,
                        Response: undefined,
                        Begin: Date.now()
                    };
                }
            },
            onResponse: function (id, chunk, data) {
                if (self.dataHTTPInformation[id]) {
                    if (self.dataHTTPInformation[id].Https) {
                        return;
                    }
                    var res = parseHTTPStream(chunk, true);
                    self.dataHTTPInformation[id] = Object.assign(self.dataHTTPInformation[id] || {}, {
                        Status: res.Status,
                        Mime: res.Mime,
                        Response: res,
                        Finish: Date.now(),
                        URL: [
                            self.dataHTTPInformation[id].Https ? 'https://' : 'http://',
                            self.dataHTTPInformation[id].Host,
                            (function () {
                                if (self.dataHTTPInformation[id].Https &&
                                    self.dataHTTPInformation[id].Port !== 443) {
                                    return '';
                                }
                                if (!self.dataHTTPInformation[id].Https &&
                                    self.dataHTTPInformation[id].Port !== 80) {
                                    return '';
                                }
                                return ':' + self.dataHTTPInformation[id].Port;
                            })(),
                            String(self.dataHTTPInformation[id].URI).replace(/^\s{1,}/, ''),
                        ].join('')
                    });
                    if (self.mainWindow) {
                        self.mainWindow.webContents.send('PROXY', JSON.stringify(self.dataHTTPInformation[id]));
                    }
                }
            }
        });
        function parseHTTPStream(chunk, isResponse) {
            var data = {};
            var index = 0;
            while (index < chunk.length) {
                var position = chunk.indexOf(Buffer.from([0x0d, 0x0a]), index);
                var codeline = chunk.slice(index, position);
                if (position === -1) {
                    break;
                }
                index = position + 2;
                if (codeline.length === 0 &&
                    position === chunk.indexOf(Buffer.from([0x0d, 0x0a, 0x0d, 0x0a])) + 2) {
                    data.Body = chunk.slice(position + 2, chunk.length);
                    break;
                }
                if (typeof data.Protocol === 'undefined') {
                    var i1st = codeline.indexOf(0x20);
                    var i2nd = codeline.indexOf(0x20, i1st + 1);
                    if (isResponse) {
                        data.Protocol = codeline.slice(0, i1st).toString();
                        data.Status = codeline.slice(i1st, i2nd).toString();
                        data.Message = codeline.slice(i2nd, codeline.length).toString();
                    }
                    else {
                        data.Protocol = codeline.slice(i2nd, codeline.length).toString();
                        data.Method = codeline.slice(0, i1st).toString();
                        data.URI = codeline.slice(i1st, i2nd).toString();
                    }
                    continue;
                }
                if (typeof data.Headers === 'undefined') {
                    data.Headers = new Array();
                }
                if (codeline.includes('User-Agent')) {
                    var ucap = codeline.indexOf(';UCAP=');
                    if (ucap !== -1) {
                        data.UCAP = codeline.slice(ucap + 6, codeline.length).toString();
                    }
                }
                if (codeline.includes('Content-Type')) {
                    var contentType = codeline.indexOf(0x3a);
                    if (contentType !== -1 && contentType < codeline.length) {
                        var mimeBuff = codeline.slice(contentType + 2, codeline.length);
                        var unicodes = mimeBuff.indexOf(0x3b);
                        if (unicodes !== -1) {
                            mimeBuff = mimeBuff.slice(0, unicodes);
                        }
                        var mimeMain = mimeBuff.indexOf(0x2c);
                        if (mimeMain !== -1) {
                            mimeBuff = mimeBuff.slice(0, mimeMain);
                        }
                        data.Mime = mimeBuff.toString();
                    }
                }
                if (codeline.includes('Content-Encoding')) {
                    data.GZIP = codeline.includes('gzip');
                }
                data.Headers.push(codeline.toString());
            }
            if (data.GZIP) {
            }
            return data;
        }
    };
    DevPlatformStartup.prototype.sha1License = function (appVersion) {
        return crypto
            .createHash('sha1')
            .update(DevPlatformStartup.appName + ':' + appVersion)
            .digest('hex');
    };
    DevPlatformStartup.prototype.readFile = function (filename) {
        try {
            return fs.readFileSync(filename).toString();
        }
        catch (err) { }
        return undefined;
    };
    DevPlatformStartup.prototype.writeFile = function (filename, document) {
        try {
            fs.writeFileSync(filename, document);
        }
        catch (err) {
            return err;
        }
        return undefined;
    };
    DevPlatformStartup.prototype.socksv5Server = function (configures) {
        var socksv5 = Object.assign(new events_1.EventEmitter(), {});
        socksv5.setMaxListeners(0);
        if (typeof configures.listener === 'function') {
            socksv5.on('connection', Object(configures.listener));
        }
        socksv5.connections = socksv5.connections || 0;
        socksv5.maxConnections = socksv5.maxConnections || 65535;
        socksv5.socket = new net.Server(function (link) {
            var socket = Object.assign(link, {});
            if (socksv5.connections >= socksv5.maxConnections) {
                return socket.destroy();
            }
            socksv5.connections = socksv5.connections + 1;
            socksv5.once('close', function () {
                socksv5.connections = socksv5.connections - 1;
            });
            var parser = parseSocksv5(socket);
            parser.on('error', function (err) {
                if (socket.writable) {
                    if (configures.debug) {
                        console.log(Date.now(), 'Socksv5 Parse Error', String(err));
                    }
                    socket.end();
                }
            });
            parser.on('methods', function (methods) {
                if (configures.debug) {
                    console.log(Date.now(), 'Socksv5 Action METHODS', methods);
                }
                if (methods[0] === 0x00) {
                    parser.isauthed = true;
                    parser.start();
                    socket.write(Buffer.from([0x05, 0x00]));
                    socket.resume();
                    return;
                }
                socket.end(Buffer.from([0x05, 0x00]));
            });
            parser.on('request', function (data) {
                if (configures.debug) {
                    console.log(Date.now(), 'Socksv5 Action REQUEST', data.dstAddr);
                }
                if (data.command !== 'CONNECT') {
                    return socket.end(Buffer.from([0x05, 0x07]));
                }
                data.srcAddr = String(socket.remoteAddress || '::1');
                data.srcPort = Number(socket.remotePort || 0);
                if (configures.listener) {
                    var isHandled_1 = false;
                    var accept = function (intercept) {
                        if (!isHandled_1) {
                            isHandled_1 = true;
                            if (socket.writable) {
                                if (intercept) {
                                    socket.write(Buffer.from([
                                        0x05,
                                        0x00,
                                        0x00,
                                        0x01,
                                        0x00,
                                        0x00,
                                        0x00,
                                        0x00,
                                        0x00,
                                        0x00,
                                    ]));
                                    socket.removeListener('error', function (err) { });
                                    return process.nextTick(function () { return socket.resume(); });
                                }
                                return proxySocket(socket, data);
                            }
                        }
                    };
                    var deny = function () {
                        if (!isHandled_1) {
                            isHandled_1 = true;
                            if (socket.writable) {
                                socket.end(Buffer.from([0x05, 0x02]));
                            }
                        }
                    };
                    return socksv5.emit('connection', data, accept, deny);
                }
                return proxySocket(socket, data);
            });
            var onClose = function () {
                if (socket.dstSocket && socket.dstSocket.writable) {
                    socket.dstSocket.end();
                }
                socket.dstSocket = undefined;
            };
            socket.on('error', function (err) { });
            socket.on('end', onClose);
            socket.on('close', onClose);
        });
        socksv5.socket.on('error', function (err) { return socksv5.emit('error', err); });
        socksv5.socket.on('listening', function () { return socksv5.emit('listening'); });
        socksv5.socket.on('close', function () { return socksv5.emit('close'); });
        socksv5.listen = function (port, host, listener) {
            socksv5.socket.listen(port, host, function () {
                if (typeof listener === 'function') {
                    listener();
                }
            });
        };
        socksv5.address = function () {
            return socksv5.address();
        };
        socksv5.getConnections = function (cb) {
            socksv5.socket.getConnections(cb);
        };
        socksv5.close = function (callback) {
            socksv5.socket.close(callback);
        };
        if (typeof configures.port !== 'undefined') {
            var port_1 = Number(configures.port || 8001);
            var host_1 = String(configures.host || '::1');
            socksv5.listen(port_1, host_1, function () {
                if (configures.debug) {
                    console.info("SOCKSv5 server running on " + host_1 + ":" + port_1);
                }
            });
        }
        return socksv5;
        function parseSocksv5(socket) {
            var parser = Object.assign(new events_1.EventEmitter(), {
                listening: false,
                isauthed: false,
                command: '',
                state: 0x00,
                atyp: 0x00,
                methods: Buffer.alloc(0),
                methodsp: 0,
                dstaddr: Buffer.alloc(0),
                dstaddrp: 0,
                dstport: undefined,
                start: undefined,
                stop: undefined,
                onData: undefined,
                parseData: undefined
            });
            parser.start = function () {
                if (parser.listening) {
                    return;
                }
                parser.listening = true;
                socket.on('data', parser.onData);
                socket.resume();
            };
            parser.stop = function () {
                if (!parser.listening) {
                    return;
                }
                parser.listening = false;
                socket.removeListener('data', parser.onData);
                socket.pause();
            };
            parser.onData = function (chunk) {
                if (typeof parser.parseData === 'function') {
                    parser.parseData(chunk);
                }
            };
            parser.parseData = function (chunk) {
                var index = 0, left = 0, minSize = 0, chunkLeft = 0;
                while (index < chunk.length) {
                    switch (parser.state) {
                        case 0x01:
                            if (configures.debug) {
                                console.log(Date.now(), 'Socksv5 Parse 0x01', index, chunk);
                            }
                            var nmethods = chunk[index];
                            if (nmethods === 0x00) {
                                return parser.emit('error', new Error('Unexpected empty methods list'));
                            }
                            index = index + 1;
                            parser.state = parser.state + 0x01;
                            parser.methods = Buffer.alloc(1, nmethods);
                            parser.methodsp = 0;
                            break;
                        case 0x02:
                            if (configures.debug) {
                                console.log(Date.now(), 'Socksv5 Parse 0x02', index, chunk);
                            }
                            left = parser.methods.length - parser.methodsp;
                            chunkLeft = chunk.length - index;
                            minSize = left < chunkLeft ? left : chunkLeft;
                            chunk.copy(parser.methods, parser.methodsp, index, index + minSize);
                            parser.methodsp = parser.methodsp + minSize;
                            index = index + minSize;
                            if (parser.methodsp === parser.methods.length) {
                                parser.stop();
                                parser.state = 0x00;
                                if (index < chunk.length) {
                                    socket.unshift(chunk.slice(index));
                                }
                                var methods = parser.methods;
                                parser.methods = Buffer.alloc(0);
                                parser.emit('methods', methods);
                            }
                            break;
                        case 0x03:
                            if (configures.debug) {
                                console.log(Date.now(), 'Socksv5 Parse 0x03', index, chunk);
                            }
                            switch (chunk[index]) {
                                case 0x01:
                                    parser.command = 'CONNECT';
                                    break;
                                case 0x02:
                                    parser.command = 'BIND';
                                    break;
                                case 0x03:
                                    parser.command = 'UDP';
                                    break;
                                default:
                                    parser.stop();
                                    parser.emit('error', new Error("Invalid request command: " + chunk[index]));
                                    return;
                            }
                            index = index + 1;
                            parser.state = parser.state + 0x01;
                            break;
                        case 0x04:
                            if (configures.debug) {
                                console.log(Date.now(), 'Socksv5 Parse 0x04', index, chunk);
                            }
                            index = index + 1;
                            parser.state = parser.state + 0x01;
                            break;
                        case 0x05:
                            if (configures.debug) {
                                console.log(Date.now(), 'Socksv5 Parse 0x05', index, chunk);
                            }
                            parser.state = 0x06;
                            switch (chunk[index]) {
                                case 0x01:
                                    parser.dstaddr = Buffer.alloc(4);
                                    break;
                                case 0x04:
                                    parser.dstaddr = Buffer.alloc(16);
                                    break;
                                case 0x03:
                                    parser.state = 0x07;
                                    break;
                                default:
                            }
                            parser.atyp = chunk[index];
                            parser.dstaddrp = 0;
                            parser.dstport = undefined;
                            index = index + 1;
                            break;
                        case 0x06:
                            if (configures.debug) {
                                console.log(Date.now(), 'Socksv5 Parse 0x06', index, chunk);
                            }
                            left = parser.dstaddr.length - parser.dstaddrp;
                            chunkLeft = chunk.length - index;
                            minSize = left < chunkLeft ? left : chunkLeft;
                            chunk.copy(parser.dstaddr, parser.dstaddrp, index, index + minSize);
                            parser.dstaddrp = parser.dstaddrp + minSize;
                            index = index + minSize;
                            if (parser.dstaddrp === parser.dstaddr.length) {
                                parser.state = 0x08;
                            }
                            break;
                        case 0x07:
                            if (configures.debug) {
                                console.log(Date.now(), 'Socksv5 Parse 0x07', index, chunk);
                            }
                            parser.dstaddr = Buffer.alloc(chunk[index]);
                            parser.state = 0x06;
                            index = index + 1;
                            break;
                        case 0x08:
                            if (configures.debug) {
                                console.log(Date.now(), 'Socksv5 Parse 0x08', index, chunk);
                            }
                            if (typeof parser.dstport === 'undefined') {
                                parser.dstport = chunk[index];
                            }
                            else {
                                parser.dstport = parser.dstport << 8;
                                parser.dstport = parser.dstport + chunk[index];
                                index = index + 1;
                                parser.stop();
                                if (index < chunk.length) {
                                    socket.unshift(chunk.slice(index));
                                }
                                var dstaddr = '';
                                var dstport = parser.dstport;
                                switch (parser.atyp) {
                                    case 0x01:
                                        dstaddr = parser.dstaddr.join('.');
                                        break;
                                    case 0x04:
                                        for (var bit = 0; bit < 16; bit++) {
                                            if (bit % 2 === 0) {
                                                dstaddr = dstaddr + ':';
                                            }
                                            if (parser.dstaddr[bit] < 16) {
                                                dstaddr = dstaddr + '0';
                                            }
                                            dstaddr = dstaddr + parser.dstaddr[bit].toString(16);
                                        }
                                        break;
                                    default:
                                        dstaddr = parser.dstaddr.toString();
                                }
                                parser.state = 0x00;
                                parser.emit('request', {
                                    command: parser.command,
                                    srcAddr: undefined,
                                    srcPort: undefined,
                                    dstAddr: dstaddr,
                                    dstPort: dstport
                                });
                                return;
                            }
                            index = index + 1;
                            break;
                        default:
                            if (configures.debug) {
                                console.log(Date.now(), 'Socksv5 Parse 0x00', index, chunk);
                            }
                            if (chunk[index] !== 0x05) {
                                return parser.emit('error', new Error('Incompatible SOCKS protocol version'));
                            }
                            index = index + 1;
                            parser.state = !parser.isauthed ? parser.state + 0x01 : 0x03;
                    }
                }
            };
            if (typeof parser.start === 'function') {
                parser.start();
            }
            return parser;
        }
        function proxySocket(socket, data) {
            dns.lookup(String(data.dstAddr), function (err, address) {
                var dataStacks = {
                    socketId: guid(),
                    reqQueue: new Array(),
                    resQueue: new Array(),
                    reqBytes: 0,
                    resBytes: 0,
                    reqBegin: false,
                    resBegin: false
                };
                if (configures.debug) {
                    console.log(Date.now(), 'Socksv5 Proxy', JSON.stringify(data));
                }
                if (err instanceof Error) {
                    return handleProxyError(socket, err);
                }
                var isConnected = false;
                var dstSocket = new net.Socket();
                dstSocket.setKeepAlive(true);
                dstSocket.on('error', function (err) {
                    if (!isConnected) {
                        handleProxyError(socket, err);
                    }
                });
                dstSocket.on('connect', function () {
                    isConnected = true;
                    dataStacks.socketId = guid();
                    if (socket.writable) {
                        var localAddress = (function (ipAddress) {
                            var bytes = Buffer.alloc(16);
                            if (net.isIPv4(ipAddress)) {
                                var elements_1 = ipAddress.split('.', 4);
                                for (var i = 0; i < elements_1.length; i++) {
                                    bytes[i] = Number(elements_1[i]);
                                }
                                return bytes.slice(0, 4);
                            }
                            var elements = ipAddress.split(':', 8);
                            for (var i = 0; i < elements.length; i++) {
                                elements[i] = elements[i] || '0000';
                                bytes[i * 2] = parseInt(elements[i].substr(0, 2), 16);
                                bytes[i * 2 + 1] = parseInt(elements[i].substr(2, 2), 16);
                            }
                            return bytes;
                        })(dstSocket.localAddress || '127.0.0.1');
                        var dataResponse = Buffer.alloc(6 + localAddress.length);
                        dataResponse[0] = 0x05;
                        dataResponse[1] = 0x00;
                        dataResponse[2] = 0x00;
                        dataResponse[3] = localAddress.length === 4 ? 0x01 : 0x04;
                        for (var i = 0; i < localAddress.length; i++) {
                            dataResponse[4 + i] = localAddress[i];
                        }
                        dataResponse.writeUInt16BE(dstSocket.localPort, localAddress.length + 4);
                        socket.write(dataResponse);
                        socket.pipe(dstSocket).pipe(socket);
                        socket.resume();
                        return;
                    }
                    if (dstSocket.writable) {
                        dstSocket.end();
                    }
                });
                dstSocket.on('readable', function (buf) {
                    var chunk = dstSocket.read();
                    if (chunk === null) {
                        if (dataStacks.resBegin && dataStacks.resQueue.length > 0) {
                            buf = Buffer.concat(dataStacks.resQueue, dataStacks.resBytes);
                            if (typeof configures.onResponse === 'function') {
                                configures.onResponse(dataStacks.socketId, buf, data);
                            }
                        }
                        dataStacks.resBegin = false;
                        dataStacks.resQueue = new Array();
                        dataStacks.resBytes = 0;
                        dataStacks.socketId = guid();
                        return;
                    }
                    if (Buffer.isBuffer(chunk) &&
                        chunk.includes(Buffer.from([0x0d, 0x0a, 0x0d, 0x0a])) &&
                        chunk.indexOf(Buffer.from([0x48, 0x54, 0x54, 0x50, 0x2f])) === 0) {
                        if (dataStacks.resBegin && dataStacks.resQueue.length > 0) {
                            buf = Buffer.concat(dataStacks.resQueue, dataStacks.resBytes);
                            if (typeof configures.onResponse === 'function') {
                                configures.onResponse(dataStacks.socketId, buf, data);
                            }
                        }
                        dataStacks.resBegin = true;
                        dataStacks.resQueue = new Array();
                        dataStacks.resBytes = 0;
                        dataStacks.socketId = guid();
                    }
                    if (dataStacks.resBegin) {
                        dataStacks.resQueue.push(chunk);
                        dataStacks.resBytes = dataStacks.resBytes + chunk.length;
                    }
                });
                socket.on('readable', function (buf) {
                    var chunk = socket.read();
                    if (chunk === null) {
                        if (dataStacks.reqBegin && dataStacks.reqQueue.length > 0) {
                            buf = Buffer.concat(dataStacks.reqQueue, dataStacks.reqBytes);
                            if (typeof configures.onRequest === 'function') {
                                configures.onRequest(dataStacks.socketId, buf, data);
                            }
                        }
                        dataStacks.reqBegin = false;
                        dataStacks.reqQueue = new Array();
                        dataStacks.reqBytes = 0;
                        return;
                    }
                    if (Buffer.isBuffer(chunk) &&
                        [0x44, 0x47, 0x4f, 0x50].indexOf(chunk[0]) !== -1 &&
                        chunk.includes(Buffer.from([0x0d, 0x0a, 0x0d, 0x0a])) &&
                        chunk.includes(Buffer.from([0x48, 0x54, 0x54, 0x50, 0x2f]))) {
                        if (dataStacks.reqBegin && dataStacks.reqQueue.length > 0) {
                            buf = Buffer.concat(dataStacks.reqQueue, dataStacks.reqBytes);
                            if (typeof configures.onRequest === 'function') {
                                configures.onRequest(dataStacks.socketId, buf, data);
                            }
                        }
                        dataStacks.reqBegin = true;
                        dataStacks.reqQueue = new Array();
                        dataStacks.reqBytes = 0;
                    }
                    if (dataStacks.reqBegin) {
                        dataStacks.reqQueue.push(chunk);
                        dataStacks.reqBytes = dataStacks.reqBytes + chunk.length;
                    }
                });
                dstSocket.connect(Number(data.dstPort), address);
                socket.dstSocket = dstSocket;
            });
            function handleProxyError(socket, err) {
                if (socket.writable) {
                    var message = Buffer.from([0x05, 0x01]);
                    switch (Object(err).code) {
                        case 'ENOENT':
                        case 'ENOTFOUND':
                        case 'ETIMEDOUT':
                        case 'EHOSTUNREACH':
                            message[1] = 0x04;
                            break;
                        case 'ENETUNREACH':
                            message[1] = 0x03;
                            break;
                        case 'ECONNREFUSED':
                            message[1] = 0x05;
                            break;
                        default:
                    }
                    if (configures.debug) {
                        console.log(Date.now(), 'Socksv5ProxyError', String(err));
                    }
                    socket.end(message);
                }
            }
            function guid() {
                var s4 = function () {
                    return (((1 + Math.random()) * 0x10000) | 0)
                        .toString(16)
                        .substring(1);
                };
                return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
            }
        }
    };
    DevPlatformStartup.appName = 'HeterogeneouDevPlatform';
    DevPlatformStartup.appVersion = '1.0.0';
    return DevPlatformStartup;
}());
exports.DevPlatformStartup = DevPlatformStartup;
new DevPlatformStartup().main(process.argv);
