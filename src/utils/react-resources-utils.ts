export interface ReactResource<T> {
  read(): T;
}

export function wrapPromise<T>(promise: Promise<T>): ReactResource<T> {
  let status = 'pending';
  let result: T;
  let error: unknown;

  const suspender = promise
    .then((res: T) => {
        status = 'success';
        result = res;
      },
    ).catch((err: unknown) => {
      status = 'error';
      error = err;
    });

  return {
    read(): T {
      console.log({
        status, result, error
      });

      switch(status) {
        case 'pending': {
          throw suspender;
        }
        case 'success': {
          return result;
        }
        case 'error':
        default: {
          throw result;
        }
      }
    },
  };
}
