// ============================================================
//  PROFILE.JS — Lógica de la página de perfil del huésped
// ============================================================

document.addEventListener('DOMContentLoaded', async () => {
    let guestId = sessionStorage.getItem('guestId');

    // Si guestId no está en sessionStorage, verificar sesión contra /api/auth/check
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
            console.error("Error al verificar sesión:", e);
        }
    }

    if (!guestId || guestId === "undefined" || guestId === "null") {
        window.location.href = "/";
        return;
    }

    // Precarga de datos del perfil
    try {
        const response = await fetch(`/api/guests/${guestId}`);
        if (response.ok) {
            const guest = await response.json();
            document.getElementById('pro-firstname').value = guest.names || '';
            document.getElementById('pro-lastname').value = guest.surnames || '';
            document.getElementById('pro-phone').value = guest.phone || '';
            document.getElementById('pro-email').value = guest.email || '';
            document.getElementById('pro-confirm-email').value = guest.email || '';
        }
    } catch (e) {
        console.error("Error al precargar el perfil:", e);
    }
});