import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import * as FileSaver from 'file-saver';
import { CommonModule } from '@angular/common';
import { HotelService } from '../hotel.service';
import { Router, RouterLink } from '@angular/router';



@Component({
  selector: 'app-report-component',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './report-component.component.html',
  styleUrl: './report-component.component.css'
})
export class ReportComponentComponent {
  report: any;
  
  
  loading: boolean = false;


  constructor(private http: HttpClient,private service: HotelService,private router:Router) {}
  isLoggedIn(): boolean {
    // Implement your authentication check logic here
    return !!localStorage.getItem('token');  // Example logic
  }
  onLogout(): void {
    // Perform logout operation
    localStorage.removeItem('token');  // Remove token or user info
    this.router.navigate(['/login']);  // Navigate to login page after logout
  }
  // Function to generate the daily report
  generateReport(): void {
    this.loading = true;
    this.service.getReport().subscribe(
      (data: any) => {
        this.report = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error generating report', error);
        this.loading = false;
      }
    );
  }
  

  // Function to download the report in the desired format
  downloadReport(format: string): void {
    if (!this.report) {
      return;
    }

    if (format === 'pdf') {
      this.downloadPDF();
    } else if (format === 'word') {
      this.downloadWord();
    }
  }

  // Generate PDF report
  downloadPDF(): void {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Daily Report', 10, 10);
    doc.setFontSize(12);
    doc.text(`Date: ${this.report.date}`, 10, 20);
    doc.text(`Total Reservations: ${this.report.totalReservations}`, 10, 30);
    doc.text(`Total Revenue: $${this.report.totalRevenue}`, 10, 40);
    doc.text(`Occupancy Rate: ${this.report.occupancyRate}`, 10, 50);

    doc.text('Reservation Status Breakdown:', 10, 60);
    doc.text(`Confirmed: ${this.report.statusBreakdown.confirmed}`, 10, 70);
    doc.text(`Cancelled: ${this.report.statusBreakdown.cancelled}`, 10, 80);
    doc.text(`Other: ${this.report.statusBreakdown.other}`, 10, 90);

    // Save PDF
    doc.save('daily_report.pdf');
  }

  // Generate Word report
  downloadWord(): void {
    const content = `
      Daily Report
      Date: ${this.report.date}
      Total Reservations: ${this.report.totalReservations}
      Total Revenue: $${this.report.totalRevenue}
      Occupancy Rate: ${this.report.occupancyRate}

      Reservation Status Breakdown:
      - Confirmed: ${this.report.statusBreakdown.confirmed}
      - Cancelled: ${this.report.statusBreakdown.cancelled}
      - Other: ${this.report.statusBreakdown.other}
    `;

    const blob = new Blob([content], { type: 'application/msword' });
    FileSaver.saveAs(blob, 'daily_report.doc');
  }
}
