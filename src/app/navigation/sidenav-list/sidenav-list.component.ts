import {
    Component,
    EventEmitter,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-sidenav-list',
    templateUrl: './sidenav-list.component.html',
    styleUrls: ['./sidenav-list.component.css'],
})
export class SideNavComponent implements OnInit, OnDestroy {
    @Output() closeSidenav = new EventEmitter<void>();
    isAuth = false;
    authSubscription: Subscription = new Subscription();

    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.authSubscription = this.authService.authChange.subscribe(
            (authStatus: boolean) => {
                this.isAuth = authStatus;
            }
        );
    }

    onClose() {
        this.closeSidenav.emit();
    }

    onLogout() {
        this.onClose();
        this.authService.logout();
    }

    ngOnDestroy(): void {
        this.authSubscription.unsubscribe();
    }
}
