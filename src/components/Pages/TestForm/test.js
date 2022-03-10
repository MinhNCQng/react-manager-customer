import compareOrderData, { deepDiffMapper } from "../OrderDetail/compareData";




function TestForm(props) {
  const obj1 = { a:"123",c: ["hello","cuccu"]}
  const obj2 = {c:["asd","dasd"]}
  const diff = deepDiffMapper.map(obj1,obj2)
  console.log(diff)
 return <>123</>
}

export default TestForm;
