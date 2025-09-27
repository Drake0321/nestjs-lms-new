import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    registerUser(){
        /*
        1.) Check if email already exists
        2.) Hash the password
        3.) Store the user in the database
        4.) Generate JWT token
        5.) Return the token
        */
        return { message: 'User registered successfully' };
    }
}
