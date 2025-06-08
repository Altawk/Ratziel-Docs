---
title: 物品组件
sidebar_position: 6
---

# 物品组件

:::info
1.20.5，Mojang引入了[数据组件](https://zh.minecraft.wiki/w/%E6%95%B0%E6%8D%AE%E7%BB%84%E4%BB%B6?variant=zh-cn)。此插件的组件以类似于其的方式工作。
:::

对物品的个性化配置需要使用**物品组件**。

像 *物品名称*、*物品描述（Lore）*、*附魔* 等等都可以通过 **物品组件** 来实现。

## 组件列表



## API Usage

```JavaScript
item.getComponent(ItemDisplay.class) // 获取组件
item.setComponent(ItemDisplay.class, component) // 设置组件
```