import { useEffect,useState } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import "./resizable.css";
interface ResizableProps {
  direction: "horizontal" | "vertical";
}
const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  const [innerHeight,setInnerHeight]=useState(window.innerHeight)
  const [innerWidth,setInnerWidth]=useState(window.innerWidth)
  const [width,setWidth]=useState(window.innerWidth*0.75)
    useEffect(() => {
    const listener = () => {
        let timer:any;
        if(timer){
            clearTimeout(timer)
        }
      timer= setTimeout(()=>{
            setInnerHeight(window.innerHeight)
            setInnerWidth(window.innerWidth)
            if(window.innerWidth*0.75<width){
                setWidth(window.innerWidth*0.75)
            }
        },100)
       
   
    };
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [width]);

  let resizableProps: ResizableBoxProps;
  if (direction == "horizontal") {
    resizableProps = {
      className: "resize-horizontal",
      minConstraints: [innerWidth * 0.2, Infinity],
      maxConstraints: [innerWidth * 0.75, Infinity],
      resizeHandles: ["e"],
      height: Infinity,
      width: width,
      onResizeStop:(event,data)=>{
setWidth(data.size.width)
      }
    };
  } else {
    resizableProps = {
      minConstraints: [Infinity, 25],
      maxConstraints: [Infinity, innerHeight * 0.9],
      resizeHandles: ["s"],
      height: 300,
      width: Infinity,
    };
  }
  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};
export default Resizable;
