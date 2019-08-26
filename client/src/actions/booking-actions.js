export const OPEN_BOOKING_DIALOG = 'OPEN_BOOKING_DIALOG';
export const CLOSE_BOOKING_DIALOG = 'CLOSE_BOOKING_DIALOG';

export function openBookingDialog(property){
    return {
        type : OPEN_BOOKING_DIALOG,
        openedProperty : property
    }
}