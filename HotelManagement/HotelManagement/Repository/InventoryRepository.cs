using HotelManagement.Interface;
using HotelManagement.Model;
using Microsoft.EntityFrameworkCore;

namespace HotelManagement.Repository
{
    public class InventoryRepository:IInventory
    {
        private readonly HotelDbContext _context;
        public InventoryRepository(HotelDbContext context)
        {
            _context = context;
        }
        public async Task AddInventory(Inventory i)
        {
            await _context.Inventories.AddAsync(i);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteInventory(int inventoryId)
        {
            var inv = await _context.Inventories.FindAsync(inventoryId);
            if (inv != null)
            {
                _context.Inventories.Remove(inv);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Inventory>> GetAllInventory()
        {
            return await _context.Inventories.ToListAsync() ?? throw new NotImplementedException();
        }

        public async Task<Inventory> GetById(int inventoryId)
        {
            var inventory = await _context.Inventories.FindAsync(inventoryId);

            if (inventory == null)
            {
                // Log or handle the case where the inventory is not found
                throw new KeyNotFoundException($"Inventory with ID {inventoryId} was not found.");
            }

            return inventory;
        }
        public async Task UpdateInventory(Inventory i)
        {
            _context.Inventories.Update(i);
            await _context.SaveChangesAsync();
        }

    }
}
