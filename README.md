# RIEIEK Switch 蓝牙设备监控与逆向控制

本项目针对 **RIEIEK 智能电源/开关设备** 的 BLE（低功耗蓝牙）协议进行了逆向工程，并提供了 **离线 PWA 网页端监控仪表盘** 与 **Python 控制脚本**。

---

## 🌟 特性一览

- **🌐 PWA 离线监控控制台 (`/pwa`)**：
  - 基于浏览器原生的 **Web Bluetooth API**，无需下载 App，即点即连。
  - 支持 **PWA (Progressive Web App)**，预缓存所有静态资源，**完全离线断网亦可正常打开**。
  - 支持安装到手机主屏幕或桌面系统，拥有近似原生 App 的独立窗口体验。
  - 完美适配 **GitHub Pages**，开箱即用。
  - 实时监控电量百分比、充放电电流、设备温度、电源开关状态、无感启动与自动断电。
- **🐍 Python 控制脚本 (`/python`)**：
  - 基于现代异步蓝牙库 `bleak` 构建，适用于树莓派、Linux、Windows、macOS 等环境下的自动化脚本和后台遥测。
- **📖 蓝牙协议逆向整理**：
  - 文档化公开了 RIEIEK 设备的 GATT 服务 UUID、特征值定义、握手交互逻辑与数据解析算法。

---

## 📁 目录结构

```text
RIEIEK_Switch/
├── index.html                 # 根目录重定向页（自动引导至 /pwa/）
├── README.md                  # 项目说明文档
├── pwa/                       # PWA 仪表盘前端工程
│   ├── index.html             # 监控仪表盘页面与 Web 蓝牙逻辑
│   ├── manifest.json          # PWA 清单文件
│   ├── sw.js                  # Service Worker 离线缓存脚本
│   └── icons/                 # PWA 图标资源 (SVG, 192px, 512px, Maskable)
└── python/                    # Python 控制端
    └── rieiek_switch.py       # 基于 bleak 的 Python 蓝牙监听脚本
```

---

## 📡 蓝牙协议逆向解析

### 1. GATT 服务与特征值

| 类型 | UUID | 权限 | 说明 |
| :--- | :--- | :--- | :--- |
| **Service** | `0000fff0-0000-1000-8000-00805f9b34fb` | - | 主服务 |
| **Read / Notify** | `0000fff1-0000-1000-8000-00805f9b34fb` | Notify | 设备上报数据通道 |
| **Write** | `0000fff2-0000-1000-8000-00805f9b34fb` | Write Without Response | 指令与轮询下发通道 |

### 2. 通信握手流程

设备连接后，需要进行双向握手推进状态机，才能稳定接收设备实时遥测数据：

1. **连接建立后**：客户端订阅 `FFF1` 的 Notify 通知；
2. **握手第一步**：客户端延迟 800ms 向 `FFF2` 发送握手包：
   `[0xAA, 0x55, 0x00, 0xA7, 0xAA, 0x00, ..., 0x88]`（共 20 字节）；
3. **设备应答**：设备在 `FFF1` 返回确认（`rx[3] == 0xA7 && rx[4] == 0xAA`）；
4. **握手第二步**：客户端更新包体第四字节为 `0xBB`（187）并发送确认；
5. **进入轮询**：握手完成后，指令码切为 `0x00`（Idle 模式），以约 1 秒为周期定期向 `FFF2` 发送保持心跳与数据拉取包。

### 3. 数据解析算法 (20 字节上报帧)

帧头必须为 `rx[0] == 0xAA` 且 `rx[1] == 0x55`：

- **电量基准与百分比**：
  ```javascript
  const curVal = (rx[5] << 8) | rx[6];
  let volPro = curVal < 180 ? ((curVal - 100) / 40) * 100 : ((curVal - 180) / 80) * 100;
  volPro = Math.max(0, Math.min(100, Math.floor(volPro))); // 0% ~ 100%
  ```
- **实时电流**（16 位符号判断）：
  ```javascript
  const rawCur = (rx[14] << 8) | rx[15];
  const current = (rawCur & 0x8000) ? -1 * (rawCur & 0x7FFF) : (rawCur & 0x7FFF); // 单位：A
  ```
- **设备温度**（16 位带符号补码）：
  ```javascript
  let temp = (rx[17] << 8) | rx[18];
  if (temp & 0x8000) temp -= 65536; // 单位：℃
  ```
- **开关与工作状态**：
  - `rx[16] === 1`：已通电 / 关断
  - `rx[9] === 1`：无感启动 开 / 关
  - `rx[10] === 1`：自动断电 开 / 关

---

## 🚀 PWA 网页端使用与 GitHub Pages 部署

### 方式一：直接托管到 GitHub Pages

1. **推送代码至 GitHub**：
   ```bash
   git add .
   git commit -m "feat: complete RIEIEK switch PWA"
   git push origin main
   ```
2. **启用 GitHub Pages**：
   - 打开仓库的 **Settings** -> **Pages**；
   - **Source** 选择 `Deploy from a branch`；
   - **Branch** 选择 `main`（或 `master`），目录选择 `/ (root)`，点击 **Save**。
3. **访问地址**：
   - 部署完成后直接打开：`https://<你的用户名>.github.io/<仓库名>/pwa/`
   - 根路径 `https://<你的用户名>.github.io/<仓库名>/` 会自动重定向至 `/pwa/`。

### 方式二：本地启动测试

由于 Web Bluetooth 和 Service Worker 要求运行在安全上下文（HTTPS 或 localhost）中，可使用 Python 启动本地测试服务器：

```bash
# 在项目根目录下运行
python3 -m http.server 8080
```
浏览器访问：`http://localhost:8080/pwa/`。

### 📱 离线使用与安装体验
- **首次访问**：加载页面后，Service Worker 会自动静默预缓存所有关键资源。
- **离线访问**：即使设备处于完全断网状态（飞行模式），依然可以秒开网页进行蓝牙通信。
- **安装到桌面/手机**：点击界面顶部的“安装应用到主屏幕”按钮，即可作为独立 App 运行。

---

## 🐍 Python 客户端使用指南

### 1. 安装依赖

需要 Python 3.8+ 及异步蓝牙库 `bleak`：

```bash
pip install bleak
```

### 2. 运行脚本

确保计算机蓝牙已开启，运行：

```bash
python python/rieiek_switch.py
```

脚本将自动扫描名称前缀为 `RIEIEK` 的设备，建立 GATT 连接并实时打印电量基准与温度遥测数据。

---

## ⚠️ 兼容性与使用注意事项

1. **浏览器环境要求**：
   - **推荐使用**：Google Chrome、Microsoft Edge、Opera、Android Chrome。
   - **iOS / iPadOS 说明**：Apple Safari 原生未开放 Web Bluetooth API。如需在 iPhone/iPad 上使用，可下载支持 Web 蓝牙的浏览器（例如 **WebBLE** 或 **Bluefy**）。
   - **安全上下文**：Web Bluetooth 与 Service Worker 仅在 **HTTPS** 协议或 `localhost` 下生效。
2. **系统蓝牙权限**：
   - Windows 10/11、macOS、Linux 下请确保系统已赋予浏览器或 Python 访问系统蓝牙的权限。

---

## 📄 开源许可

本项目遵循 MIT 许可证。仅供逆向研究与学习交流使用。
