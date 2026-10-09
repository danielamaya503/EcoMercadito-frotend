import { HttpContextToken } from '@angular/common/http';

export const OMITIR_USUARIO_ID = new HttpContextToken<boolean>(
  () => false
);
