import { Role } from "../model/role";

let admin = new Role();
admin.code = "ADMIN";
admin.name = "Administrateur";

let membre = new Role();
membre.code = "SPIRIT";
membre.name = "Adhérent Spirit";

export const RoleSeed: Role[] = [admin, membre];
