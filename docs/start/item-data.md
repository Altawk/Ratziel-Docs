---
title: 物品数据
sidebar_position: 4
---

# 物品数据

:::info
广义上的 **物品数据** 分为三层：**常量层 (Properties)**、**数据层 (Data)** 和 **计算层 (Computation)**。
:::

物品数据有存在内存里的，有实实在在存在物品里的，也有根据实际数据计算得的。详细信息见下三层数据层。

Tips: 三层数据都是通过直接执行 **动作语句块** 得到，也就是都支持动作块的语法。

（设计参考了 AzureFlow 的数据层设计）

## 常量层

常量层的数据在物品生成**之前**就已经确定。

而且同元素标识下的每一个物品都**共用**这一套常量数据。

可以用来存放一些 *数据层* 或者 *计算层* 需要用到的信息。

**配置数据:**
```YAML
ExampleItem:
  item:
    ...
    props:
      常量1: 1
      常量2:
```

**数据层**

数据层的数据会实打实存储在物品 NBT 中，因此数据层的**值**的数据类型是被限定的，只允许 `int` 、`double`、`String` 等基本数据类型和 `Map` 、`List` 两种复杂数据类型。

其 NBT 结构表如下：

```Json
{
  "Ratziel": {
    ...
    "data": {
      "Key1": "Value1",
      "Key2": "Value2",
      ...
    }
  }
}
```

**计算层**

计算层在三层数据中最后进行。

其主要意义在于*通过计算来确定物品信息*，

我们可以使用标签来直接调用计算层数据，如：

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
      - '{data:hello} {define:helloWorld}' # 和上面一样
      - '{prop:number}' # 调用数据层
      - '{data:hello}' # 同样也可以调用数据层数据
``` -->
