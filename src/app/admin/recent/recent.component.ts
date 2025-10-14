import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

interface ModerationAction {
  id: number;
  productTitle: string;
  moderatorName: string;
  action: 'APPROVED' | 'REJECTED';
  date: string;
  reason?: string;
}

@Component({
  selector: 'app-recent',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './recent.component.html',
  styleUrl: './recent.component.scss'
})
export class RecentComponent {
  @Input() recentItems: ModerationAction[] = [];
  @Input() title: string = 'Actions Récentes';

  getActionColor(action: 'APPROVED' | 'REJECTED'): string {
    return action === 'APPROVED' ? '#4CAF50' : '#f44336';
  }

  getActionIcon(action: 'APPROVED' | 'REJECTED'): string {
    return action === 'APPROVED' ? 'check_circle' : 'cancel';
  }
  
  getTimeAgo(date: string): string {
    const now = new Date();
    const actionDate = new Date(date);
    const diffInMinutes = Math.floor((now.getTime() - actionDate.getTime()) / (1000 * 60));

    if (diffInMinutes < 60) return `il y a ${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''}`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `il y a ${diffInHours} heure${diffInHours > 1 ? 's' : ''}`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `il y a ${diffInDays} jour${diffInDays > 1 ? 's' : ''}`;
  }
}
