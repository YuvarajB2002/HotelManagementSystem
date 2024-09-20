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
    public class HousekeepingTasksController : ControllerBase
    {
        private readonly HotelDbContext _context;

        public HousekeepingTasksController(HotelDbContext context)
        {
            _context = context;
        }

        // GET: api/HousekeepingTasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HousekeepingTask>>> GetHousekeepingTasks()
        {
            return await _context.HousekeepingTasks.Include(r=>r.Room).Include(u=>u.AssignedStaff).ToListAsync();
        }

        // GET: api/HousekeepingTasks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<HousekeepingTask>> GetHousekeepingTask(int id)
        {
            var housekeepingTask = await _context.HousekeepingTasks.Include(r => r.Room)
                .Include(u => u.AssignedStaff).FirstOrDefaultAsync(r=>r.TaskId==id);

            if (housekeepingTask == null)
            {
                return NotFound();
            }

            return housekeepingTask;
        }

        // PUT: api/HousekeepingTasks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHousekeepingTask(int id, HousekeepingTask housekeepingTask)
        {
            if (id != housekeepingTask.TaskId)
            {
                return BadRequest();
            }

            _context.Entry(housekeepingTask).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HousekeepingTaskExists(id))
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

        // POST: api/HousekeepingTasks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<HousekeepingTask>> PostHousekeepingTask(HousekeepingTask housekeepingTask)
        {
            _context.HousekeepingTasks.Add(housekeepingTask);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHousekeepingTask", new { id = housekeepingTask.TaskId }, housekeepingTask);
        }

        // DELETE: api/HousekeepingTasks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHousekeepingTask(int id)
        {
            var housekeepingTask = await _context.HousekeepingTasks.FindAsync(id);
            if (housekeepingTask == null)
            {
                return NotFound();
            }

            _context.HousekeepingTasks.Remove(housekeepingTask);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("assignHousekeepingTask")]
        public async Task<IActionResult> AssignHousekeepingTask([FromBody] HousekeepingTask task)
        {
            var room = await _context.Rooms.FindAsync(task.RoomId);
            var staff = await _context.Users.FindAsync(task.AssignedStaffId);

            if (room == null)
            {
                return NotFound("Room not found.");
            }

            if (staff == null || staff.Role != "Housekeeping")
            {
                return BadRequest("Invalid staff member.");
            }

            task.TaskStatus = "Pending"; // Initial status
            task.TaskDate = DateTime.Now;

            _context.HousekeepingTasks.Add(task);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Housekeeping task assigned successfully." });
        }

        [HttpGet("getHousekeepingTasksByRoom/{roomId}")]
        public async Task<IActionResult> GetHousekeepingTasksByRoom(int roomId)
        {
            var tasks = await _context.HousekeepingTasks
                .Where(ht => ht.RoomId == roomId)
                .ToListAsync();

            if (!tasks.Any())
            {
                return NotFound("No housekeeping tasks found for the specified room.");
            }

            return Ok(tasks);
        }

        [HttpPut("updateHousekeepingTaskStatus/{taskId}")]
        public async Task<IActionResult> UpdateHousekeepingTaskStatus(int taskId, [FromBody] string status)
        {
            var task = await _context.HousekeepingTasks.FindAsync(taskId);

            if (task == null)
            {
                return NotFound("Housekeeping task not found.");
            }

            task.TaskStatus = status;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Housekeeping task status updated.", taskId, newStatus = status });
        }

        [HttpGet("getPendingHousekeepingTasks")]
        public async Task<IActionResult> GetPendingHousekeepingTasks()
        {
            var pendingTasks = await _context.HousekeepingTasks
                .Where(ht => ht.TaskStatus == "Pending")
                .ToListAsync();

            if (!pendingTasks.Any())
            {
                return NotFound("No pending housekeeping tasks found.");
            }

            return Ok(pendingTasks);
        }
        [HttpPut("completeTask/{taskId}")]
        public async Task<IActionResult> CompleteTask(int taskId)
        {
            // Retrieve the task from the database
            var task = await _context.HousekeepingTasks.FindAsync(taskId);

            if (task == null)
            {
                return NotFound("Housekeeping task not found.");
            }

            // Update the task status to "Completed"
            task.TaskStatus = "Completed";

            // Check if there's a maintenance request associated with this task
            var maintenanceRequests = await _context.MaintenanceRequests
                .Where(mr => mr.RoomId == task.RoomId && mr.MaintenanceStatus != "Completed")
                .ToListAsync();

            foreach (var request in maintenanceRequests)
            {
                request.MaintenanceStatus = "Completed";
            }

            // Save changes to the database
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HousekeepingTaskExists(taskId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(new { message = "Housekeeping task and associated maintenance requests updated to completed." });
        }
        [HttpGet("getTasksByStaff/{staffId}")]
        public async Task<IActionResult> GetTasksByStaff(int staffId)
        {
            // Find the staff member by their ID
            var staff = await _context.Users.FindAsync(staffId);

            if (staff == null)
            {
                return NotFound("Staff member not found.");
            }

            // Fetch housekeeping tasks assigned to the staff member
            var tasks = await _context.HousekeepingTasks
                .Include(ht => ht.Room)  // Optionally include related room details
                .Where(ht => ht.AssignedStaffId == staffId)
                .ToListAsync();

            if (!tasks.Any())
            {
                return NotFound("No housekeeping tasks found for this staff member.");
            }

            return Ok(tasks);
        }


        private bool HousekeepingTaskExists(int id)
        {
            return _context.HousekeepingTasks.Any(e => e.TaskId == id);
        }
    }
}
