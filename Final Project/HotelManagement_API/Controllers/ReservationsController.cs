using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HotelManagement.Model;

namespace HotelManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationsController : ControllerBase
    {
        private readonly HotelDbContext _context;

        public ReservationsController(HotelDbContext context)
        {
            _context = context;
        }

        // GET: api/Reservations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Reservation>>> GetReservations()
        {
            return await _context.Reservations.Include(r => r.Guest)
               .Include(r => r.Room)
                  .Include(r => r.CreatedByUser)
                   .Include(r => r.Payments).ToListAsync();
        }

        // GET: api/Reservations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Reservation>> GetReservation(int id)
        {
            var reservation = await _context.Reservations.Include(r => r.Guest)
               .Include(r => r.Room)
                  .Include(r => r.CreatedByUser)
                   .Include(r => r.Payments).FirstOrDefaultAsync(r => r.ReservationId == id);

            if (reservation == null)
            {
                return NotFound();
            }

            return reservation;
        }

        // PUT: api/Reservations/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReservation(int id, Reservation reservation)
        {
            if (id != reservation.ReservationId)
            {
                return BadRequest();
            }

            _context.Entry(reservation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReservationExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Reservations
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Reservation>> PostReservation(Reservation reservation)
        {
            _context.Reservations.Add(reservation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReservation", new { id = reservation.ReservationId }, reservation);
        }

        // DELETE: api/Reservations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReservation(int id)
        {
            var reservation = await _context.Reservations.FindAsync(id);
            if (reservation == null)
            {
                return NotFound();
            }

            _context.Reservations.Remove(reservation);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("byDateRange")]
        public async Task<IActionResult> GetReservationsByDateRange([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            var reservations = await _context.Reservations
                .Where(r => r.CheckInDate >= startDate && r.CheckOutDate <= endDate)
                .ToListAsync();
            return Ok(reservations);
        }

        [HttpPost("cancelReservation/{reservationId}")]
        public async Task<IActionResult> CancelReservation(int reservationId)
        {
            var reservation = await _context.Reservations
                .FirstOrDefaultAsync(r => r.ReservationId == reservationId);

            if (reservation == null)
            {
                return NotFound("Reservation not found.");
            }

            if (reservation.ReservationStatus == "Cancelled")
            {
                return BadRequest("Reservation is already cancelled.");
            }

            // Set the status to "Cancelled"
            reservation.ReservationStatus = "Cancelled";

            // Optionally, update room availability (if applicable)
            var room = await _context.Rooms.FirstOrDefaultAsync(r => r.RoomId == reservation.RoomId);
            if (room != null && room.Status == "Booked")
            {
                room.Status = "Available";
            }

            // Save changes
            await _context.SaveChangesAsync();

            return Ok(new { message = "Reservation cancelled successfully." });
        }

        [HttpPost("extendReservation/{reservationId}")]
        public async Task<IActionResult> ExtendReservation(int reservationId, [FromBody] DateTime newCheckOutDate)
        {
            var reservation = await _context.Reservations
                .FirstOrDefaultAsync(r => r.ReservationId == reservationId);

            if (reservation == null)
            {
                return NotFound("Reservation not found.");
            }

            if (newCheckOutDate <= reservation.CheckOutDate)
            {
                return BadRequest("New check-out date must be later than the current check-out date.");
            }

            // Check if the room is available for the extended period
            var conflictingReservations = await _context.Reservations
                .Where(r => r.RoomId == reservation.RoomId && r.ReservationId != reservationId)
                .Where(r => r.CheckInDate < newCheckOutDate && r.CheckOutDate > reservation.CheckOutDate)
                .ToListAsync();

            if (conflictingReservations.Any())
            {
                return BadRequest("The room is not available for the extended period.");
            }

            // Update the check-out date
            reservation.CheckOutDate = newCheckOutDate;

            // Optionally, update the total amount based on the extended days
            var room = await _context.Rooms.FirstOrDefaultAsync(r => r.RoomId == reservation.RoomId);
            if (room != null)
            {
                var additionalDays = (newCheckOutDate - reservation.CheckOutDate).Days;
                reservation.TotalAmount += additionalDays * room.Price;
            }

            // Save changes
            await _context.SaveChangesAsync();

            return Ok(new { message = "Reservation extended successfully.", newCheckOutDate });
        }


        [HttpGet("calculateTotalAmount/{reservationId}")]
        public async Task<IActionResult> CalculateTotalAmount(int reservationId)
        {
            // Find the reservation
            var reservation = await _context.Reservations
                .Include(r => r.Room)  // Include the Room entity to access its price
                .FirstOrDefaultAsync(r => r.ReservationId == reservationId);

            if (reservation == null)
            {
                return NotFound("Reservation not found.");
            }

            // Get the check-in and check-out dates
            var checkInDate = reservation.CheckInDate;
            var checkOutDate = reservation.CheckOutDate;

            // Calculate the number of days between check-in and check-out dates
            var totalDays = (checkOutDate - checkInDate).Days;

            if (totalDays <= 0)
            {
                return BadRequest("Check-out date must be later than check-in date.");
            }

            // Get the room's price per day
            var roomPricePerDay = reservation.Room.Price;

            // Calculate the total amount
            var totalAmount = totalDays * roomPricePerDay;

            // Update the reservation's TotalAmount if necessary
            reservation.TotalAmount = totalAmount;
            await _context.SaveChangesAsync();

            return Ok(new { reservationId = reservation.ReservationId, totalAmount });
        }



        private bool ReservationExists(int id)
        {
            return _context.Reservations.Any(e => e.ReservationId == id);
        }
    }
}
