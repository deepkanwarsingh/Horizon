export const measureTime =
async(
 callback:()=>Promise<any>
)=>{

 const start =
 performance.now();


 const result =
 await callback();


 const end =
 performance.now();


 console.log(
  "Execution time:",
  end-start,
  "ms"
 );


 return result;

};