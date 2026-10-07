import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App";
export function render(path = "/", site) {
  return renderToString(<StaticRouter location={path}><App site={site} /></StaticRouter>);
}
