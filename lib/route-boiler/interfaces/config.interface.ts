export default interface IConfig {
  /**
   * @description The project base directory
   */
  baseDir: string

  /**
   * @description The relative path to middlewares folder
   */
  middlewares?: string[]

  /**
   * @description The relative path to routes folder
   */
  routes?: string[]
}
