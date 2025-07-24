---
title: 插件兼容
sidebar_position: 6
---

# 插件兼容

Ratziel 采用先进的 Hook 系统，提供了强大的第三方插件兼容能力。通过动态类加载和智能适配机制，Ratziel 可以与多种主流插件无缝集成。

## 兼容性架构

### Hook 系统

Ratziel 的兼容性基于强大的 Hook 系统：

- **PluginHook** - 插件钩子接口，定义基本的钩子行为
- **ManagedPluginHook** - 托管钩子，支持动态类加载
- **HookManager** - 钩子管理器，负责注册和管理所有钩子
- **CompatibleClassLoader** - 兼容性类加载器，解决类冲突问题

### 工作原理

1. **插件检测** - 自动检测服务器中安装的相关插件
2. **钩子注册** - 为检测到的插件注册相应的钩子
3. **类加载管理** - 通过专用类加载器管理插件间的类依赖
4. **API 桥接** - 提供统一的 API 接口访问第三方插件功能
5. **生命周期管理** - 在插件的不同生命周期阶段执行相应的兼容性逻辑

## 支持的插件

### AzureFlow

**插件描述：** 强大的自定义物品插件，支持复杂的物品配置和行为定义。

**兼容特性：**
- ✅ 物品导入和使用
- ✅ 物品属性继承
- ✅ 动作系统集成
- ✅ NBT 数据兼容

**使用方法：**

```yaml
# 直接使用 AzureFlow 物品
AzureFlowItem:
  meta:
    azureflow: "custom_sword"  # AzureFlow 物品 ID

    # 可以在 Ratziel 中扩展 AzureFlow 物品
    action:
      onInteract: |-
        player.sendMessage("这是一个增强的 AzureFlow 物品!")

# 继承 AzureFlow 物品属性
EnhancedAzureItem:
  meta:
    inherit: "azureflow:magic_wand"  # 继承 AzureFlow 物品

    # 添加 Ratziel 特有功能
    data:
      magic_power: 100

    action:
      onAttack: |-
        power = item.get("magic_power") || 0
        if (power > 0) {
          event.setDamage(event.getDamage() * 1.5)
          item.set("magic_power", power - 1)
        }
```

### NeigeItems

**插件描述：** 功能丰富的物品插件，支持多种物品类型和自定义功能。

**兼容特性：**
- ✅ 物品导入和使用
- ✅ 材质和模型支持
- ✅ 自定义属性兼容
- ✅ 事件系统集成

**使用方法：**

```yaml
# 使用 NeigeItems 物品
NeigeItem:
  meta:
    neigeitems: "special_tool"  # NeigeItems 物品 ID

    # 添加 Ratziel 增强功能
    action:
      onUse: |-
        player.sendMessage("使用了 NeigeItems 特殊工具!")

# 混合使用
HybridItem:
  meta:
    # 基础来源于 NeigeItems
    neigeitems: "base_item"

    # 使用 Ratziel 的动态数据
    data:
      usage_count: 0
      last_repair: 0

    # 添加自定义行为
    action:
      onInteract: |-
        count = item.get("usage_count") || 0
        item.set("usage_count", count + 1)

        if (count > 100) {
          player.sendMessage("工具需要维修了!")
        }
```

### PlaceholderAPI

**插件描述：** Minecraft 服务器最流行的变量占位符插件。

**兼容特性：**
- ✅ 完整的占位符支持
- ✅ 自定义占位符注册
- ✅ 动态变量解析
- ✅ 跨插件数据共享

**使用方法：**

```yaml
PlaceholderItem:
  meta:
    material: PAPER

    # 在物品名称和描述中使用 PlaceholderAPI
    name: "<gold>%player_name% 的信息卡"
    lore:
      - "玩家: %player_name%"
      - "等级: %player_level%"
      - "金钱: %vault_eco_balance%"
      - "在线时间: %statistic_time_played%"
      - ""
      - "服务器: %server_name%"
      - "在线人数: %server_online%"

    action:
      onInteract: |-
        // 在脚本中使用 PlaceholderAPI
        balance = PlaceholderAPI.setPlaceholders(player, "%vault_eco_balance%")
        level = PlaceholderAPI.setPlaceholders(player, "%player_level%")

        player.sendMessage("你的余额: " + balance + ", 等级: " + level)
```

## 兼容性配置

### 全局配置

在 `settings.yml` 中配置兼容性选项：

```yaml
Compatibility:
  # 启用的兼容性模块
  enabled:
    - "AzureFlow"
    - "NeigeItems"
    - "PlaceholderAPI"
    - "Vault"
    - "WorldGuard"

  # 兼容性设置
  settings:
    # 自动检测插件
    auto_detect: true

    # 延迟加载（毫秒）
    load_delay: 1000

    # 错误处理
    error_handling:
      # 兼容性失败时是否继续加载
      continue_on_error: true
      # 是否输出详细错误信息
      verbose_errors: false
```

## 故障排除

### 常见问题

#### 兼容性插件未加载

**症状：** 控制台显示插件未找到或加载失败

**解决方案：**
1. 确认第三方插件已正确安装
2. 检查插件版本兼容性
3. 查看控制台错误信息
4. 尝试调整加载顺序

#### 物品无法正常显示

**症状：** 使用第三方插件物品时显示异常

**解决方案：**
1. 检查物品 ID 是否正确
2. 确认第三方插件物品存在
3. 查看 NBT 数据是否完整
4. 尝试重新加载配置

### 调试工具

```yaml
DebugCompatibility:
  meta:
    material: REDSTONE
    name: "<red>兼容性调试器"

    action:
      onInteract: |-
        // 检查已加载的钩子
        hooks = HookManager.registry
        player.sendMessage("已加载的钩子:")

        for (hookName in hooks.keySet()) {
          hook = hooks.get(hookName)
          status = hook.isHooked() ? "✅" : "❌"
          player.sendMessage("  " + status + " " + hookName)
        }
```