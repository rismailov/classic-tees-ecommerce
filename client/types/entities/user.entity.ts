export interface UserEntity {
    fullName: string
    initials: string
    email: {
        excerpt: string
        full: string
    }
}
