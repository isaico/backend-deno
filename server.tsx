import { createApp, createRouter, contentTypeFilter } from './deps.ts';
import { React, ReactDOMServer, ReactDOM } from './deps.ts';

const app = createApp();
const data: string[] = [];
function IndexRoutes() {
  const router = createRouter();
  /* ----------------------------------- GET ---------------------------------- */
  //envio los datos al post, con el form,  para que ahi se agrege al array de datos
  router.get('/', async (req) => {
    console.log(data);
    await req.respond({
      status: 200,
      headers: new Headers({
        'Content-Type': 'text/html; charset=UTF-8',
      }),
      body: ReactDOMServer.renderToString(
        <html>
          <body>
            <form method="post" action="/">
              <label>
                write a color
                <input type="text" name="color" />
              </label>
              <input type="submit" value="Submit" />
            </form>
            <div>
              {/* <ul>
                {data.map(color => {
                  <li>{color}</li>;
                })}
              </ul> */}
              {data}
            </div>
          </body>
        </html>
      ),
    });
  });
  /* ---------------------------------- POST ---------------------------------- */
  //aqui agrego la data al array y muestro el resultado
  router.post('/', contentTypeFilter('multipart/form-data'), async (req) => {
    const bodyform = await req.formData();
    const color = bodyform.value('color');
    console.log(color);
    data.push(color as string);
    req.respond({
      status: 200,
      headers: new Headers({
        'Content-Type': 'text/html; charset=UTF-8',
      }),
      body: `color cargado con exito: ${color}`,
      
    });
  });
  return router;
}
app.route('/', IndexRoutes());

const port = 3000;
app.listen({ port });
console.log(`http://localhost:${port}`);
