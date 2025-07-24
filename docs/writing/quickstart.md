---
title: 快速开始
sidebar_position: 1
---

# 快速开始

本指南将帮助你在 5 分钟内快速上手 Ratziel 插件，创建你的第一个自定义物品。

## 前置要求

在开始之前，请确保你的服务器满足以下要求：

- **Minecraft 版本**: 1.12.2 - 1.20.x
- **服务端**: Spigot、Paper 或其他兼容服务端
- **Java 版本**: Java 8 或更高版本
- **TabooLib**: 最新版本的 TabooLib 框架

## 安装步骤

### 1. 下载插件

1. 下载最新版本的 [TabooLib](https://github.com/TabooLib/taboolib)
2. 下载最新版本的 [Ratziel](https://github.com/TheFloodDragon/Ratziel-Beta)

### 2. 安装插件

1. 将 `TabooLib.jar` 放入服务器的 `plugins` 目录
2. 将 `Ratziel.jar` 放入服务器的 `plugins` 目录
3. 启动或重启服务器

### 3. 验证安装

启动服务器后，在控制台中应该看到类似以下的信息：

```
[INFO] [TabooLib] Loading TabooLib...
[INFO] [Ratziel] Loading Ratziel...
[INFO] [Ratziel] Plugin enabled (v1.0.0)
```

## 创建第一个物品

### 1. 打开配置文件

导航到 `plugins/Ratziel/workspace/items/` 目录，创建一个新的配置文件 `my_items.yml`。

### 2. 编写物品配置

在 `my_items.yml` 中添加以下内容：

```yaml
# 我的第一个自定义物品
MyFirstSword:
  meta:
    # 物品材质
    material: DIAMOND_SWORD
    
    # 物品名称（支持颜色代码）
    name: "<gradient:red:orange>我的第一把剑</gradient>"
    
    # 物品描述
    lore:
      - "<gray>这是我用 Ratziel 创建的第一把剑"
      - "<yellow>攻击力: +10"
      - "<blue>特殊效果: 火焰附加"
      - ""
      - "<green>右键释放火球!"
    
    # 附魔
    enchant:
      SHARPNESS: 5      # 锋利 5
      FIRE_ASPECT: 2    # 火焰附加 2
      UNBREAKABLE: true # 不可破坏
    
    # 隐藏标签
    hideFlags:
      - HIDE_ENCHANTS     # 隐藏附魔信息
      - HIDE_ATTRIBUTES   # 隐藏属性信息
    
    # 物品行为
    action:
      # 右键释放火球
      onRight: |-
        // 创建火球
        fireball = player.getWorld().spawn(player.getEyeLocation(), Fireball.class)
        fireball.setShooter(player)
        fireball.setDirection(player.getEyeLocation().getDirection().multiply(2))
        
        // 发送消息和音效
        player.sendMessage("<red>🔥 火球发射!")
        player.playSound(player.getLocation(), Sound.ENTITY_BLAZE_SHOOT, 1, 1)
      
      # 攻击时触发
      onAttack: |-
        // 30% 概率点燃敌人
        if (Math.random() < 0.3) {
          target.setFireTicks(100)  // 点燃 5 秒
          player.sendMessage("<orange>⚡ 火焰之力被激发!")
        }
```

### 3. 重载配置

在游戏中执行以下命令重载配置：

```
/ratziel reload
```

### 4. 获取物品

使用以下命令获取你创建的物品：

```
/ratziel give MyFirstSword
```

## 测试物品功能

现在你可以测试物品的各种功能：

1. **右键点击** - 释放火球
2. **攻击怪物** - 有概率点燃敌人
3. **查看属性** - 物品具有锋利 5 和火焰附加 2

## 进阶功能预览

### 动态数据系统

为物品添加动态数据，实现更复杂的功能：

```yaml
SmartSword:
  meta:
    material: NETHERITE_SWORD
    name: "<rainbow>智能剑</rainbow> <gray>[击杀: {dynamic:data:kills}]"
    
    # 初始数据
    data:
      kills: 0
      level: 1
    
    # 动态描述
    lore:
      - "<yellow>等级: {dynamic:data:level}"
      - "<red>击杀数: {dynamic:data:kills}"
      - "<green>每 10 次击杀升级一次"
    
    action:
      onKill: |-
        // 增加击杀数
        kills = item.get("kills") || 0
        newKills = kills + 1
        item.set("kills", newKills)
        
        // 检查升级
        if (newKills % 10 == 0) {
          level = item.get("level") || 1
          item.set("level", level + 1)
          player.sendMessage("<gold>⭐ 武器升级到 " + (level + 1) + " 级!")
        }
        
        player.sendMessage("<green>击杀数: " + newKills)
```

### 技能系统

创建具有冷却时间的技能系统：

```yaml
SkillWand:
  meta:
    material: BLAZE_ROD
    name: "<blue>技能法杖"
    
    data:
      last_use: 0
    
    action:
      onRight: |-
        currentTime = System.currentTimeMillis()
        lastUse = item.get("last_use") || 0
        
        // 检查冷却时间（5秒）
        if (currentTime - lastUse < 5000) {
          remaining = Math.ceil((5000 - (currentTime - lastUse)) / 1000)
          player.sendMessage("<red>技能冷却中，还需 " + remaining + " 秒")
          return
        }
        
        // 执行技能
        item.set("last_use", currentTime)
        player.addPotionEffect(new PotionEffect(PotionEffectType.SPEED, 200, 2))
        player.sendMessage("<green>⚡ 疾风术激活!")
```

## 常用命令

| 命令 | 描述 | 权限 |
|------|------|------|
| `/ratziel give <物品ID> [数量] [玩家]` | 给予物品 | `ratziel.command.give` |
| `/ratziel reload` | 重载配置 | `ratziel.command.reload` |
| `/ratziel list` | 列出所有物品 | `ratziel.command.list` |
| `/ratziel info <物品ID>` | 查看物品信息 | `ratziel.command.info` |

## 下一步

恭喜！你已经成功创建了第一个 Ratziel 物品。接下来你可以：

1. **阅读完整文档** - 了解更多高级功能
2. **学习脚本编写** - 掌握 JavaScript 和 Kether 脚本
3. **探索组件系统** - 了解物品的各种组件
4. **查看示例配置** - 学习更多实用的配置案例
5. **加入社区** - 与其他用户交流经验

## 获取帮助

如果在使用过程中遇到问题，可以：

1. 查看 [常见问题](./faq.md) 文档
2. 阅读 [完整文档](../intro.md)
3. 在 GitHub 上提交 Issue
4. 联系作者 QQ: 1610105206

## 有用的资源

- **配置案例**: [examples.md](./examples.md)
- **脚本系统**: [script.md](./script.md)
- **物品系统**: [item.md](./item.md)
- **API 文档**: [api.md](./api.md)
- **插件兼容**: [compat.md](./compat.md)

---

**提示**: 建议在测试服务器上先熟悉插件功能，然后再在正式服务器上使用。记得定期备份配置文件！
