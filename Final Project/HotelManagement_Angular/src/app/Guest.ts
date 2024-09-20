export interface Guest {
    guestId: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    preferences: string;
    dateCreated: Date;
    reservations: any[];
  }
  