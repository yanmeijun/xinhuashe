/**
 * Copyright 2019 The Kaipuyun Project Authors. All right reserved.
 * Use of this source that is governed by a Apache-style
 * license that can be found in the LICENSE file.
 *
 * 定义异构系统接口开发平台 之 标签页窗体、开发者工具和模板列表等前端组件
 *
 * @authors hjboss <hongjiangproject@gmail.com> 2019-06 $
 */
import { Vue, Component, CreateElement } from 'vue-component-decorator';
import VueRouter from 'vue-router';
import { remote, ipcRenderer } from 'electron';
import { URL } from 'url';
import * as stylesheets from './devplatform.scss';

@Component
export class DevPlatformView extends Vue {
  /**
   * 标签页当前已选项编号
   *
   * @remarks
   * 取值范围: [0, stateTablist.length)
   */
  stateSerials = -1;

  /**
   * 标签页有效项动态统计
   *
   * @remarks
   * 取值范围: [0, stateTablist.length)
   */
  stateTabsize = 0;

  /**
   * 标签页组件ID有序排列
   *
   * @remarks
   * 给定的标签页已删除即**undefined**
   */
  stateTablist: string[] = new Array<string>(256);

  /**
   * 标签页组件相关数据信息
   *
   * @remarks
   * 给定的标签页已删除即**undefined**
   */
  stateTabdata: {
    [tabId: string]: {
      code?: number; // 标签页组件状态
      title?: string; // 页面标题栏文本
      favicon?: string; // 页面Favicon图标
      address?: string; // 页面输入框地址
      isfirst?: boolean; // webview组件首次加载
      webview?: JSX.Element; // webview组件缓存
      history?: { [name: string]: unknown }; // 历史状态缓存
      btnPrevious?: boolean; // Previous按钮可用状态
      btnNext?: boolean; // Next按钮可用状态
      dtShow?: number; // 开发者工具显示状态 其中: 0表示隐藏 1表示底部 2表示右侧 3表示左侧
      dtWidth?: number; // 开发者工具可视宽度 当dtShow=2或者3时有效
      dtHeight?: number; // 开发者工具可视高度 当dtShow=1时有效
      dtHorizontals?: number[]; // 开发者工具网络列表宽度 当dtShow=1时有效
      dtVerticals?: number[]; // 开发者工具网络列表宽度 当dtShow=2或者3时有效
      hpSerials?: number; // HTTP代理数据编号
      hpSize?: number; // HTTP代理数据有效长度
      hpList?: string[]; // HTTP代理数据有效列表
      hpData?: { [id: string]: unknown }; // HTTP代理数据详细信息
    };
  } = {};

  /**
   * 标签页标题栏拖动状态
   *
   * @remarks
   * 此为实现**原则上在同一时间仅支持拖动唯一一个标签页标题栏**而引入的临时状态
   * 其中: **tablist**是有效标签页的有序队列即从左到右排列 且 所有标签页的**标题栏是等宽的**
   */
  stateDraggable: {
    tablist?: Array<{
      id: string; // 有效标签页的组件ID
      dom: HTMLElement; // 有效标签页的标题栏DOM对象
      serials: number; // 有效标签页的全局编号
    }>;
    active?: number; // 拖动标签页在tablist的下标
    mousex?: number; // 鼠标点的X轴坐标值
    offset?: number; // 标题栏到窗体左侧的最小距离
    width?: number; // 标签页的标题栏宽度
  } = {};

  /**
   * 当前客户端语言类型
   *
   * @remarks
   * 支持语言选项: cn表示简体中文 zh表示繁体中文 en表示国际英语
   */
  stateLanguage: string;

  /**
   * 当前客户端操作系统
   *
   * @remarks
   * 操作系统种类: win32表示Windows7+ darwin表示MacOS linux表示Linux桌面环境
   */
  statePlatform: string;

  /**
   * 当前客户端主题名称
   *
   * @remarks
   * 原则上支持切换主题名称及其样式覆盖实现自定义多主题样式
   */
  stateThemeName: string;

  /**
   * 客户端样式名称前缀
   *
   * @remarks
   * 此值**必须**和样式文件**themePrefix**相同
   */
  readonly dataThemePrefix = 'devplatform-';

  /**
   * 客户端系统设置项名称
   *
   * @remarks
   * 原则上其任意配置项出现缺失或者异常都有默认值代替
   */
  readonly dataSettingsName = 'settings';

  /**
   * 客户端系统快捷键代码
   *
   * @remarks
   * 原则上在MacOS操作系统支持**Command键⌘**代替**Ctrl键**用作组合快捷键
   */
  readonly dataKeyboards = {
    ENTER: 13,
    C: 67,
    I: 73,
    O: 79,
    R: 82,
    F5: 116,
    F10: 121,
    F12: 123,
    COMMAND_LEFT: 91,
    COMMAND_RIGHT: 93,
  };

  /**
   * 标签页子元素ID前缀
   *
   * @remarks
   * 子元素ID格式: 组件ID前缀 + tabId
   */
  readonly dataIDPrefix = {
    TAB: 'tab_',
    WEBVIEW: 'webview_',
    SEARCHBOX: 'searchbox_',
  };

  /**
   * 标签页浏览器模拟信息
   *
   * @remarks
   * 针对目标地址的多数场景是政府网站 故选择模拟**Windows10 Edge浏览器**
   */
  readonly dataUserAgent =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/17.17134';

  /**
   * 标签页页面视图状态枚举
   *
   * @remarks
   * 即**stateTabdata[tabId].code**的取值范围
   */
  readonly dataTabcode = {
    donothing: 0b000, // 空白操作状态
    inputting: 0b001, // 正在输入网址
    inputError: 0b010, // 输入错误网址
    loading: 0b011, // 页面正在加载
    loadSuccess: 0b100, // 页面加载成功
    loadStopped: 0b101, // 页面停止加载
    loadTimeout: 0b110, // 页面加载超时
    loadFailed: 0b111, // 页面加载失败
  };

  /**
   * 客户端多语言翻译文本
   *
   * @remarks
   * 原则上在系统架构层面上支持任意多种语言类型的文本翻译
   */
  readonly dataLocales: { [lang: string]: { [name: string]: string } } = {
    cn: {
      WINDOW_TITLE: '异构系统接口开发平台',
      WINDOW_MINIMIZE: '最小化',
      WINDOW_MAXIMIZE: '最大化',
      WINDOW_CLOSE: '关闭窗体',
      TAB_EMPTY: '空白页',
      TAB_ADDITION: '添加标签',
      TAB_CLOSE: '关闭标签',
      TAB_PREVIOUS: '转到上一页',
      TAB_NEXT: '转到下一页',
      TAB_REFRESH: '重新载入当前页面',
      TAB_STOPPING: '停止加载当前页面',
      TAB_OPENMENU: '打开菜单',
      TAB_PLACEHOLDER: '请输入目标网站的网址',
      DEV_STATUS: '状态',
      DEV_METHOD: '方法',
      DEV_URL: '地址',
      DEV_MIME: '类型',
      DEV_REMOVE: '删除',
      DEV_BUILD: '生成模板',
      MSG_BUTTON_YES: '确定',
      MSG_BUTTON_CANCEL: '取消',
      MSG_CONFIRM_TITLE: '提示',
      MSG_CONFIRM_CLOSETAB: '确定关闭这些标签页',
      MENU_RELOAD: '重新载入标签页',
      MENU_CLOSE_RIGHT: '关闭右侧标签页',
      MENU_CLOSE_OTHER: '关闭其他标签页',
      MENU_CLOSE_THIS: '关闭标签页',
    },
  };

  /**
   * 自定义型 Directives
   *
   * @remarks
   * 针对输入框 Input 组件添加 AutoFocus 属性
   */
  static readonly directiveAutoFocus = {
    inserted(dom: HTMLElement, binding: object) {
      if (Object(binding).value) {
        dom.focus();
      }
    },
  };

  /**
   * 前端组件初始化
   */
  created() {
    const configures = this.getSettings();
    const userAgent = String(window.navigator.userAgent).toLowerCase();
    const language = window.navigator.languages[0] || 'zh-cmn-Hans';

    this.stateLanguage = String(configures.sysLanguage || '');
    if (!this.stateLanguage) {
      if (/zh-CN/i.test(language)) {
        this.stateLanguage = 'cn';
        document.documentElement.setAttribute('lang', 'zh-cmn-Hans');
      } else if (/(zh-TW|zh-HK)/i.test(language)) {
        this.stateLanguage = 'zh';
        document.documentElement.setAttribute('lang', 'zh-cmn-Hant');
      } else {
        this.stateLanguage = language.split('-')[0];
        document.documentElement.setAttribute('lang', language);
      }
    }

    if (userAgent.includes('mac')) {
      this.statePlatform = 'darwin';
    } else if (userAgent.includes('linux')) {
      this.statePlatform = 'linux';
    } else {
      this.statePlatform = 'win32';
    }

    this.stateThemeName = String(configures.uiThemeName || 'default');

    // 客户端启动时自动添加一个空白标签页
    if (this.stateTabsize === 0) {
      this.addTabview();
    }
  }

  /**
   * 渲染函数
   *
   * @remarks
   * 构建或者更新标签页窗体、开发者工具和模板列表等前端组件
   */
  render(h: CreateElement) {
    const self = this;

    const tabheadComponents = new Array(this.stateTabsize);
    const tabviewComponents = new Array(this.stateTabsize);
    for (
      let i = 0, j = 0;
      i < this.stateTablist.length && j < this.stateTabsize;
      i++
    ) {
      if (this.stateTablist[i]) {
        tabheadComponents[j] = renderTabhead(h, this.stateTablist[i], i);
        tabviewComponents[j] = renderTabview(h, this.stateTablist[i], i);
        j = j + 1;
      }
    }

    return (
      <article
        class={this.combineCls(
          'viewport',
          `viewport-${this.statePlatform}`,
          `viewport-${this.stateThemeName}`
        )}
      >
        <header>
          <span class={this.combineCls('titlebar')}>
            {this.echo('WINDOW_TITLE')}
          </span>
          <ul class={this.combineCls('tabs')}>
            {tabheadComponents}
            <span
              class={this.combineCls('icon', 'icon-add')}
              title={this.echo('TAB_ADDITION')}
              onClick={(ev: MouseEvent) => this.addTabview()}
            />
          </ul>
          <section class={this.combineCls('controllers')}>
            <span
              class={this.combineCls('icon', 'icon-minimize')}
              title={this.echo('WINDOW_MINIMIZABLE')}
              onClick={(ev: MouseEvent) => this.windowMinimizable()}
            />
            <span
              class={this.combineCls('icon', 'icon-maximize')}
              title={this.echo('WINDOW_MAXIMIZABLE')}
              onClick={(ev: MouseEvent) => this.windowMaximizable()}
            />
            <span
              class={this.combineCls('icon', 'icon-close')}
              title={this.echo('WINDOW_CLOSABLE')}
              onClick={(ev: MouseEvent) => this.windowClosable()}
            />
          </section>
        </header>
        <main>{tabviewComponents}</main>
      </article>
    );

    /**
     * 渲染标签页标题栏
     *
     * @param tabId - 标签页组件ID
     * @param serials - 标签页组件编号
     */
    function renderTabhead(h: CreateElement, tabId: string, serials: number) {
      return (
        <li
          id={self.dataIDPrefix.TAB + tabId}
          class={self.stateSerials === serials ? self.combineCls('active') : ''}
          onMousedown={(ev: MouseEvent) => self.dragTabview(ev, tabId)}
        >
          <img
            class={self.combineCls('icon')}
            src={self.stateTabdata[tabId].favicon || ''}
            onerror="onerror=undefined;src='img/favicon.png';"
          />
          {self.stateTabdata[tabId].title || self.echo('TAB_EMPTY')}
          <span
            class={self.combineCls('icon', 'icon-close')}
            title={self.echo('TAB_CLOSE')}
            onClick={(ev: MouseEvent) => self.delTabviewDialog(tabId)}
          />
        </li>
      );
    }

    /**
     * 渲染标签页页面视图
     *
     * @param tabId - 标签页组件ID
     * @param serials - 标签页组件编号
     */
    function renderTabview(h: CreateElement, tabId: string, serials: number) {
      const configures = self.getSettings();

      if (typeof self.stateTabdata[tabId].dtShow === 'undefined') {
        self.stateTabdata[tabId].dtShow = Number(configures.showDevtool) || 1;
      }

      if (typeof self.stateTabdata[tabId].webview === 'undefined') {
        self.stateTabdata[tabId].webview = (
          <webview
            id={self.dataIDPrefix.WEBVIEW + tabId}
            useragent={self.dataUserAgent + ';UCAP=' + tabId}
            nodeintegration={true}
            plugins={true}
          />
        );
      }

      const { protocol, domain, pathinfo } = self.splitURLStrict(
        self.stateTabdata[tabId].address || ''
      );

      const datalist = new Array(1024);
      for (let i = 0; i < 1024; i++) {
        datalist.push(
          <tr>
            <td>{i}</td>
          </tr>
        )
      }

      return (
        <nav
          class={((): string => {
            const clsTabview = ['tabview', ''];

            switch (self.stateTabdata[tabId].dtShow) {
              case 0:
                clsTabview[1] = 'tabview-dth';
                break;

              case 2:
                clsTabview[1] = 'tabview-dtr';
                break;

              case 3:
                clsTabview[1] = 'tabview-dtl';
                break;

              default:
                clsTabview[1] = 'tabview-dtb';
            }

            return self.combineCls(...clsTabview);
          })()}
          style={{
            display: self.stateSerials === serials ? 'block' : 'none',
            paddingBottom: ((): string => {
              if (self.stateTabdata[tabId].dtShow !== 0) {
                if ([2, 3].indexOf(self.stateTabdata[tabId].dtShow) === -1) {
                  if (typeof self.stateTabdata[tabId].dtHeight === 'number') {
                    return self.stateTabdata[tabId].dtHeight + 'px';
                  }

                  return '40vh';
                }
              }

              return undefined;
            })(),
            paddingRight: ((): string => {
              if (self.stateTabdata[tabId].dtShow === 2) {
                if (typeof self.stateTabdata[tabId].dtWidth === 'number') {
                  return self.stateTabdata[tabId].dtWidth + 'px';
                }

                return '40vw';
              }

              return undefined;
            })(),
            paddingLeft: ((): string => {
              if (self.stateTabdata[tabId].dtShow === 3) {
                if (typeof self.stateTabdata[tabId].dtWidth === 'number') {
                  return self.stateTabdata[tabId].dtWidth + 'px';
                }

                return '40vw';
              }

              return undefined;
            })(),
          }}
        >
          {self.stateTabdata[tabId].webview}
          <dl class={self.combineCls('search')}>
            <dd
              class={self.combineCls(
                'icon',
                'icon-previous',
                !self.stateTabdata[tabId].btnPrevious
                  ? 'icon-disabled'
                  : undefined
              )}
              title={self.echo('TAB_PREVIOUS')}
            />
            <dd
              class={self.combineCls(
                'icon',
                'icon-next',
                !self.stateTabdata[tabId].btnNext ? 'icon-disabled' : undefined
              )}
              title={self.echo('TAB_NEXT')}
            />
            <dd
              class={self.combineCls(
                'icon',
                self.stateTabdata[tabId].code === self.dataTabcode.loading
                  ? 'icon-stop'
                  : 'icon-refresh',
                !self.stateTabdata[tabId].address ? 'icon-disabled' : undefined
              )}
              title={self.echo(
                self.stateTabdata[tabId].code === self.dataTabcode.loading
                  ? 'TAB_STOPPING'
                  : 'TAB_REFRESH'
              )}
            />
            <dt
              class={self.combineCls(
                'searchbox',
                self.stateTabdata[tabId].code === self.dataTabcode.inputting
                  ? 'searchbox-focus'
                  : undefined,
                self.stateTabdata[tabId].code === self.dataTabcode.inputError
                  ? 'searchbox-error'
                  : ''
              )}
            >
              <span
                class={((name?: string): string => {
                  switch (self.stateTabdata[tabId].code) {
                    default:
                      name = 'icon-search';
                  }

                  return self.combineCls('icon', name, 'icon-first');
                })()}
              />
              <input
                type="search"
                id={self.dataIDPrefix.SEARCHBOX + tabId}
                ref={self.dataIDPrefix.SEARCHBOX + tabId}
                tabindex={self.dataIDPrefix.SEARCHBOX + tabId}
                placeholder={self.echo('TAB_PLACEHOLDER')}
                value={self.stateTabdata[tabId].address || ''}
                onFocus={(ev: FocusEvent) => self.focusSearchbox(ev, tabId)}
                v-autofocus={((tabcode = self.stateTabdata[tabId].code) => {
                  if (self.stateSerials === serials) {
                    if (
                      self.stateTabdata[tabId].isfirst !== false ||
                      tabcode === self.dataTabcode.inputting ||
                      tabcode === self.dataTabcode.inputError
                    ) {
                      return true;
                    }
                  }

                  return false;
                })()}
              />
              <span
                class={self.combineCls('icon', 'icon-todo', 'icon-last')}
                onClick={(ev: MouseEvent) => self.submitSearchbox(ev, tabId)}
              />
              <code
                class={self.combineCls('format')}
                onClick={(ev: MouseEvent) => self.focusSearchbox(ev, tabId)}
              >
                {protocol}
                <em>{domain}</em>
                {pathinfo}
              </code>
            </dt>
            <dd
              class={self.combineCls('icon', 'icon-menu')}
              title={self.echo('TAB_REFRESH')}
            />
          </dl>
          <section
            class={self.combineCls('devtool')}
            style={{
              height: ((): string => {
                if (self.stateTabdata[tabId].dtShow !== 0) {
                  if ([2, 3].indexOf(self.stateTabdata[tabId].dtShow) === -1) {
                    if (typeof self.stateTabdata[tabId].dtHeight === 'number') {
                      return self.stateTabdata[tabId].dtHeight + 'px';
                    }
  
                    return '40vh';
                  }
                }
  
                return undefined;
              })(),
              width: ((): string => {
                if ([2, 3].includes(self.stateTabdata[tabId].dtShow)) {
                  if (typeof self.stateTabdata[tabId].dtWidth === 'number') {
                    return self.stateTabdata[tabId].dtWidth + 'px';
                  }
  
                  return '40vw';
                }
  
                return undefined;
              })(),
            }}
          >
            <table class={self.combineCls('devtool-network')}>
              <thead>
                <th class={self.combineCls('devtool-network-id')}>
                  <span
                    class={self.combineCls('selected-all')}
                    onClick={() => {}}
                  />
                </th>
                <th class={self.combineCls('devtool-network-method')}>
                  {self.echo('DEV_METHOD')}
                </th>
                <th class={self.combineCls('devtool-network-url')}>
                  {self.echo('DEV_URL')}
                </th>
                <th class={self.combineCls('devtool-network-status')}>
                  {self.echo('DEV_STATUS')}
                </th>
                <th class={self.combineCls('devtool-network-mime')}>
                  {self.echo('DEV_MIME')}
                </th>
                <th class={self.combineCls('devtool-network-others')}>
                </th>
              </thead>
            </table>
          </section>
        </nav>
      );
    }
  }

  /**
   * 前端组件已挂载
   *
   * @remarks
   * 设置客户端常用快捷键和全局鼠标事件
   */
  mounted() {
    window.addEventListener(
      'keyup',
      (ev: KeyboardEvent) => {
        const keyCode = ev.keyCode || ev.which || ev.charCode;
        const commandOrControl =
          [
            this.dataKeyboards.COMMAND_LEFT,
            this.dataKeyboards.COMMAND_RIGHT,
          ].includes(keyCode) || ev.ctrlKey;
        const tabId = this.stateTablist[this.stateSerials] || '';

        // URL输入框支持回车键
        if (keyCode === this.dataKeyboards.ENTER) {
          const tabcode = this.stateTabdata[tabId].code;

          if (
            tabcode === this.dataTabcode.inputting ||
            tabcode === this.dataTabcode.inputError
          ) {
            this.submitSearchbox(undefined, tabId);
          }

          return;
        }

        // 重新载入标签页
        if (
          (commandOrControl && keyCode === this.dataKeyboards.R) ||
          (commandOrControl && keyCode === this.dataKeyboards.F5)
        ) {
        }

        // 关闭右侧标签页
        if (commandOrControl && keyCode === this.dataKeyboards.I) {
          if (this.stateSerials !== this.firstBackward(this.stateSerials)) {
            return this.delTabviewDialog(tabId, 'RIGHT');
          }

          return;
        }

        // 关闭其他标签页
        if (commandOrControl && keyCode === this.dataKeyboards.O) {
          return this.delTabviewDialog(tabId, 'OTHER');
        }

        // 关闭当前标签页
        if (commandOrControl && keyCode === this.dataKeyboards.C) {
          return this.delTabviewDialog(tabId, 'DEFAULT');
        }

        return false;
      },
      true
    );

    ipcRenderer.on('PROXY', (event: Error, message: string) => {
      const data = JSON.parse(message || '{}');
      const { tabId, Id, Begin } = data;
      const tabdata = this.stateTabdata[tabId] || {};

      if (typeof tabdata.hpData === 'undefined') {
        this.stateTabdata[tabId] = Object.assign(tabdata, {
          hpSerials: -1,
          hpSize: 0,
          hpData: {},
          hpList: new Array<string>(2560),
        });
      }

      // 压缩无效代理数据占位
      if (
        tabdata.hpSize < tabdata.hpList.length &&
        tabdata.hpSerials === tabdata.hpList.length - 1
      ) {

      }

     /*if (typeof tabdata.hpData === 'undefined') {
        this.stateTabdata[tabId] = Object.assign(tabdata, {
          hpSerials: -1,
          hpSize: 0,
          hpData: {},
          hpList: new Array<string>(2560),
        });
      }

      // 压缩
      if (
        tabdata.hpSerials === tabdata.hpList.length - 1 &&
        tabdata.hpSize < tabdata.hpList.length
      ) {

      }*/
    });
  }

  /**
   * 返回给定的语言项在系统语言类型环境下的翻译文本
   *
   * @param name - 语言项名称
   * @returns 翻译文本
   */
  echo(name: string): string {
    return (
      Object(this.dataLocales[this.stateLanguage])[name] ||
      Object(this.dataLocales['cn'])[name] ||
      ''
    );
  }

  /**
   * 将窗体最小化至Windows任务栏
   *
   * @remarks
   * 非Windows7+操作系统采用系统默认的最小化
   */
  windowMinimizable() {
    if (process.platform === 'win32') {
      remote.getCurrentWindow().minimize();
    }
  }

  /**
   * 将窗体非全屏最大化
   *
   * @remarks
   * 非Windows7+操作系统采用系统默认的最大化
   */
  windowMaximizable() {
    if (process.platform === 'win32') {
      remote.getCurrentWindow().maximize();
    }
  }

  /**
   * 将窗体关闭且结束主进程
   *
   * @remarks
   * 非Windows7+操作系统采用系统默认的窗口关闭
   */
  windowClosable() {
    if (process.platform === 'win32') {
      remote.getCurrentWindow().close();
    }
  }

  /**
   * 动态添加一个空白的标签页
   *
   * @param configures - 标签页配置参数
   */
  addTabview(configures: { [name: string]: unknown } = {}) {
    const length = this.stateTablist.length;

    if (this.stateTabsize === length) {
      return window.alert('Limit the number of tabs~');
    }

    // 压缩无效标签页占位
    if (this.stateTablist[length - 1] && this.stateTabsize < length) {
      const data = this.stateTablist[this.stateSerials];

      for (
        let i = 0, j = 0, r = -1;
        i < this.stateTablist.length && j < this.stateTabsize;
        i++
      ) {
        if (!this.stateTablist[i] && r === -1) {
          r = i;
          continue;
        }

        if (this.stateTablist[i]) {
          if (r !== -1) {
            this.stateTablist[r] = this.stateTablist[i];
            this.stateTablist[i] = undefined;
            r = r + 1;
          }

          j = j + 1;
        }
      }

      this.stateSerials = this.stateTablist.indexOf(data);
    }

    // 在当前标签页后添加一个新的空白标签页
    const firstEmpty = this.firstBackward(this.stateSerials, false);
    if (firstEmpty > this.stateSerials) {
      for (let i = firstEmpty - 1; i > this.stateSerials; i--) {
        this.stateTablist[i + 1] = this.stateTablist[i];
      }

      this.stateTablist[this.stateSerials + 1] = this.randomTabId();
      this.stateTabdata[this.stateTablist[this.stateSerials + 1]] = {};
      this.stateSerials = this.stateSerials + 1;
      this.stateTabsize = this.stateTabsize + 1;
    }
  }

  /**
   * 显示确认对话框删除给定的标签页
   *
   * @remarks
   * 删除类型: RIGHT表示删除右侧标签页 OTHER表示删除其他标签页 DEFAULT表示删除该标签页
   *
   * @param tabId - 标签页组件ID
   * @param which - 删除类型
   */
  delTabviewDialog(tabId: string, which?: string) {
    return remote.dialog.showMessageBox(
      remote.getCurrentWindow(),
      {
        type: 'warning',
        title: this.echo('MSG_CONFIRM_TITLE'),
        message: this.echo('MSG_CONFIRM_CLOSETAB'),
        buttons: [this.echo('MSG_BUTTON_YES'), this.echo('MSG_BUTTON_CANCEL')],
      },
      (response: number, checkboxChecked: boolean) => {
        if (response === 0) {
          switch (which) {
            case 'RIGHT':
              return this.delTabviewRight(tabId);

            case 'OTHER':
              return this.delTabviewOther(tabId);

            default:
              return this.delTabview(tabId);
          }
        }
      }
    );
  }

  /**
   * 删除一个给定组件ID的标签页
   *
   * @param tabId - 标签页组件ID
   */
  delTabview(tabId: string) {
    if (this.stateTablist.includes(tabId)) {
      const serials = this.stateTablist.indexOf(tabId);

      this.stateTabdata[tabId] = undefined;
      this.stateTablist[serials] = undefined;
      this.stateTabsize = this.stateTabsize - 1;

      // 已删标签页是当前已选项
      if (this.stateSerials === serials) {
        this.stateSerials = this.firstBackward(this.stateSerials);

        if (this.stateSerials === serials) {
          this.stateSerials = this.firstForward(this.stateSerials);
        }
      }

      // 所有标签页已删除则自动添加一个空白标签页
      if (this.stateTabsize === 0) {
        this.addTabview();
      }
    }
  }

  /**
   * 删除给定标签页右侧的所有标签页
   *
   * @param tabId - 标签页组件ID
   */
  delTabviewRight(tabId: string) {
    for (let i = 0, begin = false; i < this.stateTablist.length; i++) {
      if (this.stateTablist[i]) {
        if (this.stateTablist[i] === tabId && begin === false) {
          begin = true;
          continue;
        }

        if (begin) {
          this.stateTabdata[this.stateTablist[i]] = undefined;
          this.stateTablist[i] = undefined;
          this.stateTabsize = this.stateTabsize - 1;

          // 已删标签页是当前已选项
          if (this.stateSerials === i) {
            this.stateSerials = this.stateTablist.indexOf(tabId);
          }
        }
      }
    }
  }

  /**
   * 删除给定标签页之外的所有标签页
   *
   * @param tabId - 标签页组件ID
   */
  delTabviewOther(tabId: string) {
    for (let i = 0; i < this.stateTablist.length; i++) {
      if (this.stateTablist[i] && this.stateTablist[i] !== tabId) {
        this.stateTabdata[this.stateTablist[i]] = undefined;
        this.stateTablist[i] = undefined;
        this.stateTabsize = this.stateTabsize - 1;

        // 已删标签页是当前已选项
        if (this.stateSerials === i) {
          this.stateSerials = this.stateTablist.indexOf(tabId);
        }
      }
    }
  }

  /**
   * 水平方向拖动标签页标题栏
   *
   * @remarks
   * 仅点击未移动表示切换到给定的标签页
   * 点击鼠标右键表示显示其鼠标右键菜单
   *
   * @param ev - 鼠标事件
   * @param tabId - 标签页组件ID
   */
  dragTabview(ev: MouseEvent, tabId: string) {
    if (ev.buttons === 2) {
      // 标签页标题栏支持鼠标右键菜单
      const menuSerials = this.stateTablist.indexOf(tabId);
      const menuOptions: Electron.MenuItemConstructorOptions[] = [
        {
          label: this.echo('MENU_RELOAD'),
          accelerator: 'CommandOrControl+R',
        },
        {
          label: this.echo('MENU_CLOSE_RIGHT'),
          accelerator: 'CommandOrControl+I',
          enabled: menuSerials !== this.firstBackward(menuSerials),
          click: () => this.delTabviewDialog(tabId, 'RIGHT'),
        },
        {
          label: this.echo('MENU_CLOSE_OTHER'),
          accelerator: 'CommandOrControl+O',
          click: () => this.delTabviewDialog(tabId, 'OTHER'),
        },
        {
          label: this.echo('MENU_CLOSE_THIS'),
          accelerator: 'CommandOrControl+C',
          click: () => this.delTabviewDialog(tabId, 'DEFAULT'),
        },
      ];

      const menu = new remote.Menu();
      for (const option of menuOptions) {
        menu.append(new remote.MenuItem(option));
      }

      ev.preventDefault();
      return menu.popup();
    }

    if (!Array.isArray(this.stateDraggable.tablist) && this.stateTabsize > 1) {
      this.stateDraggable.tablist = new Array(this.stateTabsize);
      this.stateDraggable.mousex = ev.clientX || 0;
      this.stateDraggable.offset = 0;
      this.stateDraggable.width = document.getElementById(
        this.dataIDPrefix.TAB + tabId
      ).offsetWidth;

      // 兼容Windows版本的视图布局
      if (process.platform === 'win32') {
        const firstTab = document.getElementById(
          this.dataIDPrefix.TAB + this.stateTablist[this.firstBackward(-1)]
        );

        if (firstTab) {
          this.stateDraggable.offset = firstTab.offsetLeft;
        }
      }

      for (
        let i = 0, j = 0;
        i < this.stateTablist.length && j < this.stateTabsize;
        i++
      ) {
        if (this.stateTablist[i]) {
          const dom = document.getElementById(
            this.dataIDPrefix.TAB + this.stateTablist[i]
          );

          dom.style.position = 'absolute';
          dom.style.width = `${this.stateDraggable.width}px`;
          dom.style.left =
            this.stateDraggable.width * j + this.stateDraggable.offset + 'px';
          dom.setAttribute('class', '');

          if (this.stateTablist[i] === tabId) {
            this.stateDraggable.active = j;
            this.stateSerials = this.stateTablist.indexOf(tabId);

            dom.style.zIndex = '100001';
            dom.setAttribute('class', this.combineCls('dragging'));
          }

          this.stateDraggable.tablist[j] = {
            id: this.stateTablist[i],
            dom,
            serials: i,
          };
          j = j + 1;
        }
      }

      // 标签页拖动移动
      document.onmousemove = (ev: MouseEvent) => {
        const distance = ev.clientX - this.stateDraggable.mousex,
          active = this.stateDraggable.active,
          id = this.stateDraggable.tablist[active].id,
          dom = document.getElementById(this.dataIDPrefix.TAB + id),
          abs = this.stateDraggable.width * active + this.stateDraggable.offset;

        if (
          (this.stateDraggable.active === 0 && distance < 0) ||
          (this.stateDraggable.active === this.stateTabsize - 1 && distance > 0)
        ) {
          return;
        }

        if (distance < -this.stateDraggable.width / 2) {
          const previous = this.stateDraggable.tablist[active - 1];

          this.stateDraggable.tablist[active].id = previous.id;
          this.stateDraggable.tablist[active].dom = previous.dom;
          this.stateDraggable.tablist[active - 1].id = id;
          this.stateDraggable.tablist[active - 1].dom = dom;
          this.stateDraggable.active = this.stateDraggable.active - 1;
          this.stateDraggable.mousex = ev.clientX;

          this.stateDraggable.tablist[active].dom.style.left = `${abs}px`;
          this.stateDraggable.tablist[active - 1].dom.style.left =
            abs - this.stateDraggable.width + 'px';
          return;
        }

        if (distance > this.stateDraggable.width / 2) {
          const next = this.stateDraggable.tablist[active + 1];

          this.stateDraggable.tablist[active].id = next.id;
          this.stateDraggable.tablist[active].dom = next.dom;
          this.stateDraggable.tablist[active + 1].id = id;
          this.stateDraggable.tablist[active + 1].dom = dom;
          this.stateDraggable.active = this.stateDraggable.active + 1;
          this.stateDraggable.mousex = ev.clientX;

          this.stateDraggable.tablist[active].dom.style.left = `${abs}px`;
          this.stateDraggable.tablist[active + 1].dom.style.left =
            abs + this.stateDraggable.width + 'px';
          return;
        }

        this.stateDraggable.tablist[this.stateDraggable.active].dom.style.left =
          this.stateDraggable.width * this.stateDraggable.active +
          this.stateDraggable.offset +
          distance +
          'px';
      };

      // 标签页拖动结束
      document.onmouseup = (ev: MouseEvent) => {
        if (Array.isArray(this.stateDraggable.tablist)) {
          for (const tab of this.stateDraggable.tablist) {
            tab.dom.setAttribute('class', '');
            tab.dom.setAttribute('style', '');

            if (tab.id === tabId) {
              this.stateSerials = tab.serials;
              tab.dom.setAttribute('class', this.combineCls('active'));
            }

            this.$set(this.stateTablist, tab.serials, tab.id);
          }

          this.stateDraggable = {};
        }

        document.onmousemove = undefined;
      };
    }
  }

  /**
   * 开始在URL输入框填写页面地址
   *
   * @param ev - 聚焦事件或者鼠标事件
   * @param tabId - 标签页组件ID
   */
  focusSearchbox(ev: FocusEvent | MouseEvent, tabId: string) {
    const address = this.inputText(this.dataIDPrefix.SEARCHBOX + tabId);
    const tabcode = this.stateTabdata[tabId].code;

    // 记录页面视图历史状态
    this.stateTabdata[tabId].history = {
      code: tabcode || this.dataTabcode.donothing,
      address,
    };

    if (!address || tabcode !== this.dataTabcode.inputError) {
      this.stateTabdata[tabId].code = this.dataTabcode.inputting;
    }
    this.stateTabdata[tabId].address = address;
    this.$forceUpdate();
  }

  /**
   * 退出在URL输入框填写页面地址
   *
   * @param ev - 聚焦事件或者鼠标事件
   * @param tabId - 标签页组件ID
   */
  blurSearchbox(ev: FocusEvent | MouseEvent, tabId: string) {
    const address = this.inputText(this.dataIDPrefix.SEARCHBOX + tabId);
    const history = this.stateTabdata[tabId].history || {};

    if (this.stateTabdata[tabId].code === this.dataTabcode.inputting) {
      this.stateTabdata[tabId].code = Number(history.code);
      this.stateTabdata[tabId].address = String(history.address || '');

      if (
        this.stateTabdata[tabId].code === this.dataTabcode.donothing ||
        this.stateTabdata[tabId].code === this.dataTabcode.inputting ||
        this.stateTabdata[tabId].code === this.dataTabcode.inputError
      ) {
        this.stateTabdata[tabId].code = this.dataTabcode.donothing;
        this.stateTabdata[tabId].address = address;
      }

      this.$forceUpdate();
    }
  }

  /**
   * 提交在URL输入框填写的页面地址
   *
   * @remarks
   * 回车快捷键调用时**必须**处于输入框可输入状态
   *
   * @param ev - 鼠标事件
   * @param tabId - 标签页组件ID
   */
  submitSearchbox(ev: MouseEvent, tabId: string) {
    const address = this.inputText(this.dataIDPrefix.SEARCHBOX + tabId);
    const dom = document.getElementById(this.dataIDPrefix.SEARCHBOX + tabId);

    // 空白输入无效操作
    if (address.length === 0) {
      this.stateTabdata[tabId].code = this.dataTabcode.inputting;
      this.stateTabdata[tabId].address = '';

      if (dom && typeof dom.focus === 'function') {
        dom.focus();
      }

      return this.$forceUpdate();
    }

    // 非法输入无效字符
    if (this.isURLPossible(address) === false) {
      this.stateTabdata[tabId].code = this.dataTabcode.inputError;
      this.stateTabdata[tabId].address = address;

      if (dom && typeof dom.focus === 'function') {
        dom.focus();
      }

      return this.$forceUpdate();
    }

    const history = this.stateTabdata[tabId].history || {};
    const aformat = this.formatURL(address);

    // 为减少输入框相关误操作 故前后地址相同场景则不作重复请求
    if (history.code === this.dataTabcode.loadSuccess) {
      if (aformat === this.formatURL(String(history.address || ''))) {
        this.stateTabdata[tabId].code = Number(history.code);
        this.stateTabdata[tabId].address = aformat;

        if (dom && typeof dom.blur === 'function') {
          dom.blur();
        }

        return this.$forceUpdate();
      }
    }

    if (dom && typeof dom.blur === 'function') {
      dom.blur();
    }

    this.getWebview(tabId).setAttribute('src', aformat);
    this.stateTabdata[tabId].code = this.dataTabcode.loading;
    this.stateTabdata[tabId].address = aformat;
    this.$forceUpdate();
  }

  /**
   * 返回给定的标签页所对应的标签视图组件
   *
   * @param tabId - 标签页组件ID
   * @returns 标签视图组件
   */
  getWebview(tabId: string): Electron.WebviewTag {
    const webview = document.getElementById(
      this.dataIDPrefix.WEBVIEW + tabId
    ) as Electron.WebviewTag;

    console.log(Date.now(), 'begin');
    if (!this.stateTabdata[tabId].isfirst) {
      this.stateTabdata[tabId].isfirst = true;

      // 设置标签页标签文本 当页面正在加载
      webview.addEventListener(
        'page-title-updated',
        (ev: Electron.PageTitleUpdatedEvent) => {
          console.log(Date.now(), 'page-title-updated', ev);
          this.stateTabdata[tabId].code = this.dataTabcode.loading;
          this.stateTabdata[tabId].title = ev.title || '';
          //this.$forceUpdate()
        }
      );

      // 设置标签页Favicon图标 当页面正在加载
      webview.addEventListener(
        'page-favicon-updated',
        (ev: Electron.PageFaviconUpdatedEvent) => {
          console.log(Date.now(), 'page-favicon-updated', ev);
          this.$forceUpdate();
        }
      );

      // 设置标签页网页地址 当页面正在加载
      webview.addEventListener(
        'load-commit',
        (ev: Electron.LoadCommitEvent) => {
          console.log(Date.now(), 'load-commit', ev);
          this.$forceUpdate();
        }
      );

      // 设置标签页标题文本和正式网页地址 当页面加载成功
      webview.addEventListener('did-finish-load', (ev: Electron.Event) => {
        console.log(Date.now(), 'did-finish-load', ev);
        this.$forceUpdate();
      });

      // 
      webview.addEventListener('did-frame-finish-load', (ev: Electron.DidFrameFinishLoadEvent) => {
        console.log(Date.now(), 'did-frame-finish-load', ev);
        this.$forceUpdate();
      });

      webview.addEventListener('did-start-loading', (ev: Electron.Event) => {
        console.log(Date.now(), 'did-start-loading', ev);
        this.$forceUpdate();
      })

      webview.addEventListener('did-stop-loading', (ev: Electron.Event) => {
        console.log(Date.now(), 'did-stop-loading', ev);
        this.$forceUpdate();
      });

      webview.addEventListener('dom-ready', (ev: Electron.Event) => {
        console.log(Date.now(), 'dom-ready', ev);
        this.$forceUpdate();
      });

    }

    return webview;
  }

  /**
   * 返回由一个或者多个样式名称组合的合并样式名称
   *
   * @param configures - 样式名称列表
   * @returns 合并样式名称
   */
  combineCls(...configures: string[]): string {
    const cls: string[] = new Array();

    for (const name of configures) {
      if (name) {
        cls.push(
          stylesheets[this.dataThemePrefix + name] ||
            this.dataThemePrefix + name
        );
      }
    }

    return cls.join(' ');
  }

  /**
   * 返回在给定标签页后的第一个有效(无效)标签页的编号
   *
   * @param active - 给定标签页编号
   * @param valid - 有效标签页 其中: FALSE表示无效标签页
   * @returns 若不存在则返回原给定的标签页编号
   */
  firstBackward(active: number, valid?: boolean): number {
    for (let i = active + 1; i < this.stateTablist.length; i++) {
      if (valid === false) {
        if (!this.stateTablist[i]) {
          return i;
        }
      } else {
        if (this.stateTablist[i]) {
          return i;
        }
      }
    }

    return active;
  }

  /**
   * 返回在给定标签页前的第一个有效(无效)标签页的编号
   *
   * @param active - 给定标签页编号
   * @param valid - 有效标签页 其中: FALSE表示无效标签页
   * @returns 若不存在则返回原给定的标签页编号
   */
  firstForward(active: number, valid?: boolean): number {
    for (let i = active - 1; i >= 0; i--) {
      if (valid === false) {
        if (!this.stateTablist[i]) {
          return i;
        }
      } else {
        if (this.stateTablist[i]) {
          return i;
        }
      }
    }

    return active;
  }

  /**
   * 返回一个随机的全局唯一的标签页组件ID
   *
   * @returns 标识符字符串
   */
  randomTabId(): string {
    return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();

    function s4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
  }

  /**
   * 返回给定的输入框所输入的有效文本数据
   *
   * @remarks
   * 过滤输入文本的首尾无效字符
   *
   * @param id - 输入框组件ID
   * @returns 输入文本
   */
  inputText(id: string): string {
    return String(Object(this.$refs[id]).value || '')
      .replace(/^\s{1,}/i, '')
      .replace(/\s{1,}$/i, '');
  }

  /**
   * 判断给定的文本数据是一个有效的手工输入的 URL 字符串
   *
   * @remarks
   * 支持简体中文、繁体中文和其他非英语系语言域名地址
   *
   * @param address - URL地址
   * @returns 若格式不合法则返回FALSE
   */
  isURLPossible(address: string): boolean {
    const keywordChars = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.~!*'();:@&=+$,/?#[ ]`;

    // 合法URL地址至少包含一个位于字符串首尾的小数点
    if ([-1, 0, address.length - 1].includes(address.indexOf('.'))) {
      return false;
    }

    // 英语关键词不可出现非法字体
    for (const char of address) {
      if (char.charCodeAt(0) <= 255 && keywordChars.indexOf(char) === -1) {
        return false;
      }
    }

    return true;
  }

  /**
   * 判断给定的文本数据是一个有效的严格语法的 URL 字符串
   *
   * @remarks
   * 支持简体中文、繁体中文和其他非英语系语言域名地址
   *
   * @param address - URL地址
   * @returns 若格式不合法则返回FALSE
   */
  isURLStrict(address: string): boolean {
    try {
      const data = new URL(address);

      if (data) {
        return true;
      }
    } catch (err) {}

    return false;
  }

  /**
   * 拆分一个给定的严格语法的 URL 字符串
   *
   * @param address - 严格语法URL字符串
   * @returns 网络协议、域名及其URI路径
   */
  splitURLStrict(
    address: string
  ): { protocol?: string; domain?: string; pathinfo?: string } {
    if (!this.isURLStrict(address)) {
      return { protocol: address };
    }

    const data = String(address || '').split('://');
    data[0] = data[0] + '://';

    if (/^www\./i.test(data[1])) {
      data[0] = data[0] + 'www.';
      data[1] = data[1].replace(/^www\./i, '');
    }

    if (data[1].includes('/')) {
      const buf = String(data[1] || '').split('/');
      data[1] = buf[0];
      data[2] = buf.join('/').replace(buf[0], '');
    }

    return { protocol: data[0], domain: data[1], pathinfo: data[2] };
  }

  /**
   * 将给定的手工输入的 URL 字符串转换成严格语法格式
   *
   * @param address - URL地址
   * @param possible - 可能是URL地址
   */
  formatURL(address: string, possible?: boolean): string {
    possible =
      typeof possible === 'undefined' ? this.isURLPossible(address) : possible;

    if (possible) {
      if (/(([a-zA-Z0-9]{1,}):\/\/)/i.test(address) === false) {
        if (address.indexOf('://') === 0) {
          address = 'http' + address;
        } else if (address.indexOf('//') === 0) {
          address = 'http:' + address;
        } else if (address.indexOf('/') === 0) {
          address = 'http:/' + address;
        } else {
          address = 'http://' + address.replace(/^:{1,}/g, '');
        }
      }

      return address.replace(/ /g, '%20');
    }

    return address;
  }

  /**
   * 返回所有的系统配置项
   *
   * @returns 配置数据值
   */
  getSettings(): { [name: string]: unknown } {
    try {
      return JSON.parse(
        window.localStorage.getItem(this.dataSettingsName) || '{}'
      );
    } catch (e) {
      if (!process.env.production) {
        console.log(e);
      }
    }

    return {};
  }

  /**
   * 设置一个或者多个给定名称的系统配置项
   *
   * @param configures - 配置项数据
   */
  setSettings(configures: { [name: string]: unknown }) {
    window.localStorage.setItem(
      this.dataSettingsName,
      JSON.stringify(Object.assign(this.getSettings(), configures))
    );
  }

  /**
   * 设置一个给定名称的系统配置项
   *
   * @remarks
   * 00.sysLanguage - 支持语言选项 其中: cn表示简体中文 zh表示繁体中文 en表示国际英语
   * 01.uiThemeName - 客户端UI主题 默认值: default
   * 02.showDevtool - 开发者工具状态 其中: 0表示隐藏 1表示底部 2表示右侧 3表示左侧
   */
  setSetting(field: string, value: unknown) {
    const configures = this.getSettings();
    configures[field] = value;
    window.localStorage.setItem(
      this.dataSettingsName,
      JSON.stringify(configures)
    );
  }
}
if (typeof process.env.production !== 'undefined') {
  Vue.use(VueRouter);
  Vue.directive('autofocus', DevPlatformView.directiveAutoFocus);
  new Vue({
    router: new VueRouter({
      routes: [{ path: '*', component: DevPlatformView }],
    }),
  }).$mount('#a95c34d8f29d429c83f5fb646e79d6095');
}
