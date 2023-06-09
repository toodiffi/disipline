import routesObj from './routes.json';

export type Routes = {
  [key in keyof UnionToIntersection<(typeof routesObj)[keyof typeof routesObj]>]: string;
};

export const routes = Object.keys(routesObj).reduce((r, page) => {
  Object.keys(routesObj[page]).forEach(routerName => {
    r[routerName] = `/${page}/${routesObj[page][routerName].path}`;
  });
  return r;
}, {} as Routes);

console.log(routes);
