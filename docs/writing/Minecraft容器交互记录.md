## 包内容

**Packet: ** ServerboundContainerClickPacket

- containerId=2
- stateId=1
- slotNum=56
- buttonNum=1
- clickType=QUICK_CRAFT
- changedSlots={}
- carriedItem=cn.fd.ratziel.module.item.feature.virtual.NMSVirtualItemImpl$ProxyHashedStack@5fb7355b

## 内容分析

**buttomNum: **

- **0** > 左键
- **1** > 右键
- **2** > 创造模式下鼠标中键 (非创建模式不会发这个包)
- **40** > 切换副手键 (边界不触发)

- **0** > 单丢弃键 (边界和空物品都不触发)
- **1** > Ctrl + 丢弃键 (边界和空物品都不触发)

- **0** > 左键拖动开始 (标记包)
- **1** > 左键拖动物品放置
- **2** > 左键拖动结束 (标记包)

- **4** > 右键拖动开始 (标记包)
- **5** > 右键拖动物品放置
- **6** > 右键拖动结束 (标记包)

注: 客户端拖动完成后才连发所有拖动包，
如拖动了3个物品，则 \[ 开始包 (slot -999) , 放置包, 放置包, 放置包, 结束包 (slot -999) \]

**clickType: **

- **PICKUP** > 单左右键点击 (非边界触发)
- **PICKUP_ALL** > 单左键双击 (极短时间内点两下左键, 非边界触发)
- **QUICK_MOVE** > Shift + 左右键点击 (非边界触发)
- **SWAP** > 切换副手键 (边界不触发)
- **THROW** > 任意丢弃键 (边界和空物品都不触发) + 任意左右键边界
- **CLONE** > 创造模式下鼠标中键
- **QUICK_CRAFT** > 拖动
