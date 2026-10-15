# macOS / Linux 安装说明

适用：macOS 12 以上（Intel / Apple 芯片均可）、常见 Linux 发行版。
Windows 用户请看 [windows-安装说明.md](windows-安装说明.md)。

---

## 一、安装 Node.js（唯一需要装的东西）

**macOS 方式一（推荐，图形化）**：到 <https://nodejs.org/> 下载 **LTS** 的 `.pkg`，双击安装。

**macOS 方式二（已装 Homebrew）**：

```bash
brew install node
```

**Linux（Debian / Ubuntu）**：

```bash
sudo apt update && sudo apt install -y nodejs npm
```

验证：

```bash
node -v      # 显示 v22.x.x 之类即可
```

> 只想写作和看已有批改的话，这步可以跳过 —— 网页本身不需要 Node。

---

## 二、安装与自检

打开「终端」（Terminal），进入项目目录：

```bash
cd ~/Downloads/kaoyan-english-writing     # 换成你的实际路径
```

从网上下载的压缩包解压后，脚本默认**没有执行权限**，先补上：

```bash
chmod +x *.sh
```

然后运行安装脚本：

```bash
./install.sh          # 等价于 node install.js，会顺手补执行权限
```

看到「✅ 自检通过」即可。它会顺便把批改标准安装到 `~/.dsh/skills/`。

<details>
<summary>macOS 提示「无法打开，因为它来自身份不明的开发者」怎么办</summary>

在「访达」里右键该脚本 →「打开」→ 弹窗里再点「打开」，确认一次即可；
或者完全绕开脚本，直接用 Node 执行，例如：

```bash
node install.js
node tools/grade-once.js
```

</details>

---

## 三、打开练习台

```bash
open app/index.html            # macOS
xdg-open app/index.html        # Linux
```

也可以直接在「访达」里双击 `app/index.html`（推荐 Safari / Chrome）。

顶栏显示「题库覆盖 2010—2026」就说明数据正常。

---

## 四、让 AI 批改（三种方式）

### 方式 A：网页按钮（推荐日常使用）

```bash
./start-helper.sh        # 保持这个终端窗口开着
```

回到网页 →「提交作文」页最下方 → 点「**一键批改**」。
停止服务：在窗口里按 `Ctrl + C`，或另开终端执行 `./stop-helper.sh`。

### 方式 B：一次性脚本

```bash
./grade-once.sh
```

它会在本目录启动一次独立的批改进程，处理所有待批改的作文（通常 1—5 分钟）。

### 方式 C：直接在对话里说

打开 DSH（或其他智能体），说一句「**批改待批改作文**」。

> 三种方式都不需要你开着 DSH 界面：它们各自启动一次独立的批改进程，跑完自己退出。

---

## 五、每年更新题库

网页 →「题库」→ 顶部「**一键更新题库**」→ 点按钮。也可以：

```bash
./update-bank.sh 2027                 # 补齐 2027 年
node tools/grade-once.js --update 2027,2028   # 补齐多年
```

更新前会自动备份 `app/data/questions.js` 到 `app/data/backups/`；出问题可在网页点「回退到更新前的备份」。

---

## 六、常见问题

| 现象 | 处理 |
|---|---|
| `Permission denied` | 执行 `chmod +x *.sh`；或用 `node tools/grade-once.js` 绕开 |
| `command not found: node` | Node.js 没装好；装完重开终端，或检查 `which node` |
| 脚本被 Gatekeeper 拦下 | 右键 →「打开」确认一次；或改用 `node xxx.js` 直接运行 |
| `./stop-helper.sh` 提示找不到 lsof | 换用 `Ctrl + C` 关掉服务窗口，或 `pkill -f grade-helper.js` |
| 网页点「一键批改」没反应 | `./start-helper.sh` 的窗口关了；重新运行它 |
| 题库显示 0 道题 | 页面会给诊断（通常是 `questions.js` 里用了不存在的图函数）；跑 `node app/tools/validate.js` 看报错，或用「回退到更新前的备份」 |
| 提交后看不到批改结果 | 确认 `app/data/patches/` 下有 `sub_XXXX.js`；网页点「重新加载数据」 |
| 想换端口 | `node app/tools/grade-helper.js --port 8899`，并把网页里的 `HELPER_URL` 改成同一端口 |

---

## 七、数据与备份

- 全部数据都在项目文件夹内（`app/data/`），复制整个文件夹即完成备份
- 网页里的新提交另存在浏览器 localStorage；换浏览器或清缓存会丢，可用「错题与语言点库 → 导出本机提交 JSON」导出
- **Windows 与 macOS 之间可以直接搬运**：整个文件夹拷过去，运行一次 `node install.js` 即可（项目内全部使用相对路径）
