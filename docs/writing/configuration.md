---
title: 配置与工作空间（重写版）
sidebar_position: 3
---

# 配置与工作空间

对大多数使用者来说，Ratziel 的日常使用主要围绕两个位置展开：

- `plugins/Ratziel/settings.yml`
- `plugins/Ratziel/workspace/`

前者负责插件的基础行为，后者负责存放你真正要写的内容，比如物品、模板和脚本相关文件。

## 插件目录结构

```text
plugins/
└── Ratziel/
    ├── settings.yml
    ├── lang/
    └── workspace/
```

## `settings.yml` 中最常关心的内容

```yaml title="plugins/Ratziel/settings.yml"
Workspaces:
  default:
    path: 'plugins/Ratziel/workspace'
    filter: '^[^#!].*'
    listen: true
    # elementName: '$fn'
    elementType: None

Message:
  non-italic-by-default: true

Script:
  default: JavaScript
  languages:
    JavaScript:
      enabled: true
      engine: Nashorn
    Jexl:
      enabled: true
    KotlinScripting:
      enabled: false
    Fluxon:
      enabled: true
```

## Workspaces 是什么

你可以把工作空间理解成：

**插件读取内容的目录规则。**

它决定了：

- 去哪里找文件
- 哪些文件应该读取
- 文件变化后是否尝试自动更新
- 某些目录是否带有默认的元素命名或类型规则

## 最常用的字段

### `path`

工作空间路径。

默认通常就是：

```yaml
path: 'plugins/Ratziel/workspace'
```

### `filter`

文件过滤规则。

默认示例：

```yaml
filter: '^[^#!].*'
```

一般来说，保持默认即可。

### `listen`

是否监听文件变更。

```yaml
listen: true
```

如果你希望改完文件后尽量自动处理，可以保持开启。

但无论如何，**手动执行 `/ratziel reload` 仍然是最稳妥的做法**。

### `elementName`

默认单元素命名规则。

最常见写法是：

```yaml
elementName: '$fn'
```

表示：

- 如果按整文件作为单个元素处理
- 元素名默认使用文件名（去掉扩展名）

例如：

```text
example.yml
```

会得到默认元素名：

```text
example
```

### `elementType`

默认元素类型。

```yaml
elementType: None
```

表示该工作空间下的文件**不统一指定类型**，由文件内容自己决定。

如果你把某个目录专门用来写物品，也可以考虑设置成：

```yaml
elementType: item
```

这样会更适合物品专用目录。

## Script 部分怎么理解

如果你还没开始用脚本，可以先记住两点：

1. 默认脚本语言通常是 `JavaScript`
2. 不同语言可以在 `languages` 里单独开关

如果你后面开始写动作、内联脚本或脚本文件，再回来看脚本专题即可。

## 新手建议

### 建议一：先不要乱改过滤规则
除非你非常明确知道自己在做什么，否则先保持默认。

### 建议二：先用默认工作空间
先把内容都写进：

```text
plugins/Ratziel/workspace/
```

等熟悉以后再拆更多目录和工作空间。

### 建议三：改完文件先重载
即使开启了监听，也建议先手动执行：

```text
/ratziel reload
```

### 建议四：先不要一开始就设置太多默认规则
比如 `elementName`、`elementType`，一开始可以不急着配，先理解最基本的文件写法。

## 下一步

如果你已经知道配置文件和工作空间分别负责什么，建议继续阅读：

- [快速开始（重写版）](./quickstart.md)
- [物品系统（重写版）](./item.md)
- [物品动作（重写版）](./item-action.md)
- [物品数据（重写版）](./item-data.md)
- [物品标签（重写版）](./item-tag.md)
