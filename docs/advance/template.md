---
title: 模板继承
sidebar_position: 1
---

# 模板继承

**模板继承**允许你创建可重用的配置模板，通过继承机制大大简化物品配置工作，避免重复代码，提高配置的可维护性。


## 核心概念

### 模板（Template）
模板是一个可被其他配置继承的基础配置单元，使用 `template` 元素类型定义。

### 继承（Inheritance）
子配置可以继承父模板的所有属性，并可以覆盖或扩展这些属性。

### 继承链（Inheritance Chain）
支持多级继承，形成从根模板到最终物品的完整继承链。

---

## 定义模板

:::info
**模板**是一个可被其他配置继承的基础配置单元，使用 `template` 元素类型定义。
:::

如下配置就定义了两个名为 `BaseWeapon` 和 `CoolDisplay` 的模板

```yaml
# 基础武器模板
BaseWeapon:
  template:
    material: DIAMOND_SWORD
    unbreakable: true
    hideFlags:
      - HIDE_ATTRIBUTES
      - HIDE_UNBREAKABLE
    enchant:
      UNBREAKING: 3
      SHARPNESS: 2

# 显示样式模板
CoolDisplay:
  template:
    name: "<gradient:red:blue>{item_name}</gradient>"
    lore:
      - "<gray>━━━━━━━━━━━━━━━━━━━━"
      - "<yellow>⚔ 攻击力: <white>{attack_damage}"
      - "<blue>❤ 生命值: <white>{health_bonus}"
      - "<gray>━━━━━━━━━━━━━━━━━━━━"
```

我们可在物品中使用 `inherit` 节点 (别名 `extend`) 来继承一个模板，如：

```yaml
# 继承基础武器模板
FireSword:
  item:
    inherit: BaseWeapon  # 继承 BaseWeapon 的所有配置
    # 覆盖属性
    material: NETHERITE_SWORD
    name: "烈焰之剑"
    # 扩展属性
    enchant:
      FIRE_ASPECT: 2  # 添加火焰附加
      SHARPNESS: 5    # 覆盖锋利等级
```

---

## 嵌套继承

模板支持嵌套继承，即一个模板可以继承自另一个模板，形成多级继承关系。

:::warning
但请注意，不要让模板自己继承自己或者让父模板继承子模板，会造成循环继承。

尽管插件会检测并发出警告，但还是要在写的时候注意下。
:::

```yaml
# 第一级：基础模板
BaseItem:
  template:
    unbreakable: true
    hideFlags: [HIDE_ATTRIBUTES]

# 第二级：武器模板
BaseWeapon:
  template:
    inherit: BaseItem  # 继承基础模板
    material: IRON_SWORD
    enchant:
      UNBREAKING: 3

# 第三级：魔法武器模板
MagicWeapon:
  template:
    inherit: BaseWeapon  # 继承武器模板
    enchant:
      SHARPNESS: 3
    data:
      mana: 100

# 最终物品
FireMagicSword:
  item:
    inherit: MagicWeapon  # 继承魔法武器模板
    name: "烈焰魔法剑"
    enchant:
      FIRE_ASPECT: 2
```

---

## 标签使用

### 基础标签语法

使用 `{inherit:模板名:路径}` 或 `{inherit:模板名.路径}` 语法引用模板中的特定值：

```yaml
BaseStats:
  template:
    attack_damage: 15
    defense: 8
    speed: 1.2
    description: "一把强力的武器"

MyWeapon:
  item:
    material: DIAMOND_SWORD
    name: "我的武器"
    lore:
      - "攻击力: {inherit:BaseStats:attack_damage}"
      - "防御力: {inherit:BaseStats.defense}"
      - "速度: {inherit:BaseStats:speed}"
      - ""
      - "{inherit:BaseStats.description}"
```

### 路径解析

支持复杂的路径解析，包括对象嵌套和数组索引：

```yaml
ComplexTemplate:
  template:
    stats:
      combat:
        attack: 20
        defense: 15
      magic:
        power: 30
        mana: 100
    descriptions:
      - "第一行描述"
      - "第二行描述"
      - "第三行描述"

MyItem:
  item:
    name: "复杂物品"
    lore:
      - "攻击力: {inherit:ComplexTemplate:stats:combat:attack}"
      - "魔法力量: {inherit:ComplexTemplate.stats.magic.power}"
      - "描述: {inherit:ComplexTemplate:descriptions:[0]}"  # 数组索引
      - "{inherit:ComplexTemplate.descriptions.[1]}"
```

### 多种路径格式

```yaml
# 支持的路径格式：
# 1. 冒号分隔：{inherit:模板名:路径1:路径2:路径3}
# 2. 点号分隔：{inherit:模板名.路径1.路径2.路径3}
# 3. 混合格式：{inherit:模板名:路径1.路径2:路径3}
# 4. 数组索引：{inherit:模板名:数组名:[索引]}

WeaponTemplate:
  template:
    enchants:
      primary: [SHARPNESS, UNBREAKING]
      secondary: [FIRE_ASPECT, LOOTING]

MyWeapon:
  item:
    lore:
      - "主要附魔: {inherit:WeaponTemplate:enchants:primary:[0]}"
      - "次要附魔: {inherit:WeaponTemplate.enchants.secondary.[0]}"
```

---

## 合并策略

### 对象合并

对象类型的属性会进行深度合并，子配置的属性会覆盖父模板的同名属性：

```yaml
BaseWeapon:
  template:
    enchant:
      UNBREAKING: 3
      SHARPNESS: 2
    data:
      durability: 1000
      level: 1

MyWeapon:
  item:
    inherit: BaseWeapon
    enchant:
      SHARPNESS: 5      # 覆盖父模板的锋利等级
      FIRE_ASPECT: 2    # 添加新的附魔
    data:
      level: 5          # 覆盖等级
      # durability: 1000 保持不变
```

**合并结果：**
```yaml
# 最终效果等同于：
MyWeapon:
  item:
    enchant:
      UNBREAKING: 3     # 来自父模板
      SHARPNESS: 5      # 被子配置覆盖
      FIRE_ASPECT: 2    # 子配置新增
    data:
      durability: 1000  # 来自父模板
      level: 5          # 被子配置覆盖
```

### 数组合并

数组类型的属性会被完全替换，不会进行合并：

```yaml
BaseItem:
  template:
    lore:
      - "基础描述1"
      - "基础描述2"

MyItem:
  item:
    inherit: BaseItem
    lore:
      - "新描述1"
      - "新描述2"
      - "新描述3"
```

**结果：** `lore` 完全被子配置的内容替换。

---

## 动作继承

### 动作链执行

继承的动作会形成执行链，按照从父到子的顺序执行：

```yaml
BaseWeapon:
  template:
    action:
      onAttack: 'player.sendMessage("基础攻击效果")'

MagicWeapon:
  template:
    inherit: BaseWeapon
    action:
      onAttack: 'player.sendMessage("魔法攻击效果")'

MyWeapon:
  item:
    inherit: MagicWeapon
    action:
      onAttack: 'player.sendMessage("我的武器攻击效果")'
```

**执行顺序：**
1. BaseWeapon 的 onAttack
2. MagicWeapon 的 onAttack  
3. MyWeapon 的 onAttack

### 动作优先级

继承的动作具有比物品自身动作更高的优先级，确保父模板的逻辑先执行。

---

## 循环继承检测

系统会自动检测并阻止循环继承：

```yaml
# 错误示例 - 会被系统阻止
TemplateA:
  template:
    inherit: TemplateB

TemplateB:
  template:
    inherit: TemplateC

TemplateC:
  template:
    inherit: TemplateA  # 循环继承！
```

**系统行为：**
- 检测到循环继承时会输出警告
- 停止继承链的构建
- 使用已解析的部分配置
