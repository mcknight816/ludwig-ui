import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of, switchMap} from 'rxjs';
import {SaasyUser, SaasyUserService} from './saasy-user.service';
import {environment} from "../../environments/environment";

const TENANT_KEY = 'saasy-tenant';

export interface IdName{
  id: string | null;
  name: string | null;
}

export interface Tenant{
    app: IdName;
    planId: string;
    id: string | null;
    displayName: string;
    customer: SaasyUser;
    subscriptionId: string;
}

export interface App{
    id: string | null;
    name: string;
    roles: Array<string>;
    plans: Array<Plan>;
}

export interface Plan {
    name: string | null;
    description: string | null;
    planId: string | null;
    monthly: number;
    yearly: number | null;
    features: Array<string> | null;
    suggested: boolean | null;
    payUrl:string | null;
    buttonTitle: string | null;
}

export interface SaasySubscription {
     id:string | null;
     appId: string;
     firstName:string;
     lastName:string;
     email:string;
     companyName:string;
     nonce:string;
     chargeAmount:number | null;
     planId:string | null;
}

export interface Transaction{
    createdAt:number;
    processorResponseText:string;
    amount:number;
    creditCard:CreditCard;
}

export interface CreditCard{
    maskedNumber:string;
    imageUrl:string;
    cardholderName:string;
    expirationDate:number;
    default:boolean;
    token:string;
}

@Injectable({
  providedIn: 'root'
})
export class SaasyService {
  private tenantChanged$ = new BehaviorSubject<IdName>(SaasyService.emptyIdName());
  constructor(public http: HttpClient) { }

  /*
  Payments
   */
    getTransactionHistory(tenantId:string | null): Observable<Array<Transaction>>{
        return this.http.get<Array<Transaction>>( environment.saasy + '/payment/transaction/history/' +  tenantId );
    }
    getCardsOnFile(tenantId:string | null): Observable<any>{
        return this.http.get<any>( environment.saasy + '/payment/cards/' +  tenantId );
    }
    removePaymentMethod(tenantId: string | null, token: string): Observable<any> {
        return this.http.delete<any>( environment.saasy + '/payment/cards/' + tenantId + '/'+  token);
    }
    getSubscription(tenantId:string | null):Observable<any>{
        return this.http.get<any>( environment.saasy + '/payment/subscription/' + tenantId );
    }

    setDefaultPaymentMethod(tenantId: string | null, token: string): Observable<any> {
        return this.http.get<any>( environment.saasy + '/payment/default/' + tenantId + '/'+  token);
    }

    getSubscriptionStatus(tenantId: string | null): Observable<any> {
        return this.http.get( environment.saasy + '/payment/subscription/status/' + tenantId );
    }

    cancelSubscription(tenantId: string | null): Observable<any> {
        return this.http.delete( environment.saasy + '/payment/cancel/' + tenantId );
    }

    getToken(): Observable<string> {
        return this.http.get<any>( environment.saasy + '/payment/token')
            .pipe(switchMap((a)=> {
                return of(a.token)
            }));
    }
    updateSubscription(tenantId:string | null,data: SaasySubscription){
        return this.http.post<any>(environment.saasy + '/payment/update/' + tenantId,data);
    }
    pay(data: SaasySubscription):Observable<any> {
        return this.http.post<any>(environment.saasy + '/payment/subscribe',data);
    }
  /*
    Tenants
  */
  listTenants(): Observable<Array<IdName>> {
      return this.http.post<Array<IdName>>(environment.saasy + '/' + environment.appId +  '/my-tenants',{appId:environment.appId});
  }

  saveTenant(model: Tenant): Observable<Tenant>{
      return this.http.post<Tenant>(environment.saasy  + '/' + environment.appId + '/tenant', model).pipe(switchMap((tenant)=>{
          this.setTenant({id:tenant.id,name:tenant.displayName});
          return of(tenant);
      }));
  }

  public tenantChanged(): Observable<IdName>{
      return this.tenantChanged$;
  }

  getTenantById(id: string | null): Observable<Tenant> {
      return this.http.get<Tenant>(environment.saasy  + '/' + environment.appId + '/tenant/' + id);
  }
  // Storage
  setTenant(tenant: IdName): void {
      localStorage.setItem(TENANT_KEY,JSON.stringify(tenant));
      this.tenantChanged$.next(tenant);
  }

  static getTenant(): IdName {
    const storedTenant = localStorage.getItem(TENANT_KEY);
    let tenant:IdName =  {name:'Select A Tenant',id:null};
    try{
        tenant = storedTenant ? JSON.parse(storedTenant) : tenant;
    }catch(e){

    }
    return tenant;
  }
  /*
         Apps
  */
  getApp(): Observable<App> {
      return this.http.get<App>(environment.saasy + '/public/app/' + environment.appId);
  }

  public static emptyTenant(): Tenant {
      return {id:null,displayName:'',app: SaasyService.emptyIdName(), customer:SaasyUserService.emptyUser(), subscriptionId:'', planId: ''};
  }

  public static emptyIdName(): IdName {
      return {id:null, name:''};
  }

  public static emptyApp(): App {
    return {id:null, name:'', plans:[], roles:[]};
  }

  public static emptyPlan(): Plan {
        return {name:'',monthly:0,yearly:null,description:'', planId:'',features:[],suggested:false,buttonTitle:'',payUrl:''};
  }

    static emptySubscription(): SaasySubscription {
        return {
            id:null,
            appId:environment.appId,
            companyName:'',
            firstName:'',
            lastName:'',
            email:'',
            chargeAmount:null,
            planId:'',
            nonce:''};
    }


}
