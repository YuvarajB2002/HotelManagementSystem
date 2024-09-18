namespace HotelManagement.Model
{
    public class User
    {
        public int UserId { get; set; }
        public string? Username { get; set; }
        public string? PasswordHash { get; set; }
        public string? Role { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public DateTime DateCreated { get; set; }

        // Navigation properties
        public ICollection<Reservation>? Reservations { get; set; }
        public ICollection<MaintenanceRequest>? MaintenanceRequests { get; set; }
        public ICollection<Report>? Reports { get; set; }
        public ICollection<HousekeepingTask>? HousekeepingTasks { get; set; }
    }

}
