import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService, UserStaff } from '../../services/user.service';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <!-- Header Admin Back-Office -->
    <header class="miyabi-admin-navbar">
      <div class="d-flex align-items-center gap-4">
        <a routerLink="/admin/dashboard" class="miyabi-admin-brand">
          <span class="kanji-logo">雅</span>
          <span class="brand-title">MIYABI</span>
          <span class="brand-badge">Back-office</span>
        </a>

        <ul class="miyabi-admin-nav">
          <li class="miyabi-admin-nav-item">
            <a routerLink="/admin/dashboard" class="nav-link-miyabi">
              <i class="bi bi-grid-1x2-fill"></i> Dashboard
            </a>
          </li>
          <li class="miyabi-admin-nav-item">
            <a routerLink="/admin/rooms" class="nav-link-miyabi">
              <i class="bi bi-door-open-fill"></i> Habitaciones
            </a>
          </li>
          <li class="miyabi-admin-nav-item">
            <a routerLink="/admin/room-types" class="nav-link-miyabi">
              <i class="bi bi-tags-fill"></i> Tarifas & Suites
            </a>
          </li>
          <li class="miyabi-admin-nav-item">
            <a routerLink="/admin/users" class="nav-link-miyabi active">
              <i class="bi bi-people-fill"></i> Personal
            </a>
          </li>
          <li class="miyabi-admin-nav-item">
            <a routerLink="/admin/movements" class="nav-link-miyabi">
              <i class="bi bi-clock-history"></i> Movimientos
            </a>
          </li>
        </ul>
      </div>

      <div class="admin-navbar-actions">
        <div class="admin-profile-pill">
          <span class="admin-avatar">A</span>
          <div class="admin-user-info">
            <span class="admin-name">Admin Ryokan</span>
            <span class="admin-role">Administrador</span>
          </div>
        </div>

        <a routerLink="/" class="btn-view-site">
          <i class="bi bi-box-arrow-up-right"></i> VER PORTAL WEB
        </a>
      </div>
    </header>

    <main class="miyabi-admin-container">
      <div class="miyabi-page-header">
        <div>
          <h1 class="miyabi-page-title">Personal y Accesos Ryokan</h1>
          <p class="miyabi-page-subtitle">Administración de usuarios de sistema, asignación de roles operativos y control de cuentas.</p>
        </div>
        <div>
          <button class="btn-miyabi btn-miyabi-enji" (click)="openCreateModal()">
            <i class="bi bi-person-plus-fill"></i> Nuevo Personal
          </button>
        </div>
      </div>

      <!-- Tabla Ryokan de Personal -->
      <div class="miyabi-card-table">
        <div class="miyabi-card-header">
          <div class="d-flex align-items-center gap-3">
            <h2 class="miyabi-card-title">
              <i class="bi bi-people me-2" style="color: var(--color-asagi);"></i>Directorio de Personal Registrado
            </h2>
            <span class="miyabi-badge badge-active">{{ filteredUsers.length }} Miembros</span>
          </div>

          <div class="table-search-box">
            <i class="bi bi-search"></i>
            <input type="text" [(ngModel)]="searchQuery" (input)="filterUsers()" placeholder="Buscar por nombre, correo o rol..." />
          </div>
        </div>

        <div class="table-responsive">
          <table class="miyabi-table">
            <thead>
              <tr>
                <th>Miembro de Personal</th>
                <th>Correo / Usuario</th>
                <th>Rol Operativo</th>
                <th>Estado de Cuenta</th>
                <th class="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              @for (u of filteredUsers; track getUserId(u) || u.email) {
                <tr>
                  <td>
                    <div class="d-flex align-items-center gap-3">
                      <div class="user-avatar-circle">
                        {{ getInitials(u.names) }}
                      </div>
                      <div>
                        <div class="fw-semibold text-dark">{{ u.names }} {{ u.surnames }}</div>
                        <div class="text-muted small">ID #{{ getUserId(u) }}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span class="code-identifier fs-6">{{ u.email }}</span>
                  </td>
                  <td>
                    <span class="miyabi-badge badge-active">{{ u.rol?.nameRol || 'Personal' }}</span>
                  </td>
                  <td>
                    <span class="miyabi-badge" [ngClass]="u.state === 1 ? 'badge-confirmed' : 'badge-cancelled'">
                      {{ u.state === 1 ? 'Activo' : 'Inactivo' }}
                    </span>
                  </td>
                  <td class="text-end">
                    <div class="btn-group">
                      <button class="btn-miyabi btn-miyabi-outline btn-miyabi-sm me-1" (click)="openEditModal(u)">
                        <i class="bi bi-pencil"></i> Editar
                      </button>
                      <button class="btn-miyabi btn-miyabi-outline btn-miyabi-sm text-danger" (click)="deleteUser(getUserId(u))">
                        <i class="bi bi-trash"></i> Dar de baja
                      </button>
                    </div>
                  </td>
                </tr>
              }
              @if (filteredUsers.length === 0) {
                <tr>
                  <td colspan="5" class="text-center py-5 text-muted">
                    No hay usuarios registrados en el sistema.
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </main>

    <!-- Modal Formulario CRUD Personal -->
    @if (showModal) {
      <div class="modal-overlay">
        <div class="modal-card">
          <div class="modal-header">
            <h3>{{ isEditMode ? 'Editar Personal' : 'Registrar Nuevo Personal' }}</h3>
            <button class="close-btn" (click)="showModal = false">✕</button>
          </div>
          <form (ngSubmit)="saveUser()">
            <div class="form-group">
              <label>Nombres</label>
              <input type="text" [(ngModel)]="currentUser.names" name="names" required />
            </div>
            <div class="form-group">
              <label>Apellidos</label>
              <input type="text" [(ngModel)]="currentUser.surnames" name="surnames" required />
            </div>
            <div class="form-group">
              <label>Correo Electrónico (Usuario)</label>
              <input type="email" [(ngModel)]="currentUser.email" name="email" required />
            </div>
            <div class="form-group">
              <label>Contraseña</label>
              <input type="password" [(ngModel)]="currentUser.password" name="password" placeholder="Dejar en blanco para no modificar" />
            </div>
            <div class="form-group">
              <label>Rol Operativo</label>
              <select [(ngModel)]="selectedRoleId" name="selectedRoleId" required>
                <option [value]="1">Administrator (Administrador)</option>
                <option [value]="2">Receptionist (Recepcionista / Cajero)</option>
                <option [value]="3">Client (Cliente / Huésped)</option>
              </select>
            </div>
            <div class="form-group">
              <label>Estado de Cuenta</label>
              <select [(ngModel)]="currentUser.state" name="state" required>
                <option [value]="1">Activo</option>
                <option [value]="0">Inactivo / Dado de Baja</option>
              </select>
            </div>
            <div class="modal-actions">
              <button type="button" class="btn-miyabi btn-miyabi-outline" (click)="showModal = false">Cancelar</button>
              <button type="submit" class="btn-miyabi btn-miyabi-enji">Guardar Personal</button>
            </div>
          </form>
        </div>
      </div>
    }
  `,
  styles: [`
    .user-avatar-circle {
      width: 38px; height: 38px; border-radius: 50%;
      background: linear-gradient(135deg, var(--color-enji) 0%, var(--color-kinjiki) 100%);
      color: white; font-family: var(--font-serif); font-weight: 700;
      display: flex; align-items: center; justify-content: center;
    }
    .modal-overlay {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center;
      z-index: 2000;
    }
    .modal-card {
      background: white; padding: 30px; border-radius: 8px; width: 450px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }
    .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .close-btn { background: none; border: none; font-size: 18px; cursor: pointer; }
    .form-group { margin-bottom: 15px; }
    .form-group label { display: block; font-size: 12px; font-weight: 700; margin-bottom: 6px; }
    .form-group input, .form-group select { width: 100%; padding: 10px; border: 1px solid #CCC; border-radius: 4px; }
    .modal-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px; }
  `]
})
export class AdminUsersComponent implements OnInit {
  private userService = inject(UserService);

  users: UserStaff[] = [];
  filteredUsers: UserStaff[] = [];
  searchQuery = '';

  showModal = false;
  isEditMode = false;
  currentUser: Partial<UserStaff> = {};
  selectedRoleId: number = 1;

  ngOnInit() {
    this.loadData();
  }

  getUserId(user: UserStaff): number {
    return user.idUsuario || (user as any).idUser || 0;
  }

  loadData() {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.filteredUsers = [...data];
      },
      error: () => {
        this.users = [
          { idUsuario: 1, names: 'Rodrigo', surnames: 'Dalmagro López', email: 'onur@hotel.com', state: 1, rol: { rolId: 1, nameRol: 'Administrator' } },
          { idUsuario: 2, names: 'Christine', surnames: 'Chi Miller', email: 'potter@hotel.com', state: 1, rol: { rolId: 2, nameRol: 'Receptionist' } }
        ];
        this.filteredUsers = [...this.users];
      }
    });
  }

  filterUsers() {
    const q = this.searchQuery.toLowerCase();
    this.filteredUsers = this.users.filter(u =>
      !q ||
      u.names.toLowerCase().includes(q) ||
      u.surnames.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      (u.rol && u.rol.nameRol.toLowerCase().includes(q))
    );
  }

  getInitials(name?: string): string {
    return name ? name.substring(0, 1).toUpperCase() : 'M';
  }

  openCreateModal() {
    this.isEditMode = false;
    this.currentUser = { names: '', surnames: '', email: '', password: '', state: 1 };
    this.selectedRoleId = 1;
    this.showModal = true;
  }

  openEditModal(user: UserStaff) {
    this.isEditMode = true;
    this.currentUser = { ...user, password: '' };
    this.selectedRoleId = user.rol?.idRol || user.rol?.rolId || 1;
    this.showModal = true;
  }

  saveUser() {
    const roleNames: Record<number, string> = { 1: 'Administrator', 2: 'Receptionist', 3: 'Client' };
    const userId = this.getUserId(this.currentUser as UserStaff);
    const rolIdNum = Number(this.selectedRoleId);
    const userToSave: UserStaff = {
      idUsuario: userId || undefined,
      idUser: userId || undefined,
      names: this.currentUser.names || '',
      surnames: this.currentUser.surnames || '',
      email: this.currentUser.email || '',
      password: (this.currentUser.password && this.currentUser.password.trim().length > 0) ? this.currentUser.password : (this.isEditMode ? undefined : '1234'),
      state: Number(this.currentUser.state ?? 1),
      rol: { idRol: rolIdNum, rolId: rolIdNum, nameRol: roleNames[rolIdNum] || 'Staff' }
    };

    if (this.isEditMode && userId) {
      this.userService.updateUser(userId, userToSave).subscribe({
        next: () => {
          this.showModal = false;
          this.loadData();
        },
        error: (err) => {
          console.error('Error al actualizar usuario:', err);
          alert('Error al actualizar en la base de datos: ' + (err.error?.message || err.message || 'Error del servidor'));
          this.showModal = false;
          this.loadData();
        }
      });
    } else {
      this.userService.createUser(userToSave).subscribe({
        next: () => {
          this.showModal = false;
          this.loadData();
        },
        error: (err) => {
          console.error('Error al crear usuario:', err);
          alert('Error al crear en la base de datos: ' + (err.error?.message || err.message || 'Error del servidor'));
          this.showModal = false;
          this.loadData();
        }
      });
    }
  }

  deleteUser(id: number) {
    if (!id) return;
    if (confirm('¿Está seguro de dar de baja a este miembro del personal?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.loadData();
        },
        error: (err) => {
          console.error('Error al dar de baja usuario:', err);
          alert('Error al actualizar estado en la base de datos: ' + (err.error?.message || err.message || 'Error del servidor'));
          this.loadData();
        }
      });
    }
  }
}
