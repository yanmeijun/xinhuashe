/**
 * Copyright 2019 The Kaipuyun Project Authors. All right reserved.
 * Use of this source that is governed by a Apache-style
 * license that can be found in the LICENSE file.
 *
 * 定义异构系统接口开发平台 之 客户端主进程、SocksV5代理服务和模板生成业务等
 *
 * @authors hjboss <hongjiangproject@gmail.com> 2019-06 $
 */
import * as fs from 'fs';
import * as os from 'os';
import * as dns from 'dns';
import * as net from 'net';
import * as url from 'url';
import * as path from 'path';
import * as zlib from 'zlib';
import * as crypto from 'crypto';
import * as process from 'process';
import * as nodeforge from 'node-forge';
import * as portfinder from 'portfinder';
import { EventEmitter } from 'events';
import { app, BrowserWindow, dialog, systemPreferences } from 'electron';

export class DevPlatformStartup {
  /**
   * 客户端应用名称
   *
   * @remarks
   * 应用名称亦可能在多处模块使用 故原则上在main里作统一初始化
   */
  static readonly appName = 'HeterogeneouDevPlatform';

  /**
   * 客户端应用版本号
   *
   * @remarks
   * 应用新版本发布**必须**按照统一法则**更改版本号**后方可打包应用
   */
  static readonly appVersion = '1.0.0';

  /**
   * 客户端安装更新状态
   *
   * @remark
   * 用作识别**首次安装**和**更新安装**选择性加载相对应的引导页面
   * 其中: 0表示已经安装 1表示首次安装 -1表示更新安装
   */
  stateInstalled = 0;

  /**
   * 客户端窗体主题 Dark 模式
   *
   * @remarks
   * 支持**MacOS Mojave**和**Linux GNOME3+桌面**的 Dark 主题
   */
  isDarkTheme = false;

  /**
   * 客户端HTTPS证书相关信息
   *
   * @remarks
   * 其下标表示HTTPS证书适用范围的正则表达式
   */
  dataCertificates: { [name: string]: unknown } = {};

  /**
   * 客户端有效网络请求响应数据缓存
   *
   * @remarks
   * 其下标表示HTTP(s)全局唯一标示符
   */
  dataHTTPInformation: { [id: string]: { [name: string]: unknown } } = {};

  mainWindow: BrowserWindow;

  /**
   * 安全启动应用客户端主进程
   *
   * @param args - 命名行参数
   */
  main(args: string[]) {
    const debug = /--debug/i.test(args[2] || '');

    // 部署客户端认证文件 当首次安装或者更新安装
    const homedir = path.join(os.homedir(), '.' + DevPlatformStartup.appName);
    const licenseFile = path.join(homedir, 'LICENSE.md');
    const licenseData = this.sha1License(DevPlatformStartup.appVersion);

    if (!fs.existsSync(homedir)) {
      fs.mkdirSync(homedir);
    }

    if (!fs.existsSync(licenseFile)) {
      this.stateInstalled = 1;
    } else if (this.readFile(licenseFile) !== licenseData) {
      this.stateInstalled = -1;
    }

    if (this.stateInstalled === 1 || this.stateInstalled === -1) {
      this.writeFile(licenseFile, licenseData);
    }

    portfinder.getPort((err: Error, proxyPort: number) => {
      if (err) {
        return dialog.showErrorBox(
          'ApplicationError',
          "The application can't start properly(0x000007b). Please click OK to close the application."
        );
      }

      if (debug && /--runtime/i.test(args[3] || '')) {
        return this.createProxyService(proxyPort, debug);
      }

      if (!debug || (debug && /--service/i.test(args[3] || ''))) {
        this.createProxyService(proxyPort, debug);
      }

      // 创建客户端主窗体且设置网络代理及单实例化
      app.disableHardwareAcceleration();
      app.releaseSingleInstanceLock();
      app.commandLine.appendSwitch('ignore-certificate-errors');
      app.commandLine.appendSwitch('--disable-http-cache');
      app.once('ready', () => this.createWindow({ debug, proxyPort }));
      app.once('activate', () => {
        if (!this.mainWindow) {
          this.createWindow({ debug, proxyPort });
        }
      });
      app.once('second-instance', () => {
        if (this.mainWindow) {
          if (this.mainWindow.isMaximized()) {
            this.mainWindow.restore();
          }

          this.mainWindow.focus();
        }
      });
      app.once('window-all-closed', () => {
        if (process.platform !== 'darwin') {
          app.quit();
        }
      });
    });

    process.on('uncaughtException', (err: Error) => {
      if (debug) {
        console.log(Date.now(), 'Main Process UncaughtException: ', err);
      }
    });
  }

  /**
   * 创建应用客户端主窗体
   *
   * @param configures.debug - 调试模式
   * @param configures.proxyPort - 代理端口
   */
  createWindow(configures: { debug?: boolean; proxyPort?: number }) {
    const windowOptions = {
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
          monospace: 'Ubuntu Mono',
        },
        devTools: Boolean(configures.debug),
        nodeIntegration: true,
        nodeIntegrationInWorker: true,
        webviewTag: true,
      },
    };

    // 基于Win7/10、Linux和Mac平台差异作窗口主题风格的兼容性
    switch (process.platform) {
      case 'darwin':
        windowOptions.frame = true;
        windowOptions.titleBarStyle = 'hidden';
        windowOptions.titlebarAppearsTransparent = true;

        systemPreferences.subscribeLocalNotification(
          'AppleInterfaceThemeChangedNotification',
          () => {
            this.isDarkTheme = systemPreferences.isDarkMode();
          }
        );
        break;

      case 'linux':
        windowOptions.frame = true;
        windowOptions.icon = path.join(__dirname, '/img/512.png');
        break;

      default:
    }

    this.mainWindow = new BrowserWindow(windowOptions);
    this.mainWindow.setMenuBarVisibility(false);

    // 设置CPU离线渲染模式
    this.mainWindow.webContents.on('paint', (event, dirty, image) => {});
    this.mainWindow.webContents.setFrameRate(30);

    // 设置全局SocksV5网络代理
    const proxyPort = `socks5://::1:${configures.proxyPort || 8001}`;

    if (configures.debug) {
      console.info(`${DevPlatformStartup.appName} proxy on ${proxyPort}`);
    }

    this.mainWindow.webContents.session.setProxy(
      {
        proxyRules: proxyPort,
        proxyBypassRules: '<local>;',
        pacScript: undefined,
      },
      () => {}
    );

    this.mainWindow.webContents.session.setCertificateVerifyProc(
      (
        request: Electron.CertificateVerifyProcRequest,
        callback: (verificationResult: number) => void
      ) => {
        const certificate = request.certificate;

        if (!this.dataCertificates[certificate.subject.commonName]) {
          this.dataCertificates[certificate.subject.commonName] = certificate;
        }

        callback(-3);
      }
    );

    this.mainWindow.once('ready-to-show', () => this.mainWindow.show());
    this.mainWindow.once('closed', () => {
      this.mainWindow = undefined;
    });

    if (configures.debug) {
      this.mainWindow.loadURL('http://127.0.0.1:8000/#{"id": 1}');
      this.mainWindow.webContents.openDevTools();
      this.mainWindow.maximize();
    } else {
      this.mainWindow.loadURL(
        url.format({
          protocol: 'file',
          slashes: true,
          pathname: path.join(__dirname, 'assets', 'index.html'),
        })
      );
    }
  }

  /**
   * 创建客户端应用后台代理服务
   *
   * @param proxyPort - 代理端口
   * @param debug - 调试模式
   */
  createProxyService(proxyPort: number, debug?: boolean, self = this) {
    return self.socksv5Server({
      debug,
      port: proxyPort,

      /**
       * 分析SOCKSv5代理截取的HTTP请求原始字节流
       *
       * @param id - HTTP唯一标识符
       * @param chunk - HTTP请求原始字节流
       * @param data - 相关附加信息
       */
      onRequest(id: string, chunk: Buffer, data: { [name: string]: unknown }) {
        let isHttps = false;

        if ([0x44, 0x47, 0x4f, 0x50].indexOf(chunk[0]) === -1) {
          return;
        }

        const req = parseHTTPStream(chunk, false);
        if (
          String(req.Method).toUpperCase() !== 'GET' ||
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
          ].indexOf(path.extname(String(req.URI)).toUpperCase()) === -1
        ) {
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
            Begin: Date.now(),
          };
        }
      },

      /**
       * 分析SOCKSv5代理截取的HTTP响应原始字节流
       *
       * @param id - HTTP唯一标识符
       * @param chunk - HTTP响应原始字节流
       * @param data - 相关附加信息
       */
      onResponse(id: string, chunk: Buffer, data: { [name: string]: unknown }) {
        if (self.dataHTTPInformation[id]) {
          if (self.dataHTTPInformation[id].Https) {
            return;
          }

          const res = parseHTTPStream(chunk, true);
          self.dataHTTPInformation[id] = Object.assign(
            self.dataHTTPInformation[id] || {},
            {
              Status: res.Status,
              Mime: res.Mime,
              Response: res,
              Finish: Date.now(),
              URL: [
                self.dataHTTPInformation[id].Https ? 'https://' : 'http://',
                self.dataHTTPInformation[id].Host,
                ((): string => {
                  if (
                    self.dataHTTPInformation[id].Https &&
                    self.dataHTTPInformation[id].Port !== 443
                  ) {
                    return '';
                  }

                  if (
                    !self.dataHTTPInformation[id].Https &&
                    self.dataHTTPInformation[id].Port !== 80
                  ) {
                    return '';
                  }

                  return ':' + self.dataHTTPInformation[id].Port;
                })(),
                String(self.dataHTTPInformation[id].URI).replace(/^\s{1,}/, ''),
              ].join(''),
            }
          );

          if (self.mainWindow) {
            self.mainWindow.webContents.send(
              'PROXY',
              JSON.stringify(self.dataHTTPInformation[id])
            );
          }
        }
      },
    });

    function parseHTTPStream(chunk: Buffer, isResponse: boolean) {
      const data: { [name: string]: unknown } = {};

      let index = 0;
      while (index < chunk.length) {
        const position = chunk.indexOf(Buffer.from([0x0d, 0x0a]), index);
        const codeline = chunk.slice(index, position);

        // HTTP协议文本规范非法
        if (position === -1) {
          break;
        }

        index = position + 2;

        // 获取HTTP协议主体数据
        if (
          codeline.length === 0 &&
          position === chunk.indexOf(Buffer.from([0x0d, 0x0a, 0x0d, 0x0a])) + 2
        ) {
          data.Body = chunk.slice(position + 2, chunk.length);
          break;
        }

        // 分析HTTP协议第一行基本信息
        if (typeof data.Protocol === 'undefined') {
          const i1st = codeline.indexOf(0x20);
          const i2nd = codeline.indexOf(0x20, i1st + 1);

          if (isResponse) {
            data.Protocol = codeline.slice(0, i1st).toString();
            data.Status = codeline.slice(i1st, i2nd).toString();
            data.Message = codeline.slice(i2nd, codeline.length).toString();
          } else {
            data.Protocol = codeline.slice(i2nd, codeline.length).toString();
            data.Method = codeline.slice(0, i1st).toString();
            data.URI = codeline.slice(i1st, i2nd).toString();
          }

          continue;
        }

        // 分析HTTP协议文本头部信息
        if (typeof data.Headers === 'undefined') {
          data.Headers = new Array<string>();
        }

        if (codeline.includes('User-Agent')) {
          const ucap = codeline.indexOf(';UCAP=');

          if (ucap !== -1) {
            data.UCAP = codeline.slice(ucap + 6, codeline.length).toString();
          }
        }

        if (codeline.includes('Content-Type')) {
          const contentType = codeline.indexOf(0x3a);

          if (contentType !== -1 && contentType < codeline.length) {
            let mimeBuff = codeline.slice(contentType + 2, codeline.length);

            const unicodes = mimeBuff.indexOf(0x3b);
            if (unicodes !== -1) {
              mimeBuff = mimeBuff.slice(0, unicodes);
            }

            const mimeMain = mimeBuff.indexOf(0x2c);
            if (mimeMain !== -1) {
              mimeBuff = mimeBuff.slice(0, mimeMain);
            }

            data.Mime = mimeBuff.toString();
          }
        }

        if (codeline.includes('Content-Encoding')) {
          data.GZIP = codeline.includes('gzip');
        }

        (data.Headers as Array<string>).push(codeline.toString());
      }

      if (data.GZIP) {
      }

      return data;
    }
  }

  /**
   * 认证文件数据加密算法
   *
   * @param appVersion - 客户端应用版本号
   */
  sha1License(appVersion: string): string {
    return crypto
      .createHash('sha1')
      .update(DevPlatformStartup.appName + ':' + appVersion)
      .digest('hex');
  }

  /**
   * 同步地读取给定文本文件 Filename 的内容字符串
   *
   * @param filename - 文本文件路径
   * @return 文件内容 若读取异常则返回UNDEFINED
   */
  readFile(filename: string): string {
    try {
      return fs.readFileSync(filename).toString();
    } catch (err) {}

    return undefined;
  }

  /**
   * 同步地将给定内容 Document 写入给定的文本文件 Filename
   *
   * @param filename - 文本文件路径
   * @param document - 文本文件内容
   * @return 若写入异常则返回错误消息
   */
  writeFile(filename: string, document: string): Error {
    try {
      fs.writeFileSync(filename, document);
    } catch (err) {
      return err;
    }

    return undefined;
  }

  /**
   * 创建一个基于SOCKSv5协议的代理服务器
   *
   * @param configures.debug - 调试模式
   * @param configures.port - 代理端口
   * @param configures.host - 绑定主机
   * @param configures.onRequest - 代理请求函数
   * @param configures.onResponse - 代理响应函数
   * @returns SOCKSv5代理服务器对象
   */
  socksv5Server(configures: { [name: string]: unknown }) {
    const socksv5 = Object.assign(new EventEmitter(), {} as {
      connections?: number; // 代理服务器实时连接数
      maxConnections?: number; // 代理服务器最大连接数
      socket?: net.Server; // 代理服务器套接字连接对象

      /**
       * SOCKSv5代理服务器绑定端口启动
       *
       * @param port - 代理端口
       * @param host - 代理主机
       * @param listener - 回调函数 仅当代理服务器启动成功
       */
      listen?: (port: number, host: string, listener?: Function) => void;

      /**
       * 获取SOCKSv5代理服务器地址端口信息
       *
       * @returns 主机地址端口及其协议
       */
      address?: () => net.AddressInfo;

      /**
       * 获取SOCKSv5代理服务器的实时连接数信息
       *
       * @param callback.err - 异常错误
       * @param callback.count - 实时连接数
       */
      getConnections?: (callback: (err: Error, count: number) => void) => void;

      /**
       * SOCKSv5代理服务器关闭
       *
       * @param callback - 回调函数 仅当代理服务器已经关闭
       */
      close?: (callback?: (err: Error) => void) => void;
    });

    socksv5.setMaxListeners(0);
    if (typeof configures.listener === 'function') {
      socksv5.on('connection', Object(configures.listener));
    }

    socksv5.connections = socksv5.connections || 0;
    socksv5.maxConnections = socksv5.maxConnections || 65535;
    socksv5.socket = new net.Server((link: net.Socket) => {
      const socket = Object.assign(link, {} as { dstSocket?: net.Socket });

      if (socksv5.connections >= socksv5.maxConnections) {
        return socket.destroy();
      }

      socksv5.connections = socksv5.connections + 1;
      socksv5.once('close', () => {
        socksv5.connections = socksv5.connections - 1;
      });

      const parser = parseSocksv5(socket);
      parser.on('error', (err: Error) => {
        if (socket.writable) {
          if (configures.debug) {
            console.log(Date.now(), 'Socksv5 Parse Error', String(err));
          }

          socket.end();
        }
      });
      parser.on('methods', (methods: Buffer) => {
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
      parser.on('request', (data: { [name: string]: unknown }) => {
        if (configures.debug) {
          console.log(Date.now(), 'Socksv5 Action REQUEST', data.dstAddr);
        }

        if (data.command !== 'CONNECT') {
          return socket.end(Buffer.from([0x05, 0x07]));
        }

        data.srcAddr = String(socket.remoteAddress || '::1');
        data.srcPort = Number(socket.remotePort || 0);

        if (configures.listener) {
          let isHandled = false;

          const accept = (intercept?: boolean) => {
            if (!isHandled) {
              isHandled = true;

              if (socket.writable) {
                if (intercept) {
                  socket.write(
                    Buffer.from([
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
                    ])
                  );
                  socket.removeListener('error', (err: Error) => {});
                  return process.nextTick(() => socket.resume());
                }

                return proxySocket(socket, data);
              }
            }
          };
          const deny = () => {
            if (!isHandled) {
              isHandled = true;

              if (socket.writable) {
                socket.end(Buffer.from([0x05, 0x02]));
              }
            }
          };

          return socksv5.emit('connection', data, accept, deny);
        }

        return proxySocket(socket, data);
      });

      const onClose = () => {
        if (socket.dstSocket && socket.dstSocket.writable) {
          socket.dstSocket.end();
        }

        socket.dstSocket = undefined;
      };
      socket.on('error', (err: Error) => {});
      socket.on('end', onClose);
      socket.on('close', onClose);
    });
    socksv5.socket.on('error', (err: Error) => socksv5.emit('error', err));
    socksv5.socket.on('listening', () => socksv5.emit('listening'));
    socksv5.socket.on('close', () => socksv5.emit('close'));

    socksv5.listen = (port: number, host: string, listener?: Function) => {
      socksv5.socket.listen(port, host, () => {
        if (typeof listener === 'function') {
          listener();
        }
      });
    };

    socksv5.address = (): net.AddressInfo => {
      return socksv5.address() as net.AddressInfo;
    };

    socksv5.getConnections = (cb: (err: Error, count: number) => void) => {
      socksv5.socket.getConnections(cb);
    };

    socksv5.close = (callback?: (err: Error) => void) => {
      socksv5.socket.close(callback);
    };

    if (typeof configures.port !== 'undefined') {
      const port = Number(configures.port || 8001);
      const host = String(configures.host || '::1');

      socksv5.listen(port, host, () => {
        if (configures.debug) {
          console.info(`SOCKSv5 server running on ${host}:${port}`);
        }
      });
    }

    return socksv5;

    function parseSocksv5(socket: net.Socket & { dstSocket?: net.Socket }) {
      const parser = Object.assign(new EventEmitter(), {
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
        parseData: undefined,
      });

      parser.start = () => {
        if (parser.listening) {
          return;
        }

        parser.listening = true;
        socket.on('data', parser.onData);
        socket.resume();
      };

      parser.stop = () => {
        if (!parser.listening) {
          return;
        }

        parser.listening = false;
        socket.removeListener('data', parser.onData);
        socket.pause();
      };

      parser.onData = (chunk: Buffer) => {
        if (typeof parser.parseData === 'function') {
          parser.parseData(chunk);
        }
      };

      parser.parseData = (chunk: Buffer) => {
        let index = 0,
          left = 0,
          minSize = 0,
          chunkLeft = 0;

        while (index < chunk.length) {
          switch (parser.state) {
            case 0x01:
              if (configures.debug) {
                console.log(Date.now(), 'Socksv5 Parse 0x01', index, chunk);
              }

              const nmethods = chunk[index];

              if (nmethods === 0x00) {
                return parser.emit(
                  'error',
                  new Error('Unexpected empty methods list')
                );
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

              chunk.copy(
                parser.methods,
                parser.methodsp,
                index,
                index + minSize
              );
              parser.methodsp = parser.methodsp + minSize;
              index = index + minSize;

              if (parser.methodsp === parser.methods.length) {
                parser.stop();
                parser.state = 0x00;

                if (index < chunk.length) {
                  socket.unshift(chunk.slice(index));
                }

                const methods = parser.methods;
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
                  parser.emit(
                    'error',
                    new Error(`Invalid request command: ${chunk[index]}`)
                  );
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

              chunk.copy(
                parser.dstaddr,
                parser.dstaddrp,
                index,
                index + minSize
              );
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
              } else {
                parser.dstport = parser.dstport << 8;
                parser.dstport = parser.dstport + chunk[index];
                index = index + 1;

                parser.stop();
                if (index < chunk.length) {
                  socket.unshift(chunk.slice(index));
                }

                let dstaddr = '';
                let dstport = parser.dstport;

                switch (parser.atyp) {
                  case 0x01:
                    dstaddr = parser.dstaddr.join('.');
                    break;

                  case 0x04:
                    for (let bit = 0; bit < 16; bit++) {
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
                  dstPort: dstport,
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
                return parser.emit(
                  'error',
                  new Error('Incompatible SOCKS protocol version')
                );
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

    function proxySocket(
      socket: net.Socket & { dstSocket?: net.Socket },
      data: { [name: string]: unknown }
    ) {
      dns.lookup(String(data.dstAddr), (err: Error, address: string) => {
        const dataStacks = {
          socketId: guid(),
          reqQueue: new Array<Buffer>(),
          resQueue: new Array<Buffer>(),
          reqBytes: 0,
          resBytes: 0,
          reqBegin: false,
          resBegin: false,
        };

        if (configures.debug) {
          console.log(Date.now(), 'Socksv5 Proxy', JSON.stringify(data));
        }

        if (err instanceof Error) {
          return handleProxyError(socket, err);
        }

        let isConnected = false;
        const dstSocket = new net.Socket();
        dstSocket.setKeepAlive(true);
        dstSocket.on('error', (err: Error) => {
          if (!isConnected) {
            handleProxyError(socket, err);
          }
        });
        dstSocket.on('connect', () => {
          isConnected = true;
          dataStacks.socketId = guid();

          if (socket.writable) {
            const localAddress = ((ipAddress: string): Buffer => {
              const bytes = Buffer.alloc(16);

              if (net.isIPv4(ipAddress)) {
                const elements = ipAddress.split('.', 4);

                for (let i = 0; i < elements.length; i++) {
                  bytes[i] = Number(elements[i]);
                }

                return bytes.slice(0, 4);
              }

              const elements = ipAddress.split(':', 8);
              for (let i = 0; i < elements.length; i++) {
                elements[i] = elements[i] || '0000';

                bytes[i * 2] = parseInt(elements[i].substr(0, 2), 16);
                bytes[i * 2 + 1] = parseInt(elements[i].substr(2, 2), 16);
              }

              return bytes;
            })(dstSocket.localAddress || '127.0.0.1');
            const dataResponse = Buffer.alloc(6 + localAddress.length);

            dataResponse[0] = 0x05;
            dataResponse[1] = 0x00;
            dataResponse[2] = 0x00;
            dataResponse[3] = localAddress.length === 4 ? 0x01 : 0x04;

            for (let i = 0; i < localAddress.length; i++) {
              dataResponse[4 + i] = localAddress[i];
            }

            dataResponse.writeUInt16BE(
              dstSocket.localPort,
              localAddress.length + 4
            );

            socket.write(dataResponse);
            socket.pipe(dstSocket).pipe(socket);
            socket.resume();
            return;
          }

          if (dstSocket.writable) {
            dstSocket.end();
          }
        });
        dstSocket.on('readable', (buf?: Buffer) => {
          const chunk = dstSocket.read();

          if (chunk === null) {
            if (dataStacks.resBegin && dataStacks.resQueue.length > 0) {
              buf = Buffer.concat(dataStacks.resQueue, dataStacks.resBytes);

              if (typeof configures.onResponse === 'function') {
                configures.onResponse(dataStacks.socketId, buf, data);
              }
            }

            dataStacks.resBegin = false;
            dataStacks.resQueue = new Array<Buffer>();
            dataStacks.resBytes = 0;
            dataStacks.socketId = guid();
            return;
          }

          if (
            Buffer.isBuffer(chunk) &&
            chunk.includes(Buffer.from([0x0d, 0x0a, 0x0d, 0x0a])) &&
            chunk.indexOf(Buffer.from([0x48, 0x54, 0x54, 0x50, 0x2f])) === 0
          ) {
            if (dataStacks.resBegin && dataStacks.resQueue.length > 0) {
              buf = Buffer.concat(dataStacks.resQueue, dataStacks.resBytes);

              if (typeof configures.onResponse === 'function') {
                configures.onResponse(dataStacks.socketId, buf, data);
              }
            }

            dataStacks.resBegin = true;
            dataStacks.resQueue = new Array<Buffer>();
            dataStacks.resBytes = 0;
            dataStacks.socketId = guid();
          }

          if (dataStacks.resBegin) {
            dataStacks.resQueue.push(chunk);
            dataStacks.resBytes = dataStacks.resBytes + chunk.length;
          }
        });
        socket.on('readable', (buf?: Buffer) => {
          const chunk = socket.read();

          if (chunk === null) {
            if (dataStacks.reqBegin && dataStacks.reqQueue.length > 0) {
              buf = Buffer.concat(dataStacks.reqQueue, dataStacks.reqBytes);

              if (typeof configures.onRequest === 'function') {
                configures.onRequest(dataStacks.socketId, buf, data);
              }
            }

            dataStacks.reqBegin = false;
            dataStacks.reqQueue = new Array<Buffer>();
            dataStacks.reqBytes = 0;
            return;
          }

          if (
            Buffer.isBuffer(chunk) &&
            [0x44, 0x47, 0x4f, 0x50].indexOf(chunk[0]) !== -1 &&
            chunk.includes(Buffer.from([0x0d, 0x0a, 0x0d, 0x0a])) &&
            chunk.includes(Buffer.from([0x48, 0x54, 0x54, 0x50, 0x2f]))
          ) {
            if (dataStacks.reqBegin && dataStacks.reqQueue.length > 0) {
              buf = Buffer.concat(dataStacks.reqQueue, dataStacks.reqBytes);

              if (typeof configures.onRequest === 'function') {
                configures.onRequest(dataStacks.socketId, buf, data);
              }
            }

            dataStacks.reqBegin = true;
            dataStacks.reqQueue = new Array<Buffer>();
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

      function handleProxyError(socket: net.Socket, err: Error) {
        if (socket.writable) {
          const message = Buffer.from([0x05, 0x01]);

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

      function guid(): string {
        const s4 = (): string => {
          return (((1 + Math.random()) * 0x10000) | 0)
            .toString(16)
            .substring(1);
        };

        return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
      }
    }
  }
}
new DevPlatformStartup().main(process.argv);
