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

## 进阶系统案例

### 升级武器系统

一个可以通过击杀怪物获得经验并升级的武器系统。

```yaml
EvolvingSword:
  meta:
    material: IRON_SWORD
    name: "<gradient:yellow:red>进化之剑</gradient> <gray>[Lv.{dynamic:data:level}]"
    lore:
      - "<gray>━━━━━━━━━━━━━━━━━━━━"
      - "<yellow>⚔ 等级: <white>{dynamic:data:level}"
      - "<blue>📊 经验: <white>{dynamic:data:experience}/{dynamic:data:max_experience}"
      - "<red>💀 击杀: <white>{dynamic:data:kill_count}"
      - "<green>💎 攻击力: <white>{define:attack_damage}"
      - "<gray>━━━━━━━━━━━━━━━━━━━━"
      - "<aqua>每次击杀获得经验，升级提升属性"

    data:
      level: 1
      experience: 0
      max_experience: 100
      kill_count: 0

    define:
      attack_damage: |-
        level = item.get("level") || 1
        return 5 + (level * 2)

      sharpness_level: |-
        level = item.get("level") || 1
        return Math.min(level, 5)

    enchant:
      SHARPNESS: "{define:sharpness_level}"
      UNBREAKING: 3

    action:
      onKill: |-
        level = item.get("level") || 1
        exp = item.get("experience") || 0
        maxExp = item.get("max_experience") || 100
        killCount = item.get("kill_count") || 0

        expGain = 10 + (level * 2)
        newExp = exp + expGain
        newKillCount = killCount + 1

        item.set("kill_count", newKillCount)

        if (newExp >= maxExp) {
          newLevel = level + 1
          newExp = 0
          newMaxExp = maxExp + (50 * newLevel)

          item.set("level", newLevel)
          item.set("experience", newExp)
          item.set("max_experience", newMaxExp)

          player.sendMessage("<gold>⭐ 武器升级到 " + newLevel + " 级!")
          player.sendTitle("<gold>武器升级!", "<yellow>等级 " + newLevel, 10, 40, 10)
          player.playSound(player.getLocation(), Sound.ENTITY_PLAYER_LEVELUP, 1, 1)
        } else {
          item.set("experience", newExp)
          player.sendMessage("<green>+" + expGain + " 经验 (" + newExp + "/" + maxExp + ")")
        }
```

### 技能法杖系统

一个具有多种技能和法力系统的魔法武器。

```yaml
MagicWand:
  meta:
    material: BLAZE_ROD
    name: "<rainbow>魔法法杖</rainbow>"
    lore:
      - "<gray>━━━━━━━━━━━━━━━━━━━━"
      - "<blue>🔮 法力: <white>{dynamic:data:mana}/{dynamic:data:max_mana}"
      - "<purple>✨ 技能等级: <white>{dynamic:data:skill_level}"
      - "<gray>━━━━━━━━━━━━━━━━━━━━"
      - "<yellow>左键: 火球术 (消耗 10 法力)"
      - "<green>右键: 治疗术 (消耗 15 法力)"
      - "<blue>Shift+右键: 传送术 (消耗 25 法力)"
      - "<gray>━━━━━━━━━━━━━━━━━━━━"
      - "<red>冷却时间: 2秒"

    data:
      mana: 100
      max_mana: 100
      skill_level: 1
      last_use: 0

    action:
      # 火球术
      onLeft: |-
        currentTime = System.currentTimeMillis()
        lastUse = item.get("last_use") || 0
        mana = item.get("mana") || 0
        skillLevel = item.get("skill_level") || 1

        if (currentTime - lastUse < 2000) {
          player.sendMessage("<red>技能冷却中...")
          return
        }

        if (mana < 10) {
          player.sendMessage("<red>法力不足!")
          return
        }

        item.set("mana", mana - 10)
        item.set("last_use", currentTime)

        fireball = player.getWorld().spawn(player.getEyeLocation(), Fireball.class)
        fireball.setShooter(player)
        fireball.setYield(1 + skillLevel)
        fireball.setDirection(player.getEyeLocation().getDirection().multiply(2))

        player.sendMessage("<yellow>🔥 火球术!")
        player.playSound(player.getLocation(), Sound.ENTITY_BLAZE_SHOOT, 1, 1)

      # 治疗术
      onRight: |-
        if (player.isSneaking()) return  // 避免与传送术冲突

        currentTime = System.currentTimeMillis()
        lastUse = item.get("last_use") || 0
        mana = item.get("mana") || 0
        skillLevel = item.get("skill_level") || 1

        if (currentTime - lastUse < 2000) {
          player.sendMessage("<red>技能冷却中...")
          return
        }

        if (mana < 15) {
          player.sendMessage("<red>法力不足!")
          return
        }

        item.set("mana", mana - 15)
        item.set("last_use", currentTime)

        healAmount = 4 + (skillLevel * 2)
        newHealth = Math.min(player.getHealth() + healAmount, player.getMaxHealth())
        player.setHealth(newHealth)

        player.sendMessage("<green>💚 治疗术! 恢复 " + healAmount + " 生命值")
        player.playSound(player.getLocation(), Sound.ENTITY_PLAYER_LEVELUP, 1, 1.5)

      # 传送术
      onRightShift: |-
        currentTime = System.currentTimeMillis()
        lastUse = item.get("last_use") || 0
        mana = item.get("mana") || 0

        if (currentTime - lastUse < 2000) {
          player.sendMessage("<red>技能冷却中...")
          return
        }

        if (mana < 25) {
          player.sendMessage("<red>法力不足!")
          return
        }

        block = player.getTargetBlock(null, 50)
        if (block && block.getType() != Material.AIR) {
          location = block.getLocation().add(0, 1, 0)
          player.teleport(location)

          item.set("mana", mana - 25)
          item.set("last_use", currentTime)

          player.sendMessage("<purple>✨ 传送术!")
          player.playSound(player.getLocation(), Sound.ENTITY_ENDERMAN_TELEPORT, 1, 1)
        } else {
          player.sendMessage("<red>无法传送到该位置!")
        }

      # 法力回复
      onTick:
        period: 40  # 每2秒
        run: |-
          mana = item.get("mana") || 0
          maxMana = item.get("max_mana") || 100
          if (mana < maxMana) {
            item.set("mana", Math.min(mana + 5, maxMana))
          }

      # 技能升级
      onKill: |-
        skillLevel = item.get("skill_level") || 1
        if (Math.random() < 0.1 && skillLevel < 10) {  // 10% 概率升级
          item.set("skill_level", skillLevel + 1)
          player.sendMessage("<purple>🌟 技能等级提升到 " + (skillLevel + 1) + " 级!")
        }
```

### 多功能工具箱

一个集成了多种实用功能的工具。

```yaml
UtilityToolbox:
  meta:
    material: ENDER_CHEST
    name: "<gradient:blue:purple>多功能工具箱</gradient>"
    lore:
      - "<gray>━━━━━━━━━━━━━━━━━━━━"
      - "<yellow>当前模式: <white>{dynamic:data:mode}"
      - "<blue>使用次数: <white>{dynamic:data:usage_count}"
      - "<gray>━━━━━━━━━━━━━━━━━━━━"
      - "<green>右键: 打开功能菜单"
      - "<yellow>Shift+右键: 切换模式"
      - "<red>左键: 执行当前模式功能"
      - "<gray>━━━━━━━━━━━━━━━━━━━━"
      - "<aqua>模式列表:"
      - "<white>  • 挖掘模式 - 快速挖掘"
      - "<white>  • 建造模式 - 快速建造"
      - "<white>  • 修复模式 - 修复物品"
      - "<white>  • 清理模式 - 清理背包"

    data:
      mode: "挖掘模式"
      usage_count: 0
      modes: ["挖掘模式", "建造模式", "修复模式", "清理模式"]

    action:
      # 功能菜单
      onRight: |-
        if (player.isSneaking()) return

        player.sendMessage("<blue>━━━━━━ 工具箱功能菜单 ━━━━━━")
        player.sendMessage("<yellow>当前模式: <white>" + (item.get("mode") || "挖掘模式"))
        player.sendMessage("<green>可用功能:")
        player.sendMessage("<white>  1. 挖掘模式 - 3x3 范围挖掘")
        player.sendMessage("<white>  2. 建造模式 - 快速放置方块")
        player.sendMessage("<white>  3. 修复模式 - 修复手中物品")
        player.sendMessage("<white>  4. 清理模式 - 整理背包物品")
        player.sendMessage("<gray>使用 Shift+右键 切换模式")

      # 切换模式
      onRightShift: |-
        modes = item.get("modes") || ["挖掘模式", "建造模式", "修复模式", "清理模式"]
        currentMode = item.get("mode") || "挖掘模式"

        currentIndex = modes.indexOf(currentMode)
        nextIndex = (currentIndex + 1) % modes.length
        nextMode = modes[nextIndex]

        item.set("mode", nextMode)
        player.sendMessage("<green>切换到: <yellow>" + nextMode)
        player.playSound(player.getLocation(), Sound.UI_BUTTON_CLICK, 1, 1)

      # 执行功能
      onLeft: |-
        mode = item.get("mode") || "挖掘模式"
        usageCount = item.get("usage_count") || 0

        item.set("usage_count", usageCount + 1)

        if (mode == "挖掘模式") {
          // 3x3 挖掘
          block = player.getTargetBlock(null, 5)
          if (block && block.getType() != Material.AIR) {
            center = block.getLocation()
            world = center.getWorld()

            for (x = -1; x <= 1; x++) {
              for (y = -1; y <= 1; y++) {
                for (z = -1; z <= 1; z++) {
                  loc = center.clone().add(x, y, z)
                  targetBlock = world.getBlockAt(loc)
                  if (targetBlock.getType() != Material.AIR && targetBlock.getType() != Material.BEDROCK) {
                    targetBlock.breakNaturally()
                  }
                }
              }
            }
            player.sendMessage("<yellow>⛏ 3x3 挖掘完成!")
          }
        } else if (mode == "修复模式") {
          // 修复物品
          mainHand = player.getInventory().getItemInMainHand()
          if (mainHand && mainHand.getType().getMaxDurability() > 0) {
            meta = mainHand.getItemMeta()
            if (meta instanceof Damageable) {
              meta.setDamage(0)
              mainHand.setItemMeta(meta)
              player.sendMessage("<green>🔧 物品已修复!")
            }
          } else {
            player.sendMessage("<red>手中没有可修复的物品!")
          }
        } else if (mode == "清理模式") {
          // 整理背包
          inventory = player.getInventory()
          items = {}

          // 统计物品
          for (i = 0; i < 36; i++) {
            item = inventory.getItem(i)
            if (item && item.getType() != Material.AIR) {
              type = item.getType()
              if (!items[type]) items[type] = 0
              items[type] += item.getAmount()
              inventory.setItem(i, null)
            }
          }

          // 重新放置
          slot = 0
          for (type in items) {
            amount = items[type]
            maxStack = Material[type].getMaxStackSize()

            while (amount > 0 && slot < 36) {
              stackSize = Math.min(amount, maxStack)
              newItem = new ItemStack(Material[type], stackSize)
              inventory.setItem(slot, newItem)
              amount -= stackSize
              slot++
            }
          }

          player.sendMessage("<blue>📦 背包已整理!")
        }
```
