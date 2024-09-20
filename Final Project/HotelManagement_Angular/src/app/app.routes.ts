import { Routes } from '@angular/router';
import { LogincomponentComponent } from './logincomponent/logincomponent.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { RoomComponentComponent } from './room-component/room-component.component';
import { RoomDetailsComponentComponent } from './room-details-component/room-details-component.component';

import { roleGuard } from './role.guard';
import { AdminComponentComponent } from './admin-component/admin-component.component';
import { authGuard } from './auth.guard';
import { StaffComponentComponent } from './staff-component/staff-component.component';
import { HouseKeepingComponentComponent } from './house-keeping-component/house-keeping-component.component';
import { BookComponentComponent } from './book-component/book-component.component';
import { ReportComponentComponent } from './report-component/report-component.component';
import { InventoryComponentComponent } from './inventory-component/inventory-component.component';
import { InventoryListComponentComponent } from './inventory-list-component/inventory-list-component.component';
import { InventoryEditComponentComponent } from './inventory-edit-component/inventory-edit-component.component';
import { InventoryDeleteComponentComponent } from './inventory-delete-component/inventory-delete-component.component';
import { UserAddComponentComponent } from './user-add-component/user-add-component.component';
import { UserListComponentComponent } from './user-list-component/user-list-component.component';
import { UserEditComponentComponent } from './user-edit-component/user-edit-component.component';
import { UserDeleteComponentComponent } from './user-delete-component/user-delete-component.component';
import { RoomEditComponentComponent } from './room-edit-component/room-edit-component.component';
import { RoomDeleteComponentComponent } from './room-delete-component/room-delete-component.component';
import { RoomAddComponentComponent } from './room-add-component/room-add-component.component';
import { MaintenanceRequestComponent } from './maintenance-request/maintenance-request.component';
import { MaintenanceListComponent } from './maintenance-list/maintenance-list.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskPendingComponent } from './task-pending/task-pending.component';
import { GuestListComponentComponent } from './guest-list-component/guest-list-component.component';
import { GuestEditComponentComponent } from './guest-edit-component/guest-edit-component.component';
import { GuestDeleteComponentComponent } from './guest-delete-component/guest-delete-component.component';
import { ReservationComponentComponent } from './reservation-component/reservation-component.component';
import { PaymentCalculationComponent } from './payment-calculation/payment-calculation.component';
import { PaymentListComponentComponent } from './payment-list-component/payment-list-component.component';

export const routes: Routes = [
    {path:'',component:HomeComponentComponent},
    {path:'login',component:LogincomponentComponent},
    //{path:"roomlist",component:RoomComponentComponent},
    {path:'room-details/:id',component: RoomDetailsComponentComponent},
    {path:'book-room/:id',component:BookComponentComponent},
    { path: 'reports', 
      component: ReportComponentComponent,
      canActivate:[roleGuard],
      data:{requiredRole: 'Admin'}
     },
     { path: 'inventory', 
      component: InventoryComponentComponent,
      canActivate:[roleGuard],
      data:{requiredRole: 'Admin'}
     },
    {
        path: 'roomlist',
        component: RoomComponentComponent,
        canActivate: [authGuard] // Apply RoleGuard here
      },
      {
        path:'admin',
        component:AdminComponentComponent,
        canActivate:[roleGuard],
        data:{requiredRole: 'Admin'}
      },
      {
        path:'staff',
        component:StaffComponentComponent,
        canActivate:[authGuard]
      },
      {
        path:'housekeeping',
        component:HouseKeepingComponentComponent,
        canActivate:[authGuard]
      },
      {
        path:'inventory-list',
        component:InventoryListComponentComponent,
        canActivate:[roleGuard],
        data:{requiredRole: 'Admin'}
      },
      {
        path:'inventory-edit/:id',
        component:InventoryEditComponentComponent,
        canActivate:[roleGuard],
        data:{requiredRole: 'Admin'}
      },
      {
        path:'inventory-delete/:id',
        component:InventoryDeleteComponentComponent,
        canActivate:[roleGuard],
        data:{requiredRole: 'Admin'}
      },
      {
        path:'add-user',
        component:UserAddComponentComponent,
        canActivate:[roleGuard],
        data:{requiredRole: 'Admin'}
      },
      {
        path:'user-list',
        component:UserListComponentComponent,
        canActivate:[roleGuard],
        data:{requiredRole: 'Admin'}
      },
      {
        path:'user-edit/:id',
        component:UserEditComponentComponent,
        canActivate:[roleGuard],
        data:{requiredRole: 'Admin'}
      },
      {
        path:'user-delete/:id',
        component:UserDeleteComponentComponent,
        canActivate:[roleGuard],
        data:{requiredRole: 'Admin'}
      },
      {
        path:'room-edit/:id',
        component:RoomEditComponentComponent,
        canActivate:[roleGuard],
        data:{requiredRole: 'Admin'}
      },
      {
        path:'room-delete/:id',
        component:RoomDeleteComponentComponent,
        canActivate:[roleGuard],
        data:{requiredRole: 'Admin'}
      },
      {
        path:'add-room',
        component:RoomAddComponentComponent,
        canActivate:[roleGuard],
        data:{requiredRole: 'Admin'}
      },
      {
        path:'maintenace-request/:id',
        component:MaintenanceRequestComponent,
        canActivate:[roleGuard],
        data:{requiredRole: 'Admin'}
      },
      {
        path:'maintenance-list',
        component:MaintenanceListComponent,
        canActivate:[roleGuard],
        data:{requiredRole: 'Admin'}
      },
      {
        path:'task-list/:id',
        component:TaskListComponent,
      
      },
      {
        path:'task-pendinglist',
        component:TaskPendingComponent,
        canActivate:[roleGuard],
        data:{requiredRole: 'HouseKeeping'}
      },
      {
        path:'guest-list',
        component:GuestListComponentComponent,
        canActivate:[roleGuard],
        data:{requiredRole:'Staff'}
      },
      {
        path:'guest-edit/:id',
        component:GuestEditComponentComponent,
        canActivate:[roleGuard],
        data:{requiredRole:'Staff'}
      },
      {
        path:'guest-delete/:id',
        component:GuestDeleteComponentComponent,
        canActivate:[roleGuard],
        data:{requiredRole:'Staff'}
      },
      {
        path:'reservation-list',
        component:ReservationComponentComponent,
        canActivate:[roleGuard],
        data:{requiredRole:'Staff'}
      },
      {
        path:'payment-calculation',
        component:PaymentCalculationComponent,
        canActivate:[roleGuard],
        data:{requiredRole:'Staff'}
      },
      {
        path:'payment-list',
        component:PaymentListComponentComponent,
        canActivate:[roleGuard],
        data:{requiredRole:'Staff'}
      }
      

];
