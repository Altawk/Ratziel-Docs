---
title: API 文档
sidebar_position: 7
---

# API 文档

Ratziel 提供了丰富的 API 接口，供开发者在脚本中使用。本文档详细介绍了所有可用的 API 和使用方法。

## 核心 API

### RatzielItem API

RatzielItem 是 Ratziel 物品的核心类，提供了物品数据操作的所有功能。

#### 基础方法

```javascript
// 获取物品数据
value = item.get("key")                    // 获取数据
item.set("key", value)                     // 设置数据
item.remove("key")                         // 删除数据
item.has("key")                           // 检查数据是否存在

// 物品信息
identifier = item.getIdentifier()          // 获取物品标识符
displayName = item.getDisplayName()        // 获取显示名称
material = item.getMaterial()              // 获取材质
amount = item.getAmount()                  // 获取数量

// NBT 操作
nbt = item.getNBT()                       // 获取 NBT 数据
item.setNBT(nbt)                          // 设置 NBT 数据
item.updateNBT()                          // 更新 NBT 到 ItemStack
```

#### 数据类型操作

```javascript
// 基础数据类型
item.set("string_data", "Hello World")     // 字符串
item.set("number_data", 42)                // 数字
item.set("boolean_data", true)             // 布尔值

// 复杂数据类型
item.set("array_data", [1, 2, 3])         // 数组
item.set("object_data", {                  // 对象
  name: "test",
  value: 123
})

// NBT 数据类型
item.set("nbt_int", new NbtInt(42))        // NBT 整数
item.set("nbt_string", new NbtString("test")) // NBT 字符串
item.set("nbt_compound", new NbtCompound()) // NBT 复合标签
```

#### 组件操作

```javascript
// 获取组件
display = item.getComponent(ItemDisplay.class)
durability = item.getComponent(ItemDurability.class)
enchant = item.getComponent(ItemEnchant.class)

// 设置组件
newDisplay = new ItemDisplay()
newDisplay.name = "<red>新名称"
item.setComponent(newDisplay)

// 修改组件
display.name = "<blue>修改后的名称"
display.lore = ["新的描述1", "新的描述2"]
item.setComponent(display)
```

### Player API

Player API 提供了玩家相关的操作方法。

#### 基础操作

```javascript
// 玩家信息
name = player.getName()                    // 获取玩家名称
uuid = player.getUniqueId()               // 获取 UUID
health = player.getHealth()               // 获取生命值
maxHealth = player.getMaxHealth()         // 获取最大生命值
level = player.getLevel()                 // 获取等级
exp = player.getExp()                     // 获取经验值

// 设置属性
player.setHealth(20)                      // 设置生命值
player.setLevel(10)                       // 设置等级
player.giveExp(100)                       // 给予经验
```

#### 消息发送

```javascript
// 基础消息
player.sendMessage("Hello World!")        // 发送聊天消息
player.sendRichMessage("<red>彩色消息")   // 发送富文本消息

// 特殊消息
player.sendActionBar("动作栏消息")         // 发送动作栏消息
player.sendTitle("标题", "副标题", 10, 70, 20) // 发送标题

// 声音效果
player.playSound(player.getLocation(), Sound.ENTITY_PLAYER_LEVELUP, 1, 1)
```

#### 物品操作

```javascript
// 背包操作
inventory = player.getInventory()
mainHand = inventory.getItemInMainHand()   // 获取主手物品
offHand = inventory.getItemInOffHand()     // 获取副手物品

// 给予物品
inventory.addItem(itemStack)               // 添加物品到背包
player.getWorld().dropItem(player.getLocation(), itemStack) // 掉落物品

// 装备操作
helmet = inventory.getHelmet()             // 获取头盔
inventory.setHelmet(itemStack)             // 设置头盔
```

#### 位置和移动

```javascript
// 位置信息
location = player.getLocation()
world = location.getWorld()
x = location.getX()
y = location.getY()
z = location.getZ()

// 传送
newLocation = new Location(world, 100, 64, 200)
player.teleport(newLocation)

// 速度
velocity = player.getVelocity()
player.setVelocity(velocity.multiply(2))   // 双倍速度
```

### Event API

Event API 提供了事件处理的相关方法。

#### 事件控制

```javascript
// 取消事件
event.setCancelled(true)                   // 取消事件
cancelled = event.isCancelled()            // 检查是否已取消

// 事件信息
eventName = event.getEventName()           // 获取事件名称
handlers = event.getHandlers()             // 获取处理器列表
```

#### 特定事件操作

```javascript
// 攻击事件
if (event instanceof EntityDamageByEntityEvent) {
  damage = event.getDamage()               // 获取伤害值
  event.setDamage(damage * 1.5)          // 设置伤害值
  
  attacker = event.getDamager()           // 获取攻击者
  victim = event.getEntity()              // 获取受害者
}

// 交互事件
if (event instanceof PlayerInteractEvent) {
  action = event.getAction()              // 获取交互类型
  block = event.getClickedBlock()         // 获取点击的方块
  item = event.getItem()                  // 获取使用的物品
}
```

## 工具 API

### 时间工具

```javascript
// 当前时间
currentTime = System.currentTimeMillis()  // 毫秒时间戳
currentNano = System.nanoTime()           // 纳秒时间戳

// 时间格式化
date = new Date()
formatted = date.toLocaleString()         // 本地化时间字符串

// 时间计算
oneHour = 60 * 60 * 1000                 // 一小时的毫秒数
oneDay = 24 * oneHour                    // 一天的毫秒数
```

### 随机工具

```javascript
// 随机数生成
random = Math.random()                    // 0-1 之间的随机数
randomInt = Math.floor(Math.random() * 100) // 0-99 的随机整数

// 随机选择
items = ["apple", "banana", "orange"]
randomItem = items[Math.floor(Math.random() * items.length)]

// 概率判断
if (Math.random() < 0.3) {               // 30% 概率
  player.sendMessage("幸运事件触发!")
}
```

### 字符串工具

```javascript
// 字符串操作
text = "Hello World"
upper = text.toUpperCase()               // 转大写
lower = text.toLowerCase()               // 转小写
length = text.length                     // 获取长度

// 字符串格式化
formatted = `玩家 ${player.getName()} 的等级是 ${player.getLevel()}`

// 正则表达式
pattern = /\d+/g                         // 匹配数字
numbers = text.match(pattern)            // 提取所有数字
```

### 数学工具

```javascript
// 基础数学
abs = Math.abs(-5)                       // 绝对值: 5
max = Math.max(10, 20, 5)               // 最大值: 20
min = Math.min(10, 20, 5)               // 最小值: 5
round = Math.round(3.7)                 // 四舍五入: 4

// 三角函数
sin = Math.sin(Math.PI / 2)             // 正弦值
cos = Math.cos(0)                       // 余弦值
sqrt = Math.sqrt(16)                    // 平方根: 4

// 范围限制
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}
```

## 服务 API

### 冷却服务

```javascript
// 获取冷却服务
cooldownService = item.service.get(Cooldown)

// 设置冷却
cd = cooldownService.get(player, "ATTACK")
cd.setCooldown("5s")                     // 设置5秒冷却
cd.setCooldown(5000)                     // 设置5000毫秒冷却

// 检查冷却
if (cd.isInCooldown()) {
  remaining = cd.getRemainingTime()      // 获取剩余时间
  player.sendMessage("冷却中，还需 " + remaining + "ms")
} else {
  player.sendMessage("冷却完成，可以使用!")
}
```

### 数据服务

```javascript
// 获取数据服务
dataService = item.service.get(DataService)

// 数据操作
dataService.set(player, "key", "value")  // 设置玩家数据
value = dataService.get(player, "key")   // 获取玩家数据
dataService.remove(player, "key")        // 删除玩家数据

// 全局数据
dataService.setGlobal("server_info", info) // 设置全局数据
info = dataService.getGlobal("server_info") // 获取全局数据
```

## 第三方 API

### PlaceholderAPI

```javascript
// 解析占位符
balance = PlaceholderAPI.setPlaceholders(player, "%vault_eco_balance%")
level = PlaceholderAPI.setPlaceholders(player, "%player_level%")

// 批量解析
placeholders = ["%player_name%", "%player_health%", "%player_level%"]
results = PlaceholderAPI.setPlaceholders(player, placeholders)
```

### Vault 经济

```javascript
// 获取经济服务
economy = Bukkit.getServicesManager().getRegistration(Economy.class).getProvider()

// 余额操作
balance = economy.getBalance(player)      // 获取余额
economy.depositPlayer(player, 100)       // 存入金钱
economy.withdrawPlayer(player, 50)       // 扣除金钱

// 检查余额
if (economy.has(player, 100)) {
  player.sendMessage("余额充足")
} else {
  player.sendMessage("余额不足")
}
```

### WorldGuard

```javascript
// 获取区域管理器
worldGuard = WorldGuard.getInstance()
regionManager = worldGuard.getPlatform().getRegionContainer().get(player.getWorld())

// 检查区域
location = player.getLocation()
regions = regionManager.getApplicableRegions(
  BlockVector3.at(location.getX(), location.getY(), location.getZ())
)

// 权限检查
canBuild = regionManager.testState(location, player, Flags.BUILD)
canPvP = regionManager.testState(location, player, Flags.PVP)
```

## 最佳实践

### 错误处理

```javascript
try {
  // 可能出错的代码
  riskyOperation()
} catch (error) {
  console.error("操作失败: " + error.message)
  player.sendMessage("操作失败，请稍后重试")
} finally {
  // 清理代码
  cleanup()
}
```

### 性能优化

```javascript
// 缓存重复计算
if (!cache.has("expensive_result")) {
  result = performExpensiveCalculation()
  cache.set("expensive_result", result, 60000) // 缓存1分钟
}

// 异步执行
async(() => {
  performHeavyOperation()
})

// 批量操作
items = []
for (i = 0; i < 100; i++) {
  items.push(createItem(i))
}
player.getInventory().addItem(...items)  // 批量添加
```
