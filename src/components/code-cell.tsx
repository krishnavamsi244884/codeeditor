import Preview from "./preview";
import "bulmaswatch/superhero/bulmaswatch.min.css";

import { useState,useEffect } from "react";
import CodeEditor from "./code-editor";
import Resizable from "./resizable"
import bundler from "../bundler";
import {Cell} from "../state"
import {useActions} from "../hooks/use-actions"
interface CodeCellProps{
  cell:Cell
}

const CodeCell:React.FC<CodeCellProps> = ({cell}) => {
  // const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const [err,setErr]=useState('')
const {updateCell}=useActions();


  useEffect(() => {
   const timer= setTimeout(async()=>{
    const output=await bundler(cell.content)
    setCode(output.code)
    setErr(output.err)
    },1000)
 
  return ()=>{
    
    clearTimeout(timer)
  }
  }, [cell.content])


  return (
      <Resizable direction="vertical">
    <div style={{height:"calc(100% - 10px)",display:"flex"}}>
      <Resizable direction="horizontal">
      <CodeEditor
        initialValue={cell.content}
        onChange={(value) => updateCell(cell.id,value)}
      />
      </Resizable>
    

      <Preview err={err} code={code} />
    </div>
    </Resizable>
  );
};

export default CodeCell;
