---
title: 物品系统
sidebar_position: 4
---

# 物品系统

Ratziel插件提供了强大的自定义物品系统，支持多种功能，如属性修改、行为触发、动态数据等。

## 基本配置格式

物品定义使用YAML格式，每个物品通过唯一ID进行标识。基本结构如下：

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

### 头颅相关

```yaml
物品ID:
  meta:
    # 使用预设头颅
    head: MC_jiao_long  
    
    # 或使用Base64编码的皮肤数据
    head: e3RleHR1cmVzOnt...
    
    # 设置颜色 (适用于可染色物品)
    color: "38E443"  # 十六进制颜色代码
```

### 附魔和属性

```yaml
物品ID:
  meta:
    enchant:
      PROTECTION_ENVIRONMENTAL: 1
      ARROW_KNOCKBACK: 100
    
    hideFlags:
      - HIDE_ATTRIBUTES
      - HIDE_DESTROYS
      
    attribute-modifiers:
      GENERIC_MAX_HEALTH:
        - name: minecraft:generic.max_health
          operation: ADD_NUMBER
          amount: 10
          slot: HAND
```

## 模板和继承

可以定义物品模板并让其他物品继承：

```yaml
模板ID:
  template:  # 定义为模板
    displayName: "<red>模板名称"
    lore: ["模板描述1", "模板描述2"]

物品ID:
  meta:
    inherit: 模板ID  # 继承模板
    # 覆盖或添加更多属性...
```

## 动态数据

### 定义和使用数据

```yaml
物品ID:
  meta:
    data:
      kill_count: 0  # 定义初始数据
      custom_data: "自定义值"
    
    # 在lore中使用动态数据
    lore:
      - "击杀数: {dynamic:data:kill_count}"
      - "自定义数据: {dynamic:data:custom_data}"
```

### 自定义脚本定义

```yaml
物品ID:
  meta:
    define:
      data1: |-
        print("执行脚本")
        return 2  # 返回值
    
    lore:
      - "自定义脚本结果: {define:data1}"
```

## 交互触发器

物品可以定义多种交互触发器，在特定事件发生时执行脚本：

```yaml
物品ID:
  meta:
    action:
      # 攻击实体时触发
      onAttack: |-
        cd = item.service.get(Cooldown).get(attacker, "ATK")
        
        if (cd.isInCooldown()) {
            event.setCancelled(true)
            player.sendRichMessage("<rainbow>冷却中...")
        } else {
            event.getAction().getSource().setDamage(20.0)
            cd.setCooldown("1.5s")
        }
      
      # 击杀实体时触发
      onKill: |-
         count = item.get("kill_count")
         if (count == null) {
           item.set("kill_count", 0)
         } else {
           item.set("kill_count", count + 1)
         }
```

### 可用触发器列表

| 触发器       | 描述                     |
| ------------ | ------------------------ |
| `onAttack`   | 使用物品攻击实体时触发   |
| `onKill`     | 使用物品击杀实体时触发   |
| `onDamage`   | 物品持有者受到伤害时触发 |
| `onDrop`     | 丢弃物品时触发           |
| `onPick`     | 拾取物品时触发           |
| `onInteract` | 交互时触发               |
| `onRelease`  | 释放物品时触发           |

## 物品标签

可以给物品添加自定义NBT标签：

```yaml
物品ID:
  meta:
    tag:
      minecraft:custom_data:
        customField: "自定义值"
```

## 案例

### 杀敌计数器

```yaml
KillCounter:
  meta:
    material: diamond_sword
    name: '<blue>已击杀: <yellow>{dynamic:data:kill_count}'
    data:
      kill_count: 0
    action:
      onKill:
        - 'count = item.get("kill_count").content'
        - 'item.set("kill_count", new NbtInt(count + 1))'
```

### 物品绑定

```yaml
owned:
  item:
    mat: diamond_sword
    name: "绑定之剑"
    actions:
      onDrop: 'dropped.setOwner(player.getUniqueId())'
      onPick: |-
        owner = picked.getOwner()
        if (owner && entity.getUniqueId() != owner) {
            event.setCancelled(true)
        }
``` 