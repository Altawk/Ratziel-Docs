---
title: 配置指南
sidebar_position: 8
---

# 配置指南

本文档详细介绍 Ratziel 插件的配置系统，包括主配置文件、工作空间配置、以及各种高级配置选项。

## 配置文件结构

Ratziel 安装后会在插件目录下生成以下配置文件结构：

```
Ratziel/
├── settings.yml          # 主配置文件
├── kether.yml            # Kether 脚本配置
├── lang/                 # 语言文件目录
│   ├── zh_CN.yml        # 中文语言文件
│   └── en_US.yml        # 英文语言文件
└── workspace/           # 工作空间目录
    ├── items/           # 物品配置目录
    ├── scripts/         # 脚本文件目录
    └── templates/       # 模板文件目录
```

## 主配置文件 (settings.yml)

### 工作空间配置

```yaml
Workspaces:
  # 默认工作空间
  default:
    # 是否监听文件变化并自动重载
    listen: true
    
    # 文件过滤器（正则表达式）
    filter: '^(?![#!]).*\.(?i)(yaml|yml|toml|tml|json|conf)$'
    
    # 工作空间路径
    path: 'plugins/Ratziel/workspace'
    
    # 是否使用文件名作为元素名称
    use-filename: false
    
    # 统一元素类型（None 表示不统一）
    unified-type: None
  
  # 自定义工作空间示例
  custom:
    listen: true
    filter: '^.*\.yml$'
    path: 'plugins/Ratziel/custom'
    use-filename: true
    unified-type: Item
```

**配置说明：**

- `listen` - 启用后会监听工作空间内文件的变化，自动重新加载修改的文件
- `filter` - 正则表达式，用于过滤要加载的文件类型
- `path` - 工作空间的绝对或相对路径
- `use-filename` - 是否将文件名（不含扩展名）作为元素名称
- `unified-type` - 强制所有元素使用统一类型

### 消息配置

```yaml
Message:
  # 是否在消息组件序列化时默认取消斜体
  non-italic-by-default: true
  
  # 默认字体
  default-font: "minecraft:default"
  
  # 颜色配置
  colors:
    # 是否启用 RGB 颜色支持
    enable-rgb: true
    # 是否启用渐变色支持
    enable-gradient: true
```

### 脚本配置

```yaml
Script:
  # JavaScript 配置
  JavaScript:
    # 使用的引擎 (nashorn/graaljs)
    engine: "nashorn"
    
    # 是否启用脚本缓存
    enable-cache: true
    
    # 缓存大小
    cache-size: 100
    
    # 脚本超时时间（毫秒）
    timeout: 5000
  
  # Kether 配置
  Kether:
    # 是否启用调试模式
    debug: false
    
    # 变量作用域
    variable-scope: "local"
  
  # JEXL 配置
  JEXL:
    # 是否启用严格模式
    strict-mode: false
    
    # 数学精度
    math-precision: 10
```

### 性能配置

```yaml
Performance:
  # 物品生成器配置
  ItemGenerator:
    # 线程池大小
    thread-pool-size: 4
    
    # 队列大小
    queue-size: 1000
    
    # 是否启用预加载
    enable-preload: true
  
  # 缓存配置
  Cache:
    # 物品缓存大小
    item-cache-size: 500
    
    # 脚本缓存大小
    script-cache-size: 100
    
    # 缓存过期时间（秒）
    expire-time: 300
```

### 调试配置

```yaml
Debug:
  # 是否启用调试模式
  enabled: false
  
  # 调试级别 (TRACE/DEBUG/INFO/WARN/ERROR)
  level: "INFO"
  
  # 是否输出详细的堆栈信息
  verbose-stacktrace: false
  
  # 是否记录性能信息
  performance-logging: false
  
  # 调试输出目标
  targets:
    - "console"
    - "file"
  
  # 日志文件配置
  log-file:
    path: "plugins/Ratziel/debug.log"
    max-size: "10MB"
    max-files: 5
```

## Kether 配置 (kether.yml)

```yaml
# Kether 脚本引擎配置
kether:
  # 是否启用 Kether 支持
  enabled: true
  
  # 脚本执行超时时间（毫秒）
  timeout: 10000
  
  # 是否启用调试模式
  debug: false
  
  # 变量配置
  variables:
    # 全局变量
    global:
      server_name: "我的服务器"
      max_players: 100
    
    # 默认变量
    defaults:
      player_level: 1
      player_money: 0
  
  # 函数库配置
  libraries:
    # 是否加载内置函数库
    builtin: true
    
    # 自定义函数库路径
    custom:
      - "plugins/Ratziel/kether/functions"
```

## 语言配置

### 中文语言文件 (lang/zh_CN.yml)

```yaml
# 插件消息
Plugin-Loading: "&a[Ratziel] &7插件正在加载... &8(v{0})"
Plugin-Enabled: "&a[Ratziel] &7插件已启用 &8(v{0})"
Plugin-Reloaded: "&a[Ratziel] &7插件已重载完成 &8({0}ms)"

# 兼容性消息
Plugin-Compat-Hooked: "&a[Ratziel] &7已挂钩插件: &f{0}"
Plugin-Compat-Failed: "&c[Ratziel] &7插件挂钩失败: &f{0}"

# 命令消息
Command-No-Permission: "&c你没有权限执行此命令!"
Command-Player-Only: "&c此命令只能由玩家执行!"
Command-Invalid-Args: "&c命令参数错误! 用法: {0}"

# 物品消息
Item-Given: "&a已给予 &f{0} &a物品 &f{1} &ax{2}"
Item-Not-Found: "&c未找到物品: &f{0}"
Item-Invalid: "&c无效的物品配置: &f{0}"

# 错误消息
Error-Config-Load: "&c配置文件加载失败: &f{0}"
Error-Script-Execute: "&c脚本执行错误: &f{0}"
Error-Unknown: "&c发生未知错误，请查看控制台获取详细信息"
```

### 英文语言文件 (lang/en_US.yml)

```yaml
# Plugin messages
Plugin-Loading: "&a[Ratziel] &7Loading plugin... &8(v{0})"
Plugin-Enabled: "&a[Ratziel] &7Plugin enabled &8(v{0})"
Plugin-Reloaded: "&a[Ratziel] &7Plugin reloaded &8({0}ms)"

# Compatibility messages
Plugin-Compat-Hooked: "&a[Ratziel] &7Hooked plugin: &f{0}"
Plugin-Compat-Failed: "&c[Ratziel] &7Failed to hook plugin: &f{0}"

# Command messages
Command-No-Permission: "&cYou don't have permission to execute this command!"
Command-Player-Only: "&cThis command can only be executed by players!"
Command-Invalid-Args: "&cInvalid command arguments! Usage: {0}"

# Item messages
Item-Given: "&aGiven &f{0} &aitem &f{1} &ax{2}"
Item-Not-Found: "&cItem not found: &f{0}"
Item-Invalid: "&cInvalid item configuration: &f{0}"

# Error messages
Error-Config-Load: "&cFailed to load configuration: &f{0}"
Error-Script-Execute: "&cScript execution error: &f{0}"
Error-Unknown: "&cAn unknown error occurred, please check console for details"
```

## 工作空间配置

### 物品配置示例

在 `workspace/items/` 目录下创建物品配置文件：

```yaml
# workspace/items/weapons.yml
FireSword:
  meta:
    material: DIAMOND_SWORD
    name: "<gradient:red:orange>烈焰之剑</gradient>"
    lore:
      - "<gray>一把燃烧着永恒火焰的神剑"
      - "<red>攻击时有概率点燃敌人"
    
    enchant:
      SHARPNESS: 5
      FIRE_ASPECT: 2
    
    action:
      onAttack: |-
        if (Math.random() < 0.3) {
          target.setFireTicks(100)
          player.sendMessage("烈焰之力被激发!")
        }

IceBow:
  meta:
    material: BOW
    name: "<gradient:aqua:blue>寒冰之弓</gradient>"
    lore:
      - "<gray>散发着刺骨寒意的神弓"
      - "<blue>射击时有概率冰冻敌人"
    
    enchant:
      POWER: 4
      INFINITY: 1
    
    action:
      onShoot: |-
        if (Math.random() < 0.25) {
          // 给箭矢添加冰冻效果
          arrow.setMetadata("ice_arrow", true)
        }
```

### 模板配置示例

在 `workspace/templates/` 目录下创建模板文件：

```yaml
# workspace/templates/base.yml
BaseWeapon:
  template:
    unbreakable: true
    hideFlags:
      - HIDE_ATTRIBUTES
      - HIDE_UNBREAKABLE
    
    lore:
      - ""
      - "<gray>━━━━━━━━━━━━━━━━━━━━"
      - "<yellow>⚔ 攻击力: <white>{attack_damage}"
      - "<red>❤ 生命值: <white>{health_bonus}"
      - "<gray>━━━━━━━━━━━━━━━━━━━━"

LegendaryItem:
  template:
    name: "<rainbow>{item_name}</rainbow>"
    lore:
      - "<gold>★ 传说级物品 ★"
      - ""
      - "{description}"
      - ""
      - "<purple>稀有度: <gold>传说"
```

## 高级配置

### 自定义序列化器

```yaml
# settings.yml
Serialization:
  # 自定义序列化器
  custom-serializers:
    # 自定义颜色序列化器
    color:
      class: "com.example.ColorSerializer"
      priority: 10
    
    # 自定义位置序列化器
    location:
      class: "com.example.LocationSerializer"
      priority: 5
```

### 数据库配置

```yaml
# settings.yml
Database:
  # 数据库类型 (sqlite/mysql/postgresql)
  type: "sqlite"
  
  # SQLite 配置
  sqlite:
    file: "plugins/Ratziel/data.db"
    
  # MySQL 配置
  mysql:
    host: "localhost"
    port: 3306
    database: "ratziel"
    username: "root"
    password: "password"
    
    # 连接池配置
    pool:
      max-connections: 10
      min-connections: 2
      connection-timeout: 30000
```

### 网络配置

```yaml
# settings.yml
Network:
  # HTTP 客户端配置
  http:
    # 连接超时时间（毫秒）
    connect-timeout: 5000
    
    # 读取超时时间（毫秒）
    read-timeout: 10000
    
    # 用户代理
    user-agent: "Ratziel/1.0"
    
    # 代理配置
    proxy:
      enabled: false
      host: "proxy.example.com"
      port: 8080
      username: ""
      password: ""
```

## 配置验证

### 配置文件验证

Ratziel 提供了配置文件验证功能，可以检查配置的正确性：

```yaml
# 在配置文件中启用验证
Validation:
  # 是否启用配置验证
  enabled: true
  
  # 验证级别 (STRICT/NORMAL/LOOSE)
  level: "NORMAL"
  
  # 是否在验证失败时停止加载
  fail-fast: false
  
  # 验证规则
  rules:
    # 必需字段验证
    required-fields: true
    
    # 类型验证
    type-checking: true
    
    # 范围验证
    range-checking: true
```

### 配置迁移

```yaml
# 配置版本和迁移
Migration:
  # 当前配置版本
  version: "1.0.0"
  
  # 是否启用自动迁移
  auto-migrate: true
  
  # 迁移备份
  backup:
    enabled: true
    path: "plugins/Ratziel/backups"
    max-backups: 5
```

## 最佳实践

### 配置组织

1. **分类管理** - 将不同类型的物品分别放在不同的配置文件中
2. **模板复用** - 使用模板减少重复配置
3. **注释说明** - 在配置文件中添加详细的注释
4. **版本控制** - 使用 Git 等工具管理配置文件版本

### 性能优化

1. **合理设置缓存** - 根据服务器性能调整缓存大小
2. **监听配置** - 在开发环境启用文件监听，生产环境可以关闭
3. **脚本优化** - 避免在配置中编写复杂的脚本逻辑
4. **资源限制** - 设置合理的超时时间和资源限制

### 安全考虑

1. **权限控制** - 合理设置文件和目录权限
2. **输入验证** - 启用配置验证防止恶意输入
3. **备份策略** - 定期备份重要配置文件
4. **敏感信息** - 避免在配置文件中存储敏感信息
