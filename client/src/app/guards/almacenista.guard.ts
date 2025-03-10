import { CanActivateFn } from '@angular/router';

export const almacenistaGuard: CanActivateFn = (route, state) => {
  return true;
};
