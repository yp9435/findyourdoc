export interface Doctor {
    id: string
    name: string
    specialties?: string[]
    experience: number
    fee: number
    consultationType: string
    rating?: number
    availability?: string[]
  }
  