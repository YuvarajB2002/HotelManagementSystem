export interface Inventory {
   inventoryId:number
    itemName: string;
    quantity: number;
    reorderLevel: number;
    lastRestockedDate: Date;
    supplier: string;
  }
  