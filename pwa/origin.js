if (
  ("undefined" == typeof Promise ||
    Promise.prototype.finally ||
    (Promise.prototype.finally = function (e) {
      const t = this.constructor;
      return this.then(
        (i) => t.resolve(e()).then(() => i),
        (i) =>
          t.resolve(e()).then(() => {
            throw i;
          }),
      );
    }),
  "undefined" != typeof uni && uni && uni.requireGlobal)
) {
  const e = uni.requireGlobal();
  ((ArrayBuffer = e.ArrayBuffer),
    (Int8Array = e.Int8Array),
    (Uint8Array = e.Uint8Array),
    (Uint8ClampedArray = e.Uint8ClampedArray),
    (Int16Array = e.Int16Array),
    (Uint16Array = e.Uint16Array),
    (Int32Array = e.Int32Array),
    (Uint32Array = e.Uint32Array),
    (Float32Array = e.Float32Array),
    (Float64Array = e.Float64Array),
    (BigInt64Array = e.BigInt64Array),
    (BigUint64Array = e.BigUint64Array));
}
(uni.restoreGlobal &&
  uni.restoreGlobal(
    Vue,
    weex,
    plus,
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval,
  ),
  (function (e) {
    "use strict";
    function t(e, t, ...i) {
      uni.__log__
        ? uni.__log__(e, t, ...i)
        : console[e].apply(console, [...i, t]);
    }
    const i = (
        (t, i = 0) =>
        (i, a = e.getCurrentInstance()) => {
          !e.isInSSRComponentSetup && e.injectHook(t, i, a);
        }
      )("onLoad", 2),
      a = (e, t) => {
        const i = e.__vccOpts || e;
        for (const [a, n] of t) i[a] = n;
        return i;
      };
    const n = a(
        {
          data: () => ({
            statusBarHeight: 0,
            dwidth: "width:1%",
            volPro: 0,
            updateCnt: 0,
            offValInfo: 120,
            curVal: 120,
            curValTmp: 120,
            curValInfo: "12",
            midPowerOffVal: 133,
            isAutoPowerOn: !0,
            isAutoPowerOff: !0,
            temperature: 250,
            startVol: 10,
            startVolTmp: 0,
            startCur: 0,
            curCur: 100,
            isPowerOn: !1,
            lastIsPowerOn: !1,
            isPowerOnInfo: "断开",
            needUpdate: !1,
            cmdIdle: 0,
            cmdAskMode: 167,
            allowSend: !0,
            timerId: 0,
            infoTmp: "",
            titleInfo: "正在连接",
            curMode: 1,
            screenHeight: "",
            isAutoOff: !1,
            isAutoOn: !1,
            btn1Type: "primary",
            btn2Type: "normal",
            btn3Type: "normal",
            permissionArr: [
              "android.permission.ACCESS_FINE_LOCATION",
              "android.permission.BLUETOOTH",
              "android.permission.BLUETOOTH_ADMIN",
            ],
            osVer: 31,
            devId: "",
            devName: "RIEIEK_nul",
            serUuid: "0000FFF0-0000-1000-8000-00805F9B34FB",
            rUuid: "0000FFF1-0000-1000-8000-00805F9B34FB",
            wUuid: "0000FFF2-0000-1000-8000-00805F9B34FB",
            tx: [
              170, 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 136,
            ],
            rx: [
              170, 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 136,
            ],
            language: 1,
            langInfo: "English",
            disInfo: {},
            keepFlag: !1,
            minOffVal: 50,
            maxOffVal: 137,
            Chinese: {
              a1: "智能电瓶断电开关",
              a2: "蓝牙状态:",
              a3: "正在连接",
              a4: "接通状态:",
              a5: "断开",
              a6: "电瓶状态",
              a7: "实时电流:",
              a8: "启动电流:",
              a9: "实时温度:",
              a10: "启动电压:",
              a11: "断电电压:",
              a12: "开启自动断电:",
              a13: "(开启后当电压低于设定值后，自动断开连接)",
              a14: "开启无感连接:",
              a15: "(开启后手机靠近、自动通电，需要配对好蓝牙)",
              a16: "通电",
              a17: "震动控制",
              a18: "断电",
              a19: "正在搜索",
              b1: "将请求蓝牙权限以连接外围设备!",
              b2: "蓝牙连接已断开",
              b3: "您永久拒绝了权限，请手动在系统设置里打开",
              b4: "需要允许权限以连接设备",
              b5: "正在加载",
              b6: "连接失败",
              b7: "已连接",
              b8: "接通",
              b9: "断开",
              cancel: "取消",
              confirm: "确定",
            },
            English: {
              a1: "Smart Battery Switch",
              a2: "Bluetooth:",
              a3: "Conn..",
              a4: "State:",
              a5: "OFF",
              a6: "Battery Info",
              a7: "Current:",
              a8: "StartCur:",
              a9: "Temp:",
              a10: "StartVol:",
              a11: "Off Voltage:",
              a12: "Auto Power Off:",
              a13: "(Voltage is below the set value,will power off)",
              a14: "Auto Power On:",
              a15: "(Bluetooth connectted,will power on)",
              a16: "ON",
              a17: "Sway",
              a18: "OFF",
              a19: "Searching",
              b1: "will request permission!",
              b2: "Bluetooth disconnected",
              b3: "Open the permission in the setting",
              b4: "need permission to conncect device",
              b5: "Loading",
              b6: "Failed",
              b7: "ON",
              b8: "ON",
              b9: "OFF",
              cancel: "Cancel",
              confirm: "OK",
            },
          }),
          onLoad() {
            let e = this;
            ((this.screenHeight = uni.getSystemInfoSync().windowHeight),
              (this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight),
              (this.dwidth = "width:" + this.volPro + "%"));
            const i = getApp();
            t("log", "at pages/index/index.vue:214", "我是ONLOAD");
            const a = uni.getStorageSync("useLan");
            (null == a || "" == a
              ? uni.getSystemInfo({
                  success: (a) => {
                    (t("log", "at pages/index/index.vue:234", a.language),
                      "en-US" == a.language
                        ? ((e.disInfo = e.English),
                          uni.setStorageSync("useLan", "English"),
                          (i.globalData.language = "English"))
                        : ((e.disInfo = e.Chinese),
                          uni.setStorageSync("useLan", "Chinese"),
                          (i.globalData.language = "Chinese")));
                  },
                })
              : "Chinese" === a
                ? ((i.globalData.language = "Chinese"),
                  (this.disInfo = this.Chinese))
                : "English" === a &&
                  ((i.globalData.language = "English"),
                  (this.disInfo = this.English)),
              (this.titleInfo = this.disInfo.a3),
              (this.isPowerOnInfo = this.disInfo.a5),
              uni.getSystemInfo({
                success(i) {
                  ((e.osVer = i.osAndroidAPILevel),
                    i.osAndroidAPILevel >= 31 &&
                      (t("log", "at pages/index/index.vue:273", "版本大于31"),
                      e.permissionArr.push(
                        "android.permission.BLUETOOTH_SCAN",
                        "android.permission.BLUETOOTH_CONNECT",
                      )));
                },
              }),
              uni.getStorageSync("firstBoot")
                ? this.checkPermission()
                : uni.showModal({
                    title: e.disInfo.b1,
                    cancelText: e.disInfo.cancel,
                    confirmText: e.disInfo.confirm,
                    success: (i) => {
                      i.confirm
                        ? this.checkPermission()
                        : i.cancel &&
                          (t(
                            "log",
                            "at pages/index/index.vue:311",
                            "取消了申请权限",
                          ),
                          (e.infoTmp = "请同意蓝牙权限申请"));
                    },
                  }),
              uni.onBLEConnectionStateChange((e) => {
                if (0 == e.connected) {
                  ((this.isConnected = !1),
                    (this.titleInfo = this.disInfo.a19));
                  let e = this;
                  uni.showModal({
                    title: e.disInfo.b2,
                    showCancel: !1,
                    success(t) {
                      t.confirm &&
                        (e.connDevice(),
                        uni.showLoading({ mask: !0, title: e.disInfo.a3 }));
                    },
                  });
                }
              }),
              uni.onBLECharacteristicValueChange((e) => {
                let t = new Uint8Array(e.value);
                170 == t[0] &&
                  85 == t[1] &&
                  20 == t.length &&
                  136 == t[19] &&
                  ((this.rx = t), this.processData());
              }));
          },
          onShow() {
            const e = getApp();
            (t("log", "at pages/index/index.vue:360", "我是ONSHOW"),
              e.globalData.needReconn &&
                ((e.globalData.needReconn = !1),
                uni.closeBLEConnection({
                  deviceId: this.devId,
                  success() {},
                })));
            const i = uni.getStorageSync("useLan");
            (t("log", "at pages/index/index.vue:371", "useLan = " + i),
              null == i || "" == i
                ? (uni.setStorageSync("useLan", "Chinese"),
                  (this.disInfo = this.Chinese),
                  (e.globalData.language = "Chinese"))
                : "Chinese" === i
                  ? ((e.globalData.language = "Chinese"),
                    (this.disInfo = this.Chinese))
                  : "English" === i &&
                    ((e.globalData.language = "English"),
                    (this.disInfo = this.English)),
              (this.titleInfo = this.disInfo.a3),
              (this.isPowerOnInfo = this.disInfo.a5));
          },
          methods: {
            onIsAutoDisChange(e) {
              (t(
                "log",
                "at pages/index/index.vue:392",
                "改变" + e.detail.value,
              ),
                (this.allowSend = !1),
                (this.tx[3] = 161),
                (this.keepFlag = !0),
                (this.isAutoPowerOff = e.detail.value),
                (this.isAutoOff = this.isAutoPowerOff),
                (this.tx[5] = (65280 & this.offValInfo) << 8),
                (this.tx[6] = 255 & this.offValInfo),
                (this.tx[7] = this.isAutoPowerOn),
                (this.tx[8] = this.isAutoPowerOff),
                (this.allowSend = !0));
              uni.showLoading({ mask: !0, title: this.disInfo.b5 });
            },
            onIsAutoOnChange(e) {
              (t(
                "log",
                "at pages/index/index.vue:410",
                "改变" + e.detail.value + ",isAutoOn = " + this.isAutoOn,
              ),
                (this.allowSend = !1),
                (this.keepFlag = !0),
                (this.tx[3] = 161),
                (this.isAutoPowerOn = e.detail.value),
                (this.tx[5] = (65280 & this.offValInfo) << 8),
                (this.tx[6] = 255 & this.offValInfo),
                this.isAutoPowerOn ? (this.tx[7] = 1) : (this.tx[7] = 0),
                (this.tx[8] = this.isAutoPowerOff),
                (this.allowSend = !0));
              (uni.showLoading({ mask: !0, title: this.disInfo.b5 }),
                t("log", "at pages/index/index.vue:429", "无感被点击."));
            },
            onSliderChanged(e) {
              this.offValInfo = e.detail.value;
              ((this.allowSend = !1),
                (this.keepFlag = !0),
                (this.tx[3] = 161),
                (this.tx[5] = (65280 & this.offValInfo) >> 8),
                (this.tx[6] = 255 & this.offValInfo),
                (this.tx[7] = this.isAutoPowerOn),
                (this.tx[8] = this.isAutoPowerOff),
                (this.allowSend = !0),
                uni.showLoading({ mask: !0, title: this.disInfo.b5 }));
            },
            onSliderChanging(e) {
              this.offValInfo = e.detail.value;
            },
            onBtn1Clicked() {
              ((this.allowSend = !1),
                (this.tx[3] = 163),
                (this.tx[4] = 8),
                (this.keepFlag = !0),
                (this.allowSend = !0));
            },
            onBtn2Clicked() {
              ((this.allowSend = !1),
                (this.tx[3] = 163),
                (this.tx[4] = 4),
                (this.keepFlag = !0),
                (this.allowSend = !0),
                t("log", "at pages/index/index.vue:475", "按键2 按下"));
            },
            onBtn3Clicked() {
              ((this.allowSend = !1),
                (this.tx[3] = 163),
                (this.tx[4] = 2),
                (this.keepFlag = !0),
                (this.allowSend = !0),
                (this.btn1Type = "normal"),
                (this.btn2Type = "normal"),
                (this.btn3Type = "primary"));
            },
            checkPermission() {
              plus.android.requestPermissions(this.permissionArr, (e) => {
                t("log", "at pages/index/index.vue:492", e);
                let i = this;
                (e.deniedAlways.length >= 1
                  ? uni.showModal({
                      showCancel: !1,
                      title: i.disInfo.b3,
                      success() {},
                    })
                  : e.deniedPresent.length >= 1
                    ? uni.showModal({
                        showCancel: !1,
                        title: i.disInfo.b4,
                        success() {
                          i.checkPermission();
                        },
                      })
                    : (t(
                        "log",
                        "at pages/index/index.vue:516",
                        "拥有权限，开始连接",
                      ),
                      uni.setStorageSync("firstBoot", 1),
                      i.connDevice()),
                  t(
                    "log",
                    "at pages/index/index.vue:520",
                    e.granted.length +
                      "," +
                      e.deniedPresent.length +
                      "," +
                      e.deniedAlways.length,
                  ));
              });
            },
            connDevice() {
              let e = this;
              uni.openBluetoothAdapter({
                success() {
                  (t("log", "at pages/index/index.vue:529", "成功"),
                    t("log", "at pages/index/index.vue:530", "进入查找"),
                    e.getDevice()
                      ? (t(
                          "log",
                          "at pages/index/index.vue:532",
                          "找到了相关设备",
                        ),
                        uni.createBLEConnection({
                          deviceId: e.devId,
                          success() {
                            (t(
                              "log",
                              "at pages/index/index.vue:537",
                              "连接成功",
                            ),
                              (e.isConnected = !0),
                              setTimeout(() => {
                                uni.notifyBLECharacteristicValueChange({
                                  deviceId: e.devId,
                                  serviceId: e.serUuid,
                                  characteristicId: e.rUuid,
                                  state: !0,
                                  success() {
                                    (t(
                                      "log",
                                      "at pages/index/index.vue:549",
                                      "订阅成功",
                                    ),
                                      uni.showLoading({
                                        mask: !0,
                                        title: e.disInfo.b5,
                                      }),
                                      setTimeout(e.begin, 800));
                                  },
                                  fail(e) {
                                    t(
                                      "log",
                                      "at pages/index/index.vue:559",
                                      "订阅失败",
                                    );
                                  },
                                });
                              }, 500));
                          },
                          fail(i) {
                            (uni.showToast({ title: e.disInfo.b6 }),
                              t(
                                "log",
                                "at pages/index/index.vue:570",
                                "连接失败",
                              ),
                              t("log", "at pages/index/index.vue:571", i));
                          },
                        }))
                      : (t(
                          "log",
                          "at pages/index/index.vue:576",
                          "没有连接设备",
                        ),
                        setTimeout(e.connDevice, 1e3)));
                },
                fail() {
                  (t("log", "at pages/index/index.vue:582", "蓝牙未打开"),
                    setTimeout(e.connDevice, 1e3));
                },
              });
            },
            getDevice() {
              var e = getApp();
              e.globalData.myDevs = [];
              var i = plus.android.runtimeMainActivity(),
                a = plus.android.importClass("android.content.Context"),
                n = i.getSystemService(a.BLUETOOTH_SERVICE);
              plus.android.importClass(n);
              var s = n.getAdapter();
              plus.android.importClass(s);
              var o = s.getBondedDevices();
              plus.android.importClass(o);
              var l = o.iterator();
              for (plus.android.importClass(l); l.hasNext(); ) {
                var r = l.next();
                plus.android.importClass(r);
                let i = r.getName();
                -1 != i.indexOf("RIEIEK_Switch") &&
                  r.isConnected() &&
                  (t("log", "at pages/index/index.vue:609", "找到相关设备"),
                  (this.devId = r.getAddress()),
                  (this.devName = i.slice(0, 7) + i.slice(13, 16)),
                  e.globalData.myDevs.push({
                    devName: this.devName,
                    devId: this.devId,
                  }));
              }
              if (0 != e.globalData.myDevs.length) {
                if (
                  (t(
                    "log",
                    "at pages/index/index.vue:619",
                    "找到了2个设备" + e.globalData.myDevs.length,
                  ),
                  "" === e.globalData.selectName)
                )
                  ((e.globalData.selectName = this.devName),
                    t("log", "at pages/index/index.vue:623", "selectName为空"));
                else if (
                  "" != e.globalData.selectName &&
                  e.globalData.selectName != this.devName
                ) {
                  t(
                    "log",
                    "at pages/index/index.vue:626",
                    "名字不匹配" + this.devName,
                  );
                  for (let i = 0; i < e.globalData.myDevs.length; i++)
                    e.globalData.myDevs[i].devName ===
                      e.globalData.selectName &&
                      (t(
                        "log",
                        "at pages/index/index.vue:629",
                        "更改好的名字" + this.devName,
                      ),
                      (this.devName = e.globalData.myDevs[i].devName),
                      (this.devId = e.globalData.myDevs[i].devId));
                } else
                  ("" != e.globalData.selectName
                    ? t(
                        "log",
                        "at pages/index/index.vue:637",
                        "selectName不为空",
                      )
                    : t(
                        "log",
                        "at pages/index/index.vue:639",
                        "selectName为空",
                      ),
                    e.globalData.selectName != this.devName
                      ? t(
                          "log",
                          "at pages/index/index.vue:641",
                          "选中的名字不等于当前名字",
                        )
                      : (t(
                          "log",
                          "at pages/index/index.vue:644",
                          "选中的名字======当前的名字",
                        ),
                        t(
                          "log",
                          "at pages/index/index.vue:645",
                          "选中的" + e.globalData.selectName,
                        ),
                        t(
                          "log",
                          "at pages/index/index.vue:646",
                          "当前的名字" + this.devName,
                        )),
                    t("log", "at pages/index/index.vue:648", "其他"));
                return !0;
              }
              return !1;
            },
            begin() {
              (t("log", "at pages/index/index.vue:655", "BEGIN"),
                (this.titleInfo = this.disInfo.b7),
                (this.allowSend = !0),
                (this.tx[3] = this.cmdAskMode),
                (this.tx[4] = 170),
                this.sendData());
            },
            sendData() {
              if (
                (161 == this.tx[3] &&
                  t(
                    "log",
                    "at pages/index/index.vue:667",
                    "发送调用" +
                      this.tx[3] +
                      ",tx[7]=" +
                      this.tx[7] +
                      ",tx[8]=" +
                      this.tx[8],
                  ),
                this.allowSend)
              ) {
                (clearTimeout(this.timerId),
                  (this.timerId = setTimeout(this.onTimerOut, 1e3)));
                let e = this;
                uni.writeBLECharacteristicValue({
                  characteristicId: e.wUuid,
                  serviceId: e.serUuid,
                  deviceId: e.devId,
                  writeType: "writeNoResponse",
                  value: e.tx,
                  success() {
                    e.keepFlag = !1;
                  },
                  fail(e) {},
                });
              }
            },
            onTimerOut() {
              this.sendData();
            },
            processData() {
              switch (
                (161 == this.rx[3] &&
                  t(
                    "log",
                    "at pages/index/index.vue:705",
                    "处理数据" +
                      this.rx[3] +
                      ",无感=" +
                      this.rx[9] +
                      ",自动断电=" +
                      this.rx[10],
                  ),
                uni.hideLoading(),
                clearTimeout(this.timerId),
                this.rx[3])
              ) {
                case this.cmdAskMode:
                  170 == this.rx[4]
                    ? ((this.curMode = this.rx[2]), (this.tx[4] = 187))
                    : 187 == this.rx[4] &&
                      (t("log", "at pages/index/index.vue:721", "0xbb"),
                      (this.tx[3] = this.cmdIdle),
                      (this.curVal = (this.rx[5] << 8) | this.rx[6]),
                      this.curVal < 180
                        ? ((this.volPro = ((this.curVal - 100) / 40) * 100),
                          Math.floor(this.volPro),
                          (this.dwidth = "width:" + this.volPro + "%"),
                          (this.minOffVal = 50),
                          (this.maxOffVal = 137))
                        : ((this.volPro = ((this.curVal - 180) / 80) * 100),
                          Math.floor(this.volPro),
                          (this.dwidth = "width:" + this.volPro + "%"),
                          (this.minOffVal = 200),
                          (this.maxOffVal = 274)),
                      (this.midPowerOffVal = (this.rx[7] << 8) | this.rx[8]),
                      (this.isAutoPowerOn = this.rx[9]),
                      (this.isAutoPowerOff = this.rx[10]),
                      (this.startCur = (this.rx[12] << 8) | this.rx[13]),
                      (this.curCur = (this.rx[14] << 8) | this.rx[15]),
                      32768 & this.curCur
                        ? (this.curCur = -1 * (32767 & this.curCur))
                        : (this.curCur = 32767 & this.curCur),
                      (this.temperature = (this.rx[17] << 8) | this.rx[18]),
                      32768 & this.temperature &&
                        (this.temperature = this.temperature - 65536),
                      t(
                        "log",
                        "at pages/index/index.vue:766",
                        "温度=" + this.temperature,
                      ),
                      (this.isPowerOn = this.rx[16]),
                      (this.offValInfo = this.midPowerOffVal));
                  break;
                case this.cmdIdle:
                  (0 == this.keepFlag && (this.tx[3] = 1),
                    this.updateCnt++,
                    this.updateCnt >= 5 &&
                      ((this.curVal = (this.rx[5] << 8) | this.rx[6]),
                      this.curVal < 180
                        ? ((this.volPro = ((this.curVal - 100) / 40) * 100),
                          Math.floor(this.volPro),
                          (this.dwidth = "width:" + this.volPro + "%"))
                        : ((this.volPro = ((this.curVal - 180) / 80) * 100),
                          Math.floor(this.volPro),
                          (this.dwidth = "width:" + this.volPro + "%")),
                      (this.updateCnt = 0),
                      (this.temperature = (this.rx[17] << 8) | this.rx[18]),
                      32768 & this.temperature &&
                        (this.temperature = this.temperature - 65536),
                      (this.startVol = this.startVolTmp),
                      this.isAutoPowerOn != this.rx[9] &&
                        t(
                          "log",
                          "at pages/index/index.vue:810",
                          "无感不同步了！",
                        ),
                      this.isAutoPowerOff != this.rx[10] &&
                        t(
                          "log",
                          "at pages/index/index.vue:813",
                          "自动断电数据不同步",
                        ),
                      (this.midPowerOffVal = (this.rx[7] << 8) | this.rx[8]),
                      (this.offValInfo = this.midPowerOffVal),
                      (this.isAutoPowerOn = this.rx[9]),
                      (this.isAutoPowerOff = this.rx[10])),
                    (this.isPowerOn = this.rx[16]),
                    1 == this.isPowerOn
                      ? (this.isPowerOnInfo = this.disInfo.b8)
                      : (this.isPowerOnInfo = this.disInfo.b9),
                    (this.startCur = (this.rx[12] << 8) | this.rx[13]),
                    (this.curCur = (this.rx[14] << 8) | this.rx[15]),
                    32768 & this.curCur
                      ? (this.curCur = -1 * (32767 & this.curCur))
                      : (this.curCur = 32767 & this.curCur),
                    (this.curMode = this.rx[2]),
                    (this.startVol = this.startVolTmp),
                    this.updateScreen());
                  break;
                case 1:
                  ((this.startVolTmp = (this.rx[5] << 8) | this.rx[6]),
                    0 == this.keepFlag && (this.tx[3] = this.cmdIdle));
                  break;
                case 161:
                  (t("log", "at pages/index/index.vue:860", "cmdSetParam"),
                    161 == this.tx[3] &&
                      ((this.allowSend = !0),
                      (this.tx[3] = this.cmdIdle),
                      uni.hideLoading(),
                      t(
                        "log",
                        "at pages/index/index.vue:865",
                        "收到无感的反馈.无感=" +
                          this.rx[9] +
                          ",自动断电=" +
                          this.rx[10],
                      )));
                  break;
                case 163:
                  163 == this.tx[3] && (this.tx[3] = this.cmdIdle);
                  break;
                default:
                  t("log", "at pages/index/index.vue:880", "其他数据");
              }
              this.sendData();
            },
            updateScreen() {
              (1 == this.isAutoPowerOn
                ? (this.isAutoOn = !0)
                : (this.isAutoOn = !1),
                1 == this.isAutoPowerOff
                  ? (this.isAutoOff = !0)
                  : (this.isAutoOff = !1),
                0 == this.isPowerOn
                  ? ((this.isPowerOnInfo = this.disInfo.b9),
                    2 == this.curMode
                      ? ((this.btn1Type = "normal"),
                        (this.btn2Type = "primary"),
                        (this.btn3Type = "normal"))
                      : ((this.btn1Type = "normal"),
                        (this.btn2Type = "normal"),
                        (this.btn3Type = "primary")))
                  : ((this.isPowerOnInfo = this.disInfo.b8),
                    1 == this.curMode
                      ? ((this.btn1Type = "primary"),
                        (this.btn2Type = "normal"),
                        (this.btn3Type = "normal"))
                      : 2 == this.curMode
                        ? ((this.btn1Type = "normal"),
                          (this.btn2Type = "primary"),
                          (this.btn3Type = "normal"))
                        : 3 == this.curMode &&
                          ((this.btn1Type = "primary"),
                          (this.btn2Type = "normal"),
                          (this.btn3Type = "normal"))),
                0 == this.isAutoPowerOn
                  ? (this.swiState = !1)
                  : (this.swiState = !0));
            },
            langClicked() {
              (t("log", "at pages/index/index.vue:946", "切换语言"),
                t("log", "at pages/index/index.vue:947", this.Chinese.a1),
                1 == this.language
                  ? ((this.language = 0),
                    (this.langInfo = "中文"),
                    (this.disInfo = this.English))
                  : ((this.language = 1),
                    (this.langInfo = "English"),
                    (this.disInfo = this.Chinese)));
            },
            formatStartCur() {
              return this.startCur >= 325 && this.startCur <= 330
                ? ">320"
                : this.startCur >= 590 && this.startCur <= 700
                  ? ">500"
                  : this.startCur > 700
                    ? ">320"
                    : this.startCur >= 100
                      ? this.startCur
                      : this.startCur >= 10
                        ? "0" + this.startCur
                        : this.startCur >= 1
                          ? "00" + this.startCur
                          : "000";
            },
            formatStartVol() {
              return this.startVol >= 100
                ? this.startVol / 100
                : this.startVol >= 10
                  ? "0." + this.startVol
                  : this.startVol >= 1
                    ? "0.0" + this.startVol
                    : "0.00";
            },
            settingClicked() {
              uni.navigateTo({ url: "/pages/setting/setting" });
            },
          },
        },
        [
          [
            "render",
            function (t, i, a, n, s, o) {
              return (
                e.openBlock(),
                e.createElementBlock(
                  "view",
                  {
                    class: "container",
                    style: e.normalizeStyle({ height: s.screenHeight + "px" }),
                  },
                  [
                    e.createElementVNode(
                      "view",
                      {
                        class: "top",
                        style: e.normalizeStyle({
                          height: 0.84 * s.screenHeight + "px",
                        }),
                      },
                      [
                        e.createElementVNode(
                          "view",
                          {
                            style: e.normalizeStyle({
                              height: s.statusBarHeight + "px",
                            }),
                          },
                          null,
                          4,
                        ),
                        e.createElementVNode("view", { class: "mainTitle" }, [
                          e.createTextVNode(
                            e.toDisplayString(s.disInfo.a1) + " ",
                            1,
                          ),
                          e.createElementVNode("image", {
                            src: "/static/setting.png",
                            onClick:
                              i[0] ||
                              (i[0] = (...e) =>
                                o.settingClicked && o.settingClicked(...e)),
                          }),
                        ]),
                        e.createElementVNode("view", { class: "line" }),
                        e.createElementVNode("view", { class: "deviceInfo" }, [
                          e.createElementVNode(
                            "text",
                            null,
                            e.toDisplayString(s.disInfo.a2),
                            1,
                          ),
                          e.createElementVNode(
                            "text",
                            null,
                            e.toDisplayString(s.devName),
                            1,
                          ),
                          e.createElementVNode(
                            "text",
                            {
                              style: {
                                float: "right",
                                "margin-right": "60rpx",
                              },
                            },
                            e.toDisplayString(s.titleInfo),
                            1,
                          ),
                        ]),
                        e.createElementVNode(
                          "view",
                          {
                            class: "deviceInfo",
                            style: { "margin-top": "10rpx" },
                          },
                          [
                            e.createElementVNode(
                              "text",
                              null,
                              e.toDisplayString(s.disInfo.a4),
                              1,
                            ),
                            e.createElementVNode(
                              "text",
                              {
                                style: {
                                  float: "right",
                                  "margin-right": "60rpx",
                                },
                              },
                              e.toDisplayString(s.isPowerOnInfo),
                              1,
                            ),
                          ],
                        ),
                        e.createElementVNode("view", { class: "batInfo" }, [
                          e.createElementVNode("view", { class: "batTitle" }, [
                            e.createElementVNode("view", { class: "zuoce" }, [
                              e.createElementVNode("view", { class: "zup" }, [
                                e.createElementVNode("text", { class: "z1" }),
                                e.createElementVNode("text", { class: "z2" }),
                                e.createElementVNode("text", { class: "z3" }),
                              ]),
                              e.createElementVNode("view", { class: "zdown" }, [
                                e.createElementVNode(
                                  "text",
                                  {
                                    class: "zd1",
                                    style: e.normalizeStyle(s.dwidth),
                                  },
                                  null,
                                  4,
                                ),
                              ]),
                            ]),
                            e.createElementVNode("view", { class: "youce" }, [
                              e.createElementVNode(
                                "text",
                                null,
                                e.toDisplayString(
                                  parseFloat(s.curVal / 10).toFixed(1),
                                ) + "V",
                                1,
                              ),
                            ]),
                          ]),
                          e.createElementVNode("view", { class: "batItem" }, [
                            e.createElementVNode(
                              "text",
                              {
                                style: {
                                  flex: "1.2",
                                  "text-align": "left",
                                  "margin-left": "15rpx",
                                },
                              },
                              e.toDisplayString(s.disInfo.a7) +
                                e.toDisplayString(
                                  parseFloat(s.curCur / 100).toFixed(2),
                                ) +
                                "A",
                              1,
                            ),
                            e.createElementVNode(
                              "text",
                              {
                                style: {
                                  flex: "1",
                                  "text-align": "left",
                                  "margin-left": "5rpx",
                                },
                              },
                              e.toDisplayString(s.disInfo.a8) +
                                e.toDisplayString(o.formatStartCur()) +
                                "A",
                              1,
                            ),
                          ]),
                          e.createElementVNode("view", { class: "batItem" }, [
                            e.createElementVNode(
                              "text",
                              {
                                style: {
                                  flex: "1.2",
                                  "text-align": "left",
                                  "margin-left": "15rpx",
                                },
                              },
                              e.toDisplayString(s.disInfo.a9) +
                                e.toDisplayString(
                                  parseFloat(s.temperature / 10).toFixed(0),
                                ) +
                                "℃",
                              1,
                            ),
                            e.createElementVNode(
                              "text",
                              {
                                style: {
                                  flex: "1",
                                  "text-align": "left",
                                  "margin-left": "5rpx",
                                },
                              },
                              e.toDisplayString(s.disInfo.a10) +
                                e.toDisplayString(o.formatStartVol()) +
                                "V",
                              1,
                            ),
                          ]),
                        ]),
                        e.createElementVNode("view", { class: "offValtage" }, [
                          e.createElementVNode(
                            "text",
                            null,
                            e.toDisplayString(s.disInfo.a11) +
                              e.toDisplayString(s.offValInfo / 10) +
                              "V",
                            1,
                          ),
                        ]),
                        e.createElementVNode(
                          "view",
                          { class: "valtageSlider" },
                          [
                            e.createElementVNode(
                              "slider",
                              {
                                "block-size": "15",
                                onChange:
                                  i[1] ||
                                  (i[1] = (...e) =>
                                    o.onSliderChanged &&
                                    o.onSliderChanged(...e)),
                                onChanging:
                                  i[2] ||
                                  (i[2] = (...e) =>
                                    o.onSliderChanging &&
                                    o.onSliderChanging(...e)),
                                min: s.minOffVal,
                                max: s.maxOffVal,
                                value: s.midPowerOffVal,
                              },
                              null,
                              40,
                              ["min", "max", "value"],
                            ),
                          ],
                        ),
                        e.createElementVNode(
                          "view",
                          {
                            class: "switchBtn",
                            style: { "margin-top": "30rpx" },
                          },
                          [
                            e.createElementVNode(
                              "text",
                              null,
                              e.toDisplayString(s.disInfo.a12),
                              1,
                            ),
                            e.createElementVNode(
                              "switch",
                              {
                                onChange:
                                  i[3] ||
                                  (i[3] = (...e) =>
                                    o.onIsAutoDisChange &&
                                    o.onIsAutoDisChange(...e)),
                                style: {
                                  transform: "scale(0.7)",
                                  "margin-left": "20rpx",
                                },
                                checked: s.isAutoOff,
                              },
                              null,
                              40,
                              ["checked"],
                            ),
                          ],
                        ),
                        e.createElementVNode(
                          "view",
                          { style: { "margin-top": "10rpx" } },
                          [
                            e.createElementVNode(
                              "text",
                              {
                                style: {
                                  color: "#fff",
                                  "margin-left": "65rpx",
                                  "font-size": "28rpx",
                                },
                              },
                              e.toDisplayString(s.disInfo.a13),
                              1,
                            ),
                          ],
                        ),
                        e.createElementVNode(
                          "view",
                          {
                            class: "switchBtn",
                            style: { "margin-top": "40rpx" },
                          },
                          [
                            e.createElementVNode(
                              "text",
                              null,
                              e.toDisplayString(s.disInfo.a14),
                              1,
                            ),
                            e.createElementVNode(
                              "switch",
                              {
                                onChange:
                                  i[4] ||
                                  (i[4] = (...e) =>
                                    o.onIsAutoOnChange &&
                                    o.onIsAutoOnChange(...e)),
                                style: {
                                  transform: "scale(0.7)",
                                  "margin-left": "20rpx",
                                },
                                checked: s.isAutoOn,
                              },
                              null,
                              40,
                              ["checked"],
                            ),
                          ],
                        ),
                        e.createElementVNode(
                          "view",
                          { style: { "margin-top": "10rpx" } },
                          [
                            e.createElementVNode(
                              "text",
                              {
                                style: {
                                  color: "#fff",
                                  "margin-left": "65rpx",
                                  "font-size": "28rpx",
                                },
                              },
                              e.toDisplayString(s.disInfo.a15),
                              1,
                            ),
                          ],
                        ),
                      ],
                      4,
                    ),
                    e.createElementVNode(
                      "view",
                      {
                        class: "bottom",
                        style: e.normalizeStyle({
                          height: 0.16 * s.screenHeight + "px",
                        }),
                      },
                      [
                        e.createElementVNode(
                          "button",
                          {
                            type: s.btn1Type,
                            onClick:
                              i[5] ||
                              (i[5] = (...e) =>
                                o.onBtn1Clicked && o.onBtn1Clicked(...e)),
                          },
                          e.toDisplayString(s.disInfo.a16),
                          9,
                          ["type"],
                        ),
                        e.createElementVNode(
                          "button",
                          {
                            type: s.btn2Type,
                            onClick:
                              i[6] ||
                              (i[6] = (...e) =>
                                o.onBtn2Clicked && o.onBtn2Clicked(...e)),
                            style: { width: "230rpx" },
                          },
                          e.toDisplayString(s.disInfo.a17),
                          9,
                          ["type"],
                        ),
                        e.createElementVNode(
                          "button",
                          {
                            type: s.btn3Type,
                            onClick:
                              i[7] ||
                              (i[7] = (...e) =>
                                o.onBtn3Clicked && o.onBtn3Clicked(...e)),
                          },
                          e.toDisplayString(s.disInfo.a18),
                          9,
                          ["type"],
                        ),
                      ],
                      4,
                    ),
                  ],
                  4,
                )
              );
            },
          ],
        ],
      ),
      s = a(
        {
          __name: "zxm-bleDev",
          props: {
            obj: {
              type: Object,
              default: () => ({ devName: "", rssi: "", devId: "" }),
            },
            isSelected: { type: Boolean, default: !1 },
            info: { type: String, default: "已连接" },
          },
          setup: (t) => (i, a) => (
            e.openBlock(),
            e.createElementBlock(
              "view",
              {
                class: e.normalizeClass([
                  "container",
                  { selected: t.isSelected },
                ]),
              },
              [
                e.createElementVNode(
                  "text",
                  null,
                  e.toDisplayString(t.obj.devName),
                  1,
                ),
                t.isSelected
                  ? (e.openBlock(),
                    e.createElementBlock(
                      "text",
                      { key: 0, style: { "margin-left": "220rpx" } },
                      e.toDisplayString(t.info),
                      1,
                    ))
                  : e.createCommentVNode("", !0),
              ],
              2,
            )
          ),
        },
        [["__scopeId", "data-v-339a3a44"]],
      ),
      o = a(
        {
          __name: "setting",
          setup(a) {
            const n = getApp(),
              o = e.ref("中文"),
              l = e.ref({
                a1: "APP版本",
                a2: "语言",
                a3: "常见问题",
                a4: "不能手动断电",
                a5: "由于手机款有靠近自动通电功能，当连上蓝牙并且打开了靠近通电功能，就不能断电，可以关闭靠近接通，或者关闭手机蓝牙。",
                a6: "*怎么设置离开断电",
                a7: "因为断电器自动断电是电压低于设定阈值才会自动断电，可以将断电阈值调到高于电瓶停车后的电压(一般13.5V),手机断开后等3分钟，没有震动会自动断开。",
                a8: "*怎么设置离开断电",
                a9: "因为断电器自动断电是电压低于设定阈值才会自动断电，可以将断电阈值调到高于电瓶停车后的电压(一般13.5V),手机断开后等3分钟，没有震动会自动断开。",
                a10: "已连接",
                a11: "返回首页",
                a12: "暂无设备",
              }),
              r = e.ref({
                a1: "APP版本",
                a2: "语       言",
                a3: "常见问题",
                a4: "不能手动断电",
                a5: "由于手机款有靠近自动通电功能，当连上蓝牙并且打开了靠近通电功能，就不能断电，可以关闭靠近接通，或者关闭手机蓝牙。",
                a6: "*怎么设置离开断电",
                a7: "因为断电器自动断电是电压低于设定阈值才会自动断电，可以将断电阈值调到高于电瓶停车后的电压(一般13.5V),手机断开后等3分钟，没有震动会自动断开。",
                a8: "*怎么设置离开断电",
                a9: "因为断电器自动断电是电压低于设定阈值才会自动断电，可以将断电阈值调到高于电瓶停车后的电压(一般13.5V),手机断开后等3分钟，没有震动会自动断开。",
                a10: "已连接",
                a11: "返回首页",
                a12: "暂无设备",
                a13: "当前没有设备处于连接状态",
              }),
              d = e.ref({
                a1: "APP Ver",
                a2: "Language",
                a3: "Questions",
                a4: "Why can't powOff",
                a5: "Since the mobile phone model has the automatic power-on function close to the near, when Bluetooth is connected and the near power-on function is turned on, the power cannot be cut off. You can turn off the near power-on or turn off the Bluetooth of the mobile phone.",
                a6: "*How to set off power outage?",
                a7: "Because the power cutter will automatically cut off when the voltage is lower than the set threshold, the power cutoff threshold can be adjusted to higher than the voltage after the battery is stopped (usually 13.5V). After the phone is disconnected, wait for 3 minutes, and it will automatically disconnect without vibration.",
                a8: "*How to set off power outage",
                a9: "Because the power cutter will automatically cut off when the voltage is lower than the set threshold, the power cutoff threshold can be adjusted to higher than the voltage after the battery is stopped (usually 13.5V). After the phone is disconnected, wait for 3 minutes, and it will automatically disconnect without vibration.",
                a10: "Connected",
                a11: "Home page",
                a12: "No devices",
                a13: "No device is currently connected",
              });
            i(() => {
              -1 != n.globalData.language.indexOf("Chinese")
                ? ((l.value = r.value), (o.value = "中文"))
                : ((l.value = d.value), (o.value = "English"));
            });
            const h = function () {
                (t("log", "at pages/setting/setting.vue:114", "切换语言"),
                  -1 != n.globalData.language.indexOf("Chinese")
                    ? ((n.globalData.language = "English"),
                      (o.value = "English"),
                      (l.value = d.value),
                      uni.setStorageSync("useLan", "English"),
                      t(
                        "log",
                        "at pages/setting/setting.vue:120",
                        "切换为英文。进行保存",
                      ))
                    : ((n.globalData.language = "Chinese"),
                      (o.value = "中文"),
                      (l.value = r.value),
                      uni.setStorageSync("useLan", "Chinese"),
                      t(
                        "log",
                        "at pages/setting/setting.vue:128",
                        "切换为中文。进行保存",
                      )));
              },
              c = function () {
                uni.navigateBack();
              },
              u = function () {
                (t(
                  "log",
                  "at pages/setting/setting.vue:153",
                  "当前没有设备连接",
                ),
                  uni.showToast({ title: l.value.a13, icon: "none" }));
              };
            return (i, a) => {
              const r =
                ((d = e.resolveDynamicComponent("zxm-bleDev")),
                (g = s),
                "string" == typeof d ? g : d);
              var d, g;
              return (
                e.openBlock(),
                e.createElementBlock("view", { class: "content" }, [
                  e.createElementVNode("view", { class: "verson" }, [
                    e.createElementVNode(
                      "text",
                      null,
                      e.toDisplayString(l.value.a1) + ":",
                      1,
                    ),
                    e.createElementVNode(
                      "text",
                      { style: { "margin-left": "150rpx" } },
                      "V1.2",
                    ),
                  ]),
                  e.createElementVNode("view", { class: "lan" }, [
                    e.createElementVNode(
                      "text",
                      null,
                      e.toDisplayString(l.value.a2) + ":",
                      1,
                    ),
                    e.createElementVNode(
                      "text",
                      { onClick: h, class: "curLan" },
                      e.toDisplayString(o.value),
                      1,
                    ),
                  ]),
                  e.createElementVNode("view", {
                    style: {
                      height: "3rpx",
                      width: "100%",
                      "background-color": "white",
                      "margin-top": "30rpx",
                    },
                  }),
                  e.createElementVNode(
                    "view",
                    {
                      style: {
                        display: "flex",
                        width: "100%",
                        "justify-content": "center",
                        height: "80rpx",
                        "align-items": "center",
                      },
                    },
                    [
                      e.createElementVNode(
                        "text",
                        {
                          style: {
                            width: "100%",
                            "text-align": "center",
                            "font-size": "45rpx",
                            color: "white",
                            "font-weight": "bold",
                          },
                        },
                        e.toDisplayString(l.value.a3),
                        1,
                      ),
                    ],
                  ),
                  e.createElementVNode(
                    "view",
                    { style: { "margin-top": "0rpx", width: "100%" } },
                    [
                      e.createElementVNode("view", { class: "question" }, [
                        e.createElementVNode(
                          "text",
                          null,
                          e.toDisplayString(l.value.a4),
                          1,
                        ),
                      ]),
                      e.createElementVNode("view", { class: "answer" }, [
                        e.createElementVNode(
                          "text",
                          null,
                          e.toDisplayString(l.value.a5),
                          1,
                        ),
                      ]),
                      e.createElementVNode("view", { class: "question" }, [
                        e.createElementVNode(
                          "text",
                          null,
                          e.toDisplayString(l.value.a6),
                          1,
                        ),
                      ]),
                      e.createElementVNode("view", { class: "answer" }, [
                        e.createElementVNode(
                          "text",
                          null,
                          e.toDisplayString(l.value.a7),
                          1,
                        ),
                      ]),
                      e.createElementVNode("view", { class: "question" }, [
                        e.createElementVNode(
                          "text",
                          null,
                          e.toDisplayString(l.value.a8),
                          1,
                        ),
                      ]),
                      e.createElementVNode("view", { class: "answer" }, [
                        e.createElementVNode(
                          "text",
                          null,
                          e.toDisplayString(l.value.a9),
                          1,
                        ),
                      ]),
                    ],
                  ),
                  e.createElementVNode("view", { class: "devContainer" }, [
                    e.createElementVNode(
                      "scroll-view",
                      { "scroll-y": "true" },
                      [
                        0 == e.unref(n).globalData.myDevs.length
                          ? (e.openBlock(),
                            e.createElementBlock(
                              "view",
                              { key: 0, id: "demo1", onClick: u },
                              [
                                e.createVNode(
                                  r,
                                  {
                                    obj: { devName: l.value.a12 },
                                    style: { "margin-bottom": "5rpx" },
                                    info: l.value.a10,
                                  },
                                  null,
                                  8,
                                  ["obj", "info"],
                                ),
                              ],
                            ))
                          : e.createCommentVNode("", !0),
                        (e.openBlock(!0),
                        e.createElementBlock(
                          e.Fragment,
                          null,
                          e.renderList(
                            e.unref(n).globalData.myDevs,
                            (i, a) => (
                              e.openBlock(),
                              e.createElementBlock(
                                "view",
                                {
                                  id: "demo1",
                                  onClick: (e) => {
                                    return (
                                      t(
                                        "log",
                                        "at pages/setting/setting.vue:137",
                                        (a = i),
                                      ),
                                      void (n.globalData.selectName ===
                                      a.devName
                                        ? (t(
                                            "log",
                                            "at pages/setting/setting.vue:139",
                                            "是选中的当前设备",
                                          ),
                                          uni.navigateBack())
                                        : (t(
                                            "log",
                                            "at pages/setting/setting.vue:143",
                                            "选择了另外一个设备" + a.devName,
                                          ),
                                          (n.globalData.selectName = a.devName),
                                          (n.globalData.needReconn = !0),
                                          uni.navigateBack()))
                                    );
                                    var a;
                                  },
                                },
                                [
                                  e.createVNode(
                                    r,
                                    {
                                      obj: i,
                                      style: { "margin-bottom": "5rpx" },
                                      isSelected:
                                        e.unref(n).globalData.selectName ===
                                        i.devName,
                                      info: l.value.a10,
                                    },
                                    null,
                                    8,
                                    ["obj", "isSelected", "info"],
                                  ),
                                ],
                                8,
                                ["onClick"],
                              )
                            ),
                          ),
                          256,
                        )),
                      ],
                    ),
                  ]),
                  e.createElementVNode("view", { class: "backContainer" }, [
                    e.createElementVNode(
                      "button",
                      { class: "backBtn", onClick: c },
                      e.toDisplayString(l.value.a11),
                      1,
                    ),
                  ]),
                ])
              );
            };
          },
        },
        [["__scopeId", "data-v-a1907665"]],
      );
    (__definePage("pages/index/index", n),
      __definePage("pages/setting/setting", o));
    const l = {
      globalData: {
        language: "Chinese",
        myDevs: [],
        selectName: "",
        needReconn: !1,
      },
      onLaunch: function () {
        (t("log", "at App.vue:10", "App Launch"),
          t("log", "at App.vue:11", "APP 预加载"));
      },
      onShow: function () {
        t("log", "at App.vue:19", "App Show");
      },
      onHide: function () {
        t("log", "at App.vue:22", "App Hide");
      },
    };
    const { app: r, Vuex: d, Pinia: h } = { app: e.createVueApp(l) };
    ((uni.Vuex = d),
      (uni.Pinia = h),
      r.provide("__globalStyles", __uniConfig.styles),
      (r._component.mpType = "app"),
      (r._component.render = () => {}),
      r.mount("#app"));
  })(Vue));
