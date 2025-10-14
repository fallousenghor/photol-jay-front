import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reject-dialog',
  standalone: true,
  imports: [
    CommonModule, 
    MatDialogModule, 
    MatButtonModule, 
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  template: `
    <h2 mat-dialog-title>Rejeter la photo</h2>
    <mat-dialog-content>
      <mat-form-field appearance="fill" style="width: 100%">
        <mat-label>Raison du rejet</mat-label>
        <textarea
          matInput
          [(ngModel)]="reason"
          placeholder="Expliquez pourquoi cette photo ne peut pas être approuvée..."
          rows="4">
        </textarea>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Annuler</button>
      <button mat-raised-button color="warn" [disabled]="!reason.trim()" (click)="onSubmit()">
        Rejeter
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    :host {
      display: block;
      padding: 1rem;
      min-width: 400px;
    }

    mat-dialog-content {
      margin: 1rem 0;
    }

    mat-dialog-actions {
      padding: 1rem 0 0;
    }
  `]
})
export class RejectDialogComponent {
  reason = '';

  constructor(public dialogRef: MatDialogRef<RejectDialogComponent>) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.reason.trim()) {
      this.dialogRef.close(this.reason);
    }
  }
}