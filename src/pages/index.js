import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import CodeBlock from "@theme/CodeBlock";
import Heading from "@theme/Heading";
import styles from "./index.module.css";

function HeroSection() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <section className={styles.hero}>
            <div className="container">
                <div className={styles.heroContent}>
                    <div className={styles.heroText}>
                        <div className={styles.heroBadge}>
                            🚀 现代化 Minecraft 物品插件
                        </div>

                        <Heading as="h1" className={styles.heroTitle}>
                            构建强大的
                            <span className={styles.titleHighlight}>物品系统</span>
                        </Heading>

                        <p className={styles.heroDescription}>
                            Ratziel 提供直观的配置方式和强大的脚本引擎，<br />
                            释放您的全部创造力，构建真正独特的服务器体验。
                        </p>

                        <div className={styles.heroActions}>
                            <Link className={`${styles.btn} ${styles.btnPrimary}`} to="/docs/intro">
                                开始使用
                            </Link>
                            <Link className={`${styles.btn} ${styles.btnSecondary}`} to="/docs/writing/installation">
                                查看文档
                            </Link>
                        </div>
                    </div>

                    <div className={styles.heroVisual}>
                        <div className={styles.codeDemo}>
                            <div className={styles.demoHeader}>
                                <div className={styles.demoControls}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                {/* <div className={styles.demoTitle}>my_items.yml</div> */}
                            </div>
                            <div className={styles.demoBody}>
                                <CodeBlock language="yaml">
                                    {`MyFirstSword:
  item:
    material: DIAMOND_SWORD
    name: "<gradient:red:orange>我的第一把剑</gradient>"
    actions:
      onRight: |-
        fireball = player.getWorld().spawn(player.getEyeLocation(), org.bukkit.entity.Fireball.class)
        fireball.setShooter(player)
`
                                    }
                                </CodeBlock>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function PricingSection() {
    const features = {
        free: [
            { text: "开源代码", included: "partial", note: "落后于最新版" },
            { text: "插件下载", included: "partial", note: "需自行构建" },
            { text: "功能文档", included: true },
            { text: "案例资源", included: "partial", note: "社区提供" },
            { text: "优先处理", included: false },
            { text: "问题解答", included: "partial", note: "Github Issues" },
            { text: "技术支持", included: false },
            { text: "插件兼容", included: true }
        ],
        pro: [
            { text: "完整最新代码", included: true },
            { text: "插件直接下载", included: true },
            { text: "功能文档", included: true },
            { text: "丰富案例资源", included: true },
            { text: "问题优先处理", included: true },
            { text: "直接问题解答", included: true },
            { text: "专业技术支持", included: true },
            { text: "插件兼容保障", included: true }
        ]
    };

    return (
        <section className={styles.pricing}>
            <div className="container">
                <div className={styles.pricingHeader}>
                    <span className={styles.pricingBadge}>定价方案</span>
                    <h2 className={styles.pricingTitle}>选择合适的方案</h2>
                    <p className={styles.pricingSubtitle}>
                        无论是个人学习还是商业项目，我们都有合适的解决方案
                    </p>
                </div>

                <div className={styles.priceNote}>
                    <p>💡 <strong>限时优惠：</strong>正式发售前享受特价，具体价格以作者实际报价为准</p>
                </div>

                <div className={styles.pricingContainer}>
                    {/* Free Plan */}
                    <div className={styles.pricingPlan}>
                        <div className={styles.planHeader}>
                            <h3 className={styles.planTitle}>社区版</h3>
                            <div className={styles.planPrice}>
                                <span className={styles.price}>免费</span>
                            </div>
                            <p className={styles.planDesc}>开源版本，适合个人学习使用</p>
                        </div>

                        <ul className={styles.featureList}>
                            {features.free.map((feature, index) => (
                                <li key={index} className={styles.feature}>
                                    <span className={`${styles.featureIcon} ${feature.included === true ? styles.included :
                                        feature.included === 'partial' ? styles.partial :
                                            styles.notIncluded
                                        }`}>
                                        {feature.included === true ? '✓' :
                                            feature.included === 'partial' ? '~' : '✗'}
                                    </span>
                                    <span className={styles.featureText}>
                                        {feature.text}
                                        {feature.note && <span className={styles.featureNote}>({feature.note})</span>}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        <Link className={`${styles.planButton} ${styles.secondaryButton}`}
                            to="https://github.com/TheFloodDragon/Ratziel-Beta">
                            查看开源库
                        </Link>
                    </div>

                    {/* Pro Plan */}
                    <div className={`${styles.pricingPlan} ${styles.featured}`}>
                        <div className={styles.popularBadge}>推荐方案</div>
                        <div className={styles.planHeader}>
                            <h3 className={styles.planTitle}>专业版</h3>
                            <div className={styles.planPrice}>
                                <span className={styles.currency}>￥</span>
                                <span className={styles.price}>128</span>
                                <span className={styles.originalPrice}>原价 ￥168</span>
                            </div>
                            <p className={styles.planDesc}>售后服务，包你从入门到入土</p>
                        </div>

                        <ul className={styles.featureList}>
                            {features.pro.map((feature, index) => (
                                <li key={index} className={styles.feature}>
                                    <span className={`${styles.featureIcon} ${styles.included}`}>✓</span>
                                    <span className={styles.featureText}>{feature.text}</span>
                                </li>
                            ))}
                        </ul>

                        <Link className={`${styles.planButton} ${styles.primaryButton}`}
                            to="https://qm.qq.com/q/ZyeXCHare">
                            立即购买
                        </Link>

                        <div className={styles.contactInfo}>
                            <p>作者QQ: <strong>1610105206</strong></p>
                        </div>
                    </div>
                </div>

                <div className={styles.pricingFooter}>
                    <div className={styles.guarantee}>
                        <p>✨ 质量保证 · 💻 保持更新 · 🛠️ 技术支持</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function Home() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <Layout title={siteConfig.customFields.titlePrefix} description={siteConfig.tagline}>
            <main className={styles.homepage}>
                <HeroSection />
                <PricingSection />
            </main>
        </Layout>
    );
}