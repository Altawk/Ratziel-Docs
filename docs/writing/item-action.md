---
title: 物品动作（重写版）
sidebar_position: 5
---

# 物品动作

如果说“物品长什么样”由基础配置决定，

那么“物品会做什么”，基本就由**动作**决定。

## 动作是什么

你可以把一个动作理解成：

**触发器 + 执行内容**

也就是：

- 什么时候触发
- 触发后执行什么

在配置里，动作通常写在这些节点下：

- `action`
- `actions`
- `event`
- `events`

## 最简单的动作示例

```yaml
MessageSword:
  item:
    material: DIAMOND_SWORD
    name: '<aqua>消息之剑'
    action:
      onRight: 'player.sendMessage("你右键了这把剑")'
```

这段配置的意思是：

- 当玩家右键这把物品时
- 执行一段脚本
- 给玩家发送一条消息

## 常见触发器

下面这些触发器，是当前用户最常用的一批。

| 触发器 | 常见别名 | 说明 |
| --- | --- | --- |
| `onInteract` | `interact` | 任意交互 |
| `onLeft` | `left` | 左键交互 |
| `onRight` | `right` | 右键交互 |
| `onLeftClickAir` | `onLeftAir` | 左键点空气 |
| `onRightClickAir` | `onRightAir` | 右键点空气 |
| `onLeftClickBlock` | `onLeftBlock` | 左键点方块 |
| `onRightClickBlock` | `onRightBlock` | 右键点方块 |
| `onLeftClickEntity` | `onLeftEntity` | 左键点击实体 |
| `onAttack` | `onAtk` `attack` `atk` | 攻击实体 |
| `onRightClickEntity` | `onRightEntity` | 右键点击实体 |
| `onDrop` | `drop` | 丢弃物品 |
| `onPick` | `onPickedUp` `pick` | 拾取物品 |
| `onKill` | `kill` | 用该物品击杀生物 |
| `onTick` | `tick` | 周期触发 |
| `onPost` | `post` | 数据处理完成后触发，偏高级 |

## 不同触发器能拿到什么

在动作脚本里，常见可直接使用的变量包括：

### 大多数动作里通常都有

- `player`：玩家
- `item`：当前物品
- `event`：事件对象（不是所有触发器都有）

### 方块交互触发器里

- `block`：被点击的方块

### 实体交互/攻击触发器里

- `target`：目标实体
- `attacker`：攻击来源（部分场景）

### 丢弃物品时

- `dropped`：掉落出来的物品实体

### 拾取物品时

- `picked`：被拾取的掉落物实体
- `entity`：拾取者实体
- `player`：如果拾取者是玩家，则这里可用

### 击杀时

- `killer`：击杀者
- `entity`：被击杀的实体

### Tick 触发时

- `player`
- `item`

Tick 触发通常没有普通交互事件对象，所以不要默认它一定有 `event`。

## 动作内容怎么写

动作内容最常见有 4 种写法。

## 1. 单行脚本

```yaml
action:
  onRight: 'player.sendMessage("你好")'
```

适合非常简单的操作。

## 2. 多步执行

```yaml
action:
  onDrop:
    - 'player.sendMessage("你丢出了这件物品")'
    - 'dropped.setCustomName("被丢弃的物品")'
    - 'dropped.setCustomNameVisible(true)'
```

这种写法会按顺序执行多个步骤。

## 3. 条件执行

```yaml
action:
  onRight:
    if: 'player.getHealth() < 10'
    then: 'player.sendMessage("你的血量偏低")'
    else: 'player.sendMessage("你的状态良好")'
```

你也可以把 `if` 写成 `condition`。

## 4. 周期触发

`onTick` 和普通动作不同，通常写成对象结构：

```yaml
action:
  onTick:
    period: 20
    run: 'player.sendActionBar("你正在持有这件物品")'
```

这里：

- `period: 20` 表示每 20 tick 触发一次
- `run` 是要执行的内容

如果你只是想做一个简单的持续提示或持续效果，`onTick` 很常用。

## 实用示例 1：右键施法

```yaml
FireWand:
  item:
    material: BLAZE_ROD
    name: '<gold>火焰法杖'
    action:
      onRight:
        - 'player.sendMessage("你施放了火焰法术")'
        - 'player.world.strikeLightningEffect(player.location)'
```

## 实用示例 2：记录攻击次数

```yaml
TrainingSword:
  item:
    material: IRON_SWORD
    name: '<yellow>训练之剑'
    lore:
      - '&7攻击次数：{data:hit_count:0}'
    data:
      hit_count: 0
    action:
      onAttack:
        - 'count = item.get("hit_count") || 0'
        - 'item.set("hit_count", count + 1)'
```

## 实用示例 3：丢弃时加标记

```yaml
OwnerItem:
  item:
    material: DIAMOND
    name: '<aqua>认主物品'
    action:
      onDrop:
        - 'dropped.setCustomName(player.getName() + " 丢出的物品")'
        - 'dropped.setCustomNameVisible(true)'
```

## 关于脚本语言

动作里的字符串通常会被当成脚本处理。

如果你没有特别指定语言，通常会使用当前默认脚本语言。

对大多数用户来说：

- 先用默认脚本语言即可
- 先把动作写通，再考虑切换脚本语言

## 新手建议

### 建议一：先从 `onRight` 和 `onAttack` 开始
这是最容易理解、最容易测试的两类动作。

### 建议二：先让动作只做一件事
比如：

- 发一条消息
- 改一个数据值
- 播一个声音

先确认触发成功，再慢慢叠复杂逻辑。

### 建议三：动作里改数据时，优先用 `item.get()` / `item.set()`
这是最容易理解的写法。

### 建议四：`onTick` 不要一开始就写太重
它会周期执行，逻辑写太复杂时更容易影响使用体验。

## 下一步

看完动作后，建议继续阅读：

- [物品数据（重写版）](./item-data.md)
- [物品标签（重写版）](./item-tag.md)
