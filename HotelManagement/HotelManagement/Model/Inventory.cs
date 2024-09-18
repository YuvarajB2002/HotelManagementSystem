using System.ComponentModel.DataAnnotations;

namespace HotelManagement.Model
{
    public class Inventory
    {
        [Key]
        public int InventoryId { get; set; }
        public string? ItemName { get; set; }
        public int Quantity { get; set; }
        public int ReorderLevel { get; set; }
        public DateTime LastRestockedDate { get; set; }
        public string? Supplier { get; set; }
    }

}
