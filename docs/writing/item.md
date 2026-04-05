---
title: 物品系统（重写版）
sidebar_position: 4
---

# 物品系统

Ratziel 最核心、最常用的能力，就是通过配置文件生成自定义物品。

如果你把 Ratziel 当成一个“物品玩法编辑器”来理解，通常不会有太大偏差。

## 一个物品最基本长什么样

```yaml
ExampleItem:
  item:
    material: DIAMOND_SWORD
    name: '<red>示例物品'
    lore:
      - '&7这是一把最基础的自定义物品。'
```

这份配置里：

- `ExampleItem` 是物品名
- `item` 表示这是一个物品元素
- `material` 是材质
- `name` 是显示名称
- `lore` 是物品描述

## 你通常会往物品里继续加什么

在实际使用中，物品配置通常会继续加入下面这些内容：

### 1. 基础显示和属性
例如：

- `material`
- `name`
- `lore`
- `unbreakable`
- `enchant`
- `hideFlags`

### 2. 动作
让物品在特定时机执行效果，例如：

- 右键时触发
- 攻击实体时触发
- 丢弃时触发
- 击杀生物时触发
- 每隔一段时间触发

详见：

- [物品动作（重写版）](./item-action.md)

### 3. 数据
让物品携带自己的状态，例如：

- 所有者
- 击杀数
- 等级
- 冷却时间
- 任务进度

详见：

- [物品数据（重写版）](./item-data.md)

### 4. 标签
让名称、描述或其他文本根据数据自动变化，例如：

- 显示当前等级
- 显示主人名字
- 调用模板中的内容
- 调用脚本结果

详见：

- [物品标签（重写版）](./item-tag.md)

## 一个稍微完整一些的例子

```yaml title="plugins/Ratziel/workspace/weapon.yml"
FireSword:
  item:
    material: DIAMOND_SWORD
    name: '<gold>烈焰之剑'
    lore:
      - '&7主人：{data:owner:未绑定}'
      - '&7击杀数：{data:kills:0}'
      - '&7评级：{define:rank}'
    data:
      owner:
        $js: 'player.getName()'
      kills: 0
    define:
      rank:
        $js: 'kills >= 100 ? "传说" : "普通"'
    action:
      onAttack:
        - 'kills = item.get("kills") || 0'
        - 'item.set("kills", kills + 1)'
```

这份配置里已经包含了：

- 基础显示
- 数据层
- 计算层
- 动作
- 标签显示

对大多数玩法来说，真正常用的物品已经离不开这几部分。

## 元素名规则

新版草稿统一采用以下规则：

- **同一元素类型中，元素名不能重复**
- **不同元素类型之间，可以使用同样的名字**

例如：

- 可以同时存在一个名为 `FireSword` 的 `item`
- 也可以同时存在一个名为 `FireSword` 的 `template`
- 但不能同时出现两个同为 `item` 类型的 `FireSword`

## 建议学习顺序

如果你已经做出第一个物品，推荐继续按这个顺序看：

1. [物品动作（重写版）](./item-action.md)
2. [物品数据（重写版）](./item-data.md)
3. [物品标签（重写版）](./item-tag.md)
4. [模板继承（重写版）](./template.md)
5. 动态物品（待重写）

## 下一步

- [快速开始（重写版）](./quickstart.md)
- [配置与工作空间（重写版）](./configuration.md)
- [物品动作（重写版）](./item-action.md)
- [物品数据（重写版）](./item-data.md)
- [物品标签（重写版）](./item-tag.md)
- [模板继承（重写版）](./template.md)
