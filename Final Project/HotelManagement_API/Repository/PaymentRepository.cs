using HotelManagement.Interface;
using HotelManagement.Model;
using Microsoft.EntityFrameworkCore;

namespace HotelManagement.Repository
{
    public class PaymentRepository:IPayment
    {
        private readonly HotelDbContext _context;

        public PaymentRepository(HotelDbContext context)
        {
            _context = context;
        }
        public async Task AddPayment(Payment p)
        {
            await _context.Payments.AddAsync(p);
            await _context.SaveChangesAsync();
        }
        public async Task DeletePayment(int paymentId)
        {
            var pay = await _context.Payments.FindAsync(paymentId);
            if (pay != null)
            {
                _context.Payments.Remove(pay);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Payment>> GetAllPayment()
        {
            return await _context.Payments.Include(r=>r.Reservation)
             .ThenInclude(r => r.Room)
         .Include(g => g.Reservation)
             .ThenInclude(r => r.Payments)
         .Include(g => g.Reservation)
             .ThenInclude(r => r.CreatedByUser).
             Include(g => g.Reservation).
             ThenInclude(r=>r.Guest)
                .ToListAsync() ?? throw new NotImplementedException();
        }

        public async Task<Payment> GetById(int paymentId)
        {
            var inventory = await _context.Payments.Include(r => r.Reservation).FirstOrDefaultAsync(p=>p.PaymentId==paymentId);

            if (inventory == null)
            {
                // Log or handle the case where the Payment is not found
                throw new KeyNotFoundException($"Payment with ID {paymentId} was not found.");
            }

            return inventory;
        }

        public async Task UpdatePayment(Payment p)
        {
            _context.Payments.Update(p);
            await _context.SaveChangesAsync();
        }
    }
}
