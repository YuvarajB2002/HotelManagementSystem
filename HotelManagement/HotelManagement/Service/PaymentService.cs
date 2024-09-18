using HotelManagement.Interface;
using HotelManagement.Model;

namespace HotelManagement.Service
{
    public class PaymentService
    {
        private IPayment _payrepo;
        public PaymentService(IPayment payrepo)
        {
            _payrepo = payrepo;
        }
        public async Task<IEnumerable<Payment>> GetAllPayment()
        {
            return await _payrepo.GetAllPayment();
        }

        public async Task<Payment> GetById(int paymentId)
        {
            return await _payrepo.GetById(paymentId);
        }

        public async Task AddPayment(Payment p)
        {
            await _payrepo.AddPayment(p);
        }

        public async Task UpdatePayment(Payment p)
        {
            await _payrepo.UpdatePayment(p);
        }

        public async Task DeletePayment(int paymentId)
        {
            await _payrepo.DeletePayment(paymentId);
        }
    }
}
