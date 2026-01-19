import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  imports: [],
  templateUrl: './admin-home.html',
  styleUrl: './admin-home.css'
})
export class AdminHome {
  stats = [
    { title: 'Total Users', value: '1,234', change: '+12%' },
    { title: 'Active Jobs', value: '56', change: '+5%' },
    { title: 'Applications', value: '892', change: '+23%' },
    { title: 'Revenue', value: '$12,345', change: '+8%' }
  ];
}
