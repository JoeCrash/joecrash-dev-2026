const navLinks = [
    {
        id: 1, name: "Projects",
        type: "finder",
        locationType: "work",
    },
    {
        id: 3, name: "Contact",
        type: "contact",
    },
    {
        id: 4, name: "Resume",
        type: "resume",
    },
];

const PATHS = {
    contact: "/icons/contact/",
    folders: "/icons/shared/folders/",
    mimetypes: "/icons/mimetypes/",
    nav: "/icons/nav/",
    shared: "/icons/shared/",
    apps: "/icons/apps/",
};
const APP_ICONS = {
    contact: `${PATHS.apps}contact.svg`,
    docker: `${PATHS.apps}docker.svg`,
    figma: `${PATHS.apps}figma.svg`,
    finder: `${PATHS.apps}finder.svg`,
    photos: `${PATHS.apps}photos.svg`,
    postman: `${PATHS.apps}postman.svg`,
    safari: `${PATHS.apps}safari.svg`,
    teams: `${PATHS.apps}teams.svg`,
    terminal: `${PATHS.apps}terminal.svg`,
    trash: `${PATHS.apps}trash.svg`,
    vscode: `${PATHS.apps}vscode.svg`,
};
const EXT_ICONS = {
    css: `${PATHS.mimetypes}css.svg`,
    default: `${PATHS.mimetypes}default.svg`,
    dockerfile: `${PATHS.mimetypes}dockerfile.svg`,
    jpg: `${PATHS.mimetypes}jpg.svg`,
    js: `${PATHS.mimetypes}js.svg`,
    md: `${PATHS.mimetypes}md.svg`,
    pdf: `${PATHS.mimetypes}pdf.svg`,
    php: `${PATHS.mimetypes}php.svg`,
    png: `${PATHS.mimetypes}png.svg`,
    psd: `${PATHS.mimetypes}psd.svg`,
    py: `${PATHS.mimetypes}py.svg`,
    readme: `${PATHS.mimetypes}readme.svg`,
    rtf: `${PATHS.mimetypes}rtf.svg`,
    rust: `${PATHS.mimetypes}rust.svg`,
    tsx: `${PATHS.mimetypes}tsx.svg`,
    txt: `${PATHS.mimetypes}txt.svg`,
    video: `${PATHS.mimetypes}video.svg`,
    vscode: `${PATHS.mimetypes}vscode.svg`,
};
export { PATHS, APP_ICONS, EXT_ICONS };

const navIcons = [
    { id: 1, img: `${PATHS.nav}wifi.svg`, },
    { id: 2, img: `${PATHS.nav}search.svg`, },
    { id: 3, img: `${PATHS.nav}user.svg`, },
    { id: 4, img: `${PATHS.nav}mode.svg`, },
];

const dockApps = [
    {
        id: "finder",
        name: "Projects", // was "Finder"
        icon: APP_ICONS.finder,
        canOpen: true,
    },
    {
        id: "safari",
        name: "Articles", // was "Safari"
        icon: APP_ICONS.safari,
        canOpen: true,
    },
    {
        id: "photos",
        name: "Gallery", // was "Photos"
        icon: APP_ICONS.photos,
        canOpen: true,
    },
    {
        id: "contact",
        name: "Contact", // or "Get in touch"
        icon: APP_ICONS.contact,
        canOpen: true,
    },
    {
        id: "postman",
        name: "Postman", // was "Terminal"
        icon: APP_ICONS.postman,
        canOpen: false,
    },
    {
        id: "vscode",
        name: "VS Code", // was "Terminal"
        icon: APP_ICONS.vscode,
        canOpen: false,
    },
    {
        id: "terminal",
        name: "Skills", // was "Terminal"
        icon: APP_ICONS.terminal,
        canOpen: true,
    },
    {
        id: "trash",
        name: "Archive", // was "Trash"
        icon: APP_ICONS.trash,
        canOpen: true,
    },
];

const blogPosts = [
    {
        id: 1,
        date: "Sep 2, 2025",
        title:
            "TypeScript Explained: What It Is, Why It Matters, and How to Master It",
        image: "/images/blog1.png",
        link: "https://joecrash.dev/blog/typescript-explained-what-it-is-why-it-matters-and-how-to-master-it",
    },
    {
        id: 2,
        date: "Aug 28, 2025",
        title: "The Ultimate Guide to Mastering Three.js for 3D Development",
        image: "/images/blog2.png",
        link: "https://joecrash.dev/blog/the-ultimate-guide-to-mastering-three-js-for-3d-development",
    },
    {
        id: 3,
        date: "Aug 15, 2025",
        title: "The Ultimate Guide to Mastering GSAP Animations",
        image: "/images/blog3.png",
        link: "https://joecrash.dev/blog/the-ultimate-guide-to-mastering-gsap-animations",
    },
];

const techStack = [
    {
        category: "Languages",
        items: ["Javascript", "PHP", "Python"],
    },
    {
        category: "Frontend",
        items: ["React.js", "Next.js", "TypeScript", "HTML5"],
    },
    {
        category: "Styling",
        items: ["Tailwind CSS", "CSS3"],
    },
    {
        category: "Backend",
        items: ["Node.js", "Laravel", "FastAPI", "HAProxy"],
    },
    {
        category: "Database",
        items: ["MySQL", "PostgreSQL", "NoSQL", "FlatFile"],
    },
    {
        category: "Dev Tools",
        items: ["Git", "GitHub", "Postman", "Docker", "CodeRabbit", "Fiddler"],
    },
    {
        category: "AWS",
        items: ["EC2", "S3", "ACM", "WAF", "IAM", "CloudFlare"],
    },
    {
        category: "IDE",
        items: ["VSCode", "WebStorm", "Vim", "PyCharm"],
    },
];

const socials = [
    {
        id: 1,
        text: "Github",
        icon: `${PATHS.contact}github.svg`,
        bg: "#f4656b",
        link: "https://github.com/joecrash",
    },
    {
        id: 2,
        text: "Platform",
        icon: `${PATHS.contact}atom.svg`,
        bg: "#4bcb63",
        link: "https://joecrash.dev/",
    },
    {
        id: 3,
        text: "Twitter/X",
        icon: `${PATHS.contact}twitter.svg`,
        bg: "#ff866b",
        link: "https://x.com/joecrash",
    },
    {
        id: 4,
        text: "LinkedIn",
        icon: `${PATHS.contact}linkedin.svg`,
        bg: "#05b6f6",
        link: "https://www.linkedin.com/in/juan-medina-full-stack-developer/",
    },
];

const galleryA = [
    {id: 1, img: "/images/gal1.png",},
    {id: 2, img: "/images/gal2.png",},
    {id: 3, img: "/images/gal3.png",},
    {id: 4, img: "/images/gal4.png",},
];
const galleryB = [
    {id: 7, img: "/images/gal3.png",},
    {id: 5, img: "/images/gal1.png",},
    {id: 8, img: "/images/gal4.png",},
    {id: 6, img: "/images/gal2.png",},
];

export {
    navLinks,
    navIcons,
    dockApps,
    blogPosts,
    techStack,
    socials,
    galleryA,
    galleryB,
};

const WORK_LOCATION = {
    id: 1,
    type: "work",
    name: "Work",
    icon: `${PATHS.shared}work.svg`,
    kind: "folder",
    children: [
        // ▶ Project 1
        {
            id: 5,
            name: "Nike Ecommerce Website Application",
            icon: `${PATHS.folders}blue.svg`,
            kind: "folder",
            position: "top-10 left-5", // icon position inside Finder
            windowPosition: "top-[5vh] left-5", // optional: Finder window position
            children: [
                {
                    id: 1,
                    name: "Nike Project.txt",
                    icon: EXT_ICONS.txt,
                    kind: "file",
                    fileType: "txt",
                    position: "top-5 left-10",
                    description: [
                        "The Nike eCommerce website is a sleek and modern platform designed for shopping the latest Nike collections.",
                        "Instead of a simple online store, it delivers an immersive experience with bold visuals, interactive product displays, and smooth navigation.",
                        "Think of it like walking into a flagship Nike store—but right from your phone or laptop.",
                        "It's built with Next.js and Tailwind, ensuring fast performance, responsive design, and a clean, premium look.",
                    ],
                },
                {
                    id: 2,
                    name: "nike.com",
                    icon: APP_ICONS.safari,
                    kind: "file",
                    fileType: "url",
                    href: "https://youtu.be/fZdTYswuZjU?si=Awjl-pIst9e09_UU",
                    position: "top-10 right-20",
                },
                {
                    id: 4,
                    name: "nike.png",
                    icon: EXT_ICONS.png,
                    kind: "file",
                    fileType: "img",
                    position: "top-52 right-80",
                    imageUrl: "/images/project-1.png",
                },
                {
                    id: 5,
                    name: "Design.fig",
                    icon: APP_ICONS.figma,
                    kind: "file",
                    fileType: "fig",
                    href: "https://google.com",
                    position: "top-60 right-20",
                },
                {
                    id: 6,
                    name: "Demo.mp4",
                    icon: EXT_ICONS.video,
                    kind: "file",
                    fileType: "video",
                    href: "https://google.com",
                    position: "top-40 right-50",
                },
            ],
        },

        // ▶ Project 2
        {
            id: 6,
            name: "AI Resume Analyzer",
            icon: `${PATHS.folders}green.svg`,
            kind: "folder",
            position: "top-52 right-80",
            windowPosition: "top-[20vh] left-7",
            children: [
                {
                    id: 1,
                    name: "AI Resume Analyzer Project.txt",
                    icon: EXT_ICONS.txt,
                    kind: "file",
                    fileType: "txt",
                    position: "top-5 right-10",
                    description: [
                        "AI Resume Analyzer is a smart tool that helps you perfect your resume with instant feedback.",
                        "Instead of guessing what recruiters want, you get AI-powered insights on keywords, formatting, and overall impact.",
                        "Think of it like having a career coach—pointing out strengths, fixing weaknesses, and boosting your chances of landing interviews.",
                        "It's built with Next.js and Tailwind, so it runs fast, looks professional, and works seamlessly on any device.",
                    ],
                },
                {
                    id: 2,
                    name: "ai-resume-analyzer.com",
                    icon: APP_ICONS.safari,
                    kind: "file",
                    fileType: "url",
                    href: "https://youtu.be/iYOz165wGkQ?si=R1hs8Legl200m0Cl",
                    position: "top-20 left-20",
                },
                {
                    id: 4,
                    name: "ai-resume-analyzer.png",
                    icon: EXT_ICONS.png,
                    kind: "file",
                    fileType: "img",
                    position: "top-52 left-80",
                    imageUrl: "/images/project-2.png",
                },
                {
                    id: 5,
                    name: "Design.fig",
                    icon: APP_ICONS.figma,
                    kind: "file",
                    fileType: "fig",
                    href: "https://google.com",
                    position: "top-60 left-5",
                },
            ],
        },

        // ▶ Project 3
        {
            id: 7,
            name: "Food Delivery App",
            icon: `${PATHS.folders}orange.svg`,
            kind: "folder",
            position: "top-10 left-80",
            windowPosition: "top-[33vh] left-7",
            children: [
                {
                    id: 1,
                    name: "Food Delivery App Project.txt",
                    icon: EXT_ICONS.txt,
                    kind: "file",
                    fileType: "txt",
                    position: "top-5 left-10",
                    description: [
                        "Our Food Delivery App is a fast and convenient way to order meals from your favorite restaurants.",
                        "Instead of making calls or waiting in line, you can browse menus, customize orders, and track deliveries in real time.",
                        "Think of it like having your favorite restaurants in your pocket—ready to deliver anytime, anywhere.",
                        "It’s built with React Native, so it works smoothly on both iOS and Android with a clean, modern design.",
                    ],
                },
                {
                    id: 2,
                    name: "food-delivery-app.com",
                    icon: APP_ICONS.safari,
                    kind: "file",
                    fileType: "url",
                    href: "https://youtu.be/LKrX390fJMw?si=cExkuVhf2DTV9G2-",
                    position: "top-10 right-20",
                },
                {
                    id: 4,
                    name: "food-delivery-app.png",
                    icon: EXT_ICONS.png,
                    kind: "file",
                    fileType: "img",
                    position: "top-52 right-80",
                    imageUrl: "/images/project-3.png",
                },
                {
                    id: 5,
                    name: "Design.fig",
                    icon: APP_ICONS.figma,
                    kind: "file",
                    fileType: "fig",
                    href: "https://google.com",
                    position: "top-60 right-20",
                },
            ],
        },
    ],
};
const ABOUT_LOCATION = {
    id: 2,
    type: "about",
    name: "About me",
    icon: `${PATHS.shared}info.svg`,
    kind: "folder",
    children: [
        {
            id: 1,
            name: "me.png",
            icon: EXT_ICONS.png,
            kind: "file",
            fileType: "img",
            position: "top-10 left-5",
            imageUrl: "/images/adrian.jpg",
        },
        {
            id: 2,
            name: "casual-me.png",
            icon: EXT_ICONS.png,
            kind: "file",
            fileType: "img",
            position: "top-28 right-72",
            imageUrl: "/images/adrian-2.jpg",
        },
        {
            id: 3,
            name: "conference-me.png",
            icon: EXT_ICONS.png,
            kind: "file",
            fileType: "img",
            position: "top-52 left-80",
            imageUrl: "/images/adrian-3.jpeg",
        },
        {
            id: 4,
            name: "about-me.txt",
            icon: EXT_ICONS.txt,
            kind: "file",
            fileType: "txt",
            position: "top-60 left-5",
            subtitle: "Meet the Developer Behind the Code",
            image: "/images/adrian.jpg",
            description: [
                "Hey! I’m Adrian 👋, a web developer who enjoys building sleek, interactive websites that actually work well.",
                "I specialize in JavaScript, React, and Next.js—and I love making things feel smooth, fast, and just a little bit delightful.",
                "I’m big on clean UI, good UX, and writing code that doesn’t need a search party to debug.",
                "Outside of dev work, you'll find me tweaking layouts at 2AM, sipping overpriced coffee, or impulse-buying gadgets I absolutely convinced myself I needed 😅",
            ],
        },
    ],
};
const RESUME_LOCATION = {
    id: 3,
    type: "resume",
    name: "Resume",
    icon: `${PATHS.shared}file.svg`,
    kind: "folder",
    children: [
        {
            id: 1,
            name: "Resume.pdf",
            icon: EXT_ICONS.pdf,
            kind: "file",
            fileType: "pdf",
            // you can add `href` if you want to open a hosted resume
            // href: "/your/resume/path.pdf",
        },
    ],
};
const TRASH_LOCATION = {
    id: 4,
    type: "trash",
    name: "Trash",
    icon: `${PATHS.shared}trash.svg`,
    kind: "folder",
    children: [
        {
            id: 1,
            name: "trash1.png",
            icon: EXT_ICONS.png,
            kind: "file",
            fileType: "img",
            position: "top-10 left-10",
            imageUrl: "/images/trash-1.png",
        },
        {
            id: 2,
            name: "trash2.png",
            icon: EXT_ICONS.png,
            kind: "file",
            fileType: "img",
            position: "top-40 left-80",
            imageUrl: "/images/trash-2.png",
        },
    ],
};

export const locations = {
    work: WORK_LOCATION,
    about: ABOUT_LOCATION,
    resume: RESUME_LOCATION,
    trash: TRASH_LOCATION,
};

const LIBRARY_GALLERY = {
    id: 14,
    type: "library",
    name: "Library",
    icon: `${PATHS.shared}gicon1.svg`,
    kind: "folder",
    children: galleryA,
};
const MEMORY_GALLERY = {
    id: 15,
    type: "memories",
    name: "Memories",
    icon: `${PATHS.shared}gicon2.svg`,
    kind: "folder",
    children: galleryB,
};

export const galleries = {
    library: LIBRARY_GALLERY,
    memories: MEMORY_GALLERY
};

const INITIAL_Z_INDEX = 1000;
const WINDOW_CONFIG = {
    finder: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    contact: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    resume: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    safari: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    photos: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    terminal: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    txtfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    imgfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    videofile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
};

export { INITIAL_Z_INDEX, WINDOW_CONFIG };