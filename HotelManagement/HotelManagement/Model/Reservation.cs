namespace HotelManagement.Model
{
    public class Reservation
    {
        public int ReservationId { get; set; }
        public int GuestId { get; set; }
        public int RoomId { get; set; }
        public DateTime CheckInDate { get; set; }
        public DateTime CheckOutDate { get; set; }
        public decimal TotalAmount { get; set; }
        public string? ReservationStatus { get; set; }
        public string? PaymentStatus { get; set; }
        public DateTime DateCreated { get; set; }
        public int CreatedByUserId { get; set; }
        public int Capacity { get; set; }

        // Navigation properties
        public Guest? Guest { get; set; }
        public Room? Room { get; set; }
        public User? CreatedByUser { get; set; }
        public ICollection<Payment>? Payments { get; set; }
    }

}
