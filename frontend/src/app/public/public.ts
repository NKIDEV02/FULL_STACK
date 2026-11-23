import { Component } from '@angular/core';
import { Header } from './core/components/header/header';
import { Footer } from './core/components/footer/footer';
import { RouterModule } from '@angular/router';

@Component({
  imports: [
    Header,
    Footer,
    RouterModule
  ],
  selector: 'app-public',
  styleUrl: './public.css',
  templateUrl: './public.html',
})
export class Public {}
