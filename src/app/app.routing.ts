import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../home/index';
import { LoginComponent } from '../login/index';
import { RegisterComponent } from '../register/index';
import { EditProfileComponent } from '../editprofile/index';
import { AuthGuard } from '../_guards/index';
import { SubForumComponent} from '../subforum/index';
import { UserRolesComponent } from '../userroles/userroles.component';
import { ThemesComponent } from '../themes/themes.component';
import { ComplaintThemeComponent } from '../complaints/complaint.component';
import { ShowComplaintComponent } from '../showComplaints/index';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'subforum', component: SubForumComponent},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'userroles', component: UserRolesComponent},
    { path: 'profile', component: EditProfileComponent },
    { path: 'themes', component: ThemesComponent },
    { path: 'complaints', component: ComplaintThemeComponent },
    { path: 'showComplaints', component: ShowComplaintComponent },
];

export const routing = RouterModule.forRoot(appRoutes);