declare module "next-auth" {
    interface User {
        id: string,
        name: string,
        email: string,
        role: string,
        mobile?: string,
        gender?: string,
        state?: string,
        city?: string,
        college?: string,
        collegeId?: string,
        department?: string,
        image?: string
    }
}

export {}