export interface Reservation{
  reservationId: number;
  guestId: number;
  roomId: number;
  checkInDate: Date;
  checkOutDate: Date| null;
  totalAmount: number;
  reservationStatus: string;
  paymentStatus: string;
  dateCreated: Date;
  createdByUserId: string | null;
  capacity: number;
}