
import { userService } from "./service";

export async function register(request, response) {

    const result = await userService.register(request.body);
    return response.success(result);

}

export async function getStatisticsByIP(request, response) {

    const result = await userService.getStatisticsByIP(request.params?.ip);
    return response.success(result);

}

export async function getStatisticsByRoute(request, response) {

    const result = await userService.getStatisticsByRoute(request.body?.route);
    return response.success(result);

}
