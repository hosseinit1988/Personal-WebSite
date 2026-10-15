import { NewsArticle } from '../types';

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'dns-tunneling-dnstt-benchmark',
    title: {
      fa: 'بررسی جامع عملکرد پروتکل DNSTT و تکنیک‌های نوین تونلینگ مبتنی بر DNS در شبکه‌های با نویز بالا',
      en: 'In-Depth Evaluation of DNSTT Protocol and Modern DNS-Based Tunneling in High-Interference Networks'
    },
    summary: {
      fa: 'بررسی فنی نحوه کپسوله‌سازی ترافیک در رکوردهای DNS، مقایسه پروتکل DoH با DoT و تاثیر تنظیم کش لینوکس در بهبود تاخیر شبکه.',
      en: 'Technical analysis of packet encapsulation inside DNS records, comparing DoH vs DoT, and Linux resolver cache tuning for reduced jitter.'
    },
    content: {
      fa: `پروتکل DNSTT یکی از پیشرفته‌ترین متدهای انتقال امن داده بر بستر پروتکل DNS است که امکان عبور پکت‌های رمزگذاری شده را از میان سخت‌گیرانه‌ترین فایروال‌ها و فیلترهای لایه ۷ فراهم می‌آورد.

در این مقاله به بررسی عمیق معماری داخلی این پروتکل پرداخته و نتایج بنچمارک‌های میدانی را بررسی می‌کنیم:

۱. نحوه عملکرد کپسوله‌سازی (Encapsulation):
در DNSTT، داده‌ها با الگوریتم‌های مدرن رمزنگاری متقارن بسته شده و در قالب رکوردهای متنی TXT یا NULL از طریق درخواست‌های بازگشتی (Recursive Resolvers) به سمت سرور مجاز (Authoritative Nameserver) هدایت می‌شوند. از آنجا که تمام درخواست‌ها از طریق سرورهای رسمی مانند Cloudflare (1.1.1.1) یا Google (8.8.8.8) عبور می‌کنند، شناسایی و مسدودسازی آن بدون قطع دسترسی کل اینترنت تقریبا ناممکن است.

۲. تحلیل تاخیر (Latency) و بهینه‌سازی بافرها:
به دلیل ساختار پیام‌های DNS، اندازه پکت‌های ارسالی با محدودیت‌های اندازه MTU روبرو است. برای بهینه‌سازی، تنظیم پارامترهای کرنل لینوکس الزامی است:
- net.core.rmem_max = 67108864
- net.core.wmem_max = 67108864
- net.ipv4.tcp_congestion_control = bbr

۳. نتیجه‌گیری تجربی:
با استفاده از اسکریپت خودکار easy-dnstt-tunnel، اتصال پایدار با پینگ میانگین ۱۸۰ الی ۲۴۰ میلی‌ثانیه حتی در زمان اختلالات گسترده حفظ می‌گردد.`,
      en: `DNSTT (DNS Tunnel) is an advanced transmission protocol that encapsulates encrypted payloads within standard DNS queries, bypassing deep packet inspection filters.

In this deep dive, we explore its architectural mechanics and real-world latency benchmarks:

1. Protocol Encapsulation Mechanics:
Data frames are compressed and encrypted, then mapped into standard DNS TXT or NULL records. Because these queries traverse authoritative resolvers such as Cloudflare (1.1.1.1) and Google (8.8.8.8), identifying them independently from regular internet browsing is exceptionally challenging.

2. Latency Optimization & Buffer Tuning:
Due to DNS payload constraints, kernel socket memory configuration is vital for continuous packet streams:
- net.core.rmem_max = 67108864
- net.core.wmem_max = 67108864
- net.ipv4.tcp_congestion_control = bbr

3. Real-World Findings:
Using automated deployment tooling like easy-dnstt-tunnel, a resilient connection with stable 180-240ms round-trip latency can be maintained under severe network throttling conditions.`
    },
    category: 'network',
    dateShamsi: '۲۴ مهر ۱۴۰۳',
    dateGregorian: 'Oct 15, 2024',
    readTime: '۶ دقیقه',
    author: {
      fa: 'حسین شورگشتی',
      en: 'Hossein Shorgooshti'
    },
    tags: ['DNS', 'DNSTT', 'Tunneling', 'Networking', 'BBR'],
    views: 1840,
    likes: 124,
    featured: true
  },
  {
    id: 'linux-kernel-6-12-ebpf-networking',
    title: {
      fa: 'کالبدشکافی کرنل لینوکس ۶.۱۲: انقلاب eBPF، ارتقای TCP BBRv3 و بهینه‌سازی سرورهای ابری',
      en: 'Linux Kernel 6.12 Deep Dive: eBPF Revolution, TCP BBRv3 Enhancements and Cloud Virtualization'
    },
    summary: {
      fa: 'بررسی قابلیت‌های جدید زمان‌بندی هسته لینوکس، مکانیزم‌های پکت‌فیلترینگ بدون سربار پردازنده و ارتقای عملکرد کانتینرها.',
      en: 'Exploring Linux kernel sched_ext scheduling mechanisms, zero-overhead packet filtering with eBPF, and container throughput metrics.'
    },
    content: {
      fa: `کرنل لینوکس نسخه ۶.۱۲ با تمرکز بر پردازش همزمان با کارایی فوق‌العاده و زمان‌بندی قابل برنامه‌ریزی به مرحله انتشار رسیده است.

ویژگی‌های کلیدی برای مدیران سرور و متخصصان DevOps:

۱. فریم‌ورک sched_ext (زمان‌بندی ماژولار با eBPF):
برای اولین بار در تاریخ هسته لینوکس، ادمین‌ها می‌توانند بدون کامپایل مجدد هسته، الگوریتم‌های اختصاصی زمان‌بندی CPU را بر اساس سناریوهای اختصاصی گیمینگ، سرورهای وب یا دیتابیس بارگذاری کنند.

۲. پیشرفت‌های چشمگیر در زیرسیستم شبکه:
- بهبود کارایی بافرهای حلقوی XDP (eXpress Data Path)
- کاهش چشمگیر Latency در ارسال پکت‌های UDP
- هماهنگی بهتر با پروتکل‌های سوکت AF_XDP

۳. توصیه‌های پیکربندی برای اوبونتو و دبیان:
استفاده از الگوریتم FQ_CoDel به عنوان qdisc پیش‌فرض به همراه BBR کارایی سرورها را در بارهای سنگین تا ۳۵٪ ارتقا می‌دهد.`,
      en: `Linux kernel 6.12 marks a monumental milestone with the arrival of user-space programmable scheduling and massive packet routing acceleration.

Key highlights for DevOps and infrastructure engineers:

1. sched_ext Extensible Scheduler:
Admins can now dynamically load specialized CPU scheduling policies using eBPF programs at runtime without patching kernel sources, dramatically improving database lock contention and throughput.

2. Network Subsystem Evolution:
- Higher throughput on eXpress Data Path (XDP) ring buffers
- Substantial latency drops on UDP socket pipelines
- Enhanced zero-copy performance on AF_XDP sockets

3. Sysadmin Production Recommendation:
Pairing FQ_CoDel queueing discipline with TCP BBR elevates throughput under heavy traffic spikes by up to 35%.`
    },
    category: 'linux',
    dateShamsi: '۲۱ مهر ۱۴۰۳',
    dateGregorian: 'Oct 12, 2024',
    readTime: '۸ دقیقه',
    author: {
      fa: 'حسین شورگشتی',
      en: 'Hossein Shorgooshti'
    },
    tags: ['Linux', 'Kernel', 'eBPF', 'DevOps', 'BBRv3'],
    views: 2450,
    likes: 189,
    featured: true
  },
  {
    id: 'zero-trust-reverse-tunnels-go',
    title: {
      fa: 'پیاده‌سازی معماری Zero-Trust با تونل‌های معکوس در زبان Go: خداحافظی با پورت‌های باز سرور',
      en: 'Zero-Trust Architecture via Reverse Tunnels in Golang: Eliminating Inbound Firewall Open Ports'
    },
    summary: {
      fa: 'چگونه با استفاده از Go Concurrency و مالتی‌پلکسینگ، سرورهای محلی را بدون نیاز به IP پابلیک به دروازه‌های جهانی متصل کنیم.',
      en: 'How to leverage Go Concurrency and stream multiplexing to link private origin instances to global edge gateways without public IPs.'
    },
    content: {
      fa: `یکی از بزرگ‌ترین تهدیدات امنیتی در دیتاسنترها، باز بودن پورت‌های مستقیم SSH، دیتابیس یا پنل‌های مدیریت است. با معماری Zero-Trust و تونل‌های معکوس، هیچ پورت ورودی بر روی سرورهای داخلی باز نمی‌ماند.

۱. چالش‌های معماری سنتی:
باز کردن پورت‌های اینترنت روی سرورها منجر به حملات مداوم Brute-force، اسکنرهای آسیب‌پذیری و حملات DDoS لایه انتقال می‌گردد.

۲. راه‌حل پروژه BackPack:
در این پروژه، کلاینت داخلی از پشت NAT یک اتصال خروجی پایدار و رمزگذاری شده با الگوریتم ChaCha20-Poly1305 به سرور Edge برقرار می‌کند. تمامی درخواست‌های ورودی کاربران ابتدا در لبه شبکه ارزیابی و فیلتر شده، سپس از طریق کانکشن معکوس موجود به سرویس‌های داخلی ارسال می‌گردد.

۳. نتایج تست در محیط واقعی:
- بدون نیاز به IP استاتیک یا تغییر در تنظیمات روتر
- مقاومت ۱۰۰٪ در برابر اسکنرهای پورت عمومی
- پشتیبانی از هزاران سوکت موازی با کمترین تاخیر افزوده`,
      en: `Directly opening management ports (SSH, database, admin panels) on public IPs remains one of the largest attack vectors. Zero-Trust reverse tunneling solves this by keeping all inbound ports closed.

1. The Vulnerability of Public Inbound Ports:
Exposing service ports invites automated botnet scans, zero-day exploit probes, and Layer 4 volume saturation attacks.

2. The Architecture Behind BackPack:
Our Go engine initiates an outbound encrypted TCP connection from behind NAT to an edge node. Public clients hit the edge node, which proxies traffic down the established authenticated tunnel.

3. Production Metrics:
- Zero public IP requirements on origin infrastructure
- 100% immunity against automated port scanners
- Near-instant multiplexing with negligible latency overhead.`
    },
    category: 'security',
    dateShamsi: '۱۷ مهر ۱۴۰۳',
    dateGregorian: 'Oct 08, 2024',
    readTime: '۵ دقیقه',
    author: {
      fa: 'حسین شورگشتی',
      en: 'Hossein Shorgooshti'
    },
    tags: ['Go', 'Security', 'Zero-Trust', 'Reverse Proxy', 'Firewall'],
    views: 1620,
    likes: 110,
    featured: false
  },
  {
    id: 'ubuntu-mirror-optimization-iran',
    title: {
      fa: 'راهنمای بهینه‌سازی و حل مشکل دانلود پکیج‌های لینوکس در سرورهای مستقر در دیتاسنترهای داخلی',
      en: 'Optimizing Ubuntu Package Repositories and Mirror Speed in Local Cloud Datacenters'
    },
    summary: {
      fa: 'بررسی علل خطاهای APT، روش‌های تست تاخیر میرورهای دانشگاهی و راه‌اندازی کش پکیج‌ها با اسکریپت Ubuntu-Repository-iran.',
      en: 'Diagnosing APT timeout errors, automated latency probing of regional mirrors, and local caching strategies.'
    },
    content: {
      fa: `یکی از دغدغه‌های همیشگی توسعه‌دهندگان و متخصصان سیستم، سرعت پایین دانلود پکیج‌ها، انقضای تایم‌اوت در حین اجرای دستور apt-get update و خطاهای مربوط به عدم تطابق هش در سرورهاست.

در ابزار Ubuntu-Repository-iran مراحل زیر به صورت خودکار انجام می‌پذیرد:
۱. بک‌آپ کامل از فایل /etc/apt/sources.list
۲. دریافت هد بسته‌ها از بیش از ۶ میرور رسمی دانشگاهی و سازمانی
۳. محاسبه میانگین سرعت دانلود بر حسب کیلوبایت بر ثانیه
۴. جایگزینی مطمئن سریع‌ترین میرور بدون ایجاد اختلال در دسترسی به مخازن امنیتی (Security Repos)
۵. حل خطاهای کلید GPG با وارد کردن خودکار کلیدهای رسمی کانونیکال

با این ابزار زمان بیلد ایمیج‌های داکر و آپدیت‌های سیستمی تا ۷۰ درصد کاهش می‌یابد.`,
      en: `High network latency and frequent timeouts during apt-get update can severely impact automated CI/CD pipelines and DevOps workflows in regional datacenters.

The Ubuntu-Repository-iran utility automates the resolution:
1. Creates safe backups of /etc/apt/sources.list
2. Probes package release headers across all regional certified mirrors
3. Computes deterministic transfer rates
4. Replaces sources while safeguarding vital Ubuntu security repository routes
5. Automatically renews missing Canonical GPG keyring records

Build times for Docker containers and server provisioning drops by up to 70%.`
    },
    category: 'cloud',
    dateShamsi: '۱۲ مهر ۱۴۰۳',
    dateGregorian: 'Oct 03, 2024',
    readTime: '۴ دقیقه',
    author: {
      fa: 'حسین شورگشتی',
      en: 'Hossein Shorgooshti'
    },
    tags: ['Ubuntu', 'APT', 'DevOps', 'SysAdmin', 'Cloud'],
    views: 1390,
    likes: 95,
    featured: false
  },
  {
    id: 'dns-security-dot-doh-doq-comparison',
    title: {
      fa: 'مقایسه جامع استانداردهای امنیت نام دامنه: DoT در برابر DoH و ظهور فناوری نوین DoQ',
      en: 'Comprehensive Benchmark of DNS Security Standards: DoT vs DoH and the Rise of DoQ'
    },
    summary: {
      fa: 'تحلیل رمزنگاری، پورتهای استاندارد ۸۵۳ و ۴۴۳، محافظت در برابر جعل DNS و شیوه پیکربندی Systemd-Resolved.',
      en: 'Deep cryptographic comparison, port 853 vs 443 inspection resilience, and native systemd-resolved configuration.'
    },
    content: {
      fa: `پروتکل سنتی DNS پکت‌های خود را به صورت متن خام بر بستر پورت ۵۳ ارسال می‌کند که زمینه انواع حملات جعل DNS Spoofing و شنود ترافیک را فراهم می‌آورد.

در این مقاله مقایسه تحلیلی پروتکل‌های امنیتی ارائه شده است:
- DNS over TLS (DoT): اجرا روی پورت ۸۵۳، رمزنگاری کامل نشست، کمترین سربار پردازشی، ایده‌آل برای سرویس‌های سیستمی لینوکس.
- DNS over HTTPS (DoH): اجرا روی پورت ۴۴۳ همراه با سایر ترافیک‌های وب، غیرقابل تشخیص از وب‌گردی معمولی اما دارای سربار لایه HTTP.
- DNS over QUIC (DoQ): جدیدترین نسل مبتنی بر UDP و پروتکل QUIC، بدون مشکل مسدودسازی سر خط (Head-of-Line Blocking) و اتصال فوری با 0-RTT.

ابزار DNS-Master-Pro امکان فعال‌سازی ساده DoT را روی انواع سرورهای لینوکسی با یک دستور فراهم می‌کند.`,
      en: `Traditional plaintext DNS queries over UDP port 53 expose systems to cache poisoning, eavesdropping, and man-in-the-middle tampering.

Here is an architectural comparison of modern encrypted DNS standards:
- DNS over TLS (DoT): Dedicated port 853, lightweight TLS handshake, minimal protocol overhead, optimal for Linux system resolvers.
- DNS over HTTPS (DoH): Standard port 443, blends with ordinary web browsing traffic, but incurs HTTP framing overhead.
- DNS over QUIC (DoQ): Cutting-edge UDP-based QUIC protocol, eliminates head-of-line blocking with 0-RTT instant session resumption.

The DNS-Master-Pro utility automates configuring secure DoT with certified upstream resolvers.`
    },
    category: 'security',
    dateShamsi: '۰۸ مهر ۱۴۰۳',
    dateGregorian: 'Sep 29, 2024',
    readTime: '۷ دقیقه',
    author: {
      fa: 'حسین شورگشتی',
      en: 'Hossein Shorgooshti'
    },
    tags: ['DNS', 'Security', 'DoT', 'DoH', 'Encryption'],
    views: 1910,
    likes: 142,
    featured: false
  }
];
