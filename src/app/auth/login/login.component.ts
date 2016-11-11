import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component( {
    selector: 'oms-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
} )
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    errorMessage: string;
    showError: boolean = false;

    constructor(private fb: FormBuilder,
                private authService: AuthService,
                private router: Router) {
    }

    onLoginFormSubmit() {
        this.authService.loginUser( this.loginForm.value )
            .subscribe(
                (data) => {
                    console.log( data );
                    this.showError = false;
                    this.router.navigate( ['/comanda'] );
                },
                (error) => {
                    console.log( error );
                    this.errorMessage = error;
                    this.showError = true;
                } );
    }

    ngOnInit() {

        let emailRegex = `([a-zA-Z0-9_.]{1}[a-zA-Z0-9_.]*)((@[a-zA-Z]{2}[a-zA-Z]*)[\\\.]([a-zA-Z]{2}|[a-zA-Z]{3}))`;
        this.loginForm = this.fb.group( {
            email: ['', Validators.compose( [Validators.required, Validators.pattern( emailRegex )] )],
            password: ['', Validators.required]
        } )


    }

}
