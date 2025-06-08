---
title: 脚本系统
sidebar_position: 5
---

# 脚本系统

Ratziel插件内置了强大的脚本系统，支持多种脚本语言和格式，可以用于物品行为、自定义功能等。

## 支持的脚本语言

Ratziel支持多种脚本语言，每种语言有其特定的用途和优点：

| 脚本类型 | 标记 | 描述 |
| --- | --- | --- |
| JavaScript | `$js` | 最常用的脚本语言，执行效率高 |
| Kether | `$kether` | 一种Taboolib特有的轻量级脚本语言 |
| Kotlin脚本 | `$kts` | 支持完整Kotlin语法的脚本 |
| JEXL | `$jexl` | 轻量级表达式语言 |
| Nashorn | `$nashorn` | 旧版JavaScript引擎 |
| GraalJS | `$graaljs` | 高性能JavaScript引擎 |

### 条件语句

Ratziel脚本系统支持条件语句：

```yaml
run1:
  action:
    if: 'player.getHealth() > 10'
    then:
      - 'player.sendMessage("你的血量很健康")'
      - 'player.setHealth(player.getHealth() + 1)'
    else: 'player.sendMessage("你需要治疗")'
```
