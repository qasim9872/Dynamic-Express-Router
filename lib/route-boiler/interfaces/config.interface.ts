export default interface IConfig {
  /**
   * @description The project source directory
   */
  sourceDir: string

  /**
   * @description The Array of pattern to match from the source directory
   */
  api?: string[]
}
