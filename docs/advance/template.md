---
title: 模板继承
sidebar_position: 1
---

# 模板继承

**模板继承**允许你创建可重用的配置模板，通过继承机制大大简化物品配置工作，避免重复代码，提高配置的可维护性。

## 定义模板

**模板**是一个可被其他配置继承的基础配置单元，使用 `template` 元素类型定义。

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

## 继承模板

### 合并式继承

我们可在物品配置中使用 `inherit` 节点 (别名 `extend`) 来继承一个模板。

它将通过一定的 **[合并策略](#合并策略)** 来合并模板中的数据。

示例：

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

## 引用式继承

你可以使用 **[标签](../quick-lookup/tag-resolver.md)** 来引用模板中的特定值，而无需定义继承节点。

**标签别名：** `inherit`、`extend`

**用法：** `{inherit:模板名:路径}` 或 `{inherit:模板名.路径}`

**示例：**

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
      - "攻击力: {extend:BaseStats:attack_damage}"
      - "防御力: {inherit:BaseStats.defense}"
      - "速度: {extend:BaseStats:speed}"
      - ""
      - "{inherit:BaseStats.description}"
```


---

## 嵌套模板

模板支持嵌套继承，即一个模板可以继承自另一个模板，形成多级继承关系。

:::warning
不要让模板自己继承自己或者让父模板继承子模板，其会造成循环继承导致继承部分失效。（尽管插件会检测并发出警告）
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

## 动作继承

继承模板后，各级动作会形成动作链，按照从父到子的顺序执行：

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

攻击后，玩家将会看到以下内容：

1. `基础攻击效果`
2. `魔法攻击效果`
3. `我的武器攻击效果`

## 合并策略

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

替换后会变成：

```yaml
MyItem:
  item:
    inherit: BaseItem
    lore:
      - "基础描述1"
      - "基础描述2"
```

如需要继承父模板的列表内容，请使用 **[引用式继承](#引用式继承)**。
