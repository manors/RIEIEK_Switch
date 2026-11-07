import asyncio
from bleak import BleakClient, BleakScanner

SER_UUID = "0000fff0-0000-1000-8000-00805f9b34fb"
R_UUID   = "0000fff1-0000-1000-8000-00805f9b34fb"
W_UUID   = "0000fff2-0000-1000-8000-00805f9b34fb"

tx = bytearray([170, 85, 0, 167, 170] + [0]*14 + [136])

def on_notify(sender, data):
    if len(data) >= 20 and data[0] == 0xAA and data[1] == 0x55:
        if data[3] == 167 and data[4] == 170:
            tx[4] = 187
        elif data[3] == 167 and data[4] == 187:
            tx[3] = 0

        # 电压与百分比换算
        cur_val = (data[5] << 8) | data[6]
        vol = cur_val / 10.0
        vol_pro = ((cur_val - 100) / 40) * 100 if cur_val < 180 else ((cur_val - 180) / 80) * 100
        vol_pro = max(0, min(100, int(vol_pro)))

        # 电流缩放 (除以 100)
        raw_cur = (data[14] << 8) | data[15]
        cur = -1 * (raw_cur & 0x7FFF) if (raw_cur & 0x8000) else (raw_cur & 0x7FFF)
        cur_amp = cur / 100.0

        # 温度缩放 (除以 10)
        temp = (data[17] << 8) | data[18]
        if temp & 0x8000:
            temp -= 65536
        temp_c = temp / 10.0

        power_on = "接通" if data[16] == 1 else "断开"
        print(f"[数据上报] 电压: {vol:.1f}V ({vol_pro}%) | 电流: {cur_amp:.2f}A | 温度: {temp_c:.1f}℃ | 状态: {power_on}")

async def main():
    print("正在寻找设备...")
    dev = await BleakScanner.find_device_by_filter(lambda d, adv: d.name and "RIEIEK" in d.name)
    if not dev:
        print("未找到设备")
        return

    async with BleakClient(dev) as client:
        print("已建立连接，开启订阅...")
        await client.start_notify(R_UUID, on_notify)
        await asyncio.sleep(0.8)
        while client.is_connected:
            await client.write_gatt_char(W_UUID, tx, response=False)
            await asyncio.sleep(1.0)

if __name__ == "__main__":
    asyncio.run(main())
