import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  isDashboardRoot(): boolean {
    return this.router.url === '/dashboard';
  }

  openInventoryModal() {
    $('#inventoryModal').modal('show'); // Abre el modal
  }
}
