---
title: 节点解析器
sidebar_position: 9
---

# 简介

节点解析器（Section Resolver）在 Ratziel 中用于处理配置文件节点。

它们在物品生成过程中对配置的各个部分进行预处理和解析，实现继承、标签解析、脚本处理等功能。

## 工作原理

节点解析器在物品构建流程中分两个阶段工作：

1. **准备阶段（Prepare）**：在解析开始前进行预处理，如继承合并、脚本预编译等
2. **解析阶段（Resolve）**：对配置节点进行实际的解析处理

## 解析器列表

### PAPI 解析器

PlaceholderAPI 解析器，处理 PAPI 变量。

**示例：**
```yaml
PapiItem:
  meta:
    material: PLAYER_HEAD
    name: "玩家信息"
    lore:
      - "玩家: %player_name%"
      - "等级: %player_level%"
      - "血量: %player_health%"
      - "位置: %player_x%, %player_y%, %player_z%"
      - "余额: %vault_eco_balance%"
```

**注意：** 需要安装 PlaceholderAPI 插件及相关扩展。

---

### 内联脚本解析器

处理配置中的脚本代码块。

**用法：**
- `{{ 脚本内容 }}`
- `{{ 语言:脚本内容 }}`

---

### 继承解析器

继承解析器，处理物品配置的继承关系。

**功能：**
- 在准备阶段合并继承的配置
- 支持标签形式的继承引用

**配置示例：**
```yaml
BaseWeapon:
  meta:
    material: DIAMOND_SWORD
    name: "基础武器"
    attack_damage: 10
    enchant:
      SHARPNESS: 3

MyWeapon:
  meta:
    inherit: BaseWeapon  # 继承 BaseWeapon 的所有配置
    material: IRON_SWORD  # 覆盖材料
    name: "我的武器"      # 覆盖名称
```
