declare module 'typography-theme-alton'

// And to shim assets, use (one file extension per `declare`):
declare module '*.png'
declare module '*.jpg'

interface ILocation {
  host: string
  hostname: string
  href: string
  key: string
  origin: string
  pathname: string
  port: string
}
