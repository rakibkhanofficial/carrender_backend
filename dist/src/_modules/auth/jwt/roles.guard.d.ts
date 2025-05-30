import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
export declare enum UserRole {
    Customer = "Customer",
    Admin = "Admin",
    SuperAdmin = "SuperAdmin",
    DeliveryMan = "DeliveryMan",
    CustomerService = "CustomerService"
}
export declare class RolesGuard implements CanActivate {
    private reflector;
    constructor(reflector: Reflector);
    canActivate(context: ExecutionContext): boolean;
    private matchRoles;
}
