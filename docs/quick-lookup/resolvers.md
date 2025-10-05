---
title: 标签解析
sidebar_position: 5
---

# 标签解析

**标签解析** 用于处理配置文件片段，解析配置文件中标签用法。

## 基本用法

:::info
这是最常用的解析语法，用于调用不同的解析器来处理内容。
:::

标签使用大括号 `{}` 包围，基本用法为：`{解析器名称:参数1:参数2:...}`

**示例：**
```yaml
name: "玩家 {papi:player_name} 的物品"
lore:
  - "击杀数: {data:kill_count}"
```

## 解析器列表

### PAPI 变量解析

用于解析 PlaceholderAPI 的变量。

**别名：** `papi`

**用法：**
- `{papi:变量名}`
- `{papi:变量名:变量参数1:变量参数2:...}`
- `%变量名%` (语法糖)

### 数据解析

用于访问物品的 `data` 数据层内容。

**别名：** `data`

**用法：** `{data:数据名称:默认值}`

**示例：**
```yaml
data:
  owner: MC_jiao_long
lore:
  - "所有者: {data:owner:无名氏}"
```

### 计算解析

用于访问 `compute` 计算层和 `attributes` 属性层的内容。

**别名：** `compute`、`computed`、`define`、`props`、`consts`

**用法：** `{compute:变量名称}`

**示例：**
```yaml
name: "魔法武器 (攻击力: {compute:attack_power})"
compute:
  attack_power: |-
    level = item.get("level") || 1
    return 10 + (level * 5)
data:
  level: 1
```

### 动态解析

用于将静态解析器标记为动态解析。

**别名：** `dynamic`

**用法：** `{dynamic:解析器名称:参数}`

**示例：**
```yaml
name: "杀敌数: {dynamic:data:kill_count}"
data:
  kill_count: 0
action:
  onKill:
    - 'item.set("kill_count", item.get("kill_count") + 1)'
```

### 脚本解析

直接使用脚本返回要显示的信息。

**别名：** `script`

**用法：** 
- `{script:脚本内容}`
- `{script:语言:脚本内容}`
- `{{ 脚本内容 }}` (语法糖)
- `{{ 语言:脚本内容 }}` (语法糖)

**示例：**
```yaml
name: "随机物品"
lore:
  - "随机数: {script:Math.floor(Math.random() * 100)}"
  - "当前时间: {script:js:new Date().toLocaleString()}"
  - "玩家名称: {script:player.getName()}"
  - "{{ return '血量: ' + player.getHealth() }}"
```
