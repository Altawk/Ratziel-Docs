---
title: 物品数据
sidebar_position: 4
---

# 物品数据

:::info
广义上的 **物品数据** 分为三层：**常量层 (Properties)**、**数据层 (Data)** 和 **计算层 (Computation)**。
:::

物品数据均为结构化数据，有的存在内存里的，有的实实在在存在物品里的，也有的根据实际数据计算得的。

Tips: 三层数据都是通过直接执行 **[动作语句块](../quick-lookup/action-block.md)** 得到，也就是都支持动作块的语法。

## 常量层

常量层的数据在物品生成**之前**就已经确定。

而且同元素标识下的每一个物品都**共用**这一套常量数据。

可以用来存放一些 *数据层* 或者 *计算层* 需要用到的信息。

**节点名：** `props`、`consts`

**配置示例：**
```YAML
ExampleItem:
  item:
    ...
    props:
      常量1: 1
      常量2: [10,20]
      变量3: {type: "SWORD", attack: 20}
```

## 数据层

数据层的数据在物品生成**时**确定。

同元素表示的不同物品可以有**不同**的数据层数据。

数据层的数据会实打实存储在物品中，因此数据层的值的数据类型是被限定的，只允许 `int` 、`double`、`String` 等基本数据类型和 `Map` 、`List` 两种复杂数据类型。

**节点名：** `data`

**配置示例：**
```YAML
ExampleItem:
  item:
    ...
    data:
      attack_damage: 100
      owner: player.getName()
      list: [1, 2, 3, 4]
      ...
```

其物品的数据结构大概如下：

```Json
{
  ...
  "minecraft:custom_data": {
    "Ratziel": {
      ...
      "data": {
        "attack_damage": 100,
        "owner": "实际的玩家名称",
        "list": [
          1, 2, 3, 4
        ]
        ...
      }
    }
  }
}
```

## 计算层

计算层在三层数据中最后进行。

其主要意义在于**通过计算来确定物品信息**，

可以直接调用 *常量层* 和 *数据层* 的数据,

其的值都是**实时确定**的。

**节点名：** `compute`、`computed`、`define`

我们可以使用标签来直接调用计算层数据。

**配置示例：**
```YAML
ExampleItem:
  item:
    # 常量层
    properties:
      number: 1
    # 数据层
    data:
      hello: "Hello" # String 基本类型
    # 计算层
    compute:
      world: |-
        print("Hello World!")
        "World"
      helloWorld: 'hello + "World"' # hello 调用数据层数据
    lore:
      - '{compute:world}' # 调用计算层数据
      - '{define:helloWorld}'
```

对于标签的解释在下一页。
