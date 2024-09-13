import { Router } from "express";
import routeAdapter from "../../../adapters/route-adapter";
import { makeAdminLoginController } from "../../../factory/admin/admin-login-controller";

export default (router: Router) => {
  router.post('/adm-login', routeAdapter(makeAdminLoginController()))
}