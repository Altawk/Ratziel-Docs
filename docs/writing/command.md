---
title: 命令与重载（重写版）
sidebar_position: 10
---

# 命令与重载

这篇文档只保留**当前最值得使用者关心**的一批命令。

如果你只是写物品配置，通常最常用的就是：

- 重载配置
- 查看元素
- 给予物品
- 查看或修改手持物品的 NBT

## 1. 主命令

主命令为：

```text
/ratziel
```

别名包括：

```text
/r
/rz
/f
```

## 2. 重载命令

最重要、最常用的一条：

```text
/ratziel reload
```

你也可以写成：

```text
/r reload
```

它会执行这些事情：

- 重载配置文件
- 重载语言文件
- 重新加载工作空间中的内容

如果你改了 YAML 文件却没生效，第一反应就应该先执行它。

## 3. 元素查看命令

用于查看当前已加载的元素和元素类型。

### 查看已加载元素

```text
/ratziel element list
```

或：

```text
/r element list
```

这条命令更适合用来排查：

- 元素到底有没有被读取
- 元素名字是不是你以为的那个
- 元素来自哪个文件

### 查看已注册元素类型

```text
/ratziel element listType
```

或：

```text
/r element listType
```

这条命令适合排查：

- 当前支持哪些元素类型
- 某个类型名或别名是否真的存在

## 4. 物品命令

当前最核心的物品命令是独立命令：

```text
/r-item
```

别名：

```text
/ri
```

### 给予自己一个物品

```text
/r-item give ExampleItem
```

### 给指定玩家一个物品

```text
/r-item give ExampleItem 玩家名 1
```

命令格式可以理解为：

```text
/r-item give <物品名> [玩家] [数量]
```

其中：

- `<物品名>` 必填
- `[玩家]` 可选
- `[数量]` 可选

如果你是在玩家身份下测试，最简单就是直接：

```text
/r-item give ExampleItem
```

## 5. NBT 命令

如果你需要直接查看或调整物品的 NBT，可以使用：

```text
/r-nbt
```

别名：

```text
/nbt
```

## 查看某个栏位的 NBT

```text
/r-nbt view main-hand
```

这条命令会查看指定栏位里的物品 NBT。

## 编辑某个栏位的 NBT

```text
/r-nbt edit main-hand display.Name '"§c超级神器"'
```

这条命令会尝试把指定路径写入新的值。

## 删除某个栏位的 NBT

```text
/r-nbt remove main-hand display.Name
```

这条命令会删除指定路径。

## 栏位参数怎么写

NBT 命令里的 `<slot>` 不是随便写的，常见可用值包括：

- `main-hand`
- `main`
- `hand`
- `head`
- `helmet`
- `chest`
- `chestplate`
- `legs`
- `leggings`
- `feet`
- `boots`
- `off-hand`
- `off`

也可以直接使用数字栏位。

## 6. 最常见的使用流程

如果你正在写一个新物品，通常操作顺序会是：

### 第一步：改配置
编辑：

```text
plugins/Ratziel/workspace/*.yml
```

### 第二步：重载

```text
/r reload
```

### 第三步：给自己物品

```text
/r-item give ExampleItem
```

### 第四步：如果效果不对，就查元素

```text
/r element list
```

### 第五步：如果怀疑数据写进物品有问题，就查 NBT

```text
/r-nbt view main-hand
```

## 7. 这些命令分别适合什么时候用

### `/r reload`
适合：

- 改完配置后让内容重新生效

### `/r element list`
适合：

- 查元素有没有加载
- 查元素名是否正确

### `/r-item give`
适合：

- 测试某个物品能否正常生成
- 给自己或别人发测试物品

### `/r-nbt view`
适合：

- 查数据到底有没有写进物品
- 查 `data`、`custom_data`、组件变化是否符合预期

### `/r-nbt edit` / `/r-nbt remove`
适合：

- 临时排查问题
- 手动试验 NBT 结构

不建议把它们当成长期配置方式。

## 8. 权限节点

当前几个主要命令头使用的权限包括：

| 命令 | 权限 |
| --- | --- |
| `/ratziel` | `ratziel.command.main` |
| `/ratziel element ...` | `ratziel.command.element` |
| `/r-item` | `ratziel.command.item` |
| `/r-nbt` | `ratziel.command.nbt` |

如果你发现命令无法执行，除了检查拼写，也要检查权限是否正确发放。

## 新手建议

### 建议一：先熟练这三条

```text
/r reload
/r-item give ExampleItem
/r element list
```

这三条已经足够覆盖大多数入门测试场景。

### 建议二：NBT 命令留给排错时再用
日常写配置时，不必一开始就深入 NBT。

### 建议三：命令失败时先检查物品名
很多时候不是命令有问题，而是你配置里的元素名和你输入的不一致。

## 下一步

建议把命令页和这些内容结合起来使用：

- [快速开始（重写版）](./quickstart.md)
- [配置与工作空间（重写版）](./configuration.md)
- [物品系统（重写版）](./item.md)
