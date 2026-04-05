---
title: 物品数据（重写版）
sidebar_position: 6
---

# 物品数据

Ratziel 的物品数据，不只是“存几个值”这么简单。

在当前实现里，物品相关的数据大致分成三层：

1. 常量层
2. 数据层
3. 计算层

它们的执行顺序是：

**常量层 → 数据层 → 计算层**

## 三层分别是什么

## 1. 常量层

常量层适合放**同一种物品共用、且通常不需要写回物品本体**的内容。

当前支持的节点名有：

- `props`
- `properties`
- `constants`

示例：

```yaml
props:
  base_damage: 12
  crit_rate: 0.15
  weapon_type: 'sword'
```

你可以把它理解成：

- 这把物品的基础设定
- 供后面的数据层和计算层继续使用

## 2. 数据层

数据层适合放**每一件物品自己的状态**。

当前节点名是：

- `data`

示例：

```yaml
data:
  owner:
    $js: 'player.getName()'
  kills: 0
  level: 1
```

这类数据通常适合用来表示：

- 主人
- 击杀数
- 等级
- 冷却时间
- 任务进度

对于使用者来说，最重要的一点是：

**数据层的值会跟着物品走。**

也就是说，同名物品的不同实例，可以拥有不同的数据层内容。

## 3. 计算层

计算层适合放**由前两层推导出来的结果**。

当前支持的节点名有：

- `compute`
- `computed`
- `define`

示例：

```yaml
define:
  rank:
    $js: 'kills >= 100 ? "传说" : "普通"'
  damage_text:
    $js: 'base_damage + " 点伤害"'
```

它适合拿来做：

- 文本显示
- 等级判定
- 简单公式
- 动态派生值

## 一个完整例子

```yaml title="plugins/Ratziel/workspace/data-example.yml"
GrowthSword:
  item:
    material: DIAMOND_SWORD
    name: '<gold>成长之剑'
    lore:
      - '&7主人：{data:owner:未绑定}'
      - '&7击杀数：{data:kills:0}'
      - '&7等级：{data:level:1}'
      - '&7评级：{define:rank}'
      - '&7基础伤害：{props:base_damage}'
    props:
      base_damage: 12
      upgrade_need: 10
    data:
      owner:
        $js: 'player.getName()'
      kills: 0
      level: 1
    define:
      rank:
        $js: 'kills >= 100 ? "传说" : (kills >= 10 ? "稀有" : "普通")'
    action:
      onKill:
        - 'kills = item.get("kills") || 0'
        - 'item.set("kills", kills + 1)'
```

这份配置里：

- `props` 里放的是基础设定
- `data` 里放的是物品实例状态
- `define` 里放的是显示用计算结果

## 在数据层和计算层里执行脚本

如果你只是写固定值，直接写普通值就可以：

```yaml
data:
  kills: 0
  level: 1
```

如果你希望在数据层或计算层中执行脚本，建议使用**显式脚本写法**：

```yaml
data:
  owner:
    $js: 'player.getName()'

define:
  rank:
    $js: 'kills >= 100 ? "传说" : "普通"'
```

这样更清晰，也更适合长期维护。

## 三层最容易混淆的区别

### 常量层不是“玩家专属数据”
不要把会变化、会被不同玩家改出不同结果的内容写进常量层。

例如：

- `base_damage` 适合放常量层
- `owner` 不适合放常量层

### 数据层不是“所有公式都往里塞”
数据层更适合存结果和状态，不适合把大量展示公式直接堆进去。

例如：

- `kills` 适合放数据层
- `kills >= 100 ? "传说" : "普通"` 更适合放计算层

### 计算层不是“永久存档”
计算层更适合派生值，不适合拿来当长期状态仓库。

例如：

- `rank` 很适合放计算层
- `owner` 不适合放计算层

## 在标签里怎么读取

### 读取数据层

```yaml
{data:kills}
{data:owner}
{data:owner:未知主人}
```

其中第二个参数可以作为默认值。

### 读取计算层

```yaml
{compute:rank}
{define:rank}
```

### 读取常量层

```yaml
{props:base_damage}
{properties:base_damage}
{constants:base_damage}
```

## 在动作里怎么修改数据

最常见的写法是：

```yaml
action:
  onAttack:
    - 'count = item.get("kills") || 0'
    - 'item.set("kills", count + 1)'
```

也就是说：

- 用 `item.get("键名")` 读取
- 用 `item.set("键名", 值)` 写回

## 适合放什么：快速判断

### 放进 `props / properties / constants`
适合：

- 基础伤害
- 基础倍率
- 武器类型
- 阈值配置

### 放进 `data`
适合：

- 主人
- 击杀数
- 当前等级
- 冷却时间
- 背包绑定信息

### 放进 `compute / computed / define`
适合：

- 称号
- 稀有度文本
- 显示用伤害文本
- 百分比结果

## 新手建议

### 建议一：先只用 `data`
如果你还没习惯三层设计，先从 `data` 开始最容易上手。

### 建议二：等你开始需要“显示派生结果”时，再加 `define`
例如等级称号、评分、伤害文本。

### 建议三：常量层留给共用参数
不要把会频繁变化的值写进常量层。

### 建议四：标签显示优先读 `data` 和 `define`
这是最直观的组合。

## 下一步

学完数据层后，建议继续看：

- [物品标签（重写版）](./item-tag.md)
- [物品动作（重写版）](./item-action.md)
