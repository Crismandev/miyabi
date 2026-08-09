// ============================================================
//  MYRESERVATIONS.JS — Lógica de la página "Mis Reservas"
//  Responsabilidades:
//    · Validación de sesión activa (Servidor / sessionStorage)
//    · Consulta a la API de reservas por huésped autenticado
//    · Normalización y renderizado de tarjetas de reserva
//    · Mapeo de estados de reserva a clases CSS y textos localizados
//    · Manejo defensivo de datos de habitación potencialmente nulos
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    loadMyReservations();
});

/**
 * Punto de entrada principal de la página Mis Reservas.
 */
async function loadMyReservations() {
    const container = document.getElementById('reservations-container');
    let guestId = sessionStorage.getItem('guestId');

    // 1. Si no hay guestId o es "undefined", validar sesión activa contra el servidor (/api/auth/check)
    if (!guestId || guestId === "undefined" || guestId === "null") {
        try {
            const checkResp = await fetch('/api/auth/check');
            if (checkResp.ok) {
                const checkData = await checkResp.json();
                if (checkData.isLoggedIn) {
                    guestId = checkData.guestId || checkData.userId;
                    if (guestId) {
                        sessionStorage.setItem('guestId', guestId);
                        sessionStorage.setItem('guestName', checkData.guestName);
                        sessionStorage.setItem('isLoggedIn', 'true');
                    }
                }
            }
        } catch (e) {
            console.error("Error al consultar sesión de autenticación:", e);
        }
    }

    // 2. Si sigue sin haber sesión activa, mostrar mensaje e invitar a iniciar sesión
    if (!guestId || guestId === "undefined" || guestId === "null") {
        container.innerHTML = `
            <div style="text-align: center; padding: 60px 20px;">
                <i class="bi bi-person-lock" style="font-size: 48px; color: var(--color-kinjiki);"></i>
                <h3 style="font-family: var(--font-serif); margin-top: 15px; font-size: 24px;">Acceso a Mis Reservas</h3>
                <p style="color: var(--color-ibushi); margin-bottom: 25px; font-size: 15px;">Debes iniciar sesión para consultar el historial de tus estancias.</p>
                <button class="btn-miyabi btn-miyabi-enji" onclick="if(typeof toggleLoginModal === 'function') toggleLoginModal(); else window.location.href='/';">Iniciar Sesión</button>
            </div>
        `;
        return;
    }

    try {
        // 3. Consultar la API de reservas por el id del huésped
        let response = await fetch(`/api/reservations/guest/${guestId}`);
        let reservations = [];

        if (response.ok) {
            reservations = await response.json();
        } else {
            // Fallback: si es un usuario administrador o la respuesta no es OK, consultar todas las reservas
            const fallbackResp = await fetch('/api/reservations');
            if (fallbackResp.ok) {
                reservations = await fallbackResp.json();
            } else {
                throw new Error("Error fetching reservations");
            }
        }

        // Estado vacío: el cliente existe pero no tiene reservas registradas aún
        if (!reservations || reservations.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 60px 20px;">
                    <p style="font-size: 18px; margin-bottom: 20px; font-family: var(--font-serif);">Aún no tienes reservas registradas en Hotel Miyabi.</p>
                    <button class="btn-miyabi btn-miyabi-enji" onclick="window.location.href='/reservation'">RESERVAR AHORA</button>
                </div>
            `;
            return;
        }

        renderReservationCards(reservations, container);

    } catch (error) {
        console.error(error);
        container.innerHTML = '<p style="color:#666; text-align:center; padding: 50px 0;">No pudimos cargar tus reservas en este momento.</p>';
        if (typeof showToast === 'function') {
            showToast("Error de conexión. No se pudieron cargar las reservas.", true);
        }
    }
}

/**
 * Renderiza la lista de tarjetas de reserva en el contenedor HTML.
 */
function renderReservationCards(reservations, container) {
    container.innerHTML = '';

    reservations.reverse().forEach(res => {
        const checkIn = res.entryDate ? new Date(res.entryDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }) : 'N/A';
        const checkOut = res.departureDate ? new Date(res.departureDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }) : 'N/A';

        let statusClass = "status-pending";
        let statusText = "Pendiente";

        if (res.state === "Paid" || res.state === "Reserved" || res.state === "Confirmed" || res.state === "Confirmada") {
            statusClass = "status-paid";
            statusText = "Confirmada";
        } else if (res.state === "Check-out") {
            statusClass = "status-paid";
            statusText = "Completada";
        } else if (res.state === "Cancelled" || res.state === "Cancelada") {
            statusClass = "status-cancelled";
            statusText = "Cancelada";
        }

        let roomName = "Habitación Estándar Ryokan";

        if (res.room && res.room.roomType && res.room.roomType.nameType) {
            roomName = res.room.roomType.nameType;
        } else if (res.room && res.room.roomNumber) {
            roomName = "Habitación " + res.room.roomNumber;
        }

        const roomSubtotal = res.roomSubtotal || 0;
        const consumption = res.totalConsumption || 0;
        const totalPay = res.totalPay || 0;

        const cardHtml = `
            <div class="reservation-card" style="background-color: var(--surface-card); border: 1px solid var(--color-border); border-radius: 8px; margin-bottom: 24px; padding: 24px; box-shadow: var(--shadow-subtle);">
                <div class="res-card-header" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--color-border); padding-bottom: 14px; margin-bottom: 16px;">
                    <span class="res-code" style="font-family: var(--font-mono); font-weight: 600; color: var(--color-enji);">Reserva: ${res.reservationCode || 'RES-000'}</span>
                    <span class="res-status ${statusClass}">${statusText}</span>
                </div>
                
                <div class="res-card-body" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; margin-bottom: 20px;">
                    <div class="res-detail-group">
                        <span class="res-label" style="font-size: 11px; text-transform: uppercase; color: var(--color-ibushi); display: block;">Check-in</span>
                        <span class="res-value" style="font-weight: 600;">${checkIn}</span>
                    </div>
                    <div class="res-detail-group">
                        <span class="res-label" style="font-size: 11px; text-transform: uppercase; color: var(--color-ibushi); display: block;">Check-out</span>
                        <span class="res-value" style="font-weight: 600;">${checkOut}</span>
                    </div>
                    <div class="res-detail-group">
                        <span class="res-label" style="font-size: 11px; text-transform: uppercase; color: var(--color-ibushi); display: block;">Habitación</span>
                        <span class="res-value" style="font-weight: 600;">${roomName}</span>
                    </div>
                    <div class="res-detail-group">
                        <span class="res-label" style="font-size: 11px; text-transform: uppercase; color: var(--color-ibushi); display: block;">Estancia</span>
                        <span class="res-value" style="font-weight: 600;">${res.numberNights || 1} Noche(s)</span>
                    </div>
                </div>

                <div class="res-card-footer" style="background-color: var(--surface); padding: 16px; border-radius: 6px; border: 1px solid var(--color-border);">
                    <div class="res-breakdown-row" style="display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 6px;">
                        <span>Costo de Habitación</span>
                        <span>S/ ${roomSubtotal.toLocaleString('es-ES', { minimumFractionDigits: 2 })}</span>
                    </div>
                    
                    ${consumption > 0 ? `
                    <div class="res-breakdown-row" style="display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 6px;">
                        <span>Consumos Extras</span>
                        <span>S/ ${consumption.toLocaleString('es-ES', { minimumFractionDigits: 2 })}</span>
                    </div>
                    ` : ''}

                    <div class="res-total-row" style="display: flex; justify-content: space-between; font-weight: 700; font-size: 16px; border-top: 1px solid var(--color-border); pt-2; margin-top: 8px; padding-top: 8px; color: var(--color-sumi);">
                        <span>TOTAL ABONADO</span>
                        <span>S/ ${totalPay.toLocaleString('es-ES', { minimumFractionDigits: 2 })}</span>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML += cardHtml;
    });
}