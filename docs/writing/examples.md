---
title: 使用案例（重写版）
sidebar_position: 11
---

# 使用案例

这页不讲太多概念，只给你一批**能直接改、能直接抄、能直接测试**的示例。

建议把它当成：

- 配置模板库
- 快速起步参考
- 调试时的对照样本

## 使用这些案例前先做什么

1. 把示例放进工作空间，例如：

```text
plugins/Ratziel/workspace/examples.yml
```

2. 执行重载：

```text
/r reload
```

3. 给予自己物品：

```text
/r-item give 物品名
```

---

## 案例 1：最简单的基础物品

适合验证：

- 工作空间是否正常加载
- 命令是否能拿到物品
- 名称和 lore 是否正常显示

```yaml
BlackApple:
  item:
    material: APPLE
    name: '<black>Bad Black <red>Apple'
    lore:
      - '<white>But it tastes great!'
      - '<gold>Mr.Black''s Apple <green>is so good!'
      - '<blue>Let me press <key:key.jump> to jump!'
    unbreakable: true
```

测试命令：

```text
/r reload
/r-item give BlackApple
```

---

## 案例 2：右键发消息的交互物品

适合验证：

- 动作系统是否正常
- `onRight` 是否会触发

```yaml
MessageStick:
  item:
    material: STICK
    name: '<yellow>消息魔杖'
    lore:
      - '&7右键后给自己发一条消息'
    action:
      onRight:
        - 'player.sendMessage("你右键了这根魔杖")'
```

测试命令：

```text
/r reload
/r-item give MessageStick
```

拿到后右键即可测试。

---

## 案例 3：击杀计数武器

适合验证：

- 数据层
- `onKill` 触发器
- 动态标签显示

```yaml
KillCounter:
  item:
    material: DIAMOND_SWORD
    name: '<blue>击杀之剑 <gray>[{dynamic:data:kills}]'
    lore:
      - '&7当前击杀数：{dynamic:data:kills}'
    data:
      kills: 0
    action:
      onKill:
        - 'kills = item.get("kills") || 0'
        - 'item.set("kills", kills + 1)'
```

测试方法：

1. 获取物品
2. 用它击杀生物
3. 观察名字和 lore 中的数字变化

---

## 案例 4：认主物品

适合验证：

- `onDrop`
- `onPick`
- 数据写入与读取

```yaml
OwnedSword:
  item:
    material: DIAMOND_SWORD
    name: '<aqua>认主之剑'
    lore:
      - '&7主人：{data:owner:未绑定}'
    data:
      owner: ''
    action:
      onDrop:
        - 'if (!(item.get("owner") || "")) item.set("owner", player.getName())'
        - 'dropped.setCustomName((item.get("owner") || player.getName()) + " 的物品")'
        - 'dropped.setCustomNameVisible(true)'
      onPick:
        - 'owner = item.get("owner") || ""'
        - 'if (owner && player && owner != player.getName()) event.setCancelled(true)'
```

说明：

- 第一次丢出时记录主人
- 被拾取时，如果不是主人就取消拾取

这是一个很适合继续扩展成“绑定装备”的基础案例。

---

## 案例 5：模板复用武器

适合验证：

- `template`
- `inherit`
- 模板动作链

```yaml
BaseWeapon:
  template:
    material: DIAMOND_SWORD
    unbreakable: true
    hideFlags:
      - HIDE_ATTRIBUTES
      - HIDE_UNBREAKABLE
    lore:
      - '&7这是一把基础武器'
    action:
      onAttack: 'player.sendMessage("基础攻击效果")'

FireSword:
  item:
    inherit: BaseWeapon
    name: '<gold>烈焰之剑'
    lore:
      - '&c附带火焰之力'
    action:
      onAttack:
        - 'player.sendMessage("烈焰灼烧了目标")'
```

测试重点：

- 能否正常生成 `FireSword`
- 攻击时是否会依次执行模板动作和物品自身动作

---

## 案例 6：成长型武器

适合验证：

- `props`
- `data`
- `define`
- 动态显示
- 动作与数据联动

```yaml
GrowthSword:
  item:
    material: DIAMOND_SWORD
    name: '<gold>成长之剑'
    lore:
      - '&7主人：{data:owner:未绑定}'
      - '&7击杀数：{dynamic:data:kills}'
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

这个案例是后续扩展成长武器、任务武器、数值武器的很好起点。

---

## 案例 7：玩家专属显示物品

适合验证：

- 动态 PAPI 标签
- 动态数据标签

```yaml
PlayerCard:
  item:
    material: PAPER
    name: '<green>{dynamic:papi:player_name} 的信息卡'
    lore:
      - '&7记录主人：{data:owner:未知}'
      - '&7当前查看者：{dynamic:papi:player_name}'
      - '&7等级：{dynamic:papi:player_level}'
    data:
      owner:
        $js: 'player.getName()'
```

这个案例很适合做：

- 身份卡
- 玩家面板物品
- 菜单中的玩家信息展示

---

## 推荐测试顺序

如果你是第一次批量试这些案例，建议顺序如下：

1. `BlackApple`
2. `MessageStick`
3. `KillCounter`
4. `BaseWeapon` + `FireSword`
5. `GrowthSword`
6. `OwnedSword`
7. `PlayerCard`

这样会更容易定位问题，因为每个案例只比前一个多一层能力。

## 遇到问题时先查什么

### 1. 先重载

```text
/r reload
```

### 2. 再看元素有没有加载

```text
/r element list
```

### 3. 再试着给物品

```text
/r-item give 物品名
```

### 4. 如果怀疑数据没写进去，就查 NBT

```text
/r-nbt view main-hand
```

## 下一步

如果你已经能看懂这些案例，建议配合阅读：

- [物品系统（重写版）](./item.md)
- [物品动作（重写版）](./item-action.md)
- [物品数据（重写版）](./item-data.md)
- [物品标签（重写版）](./item-tag.md)
- [模板继承（重写版）](./template.md)
- [动态物品（重写版）](./dynamic-items.md)
- [命令与重载（重写版）](./command.md)
