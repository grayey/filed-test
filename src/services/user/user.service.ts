import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoggedInUser } from '../../dtos/user.dto';
import CONSTANTS  from '../../utils/constants';

@Injectable()
export class UserService {

  constructor(private router: Router) {

  }


  /**
   * This method returns the active user's login state
   */
  public isLoggedIn():boolean{
    return true;
  }



  /**
   * This method returns the logged in user's jwt token
   */
  public getAuthUserToken():string{
    return 'FILED_USER_TOKEN';
  }


  /**
   * This is used to set authenticated user object into cache.
   * @param user
   */
  public setAuthUser(user: any): void {
    // console.log('Auth User ', user);

  }


    /**
   * This is used to get authenticated user object from cache
   */
  public getAuthUser(): LoggedInUser {
    return {
      first_name:"Test",
      last_name:"User",
      email:"test.user@filed.com",
    }

  }

    /**
   * This is used to delete Authenticated user from Cache.
   */
  private removeAuthUser(): void {
    // clear token from cache;
    // clear auth user from cache;

  }



  /**
   * This logs a user out of the current browser session
   * @param type
   * @param message
   * @returns {null}
   */
  public logout(type?: String, message?: string) {
    let redirectUrl = '';
    switch (type) {
      case CONSTANTS.TOKEN_EXPIRED:
        message = message || 'Your session expired. Please login again to continue.'
        redirectUrl = '/login';
        break;
      case CONSTANTS.USER_UNAUTHORIZED:
        message = message || 'Permission denied: login again.'
        redirectUrl = '/login';
        break;
      default:
        break;
    }
    this.removeAuthUser();
    this.router.navigateByUrl(redirectUrl);

  }

}
