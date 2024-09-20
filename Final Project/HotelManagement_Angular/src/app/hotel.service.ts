import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Guest } from './Guest';
import { Inventory } from './Inventory';
import { User } from './User';
import { Room } from './Room';
import { MaintenanceRequest } from './MaintenanceRequest';
import { HouseKeepingTask } from './HouseKeepingTask';
import { Reservation } from './Reservation';
import { Payment } from './Payment';



@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private apiurl="https://localhost:7212/api/Rooms"
  private guesturl="https://localhost:7212/api/Guests";
  private reporturl="https://localhost:7212/api/Reports";
  private invenurl="https://localhost:7212/api/Inventories";
  private userurl="https://localhost:7212/api/Users";
  private mainurl="https://localhost:7212/api/MaintenanceRequests";
  private houseurl="https://localhost:7212/api/HousekeepingTasks";
  private reserurl="https://localhost:7212/api/Reservations";
  private payurl="https://localhost:7212/api/Payments";
  constructor(private http:HttpClient) { }
  get():Observable<any>{
    return this.http.get<any[]>(this.apiurl);
  }
  getbyid(id:number):Observable<any>{
    return this.http.get(`${this.apiurl}/${id}`);
  }
  postGuest(guest:Guest):Observable<any>{
    return this.http.post<any>(`${this.guesturl}`,guest);
  }
  postInventory(inven:Inventory):Observable<any>{
    return this.http.post<any>(`${this.invenurl}`,inven);
  }
  postUser(user:User):Observable<any>{
    return this.http.post<any>(`${this.userurl}`,user);
  }
  postRoom(room:Room):Observable<any>{
    return this.http.post<any>(`${this.apiurl}`,room);
  }
  postMaintenance(main:MaintenanceRequest):Observable<any>{
    return this.http.post<any>(`${this.mainurl}`,main);
  }
  postHouseKeepingTask(house:HouseKeepingTask):Observable<any>{
    return this.http.post<any>(`${this.houseurl}`,house);
  }
  postReservation(reservation:Reservation):Observable<any>{
    return this.http.post<any>(`${this.reserurl}`,reservation);
  }
  postPayment(pay:Payment):Observable<any>{
    return this.http.post<any>(`${this.payurl}`,pay);
  }
  getReport(): Observable<any> {
    return this.http.get<any>(this.reporturl + "/generateDailyReport");
  }
  getRoomReport(): Observable<any> {
    return this.http.get<any>(this.reporturl + "/roomAvailabilityReport");
  }
  getRoomPrice(id:number):Observable<any>{
    return this.http.get(`${this.apiurl}/getPrice/${id}`);
  }
  getAllInventory():Observable<any>{
    return this.http.get<any[]>(this.invenurl);
  }
  getAllReservation():Observable<any>{
    return this.http.get<any[]>(this.reserurl);
  }
  getAllUser():Observable<any>{
    return this.http.get<any[]>(this.userurl);
  }
  getAllGuest():Observable<any>{
    return this.http.get<any[]>(this.guesturl);
  }
  getAllMaintenanceRequest():Observable<any>{
    return this.http.get<any[]>(this.mainurl);
  }
  getAllTask():Observable<any>{
    return this.http.get<any[]>(this.houseurl);
  }
  getAllPayment():Observable<any>{
    return this.http.get<any[]>(this.payurl);
  }
  getPendingTask():Observable<any>{
    return this.http.get<any[]>(this.houseurl+"/getPendingHousekeepingTasks");
  }
  getAllHouseKeepingUser():Observable<any>{
    return this.http.get<any[]>(this.userurl+"/housekeeping");
  }
  getuserbyid(id:number):Observable<any>{
    return this.http.get(`${this.userurl}/${id}`);
  }
  getguestbyid(id:number):Observable<any>{
    return this.http.get(`${this.guesturl}/${id}`);
  }
  getinventorybyid(id:number):Observable<any>{
    return this.http.get(`${this.invenurl}/${id}`);
  }
  getreservationbyid(id:number):Observable<any>{
    return this.http.get(`${this.reserurl}/${id}`);
  }
  getalltaskbyid(id:number):Observable<any>{
    return this.http.get<any[]>(`${this.houseurl}/getTasksByStaff/${id}`);
  }
  editInventory(id:number,inven: Inventory): Observable<Inventory> {
    return this.http.put<Inventory>(`${this.invenurl}/${id}`,inven);
  }
  editUser(id:number,user: User): Observable<Inventory> {
    return this.http.put<Inventory>(`${this.userurl}/${id}`,user);
  }
  editGuest(id:number,guest: Guest): Observable<Guest> {
    return this.http.put<Guest>(`${this.guesturl}/${id}`,guest);
  }
  editRoom(id:number,room: Room): Observable<Room> {
    return this.http.put<Room>(`${this.apiurl}/${id}`,room);
  }
  editReservation(id:number,reservation: Reservation): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.reserurl}/${id}`,reservation);
  }
  editRoomStatus(id:number,status:string):Observable<Room>{
    return this.http.put<Room>(`${this.apiurl}/updateRoomStatus/${id}/${status}`,'');
  }
  editTaskStatus(id:number):Observable<any>{
    return this.http.put(`${this.houseurl}/completeTask/${id}`,{});
  }
  deleteInventory(id:number):Observable<any>
  {
    return this.http.delete<any>(`${this.invenurl}/${id}`)
  }
  deleteUser(id:number):Observable<any>
  {
    return this.http.delete<any>(`${this.userurl}/${id}`)
  }
  deleteRoom(id:number):Observable<any>
  {
    return this.http.delete<any>(`${this.apiurl}/${id}`)
  }
  deleteGuest(id:number):Observable<any>
  {
    return this.http.delete<any>(`${this.guesturl}/${id}`)
  }
  
}
