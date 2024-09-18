using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HotelManagement.Model;
using HotelManagement.Service;
using HotelManagement.Interface;

namespace HotelManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        private readonly PaymentService _payser;
        private readonly HotelDbContext _context;

       
        public PaymentsController(PaymentService context,HotelDbContext h)
        {
            _payser = context;
            _context = h;
        }

        // GET: api/Payments
        [HttpGet]
        public async Task<IEnumerable<Payment>> GetPayments()
        {
            return await _payser.GetAllPayment();
        }

        // GET: api/Payments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Payment>> GetPayment(int id)
        {
            var pay = await _payser.GetById(id);

            if (pay == null)
            {
                return NotFound();
            }

            return pay;
        }

        // PUT: api/Payments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPayment(int id, Payment payment)
        {
            if (id != payment.PaymentId)
            {
                return BadRequest();
            }

            await _payser.UpdatePayment(payment);

            return NoContent();
        }

        // POST: api/Payments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Payment>> PostPayment(Payment payment)
        {
            if (payment == null) return BadRequest("Payment cannot be null");
            await _payser.AddPayment(payment);

            return CreatedAtAction("GetPayment", new { id = payment.PaymentId }, payment);
        }

        // DELETE: api/Payments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePayment(int id)
        {
            await _payser.DeletePayment(id);    

            return NoContent();
        }

        [HttpGet("byReservation/{reservationId}")]
        public async Task<IActionResult> GetPaymentsByReservationId(int reservationId)
        {
            var payments = await _context.Payments
                .Where(p => p.ReservationId == reservationId)
                .ToListAsync();
            return Ok(payments);
        }

        [HttpGet("filterPaymentsByStatus/{status}")]
        public async Task<IActionResult> FilterPaymentsByStatus(string status)
        {
            var payments = await _context.Payments
                .Where(p => p.PaymentStatus.ToLower() == status.ToLower())
                .ToListAsync();

            if (!payments.Any())
            {
                return NotFound($"No payments found with status '{status}'.");
            }

            return Ok(payments);
        }


    }
}
