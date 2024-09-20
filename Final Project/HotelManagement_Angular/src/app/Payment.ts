export interface Payment{
    paymentId: number
    reservationId: number
    paymentAmount: number
    paymentMethod: string
    paymentStatus: string
    paymentDate: Date
}