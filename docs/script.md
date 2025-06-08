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

## 脚本基本格式

脚本可以在多种场景中使用，基本格式如下：

```yaml
# 单行脚本
action:
  onEvent: 'player.sendMessage("Hello, " + player.getName())'

# 多行脚本
action:
  onEvent: |-
    var message = "Hello, " + player.getName()
    player.sendMessage(message)
    Bukkit.getLogger().info(message)

# 指定脚本类型
action:
  onEvent:
    $js: |-
      var message = "Hello, " + player.getName()
      player.sendMessage(message)
```

## 条件语句

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

## 可用的变量和API

在物品触发器脚本中，可以使用以下变量：

| 变量 | 描述 |
| --- | --- |
| `player` | 玩家对象 |
| `event` | 事件对象 |
| `item` | 物品对象 |
| `world` | 世界对象 |
| `Bukkit` | Bukkit API |

## 脚本案例

### 基本脚本执行

```yaml
run1:
  action:
    $js:
      - 'var b=1'
      - 'b+=1'
      - 'b'
```

### 条件判断

```yaml
run2:
  action:
    if: '玩家.权限("admin")'
    then:
      - '玩家.发送消息("你是管理员")'
    else: '玩家.发送消息("你不是管理员")'
```

### 物品行为脚本

```yaml
sword:
  meta:
    material: DIAMOND_SWORD
    action:
      onAttack: |-
        // 获取冷却服务
        cd = item.service.get(Cooldown).get(attacker, "ATK")
        
        if (cd.isInCooldown()) {
            // 如果在冷却中，取消攻击
            event.setCancelled(true)
            player.sendRichMessage("<rainbow>冷却中...")
        } else {
            // 设置伤害并添加冷却
            event.getAction().getSource().setDamage(20.0)
            cd.setCooldown("1.5s")
        }
```

## 脚本块

脚本可以组织为块，便于管理复杂脚本：

```yaml
script:
  blocks:
    checkPermission: |-
      if (player.hasPermission("admin")) {
        return true;
      } else {
        player.sendMessage("权限不足");
        return false;
      }
    
    giveReward: |-
      player.getInventory().addItem(new ItemStack(Material.DIAMOND, 1));
      player.sendMessage("奖励已发放");
  
  action:
    onCommand: |-
      if (blocks.checkPermission()) {
        blocks.giveReward();
      }
``` 