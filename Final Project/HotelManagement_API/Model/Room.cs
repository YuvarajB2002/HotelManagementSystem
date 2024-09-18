namespace HotelManagement.Model
{
    public class Room
    {
        public int RoomId { get; set; }
        public string? RoomNumber { get; set; }
        public string? RoomType { get; set; }
        public decimal Price { get; set; }
        public string? Status { get; set; }
        public string? Description { get; set; }
        public int Capacity { get; set; }
        public DateTime DateCreated { get; set; }
        public bool AC { get; set; }
        public string? RoomImage { get; set; }

        // Navigation properties
        public ICollection<Reservation>? Reservations { get; set; }
    }

}

