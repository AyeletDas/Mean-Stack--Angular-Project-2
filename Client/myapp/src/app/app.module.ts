import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Add this import שינוי 7.4.2024
import { RouterModule, Routes } from '@angular/router';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { AdduserComponent } from './adduser/adduser.component';
import { UserComponent } from './user/user.component';
import { EdituserComponent } from './edituser/edituser.component';
import { SearchuserComponent } from './searchuser/searchuser.component';
import { UserSearchComponent } from './user-search/user-search.component';

const appRoutes: Routes = [{ path: '', component: UserComponent },]

@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    AdduserComponent,
    UserComponent,
    EdituserComponent,
    SearchuserComponent,
    UserSearchComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, // Add this line שינוי 7.4.2024
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
// בטרמינל:
// $ cd myapp
// $ ng serve

// http://localhost:4200 - בדפדפן
// http://localhost:7000/user - בפוסט מן

