import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PendingProduct } from '../../services/admin.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog.component';
import { RejectDialogComponent } from '../dialogs/reject-dialog.component';

@Component({
  selector: 'app-ordermatrice',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './ordermatrice.component.html',
  styleUrl: './ordermatrice.component.scss'
})
export class OrdermatriceComponent {
  @Input() pendingProducts: PendingProduct[] = [];
  @Output() approve = new EventEmitter<number>();
  @Output() reject = new EventEmitter<{productId: number, reason: string}>();

  constructor(private dialog: MatDialog) {}

  approveProduct(productId: number): void {
    // Confirmation avant approbation
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { 
        title: 'Confirmer l\'approbation',
        message: 'Voulez-vous vraiment approuver cette photo ?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.approve.emit(productId);
      }
    });
  }

  rejectProduct(productId: number): void {
    // Dialog pour saisir la raison du rejet
    const dialogRef = this.dialog.open(RejectDialogComponent);

    dialogRef.afterClosed().subscribe(reason => {
      if (reason) {
        this.reject.emit({ productId, reason });
      }
    });
  }
}
