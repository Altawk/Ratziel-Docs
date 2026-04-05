---
title: 物品标签（重写版）
sidebar_position: 7
---

# 物品标签

标签的作用，是把数据、计算结果、模板内容或脚本结果插入到文本里。

最常见的使用位置包括：

- `name`
- `lore`
- 其他字符串字段

## 最常见的标签长什么样

```yaml
name: '<gold>成长之剑 <gray>[{data:level:1}]'
```

这里的：

```text
{data:level:1}
```

表示：

- 使用 `data` 解析器
- 读取 `level`
- 如果没有值，就用 `1` 作为默认值

## 标签的基本格式

大多数标签都长这样：

```text
{解析器:参数1:参数2:参数3}
```

不同解析器负责不同类型的内容。

## 最常用的标签类型

## 1. 数据标签

用于读取数据层内容。

```yaml
lore:
  - '&7主人：{data:owner:未知}'
  - '&7击杀数：{data:kills:0}'
```

常用场景：

- 显示主人
- 显示等级
- 显示击杀数
- 显示冷却剩余信息对应的数据值

## 2. 计算标签

用于读取计算层内容。

```yaml
lore:
  - '&7评级：{define:rank}'
  - '&7伤害：{compute:damage_text}'
```

常用场景：

- 显示称号
- 显示伤害文本
- 显示综合评分

## 3. 常量标签

用于读取常量层内容。

```yaml
lore:
  - '&7基础伤害：{props:base_damage}'
  - '&7基础倍率：{constants:base_rate}'
```

可用写法包括：

- `{props:键名}`
- `{properties:键名}`
- `{constants:键名}`

## 4. 模板引用标签

用于读取模板中的某个值。

推荐使用这种写法：

```yaml
{inherit:模板名:路径}
```

例如：

```yaml
lore:
  - '{inherit:BaseWeapon:name}'
  - '{inherit:BaseWeapon:data:attack}'
```

如果你只是想稳妥使用模板引用，建议优先用这种“冒号分段”的写法。

## 5. PAPI 标签

如果你已经在用 PlaceholderAPI，可以通过：

```yaml
{papi:player_name}
{papi:player_level}
```

来读取对应变量。

常用别名：

- `papi`
- `p`

## 6. 动态标签

动态标签和普通标签最大的区别是：

- 普通标签：通常在生成物品时就替换
- 动态标签：会保留为动态内容，之后再显示给玩家

写法：

```yaml
{dynamic:data:kills}
{dynamic:papi:player_name}
```

示例：

```yaml
name: '<aqua>击杀之剑 <gray>[{dynamic:data:kills}]'
```

如果你希望名字或 lore 能随着物品状态变化而更新，通常就需要动态标签。

## 7. 脚本标签

你也可以直接在标签里运行脚本：

```yaml
{script:player.getName()}
{script:jexl:player.health > 10 ? "安全" : "危险"}
```

这种方式适合短小、只用一次的脚本。

如果脚本开始变长，建议拆出去，不要把所有逻辑都塞进标签里。

## 8. 内联脚本

除了 `{script:...}`，字符串里还支持另一种常用写法：

```yaml
name: '<yellow>{{player.getName()}} 的武器'
```

它会直接在字符串内部运行脚本。

如果要显式指定语言，可以写成：

```yaml
lore:
  - '血量状态：{{jexl:player.health > 10 ? "安全" : "危险"}}'
```

不显式指定语言时，通常使用默认脚本语言。

## 一组实用示例

## 示例 1：显示数据层内容

```yaml
CounterSword:
  item:
    material: IRON_SWORD
    lore:
      - '&7击杀数：{data:kills:0}'
      - '&7主人：{data:owner:未绑定}'
    data:
      kills: 0
      owner:
        $js: 'player.getName()'
```

## 示例 2：显示计算结果

```yaml
RankSword:
  item:
    material: DIAMOND_SWORD
    lore:
      - '&7评级：{define:rank}'
    data:
      kills: 0
    define:
      rank:
        $js: 'kills >= 100 ? "传说" : "普通"'
```

## 示例 3：使用动态标签

```yaml
DynamicSword:
  item:
    material: DIAMOND_SWORD
    name: '<gold>动态之剑 <gray>[{dynamic:data:kills}]'
    data:
      kills: 0
```

## 示例 4：在文本里插入脚本结果

```yaml
ScriptNameItem:
  item:
    material: PAPER
    name: '<green>{{player.getName()}} 的纸张'
```

## 什么时候用哪种标签

### 只想显示物品自己的状态
优先用：

- `{data:...}`

### 想显示计算后的结果
优先用：

- `{compute:...}`
- `{define:...}`

### 想显示模板里的值
优先用：

- `{inherit:模板名:路径}`

### 想显示 PlaceholderAPI 内容
优先用：

- `{papi:...}`

### 想让显示内容后续还能变化
优先用：

- `{dynamic:...}`

### 只想临时跑一小段逻辑
优先用：

- `{script:...}`
- `{{...}}`

## 新手最容易踩的坑

### 1. 把动态标签和普通标签混着理解
如果你希望内容之后还能变化，通常就不要只写普通 `{data:...}`，而要考虑 `{dynamic:data:...}`。

### 2. 在标签里塞太长脚本
短脚本可以接受，但一长就很难维护。

### 3. 模板引用路径写得太随意
如果你不确定路径写法，优先用：

```text
{inherit:模板名:路径}
```

### 4. 以为所有标签都必须写在 lore 里
实际上只要字段本身是字符串，很多地方都可以使用标签。

## 下一步

如果你已经会用标签了，下一步通常就是：

- 回到 [物品动作（重写版）](./item-action.md)，让标签和动作配合使用
- 回到 [物品数据（重写版）](./item-data.md)，把物品状态设计完整
- 阅读 [脚本与内联脚本（重写版）](./script.md)，把标签和脚本配合使用
