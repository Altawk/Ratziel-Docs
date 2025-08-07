---
title: 物品组件
sidebar_position: 1
---

# 物品组件

:::info
在 Minecraft1.20.5 版本中及往后，Mojang引入了[数据组件](https://zh.minecraft.wiki/w/%E6%95%B0%E6%8D%AE%E7%BB%84%E4%BB%B6?variant=zh-cn)。此插件的组件以类似于其的方式工作。
:::

对物品的个性化配置需要使用**物品组件**。

像 *显示名称*、*物品描述（Lore）*、*附魔* 等等都可以通过 **物品组件** 来实现。

## 组件列表

:::info
下面的有些组件严格来说不算 **物品组件**，但是功能相关，还是将它们列在下面。
:::

### 显示名称

- 节点名：`name`、`display-name`、`displayName`

- 隶属：`ItemDisplay`

```YAML
name: "你好哇, 是香香软软的小南娘呢!"
```

---

### 物品描述（Lore）

- 节点名：`lore`、`lores`

- 隶属：`ItemDisplay`

```YAML
lore:
  - "<white>锋利无比"
  - "<blue>带有魔力"
```

---

### 本地化名称 (物品名称 Item Name)

- 节点名：`localizedName`、`localized-name`、`itemName`、`item-name`

- 隶属：`ItemDisplay`

```YAML
item-name: "钻石剑"
```

---

### 附魔

- 节点名：`enchantment`、`enchantments`、`enchant`、`enchants`

- 隶属：`ItemEnchant`

```YAML
enchant:
  DAMAGE_ALL: 5
  FIRE_ASPECT: 2
```

---

### 隐藏属性

- 节点名：`hideFlags`、`itemFlags`

- 隶属：`ItemHideFlag`

```YAML
hideFlags:
  - HIDE_ATTRIBUTES
  - HIDE_ENCHANTS
```

---

### 头颅

- 节点名：`head`、`skull`

```YAML
head: MC_jiao_long # 正版玩家 ID
```

```YAML
# Base64 也是支持的
skull: e3RleHR1cmVzOntTS0lOOnt1cmw6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvODQ2ZTFlNTIyOTdhMTdhZmMxM2RhZWI1ZmFlMjZhMzQ4YzJlN2U4ZGVmMmM5MzJkZjI5YTExNzdiNTc5ZDU1ZSJ9fX0=
```

---

## API 用法

```JavaScript
item.getComponent(ItemDisplay.class) // 获取组件
item.setComponent(ItemDisplay.class, component) // 设置组件
```