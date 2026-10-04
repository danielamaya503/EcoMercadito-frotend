export const formatearMoneda = (valor: number) =>
  new Intl.NumberFormat('es-SV', { style: 'currency', currency: 'USD' }).format(valor ?? 0);

export const formatearFecha = (fecha: string | Date) =>
  fecha ? new Intl.DateTimeFormat('es-SV', { dateStyle: 'medium' }).format(new Date(fecha)) : '';

export const diasParaVencer = (fecha: string | Date) =>
  Math.ceil((new Date(fecha).getTime() - Date.now()) / 86400000);

export const estaPorVencer = (fecha: string | Date, dias = 3) => diasParaVencer(fecha) <= dias;
