import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { FacilitiesComponent } from './components/facilities/facilities.component';
import { CuisineComponent } from './components/cuisine/cuisine.component';
import { SpaComponent } from './components/spa/spa.component';
import { AmenitiesComponent } from './components/amenities/amenities.component';
import { ExperiencesComponent } from './components/experiences/experiences.component';
import { StayOffersComponent } from './components/stay-offers/stay-offers.component';
import { LocationComponent } from './components/location/location.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { MyReservationsComponent } from './components/my-reservations/my-reservations.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard.component';
import { AdminReportsComponent } from './components/admin/admin-reports.component';
import { authGuard, adminGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'rooms', component: RoomsComponent },
  { path: 'facilities', component: FacilitiesComponent },
  { path: 'cuisine', component: CuisineComponent },
  { path: 'spa', component: SpaComponent },
  { path: 'amenities', component: AmenitiesComponent },
  { path: 'experiences', component: ExperiencesComponent },
  { path: 'stay-offers', component: StayOffersComponent },
  { path: 'stayOffers', redirectTo: 'stay-offers' },
  { path: 'location', component: LocationComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: 'my-reservations', component: MyReservationsComponent, canActivate: [authGuard] },
  { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [adminGuard] },
  { path: 'admin/reports', component: AdminReportsComponent, canActivate: [adminGuard] },
  { path: '**', redirectTo: '' }
];
