namespace HotelManagement.Model
{
    public class Guest
    {
        public int GuestId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public string? Preferences { get; set; }
        public DateTime DateCreated { get; set; }

        // Navigation properties
        public ICollection<Reservation>? Reservations { get; set; }
    }

}
