import IConfig from "../interfaces/config.interface"

export default function getDefaultConfig(): IConfig {
  return {
    sourceDir: process.cwd(),
    api: ["api/**/*.ts", "api/**/*.js"]
  }
}
