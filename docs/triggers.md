---
title: 动作触发器
sidebar_position: 7
---

# 动作触发器

Ratziel 提供了丰富的触发器系统，允许物品在特定事件发生时执行自定义脚本。每个触发器都有其特定的触发条件和可用变量。

## 基础触发器

### onProcess

物品生成过程中触发，用于在物品创建时执行初始化逻辑。

**别名：** `process`

**触发时机：** 物品生成器创建物品时

**内置变量：**

| 变量名   | 类型         | 描述                    |
| -------- | ------------ | ----------------------- |
| `item`   | RatzielItem  | 当前生成的 Ratziel 物品 |
| `player` | Player       | 目标玩家（如果有）      |

---

## 交互触发器

### onInteract

玩家与物品交互时触发，包括左键和右键交互。

**别名：** `interact`、`Interact`

**触发时机：** 玩家使用物品进行任何交互时

**内置变量：**

| 变量名   | 类型                    | 描述           |
| -------- | ----------------------- | -------------- |
| `event`  | PlayerWorldContactEvent | 交互事件对象   |
| `player` | Player                  | 交互的玩家     |
| `item`   | RatzielItem             | 使用的物品     |

### onLeft

左键交互时触发。

**别名：** `left`

**触发时机：** 玩家左键点击时

**继承变量：** 继承自 `onInteract` 的所有变量

### onRight

右键交互时触发。

**别名：** `right`

**触发时机：** 玩家右键点击时

**继承变量：** 继承自 `onInteract` 的所有变量

### 细分交互触发器

#### onLeftClickAir / onRightClickAir

**别名：** `onLeftAir`、`onRightAir`、`left-air`、`right-air`

**触发时机：** 左键/右键点击空气时

#### onLeftClickBlock / onRightClickBlock

**别名：** `onLeftBlock`、`onRightBlock`、`left-block`、`right-block`

**触发时机：** 左键/右键点击方块时

---

## 战斗触发器

### onAttack

使用物品攻击实体时触发。

**别名：** `attack`、`atk`

**触发时机：** 玩家使用物品攻击其他实体时

**内置变量：**

| 变量名   | 类型        | 描述           |
| -------- | ----------- | -------------- |
| `event`  | EntityEvent | 攻击事件       |
| `player` | Player      | 攻击者         |
| `item`   | RatzielItem | 使用的武器     |
| `target` | Entity      | 被攻击的实体   |

### onKill

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

## 物品管理触发器

### onDrop

丢弃物品时触发。

**别名：** `drop`

**触发时机：** 玩家丢弃物品时

**内置变量：**

| 变量名    | 类型        | 描述           |
| --------- | ----------- | -------------- |
| `event`   | DropEvent   | 丢弃事件       |
| `player`  | Player      | 丢弃者         |
| `item`    | RatzielItem | 被丢弃的物品   |
| `dropped` | Item        | 掉落物实体     |

### onPick

拾取物品时触发。

**别名：** `pick`

**触发时机：** 玩家拾取物品时

**内置变量：**

| 变量名   | 类型        | 描述           |
| -------- | ----------- | -------------- |
| `event`  | PickupEvent | 拾取事件       |
| `player` | Player      | 拾取者         |
| `item`   | RatzielItem | 被拾取的物品   |
| `picked` | Item        | 拾取物实体     |

---

## 特殊触发器

### onTick

定时触发器，可以设置触发周期。

**别名：** `tick`

**触发时机：** 按设定周期持续触发

**配置参数：**

| 参数     | 类型   | 描述                           | 默认值    |
| -------- | ------ | ------------------------------ | --------- |
| `period` | int    | 触发周期（tick）               | 1         |
| `slot`   | string | 检测的物品栏位                 | MAIN_HAND |

**可用栏位：**
- `MAIN_HAND` - 主手
- `OFF_HAND` - 副手
- `HELMET` - 头盔
- `CHESTPLATE` - 胸甲
- `LEGGINGS` - 护腿
- `BOOTS` - 靴子

**示例：**
```yaml
onTick:
  period: 20  # 每秒触发一次
  slot: MAIN_HAND
  run: |-
    // 每秒执行的逻辑
    player.sendActionBar("时间: " + System.currentTimeMillis())
```

### onDamage

持有者受到伤害时触发。

**别名：** `damage`

**触发时机：** 物品持有者受到伤害时

**内置变量：**

| 变量名   | 类型               | 描述           |
| -------- | ------------------ | -------------- |
| `event`  | EntityDamageEvent  | 伤害事件       |
| `player` | Player             | 受伤者         |
| `item`   | RatzielItem        | 持有的物品     |

---
