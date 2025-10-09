import { User, Job, Application, PlacementRecord, SystemStats } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    email: 'admin@university.edu',
    role: 'admin',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya.sharma@student.edu',
    role: 'student',
    department: 'Computer Science',
    phone: '+91-98765-43210',
    createdAt: new Date('2024-02-10'),
  },
  {
    id: '3',
    name: 'Arjun Mehta',
    email: 'arjun.mehta@infosys.com',
    role: 'employer',
    company: 'Infosys Limited',
    phone: '+91-98765-43211',
    createdAt: new Date('2024-01-20'),
  },
  {
    id: '4',
    name: 'Dr. Kavita Patel',
    email: 'kavita.patel@university.edu',
    role: 'placement-officer',
    department: 'Career Services',
    phone: '+91-98765-43212',
    createdAt: new Date('2024-01-10'),
  },
  {
    id: '5',
    name: 'Amit Verma',
    email: 'amit.verma@student.edu',
    role: 'student',
    department: 'Computer Science',
    phone: '+91-98765-43213',
    createdAt: new Date('2024-02-15'),
  },
  {
    id: '6',
    name: 'Neha Gupta',
    email: 'neha.gupta@student.edu',
    role: 'student',
    department: 'Electronics Engineering',
    phone: '+91-98765-43214',
    createdAt: new Date('2024-02-20'),
  },
  {
    id: '7',
    name: 'Rahul Singh',
    email: 'rahul.singh@student.edu',
    role: 'student',
    department: 'Mechanical Engineering',
    phone: '+91-98765-43215',
    createdAt: new Date('2024-02-25'),
  },
  {
    id: '8',
    name: 'Vikram Reddy',
    email: 'vikram.reddy@tcs.com',
    role: 'employer',
    company: 'Tata Consultancy Services',
    phone: '+91-98765-43216',
    createdAt: new Date('2024-01-25'),
  },
  {
    id: '9',
    name: 'Anjali Iyer',
    email: 'anjali.iyer@wipro.com',
    role: 'employer',
    company: 'Wipro Technologies',
    phone: '+91-98765-43217',
    createdAt: new Date('2024-01-28'),
  },
];

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Software Engineer Intern',
    company: 'Infosys Limited',
    department: 'Engineering',
    location: 'Bangalore, Karnataka',
    type: 'internship',
    salary: { min: 300000, max: 450000, currency: 'INR' },
    description: 'Join our engineering team as a software engineer intern. You will work on cutting-edge projects and gain valuable experience in full-stack development.',
    requirements: [
      'Currently pursuing BE/B.Tech in Computer Science or related field',
      'Strong programming skills in Java, Python, or JavaScript',
      'Understanding of software development principles',
      'Good communication skills',
    ],
    skills: ['Java', 'Python', 'JavaScript', 'React', 'Spring Boot', 'Git'],
    deadline: new Date('2025-12-31'),
    status: 'active',
    employerId: '3',
    postedDate: new Date('2024-09-15'),
    applicationsCount: 15,
  },
  {
    id: '2',
    title: 'Data Analyst',
    company: 'Tata Consultancy Services',
    department: 'Analytics',
    location: 'Mumbai, Maharashtra',
    type: 'full-time',
    salary: { min: 500000, max: 700000, currency: 'INR' },
    description: 'Seeking a data analyst to join our analytics team. You will be responsible for analyzing large datasets and providing insights to drive business decisions.',
    requirements: [
      'Bachelor\'s degree in Statistics, Mathematics, or related field',
      'Experience with SQL and Python',
      'Knowledge of statistical analysis and data visualization',
      'Strong analytical and problem-solving skills',
    ],
    skills: ['SQL', 'Python', 'Tableau', 'Excel', 'Statistics', 'Power BI'],
    deadline: new Date('2025-11-30'),
    status: 'active',
    employerId: '8',
    postedDate: new Date('2024-09-10'),
    applicationsCount: 23,
  },
  {
    id: '3',
    title: 'Digital Marketing Intern',
    company: 'Wipro Technologies',
    department: 'Marketing',
    location: 'Pune, Maharashtra',
    type: 'internship',
    salary: { min: 250000, max: 350000, currency: 'INR' },
    description: 'Marketing internship opportunity to work with our creative team on brand campaigns and digital marketing initiatives.',
    requirements: [
      'Currently pursuing degree in Marketing, Communications, or related field',
      'Creative thinking and strong communication skills',
      'Basic knowledge of social media platforms',
      'Willingness to learn and take initiative',
    ],
    skills: ['Social Media', 'Content Creation', 'SEO', 'Google Analytics', 'Canva'],
    deadline: new Date('2025-10-15'),
    status: 'active',
    employerId: '9',
    postedDate: new Date('2024-09-05'),
    applicationsCount: 8,
  },
  {
    id: '4',
    title: 'Full Stack Developer',
    company: 'Infosys Limited',
    department: 'Engineering',
    location: 'Hyderabad, Telangana',
    type: 'full-time',
    salary: { min: 600000, max: 900000, currency: 'INR' },
    description: 'Looking for a talented full stack developer to build and maintain web applications. You will work with modern technologies and collaborate with cross-functional teams.',
    requirements: [
      'BE/B.Tech in Computer Science or equivalent experience',
      '2+ years of experience in web development',
      'Proficiency in React and Node.js',
      'Experience with databases (MongoDB, PostgreSQL)',
    ],
    skills: ['React', 'Node.js', 'MongoDB', 'PostgreSQL', 'REST API', 'AWS'],
    deadline: new Date('2025-12-15'),
    status: 'active',
    employerId: '3',
    postedDate: new Date('2024-09-20'),
    applicationsCount: 32,
  },
];

export const mockApplications: Application[] = [
  {
    id: '1',
    jobId: '1',
    studentId: '2',
    status: 'shortlisted',
    appliedDate: new Date('2024-09-20'),
    notes: 'Strong technical background, good fit for the role',
    interviewDate: new Date('2024-10-05'),
  },
  {
    id: '2',
    jobId: '2',
    studentId: '5',
    status: 'pending',
    appliedDate: new Date('2024-09-18'),
    notes: 'Need to review portfolio',
  },
  {
    id: '3',
    jobId: '1',
    studentId: '5',
    status: 'interviewed',
    appliedDate: new Date('2024-09-16'),
    notes: 'Great interview performance',
    interviewDate: new Date('2024-09-30'),
    feedback: 'Excellent technical skills, good communication',
  },
  {
    id: '4',
    jobId: '3',
    studentId: '6',
    status: 'pending',
    appliedDate: new Date('2024-09-22'),
    notes: 'Interested in digital marketing',
  },
  {
    id: '5',
    jobId: '4',
    studentId: '7',
    status: 'rejected',
    appliedDate: new Date('2024-09-12'),
    notes: 'Does not meet experience requirements',
    feedback: 'Lacks required full-stack experience',
  },
];

export const mockPlacements: PlacementRecord[] = [
  {
    id: '1',
    studentId: '2',
    jobId: '1',
    company: 'Infosys Limited',
    position: 'Software Engineer Intern',
    salary: 375000,
    startDate: new Date('2024-06-01'),
    status: 'active',
    duration: 6,
  },
  {
    id: '2',
    studentId: '5',
    jobId: '2',
    company: 'Tata Consultancy Services',
    position: 'Data Analyst',
    salary: 600000,
    startDate: new Date('2024-07-01'),
    status: 'active',
    duration: 12,
  },
];

export const mockStats: SystemStats = {
  totalStudents: 150,
  totalEmployers: 25,
  totalJobs: 45,
  totalApplications: 320,
  totalPlacements: 85,
  placementRate: 75.5,
};

// Extended student profiles for candidate management
export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  year: string;
  cgpa: number;
  skills: string[];
  resume?: string;
  github?: string;
  linkedin?: string;
  portfolio?: string;
  projects: { name: string; description: string; technologies: string[] }[];
  achievements: string[];
  placementStatus: 'placed' | 'seeking' | 'not-interested';
}

export const mockStudentProfiles: StudentProfile[] = [
  {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya.sharma@student.edu',
    phone: '+91-98765-43210',
    department: 'Computer Science',
    year: 'Final Year',
    cgpa: 8.7,
    skills: ['Java', 'Python', 'React', 'Node.js', 'MongoDB', 'Git'],
    github: 'github.com/priyasharma',
    linkedin: 'linkedin.com/in/priyasharma',
    portfolio: 'priyasharma.dev',
    projects: [
      {
        name: 'E-Commerce Platform',
        description: 'Built a full-stack e-commerce platform with payment integration',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      },
      {
        name: 'Task Management App',
        description: 'Real-time task management application with collaboration features',
        technologies: ['React', 'Firebase', 'Material-UI'],
      },
    ],
    achievements: [
      'Winner - College Hackathon 2024',
      'Published research paper on Machine Learning',
      'Google Cloud Certified',
    ],
    placementStatus: 'placed',
  },
  {
    id: '5',
    name: 'Amit Verma',
    email: 'amit.verma@student.edu',
    phone: '+91-98765-43213',
    department: 'Computer Science',
    year: 'Final Year',
    cgpa: 8.2,
    skills: ['Python', 'Data Science', 'SQL', 'Tableau', 'Excel', 'Statistics'],
    github: 'github.com/amitverma',
    linkedin: 'linkedin.com/in/amitverma',
    projects: [
      {
        name: 'Sales Forecasting Model',
        description: 'Machine learning model to predict sales trends',
        technologies: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib'],
      },
    ],
    achievements: [
      'Runner-up - Data Science Competition',
      'AWS Certified Data Analytics',
    ],
    placementStatus: 'placed',
  },
  {
    id: '6',
    name: 'Neha Gupta',
    email: 'neha.gupta@student.edu',
    phone: '+91-98765-43214',
    department: 'Electronics Engineering',
    year: 'Third Year',
    cgpa: 8.9,
    skills: ['C++', 'Python', 'Arduino', 'MATLAB', 'PCB Design'],
    linkedin: 'linkedin.com/in/nehagupta',
    projects: [
      {
        name: 'IoT Smart Home System',
        description: 'Automated home control system using IoT devices',
        technologies: ['Arduino', 'Python', 'MQTT', 'Raspberry Pi'],
      },
    ],
    achievements: [
      'Best Project Award - College Tech Fest',
      'Intel Innovation Award',
    ],
    placementStatus: 'seeking',
  },
  {
    id: '7',
    name: 'Rahul Singh',
    email: 'rahul.singh@student.edu',
    phone: '+91-98765-43215',
    department: 'Mechanical Engineering',
    year: 'Final Year',
    cgpa: 7.8,
    skills: ['AutoCAD', 'SolidWorks', 'ANSYS', 'Python', 'Project Management'],
    linkedin: 'linkedin.com/in/rahulsingh',
    projects: [
      {
        name: 'Hydraulic Robotic Arm',
        description: 'Designed and fabricated a hydraulic robotic arm',
        technologies: ['SolidWorks', 'Hydraulics', 'Mechanical Design'],
      },
    ],
    achievements: [
      'SAE India Member',
      'Published paper on Robotics',
    ],
    placementStatus: 'seeking',
  },
];

// Company profiles for employer management
export interface CompanyProfile {
  id: string;
  name: string;
  industry: string;
  size: string;
  founded: string;
  headquarters: string;
  website: string;
  description: string;
  benefits: string[];
  culture: string[];
  openPositions: number;
  activeRecruiters: number;
  logo?: string;
}

export const mockCompanyProfiles: CompanyProfile[] = [
  {
    id: '3',
    name: 'Infosys Limited',
    industry: 'Information Technology',
    size: '100,000+ employees',
    founded: '1981',
    headquarters: 'Bangalore, Karnataka',
    website: 'www.infosys.com',
    description: 'Infosys is a global leader in next-generation digital services and consulting. We enable clients in more than 50 countries to navigate their digital transformation.',
    benefits: [
      'Health Insurance',
      'Provident Fund',
      'Performance Bonuses',
      'Training & Development',
      'Work from Home Options',
      'Gym Membership',
    ],
    culture: [
      'Innovation-driven',
      'Collaborative environment',
      'Continuous learning',
      'Work-life balance',
      'Diversity & Inclusion',
    ],
    openPositions: 12,
    activeRecruiters: 3,
  },
  {
    id: '8',
    name: 'Tata Consultancy Services',
    industry: 'Information Technology',
    size: '500,000+ employees',
    founded: '1968',
    headquarters: 'Mumbai, Maharashtra',
    website: 'www.tcs.com',
    description: 'TCS is an IT services, consulting and business solutions organization that has been partnering with many of the world\'s largest businesses for over 50 years.',
    benefits: [
      'Comprehensive Health Coverage',
      'Employee Stock Options',
      'Retirement Benefits',
      'Learning Opportunities',
      'Flexible Work Arrangements',
      'Employee Assistance Programs',
    ],
    culture: [
      'Customer-focused',
      'Excellence in delivery',
      'Employee empowerment',
      'Sustainability focus',
      'Global exposure',
    ],
    openPositions: 8,
    activeRecruiters: 2,
  },
  {
    id: '9',
    name: 'Wipro Technologies',
    industry: 'Information Technology',
    size: '200,000+ employees',
    founded: '1945',
    headquarters: 'Bangalore, Karnataka',
    website: 'www.wipro.com',
    description: 'Wipro Limited is a leading global information technology, consulting and business process services company.',
    benefits: [
      'Medical Insurance',
      'Accidental Insurance',
      'Maternity/Paternity Leave',
      'Professional Development',
      'Remote Work Options',
      'Wellness Programs',
    ],
    culture: [
      'Innovation & transformation',
      'Integrity & transparency',
      'Respect for individuals',
      'Continuous improvement',
      'Social responsibility',
    ],
    openPositions: 5,
    activeRecruiters: 2,
  },
];
