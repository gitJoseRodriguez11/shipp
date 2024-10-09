import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../../login/login.service';

export const AuthentificateGuard: CanActivateFn = (route, state) => {
  const authService = inject(LoginService);
  const router = inject(Router);

  if(authService.isAuthentificate()) {
    return router.navigate(['/dashboard']);
  }else{
    return true;
  }
};
