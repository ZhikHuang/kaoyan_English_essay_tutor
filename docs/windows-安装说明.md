# Windows 安装说明

适用：Windows 10 / 11。全程只需一次安装，之后每天就是「打开网页 → 写 → 批改」。

---

## 一、安装 Node.js（**已经装了 DSH 的话可以跳过**）

1. 打开 <https://nodejs.org/>，下载 **LTS** 版本的 `.msi` 安装包
2. 一路「下一步」安装完成
3. 验证：按 `Win + R` 输入 `cmd` 回车，在窗口里输入

   ```
   node -v
   ```

   能显示版本号（如 `v22.x.x`）就成功了。

> 只想写作和看已有批改的话，这步可以跳过 —— 网页本身不需要 Node。
> **装了 DSH 的用户也建议跳过**：`install.cmd`、`一键批改.cmd`、`start-helper.cmd` 会自己找到 DSH 自带的 node（查找顺序：PATH → DSH 安装目录 → 各盘符 → 注册表卸载项），不必额外装 Node.js。

---

## 二、安装与自检

1. 把项目文件夹解压到合适的位置 —— **只放 C 盘就用用户目录**（`%USERPROFILE%\kaoyan-english-writing\`，「此电脑 → C 盘 → 用户 → 你的名字」下面），**有 D 盘就用 `D:\kaoyan-english-writing\`**；不要放 `Program Files`、不要放 OneDrive 同步的桌面/文档、不要放移动硬盘（完整理由见 README 第 1 节「第 0 步」）。
2. **双击 `install.cmd`**（推荐，自动找 node），或按住 `Shift` + 右键 →「在此处打开 PowerShell 窗口」后执行：

   ```powershell
   node install.js
   ```

看到「✅ 批改依赖可用：…dsh.cmd」即可（若提示找不到 `dsh.cmd`，见第六节；不影响网页写作与查看）。它会顺便把批改标准安装到你的 DSH 用户目录（`%USERPROFILE%\.dsh\skills\`）。

---

## 三、打开练习台

双击 `app\index.html`（建议用 Edge 或 Chrome 打开）。

顶栏显示「数据已加载 · 补丁 0 个」即说明数据正常（题库覆盖情况在「题库 → 一键更新题库」面板里看）。考试日期默认未设置 —— 想设就对 AI 说一句，或自己改 `app\data\state.js` 里的 `examDate`。

---

## 四、让 AI 批改（三种方式）

### 方式 A：网页按钮（推荐日常使用）

1. 双击 `start-helper.cmd`，会出现一个标题为「辅助服务」的窗口 ——**保持它开着**
2. 回到网页，在「提交作文」页最下方点「一键批改」（网页会把本机提交同步成 `app\data\pending_submissions.json`，AI 就能读到）

### 方式 B：一次性脚本

双击 `一键批改.cmd`，等窗口跑完（通常 1—5 分钟），它会自动处理所有待批改的作文。

### 方式 C：直接在对话里说

打开 DSH（或其他智能体），说一句「**批改待批改作文**」。

> 如果 AI 说「没有待批改的作文」：说明那份提交还只存在浏览器本地。先按方式 A（双击 `start-helper.cmd`）回到网页点一次「一键批改」，或点「导出本机提交 JSON」另存为 `app\data\pending_submissions.json`，再让 AI 批改；也可以干脆把作文直接粘到对话里。

> 三种方式都不需要你开着 DSH 界面：它们各自启动一次独立的批改进程，跑完自己退出。

---

## 五、每年更新题库

网页 →「题库」→ 顶部「**一键更新题库**」→ 点按钮。也可以：

- 双击 `更新题库.cmd`，按提示输入年份（如 `2027`）
- 或终端执行 `node tools\grade-once.js --update 2027`

更新前会自动备份 `app\data\questions.js` 到 `app\data\backups\`；出问题可在网页点「回退到更新前的备份」。

---

## 六、常见问题

| 现象 | 处理 |
|---|---|
| `node` 不是内部或外部命令 | Node.js 没装好（或用的是 DSH 自带运行时，可让 DSH 的会话跑命令） |
| `一键批改.cmd` 窗口停住 | 它会停在窗口里显示原因（多半是找不到 dsh 或 node）；把内容发给 AI 看 |
| 网页点「一键批改」没反应 | `start-helper.cmd` 的窗口关了；重新双击它 |
| 题库显示 0 道题 | 页面会给诊断（通常是 `questions.js` 里用了不存在的图函数）；跑 `node app\tools\validate.js` 看报错，或点「回退到更新前的备份」 |
| 提交后看不到批改结果 | 确认 `app\data\patches\` 下有 `sub_XXXX.js`；然后在网页点「重新加载数据」 |
| AI 说「没有待批改的作文」 | 提交还在浏览器本机：先双击 `start-helper.cmd`，回网页点一次「一键批改」（会自动同步成 `app\data\pending_submissions.json`），或点「导出本机提交 JSON」另存为同名文件 |
| 想换端口 | `node app\tools\grade-helper.js --port 8899`，并把网页里的 `HELPER_URL` 改成同一端口 |

---

## 七、数据与备份

- 全部数据都在项目文件夹内（`app\data\`），复制整个文件夹即完成备份
- 网页里的新提交另存在浏览器 localStorage；换浏览器或清缓存会丢。只要辅助服务（`start-helper.cmd`）在线，点过「一键批改」后就会同步到 `app\data\pending_submissions.json`；也可以随时用「错题与语言点库 → 导出本机提交 JSON」导出备份
- 迁移到另一台电脑（含 macOS）：整个文件夹拷过去，运行一次 `node install.js` 即可
