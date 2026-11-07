# RIEIEK Switch 蓝牙设备监控与逆向控制

本项目针对 **RIEIEK 智能电源/断电开关设备** 的 BLE（低功耗蓝牙）协议进行了逆向工程，并提供了 **离线 PWA 网页端监控控制台** 与 **Python 控制脚本**。

---

## 🌟 特性一览

- **🌐 PWA 离线监控控制台 (`/pwa`)**：
  - 基于浏览器原生的 **Web Bluetooth API**，无需下载原生 App，即点即连。
  - 支持 **PWA (Progressive Web App)**，预缓存核心静态资源，**完全离线断网亦可秒开**。
  - 支持安装到手机主屏幕或桌面系统，拥有原生 App 般的独立窗口体验与安全区域适配。
  - **功能完整**：支持实时电瓶电压显示、电量进度条、实时电流（正确缩放 /100）、启动电流、实时温度（正确缩放 /10）、启动电压。
  - **控制交互**：
    - 通电 / 震动控制 (Sway) / 断电 三模态按键；
    - 断电电压阈值滑动条动态调节；
    - 自动断电与无感连接 (手机靠近自动通电) 开关配置；
  - **中英文多语言**：完全按照原版字典（Chinese/English）支持一键双语切换。
  - 完美适配 **GitHub Pages**，开箱即用。
- **🐍 Python 控制脚本 (`/python`)**：
  - 基于现代异步蓝牙库 `bleak` 构建，支持自动搜寻设备、握手与精准数值缩放打印。
- **📖 蓝牙协议逆向整理**：
  - 文档化公开了 RIEIEK 设备的 GATT 服务 UUID、特征值定义、控制指令码与数据换算算法。

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
│   ├── origin.js              # 原版 App 逆向提取出的逻辑参考
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
| **Read / Notify** | `0000fff1-0000-1000-8000-00805f9b34fb` | Notify | 设备上报数据通道 (20字节) |
| **Write** | `0000fff2-0000-1000-8000-00805f9b34fb` | Write Without Response | 指令与轮询下发通道 (20字节) |

### 2. 通信握手流程

设备连接后，需要进行双向握手推进状态机，才能稳定接收设备实时遥测数据：

1. **连接建立后**：客户端订阅 `FFF1` 的 Notify 通知；
2. **握手第一步**：客户端延迟 800ms 向 `FFF2` 发送握手包：
   `[0xAA, 0x55, 0x00, 0xA7, 0xAA, 0x00, ..., 0x88]`（共 20 字节）；
3. **设备应答**：设备在 `FFF1` 返回确认（`rx[3] == 0xA7 && rx[4] == 0xAA`）；
4. **握手第二步**：客户端更新包体第四字节为 `0xBB`（187）并发送确认；
5. **进入轮询**：握手完成后，指令码切为 `0x00`（Idle 模式），以约 1 秒为周期定期向 `FFF2` 发送保持心跳与数据拉取包。

### 3. 控制指令下发协议

帧格式为 20 字节，固定帧头 `[0xAA, 0x55]`, 尾部 `0x88`：

- **模式控制指令 (`tx[3] = 163 / 0xA3`)**：
  - **通电 / ON (`onBtn1Clicked`)**：`tx[3] = 163`, `tx[4] = 8`
  - **震动控制 / Sway (`onBtn2Clicked`)**：`tx[3] = 163`, `tx[4] = 4`
  - **断电 / OFF (`onBtn3Clicked`)**：`tx[3] = 163`, `tx[4] = 2`
- **参数配置指令 (`tx[3] = 161 / 0xA1`)**：
  - 用于设置断电电压阈值、自动断电开关及无感连接：
    - `tx[5] = (offValInfo >> 8) & 0xFF`（断电阈值高字节）
    - `tx[6] = offValInfo & 0xFF`（断电阈值低字节，实际电压 = `offValInfo / 10`）
    - `tx[7] = isAutoPowerOn ? 1 : 0`（无感连接开关）
    - `tx[8] = isAutoPowerOff ? 1 : 0`（自动断电开关）

### 4. 数据解析与数值缩放规则 (20 字节上报帧)

帧头必须为 `rx[0] == 0xAA` 且 `rx[1] == 0x55`，尾部为 `rx[19] == 0x88`：

- **电瓶总电压与百分比**：
  ```javascript
  const curVal = (rx[5] << 8) | rx[6];
  const voltage = (curVal / 10).toFixed(1); // 实际电压，单位：V
  let volPro = curVal < 180 ? ((curVal - 100) / 40) * 100 : ((curVal - 180) / 80) * 100;
  volPro = Math.max(0, Math.min(100, Math.floor(volPro))); // 0% ~ 100%
  ```
- **实时电流**（**需除以 100 缩放**）：
  ```javascript
  const rawCur = (rx[14] << 8) | rx[15];
  const cur = (rawCur & 0x8000) ? -1 * (rawCur & 0x7FFF) : (rawCur & 0x7FFF);
  const currentAmp = (cur / 100).toFixed(2); // 实际电流，单位：A
  ```
- **设备温度**（**需除以 10 缩放**）：
  ```javascript
  let temp = (rx[17] << 8) | rx[18];
  if (temp & 0x8000) temp -= 65536;
  const tempCelsius = (temp / 10).toFixed(0); // 实际温度，单位：℃
  ```
- **启动电流 (`startCur`)**：
  - 数据位于 `(rx[12] << 8) | rx[13]`。
  - 在 325~330 时显示 `>320A`，590~700 时显示 `>500A`，其余直接格式化补零。
- **启动电压 (`startVol`)**：
  - 轮询触发 `tx[3] = 1` 时由设备返回 `(rx[5] << 8) | rx[6]`，除以 100 显示为如 `12.20 V`。
- **状态与开关标志**：
  - `rx[16] === 1`：接通 / 断开
  - `rx[9] === 1`：无感连接已开启
  - `rx[10] === 1`：自动断电已开启
  - `rx[2]`：工作模式 (`curMode`：1 手动通电, 2 震动模式, 3 断电)

---

## 🚀 PWA 网页端使用与 GitHub Pages 部署

### 方式一：直接托管到 GitHub Pages

1. **推送代码至 GitHub**：
   ```bash
   git add .
   git commit -m "feat: complete RIEIEK switch PWA with controls & scaling"
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

---

## 🐍 Python 客户端使用指南

### 1. 安装依赖

```bash
pip install bleak
```

### 2. 运行脚本

```bash
python python/rieiek_switch.py
```

脚本将自动扫描名称前缀为 `RIEIEK` 的设备，建立 GATT 连接并实时打印带有正确缩放的电压、电流、温度和接通状态。

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
