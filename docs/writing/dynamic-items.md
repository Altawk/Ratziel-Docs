---
title: 动态物品（重写版）
sidebar_position: 9
---

# 动态物品

动态物品的核心意义，不是“让物品自己变强”，而是：

**让玩家看到的名称和描述，可以随着上下文实时变化。**

最常见的动态内容包括：

- 当前击杀数
- 当前持有者名字
- 当前玩家的 PlaceholderAPI 变量
- 由数据和计算层推导出的结果

## 普通标签 vs 动态标签

最容易理解动态物品的方式，就是先区分这两类写法。

### 普通标签

```yaml
lore:
  - '&7击杀数：{data:kills:0}'
```

这种写法更适合：

- 生成时就能确定的内容
- 不需要后续持续变化的内容

### 动态标签

```yaml
lore:
  - '&7击杀数：{dynamic:data:kills}'
```

这种写法更适合：

- 之后还会变化的内容
- 需要在展示时重新解析的内容

你可以先简单记住：

> **想让玩家之后看到变化，就优先考虑 `dynamic`。**

## 动态标签的基本格式

```text
{dynamic:解析器:参数1:参数2}
```

例如：

- `{dynamic:data:kills}`
- `{dynamic:define:rank}`
- `{dynamic:papi:player_name}`

## 最小示例

```yaml title="plugins/Ratziel/workspace/dynamic.yml"
KillCounter:
  item:
    material: DIAMOND_SWORD
    name: '<aqua>击杀之剑 <gray>[{dynamic:data:kills}]'
    lore:
      - '&7当前击杀数：{dynamic:data:kills}'
    data:
      kills: 0
    action:
      onKill:
        - 'kills = item.get("kills") || 0'
        - 'item.set("kills", kills + 1)'
```

这个例子里：

- `kills` 存在数据层里
- `onKill` 会更新这个值
- 名称和 lore 用动态标签读取它

因此玩家看到的显示内容可以随着击杀数变化。

## 常见动态标签类型

## 1. 动态数据标签

最常用，也最推荐先掌握。

```yaml
{dynamic:data:kills}
{dynamic:data:owner}
{dynamic:data:level}
```

适合：

- 等级
- 击杀数
- 绑定主人
- 冷却计数
- 任务进度

## 2. 动态计算标签

用于读取计算层结果。

```yaml
{dynamic:compute:rank}
{dynamic:computed:rank}
{dynamic:define:rank}
```

适合：

- 称号
- 品质文本
- 评分
- 派生显示结果

## 3. 动态常量标签

虽然常量层本身不常变化，但它也可以参与动态解析。

```yaml
{dynamic:props:base_damage}
{dynamic:properties:type}
```

常见场景较少，但在统一写法时仍然有用。

## 4. 动态 PAPI 标签

如果你想让物品展示跟玩家自身状态有关，PAPI 是很典型的场景。

```yaml
{dynamic:papi:player_name}
{dynamic:papi:player_level}
```

例如：

```yaml
name: '<gold>{dynamic:papi:player_name} 的武器'
```

这种写法适合：

- 当前玩家名
- 等级
- 经济余额
- 其他 PlaceholderAPI 变量

## 5. 动态模板引用

模板里的内容也可以动态读取：

```yaml
{dynamic:inherit:BaseWeapon:name}
```

不过从使用体验来说，这一类通常没有 `data` / `define` / `papi` 常用。

## 6. 动态脚本标签

你也可以直接把脚本结果做成动态标签：

```yaml
{dynamic:script:player.getName()}
```

但这类写法更适合非常短、非常明确的逻辑。

如果脚本越来越长，建议拆回数据层或计算层，不要全部塞进动态标签里。

## 一个更实用的例子

```yaml title="plugins/Ratziel/workspace/dynamic-player-item.yml"
OwnerSword:
  item:
    material: DIAMOND_SWORD
    name: '<gold>拥有者之剑 <gray>[{dynamic:data:owner}]'
    lore:
      - '&7当前主人：{dynamic:data:owner}'
      - '&7当前评级：{dynamic:define:rank}'
      - '&7当前玩家：{dynamic:papi:player_name}'
    data:
      owner:
        $js: 'player.getName()'
      kills: 0
    define:
      rank:
        $js: 'kills >= 50 ? "精英" : "普通"'
    action:
      onKill:
        - 'kills = item.get("kills") || 0'
        - 'item.set("kills", kills + 1)'
```

这类配置已经足够覆盖很多“成长武器 / 绑定武器 / 玩家专属显示”玩法。

## 动态物品是怎么生效的

从使用者角度，你只需要记住两点：

1. **动态标签不会像普通标签那样只处理一次**
2. **它会在展示阶段继续被处理**

所以动态物品更适合“显示会变化”的场景，而不是所有地方都默认加上 `dynamic`。

## 什么时候应该用动态标签

适合用动态标签：

- 玩家会在持有过程中看到数值变化
- 你想让 lore/name 跟随数据层变化
- 你想展示 PlaceholderAPI 实时信息
- 你不想每次变化都重新生成整件物品

不一定需要动态标签：

- 内容在生成时就完全固定
- 只是一次性记录主人名字
- 只是生成时写入一段不会再变化的文本

## 一个很重要的判断方法

### 用普通标签
如果你想表达：

> “生成这件物品时，把值写进去。”

那就先试普通标签。

### 用动态标签
如果你想表达：

> “玩家之后看到时，这个值可能已经变了。”

那就优先试动态标签。

## 新手建议

### 建议一：先只给 `name` 和 `lore` 用动态标签
这是最直观、最容易验证的用法。

### 建议二：优先从 `dynamic:data` 开始
这是最稳、最容易理解的一类动态标签。

### 建议三：复杂逻辑放回 `define`
不要把所有判断都直接塞进 `dynamic:script:...`。

### 建议四：不要一上来所有标签都改成动态
只给真正会变化的内容加 `dynamic`，更容易维护。

## 下一步

如果你已经理解动态物品，接下来最适合配合阅读的是：

- [物品数据（重写版）](./item-data.md)
- [物品标签（重写版）](./item-tag.md)
- [模板继承（重写版）](./template.md)
