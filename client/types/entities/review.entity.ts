export interface ReviewEntity {
    id: number
    title: string
    text: {
        excerpt: string
        full: string
    }
    credentials: string
    stars: number
}
