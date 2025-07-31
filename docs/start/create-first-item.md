---
title: 创建物品
sidebar_position: 2
---

# 创建物品

:::info
在 Ratziel 底层中，对于 物品、脚本对象 等等的处理紧紧围绕着 **元素** 这一核心概念。

但在 1.X 版本中，Ratziel 并不强调这一概念，在特色模块和核心功能相对不完善的情况下，过于注重这一概念反而会增加用户的困惑。
:::

Ratziel 支持多种配置文件格式，如 YAML、JSON、HONCON、TOML 等。

由于 YAML 格式在各类插件配置文件中被广泛使用，故此文档的大部分案例都将使用 YAML 格式实现。

## 创建物品

:::info
**工作空间** 是存放元素集的地方。
支持深层读取（你可以自由安排元素文件的位置）。
可在配置文件中过滤掉不需要被加载的文件。
:::

在 Ratziel 的**工作空间**目录下创建后缀为 `.yml` 或者 `.yaml` 的文件。

如我创建了一个 `plugins/Ratziel/workspace/example.yml`。

在其中添加一下内容：

```YAML
ExampleItem: # 物品ID
  item: # 告诉插件这是一个物品，而不是其他什么东西
    ...
```

那么，你就创建了一个名为 `ExampleItem` 的物品。

## 配置物品

:::info
完整的物品包括 **物品源**、 **[物品组件](../components.md)** 、 **物品动作**、 **物品属性** 等等。
:::

### 基础物品配置

让我们来看看一个简单的物品配置：

```YAML
ExampleItem:
  item:
    material: DIAMOND_SWORD # 物品类型
    name: '示例物品' # 物品显示名称
    lore: # 物品描述
      - '这是一个示例物品。'
      - '它可以用来演示 Ratziel 的功能。'
```

在这个例子中，`material` 属于 *原版物品源*，填写原版的物品ID即可。`name` 和 `lore` 则属于 *ItemDisplay组件* （ItemDisplay组件全面支持 [MiniMessage](https://docs.advntr.dev/minimessage/format.html)）。

:::info
对于 **物品源** 和 **物品组件** 的区分，其实并不需要太大注意，混为一谈也没关系（下面也是这么干的）。你只是要知道，他们都是用来描述物品的信息的就可以了。
:::

插件所有的物品组件可在 **[物品组件](../components.md)** 中找到。

### 物品动作配置

:::info
当一个**触发器**被触发时，绑定此触发器的动作就会被触发。
:::

按照惯例，先看例子:

```YAML
ExampleItem:
  item:
    ...
    actions:
      onAttack: # 物品触发器
        - 'player.sendMessage("你攻击了！")'
```

其中 `onAttack` 声明了一个 *物品触发器*，此触发器会在玩家手持该物品进行攻击时触发。

物品触发器的完整列表可参见 **[触发器](../triggers.md)**。

而下面的 `player.sendMessage("你攻击了！")` 会被解析为 **动作块**。按照插件设置里的默认脚本语言项，编译脚本并上面触发器触发时执行。

至于为什么是 **块**，动作块又是怎么解析的，请看 **[动作块](../executable-block.md)**。

### 物品属性配置

显然，紧紧根据上面的内容，Ratziel 是无法实现 高级、现代、高度可自定义 的功能的。

此时就需要更高级的特性来支撑。

:::info
换句话说，上面的 **物品组件** 相当于 决定物品长什么样，**物品动作** 则是决定物品的交互行为。
:::

#### 标签解析

首先要介绍的就是 **标签解析** 了。

插件内置大量的*标签解析器*，而*标签*的一般形式是：`{标签名:参数1:参数2:...}`

**标签** 被使用在 **物品组件** 部分节点下的内容，如：

```YAML
ExampleItem:
  item:
    lore:
      - '随机数测试: {script: Math.random()}'
      - 'PAPI变量测试1: {papi:player_name}'
      - 'PAPI变量测试2: {papi:player:name}'
      - 'PAPI变量测试3: %player_name%'
      - '内联脚本测试: {{ js: 1*22 }}'
```

如上配置我们定义了 `script` 脚本标签 和 `papi` PAPI变量标签，它们都会在物品生成的过程中解析。

标签的详细内容可参见 **[标签解析器](../tag.md)**。

#### 片段解析

我们注意到，上面的例子中 `%player_name%` 和 `{{ js: 1*22 }}` 并不符合标签的一般形式，严格上它们属于 **片段 (Section)**

具体内容不在此展开，详见 **[片段解析器](../section.md)**。

### 物品属性

:::info
物品属性分为三层：**常量层 (Properties)**、**数据层 (Data)** 和 **计算层 (Computation)**。
三层数据的每一对数据都是并行生成的，所以不存在同一层的上下调用。
:::

#### 常量层

常量层的数据在物品生成**之前**就已经确定。

可以用来存放一些 **计算层** 或者 **数据层** 需要用到的信息。

#### 数据层

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

#### 计算层

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
```
