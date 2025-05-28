import { ErrorHandler } from 'hono'

const handler: ErrorHandler = (e, c) => {
  return c.render(<h1>Error! {e.toString()}</h1>)
}

export default handler