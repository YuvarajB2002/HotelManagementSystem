export interface Room{
    roomId: number;
    roomNumber: string;
    roomType: string;
    price: number;
    status: string;
    description: string;
    capacity: number;
    dateCreated: Date;
    ac: boolean;
    roomImage: string;
    reservations: any[];
}