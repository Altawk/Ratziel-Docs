---
title: 物品系统
sidebar_position: 4
---

# 物品系统

Ratziel 提供了业界领先的自定义物品系统，采用组件化设计，支持丰富的物品属性、动态数据、行为触发等高级功能。

## 系统架构

### 核心概念

- **Element（元素）** - 物品的配置定义，包含所有物品信息
- **Generator（生成器）** - 负责将配置转换为实际物品的核心组件
- **Component（组件）** - 物品的各种属性组件，如显示、耐久、附魔等
- **Action（动作）** - 物品的行为逻辑，通过触发器执行

### 生成流程

1. **配置解析** - 读取 YAML 配置文件，解析为 Element 对象
2. **预处理** - 处理继承、模板、脚本等预处理逻辑
3. **组件构建** - 根据配置构建各种物品组件
4. **物品生成** - 将组件组装为最终的 ItemStack
5. **动作注册** - 注册物品的各种触发器和行为

## 配置格式

### 基本结构

物品定义使用 YAML 格式，支持多种配置节点：

```yaml
物品ID:
  meta:  # 或使用 item:
    material: 物品材质
    name: 物品名称
    lore:
      - 第一行描述
      - 第二行描述
    # 其他属性...
```

## 物品属性

### 基础属性

| 属性                   | 描述                   | 示例                                    |
| ---------------------- | ---------------------- | --------------------------------------- |
| `material` / `mat`     | 物品材质               | `DIAMOND_SWORD`                         |
| `name` / `displayName` | 物品名称(支持颜色代码) | `"<red>神器"`                           |
| `lore`                 | 物品描述(支持颜色代码) | `["<white>锋利无比", "<blue>带有魔力"]` |
| `unbreakable`          | 是否不可破坏           | `true`                                  |
| `custom-model-data`    | 自定义模型数据         | `114514`                                |
| `repair-cost`          | 修复消耗               | `3`                                     |
| `enchantable`          | 附魔等级               | `4`                                     |
| `glintOverride`        | 是否覆盖附魔光效       | `false`                                 |
| `durability`           | 耐久度                 | `10000`                                 |

```yaml
物品ID:
  # 物品元数据（推荐使用）
  meta:
    material: DIAMOND_SWORD
    name: "<red>传说之剑"
    lore:
      - "<gray>一把充满传说色彩的神剑"
      - "<yellow>攻击力: +10"

  # 或使用 item 节点（兼容性）
  item:
    material: DIAMOND_SWORD
    # ...其他属性

  # 模板定义（可选）
  template:
    # 模板内容
```

### 配置节点说明

| 节点名     | 用途                     | 优先级 |
| ---------- | ------------------------ | ------ |
| `meta`     | 主要物品配置（推荐）     | 高     |
| `item`     | 物品配置（兼容性）       | 中     |
| `template` | 模板定义                 | 低     |
| `action`   | 动作配置（可在meta内）   | -      |
| `data`     | 数据定义（可在meta内）   | -      |

## 物品组件

### 显示组件 (ItemDisplay)

控制物品的显示名称、描述等视觉属性。

```yaml
物品ID:
  meta:
    # 物品名称（支持 MiniMessage 格式）
    name: "<gradient:red:blue>渐变色名称"
    displayName: "<red>显示名称"  # 别名

    # 物品描述
    lore:
      - "<gray>第一行描述"
      - "<yellow>第二行描述"
      - ""  # 空行
      - "<green>第四行描述"

    # 本地化名称（1.20.5+）
    localizedName: "item.custom.sword"

    # 是否有附魔光效
    enchanted: true
    glintOverride: false  # 覆盖附魔光效
```

**支持的颜色格式：**
- **传统颜色代码** - `&c红色`、`§c红色`
- **十六进制颜色** - `<#FF0000>红色`
- **MiniMessage** - `<red>红色`、`<gradient:red:blue>渐变`
- **RGB 颜色** - `<color:255,0,0>红色`

### 耐久组件 (ItemDurability)

管理物品的耐久度相关属性。

```yaml
物品ID:
  meta:
    # 最大耐久度（1.20.5+）
    durability: 10000
    maxDurability: 10000  # 别名
    max-durability: 10000  # 别名

    # 修复消耗
    repair-cost: 5
    repairCost: 5  # 别名

    # 是否不可破坏
    unbreakable: true
    isUnbreakable: true  # 别名
```

### 附魔组件 (ItemEnchant)

管理物品的附魔属性。

```yaml
物品ID:
  meta:
    enchant:
      # 基础附魔
      SHARPNESS: 5
      UNBREAKING: 3
      MENDING: 1

      # 使用数字ID（不推荐）
      16: 5  # 锋利5

    # 附魔等级（影响附魔台行为）
    enchantable: 10
```

**常用附魔列表：**

| 附魔名称                    | 英文名                    | 适用物品 |
| --------------------------- | ------------------------- | -------- |
| `SHARPNESS`                 | 锋利                      | 剑       |
| `PROTECTION_ENVIRONMENTAL`  | 保护                      | 盔甲     |
| `UNBREAKING`                | 耐久                      | 所有     |
| `MENDING`                   | 经验修补                  | 所有     |
| `EFFICIENCY`                | 效率                      | 工具     |
| `FORTUNE`                   | 时运                      | 工具     |

### 隐藏标签组件 (ItemHideFlag)

控制物品信息的显示和隐藏。

```yaml
物品ID:
  meta:
    hideFlags:
      - HIDE_ATTRIBUTES      # 隐藏属性
      - HIDE_DESTROYS        # 隐藏可破坏方块
      - HIDE_ENCHANTS        # 隐藏附魔
      - HIDE_PLACED_ON       # 隐藏可放置方块
      - HIDE_POTION_EFFECTS  # 隐藏药水效果
      - HIDE_UNBREAKABLE     # 隐藏不可破坏标签
      - HIDE_DYE             # 隐藏染色信息
      - HIDE_ARMOR_TRIM      # 隐藏盔甲纹饰
```

### 杂项组件 (ItemSundry)

包含各种其他属性。

```yaml
物品ID:
  meta:
    # 自定义模型数据（1.14+）
    custom-model-data: 114514
    customModelData: 114514  # 别名

    # 属性修饰符
    attribute-modifiers:
      GENERIC_MAX_HEALTH:
        - name: "health_boost"
          operation: ADD_NUMBER
          amount: 10.0
          slot: HAND
      GENERIC_ATTACK_DAMAGE:
        - name: "damage_boost"
          operation: ADD_NUMBER
          amount: 5.0
          slot: HAND
```

**属性修饰符操作类型：**
- `ADD_NUMBER` - 直接加法
- `ADD_SCALAR` - 百分比加法
- `MULTIPLY_SCALAR_1` - 百分比乘法

**装备槽位：**
- `HAND` - 手持
- `OFF_HAND` - 副手
- `FEET` - 脚部
- `LEGS` - 腿部
- `CHEST` - 胸部
- `HEAD` - 头部

## 基础属性配置

### 材质设置

```yaml
物品ID:
  meta:
    # 基础材质
    material: DIAMOND_SWORD
    mat: DIAMOND_SWORD  # 别名

    # 物品数量
    amount: 1

    # 物品损伤值（1.12及以下）
    damage: 0
```

### 头颅设置

```yaml
头颅物品:
  meta:
    material: PLAYER_HEAD

    # 使用玩家名称
    head: "Notch"

    # 使用 Base64 材质
    head: "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvYjc5..."

    # 使用预设头颅
    head: "MC_jiao_long"
```

### 颜色设置

适用于可染色物品（皮革盔甲、药水等）：

```yaml
彩色物品:
  meta:
    material: LEATHER_CHESTPLATE

    # 十六进制颜色
    color: "FF0000"  # 红色
    color: "#00FF00"  # 绿色

    # RGB 颜色
    color: "255,0,0"  # 红色
```

## 高级功能

### 模板和继承系统

Ratziel 支持强大的模板继承机制，可以大大简化配置工作。

#### 定义模板

```yaml
# 定义基础武器模板
BaseWeapon:
  template:
    material: DIAMOND_SWORD
    unbreakable: true
    hideFlags:
      - HIDE_ATTRIBUTES
      - HIDE_UNBREAKABLE
    enchant:
      UNBREAKING: 3

# 定义显示模板
CoolDisplay:
  template:
    name: "<gradient:red:blue>{name}</gradient>"
    lore:
      - "<gray>━━━━━━━━━━━━━━━━━━━━"
      - "<yellow>⚔ 攻击力: <white>{attack}"
      - "<blue>❤ 生命值: <white>{health}"
      - "<gray>━━━━━━━━━━━━━━━━━━━━"
```

#### 使用继承

```yaml
FireSword:
  meta:
    inherit:
      - BaseWeapon    # 继承基础武器属性
      - CoolDisplay   # 继承显示样式

    # 覆盖和扩展属性
    name: "烈焰之剑"
    enchant:
      FIRE_ASPECT: 2  # 添加火焰附加

    # 模板变量替换
    attack: "15-20"
    health: "+5"
```

#### 多重继承

```yaml
UltimateWeapon:
  meta:
    inherit:
      - BaseWeapon
      - CoolDisplay
      - SpecialEffects  # 可以继承多个模板

    # 最终属性会按继承顺序合并
```

### 动态数据系统

Ratziel 提供了强大的动态数据系统，允许物品存储和修改自定义数据。

#### 数据定义

```yaml
SmartWeapon:
  meta:
    material: DIAMOND_SWORD

    # 定义初始数据
    data:
      kill_count: 0
      last_used: 0
      owner: ""
      level: 1
      experience: 0
      custom_stats:
        strength: 10
        agility: 5

    # 在显示中使用动态数据
    name: "<red>智能武器 <gray>[Lv.{dynamic:data:level}]"
    lore:
      - "<yellow>击杀数: <white>{dynamic:data:kill_count}"
      - "<green>经验值: <white>{dynamic:data:experience}"
      - "<blue>力量: <white>{dynamic:data:custom_stats.strength}"
      - "<aqua>敏捷: <white>{dynamic:data:custom_stats.agility}"
```

#### 动态标签解析器

```yaml
ComplexItem:
  meta:
    # 自定义脚本定义
    define:
      current_time: |-
        return new Date().toLocaleString()

      damage_bonus: |-
        level = item.get("level") || 1
        return level * 2

      status_color: |-
        durability = item.getDurability()
        maxDur = item.getMaxDurability()
        ratio = durability / maxDur
        if (ratio > 0.7) return "green"
        if (ratio > 0.3) return "yellow"
        return "red"

    lore:
      - "当前时间: <gray>{define:current_time}"
      - "伤害加成: <yellow>+{define:damage_bonus}"
      - "状态: <{define:status_color}>●</color>"
```

### 物品源系统

Ratziel 支持多种物品源，可以从不同来源创建物品。

#### 原版材质源

```yaml
VanillaItem:
  meta:
    material: DIAMOND_SWORD  # 使用原版材质
    amount: 1
```

#### 头颅源

```yaml
CustomHead:
  meta:
    material: PLAYER_HEAD

    # 方式1: 玩家名称
    head: "Notch"

    # 方式2: Base64 材质数据
    head: "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUv..."

    # 方式3: 材质URL
    head: "http://textures.minecraft.net/texture/b79..."
```

#### NBT 标签源

```yaml
NBTItem:
  meta:
    # 直接使用 NBT 数据创建物品
    nbt: '{id:"minecraft:diamond_sword",Count:1b,tag:{display:{Name:"{\"text\":\"Custom Sword\"}"}}}'
```

#### 第三方插件源

```yaml
# AzureFlow 物品
AzureFlowItem:
  meta:
    azureflow: "custom_sword_id"

# NeigeItems 物品
NeigeItem:
  meta:
    neigeitems: "special_item"
```

### 动作系统

#### 基础动作配置

```yaml
ActionItem:
  meta:
    material: STICK
    action:
      # 简单脚本
      onInteract: 'player.sendMessage("Hello World!")'

      # 多行脚本
      onAttack: |-
        damage = event.getDamage()
        newDamage = damage * 1.5
        event.setDamage(newDamage)
        player.sendMessage("造成了 " + newDamage + " 点伤害!")

      # 条件执行
      onKill: |-
        if (entity.getType() == EntityType.ZOMBIE) {
          player.giveExp(10)
          player.sendMessage("击杀僵尸获得额外经验!")
        }
```

#### 高级动作功能

```yaml
AdvancedActionItem:
  meta:
    action:
      # Tick 触发器
      onTick:
        period: 20  # 每秒执行一次
        slot: MAIN_HAND
        run: |-
          // 持续效果
          player.addPotionEffect(new PotionEffect(PotionEffectType.SPEED, 25, 0))

      # 条件分支
      onInteract:
        if: 'player.getHealth() > 10'
        then: 'player.sendMessage("血量充足")'
        else: |-
          player.sendMessage("血量不足，正在治疗...")
          player.setHealth(20)

      # 多个动作
      onDrop:
        - 'player.sendMessage("物品已丢弃")'
        - 'dropped.setCustomName("被丢弃的物品")'
        - 'dropped.setCustomNameVisible(true)'
```

### NBT 标签系统

#### 自定义 NBT 数据

```yaml
NBTItem:
  meta:
    material: DIAMOND_SWORD

    # 添加自定义 NBT 标签
    tag:
      # 自定义数据
      minecraft:custom_data:
        ratziel_item: true
        item_id: "custom_sword"
        creation_time: 1640995200

      # 原版标签
      display:
        Name: '{"text":"Custom Name","color":"red"}'
        Lore: ['{"text":"Custom Lore","color":"gray"}']

      # 附魔标签
      Enchantments:
        - id: "minecraft:sharpness"
          lvl: 5
```

#### NBT 数据操作

```yaml
NBTManipulator:
  meta:
    action:
      onInteract: |-
        // 读取 NBT 数据
        customData = item.getNBT().getCompound("minecraft:custom_data")

        // 修改 NBT 数据
        customData.setInt("usage_count", customData.getInt("usage_count") + 1)

        // 保存修改
        item.updateNBT()
```

## 完整示例

### 升级武器系统

```yaml
EvolvingSword:
  meta:
    material: IRON_SWORD

    # 初始数据
    data:
      level: 1
      experience: 0
      kill_count: 0
      max_experience: 100

    # 动态显示
    name: "<gradient:yellow:red>进化之剑</gradient> <gray>[Lv.{dynamic:data:level}]"
    lore:
      - "<gray>━━━━━━━━━━━━━━━━━━━━"
      - "<yellow>⚔ 等级: <white>{dynamic:data:level}"
      - "<blue>📊 经验: <white>{dynamic:data:experience}/{dynamic:data:max_experience}"
      - "<red>💀 击杀: <white>{dynamic:data:kill_count}"
      - "<gray>━━━━━━━━━━━━━━━━━━━━"
      - "<green>每次击杀获得经验，升级提升属性"

    # 动态附魔（根据等级）
    define:
      sharpness_level: |-
        level = item.get("level") || 1
        return Math.min(level, 5)

    enchant:
      SHARPNESS: "{define:sharpness_level}"

    # 击杀获得经验
    action:
      onKill: |-
        // 获取当前数据
        level = item.get("level") || 1
        exp = item.get("experience") || 0
        maxExp = item.get("max_experience") || 100
        killCount = item.get("kill_count") || 0

        // 增加经验和击杀数
        newExp = exp + 10
        newKillCount = killCount + 1

        // 更新击杀数
        item.set("kill_count", newKillCount)

        // 检查是否升级
        if (newExp >= maxExp) {
          newLevel = level + 1
          newExp = 0
          newMaxExp = maxExp + 50

          item.set("level", newLevel)
          item.set("experience", newExp)
          item.set("max_experience", newMaxExp)

          player.sendMessage("<gold>⭐ 武器升级到 " + newLevel + " 级!")
          player.playSound(player.getLocation(), Sound.ENTITY_PLAYER_LEVELUP, 1, 1)
        } else {
          item.set("experience", newExp)
          player.sendMessage("<green>+10 经验 (" + newExp + "/" + maxExp + ")")
        }

### 技能武器系统

```yaml
SkillSword:
  meta:
    material: DIAMOND_SWORD
    name: "<rainbow>技能之剑</rainbow>"

    data:
      skill_cooldown: 0
      mana: 100
      max_mana: 100

    lore:
      - "<blue>🔮 法力: <white>{dynamic:data:mana}/{dynamic:data:max_mana}"
      - "<gray>右键释放技能"

    action:
      # 法力回复
      onTick:
        period: 20
        run: |-
          mana = item.get("mana") || 0
          maxMana = item.get("max_mana") || 100
          if (mana < maxMana) {
            item.set("mana", Math.min(mana + 5, maxMana))
          }

      # 技能释放
      onRight: |-
        currentTime = System.currentTimeMillis()
        lastUse = item.get("skill_cooldown") || 0
        mana = item.get("mana") || 0

        // 检查冷却时间（5秒）
        if (currentTime - lastUse < 5000) {
          remaining = Math.ceil((5000 - (currentTime - lastUse)) / 1000)
          player.sendMessage("<red>技能冷却中，还需 " + remaining + " 秒")
          return
        }

        // 检查法力值
        if (mana < 30) {
          player.sendMessage("<red>法力不足，需要 30 点法力")
          return
        }

        // 消耗法力
        item.set("mana", mana - 30)
        item.set("skill_cooldown", currentTime)

        // 释放技能效果
        player.sendMessage("<gold>⚡ 释放雷电冲击!")

        // 对周围敌人造成伤害
        location = player.getLocation()
        world = location.getWorld()

        for (entity in world.getNearbyEntities(location, 5, 5, 5)) {
          if (entity instanceof LivingEntity && entity != player) {
            entity.damage(10, player)
            entity.getWorld().strikeLightningEffect(entity.getLocation())
          }
        }
```

### 绑定物品系统

```yaml
BoundItem:
  meta:
    material: DIAMOND_PICKAXE
    name: "<gold>绑定镐子</gold>"

    data:
      owner: ""
      bound: false

    lore:
      - "<gray>所有者: <white>{dynamic:data:owner}"
      - "<yellow>绑定物品，只有所有者可以使用"

    action:
      # 首次拾取时绑定
      onPick: |-
        bound = item.get("bound") || false
        if (!bound) {
          item.set("owner", player.getName())
          item.set("bound", true)
          player.sendMessage("<green>物品已绑定到你的账户!")
        }

      # 检查使用权限
      onInteract: |-
        owner = item.get("owner") || ""
        if (owner != "" && owner != player.getName()) {
          event.setCancelled(true)
          player.sendMessage("<red>这个物品不属于你!")
        }

      # 防止其他玩家拾取
      onDrop: |-
        owner = item.get("owner") || ""
        if (owner != "") {
          dropped.setCustomName("§c" + owner + " 的物品")
          dropped.setCustomNameVisible(true)
        }
```