---
title: 高级功能
sidebar_position: 6
---

# 高级功能

本页面介绍Ratziel插件的一些高级功能和技巧，适合有经验的服务器管理员和开发者。

## 物品服务系统

Ratziel实现了强大的物品服务系统，可以通过脚本访问各种服务功能。

### 冷却服务

```javascript
// 获取物品冷却服务
cd = item.service.get(Cooldown).get(player, "ABILITY_1")

// 检查冷却状态
if (cd.isInCooldown()) {
    player.sendMessage("技能冷却中，剩余" + cd.getRemaining() + "秒")
    return
}

// 使用技能并设置冷却
// ...执行技能效果代码...
cd.setCooldown("10s")  // 设置10秒冷却时间
```

### 可用的服务列表

| 服务类型 | 描述 | 用法示例 |
| --- | --- | --- |
| `Cooldown` | 冷却服务 | `item.service.get(Cooldown).get(player, "ID")` |
| `DynamicTagService` | 动态标签服务 | `item.service.get(DynamicTagService)` |

## NBT 数据操作

Ratziel提供了完整的NBT数据操作API，可以在脚本中使用。

```javascript
// 获取物品NBT数据
nbt = NbtUtil.getItemTag(itemStack)

// 设置NBT值
nbt.setString("customKey", "customValue")

// 获取NBT值
value = nbt.getString("customKey")

// 创建NBT复合标签
compound = new NbtCompound()
compound.setInt("score", 100)
compound.setString("rank", "S")
nbt.set("stats", compound)

// 应用NBT到物品
NbtUtil.setItemTag(itemStack, nbt)
```

## 交互式菜单

可以使用物品的交互触发器创建交互式菜单：

```yaml
menu:
  meta:
    material: BOOK
    name: "菜单物品"
    action:
      onInteract: |-
        event.setCancelled(true)
        
        // 创建一个简单的GUI
        gui = Bukkit.createInventory(player, 9, "功能菜单")
        
        // 添加物品
        item1 = new ItemStack(Material.DIAMOND_SWORD)
        meta1 = item1.getItemMeta()
        meta1.setDisplayName("§b功能1")
        item1.setItemMeta(meta1)
        gui.setItem(2, item1)
        
        // 显示菜单
        player.openInventory(gui)
```

## 条件判断与逻辑

使用脚本可以实现复杂的条件判断：

```yaml
conditionalItem:
  meta:
    material: DIAMOND_SWORD
    name: "条件武器"
    action:
      onInteract: |-
        // 获取当前时间
        calendar = Calendar.getInstance()
        hour = calendar.get(Calendar.HOUR_OF_DAY)
        
        // 根据时间段提供不同效果
        if (hour >= 6 && hour < 18) {
          // 白天效果
          player.addPotionEffect(new PotionEffect(PotionEffectType.SPEED, 200, 1))
          player.sendMessage("§e激活白天效果：速度提升")
        } else {
          // 夜晚效果
          player.addPotionEffect(new PotionEffect(PotionEffectType.NIGHT_VISION, 600, 0))
          player.sendMessage("§b激活夜晚效果：夜视能力")
        }
        
        event.setCancelled(true)
```

## 兼容其他插件

Ratziel设计有完善的兼容性系统，可以与其他插件集成。

### 支持的外部物品插件

| 插件名 | 描述 | 用法 |
| --- | --- | --- |
| AzureFlow | 粒子效果插件 | 在物品中通过脚本调用AzureFlow API |
| NeigeItems | 另一款物品插件 | 可以将NeigeItems物品转换为Ratziel物品 |

### 示例：使用AzureFlow粒子

```javascript
// 在物品脚本中使用AzureFlow
if (AzureFlowHook.isEnabled()) {
  // 创建粒子效果
  particle = AzureFlowHook.getParticle("flame")
  if (particle) {
    // 播放粒子效果
    particle.play(player.getLocation())
    player.sendMessage("§a粒子效果已激活！")
  }
}
```

## 高级脚本技巧

### 多线程操作

```javascript
// 异步执行任务
Bukkit.getScheduler().runTaskAsynchronously(plugin, function() {
  // 这里的代码将在异步线程执行
  // 执行一些耗时操作...
  
  // 回到主线程
  Bukkit.getScheduler().runTask(plugin, function() {
    // 这里的代码将回到主线程执行
    player.sendMessage("操作完成！")
  })
})
```

### 持久化数据

```javascript
// 获取玩家的持久化数据容器
pdc = player.getPersistentDataContainer()

// 定义一个命名空间和键
namespace = new NamespacedKey(plugin, "custom_data")

// 存储数据
pdc.set(namespace, PersistentDataType.STRING, "value")

// 读取数据
if (pdc.has(namespace, PersistentDataType.STRING)) {
  value = pdc.get(namespace, PersistentDataType.STRING)
  player.sendMessage("存储的数据是: " + value)
}
```

## 最佳实践

1. **脚本优化**：尽量减少循环和复杂运算，避免在高频触发的事件中执行耗时操作。

2. **资源管理**：关闭不再使用的资源，如文件流、数据库连接等。

3. **错误处理**：始终添加try-catch块处理可能的异常：

```javascript
try {
  // 可能出错的代码
  riskyOperation()
} catch (e) {
  // 异常处理
  player.sendMessage("§c发生错误: " + e.message)
  console.error("错误:", e)
}
```

4. **模块化设计**：将常用功能封装为独立的脚本块或函数，方便复用。

5. **性能考虑**：尽量使用特定的选择器而不是遍历所有实体，例如使用`world.getNearbyEntities()`代替获取所有实体再筛选。 