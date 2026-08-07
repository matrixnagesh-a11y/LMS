export interface CollegeTenant {
  slug: string;
  name: string;
  code: string;
  logoUrl?: string;
  bgUrl?: string;
  primaryColor: string;
  secondaryColor: string;
  welcomeMessage: string;
  introduction: string;
  privacyPolicy: string;
  termsOfUse: string;
  supportEmail: string;
  customDomain?: string;
}

export const INITIAL_COLLEGES: Record<string, CollegeTenant> = {
  meridian: {
    slug: 'meridian',
    name: 'Meridian College',
    code: 'MC01',
    logoUrl: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=150&auto=format&fit=crop&q=80',
    bgUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&auto=format&fit=crop&q=80',
    primaryColor: '#2563EB',
    secondaryColor: '#0F766E',
    welcomeMessage: 'Welcome to Meridian College LMS Portal',
    introduction: 'Dedicated to academic excellence in software architecture, cybersecurity, and engineering.',
    privacyPolicy: 'Meridian College complies with international student data protection policies.',
    termsOfUse: 'All students must adhere to academic honor codes and ethical conduct.',
    supportEmail: 'support@meridian.edu.my',
    customDomain: 'learning.meridian.edu.my',
  },
  horizon: {
    slug: 'horizon',
    name: 'Horizon Training Institute',
    code: 'HTI01',
    logoUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=150&auto=format&fit=crop&q=80',
    bgUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&auto=format&fit=crop&q=80',
    primaryColor: '#7C3AED',
    secondaryColor: '#059669',
    welcomeMessage: 'Welcome to Horizon Training Institute Cloud',
    introduction: 'Empowering professional development, business intelligence, and digital skills.',
    privacyPolicy: 'Horizon Institute protects data privacy for all corporate trainees and learners.',
    termsOfUse: 'Course materials are proprietary intellectual property of Horizon Institute.',
    supportEmail: 'support@horizon.edu.my',
    customDomain: 'lms.horizon.edu.my',
  },
};
