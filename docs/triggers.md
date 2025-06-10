---
title: 动作触发器
sidebar_position: 7
---

# 动作触发器

## onProcess

物品生成过程中触发

**别名：** `release`

**内置变量：**

| 变量名   | 描述         |
| -------- | ------------ |
| `item`   | Ratziel 物品 |
| `player` | 玩家         |

---

## onInteract

玩家交互时触发。

**别名：** `interact` 、 `Interact`

**内置变量：**

| 变量名   | 描述         |
| -------- | ------------ |
| `event`  | 事件         |
| `player` | 谁交互了     |
| `item`   | Ratziel 物品 |

---

### onLeft

左键交互触发。

**别名：** `left`

---

### onRight

右键交互触发。

**别名：** `right`

---

### onAttack

使用物品攻击实体时触发。

**别名：** `attack`

**内置变量：**

| 变量名   | 描述         |
| -------- | ------------ |
| `event`  | 攻击事件     |
| `player` | 攻击者       |
| `item`   | Ratziel 物品 |
| `target` | 被攻击实体   |

---

## onKill

击杀实体时触发。

**别名：** `kill`

**内置变量：**

| 变量名   | 描述         |
| -------- | ------------ |
| `event`  | 击杀事件     |
| `player` | 击杀者       |
| `item`   | Ratziel 物品 |
| `target` | 被击杀实体   |

---

## onDrop

丢弃物品时触发。

**别名：** `drop`

**内置变量：**

| 变量名    | 描述         |
| --------- | ------------ |
| `event`   | 丢弃事件     |
| `player`  | 丢弃者       |
| `item`    | Ratziel 物品 |
| `dropped` | 掉落物实体   |

---

## onPick

拾取物品时触发。

**别名：** `pick`

**内置变量：**

| 变量名   | 描述         |
| -------- | ------------ |
| `event`  | 拾取事件     |
| `player` | 拾取者       |
| `item`   | Ratziel 物品 |
| `picked` | 拾取物实体   |

---

## onDamage

持有者受到伤害时触发。

**别名：** `damage`

**内置变量：**

| 变量名   | 描述         |
| -------- | ------------ |
| `event`  | 伤害事件     |
| `player` | 受伤者       |
| `item`   | Ratziel 物品 |

---
