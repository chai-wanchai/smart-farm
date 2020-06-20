import Swal, { SweetAlertOptions, SweetAlertResult } from "sweetalert2";

export async function Loading(option?: SweetAlertOptions): Promise<SweetAlertResult> {
  return Swal.fire({
    title: "กำลังทำงาน!",
    html: "กรุณารอสักครู่",
    allowOutsideClick: false,
    // timer: 2000,
    onBeforeOpen: () => {
      Swal.showLoading();
    },
    ...option
  });
}
export async function Close() {
  Swal.close();
}
export async function ShowError(message: string, option?: SweetAlertOptions): Promise<SweetAlertResult> {
  return Swal.fire({ title: 'ผิดพลาด', html: message,confirmButtonText:'ตกลง', ...option })
}