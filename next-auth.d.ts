declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    mobile?: string;
    image?: string;
    role: string;
    gender?: string;
    state?: string;
    city?: string;
    collegeName?: string;
    collegeId?: string;
    department?: string;
    yearOfStudy?: string;
    joinDate?: string;
    saId?: string;
    referralLink?: string;
    referralQrLink?: string;
    SARank?: number;
    numberOfReferrals?: number;
    team?: string;
    registeredEvents?: string[];
    cirtificates?: string[];
    compositId?: string;
  }
}

export {};
