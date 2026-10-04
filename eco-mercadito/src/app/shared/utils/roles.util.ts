export const ROLES = {
  COMPRADOR: 'Comprador',
  COMERCIO: 'Comercio',
  ADMINISTRADOR: 'Administrador'
} as const;

export type RolNombre = (typeof ROLES)[keyof typeof ROLES];
