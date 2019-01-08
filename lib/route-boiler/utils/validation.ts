import IRoute from "../../route-boiler/IRoute"
import { requestTypes } from "../../route-boiler/IRoute.interface"

export function initializeInstance(routeClass: any) {
  try {
    return new routeClass()
  } catch (err) {
    throw new Error(`The file can not be initialized: ${err}`)
  }
}

export function validateInstanceOfIRoute(routeClass: any): routeClass is IRoute {
  return routeClass instanceof IRoute
}

export function isRequestTypeValid(requestType: string) {
  // assert requestTypes
  return Object.values(requestTypes).includes(requestType)
}

export function validateRoute(routeClass: any) {
  const errors: string[] = []

  const routeInstance = initializeInstance(routeClass)

  if (!validateInstanceOfIRoute(routeInstance)) {
    throw new Error(`The file does not implement the IRoute interface`)
  }

  if (!isRequestTypeValid(routeInstance.method())) {
    errors.push(`Invalid request method: ${routeInstance.method()}`)
  }

  if (errors.length > 0) {
    throw new Error(errors.toString())
  } else {
    return routeInstance
  }
}
