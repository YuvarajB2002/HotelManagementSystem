export interface MaintenanceRequest {
    RequestId: number;
    RoomId: number;
    assignedMaintenanceStaffId: number;
    assignedMaintenanceStaffName?: string;
    IssueDescription: string;
    MaintenanceStatus: string;
    RequestDate: Date;
    ScheduledDate: Date;
  }
  