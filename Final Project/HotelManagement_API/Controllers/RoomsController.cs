using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HotelManagement.Model;
using Microsoft.AspNetCore.Authorization;

namespace HotelManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomsController : ControllerBase
    {
        private readonly HotelDbContext _context;

        public RoomsController(HotelDbContext context)
        {
            _context = context;
        }

        // GET: api/Rooms
        [HttpGet]
        [Authorize(Roles = "Staff,Admin")]
        public async Task<ActionResult<IEnumerable<Room>>> GetRooms()
        {
            return await _context.Rooms.Include(r=>r.Reservations).ToListAsync();
        }

        // GET: api/Rooms/5
        [HttpGet("{id}")]
       [Authorize(Roles = "Staff,Admin")]
        public async Task<ActionResult<Room>> GetRoom(int id)
        {
            var room = await _context.Rooms.Include(r => r.Reservations)
                .FirstOrDefaultAsync(r=>r.RoomId==id);

            if (room == null)
            {
                return NotFound();
            }

            return room;
        }

        // PUT: api/Rooms/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> PutRoom(int id, Room room)
        {
            if (id != room.RoomId)
            {
                return BadRequest();
            }

            _context.Entry(room).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoomExists(id))
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

        // POST: api/Rooms
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Room>> PostRoom(Room room)
        {
            _context.Rooms.Add(room);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRoom", new { id = room.RoomId }, room);
        }

        // DELETE: api/Rooms/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteRoom(int id)
        {
            var room = await _context.Rooms.FindAsync(id);
            if (room == null)
            {
                return NotFound();
            }

            _context.Rooms.Remove(room);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("filterByRoomType")]
        public async Task<IActionResult> FilterRoomsByRoomType([FromQuery] string roomType)
        {
            // Validate input parameter
            if (string.IsNullOrWhiteSpace(roomType))
            {
                return BadRequest("RoomType is a required parameter.");
            }

            // Fetch rooms that match the room type
            var filteredRooms = await _context.Rooms
                .Where(r => r.RoomType == roomType)
                .ToListAsync();

            // Return the result
            return Ok(filteredRooms);
        }

        [HttpGet("filterByStatus")]
        public async Task<IActionResult> FilterRoomsByStatus([FromQuery] string status)
        {
            // Validate input parameter
            if (string.IsNullOrWhiteSpace(status))
            {
                return BadRequest("Status is a required parameter.");
            }

            // Fetch rooms that match the status
            var filteredRooms = await _context.Rooms
                .Where(r => r.Status == status)
                .ToListAsync();

            // Return the result
            return Ok(filteredRooms);
        }

        [HttpGet("filterByAC")]
        public async Task<IActionResult> FilterRoomsByAC([FromQuery] bool ac)
        {
            // Fetch rooms that match the AC requirement (true for AC, false for non-AC)
            var filteredRooms = await _context.Rooms
                .Where(r => r.AC == ac)
                .ToListAsync();

            // Return the result
            return Ok(filteredRooms);
        }

        [HttpPut("updateRoomStatus/{roomId}/{status}")]
        public async Task<IActionResult> UpdateRoomStatus(int roomId, string status)
        {
            var room = await _context.Rooms.FindAsync(roomId);
            if (room == null)
            {
                return NotFound();
            }

            room.Status = status;  // Update room status to "Not Available"
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("getPrice/{roomId}")]
        public IActionResult GetRoomPrice(int roomId)
        {
            try
            {
                // Fetch room details using roomId
                var room = _context.Rooms.FirstOrDefault(r => r.RoomId == roomId);

                if (room == null)
                {
                    return NotFound("Room not found");
                }

                // Return only the room price
                return Ok(new { price = room.Price });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        private bool RoomExists(int id)
        {
            return _context.Rooms.Any(e => e.RoomId == id);
        }
    }
}
