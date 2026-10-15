import { Project, SkillCategory } from '../types';

export const PERSONAL_INFO = {
  name: {
    fa: 'حسین شورگشتی',
    en: 'Hossein Shorgooshti'
  },
  title: {
    fa: 'مهندس دوآپس، معمار زیرساخت شبکه و لینوکس',
    en: 'Senior Linux DevOps & Network Infrastructure Engineer'
  },
  shortBio: {
    fa: 'بیش از ۸ سال تجربه در مدیریت سرورهای لینوکس، اتوماسیون DevOps، پروتکل‌های امن شبکه، تونلینگ ترافیک (DNS/ICMP/WebSocket) و زیرساخت‌های ابری پایدار.',
    en: 'Over 8+ years specializing in Linux system administration, DevOps automation, network protocols, traffic tunneling (DNS/ICMP/WebSocket), and resilient cloud infrastructures.'
  },
  githubUsername: 'hosseinit1988',
  githubUrl: 'https://github.com/hosseinit1988',
  email: 'h.shorgeshti2021@gmail.com',
  telegram: 'https://t.me/hosseinit1988',
  location: {
    fa: 'ایران',
    en: 'Iran'
  },
  stats: {
    experienceYears: '8+',
    openSourceProjects: '24+',
    supportedDNSProviders: '30+',
    serverUptimeTrack: '99.98%'
  }
};

export const PROJECTS_DATA: Project[] = [
  {
    id: 'easy-dnstt-tunnel',
    title: {
      fa: 'easy-dnstt-tunnel (اتوماسیون تونل DNS)',
      en: 'easy-dnstt-tunnel (Automated DNSTT)'
    },
    description: {
      fa: 'راه‌اندازی خودکار تونل فوق سریع DNSTT به همراه پنل 3x-ui روی دبیان و اوبونتو با پشتیبانی از VLESS، TLS و وب‌سوکت.',
      en: 'Automated ultra-fast DNSTT DNS Tunnel + 3x-ui setup for Ubuntu/Debian supporting VLESS, TLS, WebSocket, and Let\'s Encrypt.'
    },
    fullDetails: {
      fa: 'یک اسکریپت جامع و خودکار برای پیکربندی بدون دردسر تونل DNSTT و پنل مدیریت 3x-ui در توزیع‌های اوبونتو و دبیان. این پروژه کلیه تنظیمات DNS، گواهی SSL از طریق Let\'s Encrypt، رکوردهای NS و A، فایروال iptables و بهینه‌سازی بافرهای شبکه سیستم‌عامل را در چند دقیقه انجام می‌دهد.',
      en: 'A comprehensive Bash automation framework for zero-friction deployment of DNSTT tunnels and 3x-ui management panel on Ubuntu & Debian. Automatically provisions NS/A DNS records, Let\'s Encrypt SSL, iptables firewall hardening, and Linux TCP/UDP kernel buffer optimizations.'
    },
    category: 'network',
    stars: 142,
    forks: 38,
    tags: ['Shell', 'DNSTT', 'DNS Tunnel', '3x-ui', 'Linux', 'VLESS', 'UFW'],
    githubUrl: 'https://github.com/hosseinit1988/easy-dnstt-tunnel',
    badge: 'Featured',
    commandSnippet: 'bash <(curl -fsSL https://raw.githubusercontent.com/hosseinit1988/easy-dnstt-tunnel/main/install.sh)',
    keyFeatures: {
      fa: [
        'نصب و کانفیگ خودکار سرور DNSTT و کلاینت',
        'یکپارچه‌سازی خودکار با پنل 3x-ui',
        'پشتیبانی کامل از ساب‌دامین‌های Cloudflare و DNS Delegation',
        'بهینه‌سازی پارامترهای sysctl هسته لینوکس برای کاهش پکت‌لاس',
        'مدیریت سرویس‌ها با Systemd و راه‌اندازی مجدد خودکار'
      ],
      en: [
        'Automated DNSTT server and client configuration',
        'Native seamless integration with 3x-ui dashboard',
        'Support for Cloudflare DNS delegation & NS records',
        'Linux kernel sysctl tuning to mitigate packet drop',
        'Robust Systemd unit management with auto-restart'
      ]
    },
    architecture: {
      fa: 'ترافیک رمزگذاری شده از طریق رکوردهای DNS TXT/NULL به سمت سرور مقصد کپسوله‌سازی می‌شود و حتی در شرایط اختلال شدید شبکه پایدار می‌ماند.',
      en: 'Encrypted payload is encapsulated within DNS TXT/NULL query records toward the authoritative nameserver, bypassing restrictive deep packet inspection.'
    }
  },
  {
    id: 'dns-master-pro',
    title: {
      fa: 'DNS-Master-Pro (مدیر هوشمند DNS)',
      en: 'DNS-Master-Pro (Advanced DNS Manager)'
    },
    description: {
      fa: 'ابزار جامع مدیریت و بنچمارک بیش از ۳۰ ارائه‌دهنده معتبر DNS، پشتیبانی از DoT و اتصال مستقیم به Systemd-Resolved.',
      en: 'Comprehensive DNS management and latency benchmarking engine supporting 30+ providers, DoT, and native Systemd-Resolved integration.'
    },
    fullDetails: {
      fa: 'ابزار چندمنظوره برای تحلیل پینگ، سرعت پاسخگویی و امنیت رکوردهای DNS. این اسکریپت سریع‌ترین سرور DNS را بر اساس موقعیت مکانی سرور پیدا کرده و فایل‌های resolv.conf و سرویس systemd-resolved را به صورت بهینه بازنویسی می‌کند.',
      en: 'A multi-utility tool designed to benchmark DNS latency, jitter, and security. It systematically probes over 30 leading DNS providers, benchmarks real resolution times, and configures systemd-resolved and resolv.conf dynamically for minimal response latency.'
    },
    category: 'tools',
    stars: 96,
    forks: 22,
    tags: ['DNS', 'Systemd-Resolved', 'DoT', 'Bash', 'Networking', 'Benchmark'],
    githubUrl: 'https://github.com/hosseinit1988/DNS-Master-Pro',
    badge: 'Popular',
    commandSnippet: 'git clone https://github.com/hosseinit1988/DNS-Master-Pro.git && cd DNS-Master-Pro && bash dns.sh',
    keyFeatures: {
      fa: [
        'تست همزمان پینگ و تاخیر بیش از ۳۰ ارائه‌دهنده عمومی و امنیتی',
        'پشتیبانی از DNS over TLS (DoT) جهت جلوگیری از شنود',
        'سازگار با تمام توزیع‌های اوبونتو، دبیان، راکی لینوکس و آلپاین',
        'قابلیت بازگردانی سریع به تنظیمات اولیه بدون خطر قطعی شبکه',
        'خروجی گرافیکی رنگی در خط فرمان ترمینال'
      ],
      en: [
        'Simultaneous latency & jitter probe for 30+ top DNS providers',
        'Native DNS over TLS (DoT) hardening to eliminate spoofing',
        'Compatible with Ubuntu, Debian, Rocky Linux, and Alpine',
        'Instant rollback safety mechanism to protect server connectivity',
        'Color-coded terminal interactive visual feedback'
      ]
    },
    architecture: {
      fa: 'تست‌های موازی با ابزار dig و drill به تفکیک پاسخ‌دهی میلی‌ثانیه‌ای، محاسبه میانگین تاخیر و اعمال فوری روی بافر کش سیستم‌عامل.',
      en: 'Asynchronous parallel query testing using dig/drill, jitter calculation, and direct non-blocking cache injection into OS resolver daemon.'
    }
  },
  {
    id: 'ubuntu-repository-iran',
    title: {
      fa: 'Ubuntu-Repository-iran (بهینه‌ساز مخازن)',
      en: 'Ubuntu-Repository-iran (Mirror Optimizer)'
    },
    description: {
      fa: 'تنظیم و انتخاب خودکار سریع‌ترین میرورهای رسمی مخازن اوبونتو برای سرورهای داخل کشور با قابلیت بک‌آپ‌گیری.',
      en: 'Automated speed-test and configuration of the fastest Ubuntu official package repository mirrors optimized for Iran datacenter servers.'
    },
    fullDetails: {
      fa: 'برای ادمین‌های سرور و توسعه‌دهندگان، دانلود بسته‌ها و آپدیت‌های apt در سرورهای با پهنای باند محدود چالش‌برانگیز است. این ابزار سرعت تمام میرورهای داخلی و دانشگاهی را سنجیده و سریع‌ترین منبع را با امکان بازگردانی در sources.list جایگزین می‌کند.',
      en: 'Essential utility for DevOps engineers running servers in domestic infrastructure. It benchmarks all official Iranian university and ISP mirrors, auto-configures sources.list for max download speeds, and creates automatic timestamped backups.'
    },
    category: 'devops',
    stars: 88,
    forks: 19,
    tags: ['Ubuntu', 'APT', 'DevOps', 'Mirror', 'Linux Admin', 'Bash'],
    githubUrl: 'https://github.com/hosseinit1988/Ubuntu-Repository-iran',
    commandSnippet: 'curl -sSL https://raw.githubusercontent.com/hosseinit1988/Ubuntu-Repository-iran/main/mirror.sh | sudo bash',
    keyFeatures: {
      fa: [
        'تشخیص هوشمند نسخه اوبونتو (20.04، 22.04، 24.04 LTS)',
        'پشتیبان‌گیری خودکار از sources.list قبل از اعمال تغییرات',
        'تست سرعت دانلود بسته‌ها از میرورهای دانشگاهی و دیتاسنتری',
        'نصب خودکار ابزارهای ضروری سیستم‌عامل (curl, wget, htop, net-tools)',
        'رفع خطاهای رایج GPG Key و هش رپوزیتوری'
      ],
      en: [
        'Intelligent release detection (Ubuntu 20.04, 22.04, 24.04 LTS)',
        'Automated safety backup of sources.list prior to patching',
        'Real-world download speed benchmarking across all mirrors',
        'One-click installation of essential sysadmin tools',
        'Automated GPG key and APT hash mismatch repair'
      ]
    },
    architecture: {
      fa: 'دریافت هد فایل‌های پکیج از میرورهای مختلف، محاسبه نرخ انتقال واقعی و تولید خودکار فایل پیکربندی استاندارد APT.',
      en: 'Parallel HTTP HEAD probing of package indices, bandwidth calculation, and deterministic generation of optimized APT sources configuration.'
    }
  },
  {
    id: 'backpack-tunnel',
    title: {
      fa: 'BackPack (موتور تونل معکوس با زبان Go)',
      en: 'BackPack (High-Performance Reverse Tunnel in Go)'
    },
    description: {
      fa: 'موتور قدرتمند تونلینگ معکوس دوطرفه با زبان Go برای اتصال سرورهای Edge به Origin با کمترین سربار پردازنده.',
      en: 'Ultra-low overhead multiplexed reverse tunnel engine crafted in Golang for high-concurrency Edge ↔ Origin server traffic routing.'
    },
    fullDetails: {
      fa: 'یک نرم‌افزار مهندسی‌شده با ساختار Go Concurrency و Goroutineها که پورت‌ها و سوکت‌های محلی سرورهای پشت NAT را به سرورهای لبه شبکه متصل می‌کند. مجهز به رمزنگاری ChaCha20-Poly1305، فشرده‌سازی بسته‌ها و مکانیسم Keepalive هوشمند.',
      en: 'Engineered with Golang lightweight goroutines and TCP multiplexing to securely bridge NAT-traversed origin nodes with edge public gateways. Includes ChaCha20-Poly1305 encryption, adaptive compression, and low-latency healthcheck pinging.'
    },
    category: 'security',
    stars: 76,
    forks: 14,
    tags: ['Go', 'Tunneling', 'Reverse Proxy', 'Zero-Trust', 'High Concurrency'],
    githubUrl: 'https://github.com/hosseinit1988/BackPack',
    badge: 'High Performance',
    keyFeatures: {
      fa: [
        'سرعت بی‌نظیر با مصرف رم کمتر از ۲۰ مگابایت',
        'پشتیبانی از مالتی‌پلکسینگ کانکشن‌های TCP و UDP',
        'رمزگذاری سطح بالای End-to-End',
        'عدم نیاز به دسترسی Root در سمت کلاینت',
        'اتصال مجدد خودکار در زمان نوسانات اینترنت'
      ],
      en: [
        'Sub-20MB RAM footprint under extreme concurrent throughput',
        'Full multiplexing over single TCP connection for TCP/UDP streams',
        'End-to-End ChaCha20 encryption with authenticated tags',
        'Zero-root privilege execution on user client nodes',
        'Adaptive reconnection algorithm with exponential backoff'
      ]
    },
    architecture: {
      fa: 'معماری Non-blocking IO مبتنی بر Go channelها برای مدیریت هزاران کانکشن همزمان بدون افت فریم و لود بالا.',
      en: 'Non-blocking epoll-driven runtime architecture handling thousands of simultaneous duplex streams with near-zero latency.'
    }
  },
  {
    id: 'x4g-network',
    title: {
      fa: 'X4G (پلتفرم مسیریابی شبکه و تونل پایتون)',
      en: 'X4G (Python High-Performance Network Router)'
    },
    description: {
      fa: 'معماری شبکه توزیع‌شده با پایتون برای مدیریت مسیرهای ترافیکی، پروکسی‌های پیشرفته و تست سلامت خطوط سرور.',
      en: 'Asynchronous Python networking and traffic router designed for robust multi-path proxy balancing and link monitoring.'
    },
    fullDetails: {
      fa: 'پروژه‌ای منعطف با بهره‌گیری از پایتون AsyncIO برای مانیتورینگ سلامت نودها، بالانس ترافیک بین چندین مسیر و راه‌اندازی سریع پروکسی‌های اختصاصی.',
      en: 'A flexible network orchestration engine utilizing Python AsyncIO to monitor node availability, balance heavy payloads across multiple fallback routes, and maintain reliable proxy endpoints.'
    },
    category: 'security',
    stars: 54,
    forks: 11,
    tags: ['Python', 'AsyncIO', 'Network Routing', 'Proxy Engine', 'Linux'],
    githubUrl: 'https://github.com/hosseinit1988/X4G',
    keyFeatures: {
      fa: [
        'معماری AsyncIO برای پردازش جریان‌های غیرهمزمان ترافیک',
        'قابلیت Failover هوشمند در صورت افت سرعت مسیر اصلی',
        'مانیتورینگ زنده‌ی پهنای باند و لتنسی نودها',
        'پیکربندی ساده از طریق فایل JSON یا متغیرهای محیطی'
      ],
      en: [
        'AsyncIO event loop for high-throughput asynchronous packet flows',
        'Intelligent automatic failover during carrier degradation',
        'Real-time link latency and bandwidth metric calculation',
        'Declarative configuration via JSON or environment variables'
      ]
    },
    architecture: {
      fa: 'موتور رویدادمحور با بررسی منظم پاسخ‌دهی سرورها و جابجایی ترافیک به امن‌ترین مسیر فعال.',
      en: 'Event-driven reactor continuously healthchecking uplinks and routing traffic via the highest-integrity path.'
    }
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: {
      fa: 'مدیریت لینوکس و سیستم‌ها',
      en: 'Linux Systems & Kernel Tuning'
    },
    skills: [
      { name: 'Ubuntu / Debian / RHEL', level: 98, icon: 'Server' },
      { name: 'Bash & Shell Scripting', level: 96, icon: 'Terminal' },
      { name: 'Systemd & Service Daemons', level: 95, icon: 'Cpu' },
      { name: 'Kernel Parameters & Sysctl', level: 92, icon: 'Activity' },
      { name: 'IPTables, NFTables, UFW', level: 94, icon: 'ShieldCheck' }
    ]
  },
  {
    title: {
      fa: 'شبکه، پروتکل‌ها و تونلینگ',
      en: 'Networking, Protocols & Tunnels'
    },
    skills: [
      { name: 'DNS, DoT, DoH & DNSTT', level: 98, icon: 'Globe' },
      { name: 'TCP/UDP Tuning & BBR', level: 94, icon: 'Zap' },
      { name: 'WireGuard, VLESS & WebSocket', level: 95, icon: 'Layers' },
      { name: 'Reverse Proxy (Nginx, Caddy)', level: 93, icon: 'Network' },
      { name: 'Cloudflare Edge & WAF Rules', level: 90, icon: 'Cloud' }
    ]
  },
  {
    title: {
      fa: 'زبان‌های برنامه‌نویسی و وب',
      en: 'Programming, Scripting & Web'
    },
    skills: [
      { name: 'Python (AsyncIO, Network)', level: 88, icon: 'Code' },
      { name: 'Golang (Concurrency, Tunnels)', level: 85, icon: 'FileCode' },
      { name: 'PHP & Modern Web Stack', level: 90, icon: 'Globe2' },
      { name: 'SQL & Database Administration', level: 86, icon: 'Database' },
      { name: 'Docker & Containerization', level: 92, icon: 'Box' }
    ]
  }
];
