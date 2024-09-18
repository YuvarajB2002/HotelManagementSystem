using Microsoft.EntityFrameworkCore;

namespace HotelManagement.Model
{
    public class HotelDbContext : DbContext
    {
        public HotelDbContext(DbContextOptions<HotelDbContext> options) : base(options)
        {
        }

        // DbSets for each table
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Guest> Guests { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Inventory> Inventories { get; set; }
        public DbSet<MaintenanceRequest> MaintenanceRequests { get; set; }
        public DbSet<HousekeepingTask> HousekeepingTasks { get; set; }
        public DbSet<Report> Reports { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure relationships and constraints

            // Users-Reservations relationship
            modelBuilder.Entity<Reservation>()
                .HasOne(r => r.CreatedByUser)
                .WithMany(u => u.Reservations)
                .HasForeignKey(r => r.CreatedByUserId);

            // Rooms-Reservations relationship
            modelBuilder.Entity<Reservation>()
                .HasOne(r => r.Room)
                .WithMany(room => room.Reservations)
                .HasForeignKey(r => r.RoomId);

            // Guests-Reservations relationship
            modelBuilder.Entity<Reservation>()
                .HasOne(r => r.Guest)
                .WithMany(g => g.Reservations)
                .HasForeignKey(r => r.GuestId);

            // Maintenance Requests relationships

            //modelBuilder.Entity<MaintenanceRequest>()
            //    .HasOne(mr => mr.ReportedByStaff)
            //    .WithMany(u => u.MaintenanceRequests)
            //    .HasForeignKey(mr => mr.ReportedByStaffId);

            modelBuilder.Entity<MaintenanceRequest>()
                .HasOne(mr => mr.AssignedMaintenanceStaff)
                .WithMany(u => u.MaintenanceRequests)
                .HasForeignKey(mr => mr.AssignedMaintenanceStaffId);

            // Housekeeping Tasks relationship
            modelBuilder.Entity<HousekeepingTask>()
                .HasOne(ht => ht.AssignedStaff)
                .WithMany(u => u.HousekeepingTasks)
                .HasForeignKey(ht => ht.AssignedStaffId);

            // Payments relationship
            modelBuilder.Entity<Payment>()
                .HasOne(p => p.Reservation)
                .WithMany(r => r.Payments)
                .HasForeignKey(p => p.ReservationId);

            // Reports relationship
            modelBuilder.Entity<Report>()
                .HasOne(r => r.GeneratedByStaff)
                .WithMany(u => u.Reports)
                .HasForeignKey(r => r.GeneratedByStaffId);
        }
    }

}
