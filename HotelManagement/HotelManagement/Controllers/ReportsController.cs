using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HotelManagement.Model;
using System.Composition;

namespace HotelManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportsController : ControllerBase
    {
        private readonly HotelDbContext _context;

        public ReportsController(HotelDbContext context)
        {
            _context = context;
        }

        // GET: api/Reports
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Report>>> GetReports()
        {
            return await _context.Reports.ToListAsync();
        }

        // GET: api/Reports/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Report>> GetReport(int id)
        {
            var report = await _context.Reports.FindAsync(id);

            if (report == null)
            {
                return NotFound();
            }

            return report;
        }

        // PUT: api/Reports/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReport(int id, Report report)
        {
            if (id != report.ReportId)
            {
                return BadRequest();
            }

            _context.Entry(report).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReportExists(id))
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

        // POST: api/Reports
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Report>> PostReport(Report report)
        {
            _context.Reports.Add(report);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReport", new { id = report.ReportId }, report);
        }

        // DELETE: api/Reports/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReport(int id)
        {
            var report = await _context.Reports.FindAsync(id);
            if (report == null)
            {
                return NotFound();
            }

            _context.Reports.Remove(report);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpGet("generateDailyReport")]
        public async Task<IActionResult> GenerateDailyReport()
        {
            var today = DateTime.Today;

            // Fetch all reservations created today
            var reservations = await _context.Reservations
                .Where(r => r.DateCreated.Date == today)
                .Include(r => r.Room)
                .ToListAsync();

            // Count total reservations
            var totalReservations = reservations.Count;

            // Calculate total revenue (sum of total amounts from reservations)
            var totalRevenue = reservations.Sum(r => r.TotalAmount);

            // Calculate the total number of rooms
            var totalRooms = await _context.Rooms.CountAsync();

            // Calculate occupancy rate
            var roomsReserved = reservations.Select(r => r.RoomId).Distinct().Count();
            var occupancyRate = (double)roomsReserved / totalRooms * 100;

            // Breakdown by reservation status
            var confirmedReservations = reservations.Count(r => r.ReservationStatus == "Confirmed");
            var cancelledReservations = reservations.Count(r => r.ReservationStatus == "Cancelled");

            // Create the report object
            var report = new
            {
                Date = today.ToShortDateString(),
                TotalReservations = totalReservations,
                TotalRevenue = totalRevenue,
                OccupancyRate = occupancyRate.ToString("F2") + "%",
                StatusBreakdown = new
                {
                    Confirmed = confirmedReservations,
                    Cancelled = cancelledReservations,
                    Other = totalReservations - confirmedReservations - cancelledReservations
                }
            };

            // Return the generated report as a response
            return Ok(report);
        }



        private bool ReportExists(int id)
        {
            return _context.Reports.Any(e => e.ReportId == id);
        }
    }
}
