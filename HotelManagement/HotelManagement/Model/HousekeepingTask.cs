using System.ComponentModel.DataAnnotations;

namespace HotelManagement.Model
{
    public class HousekeepingTask
    {
        [Key]
        public int TaskId { get; set; }
        public string? TaskStatus { get; set; }
        public int RoomId { get; set; }
        public int AssignedStaffId { get; set; }
        public string? TaskDescription { get; set; }
        public DateTime TaskDate { get; set; }

        // Navigation properties
        public Room? Room { get; set; }
        public User? AssignedStaff { get; set; }
    }

}
