---
title: 模板继承（重写版）
sidebar_position: 8
---

# 模板继承

当你开始写第二个、第三个物品时，很快就会遇到一个问题：

**很多配置都在重复。**

例如：

- 都是不坏武器
- 都要隐藏同一组标签
- 都要带同样的基础 lore
- 都要复用同一套动作

这时候就应该开始用模板。

## 模板是什么

模板本质上就是：

**一份可以被其他物品重复引用的基础配置。**

在 Ratziel 里，模板通常写成 `template` 元素。

## 定义一个最简单的模板

```yaml
BaseWeapon:
  template:
    material: DIAMOND_SWORD
    unbreakable: true
    hideFlags:
      - HIDE_ATTRIBUTES
      - HIDE_UNBREAKABLE
```

这份模板表示：

- 默认材质是钻石剑
- 默认不可破坏
- 默认隐藏部分标签

## 在物品里继承模板

模板继承常用节点：

- `inherit`
- `extend`

最简单示例：

```yaml
FireSword:
  item:
    inherit: BaseWeapon
    name: '<gold>烈焰之剑'
```

这表示：

- `FireSword` 先拿到 `BaseWeapon` 里的内容
- 再叠加它自己写的配置

## 继承多个模板

你也可以一次继承多个模板：

```yaml
BaseWeapon:
  template:
    material: DIAMOND_SWORD
    unbreakable: true

WeaponDisplay:
  template:
    lore:
      - '&7这是一把武器'
      - '&7请谨慎使用'

FireSword:
  item:
    inherit:
      - BaseWeapon
      - WeaponDisplay
    name: '<gold>烈焰之剑'
```

## 合并规则：你最需要知道的部分

当前模板合并的关键规则可以简单理解为：

### 1. 子级优先
如果物品自己已经写了某个字段，模板通常不会强行覆盖它。

例如：

```yaml
BaseWeapon:
  template:
    material: DIAMOND_SWORD

FireSword:
  item:
    inherit: BaseWeapon
    material: NETHERITE_SWORD
```

最终 `FireSword` 用的是：

```yaml
material: NETHERITE_SWORD
```

也就是物品自己的写法优先。

### 2. 对象内容会继续向下补
如果某个字段本身是对象，而且子级没有写完整，模板里的缺失部分会继续补进来。

例如：

```yaml
BaseWeapon:
  template:
    enchant:
      UNBREAKING: 3
      SHARPNESS: 2

FireSword:
  item:
    inherit: BaseWeapon
    enchant:
      FIRE_ASPECT: 2
```

最终你通常会得到一个“子级补充自己内容、父级补上缺失内容”的效果。

### 3. 动作不会按普通字段直接混进来
模板里的动作不是简单跟普通字段一起覆盖，而是会形成**动作链**。

也就是说，父模板和子物品都能拥有自己的动作，并按顺序执行。

## 动作链示例

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
      onAttack: 'player.sendMessage("这是你自己的攻击效果")'
```

当你攻击时，动作会从父到子依次执行。

因此模板很适合用来放：

- 公共提示
- 公共限制逻辑
- 公共附加效果

## 使用模板引用某个值

除了整个继承，你还可以只读取模板里的某个值。

推荐写法：

```yaml
{inherit:模板名:路径}
```

例如：

```yaml
BaseDisplay:
  template:
    name: '<gold>通用名称'
    data:
      attack: 10

MyItem:
  item:
    lore:
      - '模板名称：{inherit:BaseDisplay:name}'
      - '模板攻击：{inherit:BaseDisplay:data:attack}'
```

如果你只是想稳定地取模板里的某个字段，建议优先使用这种“冒号分段”的写法。

## 循环继承要避免

不要这样写：

```yaml
A:
  template:
    inherit: B

B:
  template:
    inherit: A
```

也不要让模板自己继承自己。

当前实现会尝试截断这种链路并给出警告，但这并不意味着你应该依赖这种行为。

## 模板适合放什么

非常适合放进模板里的内容：

- 通用显示
- 通用材质
- 通用附魔
- 通用动作
- 通用隐藏标签
- 一组共用的基础参数

不太建议全塞进模板里的内容：

- 每件物品都不同的唯一数据
- 只会用一次、没有复用价值的内容
- 很依赖当前物品上下文的临时逻辑

## 一个更实用的完整例子

```yaml title="plugins/Ratziel/workspace/template-example.yml"
BaseWeapon:
  template:
    material: DIAMOND_SWORD
    unbreakable: true
    hideFlags:
      - HIDE_ATTRIBUTES
      - HIDE_UNBREAKABLE
    lore:
      - '&7这是一把通用武器'
    action:
      onAttack: 'player.sendMessage("武器已命中目标")'

FireSword:
  item:
    inherit: BaseWeapon
    name: '<gold>烈焰之剑'
    lore:
      - '&c附带火焰之力'
    action:
      onAttack:
        - 'player.sendMessage("烈焰灼烧了目标")'
```

这类写法很适合做：

- 武器模板
- 护甲模板
- 品质模板
- 套装模板

## 新手建议

### 建议一：先做一个 `BaseWeapon`
这是最容易立刻看到收益的模板。

### 建议二：优先把“重复最多”的内容抽到模板里
不要为了用模板而用模板。

### 建议三：模板名字单独做好分类
例如：

- `BaseWeapon`
- `BaseArmor`
- `RareDisplay`
- `QuestItemBase`

后面维护会轻松很多。

### 建议四：模板动作要尽量做“公共动作”
例如公共提示、公共检查、公共粒子效果。

## 下一步

模板熟悉后，建议继续回头配合这些内容一起用：

- [物品动作（重写版）](./item-action.md)
- [物品数据（重写版）](./item-data.md)
- [物品标签（重写版）](./item-tag.md)
