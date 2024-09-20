using System.ComponentModel.DataAnnotations;

namespace HotelManagement.Model
{
    public class Report
    {
        [Key]
        public int ReportId { get; set; }
        public string? ReportType { get; set; }
        public int GeneratedByStaffId { get; set; }
        public DateTime GeneratedDate { get; set; }
        public string? ReportData { get; set; }

        // Navigation properties
        public User? GeneratedByStaff { get; set; }
    }

}
