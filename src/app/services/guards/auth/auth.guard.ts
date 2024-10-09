import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../../login/login.service';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(LoginService);
  const router = inject(Router);

  if(authService.isAuthentificate()){
    return true;
  }else{
    return router.navigate(['']);
  }
};

