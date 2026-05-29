// ============================================================
// PORTFOLIO DATA — Single source of truth
// Extracted from Elmostafa Mohamed Abdelaal's CV
// Update this file to update the entire site
// ============================================================

export const person = {
  name: "Elmostafa Mohamed",
  surname: "Abdelaal",
  title: "Computer Engineering Student",
  tagline: "Cybersecurity Researcher · Full-Stack Developer · Red Team Operator",
  email: "elmostafaabdelaal@gmail.com",
  phone: "+200 102 621 3205",
  location: "Egypt",
  linkedin: "https://linkedin.com/in/elmustafamohamad",
  github: "https://github.com/e1mostafa",
  objective:
    "Motivated Computer Engineering student with a strong background in cybersecurity, embedded systems, and software development. Seeking internship and entry-level opportunities to apply technical skills and contribute to impactful solutions.",
};

// ——— Education ———
export const education = [
  {
    degree: "Bachelor of Science in Computer Engineering",
    institution: "King Salman International University",
    location: "Egypt",
    period: "Expected June 2027",
    icon: "🎓",
  },
];

// ——— Skills ———
export const skillCategories = [
  {
    label: "Languages",
    color: "#00ff88",
    items: ["C++", "Python", "Java", "MATLAB", "C#", "VB.NET", "JavaScript"],
  },
  {
    label: "Security",
    color: "#ff2d78",
    items: ["Kali Linux", "Burp Suite", "SQLMap", "Nmap", "Metasploit", "Ghidra", "OWASP", "MITRE ATT&CK"],
  },
  {
    label: "Cloud & Infra",
    color: "#00d4ff",
    items: ["AWS", "Linux", "Git", "GitHub", "MySQL", "SQL Server", "Oracle"],
  },
  {
    label: "Web & Frameworks",
    color: "#a855f7",
    items: ["ASP.NET MVC", ".NET Core", "HTML", "CSS", "Bootstrap", "Entity Framework"],
  },
  {
    label: "Concepts",
    color: "#ffd700",
    items: ["Penetration Testing", "Red Team Ops", "Machine Learning", "System Analysis", "MVC", "Microservices"],
  },
];

// ——— Experience ———
export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  companyShort: string;
  location: string;
  period: string;
  type: "intern" | "training" | "part-time";
  color: string;
  bullets: string[];
}

export const experience: ExperienceItem[] = [
  {
    id: "itsolera",
    title: "Red Team Intern",
    company: "ITSOLERA PVT LTD",
    companyShort: "ITSOLERA",
    location: "Remote",
    period: "Jan 2026 – Apr 2026",
    type: "intern",
    color: "#ff2d78",
    bullets: [
      "Built a custom Payload Generator in Python to automate offensive payload creation for red team engagements and penetration testing scenarios.",
      "Developed a Reconnaissance Automation Tool in Python for streamlined information gathering, target enumeration, and OSINT collection.",
      "Conducted CVE Exploit Research & Development — analyzed publicly disclosed vulnerabilities and crafted custom exploits for lab environments.",
      "Performed web application security assessments using Burp Suite to intercept, analyze, and manipulate HTTP traffic for vulnerability identification.",
      "Collaborated within a red team structure simulating adversary TTPs aligned with the MITRE ATT&CK framework.",
    ],
  },
  {
    id: "depi-pentest",
    title: "Penetration Testing Intern",
    company: "Digital Egypt Pioneers Initiative (DEPI) — Global Knowledge",
    companyShort: "DEPI / Global Knowledge",
    location: "Remote",
    period: "Dec 2025 – Present",
    type: "intern",
    color: "#00ff88",
    bullets: [
      "Performed Web Application Penetration Testing targeting OWASP Top 10 vulnerabilities including SQL Injection, XSS, and authentication flaws using Burp Suite and SQLMap.",
      "Conducted Network Penetration Testing including host discovery, port scanning, service enumeration, and exploitation using Nmap and Metasploit.",
      "Executed Mobile Application Security assessments on Android/iOS platforms, testing for insecure storage, weak authentication, and improper session handling.",
      "Simulated real-world attack scenarios across lab environments using Kali Linux as the primary offensive security platform.",
    ],
  },
  {
    id: "dotnet",
    title: ".NET Full Stack Development Training",
    company: "Rowad Misr Digital Pioneers Initiative",
    companyShort: "Rowad Misr",
    location: "Egypt",
    period: "6 Months",
    type: "training",
    color: "#00d4ff",
    bullets: [
      "Developed applications using C#, ASP.NET MVC, and .NET Core for enterprise-grade web platforms.",
      "Built responsive front-end interfaces with HTML, CSS, JavaScript, and Bootstrap.",
      "Implemented database solutions using SQL Server and Entity Framework ORM.",
      "Designed and developed multi-layered architectures (Presentation, Business Logic, Data Access Layers).",
      "Practiced version control using Git and GitHub for collaborative development.",
    ],
  },
  {
    id: "aws",
    title: "AWS Cloud Services Management & Operations",
    company: "(DEY) — Creativa",
    companyShort: "DEY / Creativa",
    location: "Egypt",
    period: "2024",
    type: "training",
    color: "#ffd700",
    bullets: [
      "Gained hands-on experience with AWS Cloud Foundations, Core Services, Security, and Architecting.",
      "Designed and deployed cost-efficient, fault-tolerant, and scalable distributed systems on AWS.",
      "Implemented cloud monitoring, high availability, elasticity, and disaster recovery strategies.",
      "Practiced architecture automation, microservices, and serverless solutions across multiple roles.",
    ],
  },
  {
    id: "nti",
    title: "Cybersecurity Intern",
    company: "National Telecommunications Institute (NTI)",
    companyShort: "NTI",
    location: "Minya, Egypt",
    period: "Sep 2024 – Nov 2024",
    type: "intern",
    color: "#a855f7",
    bullets: [
      "Participated in hands-on cybersecurity and telecom labs at NTI's facility.",
      "Collaborated in technical challenges to simulate real-world security scenarios.",
      "Strengthened communication and technical problem-solving skills in a professional environment.",
    ],
  },
];

// ——— Projects ———
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  color: string;
  category: "security" | "web" | "ml" | "systems" | "open-source";
  github?: string;
  featured: boolean;
  metrics?: string;
}

export const projects: Project[] = [
  {
    id: "payload-gen",
    title: "Payload Generator",
    description: "Automated offensive payload creation engine for red team engagements and penetration testing.",
    longDescription:
      "Custom Python tool built during ITSOLERA red team internship. Automates the creation of diverse offensive payloads targeting different vulnerability classes. Integrates with Metasploit and common C2 frameworks.",
    tech: ["Python", "Metasploit", "Shell", "MITRE ATT&CK"],
    color: "#ff2d78",
    category: "security",
    featured: true,
    metrics: "Reduced payload generation time by 80%",
  },
  {
    id: "recon-tool",
    title: "Reconnaissance Automation Tool",
    description: "OSINT & target enumeration pipeline that streamlines the recon phase of offensive operations.",
    longDescription:
      "Python-based automation tool that combines multiple OSINT sources and active enumeration techniques. Performs subdomain discovery, port scanning integration, and generates structured target reports.",
    tech: ["Python", "Nmap", "OSINT", "Shodan API"],
    color: "#ff2d78",
    category: "security",
    featured: true,
    metrics: "Aggregates 10+ recon sources",
  },
  {
    id: "image-classification",
    title: "Image Classification ML Pipeline",
    description: "End-to-end machine learning pipeline comparing Logistic Regression, Random Forest, and SVM classifiers.",
    longDescription:
      "Built a complete ML pipeline for image-based classification covering data preprocessing, feature extraction, model training, and evaluation. Compared three models and achieved best results with SVM.",
    tech: ["Python", "scikit-learn", "NumPy", "Matplotlib"],
    color: "#00d4ff",
    category: "ml",
    github: "https://github.com/e1mostafa/Image-Classification-with-Machine-Learning",
    featured: true,
    metrics: "3 model comparison with accuracy metrics",
  },
  {
    id: "techxpress",
    title: "TechXpress E-Commerce Platform",
    description: "Full-stack e-commerce platform with product listings, cart management, and authentication.",
    longDescription:
      "Designed and developed a production-ready e-commerce platform using ASP.NET MVC. Features include product catalog, shopping cart, user authentication, order management, and admin panel.",
    tech: ["ASP.NET MVC", ".NET Core", "SQL Server", "Entity Framework", "Bootstrap"],
    color: "#00ff88",
    category: "web",
    github: "https://github.com/Marwan-Farouk/TechXpress-Project",
    featured: true,
    metrics: "Full-stack enterprise application",
  },
  {
    id: "slm",
    title: "SLM — Sales & Inventory Management",
    description: "Desktop application for sales and inventory management with relational database backend.",
    longDescription:
      "VB.NET desktop application with SQL Server backend. Features product tracking, sales records, inventory updates, and comprehensive reporting. Designed relational schema for efficient data management.",
    tech: ["VB.NET", "SQL Server", "Windows Forms"],
    color: "#a855f7",
    category: "systems",
    github: "https://github.com/e1mostafa/SLM-accounting",
    featured: false,
    metrics: "Full CRUD with reporting",
  },
  {
    id: "bank-system",
    title: "Bank Management System",
    description: "Core banking operations and account authentication built with OOP principles.",
    longDescription:
      "C++ application implementing core banking operations using OOP principles and file handling. Features account creation, deposits, withdrawals, transfers, and secure authentication.",
    tech: ["C++", "OOP", "File I/O"],
    color: "#ffd700",
    category: "systems",
    featured: false,
    metrics: "Complete CRUD banking ops",
  },
  {
    id: "cutter",
    title: "Cutter — Open Source Contributor",
    description: "Contributed to the leading open-source reverse engineering platform powered by Rizin/Radare2.",
    longDescription:
      "Active contributor to Cutter, a free GUI-based reverse engineering platform. Participated in code reviews, issue tracking, and submitted pull requests. Gained deep knowledge of binary analysis workflows.",
    tech: ["C++", "Qt", "Reverse Engineering", "Rizin"],
    color: "#00d4ff",
    category: "open-source",
    github: "https://github.com/rizinorg/cutter",
    featured: false,
    metrics: "Open source community contributor",
  },
  {
    id: "speech-tool",
    title: "Speech Enhancement Tool",
    description: "Signal processing application to reduce background noise in speech audio.",
    longDescription:
      "MATLAB-based tool applying Wiener filtering and spectral subtraction algorithms to reduce background noise from speech recordings. Validated with SNR improvement metrics.",
    tech: ["MATLAB", "Signal Processing", "DSP"],
    color: "#00ff88",
    category: "systems",
    featured: false,
    metrics: "SNR improvement measurable",
  },
];

// ——— Certifications ———
export const certifications = [
  {
    name: "Cisco CyberOps Associate",
    issuer: "Cisco",
    icon: "🛡️",
    color: "#00ff88",
  },
  {
    name: "AWS Academy Cloud Architect",
    issuer: "Amazon Web Services",
    icon: "☁️",
    color: "#ffd700",
  },
  {
    name: "DPEI .NET Full Stack",
    issuer: "Digital Egypt Pioneers Initiative",
    icon: "⚡",
    color: "#00d4ff",
  },
];

// ——— Stats ———
export const stats = [
  { label: "Projects Built", value: "10+", suffix: "" },
  { label: "Months Red Team", value: "6", suffix: "+" },
  { label: "CVEs Researched", value: "20", suffix: "+" },
  { label: "Certifications", value: "3", suffix: "" },
];
