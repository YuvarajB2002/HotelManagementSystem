using System.ComponentModel.DataAnnotations;

namespace HotelManagement.Model
{
    public class Payment
    {
        [Key]
        public int PaymentId { get; set; }
        public int ReservationId { get; set; }
        public decimal PaymentAmount { get; set; }
        public string? PaymentMethod { get; set; }
        public string? PaymentStatus { get; set; }
        public DateTime PaymentDate { get; set; }

        // Navigation properties
        public Reservation? Reservation { get; set; }
    }

}
