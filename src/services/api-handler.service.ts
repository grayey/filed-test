import { Injectable } from '@angular/core';
import { HttpClient,  } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { ApiConfig } from '../utils/config';
import { UserService } from './user/user.service';
import { environment } from '../environments/environment';

@Injectable()
export class ApiHandlerService extends ApiConfig{

  private static API_BASE_URL = environment.API_BASE_URL;

  constructor(private http: HttpClient, userService: UserService) {
    super(userService);
  }


  /**
   *
   * This is used to make get requests
   * @param path
   * @param data
   * @returns {Observable<R>}
   *
   */
  public get(path: string, paginator?): Observable<any> {
    const url = `${ApiHandlerService.API_BASE_URL}${path}`;
    return this.http.get(`${url}`, this.headers).retryWhen((errors) => {
        return errors
          .mergeMap((error) => this.errorHandler(error))
          .delay(1000)
          .take(2);
      })
      .catch(this.errorHandler)
      .map((res) => res);
  }



  /**
   * This is used to make post requests
   * @param path
   * @param data
   * @returns {Observable<R>}
   */
  public post(path: string, data?: any): Observable<any> {

    const url = `${ApiHandlerService.API_BASE_URL}${path}`;
    return this.http.post(url, (data || {}), this.headers)
      .retryWhen((errors) => {
        return errors
          .mergeMap((error) => this.errorHandler(error))
          .delay(1000)
          .take(2);
      })
      .catch(this.errorHandler)
      .map((res) => res);
  }



  /**
   *
   * This is used to make put requests
   * @param path
   * @param data
   * @returns {Observable<R>}
   *
   */
  public put(path: string, data?: Object): Observable<any> {
    const url = `${ApiHandlerService.API_BASE_URL}${path}`;
    return this.http.put(url, (data || {}) || {}, this.headers)
      .retryWhen((errors) => {
        return errors
          .mergeMap((error) => this.errorHandler(error))
          .delay(1000)
          .take(2);
      })
      .catch(this.errorHandler)
      .map((res) => res);
  }



  /**
   * This is used to make delete requests
   * @param path
   * @returns {Observable<R>}
   */
  public delete(path: string): Observable<any> {
    this.headers = {headers: this.setHeaders()};
    const url = `${ApiHandlerService.API_BASE_URL}${path}`;
    return this.http.delete(url, this.headers)
      .retryWhen((errors) => {
        return errors
          .mergeMap((error) => this.errorHandler(error))
          .delay(1000)
          .take(2);
      })
      .catch(this.errorHandler)
      .map((res) => res);
  }



  /**
   * This is used catch error
   * @param err
   * @returns {any}
   */
  private errorHandler(err) {
    return Observable.throw(err || 'Server error');
  }

}


