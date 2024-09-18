using HotelManagement.Model;

namespace HotelManagement.Interface
{
    public interface IInventory
    {
        Task<IEnumerable<Inventory>> GetAllInventory();
        Task<Inventory> GetById(int inventoryId);
        Task AddInventory(Inventory i);
        Task UpdateInventory(Inventory i);
        Task DeleteInventory(int inventoryId);
    }
}
