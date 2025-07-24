---
title: 脚本系统
sidebar_position: 5
---

# 脚本系统

Ratziel插件内置了强大的脚本系统，支持多种脚本语言和格式，可以用于物品行为、自定义功能等。

## 支持的脚本语言

Ratziel支持多种脚本语言，每种语言有其特定的用途和优点：

| 脚本类型   | 标记       | 描述                             |
| ---------- | ---------- | -------------------------------- |
| JavaScript | `$js`      | 最常用的脚本语言，执行效率高     |
| Kether     | `$kether`  | 一种Taboolib特有的轻量级脚本语言 |
| Kotlin脚本 | `$kts`     | 支持完整Kotlin语法的脚本         |
| JEXL       | `$jexl`    | 轻量级表达式语言                 |
| Nashorn    | `$nashorn` | 旧版JavaScript引擎               |
| GraalJS    | `$graaljs` | 高性能JavaScript引擎             |

### JavaScript

Ratziel 支持两种 JavaScript 引擎，提供了最强大的脚本编程能力。

#### Nashorn 引擎

**标识符：** `$js`、`$nashorn`

**特点：**
- Java 8+ 内置引擎
- 完整的 ES6 支持
- 与 Java 对象无缝交互
- 性能稳定可靠

**配置示例：**
```yaml
# 在 settings.yml 中配置
Script:
  JavaScript:
    engine: "nashorn"
```

#### GraalJS 引擎

**标识符：** `$graaljs`

**特点：**
- 高性能 JavaScript 引擎
- 现代 JavaScript 特性支持
- 更好的内存管理
- 支持最新 ECMAScript 标准

**配置示例：**
```yaml
# 在 settings.yml 中配置
Script:
  JavaScript:
    engine: "graaljs"
```

### JEXL 表达式

**标识符：** `$jexl`

**特点：**
- 轻量级表达式语言
- 适合简单的计算和判断
- 语法类似于数学表达式
- 性能优异

**使用示例：**
```yaml
JEXLItem:
  meta:
    action:
      onInteract: |-
        # 简单计算
        damage = player.health > 10 ? 20 : 10;

        # 字符串操作
        message = "Hello " + player.name + "!";

        # 条件表达式
        result = item.durability > 100 ? "耐久充足" : "需要修理";
```

### 条件执行

Ratziel 脚本系统支持强大的条件执行功能：

```yaml
ConditionalItem:
  meta:
    action:
      # 简单条件
      onInteract:
        if: 'player.getHealth() > 10'
        then: 'player.sendMessage("血量充足")'
        else: 'player.sendMessage("血量不足")'

      # 复杂条件
      onAttack:
        if: |-
          health = player.getHealth()
          mana = item.get("mana") || 0
          return health > 5 && mana >= 10
        then:
          - 'item.set("mana", mana - 10)'
          - 'event.setDamage(event.getDamage() * 2)'
          - 'player.sendMessage("释放了强力攻击!")'
        else:
          - 'event.setCancelled(true)'
          - 'player.sendMessage("条件不足，无法使用技能")'
```
