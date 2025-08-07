---
title: 创建物品
sidebar_position: 2
---

:::info
在 Ratziel 底层中，对于 物品、脚本对象 等等的处理紧紧围绕着 **元素** 这一核心概念。

但在 1.X 版本中，Ratziel 并不强调这一概念，在特色模块和核心功能相对不完善的情况下，过于注重这一概念反而会增加用户的困惑。
:::

Ratziel 支持多种配置文件格式，如 YAML、JSON、HOCON、TOML 等。

由于 YAML 格式在各类插件配置文件中被广泛使用，故此文档的大部分案例都将使用 YAML 格式实现。

## 创建物品

:::info
**工作空间** 是存放元素集的地方。

支持深层读取（你可以自由安排元素文件的位置）。

可在配置文件中过滤掉不需要被加载的文件。
:::

在 Ratziel 的**工作空间**目录下创建后缀为 `.yml` 或者 `.yaml` 的文件。

如下我们创建了一个文件，并在其中添加了以下内容：

```YAML title="plugins/Ratziel/workspace/example.yml"
ExampleItem: # 物品ID
  item: # 告诉插件这是一个物品，而不是其他什么东西
    ...
```

那么，你就创建了一个名为 `ExampleItem` 的物品。

## 配置物品

:::info
完整的物品包括 **[物品源](../quick-lookup/item-source.md)**、 **[物品组件](../quick-lookup/item-component.md)** 、 **[物品动作](./item-action.md)**、 **[物品数据](./item-data.md)** 等部分。

然而对于 **物品源** 和 **物品组件** 的区分，其实并不需要太大注意，混为一谈也没关系。

以上内容不需要特别掌握，了解即可。
:::

### 基础配置

```YAML title="一个简单的物品配置"
ExampleItem:
  item:
    material: DIAMOND_SWORD # 物品类型
    name: '<red>示例物品' # 物品显示名称
    lore: # 物品描述
      - '&a这是一个示例物品。'
      - '它可以用来演示 <b>Ratziel</b> 的功能。'
```

尽管配置简单，我们还是详细分析下这个配置：

- `material` - **物品材料**

  物品材料严格说属于 **[物品源](../quick-lookup/item-source.md)** 部分，是原版物品源。  
  填写原版物品ID即可，插件会查找最接近的物品材料。

- `name` - **显示名称**

  显示名称属于 **[物品组件](../quick-lookup/item-component.md)** 部分，隶属 *ItemDisplay* 组件。  
  支持 [MiniMessage](https://docs.advntr.dev/minimessage/format.html) 和 Legacy 等消息格式。*ItemDisplay* 组件的都支持这样的消息格式。

- `lore` - **物品描述**

  同上属于 **[物品组件](../quick-lookup/item-component.md)** 部分。  
  支持增强列表解析，即同一行内填写 `\n` 会自动换行。

### 文档速查

所有的物品组件可在 **[物品组件](../quick-lookup/item-component.md)** 中找到。

所有的物品源可在 **[物品源](../quick-lookup/item-source.md)** 中找到。
