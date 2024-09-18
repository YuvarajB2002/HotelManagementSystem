using HotelManagement.Model;

namespace HotelManagement.Interface
{
    public interface IPayment
    {
        Task<IEnumerable<Payment>> GetAllPayment();
        Task<Payment> GetById(int paymentId);
        Task AddPayment(Payment p);
        Task UpdatePayment(Payment i);
        Task DeletePayment(int paymentId);
    }
}
