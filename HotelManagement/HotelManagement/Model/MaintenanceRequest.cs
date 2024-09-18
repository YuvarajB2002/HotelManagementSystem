using System.ComponentModel.DataAnnotations;

namespace HotelManagement.Model
{
    public class MaintenanceRequest
    {
        [Key]
        public int RequestId { get; set; }
        public int RoomId { get; set; }
        //public int ReportedByStaffId { get; set; }
        public int AssignedMaintenanceStaffId { get; set; }
        public string? IssueDescription { get; set; }
        public string? MaintenanceStatus { get; set; }
        public DateTime RequestDate { get; set; }
        public DateTime ScheduledDate { get; set; }

        // Navigation properties
        public Room? Room { get; set; }
        public User? ReportedByStaff { get; set; }
        public User? AssignedMaintenanceStaff { get; set; }
    }

}
