type Link = {
    url: string | null
    label: string
    active: boolean
}

// Laravel paginated data generic
export interface TPaginatedData<T> {
    meta: {
        current_page: number
        from: number
        last_page: number
        links: Link[]
        path: string
        per_page: number
        to: number
        total: number
    }

    links: {
        first: string
        last: string
        prev: string
        next: string
    }

    data: T
}
