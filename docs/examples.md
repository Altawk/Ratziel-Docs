---
title: 使用案例
sidebar_position: 7
---

# 使用案例

本页面提供一些实用的 Ratziel 插件配置案例，帮助您快速上手并理解各种功能的实际应用。

## 基础案例

### 简单物品

这个案例展示了如何创建一个带有自定义名称和描述的基础物品。

```yaml
BlackApple:
  item:
    material: APPLE
    name: "<black>Bad Black <red>Apple"
    lore:
      - "<white>But it tastes great!"
      - "<gold>Mr.Black's Apple <green>is so good!"
      - "<blue>Let me press <key:key.jump> to jump!"
    unbreakable: true # 不可破坏
```

## 杀敌计数器

一个能够记录玩家击杀数量的武器，并动态显示在物品名称中。

```yaml
# 案例: 杀敌数统计
KillCounter:
  meta:
    material: diamond_sword
    # dynamic 表示动态标签, 在非创造模式下动态解析, 并呈现给玩家
    name: '<blue>已击杀: <yellow>{dynamic:data:kill_count}'
    data:
      kill_count: 0 # 杀敌数统计数据 (这里是赋初值)
    action:
      # 触发器: 当用此物品击杀生物时触发
      onKill:
        - 'count = item.get("kill_count").content' # 获取杀敌数内容数据
        - 'item.set("kill_count", new NbtInt(count + 1))' # 杀敌数 + 1
```

## 认主物品

这个物品在丢出时会记住所有者，只有所有者才能捡起。

```yaml
owned:
  item:
    mat: diamond_sword
    name: "认主之剑"
    actions:
      onDrop: 'dropped.setOwner(player.getUniqueId())'
      onPick: |-
        owner = picked.getOwner()
        if (owner && entity.getUniqueId() != owner) {
            event.setCancelled(true)
        }
```

## 高级案例

### 技能物品

这是一个带有冷却时间的技能物品，可以发射火球。

```yaml
fireballWand:
  meta:
    material: BLAZE_ROD
    name: "<gold>火球法杖"
    lore:
      - "<yellow>右键发射火球"
      - "<gray>冷却时间: <green>3秒"
    enchant:
      FIRE_ASPECT: 1
    hideFlags:
      - HIDE_ENCHANTS
    action:
      onInteract: |-
        if (event.getAction() != Action.RIGHT_CLICK_AIR && event.getAction() != Action.RIGHT_CLICK_BLOCK) {
          return
        }
        
        cd = item.service.get(Cooldown).get(player, "FIREBALL")
        
        if (cd.isInCooldown()) {
          player.sendRichMessage("<red>技能冷却中: <yellow>" + cd.getRemaining() + "秒")
          return
        }
        
        // 创建火球
        fireball = player.getWorld().spawn(player.getEyeLocation(), Fireball.class)
        fireball.setShooter(player)
        fireball.setYield(2)
        fireball.setDirection(player.getEyeLocation().getDirection().multiply(2))
        
        // 设置冷却
        cd.setCooldown("3s")
        
        // 播放效果
        player.playSound(player.getLocation(), Sound.ENTITY_BLAZE_SHOOT, 1, 1)
        player.sendRichMessage("<green>火球已发射!")
```

### 随机附魔物品

一个在创建时随机给予不同附魔的物品。

```yaml
randomEnchanted:
  meta:
    material: DIAMOND_SWORD
    name: "<aqua>命运之刃"
    lore:
      - "<gray>每次获取都有不同的附魔效果"
    define:
      randomEnchant: |-
        enchants = [
          "DAMAGE_ALL",
          "DAMAGE_ARTHROPODS",
          "DAMAGE_UNDEAD",
          "KNOCKBACK",
          "FIRE_ASPECT",
          "LOOT_BONUS_MOBS"
        ]
        
        // 随机选择1-3个附魔
        count = Math.floor(Math.random() * 3) + 1
        selected = []
        
        for (i = 0; i < count; i++) {
          idx = Math.floor(Math.random() * enchants.length)
          ench = enchants[idx]
          level = Math.floor(Math.random() * 4) + 1
          selected.push([ench, level])
          enchants.splice(idx, 1)
          if (enchants.length == 0) break
        }
        
        return selected
    action:
      onCreate: |-
        // 获取随机附魔
        enchants = define.randomEnchant
        
        // 应用附魔
        for (i = 0; i < enchants.length; i++) {
          ench = enchants[i]
          meta = item.getItemMeta()
          meta.addEnchant(Enchantment.getByName(ench[0]), ench[1], true)
          item.setItemMeta(meta)
        }
```

### 实用工具组合

这个配置创建一个多功能工具，可以测量距离和复制方块。

```yaml
utilityWand:
  meta:
    material: STICK
    name: "<light_purple>工具魔杖"
    lore:
      - "<gray>左键: <white>设置点A"
      - "<gray>右键: <white>设置点B"
      - "<gray>潜行+左键: <white>测量距离"
      - "<gray>潜行+右键: <white>复制目标方块"
    data:
      posA: null
      posB: null
      block: null
    action:
      onInteract: |-
        isSneaking = player.isSneaking()
        isLeftClick = event.getAction() == Action.LEFT_CLICK_BLOCK
        isRightClick = event.getAction() == Action.RIGHT_CLICK_BLOCK
        
        if (isLeftClick) {
          if (isSneaking) {
            // 测量距离
            posA = item.get("posA")
            posB = item.get("posB")
            
            if (!posA || !posB) {
              player.sendRichMessage("<red>请先设置点A和点B")
              return
            }
            
            dist = Math.sqrt(
              Math.pow(posA.x - posB.x, 2) +
              Math.pow(posA.y - posB.y, 2) +
              Math.pow(posA.z - posB.z, 2)
            )
            
            player.sendRichMessage("<green>距离: <yellow>" + dist.toFixed(2) + " 方块")
          } else {
            // 设置点A
            block = event.getClickedBlock()
            loc = block.getLocation()
            item.set("posA", {x: loc.getX(), y: loc.getY(), z: loc.getZ()})
            player.sendRichMessage("<green>已设置点A: <yellow>" + loc.getX() + ", " + loc.getY() + ", " + loc.getZ())
          }
        } else if (isRightClick) {
          if (isSneaking) {
            // 复制方块
            block = event.getClickedBlock()
            item.set("block", block.getType().name())
            player.sendRichMessage("<green>已复制方块: <yellow>" + block.getType().name())
          } else {
            // 设置点B
            block = event.getClickedBlock()
            loc = block.getLocation()
            item.set("posB", {x: loc.getX(), y: loc.getY(), z: loc.getZ()})
            player.sendRichMessage("<green>已设置点B: <yellow>" + loc.getX() + ", " + loc.getY() + ", " + loc.getZ())
          }
        }
        
        event.setCancelled(true)
```

## 其他案例

更多案例请参考插件源码中的 `demo` 目录，或者查看插件官方网站获取更多社区分享的物品配置。 