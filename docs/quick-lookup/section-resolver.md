---
title: 片段解析器
sidebar_position: 5
---

# 片段解析器

**片段解析器（Section Resolver）** 用于处理配置文件片段。

## 解析器列表

### PAPI 解析器

PlaceholderAPI 解析器，处理 PAPI 变量。

**示例：**
```yaml
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
  template:
    material: DIAMOND_SWORD
    name: "基础武器"
    attack_damage: 10
    enchant:
      SHARPNESS: 3

MyWeapon:
  item:
    inherit: BaseWeapon  # 继承 BaseWeapon 的所有配置
    material: IRON_SWORD  # 覆盖材料
    name: "我的武器"      # 覆盖名称
```
