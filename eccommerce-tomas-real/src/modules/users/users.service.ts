import { Injectable } from "@nestjs/common"; 

@Injectable()
export class Usersservice {
    getUsers(): string {
        return "Listado de usuarios"
    }
}