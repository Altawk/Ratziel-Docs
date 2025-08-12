---
title: 动态物品系统
sidebar_position: 12
---

# 动态物品系统

动态物品（也称为虚拟物品）是 Ratziel 的核心特性之一，它允许物品的显示内容根据实时数据动态变化，为玩家提供实时更新的物品信息，而无需重新生成物品。

## 核心概念

### 动态标签
动态标签使用 `{dynamic:解析器:参数}` 语法，在物品显示时实时解析，内容可以根据当前状态动态变化。

### 虚拟渲染
系统通过虚拟渲染技术，在客户端显示动态内容，而服务端保持原始物品数据不变，确保数据一致性。

### 实时同步
当动态内容发生变化时，系统自动同步到客户端，玩家可以看到实时更新的物品信息。

---

## 基础用法

### 动态标签语法

```yaml
# 基础语法
name: "物品名称 {dynamic:解析器名称:参数}"

# 常用动态标签
DynamicItem:
  item:
    material: COMPASS
    name: "<blue>动态指南针"
    lore:
      - "当前血量: {dynamic:data:health}"
      - "当前位置: {dynamic:script:player.getLocation().toString()}"
      - "在线时间: {dynamic:computation:online_time}"
      - "随机数: {dynamic:script:Math.floor(Math.random() * 100)}"
```

### 数据驱动的动态显示

```yaml
KillCounter:
  item:
    material: DIAMOND_SWORD
    name: "<blue>击杀计数器 <yellow>[{dynamic:data:kill_count}]"
    lore:
      - "<gray>━━━━━━━━━━━━━━━━━━━━"
      - "<red>💀 击杀数: <white>{dynamic:data:kill_count}"
      - "<yellow>⭐ 等级: <white>{dynamic:data:level}"
      - "<blue>📊 经验: <white>{dynamic:data:experience}/{dynamic:data:max_experience}"
      - "<gray>━━━━━━━━━━━━━━━━━━━━"
    
    data:
      kill_count: 0
      level: 1
      experience: 0
      max_experience: 100
    
    action:
      onKill: |-
        // 更新击杀数
        kills = item.get("kill_count") || 0
        item.set("kill_count", kills + 1)
        
        // 更新经验
        exp = item.get("experience") || 0
        newExp = exp + 10
        
        if (newExp >= item.get("max_experience")) {
          // 升级逻辑
          level = item.get("level") || 1
          item.set("level", level + 1)
          item.set("experience", 0)
          item.set("max_experience", (level + 1) * 100)
        } else {
          item.set("experience", newExp)
        }
```

---

## 支持的动态解析器

### data 解析器

访问物品的数据层内容，支持实时数据变化。

```yaml
PlayerStats:
  item:
    material: PLAYER_HEAD
    name: "<green>玩家状态面板"
    lore:
      - "血量: {dynamic:data:health}/{dynamic:data:max_health}"
      - "法力: {dynamic:data:mana}/{dynamic:data:max_mana}"
      - "等级: {dynamic:data:level}"
      - "经验: {dynamic:data:exp}/{dynamic:data:max_exp}"
    
    data:
      health: 20
      max_health: 20
      mana: 100
      max_mana: 100
      level: 1
      exp: 0
      max_exp: 100
```

### computation 解析器

执行计算脚本，支持复杂的动态计算。

```yaml
SmartWeapon:
  item:
    material: NETHERITE_SWORD
    name: "<red>智能武器 <gray>[攻击力: {dynamic:computation:attack_power}]"
    lore:
      - "基础攻击: {dynamic:computation:base_attack}"
      - "等级加成: {dynamic:computation:level_bonus}"
      - "总攻击力: {dynamic:computation:attack_power}"
      - "暴击率: {dynamic:computation:crit_chance}%"
    
    data:
      level: 1
      base_attack: 10
      crit_chance: 5
    
    computation:
      base_attack: |-
        return item.get("base_attack") || 10
      
      level_bonus: |-
        level = item.get("level") || 1
        return level * 2
      
      attack_power: |-
        base = item.get("base_attack") || 10
        level = item.get("level") || 1
        return base + (level * 2)
      
      crit_chance: |-
        base = item.get("crit_chance") || 5
        level = item.get("level") || 1
        return Math.min(base + level, 50)
```

### script 解析器

直接执行脚本代码，获取实时信息。

```yaml
LiveInfo:
  item:
    material: CLOCK
    name: "<yellow>实时信息面板"
    lore:
      - "当前时间: {dynamic:script:new Date().toLocaleString()}"
      - "服务器TPS: {dynamic:script:Bukkit.getTPS()[0].toFixed(2)}"
      - "在线玩家: {dynamic:script:Bukkit.getOnlinePlayers().size()}"
      - "当前世界: {dynamic:script:player.getWorld().getName()}"
      - "坐标: {dynamic:script:Math.floor(player.getLocation().getX()) + ',' + Math.floor(player.getLocation().getY()) + ',' + Math.floor(player.getLocation().getZ())}"
```

---

## 高级应用

### 状态监控物品

```yaml
StatusMonitor:
  item:
    material: REDSTONE
    name: "<rainbow>状态监控器</rainbow>"
    lore:
      - "<gray>━━━━━━━━━━━━━━━━━━━━"
      - "<red>❤ 血量: <white>{dynamic:script:player.getHealth().toFixed(1)}/{dynamic:script:player.getMaxHealth()}"
      - "<blue>🍖 饥饿: <white>{dynamic:script:player.getFoodLevel()}/20"
      - "<yellow>⚡ 经验: <white>{dynamic:script:player.getLevel()}"
      - "<green>💰 金钱: <white>{dynamic:script:economy ? economy.getBalance(player).toFixed(2) : 'N/A'}"
      - "<purple>🌍 世界: <white>{dynamic:script:player.getWorld().getName()}"
      - "<aqua>📍 位置: <white>{dynamic:script:Math.floor(player.getLocation().getX()) + ',' + Math.floor(player.getLocation().getZ())}"
      - "<gray>━━━━━━━━━━━━━━━━━━━━"
    
    action:
      onTick:
        period: 20  # 每秒更新一次
        run: 'item.updateDisplay()'  # 触发显示更新
```

### 进度追踪物品

```yaml
QuestTracker:
  item:
    material: BOOK
    name: "<gold>任务追踪器"
    lore:
      - "<yellow>当前任务: {dynamic:data:current_quest}"
      - "<green>进度: {dynamic:data:progress}/{dynamic:data:max_progress}"
      - "<blue>完成度: {dynamic:computation:completion_percentage}%"
      - ""
      - "<gray>任务描述:"
      - "<white>{dynamic:data:quest_description}"
    
    data:
      current_quest: "收集木材"
      progress: 5
      max_progress: 20
      quest_description: "收集 20 个木材来建造房屋"
    
    computation:
      completion_percentage: |-
        progress = item.get("progress") || 0
        maxProgress = item.get("max_progress") || 1
        return Math.floor((progress / maxProgress) * 100)
    
    action:
      onTick:
        period: 100  # 每5秒检查一次
        run: |-
          // 检查任务进度并更新
          // 这里可以添加任务检查逻辑
```

### 装备属性面板

```yaml
EquipmentPanel:
  item:
    material: DIAMOND_CHESTPLATE
    name: "<blue>装备属性面板"
    lore:
      - "<gray>━━━━━━━━━━━━━━━━━━━━"
      - "<red>⚔ 攻击力: <white>{dynamic:computation:total_attack}"
      - "<blue>🛡 防御力: <white>{dynamic:computation:total_defense}"
      - "<yellow>⚡ 速度: <white>{dynamic:computation:total_speed}"
      - "<green>❤ 生命值: <white>{dynamic:computation:total_health}"
      - "<purple>✨ 魔法力: <white>{dynamic:computation:total_mana}"
      - "<gray>━━━━━━━━━━━━━━━━━━━━"
      - "<aqua>套装效果: {dynamic:computation:set_bonus}"
    
    computation:
      total_attack: |-
        // 计算所有装备的攻击力总和
        total = 0
        inventory = player.getInventory()
        
        // 检查主手武器
        mainHand = inventory.getItemInMainHand()
        if (mainHand && mainHand.hasItemMeta()) {
          // 这里添加获取武器攻击力的逻辑
        }
        
        return total
      
      total_defense: |-
        // 计算所有护甲的防御力总和
        return calculateArmorDefense(player)
      
      set_bonus: |-
        // 检查套装效果
        return checkSetBonus(player)
```

---

## 性能优化

### 智能更新机制

系统只在必要时更新动态内容，避免不必要的计算：

```yaml
OptimizedItem:
  item:
    material: EMERALD
    name: "<green>优化物品"
    lore:
      - "血量: {dynamic:data:cached_health}"  # 使用缓存数据
      - "更新时间: {dynamic:data:last_update}"
    
    action:
      onTick:
        period: 100  # 每5秒更新一次，而不是每tick
        run: |-
          // 只在数据真正变化时更新
          currentHealth = player.getHealth()
          lastHealth = item.get("cached_health") || 0
          
          if (Math.abs(currentHealth - lastHealth) > 0.5) {
            item.set("cached_health", currentHealth)
            item.set("last_update", new Date().toLocaleString())
          }
```

### 条件性动态标签

```yaml
ConditionalDynamic:
  item:
    material: COMPASS
    name: "<yellow>条件动态物品"
    lore:
      - condition: "{dynamic:script:player.getHealth() < 10}"
        content: "<red>⚠ 血量危险！"
      - condition: "{dynamic:script:player.getLevel() >= 10}"
        content: "<gold>⭐ 高等级玩家"
      - "普通信息显示"
```

---

## 技术原理

### 虚拟渲染流程

1. **标记识别**：系统识别配置中的动态标签
2. **虚拟渲染**：在发送到客户端前，实时解析动态内容
3. **差异记录**：记录虚拟物品与原始物品的差异
4. **客户端同步**：将渲染后的物品发送给客户端
5. **恢复机制**：在服务端操作时恢复原始物品数据

### 数据一致性

- **服务端存储**：原始物品数据始终保存在服务端
- **客户端显示**：动态渲染的内容仅用于客户端显示
- **操作恢复**：所有服务端操作都基于原始数据

---

## 最佳实践

1. **合理使用频率**：避免过于频繁的动态更新
2. **缓存计算结果**：对复杂计算进行缓存
3. **条件性更新**：只在数据真正变化时更新
4. **简化脚本逻辑**：保持动态脚本简单高效
5. **测试性能影响**：监控动态物品对服务器性能的影响

---

## API 参考

### 动态标签注册

```kotlin
// 注册动态标签解析器
ItemRegistry.registerDynamicTagResolver(object : ItemTagResolver {
    override val alias = arrayOf("custom")
    
    override fun resolve(args: List<String>, context: ArgumentContext): String? {
        // 自定义动态解析逻辑
        return "动态内容"
    }
})
```

### 虚拟渲染器

```kotlin
// 自定义虚拟渲染器
object CustomVirtualRenderer : VirtualItemRenderer.Acceptor {
    override fun wouldChange(context: ArgumentContext): Boolean {
        // 判断是否需要渲染
        return true
    }
    
    override fun accept(actual: NeoItem, context: ArgumentContext) {
        // 自定义渲染逻辑
    }
}

// 注册渲染器
NativeVirtualItemRenderer.acceptors.add(CustomVirtualRenderer)
```
