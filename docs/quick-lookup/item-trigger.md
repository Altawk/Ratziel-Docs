---
title: 物品触发器
sidebar_position: 4
---

# 物品触发器

插件提供了丰富的触发器，允许在特定事件发生时执行自定义动作块。

每个触发器都有其特定的触发条件和可用变量。

同时部分触发器还支持可配置额外条件。

:::info
**子触发器:** 子触发器触发时父触发器也会触发，同时子触发器继承父触发器的所有内置变量。
:::

## onPost - 数据处理完成

物品生成过程中触发，用于在物品创建时执行初始化逻辑。

**别名：** `post` (驿站)

**触发时机：** 物品生成器创建物品时

**内置变量：**

| 变量名   | 类型        | 描述               |
| -------- | ----------- | ------------------ |
| `item`   | RatzielItem | RatzielItem 物品   |
| `player` | Player      | 目标玩家（如果有） |

---

## onInteract - 交互

玩家使用物品交互时触发，包括左键和右键交互等等。

**别名：** `interact`、`Interact`

**触发时机：** 玩家使用物品进行任何交互时

**内置变量：**

| 变量名   | 类型                    | 描述         |
| -------- | ----------------------- | ------------ |
| `event`  | PlayerWorldContactEvent | 交互事件对象 |
| `player` | Player                  | 交互的玩家   |
| `item`   | RatzielItem             | 使用的物品   |

---

### onLeft - 左键交互

所有左键交互时触发。

**父触发器：onInteract**

**别名：** `left`

**触发时机：** 玩家左键点击时

### onRight - 右键交互

右键交互时触发。

**父触发器：onInteract**

**别名：** `right`

**触发时机：** 玩家右键点击时

#### onLeftClickAir / onRightClickAir

**父触发器：onLeft / onRight**

**别名：** `onLeftAir`、`left-air` / `onRightAir`、`right-air`

**触发时机：** 左键/右键点击空气时

#### onLeftClickBlock / onRightClickBlock

**父触发器：onLeft / onRight**

**别名：** `onLeftBlock`、`left-block` / `onRightBlock`、`right-block`

**触发时机：** 左键/右键点击方块时

#### onLeftClickEntity / onRightClickEntity

**父触发器：onLeft / onRight**

**别名：** `onLeftEntity`、`left-entity` / `onRightEntity`、`right-entity`

**触发时机：** 左键/右键点击方块时

---

## onAttack - 攻击

使用物品攻击实体时触发。

**父触发器：onLeftClickEntity**

**别名：** `attack`、`atk`、`onAtk`

**触发时机：** 玩家使用物品攻击其他实体时

**内置变量：**

| 变量名   | 类型        | 描述         |
| -------- | ----------- | ------------ |
| `event`  | EntityEvent | 攻击事件     |
| `player` | Player      | 攻击者       |
| `item`   | RatzielItem | 使用的武器   |
| `target` | Entity      | 被攻击的实体 |

---

## onKill - 击杀

击杀实体时触发。

**别名：** `kill`

**触发时机：** 使用物品击杀实体时

**内置变量：**

| 变量名   | 类型             | 描述           |
| -------- | ---------------- | -------------- |
| `event`  | EntityDeathEvent | 击杀事件       |
| `player` | Player           | 击杀者         |
| `killer` | Player           | 击杀者（别名） |
| `item`   | RatzielItem      | 使用的武器     |
| `entity` | Entity           | 被击杀的实体   |

---

## onDrop

丢弃物品时触发。

**别名：** `drop`

**触发时机：** 玩家丢弃物品时

**内置变量：**

| 变量名    | 类型                | 描述         |
| --------- | ------------------- | ------------ |
| `event`   | PlayerDropItemEvent | 丢弃事件     |
| `player`  | Player              | 丢弃者       |
| `item`    | RatzielItem         | 被丢弃的物品 |
| `dropped` | Item                | 掉落物实体   |

---

## onPick

拾取物品时触发。

**别名：** `onPickedUp`、`pick`

**触发时机：** 玩家拾取物品时

**内置变量：**

| 变量名   | 类型                  | 描述         |
| -------- | --------------------- | ------------ |
| `event`  | EntityPickupItemEvent | 拾取事件     |
| `player` | Player                | 拾取者       |
| `item`   | RatzielItem           | 被拾取的物品 |
| `picked` | Item                  | 拾取物实体   |

---

## onTick

定时触发器，可以设置触发周期。

**别名：** `tick`

**触发时机：** 按设定周期持续触发

**内置变量：**

| 变量名   | 类型        | 描述           |
| -------- | ----------- | -------------- |
| `player` | Player      | 玩家           |
| `item`   | RatzielItem | 指定栏位的物品 |

**配置参数：**

| 参数     | 描述             | 默认值    |
| -------- | ---------------- | --------- |
| `period` | 触发周期（tick） | 1         |
| `slot`   | 检测的物品栏位   | MAIN_HAND |

**可用栏位：**
- `MAIN_HAND` - 主手
- `OFF_HAND` - 副手
- `HELMET` - 头盔
- `CHESTPLATE` - 胸甲
- `LEGGINGS` - 护腿
- `BOOTS` - 靴子
- 任意栏位 ID

**示例：**
```yaml
onTick:
  period: 20  # 每秒触发一次
  slot: MAIN_HAND
  run: |-
    // 每秒执行的逻辑
    player.sendActionBar("时间: " + System.currentTimeMillis())
```
