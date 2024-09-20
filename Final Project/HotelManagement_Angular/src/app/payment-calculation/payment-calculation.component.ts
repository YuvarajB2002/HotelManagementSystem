import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Payment } from '../Payment';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HotelService } from '../hotel.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Packer, Document, Paragraph, TextRun } from "docx";

@Component({
  selector: 'app-payment-calculation',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './payment-calculation.component.html',
  styleUrl: './payment-calculation.component.css'
})
export class PaymentCalculationComponent {
  payment: Payment = {
    paymentId: 0,
    reservationId: 0,
    paymentAmount: 0,
    paymentMethod: '',
    paymentStatus: '',
    paymentDate: new Date
  }
  reservation: any;
  showBill: boolean = false; // Control whether the bill card is shown
  minCheckOutDate: string = '';
  checkOutDate: Date = new Date;
  guest:any
  constructor(
    private route: ActivatedRoute,
    private apiser: HotelService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.minCheckOutDate = new Date().toISOString().split('T')[0];

    this.route.queryParams.subscribe(params => {
      const roomId = params['roomId'];
      const checkInDate = new Date(params['checkInDate']);
      this.payment.reservationId = params['reservationId'];

      this.apiser.getRoomPrice(roomId).subscribe(room => {
        const roomPrice = room.price;
        const days = Math.ceil((this.checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24));
        this.payment.paymentAmount = days * roomPrice;
      });
    });
    this.apiser.getreservationbyid(this.payment.reservationId).subscribe(
      (response) => {
        this.reservation = response;
      }
    );
  }

  submitPayment() {
    this.payment.paymentStatus = "Success";
    this.apiser.postPayment(this.payment).subscribe(
      (response) => {
        this.reservation.checkOutDate = this.checkOutDate;
        this.reservation.totalAmount = this.payment.paymentAmount;
        this.reservation.paymentStatus = this.payment.paymentStatus;

        this.apiser.editReservation(this.payment.reservationId, this.reservation).subscribe(
          (response) => {
            this.apiser.editRoomStatus(this.reservation.roomId, 'Available').subscribe(
              (response) => {
                this.apiser.getguestbyid(this.reservation.guestId).subscribe(
                  (response) => {
                    this.guest = response;
                  }
                );
                this.showBill = true; // Show the bill card
              }
            );
          }
        );
      }
    );
  }

  // Generate PDF
  downloadPDF() {
    const element = document.getElementById('billCard'); // Select the element to convert to PDF
    html2canvas(element!).then((canvas) => {
      const imgData = canvas.toDataURL('image/png'); // Convert the canvas to PNG image format (Base64)
      
      const pdf = new jsPDF(); // Create a new jsPDF instance
  
      // Calculate the dimensions of the image for the PDF
      const imgWidth = 190; // Adjust according to your requirements (PDF width is ~210mm for A4)
      const imgHeight = canvas.height * imgWidth / canvas.width; // Maintain aspect ratio
  
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight); // Add the image to the PDF
      pdf.save('payment-bill.pdf'); // Save the generated PDF as 'payment-bill.pdf'
    });
  }

  // Generate DOCX
  downloadDOC() {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [
                new TextRun("Payment Bill"),
                new TextRun(`\nGuest Name: ${this.reservation.guestName}`),
                new TextRun(`\nCheck-In Date: ${this.reservation.checkInDate}`),
                new TextRun(`\nCheck-Out Date: ${this.checkOutDate}`),
                new TextRun(`\nTotal Amount: ${this.payment.paymentAmount}`),
                new TextRun(`\nPayment Method: ${this.payment.paymentMethod}`)
              ]
            })
          ]
        }
      ]
    });

    Packer.toBlob(doc).then(blob => {
      const a = document.createElement('a');
      const url = URL.createObjectURL(blob);
      a.href = url;
      a.download = 'payment-bill.docx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }
}
