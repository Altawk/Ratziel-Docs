---
title: 快速开始（重写版）
sidebar_position: 2
---

# 快速开始

这篇文档的目标很简单：

**让你在尽可能短的时间内，成功做出并拿到第一个 Ratziel 物品。**

如果你是第一次接触 Ratziel，建议先按本文操作，不必急着研究模板、脚本和高级特性。

## 第一步：确认插件已经生成目录

成功启动服务器后，确认出现以下目录：

```text
plugins/
└── Ratziel/
    ├── settings.yml
    ├── lang/
    └── workspace/
```

其中你最常会接触的目录是：

- `plugins/Ratziel/settings.yml`
- `plugins/Ratziel/workspace/`

## 第二步：在工作空间里创建物品文件

在 `plugins/Ratziel/workspace/` 下新建一个文件，例如：

```text
plugins/Ratziel/workspace/example.yml
```

写入以下内容：

```yaml title="plugins/Ratziel/workspace/example.yml"
ExampleItem:
  item:
    material: DIAMOND_SWORD
    name: '<red>示例物品'
    lore:
      - '&7这是你创建的第一个 Ratziel 物品。'
      - '&a如果你能拿到它，说明配置已经生效了。'
```

## 第三步：理解这份最小配置

这份配置里最重要的部分只有 4 个：

### `ExampleItem`
这是这个物品的名字。

后面用命令获取物品时，会用到它。

### `item`
表示这个元素是一个**物品**。

你现在不需要先理解“元素”的全部细节，只要知道：

- `item` 表示这是物品配置
- `template` 表示这是模板配置
- `script` 一般与脚本相关

### `material`
物品材质。

例如：

- `DIAMOND_SWORD`
- `APPLE`
- `STICK`
- `PLAYER_HEAD`

### `name` 与 `lore`
分别表示：

- 物品名称
- 物品描述

Ratziel 文档中的大多数示例都会使用这两个字段作为起点。

## 第四步：重载配置

保存文件后，在游戏内或控制台执行：

```text
/ratziel reload
```

如果你使用别名，也可以尝试：

```text
/r reload
```

重载成功后，插件会重新读取工作空间中的配置。

## 第五步：获取物品

根据当前命令实现，最稳妥的给予命令写法是：

```text
/r-item give ExampleItem
```

如果你要把物品给指定玩家，可以使用：

```text
/r-item give ExampleItem 玩家名 1
```

拿到物品后，如果名称和描述与配置一致，说明你的第一个物品已经成功创建。

## 常见问题

### 1. 改了文件但没有生效
先执行一次：

```text
/ratziel reload
```

不要只改文件不重载。

### 2. 文件放错位置了
确认文件是在：

```text
plugins/Ratziel/workspace/
```

或该工作空间实际配置指向的目录里。

### 3. 物品名写对了，但命令拿不到
检查：

- 顶层名字是不是 `ExampleItem`
- 是否写成了 `item:` 而不是别的节点
- YAML 缩进是否正确

### 4. 出现重名问题
新版文档默认采用以下规则：

- **同一元素类型中，元素名不能重复**
- **不同元素类型之间，可以使用同样的名字**

例如：

- `ExampleItem` 作为物品名，可以存在
- `ExampleItem` 作为模板名，也可以存在
- 但不能同时出现两个同为 `item` 类型的 `ExampleItem`

## 下一步建议

当你已经能成功创建并获取物品后，建议继续看：

- [配置与工作空间（重写版）](./configuration.md)
- [物品系统（重写版）](./item.md)
- [物品动作（重写版）](./item-action.md)
- [物品数据（重写版）](./item-data.md)
- [物品标签（重写版）](./item-tag.md)
- [模板继承（重写版）](./template.md)
- [动态物品（重写版）](./dynamic-items.md)
- [命令与重载（重写版）](./command.md)
- [使用案例（重写版）](./examples.md)

## 一个更简单的测试用例

如果你只想测试加载是否正常，也可以用这个最短示例：

```yaml
BlackApple:
  item:
    material: APPLE
    name: '<black>Bad Black <red>Apple'
```

然后执行：

```text
/ratziel reload
/r-item give BlackApple
```

只要能拿到苹果，就说明你的基础流程已经打通了。
