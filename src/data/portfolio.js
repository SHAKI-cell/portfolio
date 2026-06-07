export const personalInfo = {
  name: "Shakib Khan",
  firstName: "Shakib",
  lastName: "Khan",
  roles: ["Software Developer", "AI Enthusiast", "CS Student", "Problem Solver"],
  email: "shakib73076@gmail.com",
  github: "https://github.com/SHAKI-cell",
  githubUsername: "SHAKI-cell",
  linkedin: "https://www.linkedin.com/in/shakib-khan-644765321/",
  phone: "+91 7307612221",
  resumeUrl: "/resume.pdf",
  about:
    "I'm a passionate Computer Science student with a deep interest in software development, artificial intelligence, and building impactful digital solutions. I specialize in Python, web technologies, and machine learning — constantly pushing boundaries to create innovative applications that solve real-world problems.",
  aboutCards: [
    {
      title: "Developer",
      description:
        "Building robust applications with modern technologies and clean, scalable code architecture.",
      icon: "Code2",
    },
    {
      title: "AI Enthusiast",
      description:
        "Exploring machine learning, deep learning, and intelligent system design for real-world impact.",
      icon: "Brain",
    },
    {
      title: "Problem Solver",
      description:
        "Tackling complex challenges with data structures, algorithms, and analytical thinking.",
      icon: "Lightbulb",
    },
  ],
  objectives:
    "Seeking opportunities to apply my technical skills in a dynamic environment where I can contribute to meaningful projects while continuing to grow as a developer and AI practitioner.",
};

export const skills = [
  {
    category: "Programming Languages",
    icon: "Code2",
    color: "from-cyan-400 to-blue-500",
    items: [
      { name: "Python", level: 92 },
      { name: "JavaScript", level: 85 },
      { name: "C++", level: 78 },
      { name: "Java", level: 72 },
      { name: "TypeScript", level: 68 },
    ],
  },
  {
    category: "Web Development",
    icon: "Globe",
    color: "from-violet-400 to-purple-500",
    items: [
      { name: "React.js", level: 88 },
      { name: "HTML / CSS", level: 95 },
      { name: "Node.js", level: 80 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Next.js", level: 72 },
    ],
  },
  {
    category: "Mobile Development",
    icon: "Smartphone",
    color: "from-emerald-400 to-teal-500",
    items: [
      { name: "React Native", level: 70 },
      { name: "Flutter", level: 65 },
      { name: "Android (Kotlin)", level: 60 },
    ],
  },
  {
    category: "AI & Machine Learning",
    icon: "Brain",
    color: "from-amber-400 to-orange-500",
    items: [
      { name: "TensorFlow", level: 78 },
      { name: "PyTorch", level: 72 },
      { name: "Scikit-learn", level: 85 },
      { name: "Pandas / NumPy", level: 90 },
      { name: "OpenCV", level: 68 },
    ],
  },
  {
    category: "Databases",
    icon: "Database",
    color: "from-rose-400 to-pink-500",
    items: [
      { name: "MongoDB", level: 82 },
      { name: "PostgreSQL", level: 78 },
      { name: "MySQL", level: 80 },
      { name: "Firebase", level: 75 },
    ],
  },
  {
    category: "Tools & Technologies",
    icon: "Wrench",
    color: "from-sky-400 to-indigo-500",
    items: [
      { name: "Git / GitHub", level: 90 },
      { name: "Docker", level: 70 },
      { name: "VS Code", level: 95 },
      { name: "Linux", level: 78 },
      { name: "Figma", level: 65 },
    ],
  },
];

export const projects = [
  {
    id: 1,
    title: "AI Image Recognition System",
    description:
      "Deep learning-based image classification system using CNN architecture with real-time prediction capabilities and a modern web interface for seamless user interaction.",
    tags: ["Python", "TensorFlow", "Flask", "React"],
    category: "ai",
    github: "https://github.com/SHAKI-cell",
    demo: "#",
    featured: true,
  },
  {
    id: 2,
    title: "E-Commerce Dashboard",
    description:
      "Full-stack analytics dashboard for e-commerce platforms with real-time data visualization, inventory management, and intelligent sales forecasting.",
    tags: ["React", "Node.js", "MongoDB", "Chart.js"],
    category: "web",
    github: "https://github.com/SHAKI-cell",
    demo: "#",
    featured: true,
  },
  {
    id: 3,
    title: "Data Analysis Pipeline",
    description:
      "Automated data analysis pipeline for exploratory analysis, visualization, and statistical modeling using advanced Python libraries.",
    tags: ["Python", "Pandas", "Matplotlib", "Jupyter"],
    category: "ai",
    github: "https://github.com/SHAKI-cell",
    demo: "#",
    featured: false,
  },
  {
    id: 4,
    title: "Portfolio Website",
    description:
      "Modern, responsive personal portfolio built with React, Tailwind CSS, and Framer Motion featuring glassmorphism design and premium animations.",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    category: "web",
    github: "https://github.com/SHAKI-cell/portfolio",
    demo: "#",
    featured: true,
  },
  {
    id: 5,
    title: "Mobile Fitness Tracker",
    description:
      "Cross-platform mobile application for tracking workouts, nutrition, and health metrics with personalized AI-powered recommendations.",
    tags: ["React Native", "Firebase", "TensorFlow Lite"],
    category: "mobile",
    github: "https://github.com/SHAKI-cell",
    demo: "#",
    featured: false,
  },
  {
    id: 6,
    title: "DSA Practice Tracker",
    description:
      "Structured platform for practicing data structures and algorithms with progress tracking, streak metrics, and curated problem sets.",
    tags: ["JavaScript", "React", "Node.js", "MongoDB"],
    category: "web",
    github: "https://github.com/SHAKI-cell",
    demo: "#",
    featured: false,
  },
];

export const experience = [
  {
    role: "Software Development Intern",
    company: "Tech Solutions Inc.",
    period: "Jun 2025 – Present",
    description: [
      "Developed and maintained full-stack web applications using React and Node.js serving 10K+ users",
      "Implemented RESTful APIs and integrated third-party services, improving workflow efficiency by 35%",
      "Collaborated with senior developers on AI-powered feature development using Python and TensorFlow",
      "Optimized application performance, reducing page load times by 40% through code-splitting and lazy loading",
    ],
    technologies: ["React", "Node.js", "Python", "AWS"],
  },
  {
    role: "AI Research Assistant",
    company: "University AI Lab",
    period: "Jan 2025 – May 2025",
    description: [
      "Assisted in research on natural language processing and computer vision applications",
      "Built and trained machine learning models for text classification achieving 94% accuracy",
      "Processed and analyzed large datasets (50K+ records) using Python, Pandas, and NumPy",
      "Co-authored research documentation on model performance optimization techniques",
    ],
    technologies: ["Python", "TensorFlow", "NLP", "OpenCV"],
  },
  {
    role: "Freelance Web Developer",
    company: "Self-Employed",
    period: "Aug 2024 – Dec 2024",
    description: [
      "Designed and developed responsive websites for 5+ small businesses and startups",
      "Created custom UI/UX solutions using modern frontend frameworks and design systems",
      "Managed client requirements, sprint planning, and delivered projects on schedule",
    ],
    technologies: ["HTML/CSS", "JavaScript", "React", "WordPress"],
  },
];

export const education = [
  {
    degree: "Bachelor of Technology in Computer Science",
    institution: "University of Engineering & Technology",
    period: "2023 – 2027 (Expected)",
    description:
      "Specializing in Artificial Intelligence and Software Engineering. Maintaining strong academic performance while actively participating in coding competitions, hackathons, and technical communities.",
    highlights: ["CGPA: 8.5 / 10", "Dean's List", "Technical Club Lead"],
  },
  {
    degree: "Higher Secondary Education (XII)",
    institution: "Central Board of Secondary Education",
    period: "2021 – 2023",
    description:
      "Completed with distinction in Science stream with Computer Science as major subject. Actively participated in national-level science and coding olympiads.",
    highlights: ["Score: 92%", "School Topper in CS", "Science Olympiad Winner"],
  },
];

export const certifications = [
  {
    name: "Machine Learning Specialization",
    issuer: "Coursera (Stanford)",
    year: "2025",
  },
  {
    name: "Full Stack Web Development",
    issuer: "Udemy",
    year: "2024",
  },
  {
    name: "Python for Data Science",
    issuer: "IBM (edX)",
    year: "2024",
  },
  {
    name: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    year: "2025",
  },
];

export const achievements = [
  {
    title: "Hackathon Winner",
    description:
      "First place at University Hackathon 2025 — built an AI-powered healthcare solution in 36 hours.",
    icon: "Trophy",
  },
  {
    title: "500+ DSA Problems",
    description:
      "Solved 500+ problems across LeetCode, Codeforces, and HackerRank with consistent ratings.",
    icon: "Target",
  },
  {
    title: "Open Source Contributor",
    description:
      "Active contributor to open-source projects with 50+ meaningful contributions on GitHub.",
    icon: "GitBranch",
  },
  {
    title: "Technical Blog Writer",
    description:
      "Published articles on AI, web development, and software engineering read by 5K+ developers.",
    icon: "PenTool",
  },
];

export const stats = [
  { label: "Projects Completed", value: 15, suffix: "+" },
  { label: "GitHub Repos", value: 25, suffix: "+" },
  { label: "Problems Solved", value: 500, suffix: "+" },
  { label: "Certifications", value: 8, suffix: "" },
];

export const testimonials = [
  {
    name: "Dr. Amit Sharma",
    role: "Professor, AI Department",
    text: "Shakib is one of the most dedicated students I've mentored. His ability to grasp complex AI concepts and apply them in practical projects is truly remarkable.",
  },
  {
    name: "Priya Verma",
    role: "Senior Developer, Tech Solutions",
    text: "Working with Shakib was a great experience. His code quality, attention to detail, and problem-solving skills are exceptional for someone at his level.",
  },
  {
    name: "Rahul Mehta",
    role: "Startup Founder",
    text: "Shakib delivered our website ahead of schedule with outstanding quality. His modern design sense and technical execution truly impressed our entire team.",
  },
];

export const socialLinks = [
  { name: "GitHub", url: "https://github.com/SHAKI-cell", icon: "Github" },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/shakib-khan-644765321/",
    icon: "Linkedin",
  },
  { name: "Email", url: "mailto:shakib73076@gmail.com", icon: "Mail" },
  { name: "Phone", url: "tel:+917307612221", icon: "Phone" },
];

export const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Achievements", href: "#achievements" },
  { name: "Contact", href: "#contact" },
];
