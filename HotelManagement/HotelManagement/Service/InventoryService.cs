using HotelManagement.Interface;
using HotelManagement.Model;

namespace HotelManagement.Service
{
    public class InventoryService
    {
        private readonly IInventory _invenrepo;

        public InventoryService(IInventory invenrepo)
        {
            _invenrepo = invenrepo;
        }

        public async Task<IEnumerable<Inventory>> GetAllInventory()
        {
            return await _invenrepo.GetAllInventory();
        }

        public async Task<Inventory> GetById(int inventoryId)
        {
            return await _invenrepo.GetById(inventoryId);
        }

        public async Task AddInventory(Inventory i)
        {
            await _invenrepo.AddInventory(i);
        }

        public async Task UpdateInventory(Inventory i)
        {
            await _invenrepo.UpdateInventory(i);
        }

        public async Task DeleteInventory(int inventoryId)
        {
            await _invenrepo.DeleteInventory(inventoryId);
        }

    }
}
