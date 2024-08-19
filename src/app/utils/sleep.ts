export const sleep = (seconds: number = 10) => {

    return new Promise( resolve => {
      setTimeout(() => {
        resolve(true);
      }, seconds * 1000 );
    })
}